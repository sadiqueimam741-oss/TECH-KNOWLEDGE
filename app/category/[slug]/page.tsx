import type { Metadata } from 'next';
import { getArticlesByCategory } from '@/lib/articles';
import { getCategories } from '@/lib/categories';
import BlogPageClient from '@/components/BlogPageClient';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategories().find(c => c.slug === slug);

  if (!category) {
    return {
      title: 'Category Not Found',
    };
  }

  return {
    title: `${category.name} - Articles`,
    description: category.description,
  };
}

export const dynamic = 'force-dynamic';

export function generateStaticParams() {
  return getCategories().map(category => ({
    slug: category.slug,
  }));
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const categories = getCategories();
  const category = categories.find(c => c.slug === slug);

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Category Not Found</h1>
          <a href="/categories" className="btn btn-primary">
            View All Categories
          </a>
        </div>
      </div>
    );
  }

  const categoryArticles = getArticlesByCategory(category.name);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-100 to-blue-50 dark:from-blue-900 dark:to-blue-800 py-12">
        <div className="container-custom">
          <h1 className="text-4xl font-bold mb-4">{category.name}</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {category.description}
          </p>
        </div>
      </section>

      {/* Articles */}
      <div className="container-custom py-16">
        <BlogPageClient articles={categoryArticles} categories={categories} />
      </div>
    </div>
  );
}
