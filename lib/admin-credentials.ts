import fs from 'fs';
import path from 'path';

export interface AdminCredentials {
  username: string;
  passwordHash: string;
}

const DEFAULT_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const DEFAULT_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || '$2b$10$oRhLUYyFui4xABmwgRQJ6eq27wi.w1hYE0.yesjgLm7fVr1GrJ34q';
const CREDENTIALS_FILE = path.join(process.cwd(), 'data', 'admin-credentials.json');

// In-memory cache for server-side operations
let credentialsCache: AdminCredentials | null = null;

/**
 * Get the current admin credentials
 * Server-side: reads from cache or defaults
 * Client-side: should not be called directly
 */
export function getAdminCredentials(): AdminCredentials {
  if (typeof window === 'undefined') {
    if (credentialsCache) {
      return credentialsCache;
    }

    try {
      const stored = JSON.parse(fs.readFileSync(CREDENTIALS_FILE, 'utf8')) as AdminCredentials;
      if (stored.username && stored.passwordHash) {
        credentialsCache = stored;
        return stored;
      }
    } catch {
      const defaults = { username: DEFAULT_USERNAME, passwordHash: DEFAULT_PASSWORD_HASH };
      fs.writeFileSync(CREDENTIALS_FILE, JSON.stringify(defaults, null, 2), 'utf8');
      credentialsCache = defaults;
      return defaults;
    }
  }

  // Client-side: this should not be called for credentials
  return {
    username: DEFAULT_USERNAME,
    passwordHash: DEFAULT_PASSWORD_HASH,
  };
}

/**
 * Set admin credentials in cache (server-side only)
 */
export function setAdminCredentials(credentials: AdminCredentials): void {
  credentialsCache = credentials;
  fs.writeFileSync(CREDENTIALS_FILE, JSON.stringify(credentials, null, 2), 'utf8');
}

/**
 * Reset to default credentials
 */
export function resetAdminCredentials(): void {
  credentialsCache = null;
}
