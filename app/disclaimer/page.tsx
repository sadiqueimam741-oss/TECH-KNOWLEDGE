import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Disclaimer',
  description: 'TechKnowledge Disclaimer - Information regarding content accuracy, warranties, and liability.',
};

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-900 dark:to-gray-800 py-12">
        <div className="container-custom">
          <h1 className="text-4xl font-bold">Disclaimer</h1>
        </div>
      </section>

      {/* Content */}
      <div className="container-custom py-16">
        <div className="max-w-3xl mx-auto prose dark:prose-invert">
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <h2>1. Educational & Informational Purposes Only</h2>
          <p>
            The technical guides, tutorials, and articles on TechKnowledge are published solely for educational, informational, and research purposes. 
            While we strive to ensure that all information is accurate and up-to-date, technology frameworks, protocols, and APIs evolve rapidly. 
            We make no representation or warranty of any kind regarding accuracy, adequacy, validity, or completeness.
          </p>

          <h2>2. No Professional or Security Consultation</h2>
          <p>
            The content provided on this website is not intended as professional cybersecurity, legal, financial, or architectural advice. 
            Implementing code, infrastructure changes, or cryptographic systems in production should always be validated by qualified software engineers and security professionals.
          </p>

          <h2>3. External Links & Affiliations</h2>
          <p>
            TechKnowledge may contain links to external third-party websites, tools, documentation, or services. 
            We do not warrant, endorse, or assume responsibility for the accuracy or reliability of any information offered by third-party websites.
          </p>

          <h2>4. Use at Your Own Risk</h2>
          <p>
            Under no circumstance shall TechKnowledge have any liability to you for any loss or damage of any kind incurred as a result of the use of this site 
            or reliance on any information provided. Your use of the site and reliance on any information is solely at your own risk.
          </p>

          <h2>5. Contact Us</h2>
          <p>
            If you have questions regarding this Disclaimer, please reach out via our <a href="/contact">Contact Page</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
