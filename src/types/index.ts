/** User roles in the platform */
export const USER_ROLES = {
  BUILDER: "builder",
  COMPANY: "company",
  ADMIN: "admin",
} as const;
export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];

/** Professional experience levels */
export const EXPERIENCE_LEVELS = {
  BEGINNER: "beginner",
  INTERMEDIATE: "intermediate",
  ADVANCED: "advanced",
} as const;
export type ExperienceLevel =
  (typeof EXPERIENCE_LEVELS)[keyof typeof EXPERIENCE_LEVELS];

/** Project lifecycle statuses */
export const PROJECT_STATUSES = {
  OPEN: "open",
  CLOSED: "closed",
  IN_PROGRESS: "in-progress",
} as const;
export type ProjectStatus =
  (typeof PROJECT_STATUSES)[keyof typeof PROJECT_STATUSES];

/** Matching algorithm result classifications */
export const MATCH_STATUSES = {
  AUTO_RECOMMEND: "auto-recommend",
  RECOMMEND: "recommend",
  IGNORED: "ignored",
} as const;
export type MatchStatus = (typeof MATCH_STATUSES)[keyof typeof MATCH_STATUSES];

/** Builder availability status */
export const AVAILABILITY_STATUSES = {
  AVAILABLE: "available",
  BUSY: "busy",
} as const;
export type AvailabilityStatus =
  (typeof AVAILABILITY_STATUSES)[keyof typeof AVAILABILITY_STATUSES];

/** Base user interface with common fields */
export interface BaseUser {
  userId: string;
  role: UserRole;
  fullName: string;
  username: string;
  avatarUrl: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

/** Generic user type for flexible context */
export type User = BaseUser;

/** Builder-specific profile with skills and reputation tracking */
export interface BuilderProfile extends BaseUser {
  role: "builder";
  skills: string[];
  experienceLevel: ExperienceLevel;
  bio: string;
  portfolioLinks: string[];
  availabilityStatus: AvailabilityStatus;
  hoursPerWeek: number;
  reputationScore: number;
  completedProjects: number;
}

/** Company-specific profile with organization details */
export interface CompanyProfile extends BaseUser {
  role: "company";
  companyName: string;
  industry: string;
  companySize: string;
  website: string;
  bio: string;
  postedProjects: number;
}

/** Union type for all profile variants */
export type Profile = BuilderProfile | CompanyProfile;

/** Project representation with comprehensive metadata */
export interface Project {
  id: string;
  title: string;
  description: string;
  requiredSkills: string[];
  rolesNeeded: string[];
  experienceLevelRequired: ExperienceLevel;
  teamSize: number;
  status: ProjectStatus;
  coverImage: string;
  founderId: string;
  founderName: string;
  createdAt: number;
  updatedAt?: number;
  category: string;
  budget?: string;
  duration?: string;
  tags?: string[];
  priority?: "low" | "medium" | "high";
}

/** Application status lifecycle */
export const APPLICATION_STATUSES = {
  PENDING: "pending",
  ACCEPTED: "accepted",
  REJECTED: "rejected",
} as const;
export type ApplicationStatus =
  (typeof APPLICATION_STATUSES)[keyof typeof APPLICATION_STATUSES];

/** Builder's application to a specific project */
export interface Application {
  id: string;
  projectId: string;
  builderId: string;
  builderName: string;
  builderAvatar: string;
  status: ApplicationStatus;
  message: string;
  createdAt: number;
  updatedAt?: number;
  respondedAt?: number;
}

/** Score components breakdown for match results */
export interface ScoreComponents {
  skill: number;
  role: number;
  experience: number;
  availability: number;
  reputation: number;
}

/** Calculate total score from components */
export const calculateTotalScore = (components: ScoreComponents): number => {
  return (
    (components.skill +
      components.role +
      components.experience +
      components.availability +
      components.reputation) /
    5
  );
};

/** Matching result between builder and project */
export interface Match {
  id: string;
  projectId: string;
  builderId: string;
  matchScore: number;
  status: MatchStatus;
  components: ScoreComponents;
  createdAt: number;
  updatedAt?: number;
}

/** Notification types in the system */
export const NOTIFICATION_TYPES = {
  MATCH: "match",
  APPLICATION: "application",
  SYSTEM: "system",
  MESSAGE: "message",
  TEAM_INVITE: "team-invite",
} as const;
export type NotificationType =
  (typeof NOTIFICATION_TYPES)[keyof typeof NOTIFICATION_TYPES];

/** In-app notification with metadata and read status */
export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  createdAt: number;
  relatedId?: string;
  actionUrl?: string;
}

/** Developer team collaboration room */
export interface TeamRoom {
  id: string;
  name: string;
  description: string;
  leaderId: string;
  inviteCode: string;
  memberIds: string[];
  createdAt: number;
  updatedAt?: number;
  visibility?: "private" | "public";
}

