'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { formatDisplayDate } from '@/lib/date';
import { Article } from '@/lib/types';

export default function AdminDashboardClient() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'articles' | 'ads' | 'settings' | 'security'>('articles');
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    fetch('/api/admin/articles')
      .then((res) => (res.ok ? res.json() : { articles: [] }))
      .then((data) => setArticles(data.articles || []))
      .catch(() => setArticles([]));
  }, []);

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="container-custom py-6 flex justify-between items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400">Manage articles, settings, and advertisements</p>
          </div>
          <button onClick={handleLogout} className="btn btn-secondary">Logout</button>
        </div>
      </header>

      <div className="container-custom py-8">
        <div className="flex gap-4 mb-8 border-b border-gray-200 dark:border-gray-700">
          <button onClick={() => setActiveTab('articles')} className={`px-4 py-2 font-medium border-b-2 -mb-1 transition-colors ${activeTab === 'articles' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'}`}>
            Articles
          </button>
          <button onClick={() => setActiveTab('ads')} className={`px-4 py-2 font-medium border-b-2 -mb-1 transition-colors ${activeTab === 'ads' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'}`}>
            Advertisements
          </button>
          <button onClick={() => setActiveTab('settings')} className={`px-4 py-2 font-medium border-b-2 -mb-1 transition-colors ${activeTab === 'settings' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'}`}>
            Settings
          </button>
          <button onClick={() => setActiveTab('security')} className={`px-4 py-2 font-medium border-b-2 -mb-1 transition-colors ${activeTab === 'security' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'}`}>
            Security
          </button>
          <Link href="/admin/categories" className="px-4 py-2 font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200">
            Categories
          </Link>
        </div>

        {activeTab === 'articles' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Articles</h2>
              <Link href="/admin/articles/new" className="btn btn-primary">+ New Article</Link>
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
                        <td className="px-4 py-3 flex gap-2">
                          <Link href={`/admin/articles/${article.id}/edit`} className="btn btn-secondary text-sm">Edit</Link>
                          <Link href={`/article/${article.slug}`} target="_blank" className="btn btn-secondary text-sm">View</Link>
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan={5} className="px-4 py-8 text-center text-gray-500">No articles yet. <Link href="/admin/articles/new" className="link-text">Create one</Link></td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'ads' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Advertisements</h2>
              <Link href="/admin/ads/new" className="btn btn-primary">+ New Advertisement</Link>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center">
              <p className="text-gray-600 dark:text-gray-400 mb-4">Advertisement management is available from the admin ad pages.</p>
              <Link href="/admin/ads" className="btn btn-secondary">Open Ads Manager</Link>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Settings</h2>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8">
              <p className="text-gray-600 dark:text-gray-400 mb-4">Update the site-wide branding and contact details below.</p>
              <Link href="/admin/settings" className="btn btn-primary">Open Site Settings</Link>
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Security & Account</h2>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8">
              <p className="text-gray-600 dark:text-gray-400 mb-4">Manage your admin account credentials and security settings.</p>
              <Link href="/admin/security" className="btn btn-primary">Open Security Settings</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
