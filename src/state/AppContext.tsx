import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useMemo,
} from "react";
import type {
  AppState,
  AppAction,
  BuilderProfile,
  CompanyProfile,
  Match,
  UserRole,
  TabId,
  Project,
} from "@/types";
import { USER_ROLES, TAB_IDS } from "@/types";
import {
  initializeData,
  saveBuilders,
  saveCompanies,
  saveProjects,
  saveMatches,
  saveNotifications,
  saveApplications,
  saveTeamRooms,
  saveTeamMessages,
  saveLastRun,
  saveUserRole,
  saveCurrentUserId,
} from "@/data/storage";
import { runMatchingPipeline, generateNotifications } from "@/engine/matcher";

/** Default tab for each user role */
const DEFAULT_TABS_BY_ROLE: Record<UserRole, TabId> = {
  [USER_ROLES.BUILDER]: TAB_IDS.OVERVIEW,
  [USER_ROLES.COMPANY]: TAB_IDS.OVERVIEW,
  [USER_ROLES.ADMIN]: TAB_IDS.OVERVIEW,
};

/** Initial application state */
const initialState: AppState = {
  currentUser: null,
  userRole: USER_ROLES.BUILDER,
  builders: [],
  companies: [],
  projects: [],
  matches: [],
  applications: [],
  notifications: [],
  teamRooms: [],
  teamMessages: [],
  activeTab: TAB_IDS.OVERVIEW,
  sidebarCollapsed: false,
  showNotifications: false,
  showProfileEdit: false,
  selectedProjectId: null,
  engineStatus: "online",
  lastRunTimestamp: null,
};

/**
 * Main application state reducer
 * Handles all state mutations with persistence side-effects
 */