/** Message in a team room with metadata */
export interface TeamMessage {
  id: string;
  roomId: string;
  authorId: string;
  authorName: string;
  content: string;
  createdAt: number;
  updatedAt?: number;
  pinned: boolean;
  edited?: boolean;
}

export interface MatchResult {
  builder: BuilderProfile;
  score: number;
  components: ScoreComponents;
  action: MatchStatus;
}

export interface OverviewMetrics {
  totalBuilders: number;
  totalCompanies: number;
  totalProjects: number;
  activeMatches: number;
  totalApplications: number;
  avgMatchScore: number;
}

export const TAB_IDS = {
  OVERVIEW: "overview",
  PROJECTS: "projects",
  OPPORTUNITIES: "opportunities",
  APPLICANTS: "applicants",
  MESSAGES: "messages",
  PROFILE: "profile",
  USERS: "users",
  MATCHING: "matching",
  REPORTS: "reports",
  POST_PROJECT: "post-project",
  PORTFOLIO: "portfolio",
  ANALYTICS: "analytics",
  REPUTATION: "reputation",
  NETWORK: "network",
  TEAM_CHAT: "team-chat",
} as const;
export type TabId = (typeof TAB_IDS)[keyof typeof TAB_IDS];

/** Comprehensive application state managing all domain data */
export interface AppState {
  // Authentication & User Management
  currentUser: User | null;
  userRole: UserRole;

  // Core Domain Data
  builders: BuilderProfile[];
  companies: CompanyProfile[];
  projects: Project[];
  matches: Match[];
  applications: Application[];
  notifications: Notification[];

  // Team Collaboration
  teamRooms: TeamRoom[];
  teamMessages: TeamMessage[];

  // UI State
  activeTab: TabId;
  sidebarCollapsed: boolean;
  showNotifications: boolean;
  showProfileEdit: boolean;
  selectedProjectId: string | null;

  // Engine & Processing State
  engineStatus: "online" | "processing" | "offline";
  lastRunTimestamp: number | null;
}

// ============================================================================
// ACTION TYPES - Type-safe redux-style actions for state management
// ============================================================================

// UI Actions
type UIActions =
  | { type: "SET_TAB"; payload: TabId }
  | { type: "TOGGLE_SIDEBAR" }
  | { type: "TOGGLE_NOTIFICATIONS" }
  | { type: "TOGGLE_PROFILE_EDIT" };

// Authentication Actions
type AuthActions =
  | { type: "SWITCH_USER"; payload: UserRole }
  | { type: "NEW_SIGNUP"; payload: Profile }
  | { type: "LOGIN_USER"; payload: Profile };

// Builder/Company Data Actions
type EntityActions =
  | { type: "SET_BUILDERS"; payload: BuilderProfile[] }
  | { type: "SET_COMPANIES"; payload: CompanyProfile[] }
  | { type: "UPDATE_BUILDER"; payload: BuilderProfile }
  | { type: "UPDATE_COMPANY"; payload: CompanyProfile };

// Project Actions
type ProjectActions =
  | { type: "SET_PROJECTS"; payload: Project[] }
  | { type: "ADD_PROJECT"; payload: Project }
  | { type: "UPDATE_PROJECT"; payload: Project }
  | { type: "DELETE_PROJECT"; payload: string };

// Matching & Application Actions
type MatchingActions =
  | { type: "SET_MATCHES"; payload: Match[] }
  | { type: "SET_APPLICATIONS"; payload: Application[] }
  | { type: "ADD_APPLICATION"; payload: Application }
  | { type: "UPDATE_APPLICATION"; payload: Application }
  | { type: "RUN_MATCHING" };

// Notification Actions
type NotificationActions =
  | { type: "SET_APPLICATIONS"; payload: Application[] }
  | { type: "ADD_NOTIFICATION"; payload: Notification }
  | { type: "MARK_NOTIFICATION_READ"; payload: string };

// Team Chat Actions
type TeamActions =
  | { type: "CREATE_TEAM_ROOM"; payload: TeamRoom }
  | { type: "JOIN_TEAM_ROOM"; payload: { roomId: string; userId: string } }
  | { type: "SEND_TEAM_MESSAGE"; payload: TeamMessage }
  | { type: "TOGGLE_PIN_TEAM_MESSAGE"; payload: string }
  | { type: "REMOVE_TEAM_MEMBER"; payload: { roomId: string; userId: string } };

// Engine Actions
type EngineActions =
  | { type: "SET_ENGINE_STATUS"; payload: "online" | "processing" | "offline" }
  | { type: "SET_LAST_RUN"; payload: number };

// Combined union of all possible actions
export type AppAction =
  | UIActions
  | AuthActions
  | EntityActions
  | ProjectActions
  | MatchingActions
  | NotificationActions
  | TeamActions
  | EngineActions;
