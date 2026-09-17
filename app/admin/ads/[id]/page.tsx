import Link from 'next/link';
import { cookies } from 'next/headers';
import { notFound, redirect } from 'next/navigation';
import { getAdvertisements } from '@/lib/advertisements';
import { verifyToken } from '@/lib/auth';
import AdRenderer from '@/components/AdRenderer';

export default async function AdvertisementViewPage({ params }: { params: Promise<{ id: string }> }) {
  const token = (await cookies()).get('admin_token')?.value;
  if (!token || !verifyToken(token)) redirect('/admin');

  const { id } = await params;
  const advertisement = getAdvertisements().find((item) => item.id === id);
  if (!advertisement) notFound();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container-custom py-10">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">{advertisement.title}</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Format: <span className="font-semibold uppercase text-primary-600">{advertisement.ad_type || 'image'}</span>
            </p>
          </div>
          <div className="flex gap-3">
            <Link href="/admin/ads" className="px-4 py-2 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-sm font-medium">
              Back to Ads
            </Link>
            <Link href={`/admin/ads/${id}/edit`} className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-semibold shadow">
              Edit Campaign
            </Link>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 md:p-8 space-y-6">
          <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 flex items-center justify-center">
            <AdRenderer ad={advertisement} />
          </div>

          <dl className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 border-t border-gray-100 dark:border-gray-700 pt-6 text-sm">
            <div>
              <dt className="text-gray-500 dark:text-gray-400">Advertiser</dt>
              <dd className="font-semibold text-gray-900 dark:text-white mt-0.5">{advertisement.advertiser_name}</dd>
            </div>
            <div>
              <dt className="text-gray-500 dark:text-gray-400">Status</dt>
              <dd className="font-semibold text-gray-900 dark:text-white mt-0.5 capitalize">{advertisement.status}</dd>
            </div>
            <div>
              <dt className="text-gray-500 dark:text-gray-400">Placement</dt>
              <dd className="font-semibold text-gray-900 dark:text-white mt-0.5 capitalize">{advertisement.placement.replace(/_/g, ' ')}</dd>
            </div>
            <div>
              <dt className="text-gray-500 dark:text-gray-400">Schedule</dt>
              <dd className="font-semibold text-gray-900 dark:text-white mt-0.5">{advertisement.start_date} to {advertisement.end_date}</dd>
            </div>
          </dl>

          {advertisement.destination_url && advertisement.destination_url !== '#' && (
            <div className="pt-2">
              <a
                href={advertisement.destination_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-sm text-primary-600 hover:underline font-semibold"
              >
                Open Destination Link: {advertisement.destination_url} ↗
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
