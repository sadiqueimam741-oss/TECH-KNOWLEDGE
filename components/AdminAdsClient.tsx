'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Advertisement } from '@/lib/types';

export default function AdminAdsClient() {
  const [advertisements, setAdvertisements] = useState<Advertisement[]>([]);

  useEffect(() => {
    fetch('/api/admin/advertisements')
      .then((response) => response.ok ? response.json() : { advertisements: [] })
      .then((data) => setAdvertisements(data.advertisements || []));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container-custom py-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Advertisements</h1>
            <p className="text-gray-600 dark:text-gray-400">Manage the ads that appear across the site.</p>
          </div>
          <Link href="/admin/ads/new" className="btn btn-primary">+ Add Advertisement</Link>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead className="bg-gray-100 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Advertiser</th>
                  <th className="px-4 py-3">Placement</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {advertisements.length > 0 ? advertisements.map((ad) => (
                  <tr key={ad.id} className="border-t border-gray-200 dark:border-gray-700">
                    <td className="px-4 py-3 font-medium">{ad.title}</td>
                    <td className="px-4 py-3">{ad.advertiser_name}</td>
                    <td className="px-4 py-3 capitalize">{ad.placement.replace(/_/g, ' ')}</td>
                    <td className="px-4 py-3"><span className="badge badge-blue">{ad.status}</span></td>
                    <td className="px-4 py-3 flex flex-wrap gap-2">
                      <Link href={`/admin/ads/${ad.id}/edit`} className="btn btn-secondary text-sm">Edit</Link>
                      <a href={`/admin/ads/${ad.id}`} className="btn btn-secondary text-sm">View</a>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-gray-500">No advertisements found.</td>
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