function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    // ========== UI State Actions ==========
    case "SET_TAB":
      return { ...state, activeTab: action.payload };
    case "TOGGLE_SIDEBAR":
      return { ...state, sidebarCollapsed: !state.sidebarCollapsed };
    case "TOGGLE_NOTIFICATIONS":
      return { ...state, showNotifications: !state.showNotifications };
    case "TOGGLE_PROFILE_EDIT":
      return { ...state, showProfileEdit: !state.showProfileEdit };

    // ========== Entity Data Actions ==========
    case "SET_BUILDERS":
      return { ...state, builders: action.payload };
    case "SET_COMPANIES":
      return { ...state, companies: action.payload };
    case "UPDATE_BUILDER": {
      const builders = state.builders.map((b) =>
        b.userId === action.payload.userId ? action.payload : b,
      );
      saveBuilders(builders);
      return { ...state, builders };
    }
    case "UPDATE_COMPANY": {
      const companies = state.companies.map((c) =>
        c.userId === action.payload.userId ? action.payload : c,
      );
      saveCompanies(companies);
      return { ...state, companies };
    }

    // ========== Project Actions ==========
    case "SET_PROJECTS":
      return { ...state, projects: action.payload };
    case "ADD_PROJECT": {
      const projects = [...state.projects, action.payload];
      saveProjects(projects);
      return { ...state, projects };
    }
    case "UPDATE_PROJECT": {
      const projects = state.projects.map((p) =>
        p.id === action.payload.id ? action.payload : p,
      );
      saveProjects(projects);
      return { ...state, projects };
    }
    case "DELETE_PROJECT": {
      const projects = state.projects.filter((p) => p.id !== action.payload);
      const matches = state.matches.filter(
        (m) => m.projectId !== action.payload,
      );
      saveProjects(projects);
      saveMatches(matches);
      return { ...state, projects, matches };
    }

    // ========== Matching Actions ==========
    case "SET_MATCHES":
      return { ...state, matches: action.payload };
    case "RUN_MATCHING": {
      const matches = runMatchingPipeline(state.builders, state.projects);
      const notifications = [
        ...generateNotifications(matches, state.applications),
        ...state.notifications,
      ].slice(0, 50);
      const lastRun = Date.now();
      saveMatches(matches);
      saveNotifications(notifications);
      saveLastRun(lastRun);
      return {
        ...state,
        matches,
        notifications,
        lastRunTimestamp: lastRun,
        engineStatus: "online",
      };
    }

    // ========== Application Actions ==========
    case "SET_APPLICATIONS":
      return { ...state, applications: action.payload };
    case "ADD_APPLICATION": {
      const applications = [...state.applications, action.payload];
      saveApplications(applications);
      return { ...state, applications };
    }
    case "UPDATE_APPLICATION": {
      const applications = state.applications.map((a) =>
        a.id === action.payload.id ? action.payload : a,
      );
      saveApplications(applications);
      return { ...state, applications };
    }

    // ========== Notification Actions ==========
    case "ADD_NOTIFICATION": {
      const updated = [action.payload, ...state.notifications].slice(0, 50);
      saveNotifications(updated);
      return { ...state, notifications: updated };
    }
    case "MARK_NOTIFICATION_READ": {
      const updated = state.notifications.map((n) =>
        n.id === action.payload ? { ...n, read: true } : n,
      );
      saveNotifications(updated);
      return { ...state, notifications: updated };
    }

    // ========== Team Collaboration Actions ==========
    case "CREATE_TEAM_ROOM": {
      const teamRooms = [...state.teamRooms, action.payload];
      saveTeamRooms(teamRooms);
      return { ...state, teamRooms };
    }
    case "JOIN_TEAM_ROOM": {
      const teamRooms = state.teamRooms.map((room) =>
        room.id === action.payload.roomId &&
        !room.memberIds.includes(action.payload.userId)
          ? { ...room, memberIds: [...room.memberIds, action.payload.userId] }
          : room,
      );
      saveTeamRooms(teamRooms);
      return { ...state, teamRooms };
    }
    case "SEND_TEAM_MESSAGE": {
      const teamMessages = [...state.teamMessages, action.payload];
      saveTeamMessages(teamMessages);
      return { ...state, teamMessages };
    }
    case "TOGGLE_PIN_TEAM_MESSAGE": {
      const teamMessages = state.teamMessages.map((message) =>
        message.id === action.payload
          ? { ...message, pinned: !message.pinned }
          : message,
      );
      saveTeamMessages(teamMessages);
      return { ...state, teamMessages };
    }
    case "REMOVE_TEAM_MEMBER": {
      const teamRooms = state.teamRooms.map((room) =>
        room.id === action.payload.roomId
          ? {
              ...room,
              memberIds: room.memberIds.filter(
                (id) => id !== action.payload.userId,
              ),
            }
          : room,
      );
      saveTeamRooms(teamRooms);
      return { ...state, teamRooms };
    }

    // ========== Engine & Processing Actions ==========
    case "SET_ENGINE_STATUS":
      return { ...state, engineStatus: action.payload };
    case "SET_LAST_RUN":
      saveLastRun(action.payload);
      return { ...state, lastRunTimestamp: action.payload };

    // ========== Authentication Actions ==========
    case "SWITCH_USER": {
      saveUserRole(action.payload);

      // Select the first available user of this role
      let newCurrentUser: BuilderProfile | CompanyProfile | null = null;
      if (action.payload === USER_ROLES.BUILDER && state.builders.length > 0) {
        newCurrentUser = state.builders[0];
      } else if (
        action.payload === USER_ROLES.COMPANY &&
        state.companies.length > 0
      ) {
        newCurrentUser = state.companies[0];
      }

      if (newCurrentUser) {
        saveCurrentUserId(newCurrentUser.userId);
      }

      return {
        ...state,
        userRole: action.payload,
        activeTab: DEFAULT_TABS_BY_ROLE[action.payload],
        currentUser: newCurrentUser,
      };
    }

    case "LOGIN_USER": {
      saveUserRole(action.payload.role);
      saveCurrentUserId(action.payload.userId);
      return {
        ...state,
        userRole: action.payload.role,
        activeTab: DEFAULT_TABS_BY_ROLE[action.payload.role],
        currentUser: action.payload,
      };
    }

    case "NEW_SIGNUP": {
      saveUserRole(action.payload.role);
      saveCurrentUserId(action.payload.userId);

      const newState = {
        ...state,
        userRole: action.payload.role,
        activeTab: DEFAULT_TABS_BY_ROLE[action.payload.role],
        currentUser: action.payload,
        // Clear dummy data on new signup
        projects: [],
        matches: [],
        applications: [],
        notifications: [],
      };

      if (action.payload.role === USER_ROLES.BUILDER) {
        newState.builders = [
          ...state.builders,
          action.payload as BuilderProfile,
        ];
        saveBuilders(newState.builders);
      } else if (action.payload.role === USER_ROLES.COMPANY) {
        newState.companies = [
          ...state.companies,
          action.payload as CompanyProfile,
        ];
        saveCompanies(newState.companies);
      }

      saveProjects(newState.projects);
      saveMatches(newState.matches);
      saveApplications(newState.applications);
      saveNotifications(newState.notifications);

      return newState;
    }

    default:
      return state;
  }
}

