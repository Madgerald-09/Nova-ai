import type {
  BuilderProfile,
  CompanyProfile,
  Project,
  Match,
  Notification as AppNotification,
  Application,
  TeamRoom,
  TeamMessage,
} from "@/types";
import {
  seedBuilders,
  seedCompanies,
  seedProjects,
  seedApplications,
} from "./seed";
import { runMatchingPipeline, generateNotifications } from "@/engine/matcher";

/** Storage keys for all persisted data */
const STORAGE_KEYS = {
  // Core entities
  builders: "nova_builders_v2",
  companies: "nova_companies_v2",
  projects: "nova_projects_v2",
  matches: "nova_matches_v2",
  notifications: "nova_notifications_v2",
  applications: "nova_applications_v2",

  // Team collaboration
  teamRooms: "nova_team_rooms_v2",
  teamMessages: "nova_team_messages_v2",

  // Metadata
  initialized: "nova_initialized_v2",
  lastRun: "nova_last_run_v2",

  // User session
  userRole: "nova_user_role",
  currentUserId: "nova_current_user_id",
} as const;

/** Return type for initializeData function */
export interface StorageData {
  builders: BuilderProfile[];
  companies: CompanyProfile[];
  projects: Project[];
  matches: Match[];
  notifications: AppNotification[];
  applications: Application[];
  teamRooms: TeamRoom[];
  teamMessages: TeamMessage[];
  lastRun: number | null;
  userRole: string;
  currentUserId: string | null;
}

/**
 * Initialize or retrieve persisted application data
 * Seeds demo data on first run, retrieves from localStorage on subsequent runs
 *
 * @returns Complete application data state
 */
export function initializeData(): StorageData {
  const alreadyInit = localStorage.getItem(STORAGE_KEYS.initialized);

  if (alreadyInit) {
    // Application already initialized — retrieve from storage
    return {
      builders: safeJsonParse<BuilderProfile[]>(STORAGE_KEYS.builders, []),
      companies: safeJsonParse<CompanyProfile[]>(STORAGE_KEYS.companies, []),
      projects: safeJsonParse<Project[]>(STORAGE_KEYS.projects, []),
      matches: safeJsonParse<Match[]>(STORAGE_KEYS.matches, []),
      notifications: safeJsonParse<AppNotification[]>(
        STORAGE_KEYS.notifications,
        [],
      ),
      applications: safeJsonParse<Application[]>(STORAGE_KEYS.applications, []),
      teamRooms: safeJsonParse<TeamRoom[]>(STORAGE_KEYS.teamRooms, []),
      teamMessages: safeJsonParse<TeamMessage[]>(STORAGE_KEYS.teamMessages, []),
      lastRun: parseLastRun(),
      userRole: localStorage.getItem(STORAGE_KEYS.userRole) || "builder",
      currentUserId: localStorage.getItem(STORAGE_KEYS.currentUserId),
    };
  }

  // First-time initialization — seed demo data and run initial matching
  const builders = seedBuilders;
  const companies = seedCompanies;
  const projects = seedProjects;
  const applications = seedApplications;
  const matches = runMatchingPipeline(builders, projects);
  const notifications = generateNotifications(matches, applications);
  const lastRun = Date.now();
  const userRole = "builder";
  const currentUserId = builders[0]?.userId || null;

  // Persist all data
  persistStorageData({
    builders,
    companies,
    projects,
    matches,
    notifications,
    applications,
    teamRooms: [],
    teamMessages: [],
    lastRun,
    userRole,
    currentUserId,
  });

  return {
    builders,
    companies,
    projects,
    matches,
    notifications,
    applications,
    teamRooms: [],
    teamMessages: [],
    lastRun,
    userRole,
    currentUserId,
  };
}

/**
 * Persist complete storage state
 * Used during initialization
 */
