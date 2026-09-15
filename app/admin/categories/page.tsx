import Link from 'next/link';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifyToken } from '@/lib/auth';
import AdminCategoriesClient from '@/components/AdminCategoriesClient';

export default async function AdminCategoriesPage() {
  const token = (await cookies()).get('admin_token')?.value;
  if (!token || !verifyToken(token)) redirect('/admin');
  return <div className="min-h-screen bg-gray-50 dark:bg-gray-900"><div className="container-custom py-10"><div className="flex justify-between items-center mb-8"><div><h1 className="text-3xl font-bold">Categories</h1><p className="text-gray-600 dark:text-gray-400">Manage the categories used by articles and public browsing.</p></div><Link href="/admin/dashboard" className="btn btn-secondary">Back to Dashboard</Link></div><AdminCategoriesClient /></div></div>;
}