/**
 * Context type definition with all provided values and methods
 */
interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  // Matching utilities
  runMatching: () => void;
  getProjectMatches: (projectId: string) => Match[];
  getBuilderMatches: (builderId: string) => Match[];
  // Entity getters
  getBuilder: (builderId: string) => BuilderProfile | undefined;
  getProject: (projectId: string) => Project | undefined;
  getCurrentProfile: () => BuilderProfile | CompanyProfile | undefined;
  // UI utilities
  unreadCount: number;
}

const AppContext = createContext<AppContextType | null>(null);

/**
 * AppProvider component
 * Manages global application state with context and reducer pattern
 * Initializes data from localStorage and provides utility methods
 */
export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(
    appReducer,
    initialState,
    (initial: AppState) => {
      const data = initializeData();

      // Resolve current user from storage
      let currentUser: BuilderProfile | CompanyProfile | null = null;
      if (data.currentUserId) {
        if (data.userRole === USER_ROLES.BUILDER) {
          currentUser =
            data.builders.find((b) => b.userId === data.currentUserId) ?? null;
        } else if (data.userRole === USER_ROLES.COMPANY) {
          currentUser =
            data.companies.find((c) => c.userId === data.currentUserId) ?? null;
        }
      }

      // Fallback to first available user of current role
      if (!currentUser) {
        if (data.userRole === USER_ROLES.BUILDER && data.builders.length > 0) {
          currentUser = data.builders[0];
        } else if (
          data.userRole === USER_ROLES.COMPANY &&
          data.companies.length > 0
        ) {
          currentUser = data.companies[0];
        }
      }

      return {
        ...initial,
        currentUser,
        userRole: data.userRole as UserRole,
        builders: data.builders,
        companies: data.companies,
        projects: data.projects,
        matches: data.matches,
        applications: data.applications,
        notifications: data.notifications,
        teamRooms: data.teamRooms,
        teamMessages: data.teamMessages,
        lastRunTimestamp: data.lastRun,
      };
    },
  );

  // ========== Matching Engine ==========
  const runMatching = useCallback(() => {
    dispatch({ type: "SET_ENGINE_STATUS", payload: "processing" });
    // Simulate processing delay for better UX
    setTimeout(() => {
      dispatch({ type: "RUN_MATCHING" });
    }, 800);
  }, []);

  // ========== Query Methods ==========
  const getProjectMatches = useCallback(
    (projectId: string) =>
      state.matches
        .filter((m) => m.projectId === projectId)
        .sort((a, b) => b.matchScore - a.matchScore),
    [state.matches],
  );

  const getBuilderMatches = useCallback(
    (builderId: string) =>
      state.matches
        .filter((m) => m.builderId === builderId)
        .sort((a, b) => b.matchScore - a.matchScore),
    [state.matches],
  );

  // ========== Entity Getters ==========
  const getBuilder = useCallback(
    (builderId: string) => state.builders.find((b) => b.userId === builderId),
    [state.builders],
  );

  const getProject = useCallback(
    (projectId: string) => state.projects.find((p) => p.id === projectId),
    [state.projects],
  );

  const getCurrentProfile = useCallback(() => {
    if (state.userRole === USER_ROLES.BUILDER) {
      return state.builders.find((b) => b.userId === state.currentUser?.userId);
    }
    if (state.userRole === USER_ROLES.COMPANY) {
      return state.companies.find(
        (c) => c.userId === state.currentUser?.userId,
      );
    }
    return undefined;
  }, [state.userRole, state.currentUser, state.builders, state.companies]);

  // ========== UI Utilities ==========
  const unreadCount = useMemo(
    () => state.notifications.filter((n) => !n.read).length,
    [state.notifications],
  );

  // ========== Context Value ==========
  const contextValue: AppContextType = useMemo(
    () => ({
      state,
      dispatch,
      runMatching,
      getProjectMatches,
      getBuilderMatches,
      getBuilder,
      getProject,
      getCurrentProfile,
      unreadCount,
    }),
    [
      state,
      runMatching,
      getProjectMatches,
      getBuilderMatches,
      getBuilder,
      getProject,
      getCurrentProfile,
      unreadCount,
    ],
  );

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
}

/**
 * useApp hook - Access global application state
 * @throws Error if used outside of AppProvider
 */
// eslint-disable-next-line react-refresh/only-export-components
export function useApp(): AppContextType {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
