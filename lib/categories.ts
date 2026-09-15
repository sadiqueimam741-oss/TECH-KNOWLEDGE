import fs from 'fs';
import path from 'path';
import { Category, CATEGORIES as DEFAULT_CATEGORIES } from './types';

const DATA_FILE = path.join(process.cwd(), 'data', 'categories.json');

function readStoredCategories(): Category[] {
  try {
    const parsed = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    return Array.isArray(parsed) ? parsed : DEFAULT_CATEGORIES;
  } catch {
    return DEFAULT_CATEGORIES;
  }
}

export function getCategories(): Category[] {
  return [...readStoredCategories()].sort((a, b) => a.name.localeCompare(b.name));
}

function saveCategories(categories: Category[]) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(categories, null, 2), 'utf8');
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
  return updated;
}

export function deleteCategory(id: string): void {
  const categories = readStoredCategories();
  if (categories.length <= 1) throw new Error('At least one category must remain');
  saveCategories(categories.filter((category) => category.id !== id));
}
