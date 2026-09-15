import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifyToken } from '@/lib/auth';
import AdminAdsClient from '@/components/AdminAdsClient';

export default async function AdminAdsPage() {
  const token = (await cookies()).get('admin_token')?.value;

  if (!token || !verifyToken(token)) {
    redirect('/admin');
  }

  return <AdminAdsClient />;
}
