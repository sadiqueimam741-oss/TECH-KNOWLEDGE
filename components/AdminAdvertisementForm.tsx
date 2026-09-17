'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Advertisement } from '@/lib/types';
import AdRenderer from '@/components/AdRenderer';

const defaultAd: Partial<Advertisement> = {
  advertiser_name: '',
  title: '',
  ad_type: 'image',
  image: '/images/placeholder.svg',
  image_alt: 'Advertisement graphic',
  destination_url: 'https://',
  video_url: '',
  video_poster: '',
  custom_html: '',
  cta_text: 'Learn More',
  sponsor_headline: '',
  sponsor_description: '',
  adsense_client: '',
  adsense_slot: '',
  autoplay: true,
  loop: true,
  muted: true,
  placement: 'homepage_top',
  start_date: new Date().toISOString().slice(0, 10),
  end_date: new Date(Date.now() + 86400000 * 30).toISOString().slice(0, 10),
  status: 'active',
  priority: 1,
  notes: '',
  width: 0,
  height: 192,
  max_width: 0,
  responsive: true,
  alignment: 'center',
  spacing: 0,
};

export default function AdminAdvertisementForm({ initialAd }: { initialAd?: Advertisement | null }) {
  const router = useRouter();
  const [form, setForm] = useState<Partial<Advertisement>>({
    ...defaultAd,
    ...initialAd,
    ad_type: initialAd?.ad_type || 'image',
  });
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [saving, setSaving] = useState(false);

  const updateField = (field: keyof Advertisement, value: string | number | boolean) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);

    const payload = {
      ...form,
      title: form.title || 'Advertisement',
      advertiser_name: form.advertiser_name || 'Direct Advertiser',
      ad_type: form.ad_type || 'image',
      destination_url: form.destination_url || '#',
      image: form.image || '/images/placeholder.svg',
      image_alt: form.image_alt || 'Advertisement graphic',
      placement: form.placement || 'homepage_top',
      status: form.status || 'active',
      priority: Number(form.priority) || 1,
      start_date: form.start_date || new Date().toISOString().slice(0, 10),
      end_date: form.end_date || new Date(Date.now() + 86400000 * 30).toISOString().slice(0, 10),
    };

    await fetch('/api/admin/advertisements', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(initialAd?.id ? { ...payload, id: initialAd.id } : payload),
    });

    setSaving(false);
    router.push('/admin/ads');
  };

  const handleDelete = async () => {
    if (initialAd?.id && confirm('Are you sure you want to delete this advertisement?')) {
      await fetch('/api/admin/advertisements', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: initialAd.id }),
      });
      router.push('/admin/ads');
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>, fieldName: 'image' | 'video_url' | 'video_poster') => {
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
      setUploadError(data.error || 'Unable to upload file.');
      return;
    }

    updateField(fieldName, data.url);
  };

  const currentAdType = form.ad_type || 'image';

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* 1. AD TYPE SELECTOR */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
        <label className="block text-sm font-bold text-gray-900 dark:text-white mb-3">
          Select Advertisement Format Type
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {[
            { id: 'image', label: '🖼️ Image Banner', desc: 'JPG, PNG, WebP, GIF' },
            { id: 'video', label: '🎬 Video Ad', desc: 'MP4 / WebM Video' },
            { id: 'adsense', label: '🌐 Google AdSense', desc: 'Auto / Ad Unit Slot' },
            { id: 'custom_code', label: '💻 Custom HTML/Script', desc: 'Affiliates & Scripts' },
            { id: 'sponsor_card', label: '💼 Sponsor Card', desc: 'Native Branding Card' },
          ].map((type) => (
            <button
              key={type.id}
              type="button"
              onClick={() => updateField('ad_type', type.id)}
              className={`p-3.5 rounded-xl text-left border-2 transition-all ${
                currentAdType === type.id
                  ? 'border-primary-600 bg-primary-50 dark:bg-primary-950/40 text-primary-900 dark:text-primary-200 shadow-sm'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              <div className="font-semibold text-sm">{type.label}</div>
              <div className="text-[11px] text-gray-500 dark:text-gray-400 mt-1">{type.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* 2. GENERAL INFO */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm space-y-6">
        <h3 className="text-base font-bold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-700 pb-3">
          Campaign Details
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">Campaign / Ad Title *</label>
            <input
              type="text"
              required
              value={form.title || ''}
              onChange={(e) => updateField('title', e.target.value)}
              placeholder="e.g. Cloud Hosting 50% Off Promo"
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Advertiser / Brand Name *</label>
            <input
              type="text"
              required
              value={form.advertiser_name || ''}
              onChange={(e) => updateField('advertiser_name', e.target.value)}
              placeholder="e.g. Hostinger / Google / Vercel"
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
            />
          </div>
        </div>
      </div>

      {/* 3. DYNAMIC CONTENT SECTION BASED ON AD TYPE */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm space-y-6">
        <h3 className="text-base font-bold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-700 pb-3">
          {currentAdType === 'image' && '🖼️ Image Banner Settings'}
          {currentAdType === 'video' && '🎬 Video Ad Player Settings'}
          {currentAdType === 'adsense' && '🌐 Google AdSense Unit Settings'}
          {currentAdType === 'custom_code' && '💻 Custom HTML / Embed / Script Code'}
          {currentAdType === 'sponsor_card' && '💼 Native Sponsored Card Settings'}
        </h3>

        {/* IMAGE AD FIELDS */}
        {currentAdType === 'image' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Banner Image URL or Upload *</label>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={form.image || ''}
                  onChange={(e) => updateField('image', e.target.value)}
                  placeholder="https://example.com/banner.jpg or /images/banner.jpg"
                  className="flex-1 px-3 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
                />
                <label className="px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 rounded-lg cursor-pointer text-sm font-medium">
                  {uploading ? 'Uploading...' : 'Upload Image'}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, 'image')}
                    className="hidden"
                  />
                </label>
              </div>
              {uploadError && <p className="text-xs text-red-600 mt-1">{uploadError}</p>}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Destination Click URL</label>
                <input
                  type="url"
                  value={form.destination_url || ''}
                  onChange={(e) => updateField('destination_url', e.target.value)}
                  placeholder="https://partner-link.com?ref=techknowledge"
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Image Alt Text</label>
                <input
                  type="text"
                  value={form.image_alt || ''}
                  onChange={(e) => updateField('image_alt', e.target.value)}
                  placeholder="Promotional banner description"
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
                />
              </div>
            </div>
          </div>
        )}

        {/* VIDEO AD FIELDS */}
        {currentAdType === 'video' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Video File URL (.mp4 / .webm) *</label>
              <div className="flex gap-3">
                <input
                  type="text"
                  required={currentAdType === 'video'}
                  value={form.video_url || ''}
                  onChange={(e) => updateField('video_url', e.target.value)}
                  placeholder="https://example.com/promo-video.mp4"
                  className="flex-1 px-3 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
                />
                <label className="px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 rounded-lg cursor-pointer text-sm font-medium">
                  {uploading ? 'Uploading...' : 'Upload Video'}
                  <input
                    type="file"
                    accept="video/mp4,video/webm"
                    onChange={(e) => handleFileUpload(e, 'video_url')}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Video Poster Image (Thumbnail)</label>
                <input
                  type="text"
                  value={form.video_poster || ''}
                  onChange={(e) => updateField('video_poster', e.target.value)}
                  placeholder="https://example.com/poster.jpg"
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Destination Click URL</label>
                <input
                  type="url"
                  value={form.destination_url || ''}
                  onChange={(e) => updateField('destination_url', e.target.value)}
                  placeholder="https://your-offer.com"
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4 pt-2">
              <div>
                <label className="block text-sm font-medium mb-1">CTA Button Label</label>
                <input
                  type="text"
                  value={form.cta_text || 'Learn More'}
                  onChange={(e) => updateField('cta_text', e.target.value)}
                  placeholder="e.g. Watch Full Demo / Get Offer"
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
                />
              </div>
              <div className="flex items-center gap-2 pt-6">
                <input
                  type="checkbox"
                  id="autoplay"
                  checked={form.autoplay !== false}
                  onChange={(e) => updateField('autoplay', e.target.checked)}
                  className="w-4 h-4 rounded text-primary-600"
                />
                <label htmlFor="autoplay" className="text-sm font-medium cursor-pointer">Autoplay (Muted)</label>
              </div>
              <div className="flex items-center gap-2 pt-6">
                <input
                  type="checkbox"
                  id="loop"
                  checked={form.loop !== false}
                  onChange={(e) => updateField('loop', e.target.checked)}
                  className="w-4 h-4 rounded text-primary-600"
                />
                <label htmlFor="loop" className="text-sm font-medium cursor-pointer">Loop Video</label>
              </div>
            </div>
          </div>
        )}

        {/* GOOGLE ADSENSE FIELDS */}
        {currentAdType === 'adsense' && (
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg text-xs text-blue-800 dark:text-blue-300">
              💡 <strong>Google AdSense Setup:</strong> Enter your AdSense Publisher Client ID (e.g. <code>ca-pub-1234567890123456</code>) and Ad Unit Slot ID (from your Google AdSense dashboard). The site will dynamically render the compliant ad unit.
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">AdSense Client ID (ca-pub-XXXXX)</label>
                <input
                  type="text"
                  value={form.adsense_client || ''}
                  onChange={(e) => updateField('adsense_client', e.target.value)}
                  placeholder="ca-pub-1234567890123456"
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700 font-mono text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">AdSense Slot ID</label>
                <input
                  type="text"
                  value={form.adsense_slot || ''}
                  onChange={(e) => updateField('adsense_slot', e.target.value)}
                  placeholder="e.g. 9876543210"
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700 font-mono text-sm"
                />
              </div>
            </div>
          </div>
        )}

        {/* CUSTOM CODE FIELDS */}
        {currentAdType === 'custom_code' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">HTML, Script, or Iframe Embed Code *</label>
              <textarea
                rows={6}
                required={currentAdType === 'custom_code'}
                value={form.custom_html || ''}
                onChange={(e) => updateField('custom_html', e.target.value)}
                placeholder={'<!-- Paste custom HTML banner, affiliate script, or iframe here -->\n<a href="https://partner.com"><img src="banner.jpg" /></a>'}
                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700 font-mono text-xs"
              />
              <p className="text-xs text-gray-500 mt-1">
                You can paste affiliate banners, Amazon Native Ads, or custom interactive HTML/JS widgets.
              </p>
            </div>
          </div>
        )}

        {/* SPONSOR CARD FIELDS */}
        {currentAdType === 'sponsor_card' && (
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Sponsor Headline / Tagline *</label>
                <input
                  type="text"
                  value={form.sponsor_headline || ''}
                  onChange={(e) => updateField('sponsor_headline', e.target.value)}
                  placeholder="e.g. Deploy Next.js apps with zero configuration"
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Destination Click URL</label>
                <input
                  type="url"
                  value={form.destination_url || ''}
                  onChange={(e) => updateField('destination_url', e.target.value)}
                  placeholder="https://sponsor.com/offer"
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Sponsor Short Description</label>
              <textarea
                rows={3}
                value={form.sponsor_description || ''}
                onChange={(e) => updateField('sponsor_description', e.target.value)}
                placeholder="Short description highlighting the sponsor product or service benefits."
                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700 text-sm"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Brand Logo URL or Image</label>
                <input
                  type="text"
                  value={form.image || ''}
                  onChange={(e) => updateField('image', e.target.value)}
                  placeholder="https://example.com/logo.png"
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">CTA Button Text</label>
                <input
                  type="text"
                  value={form.cta_text || 'Visit Sponsor'}
                  onChange={(e) => updateField('cta_text', e.target.value)}
                  placeholder="Visit Website / Try Free"
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 4. PLACEMENT & SCHEDULING */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm space-y-6">
        <h3 className="text-base font-bold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-700 pb-3">
          Placement & Schedule
        </h3>

        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Display Placement *</label>
            <select
              value={form.placement || 'homepage_top'}
              onChange={(e) => updateField('placement', e.target.value as Advertisement['placement'])}
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
            >
              <option value="homepage_top">Homepage - Top Slot</option>
              <option value="homepage_middle">Homepage - Middle Slot</option>
              <option value="homepage_bottom">Homepage - Bottom Slot</option>
              <option value="article_top">Article - Top Banner</option>
              <option value="article_middle">Article - In-Content Middle</option>
              <option value="article_bottom">Article - Bottom Banner</option>
              <option value="blog_page">Blog Listing Page</option>
              <option value="sidebar">Sidebar Slot</option>
              <option value="footer">Global Footer Slot</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Status *</label>
            <select
              value={form.status || 'active'}
              onChange={(e) => updateField('status', e.target.value as Advertisement['status'])}
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
            >
              <option value="active">Active (Visible)</option>
              <option value="draft">Draft (Hidden)</option>
              <option value="paused">Paused</option>
              <option value="scheduled">Scheduled by Date</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Priority (1 = Highest)</label>
            <input
              type="number"
              min="1"
              max="100"
              value={form.priority || 1}
              onChange={(e) => updateField('priority', Number(e.target.value))}
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Start Date</label>
            <input
              type="date"
              value={form.start_date || ''}
              onChange={(e) => updateField('start_date', e.target.value)}
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">End Date</label>
            <input
              type="date"
              value={form.end_date || ''}
              onChange={(e) => updateField('end_date', e.target.value)}
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-700"
            />
          </div>
        </div>
      </div>

      {/* 5. LIVE INTERACTIVE PREVIEW */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
        <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">Live Ad Preview</h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
          This is exactly how this advertisement will render on the public website.
        </p>
        <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 flex items-center justify-center min-h-[160px]">
          <AdRenderer ad={form as Advertisement} />
        </div>
      </div>

      {/* 6. SUBMIT BUTTONS */}
      <div className="flex items-center justify-between pt-4">
        {initialAd?.id ? (
          <button
            type="button"
            onClick={handleDelete}
            className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg border border-red-200 dark:border-red-800"
          >
            Delete Ad
          </button>
        ) : <div />}

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => router.push('/admin/ads')}
            className="px-4 py-2 border text-sm rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold rounded-lg shadow disabled:opacity-50"
          >
            {saving ? 'Saving...' : initialAd?.id ? 'Save Changes' : 'Create Advertisement'}
          </button>
        </div>
      </div>
    </form>
  );
}
