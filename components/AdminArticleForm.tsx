'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Article, CATEGORIES } from '@/lib/types';

const makeBlankArticle = (): Omit<Article, 'id'> & { id?: string } => ({
  id: '',
  slug: '',
  title: '',
  subtitle: '',
  excerpt: '',
  content: '# New article\n\nStart writing here.',
  category: 'Technology',
  tags: [],
  author: 'TechKnowledge Editorial',
  featured_image: '/images/placeholder.svg',
  featured_image_alt: 'Article image',
  publication_date: new Date().toISOString().slice(0, 10),
  reading_time: 5,
  status: 'draft',
  seo_title: '',
  seo_description: '',
  canonical_url: '',
});

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export default function AdminArticleForm({ articleId }: { articleId?: string }) {
  const router = useRouter();
  const [form, setForm] = useState(makeBlankArticle());
  const [loading, setLoading] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!articleId) {
      setIsReady(true);
      return;
    }

    fetch('/api/admin/articles')
      .then((res) => res.ok ? res.json() : { articles: [] })
      .then((data) => {
        const found = (data.articles || []).find((item: Article) => item.id === articleId);
        if (found) {
          setForm({ ...found, tags: found.tags || [] });
        }
      })
      .finally(() => setIsReady(true));
  }, [articleId]);

  const updateField = <K extends keyof typeof form>(key: K, value: typeof form[K]) => {
    setForm((current) => {
      const next = { ...current, [key]: value };
      if (key === 'title' && !current.slug) {
        next.slug = slugify(String(value));
      }
      return next;
    });
  };

  const handleSubmit = async (statusOverride?: 'draft' | 'published') => {
    setLoading(true);
    const payload = {
      ...form,
      id: form.id || (articleId || crypto.randomUUID()),
      slug: form.slug || slugify(form.title),
      tags: String(form.tags || '').split(',').map((tag) => tag.trim()).filter(Boolean),
      status: statusOverride || form.status,
      reading_time: Number(form.reading_time) || 5,
      seo_title: form.seo_title || form.title,
      seo_description: form.seo_description || form.excerpt,
    };

    const response = await fetch('/api/admin/articles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    setLoading(false);
    if (response.ok) {
      router.push('/admin/articles');
      router.refresh();
      return;
    }

    const data = await response.json().catch(() => ({}));
    alert(data.error || 'Unable to save article.');
  };

  const handleDelete = async () => {
    if (!form.id) return;
    const confirmed = window.confirm('Delete this article?');
    if (!confirmed) return;

    const response = await fetch('/api/admin/articles', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: form.id }),
    });

    if (response.ok) {
      router.push('/admin/articles');
      router.refresh();
      return;
    }

    alert('Unable to delete article.');
  };

  const handleImagePick = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        updateField('featured_image', String(reader.result || '/images/placeholder.svg'));
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isReady) {
    return <div className="text-gray-600 dark:text-gray-300">Loading article form…</div>;
  }

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Title</label>
          <input value={form.title} onChange={(e) => updateField('title', e.target.value)} className="input" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Slug</label>
          <input value={form.slug} onChange={(e) => updateField('slug', e.target.value)} className="input" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Subtitle</label>
        <input value={form.subtitle} onChange={(e) => updateField('subtitle', e.target.value)} className="input" />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Excerpt / Description</label>
        <textarea value={form.excerpt} rows={3} onChange={(e) => updateField('excerpt', e.target.value)} className="input" />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Article Content (Markdown)</label>
        <textarea value={form.content} rows={12} onChange={(e) => updateField('content', e.target.value)} className="input font-mono text-sm" />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Category</label>
          <select value={form.category} onChange={(e) => updateField('category', e.target.value)} className="input">
            {CATEGORIES.map((category) => (
              <option key={category.id} value={category.name}>{category.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Tags (comma-separated)</label>
          <input value={Array.isArray(form.tags) ? form.tags.join(', ') : ''} onChange={(e) => updateField('tags', e.target.value.split(',').map((tag) => tag.trim()).filter(Boolean))} className="input" />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Author</label>
          <input value={form.author} onChange={(e) => updateField('author', e.target.value)} className="input" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Reading Time (minutes)</label>
          <input type="number" value={form.reading_time} onChange={(e) => updateField('reading_time', Number(e.target.value) || 1)} className="input" />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Publication Date</label>
          <input type="date" value={form.publication_date} onChange={(e) => updateField('publication_date', e.target.value)} className="input" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Status</label>
          <select value={form.status} onChange={(e) => updateField('status', e.target.value as Article['status'])} className="input">
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="scheduled">Scheduled</option>
          </select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Featured Image URL</label>
          <input value={form.featured_image} onChange={(e) => updateField('featured_image', e.target.value)} className="input" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Upload image</label>
          <input type="file" accept="image/*" onChange={handleImagePick} className="input pt-2" />
        </div>
      </div>

      {form.featured_image && (
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <p className="text-sm font-medium mb-2">Image Preview</p>
          <img src={form.featured_image} alt={form.featured_image_alt || form.title} onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/images/placeholder.svg'; }} className="w-full max-h-64 object-cover rounded-lg" />
        </div>
      )}

      <div>
        <label className="block text-sm font-medium mb-2">Featured Image Alt Text</label>
        <input value={form.featured_image_alt} onChange={(e) => updateField('featured_image_alt', e.target.value)} className="input" />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">SEO Title</label>
          <input value={form.seo_title} onChange={(e) => updateField('seo_title', e.target.value)} className="input" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Canonical URL</label>
          <input value={form.canonical_url} onChange={(e) => updateField('canonical_url', e.target.value)} className="input" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">SEO Description</label>
        <textarea value={form.seo_description} rows={3} onChange={(e) => updateField('seo_description', e.target.value)} className="input" />
      </div>

      <div className="flex flex-wrap gap-3 pt-4">
        <button type="button" disabled={loading} onClick={() => handleSubmit('draft')} className="btn btn-secondary">
          Save Draft
        </button>
        <button type="button" disabled={loading} onClick={() => handleSubmit('published')} className="btn btn-primary">
          Publish
        </button>
        {form.id && (
          <button type="button" disabled={loading} onClick={handleDelete} className="btn btn-secondary text-red-600 dark:text-red-400">
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
