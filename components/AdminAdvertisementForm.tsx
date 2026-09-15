'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Advertisement } from '@/lib/types';

const defaultAd = {
  advertiser_name: '',
  title: '',
  image: '/images/placeholder.svg',
  image_alt: 'Advertisement graphic',
  destination_url: 'https://',
  placement: 'homepage_top',
  start_date: new Date().toISOString().slice(0, 10),
  end_date: new Date(Date.now() + 86400000 * 30).toISOString().slice(0, 10),
  status: 'draft',
  priority: 1,
  notes: '',
  width: 0,
  height: 192,
  max_width: 0,
  responsive: true,
  alignment: 'center',
  spacing: 0,
} as const;

export default function AdminAdvertisementForm({ initialAd }: { initialAd?: Advertisement | null }) {
  const router = useRouter();
  const [form, setForm] = useState<Partial<Advertisement>>({
    ...defaultAd,
    ...initialAd,
  });
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  const updateField = (field: keyof typeof defaultAd | keyof Advertisement, value: string | number | boolean) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const payload = {
      ...form,
      title: form.title || 'Advertisement',
      advertiser_name: form.advertiser_name || 'Unknown Advertiser',
      destination_url: form.destination_url || '#',
      image: form.image || '/images/placeholder.svg',
      image_alt: form.image_alt || 'Advertisement graphic',
      placement: form.placement || 'homepage_top',
      status: form.status || 'draft',
      priority: form.priority || 1,
      start_date: form.start_date || new Date().toISOString().slice(0, 10),
      end_date: form.end_date || new Date(Date.now() + 86400000 * 30).toISOString().slice(0, 10),
    };

    await fetch('/api/admin/advertisements', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(initialAd?.id ? { ...payload, id: initialAd.id } : payload),
    });

    router.push('/admin/ads');
  };

  const handleDelete = async () => {
    if (initialAd?.id) {
      await fetch('/api/admin/advertisements', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: initialAd.id }),
      });
      router.push('/admin/ads');
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadError('');
    setUploading(true);
    const uploadData = new FormData();
    uploadData.append('file', file);
    const response = await fetch('/api/admin/advertisements/upload', { method: 'POST', body: uploadData });
    const data = await response.json().catch(() => ({}));
    setUploading(false);

    if (!response.ok) {
      setUploadError(data.error || 'Unable to upload image.');
      return;
    }

    updateField('image', data.url);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Advertiser Name</label>
          <input value={form.advertiser_name || ''} onChange={(e) => updateField('advertiser_name', e.target.value)} className="input" required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Advertisement Title</label>
          <input value={form.title || ''} onChange={(e) => updateField('title', e.target.value)} className="input" required />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div><label className="block text-sm font-medium mb-2">Width (px)</label><input type="number" min={0} value={form.width || 0} onChange={(e) => updateField('width', Number(e.target.value))} className="input" /></div>
        <div><label className="block text-sm font-medium mb-2">Height (px)</label><input type="number" min={1} value={form.height || 192} onChange={(e) => updateField('height', Number(e.target.value))} className="input" /></div>
        <div><label className="block text-sm font-medium mb-2">Max Width (px)</label><input type="number" min={0} value={form.max_width || 0} onChange={(e) => updateField('max_width', Number(e.target.value))} className="input" /></div>
        <div><label className="block text-sm font-medium mb-2">Alignment</label><select value={form.alignment || 'center'} onChange={(e) => updateField('alignment', e.target.value)} className="input"><option value="left">Left</option><option value="center">Center</option><option value="right">Right</option></select></div>
        <div><label className="block text-sm font-medium mb-2">Spacing (px)</label><input type="number" min={0} value={form.spacing || 0} onChange={(e) => updateField('spacing', Number(e.target.value))} className="input" /></div>
      </div>

      <label className="flex items-center gap-3 text-sm"><input type="checkbox" checked={form.responsive !== false} onChange={(e) => updateField('responsive', e.target.checked)} /> Responsive width</label>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Destination URL</label>
          <input value={form.destination_url || ''} onChange={(e) => updateField('destination_url', e.target.value)} className="input" required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Placement</label>
          <select value={form.placement || 'homepage_top'} onChange={(e) => updateField('placement', e.target.value)} className="input">
            <option value="homepage_top">Homepage Top</option>
            <option value="homepage_middle">Homepage Middle</option>
            <option value="homepage_bottom">Homepage Bottom</option>
            <option value="blog_page">Blog Page</option>
            <option value="article_top">Article Top</option>
            <option value="article_middle">Article Middle</option>
            <option value="article_bottom">Article Bottom</option>
            <option value="sidebar">Sidebar</option>
            <option value="footer">Footer</option>
          </select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Image URL</label>
          <input value={form.image || ''} onChange={(e) => updateField('image', e.target.value)} className="input" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Image Alt Text</label>
          <input value={form.image_alt || ''} onChange={(e) => updateField('image_alt', e.target.value)} className="input" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Select image from computer</label>
        <input type="file" accept="image/jpeg,image/png,image/gif,image/webp,image/svg+xml" onChange={handleImageUpload} className="input pt-2" disabled={uploading} />
        {uploading && <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Uploading image...</p>}
        {uploadError && <p className="text-sm text-red-600 dark:text-red-400 mt-2">{uploadError}</p>}
      </div>

      {form.image && <img src={form.image} alt={form.image_alt || form.title || 'Advertisement preview'} className="max-h-64 max-w-full object-contain rounded-lg border border-gray-200 dark:border-gray-700" />}

      <div className="grid md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Start Date</label>
          <input type="date" value={form.start_date || ''} onChange={(e) => updateField('start_date', e.target.value)} className="input" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">End Date</label>
          <input type="date" value={form.end_date || ''} onChange={(e) => updateField('end_date', e.target.value)} className="input" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Status</label>
          <select value={form.status || 'draft'} onChange={(e) => updateField('status', e.target.value)} className="input">
            <option value="draft">Draft</option>
            <option value="scheduled">Scheduled</option>
            <option value="active">Active</option>
            <option value="paused">Paused</option>
            <option value="expired">Expired</option>
          </select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Priority</label>
          <input type="number" min={1} value={form.priority || 1} onChange={(e) => updateField('priority', Number(e.target.value))} className="input" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Notes</label>
          <input value={form.notes || ''} onChange={(e) => updateField('notes', e.target.value)} className="input" />
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <button type="submit" className="btn btn-primary">{initialAd ? 'Save Changes' : 'Create Advertisement'}</button>
        {initialAd && (
          <button type="button" onClick={handleDelete} className="btn btn-secondary">Delete</button>
        )}
      </div>
    </form>
  );
}
