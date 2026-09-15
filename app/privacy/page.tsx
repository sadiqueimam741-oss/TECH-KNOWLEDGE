import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'TechKnowledge Privacy Policy',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-900 dark:to-gray-800 py-12">
        <div className="container-custom">
          <h1 className="text-4xl font-bold">Privacy Policy</h1>
        </div>
      </section>

      {/* Content */}
      <div className="container-custom py-16">
        <div className="max-w-3xl mx-auto prose dark:prose-invert">
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <h2>Introduction</h2>
          <p>
            TechKnowledge ("we", "us", "our", or "Company") respects the privacy of our users ("user" or "you"). 
            This Privacy Policy explains how we collect, use, disclose, and otherwise handle your information when you visit our website.
          </p>

          <h2>Information We Collect</h2>
          <p>
            <strong>Directly from You:</strong> When you contact us through our contact form or email, we collect the information you provide, 
            such as your name, email address, and message content.
          </p>
          <p>
            <strong>Automatically:</strong> We may collect information about your browsing activity, such as pages visited, 
            time spent on pages, and referral sources, through standard web analytics tools.
          </p>

          <h2>How We Use Your Information</h2>
          <ul>
            <li>To respond to your inquiries and provide customer support</li>
            <li>To improve our website and content</li>
            <li>To monitor and analyze website traffic and usage patterns</li>
            <li>To prevent fraud and ensure security</li>
          </ul>

          <h2>Cookies</h2>
          <p>
            We use cookies to store your theme preference (light/dark mode). These cookies are stored locally on your device 
            and do not track personal information across websites.
          </p>

          <h2>Third-Party Services</h2>
          <p>
            We may use third-party analytics services to understand how our users interact with our website. 
            These services have their own privacy policies.
          </p>

          <h2>Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your information against unauthorized access, 
            alteration, disclosure, or destruction.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy, please <a href="/contact">contact us</a>.
          </p>

          <p className="text-sm text-gray-600 dark:text-gray-400 pt-8">
            This is a placeholder privacy policy. Please consult with legal counsel to create a privacy policy that complies with 
            applicable laws and regulations in your jurisdiction.
          </p>
        </div>
      </div>
    </div>
  );
}
