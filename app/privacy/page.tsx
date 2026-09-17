import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'TechKnowledge Privacy Policy - Information about data collection, cookies, and advertising practices.',
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
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <h2>1. Introduction</h2>
          <p>
            Welcome to TechKnowledge ("we", "us", "our"). We are committed to protecting your privacy and personal data.
            This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
          </p>

          <h2>2. Information We Collect</h2>
          <p>
            <strong>Information You Provide Voluntarily:</strong> When you submit a message through our contact form or subscribe to updates, 
            we collect details such as your name, email address, and message content.
          </p>
          <p>
            <strong>Automatically Collected Information:</strong> When you access our website, our web servers and analytics tools may automatically 
            record non-personally identifiable information, including your IP address, browser type, operating system, referring URLs, device information, 
            and pages viewed.
          </p>

          <h2>3. Cookies and Tracking Technologies</h2>
          <p>
            We use cookies, web beacons, and similar tracking technologies to enhance user experience, remember user preferences (such as light/dark theme), 
            and analyze traffic patterns.
          </p>
          <p>
            You can configure your browser to reject cookies or notify you when a cookie is sent. However, some features of our website may not function properly without cookies.
          </p>

          <h2>4. Third-Party Advertising & Google AdSense</h2>
          <p>
            We may partner with third-party advertising companies, including <strong>Google AdSense</strong> and direct sponsors, to serve advertisements when you visit our site.
          </p>
          <ul>
            <li>
              <strong>Google & Third-Party Vendors:</strong> Google, as a third-party vendor, uses cookies to serve ads on TechKnowledge.
            </li>
            <li>
              <strong>DART Cookies:</strong> Google's use of the DoubleClick DART cookie enables it and its partners to serve personalized ads to our users based on their visits to our website and other sites across the Internet.
            </li>
            <li>
              <strong>Opting Out:</strong> Users may opt out of personalized advertising by visiting the <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">Google Ads Settings</a> page or by visiting the Network Advertising Initiative opt-out page at <a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer">www.aboutads.info</a>.
            </li>
          </ul>

          <h2>5. How We Use Your Information</h2>
          <p>We use the collected information to:</p>
          <ul>
            <li>Deliver, operate, and maintain our technical articles and educational content.</li>
            <li>Respond promptly to reader inquiries, feedback, and support requests.</li>
            <li>Monitor and analyze usage trends to optimize website performance and user experience.</li>
            <li>Protect our website against spam, unauthorized access, and malicious activity.</li>
          </ul>

          <h2>6. Third-Party Links</h2>
          <p>
            Our articles may contain links to external third-party websites or services. We are not responsible for the privacy practices, content, or policies of those third-party sites.
          </p>

          <h2>7. Data Security</h2>
          <p>
            We apply industry-standard technical and organizational security measures to protect your information against unauthorized access, loss, or alteration.
          </p>

          <h2>8. Updates to This Policy</h2>
          <p>
            We may update our Privacy Policy periodically. Any modifications will be posted on this page with an updated "Last updated" date.
          </p>

          <h2>9. Contact Us</h2>
          <p>
            If you have questions or concerns regarding this Privacy Policy, please reach out through our <a href="/contact">Contact Page</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
