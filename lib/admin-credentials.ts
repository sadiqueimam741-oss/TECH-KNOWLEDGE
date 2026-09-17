import fs from 'fs';
import path from 'path';
import { executeSql, isCloudDatabaseConfigured } from './db';

export interface AdminCredentials {
  username: string;
  passwordHash: string;
}

const DEFAULT_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const DEFAULT_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || '$2b$10$oRhLUYyFui4xABmwgRQJ6eq27wi.w1hYE0.yesjgLm7fVr1GrJ34q';
const DATA_DIR = path.join(process.cwd(), 'data');
const CREDENTIALS_FILE = path.join(DATA_DIR, 'admin-credentials.json');

// In-memory cache for server-side operations
let credentialsCache: AdminCredentials | null = null;

/**
 * Get the current admin credentials
 * Server-side: reads from cache, filesystem, or env defaults
 */
export function getAdminCredentials(): AdminCredentials {
  if (typeof window === 'undefined') {
    if (credentialsCache) {
      return credentialsCache;
    }

    try {
      if (fs.existsSync(CREDENTIALS_FILE)) {
        const stored = JSON.parse(fs.readFileSync(CREDENTIALS_FILE, 'utf8')) as AdminCredentials;
        if (stored.username && stored.passwordHash) {
          credentialsCache = stored;
          return stored;
        }
      }
    } catch {
      // Ignore read errors
    }

    const defaults = { username: DEFAULT_USERNAME, passwordHash: DEFAULT_PASSWORD_HASH };
    credentialsCache = defaults;
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      fs.writeFileSync(CREDENTIALS_FILE, JSON.stringify(defaults, null, 2), 'utf8');
    } catch {
      // Ignore write errors on read-only serverless
    }
    return defaults;
  }

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
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(CREDENTIALS_FILE, JSON.stringify(credentials, null, 2), 'utf8');
  } catch {
    // In-memory fallback
  }

  if (isCloudDatabaseConfigured()) {
    executeSql(`
      INSERT INTO admin_credentials (username, password_hash, updated_at)
      VALUES (?, ?, ?)
      ON CONFLICT(username) DO UPDATE SET
        password_hash = excluded.password_hash,
        updated_at = excluded.updated_at;
    `, [credentials.username, credentials.passwordHash, new Date().toISOString()]).catch(err =>
      console.error('Cloud DB credentials sync error:', err)
    );
  }
}

/**
 * Reset to default credentials
 */
export function resetAdminCredentials(): void {
  credentialsCache = null;
}

