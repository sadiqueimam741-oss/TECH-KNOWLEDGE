import Link from 'next/link';
import { getArticles } from '@/lib/articles';
import { getCategories } from '@/lib/categories';
import ArticleCard from '@/components/ArticleCard';
import { formatDisplayDate } from '@/lib/date';
import HomepageAdSlots from '@/components/HomepageAdSlots';

export const dynamic = 'force-dynamic';

export default function Home() {
  const articles = getArticles();
  const categories = getCategories();
  const featured = articles[0];
  const latest = articles.slice(0, 6);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 dark:from-blue-900 dark:to-blue-950 text-white py-20">
        <div className="container-custom text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Understand Technology. <br />Simply.
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Clear, practical explanations of the technology shaping our world.
          </p>
          <Link href="/blog" className="btn btn-primary text-lg">
            Explore Articles
          </Link>
        </div>
      </section>

      {/* Featured Article */}
      {featured && (
        <section className="py-16">
          <div className="container-custom">
            <h2 className="text-3xl font-bold mb-8">Featured</h2>
            <div className="grid md:grid-cols-3 gap-8 items-center">
              <div className="md:col-span-2">
                <Link href={`/article/${featured.slug}`} className="group">
                  <h3 className="text-3xl font-bold mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {featured.title}
                  </h3>
                </Link>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{featured.excerpt}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="badge badge-blue">{featured.category}</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {formatDisplayDate(featured.publication_date, { month: 'numeric', day: 'numeric', year: 'numeric' })}
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {featured.reading_time} min read
                  </span>
                </div>
                <Link href={`/article/${featured.slug}`} className="btn btn-primary">
                  Read Article
                </Link>
              </div>
              <div className="bg-gray-300 dark:bg-gray-700 rounded-lg h-64 flex items-center justify-center">
                <img
                  src={featured.featured_image}
                  alt={featured.featured_image_alt}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </section>
      )}

      <HomepageAdSlots />

      {/* Latest Articles */}
      <section className="py-16">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Latest Articles</h2>
            <Link href="/blog" className="link-text">
              View All →
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latest.map(article => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-8">Categories</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
            {categories.map(category => (
              <Link
                key={category.id}
                href={`/category/${category.slug}`}
                className="card p-6 hover:shadow-lg transition-shadow"
              >
                <h3 className="font-semibold mb-2">{category.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {category.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-8">About TechKnowledge</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
                TechKnowledge is dedicated to explaining complex technology in simple, accessible language.
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Whether you're curious about 5G networks, artificial intelligence, cybersecurity, or the latest tech innovations, we break it down for everyone—from complete beginners to tech enthusiasts.
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                Our mission is to empower people to understand the technology shaping our world.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 rounded-lg p-8 flex flex-col justify-center">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">{articles.length}</div>
                <p className="text-gray-700 dark:text-gray-300 mb-6">Articles Published</p>
                
                <div className="mb-8 pt-8 border-t border-blue-300 dark:border-blue-700"></div>

                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">{categories.length}</div>
                <p className="text-gray-700 dark:text-gray-300">Categories</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
