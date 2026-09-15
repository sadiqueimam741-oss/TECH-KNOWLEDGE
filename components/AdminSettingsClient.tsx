'use client';

import { useEffect, useState } from 'react';
import { DEFAULT_SITE_SETTINGS } from '@/lib/site-settings-defaults';

export default function AdminSettingsClient() {
  const [settings, setSettings] = useState(DEFAULT_SITE_SETTINGS);

  useEffect(() => {
    fetch('/api/admin/settings')
      .then((response) => response.ok ? response.json() : { settings: DEFAULT_SITE_SETTINGS })
      .then((data) => setSettings(data.settings || DEFAULT_SITE_SETTINGS));
  }, []);

  const updateField = (key: keyof typeof settings, value: string) => {
    setSettings((current) => ({ ...current, [key]: value }));
  };

  const updateSocial = (key: keyof typeof settings.social_links, value: string) => {
    setSettings((current) => ({
      ...current,
      social_links: { ...current.social_links, [key]: value },
    }));
  };

  const updateTheme = (key: keyof typeof settings.theme, value: string) => {
    setSettings((current) => ({ ...current, theme: { ...current.theme, [key]: value } }));
  };

  const handleSave = async () => {
    const response = await fetch('/api/admin/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings),
    });
    alert(response.ok ? 'Settings saved.' : 'Unable to save settings.');
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 md:p-10 space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Website Name</label>
          <input value={settings.site_name} onChange={(e) => updateField('site_name', e.target.value)} className="input" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Logo URL</label>
          <input value={settings.logo} onChange={(e) => updateField('logo', e.target.value)} className="input" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Site Description</label>
        <textarea value={settings.site_description} rows={3} onChange={(e) => updateField('site_description', e.target.value)} className="input" />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">About Information</label>
        <textarea value={settings.about_information} rows={4} onChange={(e) => updateField('about_information', e.target.value)} className="input" />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Contact Email</label>
          <input value={settings.contact_email} onChange={(e) => updateField('contact_email', e.target.value)} className="input" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Admin Notification Email</label>
          <input type="email" value={settings.admin_email} onChange={(e) => updateField('admin_email', e.target.value)} className="input" placeholder="Where inquiry notifications should go" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Contact Phone</label>
          <input value={settings.contact_phone} onChange={(e) => updateField('contact_phone', e.target.value)} className="input" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Address</label>
        <input value={settings.address} onChange={(e) => updateField('address', e.target.value)} className="input" />
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Twitter</label>
          <input value={settings.social_links.twitter} onChange={(e) => updateSocial('twitter', e.target.value)} className="input" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">LinkedIn</label>
          <input value={settings.social_links.linkedin} onChange={(e) => updateSocial('linkedin', e.target.value)} className="input" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">GitHub</label>
          <input value={settings.social_links.github} onChange={(e) => updateSocial('github', e.target.value)} className="input" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Footer Information</label>
        <input value={settings.footer_information} onChange={(e) => updateField('footer_information', e.target.value)} className="input" />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Default SEO Title</label>
        <input value={settings.default_seo_title} onChange={(e) => updateField('default_seo_title', e.target.value)} className="input" />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Default SEO Description</label>
        <textarea value={settings.default_seo_description} rows={3} onChange={(e) => updateField('default_seo_description', e.target.value)} className="input" />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Default Canonical URL</label>
        <input value={settings.default_canonical_url} onChange={(e) => updateField('default_canonical_url', e.target.value)} className="input" />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Advertising Custom Price</label>
        <input value={settings.advertising_custom_price} onChange={(e) => updateField('advertising_custom_price', e.target.value)} className="input" placeholder="Leave empty to show Contact for pricing" />
      </div>

      <fieldset className="border border-gray-200 dark:border-gray-700 rounded-lg p-5">
        <legend className="px-2 font-semibold">Appearance</legend>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {(Object.keys(settings.theme) as Array<keyof typeof settings.theme>).map((key) => (
            <label key={key} className="text-sm capitalize">
              <span className="block mb-2">{key.replace('_', ' ')}</span>
              <input type="color" value={settings.theme[key]} onChange={(e) => updateTheme(key, e.target.value)} className="h-10 w-full cursor-pointer rounded border border-gray-300" />
            </label>
          ))}
        </div>
      </fieldset>

      <button onClick={handleSave} className="btn btn-primary">Save Settings</button>
    </div>
  );
}
