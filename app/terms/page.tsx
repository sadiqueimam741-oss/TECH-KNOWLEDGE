import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'TechKnowledge Terms of Service - Rules and guidelines for using our website.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-900 dark:to-gray-800 py-12">
        <div className="container-custom">
          <h1 className="text-4xl font-bold">Terms of Service</h1>
        </div>
      </section>

      {/* Content */}
      <div className="container-custom py-16">
        <div className="max-w-3xl mx-auto prose dark:prose-invert">
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <h2>1. Agreement to Terms</h2>
          <p>
            By accessing and using TechKnowledge, you accept and agree to be bound by the terms and provisions of this agreement. 
            If you do not agree to these terms, please do not use our website.
          </p>

          <h2>2. Intellectual Property & Use License</h2>
          <p>
            All content published on TechKnowledge—including articles, tutorials, graphics, code snippets, and site branding—is 
            the property of TechKnowledge unless otherwise stated.
          </p>
          <p>Permission is granted to read, share, and reference our content for personal and educational use provided that:</p>
          <ul>
            <li>You attribute TechKnowledge with a direct, clickable link to the original article.</li>
            <li>You do not republish or scrape entire articles for commercial duplication without prior written consent.</li>
            <li>You do not attempt to decompile, reverse-engineer, or disrupt any software running on the website.</li>
          </ul>

          <h2>3. Disclaimer of Warranties</h2>
          <p>
            The materials and technical guides on TechKnowledge are provided on an "as is" and "as available" basis. 
            We make no warranties, expressed or implied, regarding completeness, reliability, or accuracy for specific application deployments.
          </p>

          <h2>4. Limitation of Liability</h2>
          <p>
            In no event shall TechKnowledge, its authors, or operators be liable for any damages (including data loss, downtime, or security incidents) 
            resulting from the application of concepts, code, or tutorials found on this site.
          </p>

          <h2>5. External Links</h2>
          <p>
            TechKnowledge may contain links to third-party websites or services. We do not endorse or assume responsibility for any third-party content, 
            products, or privacy practices.
          </p>

          <h2>6. Changes to Terms</h2>
          <p>
            We reserve the right to revise these Terms of Service at any time. Continued use of the website after any revisions constitutes your acceptance of the updated terms.
          </p>

          <h2>7. Contact</h2>
          <p>
            If you have questions about these Terms of Service, please <a href="/contact">contact us</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
