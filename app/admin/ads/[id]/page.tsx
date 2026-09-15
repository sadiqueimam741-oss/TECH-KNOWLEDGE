import Link from 'next/link';
import { cookies } from 'next/headers';
import { notFound, redirect } from 'next/navigation';
import { getAdvertisements } from '@/lib/advertisements';
import { verifyToken } from '@/lib/auth';

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
          <div><h1 className="text-3xl font-bold">{advertisement.title}</h1><p className="text-gray-600 dark:text-gray-400">Advertisement preview</p></div>
          <div className="flex gap-3"><Link href="/admin/ads" className="btn btn-secondary">Back</Link><Link href={`/admin/ads/${id}/edit`} className="btn btn-primary">Edit</Link></div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 md:p-10 space-y-5">
          <img src={advertisement.image} alt={advertisement.image_alt || advertisement.title} className="w-full max-h-96 object-contain rounded-lg" />
          <dl className="grid sm:grid-cols-2 gap-4">
            <div><dt className="font-semibold">Advertiser</dt><dd>{advertisement.advertiser_name}</dd></div>
            <div><dt className="font-semibold">Status</dt><dd>{advertisement.status}</dd></div>
            <div><dt className="font-semibold">Placement</dt><dd>{advertisement.placement.replace(/_/g, ' ')}</dd></div>
            <div><dt className="font-semibold">Schedule</dt><dd>{advertisement.start_date} to {advertisement.end_date}</dd></div>
          </dl>
          <a href={advertisement.destination_url} target="_blank" rel="noreferrer" className="btn btn-secondary">Open destination</a>
        </div>
      </div>
    </div>
  );
}