function persistStorageData(data: StorageData): void {
  localStorage.setItem(STORAGE_KEYS.builders, JSON.stringify(data.builders));
  localStorage.setItem(STORAGE_KEYS.companies, JSON.stringify(data.companies));
  localStorage.setItem(STORAGE_KEYS.projects, JSON.stringify(data.projects));
  localStorage.setItem(STORAGE_KEYS.matches, JSON.stringify(data.matches));
  localStorage.setItem(
    STORAGE_KEYS.notifications,
    JSON.stringify(data.notifications),
  );
  localStorage.setItem(
    STORAGE_KEYS.applications,
    JSON.stringify(data.applications),
  );
  localStorage.setItem(STORAGE_KEYS.teamRooms, JSON.stringify(data.teamRooms));
  localStorage.setItem(
    STORAGE_KEYS.teamMessages,
    JSON.stringify(data.teamMessages),
  );
  localStorage.setItem(STORAGE_KEYS.initialized, "true");

  if (data.lastRun) {
    localStorage.setItem(STORAGE_KEYS.lastRun, data.lastRun.toString());
  }
  localStorage.setItem(STORAGE_KEYS.userRole, data.userRole);
  if (data.currentUserId) {
    localStorage.setItem(STORAGE_KEYS.currentUserId, data.currentUserId);
  }
}

/**
 * Safe JSON parse helper with type safety
 * @param key Storage key to retrieve
 * @param fallback Default value if parse fails
 * @returns Parsed data or fallback
 */
function safeJsonParse<T>(key: string, fallback: T): T {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch {
    console.warn(`Failed to parse storage key: ${key}`);
    return fallback;
  }
}

/**
 * Parse last run timestamp safely
 */
function parseLastRun(): number | null {
  const stored = localStorage.getItem(STORAGE_KEYS.lastRun);
  if (!stored) return null;
  const parsed = parseInt(stored);
  return isNaN(parsed) ? null : parsed;
}

// ============================================================================
// Save Functions - Update individual data types
// ============================================================================

/**
 * Persist builder profiles
 */
export function saveBuilders(builders: BuilderProfile[]): void {
  localStorage.setItem(STORAGE_KEYS.builders, JSON.stringify(builders));
}

/**
 * Persist company profiles
 */
export function saveCompanies(companies: CompanyProfile[]): void {
  localStorage.setItem(STORAGE_KEYS.companies, JSON.stringify(companies));
}

/**
 * Persist projects
 */
export function saveProjects(projects: Project[]): void {
  localStorage.setItem(STORAGE_KEYS.projects, JSON.stringify(projects));
}

/**
 * Persist match results
 */
export function saveMatches(matches: Match[]): void {
  localStorage.setItem(STORAGE_KEYS.matches, JSON.stringify(matches));
}

/**
 * Persist user notifications
 */
export function saveNotifications(notifications: AppNotification[]): void {
  localStorage.setItem(
    STORAGE_KEYS.notifications,
    JSON.stringify(notifications),
  );
}

/**
 * Persist project applications
 */
export function saveApplications(applications: Application[]): void {
  localStorage.setItem(STORAGE_KEYS.applications, JSON.stringify(applications));
}

/**
 * Persist team collaboration rooms
 */
export function saveTeamRooms(teamRooms: TeamRoom[]): void {
  localStorage.setItem(STORAGE_KEYS.teamRooms, JSON.stringify(teamRooms));
}

/**
 * Persist team room messages
 */
export function saveTeamMessages(teamMessages: TeamMessage[]): void {
  localStorage.setItem(STORAGE_KEYS.teamMessages, JSON.stringify(teamMessages));
}

/**
 * Update last matching engine run timestamp
 */
export function saveLastRun(timestamp: number): void {
  localStorage.setItem(STORAGE_KEYS.lastRun, timestamp.toString());
}

/**
 * Update current user role
 */
export function saveUserRole(role: string): void {
  localStorage.setItem(STORAGE_KEYS.userRole, role);
}

/**
 * Update current user session ID
 */
export function saveCurrentUserId(userId: string): void {
  localStorage.setItem(STORAGE_KEYS.currentUserId, userId);
}

/**
 * Clear all persisted data
 * Useful for testing or complete reset
 */
export function clearAllData(): void {
  Object.values(STORAGE_KEYS).forEach((key) => {
    localStorage.removeItem(key);
  });
}
