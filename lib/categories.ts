import fs from 'fs';
import path from 'path';
import { Category, CATEGORIES as DEFAULT_CATEGORIES } from './types';
import { executeSql, isCloudDatabaseConfigured } from './db';

const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'categories.json');

let memoryCategories: Category[] = [...DEFAULT_CATEGORIES];

function readStoredCategories(): Category[] {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const parsed = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
      if (Array.isArray(parsed) && parsed.length > 0) {
        memoryCategories = parsed;
        return memoryCategories;
      }
    }
  } catch {
    // Return memory fallback
  }
  return memoryCategories;
}

export function getCategories(): Category[] {
  return [...readStoredCategories()].sort((a, b) => a.name.localeCompare(b.name));
}

function saveCategories(categories: Category[]) {
  memoryCategories = categories;
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(categories, null, 2), 'utf8');
  } catch {
    // Memory fallback for serverless
  }
}

export function createCategory(input: Partial<Category>): Category {
  const name = String(input.name || '').trim();
  if (!name) throw new Error('Category name is required');
  const slug = String(input.slug || name).toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  if (!slug) throw new Error('Category slug is required');
  const categories = readStoredCategories();
  if (categories.some((category) => category.slug === slug)) throw new Error('Category slug already exists');
  const category = { id: crypto.randomUUID(), name, slug, description: String(input.description || '').trim(), icon: input.icon };
  saveCategories([...categories, category]);

  if (isCloudDatabaseConfigured()) {
    executeSql(`
      INSERT INTO categories (id, name, slug, description, icon)
      VALUES (?, ?, ?, ?, ?)
      ON CONFLICT(id) DO UPDATE SET
        name = excluded.name,
        slug = excluded.slug,
        description = excluded.description,
        icon = excluded.icon;
    `, [category.id, category.name, category.slug, category.description, category.icon || '']).catch(err =>
      console.error('Cloud DB category sync error:', err)
    );
  }

  return category;
}

export function updateCategory(input: Partial<Category>): Category {
  const categories = readStoredCategories();
  const index = categories.findIndex((category) => category.id === input.id);
  if (index < 0) throw new Error('Category not found');
  const current = categories[index];
  const name = String(input.name || current.name).trim();
  const slug = String(input.slug || current.slug).toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  if (categories.some((category) => category.id !== input.id && category.slug === slug)) throw new Error('Category slug already exists');
  const updated = { ...current, ...input, name, slug, description: String(input.description ?? current.description).trim() };
  categories[index] = updated;
  saveCategories(categories);

  if (isCloudDatabaseConfigured()) {
    executeSql(`
      INSERT INTO categories (id, name, slug, description, icon)
      VALUES (?, ?, ?, ?, ?)
      ON CONFLICT(id) DO UPDATE SET
        name = excluded.name,
        slug = excluded.slug,
        description = excluded.description,
        icon = excluded.icon;
    `, [updated.id, updated.name, updated.slug, updated.description, updated.icon || '']).catch(err =>
      console.error('Cloud DB category sync error:', err)
    );
  }

  return updated;
}

export function deleteCategory(id: string): void {
  const categories = readStoredCategories();
  if (categories.length <= 1) throw new Error('At least one category must remain');
  saveCategories(categories.filter((category) => category.id !== id));

  if (isCloudDatabaseConfigured()) {
    executeSql('DELETE FROM categories WHERE id = ?;', [id]).catch(err =>
      console.error('Cloud DB category delete error:', err)
    );
  }
}

