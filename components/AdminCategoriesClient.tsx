'use client';

import { useEffect, useState } from 'react';
import { Category } from '@/lib/types';

const blank: Omit<Category, 'id'> = { name: '', slug: '', description: '' };

export default function AdminCategoriesClient() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [form, setForm] = useState<Partial<Category>>(blank);
  const [error, setError] = useState('');

  const load = () => fetch('/api/admin/categories').then((response) => response.json()).then((data) => setCategories(data.categories || []));
  useEffect(() => { load(); }, []);

  const save = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    const response = await fetch('/api/admin/categories', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    const data = await response.json();
    if (!response.ok) { setError(data.error || 'Unable to save category'); return; }
    setForm(blank);
    load();
  };

  const remove = async (id: string) => {
    if (!window.confirm('Delete this category? Articles using it will keep their current category label.')) return;
    const response = await fetch('/api/admin/categories', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
    const data = await response.json();
    if (!response.ok) { setError(data.error || 'Unable to delete category'); return; }
    load();
  };

  return (
    <div className="space-y-6">
      <form onSubmit={save} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-4">
        <h2 className="text-xl font-bold">{form.id ? 'Edit Category' : 'Add Category'}</h2>
        {error && <p className="text-red-600 dark:text-red-400">{error}</p>}
        <div className="grid md:grid-cols-3 gap-4">
          <input className="input" placeholder="Name" value={form.name || ''} onChange={(event) => setForm({ ...form, name: event.target.value })} required />
          <input className="input" placeholder="Slug" value={form.slug || ''} onChange={(event) => setForm({ ...form, slug: event.target.value })} required />
          <input className="input" placeholder="Description" value={form.description || ''} onChange={(event) => setForm({ ...form, description: event.target.value })} />
        </div>
        <div className="flex gap-3"><button className="btn btn-primary" type="submit">{form.id ? 'Save Category' : 'Add Category'}</button>{form.id && <button className="btn btn-secondary" type="button" onClick={() => setForm(blank)}>Cancel</button>}</div>
      </form>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto"><table className="min-w-full text-left"><thead className="bg-gray-100 dark:bg-gray-700"><tr><th className="px-4 py-3">Name</th><th className="px-4 py-3">Slug</th><th className="px-4 py-3">Description</th><th className="px-4 py-3">Actions</th></tr></thead><tbody>{categories.map((category) => <tr key={category.id} className="border-t border-gray-200 dark:border-gray-700"><td className="px-4 py-3 font-medium">{category.name}</td><td className="px-4 py-3">{category.slug}</td><td className="px-4 py-3">{category.description}</td><td className="px-4 py-3 flex gap-2"><button className="btn btn-secondary text-sm" onClick={() => setForm(category)}>Edit</button><button className="btn btn-secondary text-sm text-red-600" onClick={() => remove(category.id)}>Delete</button></td></tr>)}</tbody></table></div>
      </div>
    </div>
  );
}
