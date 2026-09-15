import { getSiteSettings } from '@/lib/site-settings';

export default function AboutPageClient() {
  const settings = getSiteSettings();

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-900 dark:to-gray-800 py-12">
        <div className="container-custom">
          <h1 className="text-4xl font-bold">About {settings.site_name}</h1>
        </div>
      </section>

      {/* Content */}
      <div className="container-custom py-16">
        <div className="max-w-3xl mx-auto prose dark:prose-invert">
          {settings.about_information ? (
            <div className="whitespace-pre-wrap leading-relaxed text-gray-700 dark:text-gray-300">
              {settings.about_information}
            </div>
          ) : (
            <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg text-center">
              <p className="text-gray-600 dark:text-gray-400">
                The about information for this site has not been configured yet. Please visit the admin panel to add it.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
