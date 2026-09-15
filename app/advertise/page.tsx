import type { Metadata } from 'next';
import Link from 'next/link';
import { getArticleList } from '@/lib/articles';
import { getSiteSettings } from '@/lib/site-settings';

export const metadata: Metadata = {
  title: 'Advertise With Us',
  description: 'Advertising opportunities on TechKnowledge',
};

export default function AdvertisePage() {
  const settings = getSiteSettings();
  const customPrice = settings.advertising_custom_price || 'Contact for pricing';
  const articleCount = getArticleList().length;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 dark:from-blue-900 dark:to-blue-950 text-white py-16">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Advertise With TechKnowledge</h1>
          <p className="text-xl mb-8 text-blue-100">
            Reach a technology-focused audience interested in learning about the latest innovations
          </p>
        </div>
      </section>

      {/* Why Advertise */}
      <section className="py-16">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-8">Why Advertise With TechKnowledge?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card p-8">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold mb-3">Targeted Audience</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Reach readers passionate about technology, AI, cybersecurity, and innovation.
              </p>
            </div>
            <div className="card p-8">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-bold mb-3">Quality Content</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Your ads appear alongside well-researched, educational articles by tech experts.
              </p>
            </div>
            <div className="card p-8">
              <div className="text-4xl mb-4">🛡️</div>
              <h3 className="text-xl font-bold mb-3">Brand Safety</h3>
              <p className="text-gray-600 dark:text-gray-400">
                We carefully vet all advertisements to ensure quality and brand alignment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Advertising Options */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-8">Advertising Options</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="card p-8">
              <h3 className="text-2xl font-bold mb-4">Homepage Banner</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Prominent placement on our homepage where thousands of visitors see it daily.
              </p>
              <ul className="space-y-2 text-sm mb-6">
                <li>✓ High-visibility placement</li>
                <li>✓ Rotating schedule</li>
                <li>✓ Flexible duration</li>
              </ul>
              <p className="font-semibold text-blue-600 dark:text-blue-400">{customPrice}</p>
            </div>

            <div className="card p-8">
              <h3 className="text-2xl font-bold mb-4">Article Placement</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Ads displayed on article pages, reaching engaged readers mid-content.
              </p>
              <ul className="space-y-2 text-sm mb-6">
                <li>✓ In-article placements</li>
                <li>✓ Sidebar advertisements</li>
                <li>✓ Category-specific targeting</li>
              </ul>
              <p className="font-semibold text-blue-600 dark:text-blue-400">{customPrice}</p>
            </div>

            <div className="card p-8">
              <h3 className="text-2xl font-bold mb-4">Newsletter Sponsorship</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Sponsor our newsletter and reach subscribers directly in their inbox.
              </p>
              <ul className="space-y-2 text-sm mb-6">
                <li>✓ Direct email reach</li>
                <li>✓ Exclusive sponsorships</li>
                <li>✓ High engagement rates</li>
              </ul>
              <p className="font-semibold text-blue-600 dark:text-blue-400">{customPrice}</p>
            </div>

            <div className="card p-8">
              <h3 className="text-2xl font-bold mb-4">Sponsored Content</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Collaborate on in-depth, advertiser-sponsored articles clearly labeled as such.
              </p>
              <ul className="space-y-2 text-sm mb-6">
                <li>✓ Long-form content</li>
                <li>✓ Brand storytelling</li>
                <li>✓ Clearly labeled</li>
              </ul>
              <p className="font-semibold text-blue-600 dark:text-blue-400">{customPrice}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Audience Stats */}
      <section className="py-16">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-8">Our Audience</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">Not available</div>
              <p className="text-gray-600 dark:text-gray-400">Monthly Visitors</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">{articleCount}</div>
              <p className="text-gray-600 dark:text-gray-400">Articles Published</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">Not available</div>
              <p className="text-gray-600 dark:text-gray-400">Age Range</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">Not available</div>
              <p className="text-gray-600 dark:text-gray-400">Reach</p>
            </div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-8 text-center">
            Visitor and audience demographics will appear here when a verified analytics source is connected.
          </p>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-900 dark:to-blue-950 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Advertise?</h2>
          <p className="text-lg mb-8 text-blue-100 max-w-2xl mx-auto">
            Get in touch with our advertising team to discuss customized packages and pricing that fit your campaign goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn bg-white text-blue-600 hover:bg-gray-100">
              Send Inquiry
            </Link>
            {settings.contact_email && <a href={`mailto:${settings.contact_email}`} className="btn btn-primary">
              Email: {settings.contact_email}
            </a>}
          </div>
        </div>
      </section>

    </div>
  );
}
