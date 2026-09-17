import fs from 'fs';
import path from 'path';
import { SiteSettings } from './types';
import { DEFAULT_SITE_SETTINGS } from './site-settings-defaults';
import { executeSql, isCloudDatabaseConfigured } from './db';

export { DEFAULT_SITE_SETTINGS } from './site-settings-defaults';

const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'site-settings.json');

let memorySettings: SiteSettings = { ...DEFAULT_SITE_SETTINGS };

function normalizeSettings(settings: Partial<SiteSettings>): SiteSettings {
  const theme = { ...DEFAULT_SITE_SETTINGS.theme, ...(settings.theme ?? {}) };
  for (const key of Object.keys(theme) as Array<keyof typeof theme>) {
    if (!/^#[0-9a-f]{6}$/i.test(theme[key])) theme[key] = DEFAULT_SITE_SETTINGS.theme[key];
  }

  return {
    ...DEFAULT_SITE_SETTINGS,
    ...settings,
    social_links: {
      ...DEFAULT_SITE_SETTINGS.social_links,
      ...(settings.social_links ?? {}),
    },
    theme,
  };
}

export function getSiteSettings(): SiteSettings {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const parsed = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
      memorySettings = normalizeSettings(parsed);
      return memorySettings;
    }
  } catch {
    // Return memory fallback
  }
  return memorySettings;
}

export function saveSiteSettings(settings: SiteSettings): SiteSettings {
  const normalized = normalizeSettings(settings);
  memorySettings = normalized;
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(normalized, null, 2), 'utf8');
  } catch {
    // In-memory fallback for serverless
  }

  if (isCloudDatabaseConfigured()) {
    executeSql(`
      INSERT INTO site_settings (id, settings_json, updated_at)
      VALUES ('default', ?, ?)
      ON CONFLICT(id) DO UPDATE SET
        settings_json = excluded.settings_json,
        updated_at = excluded.updated_at;
    `, [JSON.stringify(normalized), new Date().toISOString()]).catch(err =>
      console.error('Cloud DB settings sync error:', err)
    );
  }

  return normalized;
}

