import Link from 'next/link';
import { cookies } from 'next/headers';
import { notFound, redirect } from 'next/navigation';
import AdminAdvertisementForm from '@/components/AdminAdvertisementForm';
import { getAdvertisements } from '@/lib/advertisements';
import { verifyToken } from '@/lib/auth';

export default async function EditAdvertisementPage({ params }: { params: Promise<{ id: string }> }) {
  const token = (await cookies()).get('admin_token')?.value;

  if (!token || !verifyToken(token)) {
    redirect('/admin');
  }

  const { id } = await params;
  const advertisement = getAdvertisements().find((ad) => ad.id === id);

  if (!advertisement) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container-custom py-10">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Edit Advertisement</h1>
            <p className="text-gray-600 dark:text-gray-400">Update the selected ad placement.</p>
          </div>
          <Link href="/admin/ads" className="btn btn-secondary">Back to Ads</Link>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 md:p-10">
          <AdminAdvertisementForm initialAd={advertisement} />
        </div>
      </div>
    </div>
  );
}
