import type { Metadata } from 'next';
import { Providers } from '@/components/Providers';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { getSiteSettings } from '@/lib/site-settings';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'TechKnowledge - Understand Technology. Simply.',
    template: '%s | TechKnowledge',
  },
  description: 'Clear, practical explanations of the technology shaping our world.',
  keywords: ['technology', 'AI', '5G', 'cybersecurity', 'gaming', 'hardware', 'science'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://techknowledge.com',
    siteName: 'TechKnowledge',
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@techknowledge',
  },
};

export const dynamic = 'force-dynamic';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = getSiteSettings().theme;
  const themeStyle = {
    '--site-primary': theme.primary,
    '--site-secondary': theme.secondary,
    '--site-accent': theme.accent,
    '--site-background': theme.background,
    '--site-surface': theme.surface,
    '--site-text': theme.text,
    '--site-muted-text': theme.muted_text,
    '--site-border': theme.border,
    '--site-link': theme.link,
    '--site-header': theme.header,
    '--site-footer': theme.footer,
  } as React.CSSProperties;

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-xxxxxxxxxxxxxxxx"
          crossOrigin="anonymous"
        />
      </head>
      <body style={themeStyle} className="bg-white dark:bg-dark text-gray-900 dark:text-gray-100 transition-colors">
        <Providers>
          <Navigation />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
