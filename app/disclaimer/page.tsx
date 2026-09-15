import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Disclaimer',
  description: 'TechKnowledge Disclaimer',
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
          <h2>Content Disclaimer</h2>
          <p>
            The information provided on TechKnowledge is for educational and informational purposes only. 
            While we strive to ensure the accuracy of our content, we do not guarantee that all information is complete, 
            accurate, current, or reliable.
          </p>

          <h2>No Professional Advice</h2>
          <p>
            The content on this website should not be considered as professional advice. TechKnowledge is not a substitute for:
          </p>
          <ul>
            <li>Professional technical consultation</li>
            <li>Legal advice</li>
            <li>Medical advice</li>
            <li>Financial advice</li>
            <li>Security consultation</li>
          </ul>

          <p>
            Always consult with qualified professionals before making any decisions based on information from this website.
          </p>

          <h2>External Links</h2>
          <p>
            TechKnowledge is not responsible for the content, accuracy, or practices of any external websites linked from our site. 
            Access to external websites is at your own risk.
          </p>

          <h2>Technology Changes</h2>
          <p>
            Technology is constantly evolving. Information on this website may become outdated. We recommend verifying critical information 
            with the most current sources, especially for rapidly changing topics like AI, 5G, and cybersecurity.
          </p>

          <h2>No Warranty</h2>
          <p>
            TechKnowledge provides this website "as-is" without any warranties, expressed or implied. 
            We do not guarantee:
          </p>
          <ul>
            <li>Uninterrupted or error-free access</li>
            <li>That any defects will be corrected</li>
            <li>That the website is free from viruses or other harmful components</li>
          </ul>

          <h2>Limitation of Liability</h2>
          <p>
            In no event shall TechKnowledge be liable for any direct, indirect, incidental, special, or consequential damages 
            resulting from the use of or inability to use the content on this website.
          </p>

          <h2>User Responsibility</h2>
          <p>
            You are responsible for:
          </p>
          <ul>
            <li>Evaluating the accuracy and usefulness of information</li>
            <li>Verifying critical information with authoritative sources</li>
            <li>Using this information appropriately and lawfully</li>
          </ul>

          <p className="text-sm text-gray-600 dark:text-gray-400 pt-8">
            This is a placeholder disclaimer. Please consult with legal counsel to create a disclaimer that complies with 
            applicable laws and regulations in your jurisdiction.
          </p>
        </div>
      </div>
    </div>
  );
}
