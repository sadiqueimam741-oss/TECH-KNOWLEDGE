import Link from 'next/link';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifyToken } from '@/lib/auth';
import AdminCredentialsClient from '@/components/AdminCredentialsClient';

export default async function AdminSecurityPage() {
  const token = (await cookies()).get('admin_token')?.value;
  if (!token || !verifyToken(token)) {
    redirect('/admin');
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container-custom py-10">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Security & Account</h1>
            <p className="text-gray-600 dark:text-gray-400">Manage your admin account credentials and security settings.</p>
          </div>
          <Link href="/admin/dashboard" className="btn btn-secondary">Back to Dashboard</Link>
        </div>

        <AdminCredentialsClient />
      </div>
    </div>
  );
}
