import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
          <p className="text-2xl text-gray-600 dark:text-gray-400 mb-2">Page Not Found</p>
          <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
            Sorry, the page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="btn btn-primary">
            Go to Home
          </Link>
          <Link href="/blog" className="btn btn-secondary">
            Browse Articles
          </Link>
        </div>
      </div>
    </div>
  );
}
