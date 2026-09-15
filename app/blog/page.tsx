import type { Metadata } from 'next';
import { getArticles } from '@/lib/articles';
import { getCategories } from '@/lib/categories';
import BlogPageClient from '@/components/BlogPageClient';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Read all our articles about technology, AI, 5G, and more.',
};

export default function BlogPage() {
  const articles = getArticles();

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-900 dark:to-gray-800 py-12">
        <div className="container-custom">
          <h1 className="text-4xl font-bold mb-4">Blog</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Explore articles about technology, science, and everything in between.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container-custom py-16">
        <BlogPageClient articles={articles} categories={getCategories()} />
      </div>
    </div>
  );
}
