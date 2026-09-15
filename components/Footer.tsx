import Link from 'next/link';
import { getSiteSettings } from '@/lib/site-settings';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const settings = getSiteSettings();

  return (
    <footer className="bg-gray-900 dark:bg-darker text-white mt-16">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">TK</span>
              </div>
              <span className="font-bold">{settings.site_name}</span>
            </div>
            <p className="text-gray-400 text-sm">{settings.site_description}</p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-bold mb-4">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-gray-400 hover:text-white transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-gray-400 hover:text-white transition-colors">
                  Admin
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-bold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="text-gray-400 hover:text-white transition-colors">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>

          {/* Business */}
          <div>
            <h3 className="font-bold mb-4">Business</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/advertise" className="text-gray-400 hover:text-white transition-colors">
                  Advertise With Us
                </Link>
              </li>
              <li>
                {settings.contact_email && <a href={`mailto:${settings.contact_email}`} className="text-gray-400 hover:text-white transition-colors">
                  Email Us
                </a>}
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; {currentYear} {settings.site_name}. All rights reserved.
            </p>
            <div className="flex gap-6 mt-4 md:mt-0">
              {settings.social_links.twitter && <a href={settings.social_links.twitter} className="text-gray-400 hover:text-white transition-colors" target="_blank" rel="noreferrer">Twitter</a>}
              {settings.social_links.linkedin && <a href={settings.social_links.linkedin} className="text-gray-400 hover:text-white transition-colors" target="_blank" rel="noreferrer">LinkedIn</a>}
              {settings.social_links.github && <a href={settings.social_links.github} className="text-gray-400 hover:text-white transition-colors" target="_blank" rel="noreferrer">GitHub</a>}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
