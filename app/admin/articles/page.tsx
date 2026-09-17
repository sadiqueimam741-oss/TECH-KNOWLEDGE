import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifyToken } from '@/lib/auth';
import AdminArticlesClient from '@/components/AdminArticlesClient';

export default async function AdminArticlesPage() {
  const token = (await cookies()).get('admin_token')?.value;
  if (!token || !verifyToken(token)) {
    redirect('/admin');
  }

  return <AdminArticlesClient />;
}
