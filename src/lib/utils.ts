import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { ScoreComponents } from "@/types";

/**
 * Merge Tailwind CSS classes intelligently
 * Handles conflicting class names and merges them properly
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Format a timestamp to a human-readable date string
 * @param timestamp - Unix timestamp in milliseconds
 * @returns Formatted date string (e.g., "Jan 1, 2024")
 */
export function formatDate(timestamp: number): string {
  return new Date(timestamp).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/**
 * Format a timestamp to show relative time (e.g., "2 hours ago")
 * @param timestamp - Unix timestamp in milliseconds
 * @returns Relative time string
 */
export function formatRelativeTime(timestamp: number): string {
  const now = Date.now();
  const diff = now - timestamp;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;

  return formatDate(timestamp);
}

/**
 * Format timestamp to date and time string
 * @param timestamp - Unix timestamp in milliseconds
 * @returns Formatted datetime string (e.g., "Jan 1, 2024 at 2:30 PM")
 */
export function formatDateTime(timestamp: number): string {
  return new Date(timestamp).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * Calculate match score percentage (0-100)
 * @param score - Match score value
 * @returns Percentage value clamped between 0-100
 */
export function scoreToPercentage(score: number): number {
  return Math.min(Math.max(Math.round(score), 0), 100);
}

/**
 * Get color for a score value
 * Used for visual indicators of match quality
 */
export function getScoreColor(
  score: number,
): "text-red-500" | "text-yellow-500" | "text-green-500" {
  if (score >= 75) return "text-green-500";
  if (score >= 50) return "text-yellow-500";
  return "text-red-500";
}

/**
 * Generate a random unique ID
 * @returns UUID-like string
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Generate invite code for team rooms
 * @returns 6-character alphanumeric code
 */
export function generateInviteCode(): string {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

/**
 * Validate email format
 * @param email - Email address to validate
 * @returns true if email is valid format
 */
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Validate URL format
 * @param url - URL to validate
 * @returns true if URL is valid format
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Truncate text to specified length
 * @param text - Text to truncate
 * @param length - Maximum length
 * @returns Truncated text with ellipsis if needed
 */
export function truncateText(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.substring(0, length).trim() + "...";
}

/**
 * Calculate average from score components
 * @param components - Score components object
 * @returns Average score value
 */
export function calculateAverageScore(components: ScoreComponents): number {
  const values = Object.values(components);
  return values.reduce((a, b) => a + b, 0) / values.length;
}

/**
 * Sort array of items with score
 * @param items - Array of items with matchScore property
 * @param descending - Sort in descending order (default: true)
 * @returns Sorted array
 */
export function sortByScore<T extends { matchScore: number }>(
  items: T[],
  descending = true,
): T[] {
  return [...items].sort((a, b) =>
    descending ? b.matchScore - a.matchScore : a.matchScore - b.matchScore,
  );
}

/**
 * Deduplicate array by key
 * @param items - Array of items
 * @param key - Key to deduplicate by
 * @returns Deduplicated array
 */
export function deduplicateBy<T>(items: T[], key: keyof T): T[] {
  const seen = new Set();
  return items.filter((item) => {
    const value = item[key];
    if (seen.has(value)) return false;
    seen.add(value);
    return true;
  });
}
