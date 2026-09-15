import Link from 'next/link';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifyToken } from '@/lib/auth';
import AdminArticleForm from '@/components/AdminArticleForm';

export default async function NewArticlePage() {
  const token = (await cookies()).get('admin_token')?.value;
  if (!token || !verifyToken(token)) {
    redirect('/admin');
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container-custom py-10">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Create New Article</h1>
            <p className="text-gray-600 dark:text-gray-400">Add a new article to the blog.</p>
          </div>
          <Link href="/admin/articles" className="btn btn-secondary">Back to Articles</Link>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 md:p-10">
          <AdminArticleForm />
        </div>
      </div>
    </div>
  );
}
