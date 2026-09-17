import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getArticleBySlug, getArticles, getArticlesByCategory } from '@/lib/articles';
import { getActiveAdvertisements } from '@/lib/advertisements';
import ArticleCard from '@/components/ArticleCard';
import ArticleContentClient from '@/components/ArticleContentClient';
import AdRenderer from '@/components/AdRenderer';
import { formatDisplayDate } from '@/lib/date';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return {
      title: 'Article Not Found',
    };
  }

  return {
    title: article.seo_title || article.title,
    description: article.seo_description || article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      publishedTime: article.publication_date,
      authors: [article.author],
      tags: article.tags,
      images: article.social_image ? [{ url: article.social_image }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: article.social_image ? [article.social_image] : [],
    },
    ...(article.canonical_url && { canonicalUrl: article.canonical_url }),
  };
}

export function generateStaticParams() {
  return getArticles().map(article => ({
    slug: article.slug,
  }));
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  // Get active ads
  const topAds = getActiveAdvertisements('article_top');
  const bottomAds = getActiveAdvertisements('article_bottom');
  const sidebarAds = getActiveAdvertisements('sidebar');

  // Get related articles
  const relatedArticles = getArticlesByCategory(article.category)
    .filter(a => a.id !== article.id)
    .slice(0, 3);

  // Get previous and next articles
  const allArticles = getArticles();
  const currentIndex = allArticles.findIndex(a => a.id === article.id);
  const prevArticle = currentIndex > 0 ? allArticles[currentIndex - 1] : null;
  const nextArticle = currentIndex < allArticles.length - 1 ? allArticles[currentIndex + 1] : null;

  return (
    <article className="min-h-screen">
      {/* Hero Image */}
      <div className="h-96 bg-gray-300 dark:bg-gray-700 overflow-hidden">
        <img
          src={article.featured_image}
          alt={article.featured_image_alt}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Article Content */}
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Header */}
            <header className="mb-8">
              <div className="mb-4">
                <span className="badge badge-blue text-sm">{article.category}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{article.title}</h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">{article.subtitle}</p>

              {/* Meta Information */}
              <div className="flex flex-wrap gap-6 text-sm text-gray-600 dark:text-gray-400 pb-6 border-b border-gray-200 dark:border-gray-800">
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">By {article.author}</p>
                </div>
                <div>
                  <p>Published: {formatDisplayDate(article.publication_date, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</p>
                </div>
                {article.updated_date && (
                  <div>
                    <p>Updated: {formatDisplayDate(article.updated_date, {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</p>
                  </div>
                )}
                <div>
                  <p>{article.reading_time} minute read</p>
                </div>
              </div>
            </header>

            {/* In-Article Top Ad Slot */}
            {topAds.length > 0 && (
              <div className="my-6">
                <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block mb-1">Sponsored</span>
                <AdRenderer ad={topAds[0]} />
              </div>
            )}

            {/* Article Body - Client Component for Markdown */}
            <ArticleContentClient content={article.content} />

            {/* In-Article Bottom Ad Slot */}
            {bottomAds.length > 0 && (
              <div className="my-8 pt-6 border-t border-gray-100 dark:border-gray-800">
                <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block mb-1">Sponsored</span>
                <AdRenderer ad={bottomAds[0]} />
              </div>
            )}

            {/* Tags */}
            {article.tags.length > 0 && (
              <div className="mt-12 pt-12 border-t border-gray-200 dark:border-gray-800">
                <h3 className="font-semibold mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map(tag => (
                    <Link
                      key={tag}
                      href={`/blog?search=${encodeURIComponent(tag)}`}
                      className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-sm"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Share Buttons */}
            <div className="mt-12 pt-12 border-t border-gray-200 dark:border-gray-800">
              <h3 className="font-semibold mb-4">Share</h3>
              <div className="flex gap-4">
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(`https://techknowledge.com/article/${article.slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                  title="Share on Twitter"
                >
                  Twitter
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://techknowledge.com/article/${article.slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                  title="Share on LinkedIn"
                >
                  LinkedIn
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://techknowledge.com/article/${article.slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                  title="Share on Facebook"
                >
                  Facebook
                </a>
              </div>
            </div>

            {/* Article Navigation */}
            {(prevArticle || nextArticle) && (
              <div className="mt-12 pt-12 border-t border-gray-200 dark:border-gray-800">
                <div className="grid md:grid-cols-2 gap-8">
                  {prevArticle ? (
                    <Link href={`/article/${prevArticle.slug}`}>
                      <div className="card p-6 hover:shadow-lg transition-shadow">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">← Previous Article</p>
                        <h3 className="font-semibold line-clamp-2">{prevArticle.title}</h3>
                      </div>
                    </Link>
                  ) : (
                    <div />
                  )}
                  {nextArticle ? (
                    <Link href={`/article/${nextArticle.slug}`}>
                      <div className="card p-6 hover:shadow-lg transition-shadow">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Next Article →</p>
                        <h3 className="font-semibold line-clamp-2">{nextArticle.title}</h3>
                      </div>
                    </Link>
                  ) : (
                    <div />
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Sidebar Advertisement Slot */}
            <div className="card p-4 mb-8 bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700">
              <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block mb-2">Advertisement</span>
              {sidebarAds.length > 0 ? (
                <AdRenderer ad={sidebarAds[0]} />
              ) : (
                <div className="bg-gray-100 dark:bg-gray-800 h-56 rounded-xl flex flex-col items-center justify-center p-4 border border-dashed border-gray-300 dark:border-gray-700 text-center">
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">Sidebar Ad Placement</p>
                  <a href="/advertise" className="text-[11px] text-primary-600 hover:underline mt-1">Advertise with Us ↗</a>
                </div>
              )}
            </div>

            {/* Related Articles */}
            {relatedArticles.length > 0 && (
              <div>
                <h3 className="text-xl font-bold mb-6">Related Articles</h3>
                <div className="space-y-4">
                  {relatedArticles.map(relatedArticle => (
                    <Link key={relatedArticle.id} href={`/article/${relatedArticle.slug}`}>
                      <div className="card p-4 hover:shadow-lg transition-shadow cursor-pointer">
                        <h4 className="font-semibold line-clamp-2 mb-2">{relatedArticle.title}</h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {formatDisplayDate(relatedArticle.publication_date, { month: 'numeric', day: 'numeric', year: 'numeric' })}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* More Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="container-custom">
            <h2 className="text-3xl font-bold mb-8">More in {article.category}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedArticles.map(relatedArticle => (
                <ArticleCard key={relatedArticle.id} article={relatedArticle} />
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
