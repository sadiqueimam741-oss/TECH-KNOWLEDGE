import type { Metadata } from 'next';
import { searchArticles } from '@/lib/articles';
import { getCategories } from '@/lib/categories';
import BlogPageClient from '@/components/BlogPageClient';

export const metadata: Metadata = {
  title: 'Search',
  description: 'Search articles on TechKnowledge',
};

interface Props {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: Props) {
  const { q } = await searchParams;
  const query = q || '';
  const results = query ? searchArticles(query) : [];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-900 dark:to-gray-800 py-12">
        <div className="container-custom">
          <h1 className="text-4xl font-bold mb-4">Search Results</h1>
          {query && (
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {results.length} result{results.length !== 1 ? 's' : ''} found for "{query}"
            </p>
          )}
        </div>
      </section>

      {/* Search Results */}
      <div className="container-custom py-16">
        <BlogPageClient articles={results} categories={getCategories()} />
      </div>
    </div>
  );
}
