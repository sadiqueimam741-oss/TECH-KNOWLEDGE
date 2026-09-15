import Link from 'next/link';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifyToken } from '@/lib/auth';
import { formatDisplayDate } from '@/lib/date';
import { getArticleList } from '@/lib/articles';

export default async function AdminArticlesPage() {
  const token = (await cookies()).get('admin_token')?.value;
  if (!token || !verifyToken(token)) {
    redirect('/admin');
  }

  const articles = getArticleList();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container-custom py-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Articles</h1>
            <p className="text-gray-600 dark:text-gray-400">Create, edit, publish, and manage content.</p>
          </div>
          <Link href="/admin/articles/new" className="btn btn-primary">+ Add New Article</Link>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead className="bg-gray-100 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {articles.length > 0 ? articles.map((article) => (
                  <tr key={article.id} className="border-t border-gray-200 dark:border-gray-700">
                    <td className="px-4 py-3 font-medium">{article.title}</td>
                    <td className="px-4 py-3"><span className="badge badge-blue">{article.status}</span></td>
                    <td className="px-4 py-3">{article.category}</td>
                    <td className="px-4 py-3">{formatDisplayDate(article.publication_date, { month: 'numeric', day: 'numeric', year: 'numeric' })}</td>
                    <td className="px-4 py-3 flex flex-wrap gap-2">
                      <Link href={`/admin/articles/${article.id}/edit`} className="btn btn-secondary text-sm">Edit</Link>
                      <Link href={`/article/${article.slug}`} target="_blank" className="btn btn-secondary text-sm">View</Link>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-gray-500">No articles found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
