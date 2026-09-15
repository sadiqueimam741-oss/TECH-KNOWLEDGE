import Link from 'next/link';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifyToken } from '@/lib/auth';
import AdminArticleForm from '@/components/AdminArticleForm';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditArticlePage({ params }: Props) {
  const token = (await cookies()).get('admin_token')?.value;
  if (!token || !verifyToken(token)) {
    redirect('/admin');
  }

  const { id } = await params;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container-custom py-10">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Edit Article</h1>
            <p className="text-gray-600 dark:text-gray-400">Update the article information and publish status.</p>
          </div>
          <Link href="/admin/articles" className="btn btn-secondary">Back to Articles</Link>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 md:p-10">
          <AdminArticleForm articleId={id} />
        </div>
      </div>
    </div>
  );
}
