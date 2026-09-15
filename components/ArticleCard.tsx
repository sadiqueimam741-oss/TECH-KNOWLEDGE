'use client';

import Link from 'next/link';
import { formatDisplayDate } from '@/lib/date';
import { Article } from '@/lib/types';

export default function ArticleCard({ article }: { article: Article }) {
  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const image = event.currentTarget;
    if (image.dataset.fallbackApplied === 'true') {
      return;
    }

    image.dataset.fallbackApplied = 'true';
    image.src = '/images/placeholder.svg';
  };

  return (
    <Link href={`/article/${article.slug}`}>
      <div className="card overflow-hidden hover:shadow-xl transition-shadow cursor-pointer h-full flex flex-col">
        <div className="h-40 bg-gray-300 dark:bg-gray-700 overflow-hidden flex-shrink-0">
          <img
            src={article.featured_image || '/images/placeholder.svg'}
            alt={article.featured_image_alt || article.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            onError={handleImageError}
          />
        </div>

        <div className="p-6 flex-1 flex flex-col">
          <div className="mb-3">
            <span className="badge badge-blue text-xs">{article.category}</span>
          </div>

          <h3 className="text-lg font-bold mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400">
            {article.title}
          </h3>

          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 flex-1">
            {article.excerpt}
          </p>

          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-500">
            <span>{formatDisplayDate(article.publication_date, { month: 'numeric', day: 'numeric', year: 'numeric' })}</span>
            <span>{article.reading_time} min read</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
