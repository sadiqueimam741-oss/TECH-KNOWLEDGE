import fs from 'fs';
import path from 'path';
import { SiteSettings } from './types';
import { DEFAULT_SITE_SETTINGS } from './site-settings-defaults';

export { DEFAULT_SITE_SETTINGS } from './site-settings-defaults';

const DATA_FILE = path.join(process.cwd(), 'data', 'site-settings.json');

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
    return normalizeSettings(JSON.parse(fs.readFileSync(DATA_FILE, 'utf8')));
  } catch {
    return DEFAULT_SITE_SETTINGS;
  }
}

export function saveSiteSettings(settings: SiteSettings): SiteSettings {
  const normalized = normalizeSettings(settings);
  fs.writeFileSync(DATA_FILE, JSON.stringify(normalized, null, 2), 'utf8');

  return normalized;
}
