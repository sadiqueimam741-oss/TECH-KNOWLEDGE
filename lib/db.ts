/**
 * Unified Cloud Database Client (Native Fetch - Zero NPM Dependencies)
 * Supports Turso / LibSQL HTTP REST API & Supabase REST API
 */

export interface DbQueryResult<T = unknown> {
  rows: T[];
  rowsAffected?: number;
  lastInsertRowid?: number | string;
}

const DATABASE_URL = process.env.TURSO_DATABASE_URL || process.env.DATABASE_URL || '';
const DATABASE_AUTH_TOKEN = process.env.TURSO_AUTH_TOKEN || process.env.DATABASE_AUTH_TOKEN || '';

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const SUPABASE_KEY = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export function isCloudDatabaseConfigured(): boolean {
  return Boolean((DATABASE_URL && DATABASE_AUTH_TOKEN) || (SUPABASE_URL && SUPABASE_KEY));
}

/**
 * Executes SQL statements on Turso / LibSQL Cloud Database via native HTTP Pipeline
 */
export async function executeSql<T = Record<string, unknown>>(
  sql: string,
  args: Array<string | number | boolean | null> = []
): Promise<DbQueryResult<T>> {
  if (!DATABASE_URL) {
    return { rows: [], rowsAffected: 0 };
  }

  // Format Turso HTTP endpoint (convert libsql:// or https:// to https://.../v2/pipeline)
  let endpoint = DATABASE_URL.replace(/^libsql:\/\//, 'https://');
  if (!endpoint.endsWith('/v2/pipeline')) {
    endpoint = endpoint.replace(/\/$/, '') + '/v2/pipeline';
  }

  const formattedArgs = args.map((arg) => {
    if (arg === null || arg === undefined) return { type: 'null' };
    if (typeof arg === 'number') return { type: 'integer', value: String(arg) };
    if (typeof arg === 'boolean') return { type: 'integer', value: arg ? '1' : '0' };
    return { type: 'text', value: String(arg) };
  });

  const requestBody = {
    requests: [
      {
        type: 'execute',
        stmt: {
          sql,
          args: formattedArgs,
        },
      },
      { type: 'close' },
    ],
  };

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${DATABASE_AUTH_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
      cache: 'no-store',
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('Turso DB Error:', response.status, errText);
      return { rows: [], rowsAffected: 0 };
    }

    const data = await response.json();
    const result = data?.results?.[0]?.response?.result;

    if (!result) {
      return { rows: [], rowsAffected: 0 };
    }

    const cols: string[] = result.cols?.map((c: { name: string }) => c.name) || [];
    const rows: T[] = (result.rows || []).map((row: Array<{ value?: unknown; type?: string }>) => {
      const obj: Record<string, unknown> = {};
      row.forEach((cell, idx) => {
        const colName = cols[idx];
        if (colName) {
          obj[colName] = cell.value !== undefined ? cell.value : null;
        }
      });
      return obj as T;
    });

    return {
      rows,
      rowsAffected: result.affected_row_count || 0,
      lastInsertRowid: result.last_insert_rowid,
    };
  } catch (error) {
    console.error('Database connection error:', error);
    return { rows: [], rowsAffected: 0 };
  }
}

/**
 * Initializes table schemas in the cloud database if they do not exist
 */
let tablesInitialized = false;

export async function initDatabaseTables(): Promise<void> {
  if (tablesInitialized || !isCloudDatabaseConfigured()) return;

  try {
    // 1. Articles Table
    await executeSql(`
      CREATE TABLE IF NOT EXISTS articles (
        id TEXT PRIMARY KEY,
        slug TEXT UNIQUE NOT NULL,
        title TEXT NOT NULL,
        subtitle TEXT,
        excerpt TEXT,
        content TEXT NOT NULL,
        category TEXT NOT NULL,
        tags TEXT,
        author TEXT,
        featured_image TEXT,
        featured_image_alt TEXT,
        publication_date TEXT NOT NULL,
        updated_date TEXT,
        reading_time INTEGER DEFAULT 5,
        status TEXT DEFAULT 'draft',
        seo_title TEXT,
        seo_description TEXT,
        canonical_url TEXT,
        social_image TEXT
      );
    `);

    // 2. Advertisements Table
    await executeSql(`
      CREATE TABLE IF NOT EXISTS advertisements (
        id TEXT PRIMARY KEY,
        advertiser_name TEXT NOT NULL,
        title TEXT NOT NULL,
        ad_type TEXT DEFAULT 'image',
        image TEXT,
        image_alt TEXT,
        destination_url TEXT,
        video_url TEXT,
        video_poster TEXT,
        custom_html TEXT,
        cta_text TEXT,
        sponsor_headline TEXT,
        sponsor_description TEXT,
        adsense_client TEXT,
        adsense_slot TEXT,
        autoplay INTEGER DEFAULT 1,
        loop INTEGER DEFAULT 1,
        muted INTEGER DEFAULT 1,
        placement TEXT NOT NULL,
        start_date TEXT,
        end_date TEXT,
        status TEXT DEFAULT 'active',
        priority INTEGER DEFAULT 1,
        notes TEXT,
        width INTEGER DEFAULT 0,
        height INTEGER DEFAULT 192,
        max_width INTEGER DEFAULT 0,
        responsive INTEGER DEFAULT 1,
        alignment TEXT DEFAULT 'center',
        spacing INTEGER DEFAULT 0,
        created_date TEXT,
        updated_date TEXT
      );
    `);

    // 3. Categories Table
    await executeSql(`
      CREATE TABLE IF NOT EXISTS categories (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        description TEXT,
        icon TEXT
      );
    `);

    // 4. Site Settings Table
    await executeSql(`
      CREATE TABLE IF NOT EXISTS site_settings (
        id TEXT PRIMARY KEY DEFAULT 'default',
        settings_json TEXT NOT NULL,
        updated_at TEXT
      );
    `);

    // 5. Admin Credentials Table
    await executeSql(`
      CREATE TABLE IF NOT EXISTS admin_credentials (
        username TEXT PRIMARY KEY,
        password_hash TEXT NOT NULL,
        updated_at TEXT
      );
    `);

    tablesInitialized = true;
  } catch (err) {
    console.error('Failed to auto-create database tables:', err);
  }
}
