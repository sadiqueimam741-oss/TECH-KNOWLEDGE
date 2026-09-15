import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifyToken } from '@/lib/auth';
import AdminDashboardClient from '@/components/AdminDashboardClient';

export default async function AdminDashboardPage() {
  const token = (await cookies()).get('admin_token')?.value;

  if (!token || !verifyToken(token)) {
    redirect('/admin');
  }

  return <AdminDashboardClient />;
}
