import type { Metadata } from 'next';
import Link from 'next/link';
import { getArticlesByCategory } from '@/lib/articles';
import { getCategories } from '@/lib/categories';

export const metadata: Metadata = {
  title: 'Categories',
  description: 'Browse articles by category',
};

export default function CategoriesPage() {
  const categories = getCategories();
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-900 dark:to-gray-800 py-12">
        <div className="container-custom">
          <h1 className="text-4xl font-bold mb-4">Categories</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Explore our articles organized by topic
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <div className="container-custom py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map(category => {
            const articleCount = getArticlesByCategory(category.name).length;
            return (
              <Link key={category.id} href={`/category/${category.slug}`}>
                <div className="card p-8 hover:shadow-lg transition-shadow cursor-pointer h-full flex flex-col">
                  {category.icon && (
                    <div className="text-4xl mb-4">{category.icon}</div>
                  )}
                  <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 flex-1">
                    {category.description}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-500">
                    {articleCount} {articleCount === 1 ? 'article' : 'articles'}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
