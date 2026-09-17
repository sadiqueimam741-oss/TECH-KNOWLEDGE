'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Advertisement } from '@/lib/types';

export default function AdminAdsClient() {
  const [advertisements, setAdvertisements] = useState<Advertisement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/advertisements')
      .then((response) => response.ok ? response.json() : { advertisements: [] })
      .then((data) => {
        setAdvertisements(data.advertisements || []);
        setLoading(false);
      });
  }, []);

  const getFormatBadge = (type?: string) => {
    switch (type) {
      case 'video':
        return <span className="px-2 py-0.5 text-xs font-semibold rounded bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300">🎬 Video</span>;
      case 'adsense':
        return <span className="px-2 py-0.5 text-xs font-semibold rounded bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300">🌐 AdSense</span>;
      case 'custom_code':
        return <span className="px-2 py-0.5 text-xs font-semibold rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">💻 Custom Code</span>;
      case 'sponsor_card':
        return <span className="px-2 py-0.5 text-xs font-semibold rounded bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-300">💼 Sponsor Card</span>;
      default:
        return <span className="px-2 py-0.5 text-xs font-semibold rounded bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300">🖼️ Image</span>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="px-2 py-0.5 text-xs font-semibold rounded bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300">Active</span>;
      case 'draft':
        return <span className="px-2 py-0.5 text-xs font-semibold rounded bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300">Draft</span>;
      case 'paused':
        return <span className="px-2 py-0.5 text-xs font-semibold rounded bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300">Paused</span>;
      case 'scheduled':
        return <span className="px-2 py-0.5 text-xs font-semibold rounded bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300">Scheduled</span>;
      default:
        return <span className="px-2 py-0.5 text-xs font-semibold rounded bg-gray-100 text-gray-800">{status}</span>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container-custom py-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Multi-Format Ad Manager</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Manage Image Banners, Video Ads, Google AdSense units, and Native Sponsors.
            </p>
          </div>
          <Link
            href="/admin/ads/new"
            className="px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-semibold text-sm rounded-xl shadow transition"
          >
            + Create New Advertisement
          </Link>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-gray-50 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400 font-semibold border-b border-gray-200 dark:border-gray-700">
                <tr>
                  <th className="px-6 py-4">Format</th>
                  <th className="px-6 py-4">Title / Campaign</th>
                  <th className="px-6 py-4">Advertiser</th>
                  <th className="px-6 py-4">Placement</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">Loading campaigns...</td>
                  </tr>
                ) : advertisements.length > 0 ? (
                  advertisements.map((ad) => (
                    <tr key={ad.id} className="hover:bg-gray-50 dark:hover:bg-gray-750 transition">
                      <td className="px-6 py-4 whitespace-nowrap">{getFormatBadge(ad.ad_type)}</td>
                      <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{ad.title}</td>
                      <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{ad.advertiser_name}</td>
                      <td className="px-6 py-4 capitalize text-gray-600 dark:text-gray-300">{ad.placement.replace(/_/g, ' ')}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(ad.status)}</td>
                      <td className="px-6 py-4 text-right whitespace-nowrap space-x-2">
                        <Link
                          href={`/admin/ads/${ad.id}/edit`}
                          className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg text-xs font-semibold transition"
                        >
                          Edit
                        </Link>
                        <Link
                          href={`/admin/ads/${ad.id}`}
                          className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg text-xs font-semibold transition"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                      No advertisements configured yet. Click "+ Create New Advertisement" to add an Image, Video, or AdSense unit.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
