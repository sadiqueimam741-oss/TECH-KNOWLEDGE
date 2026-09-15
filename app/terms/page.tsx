import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'TechKnowledge Terms of Service',
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
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <h2>1. Agreement to Terms</h2>
          <p>
            By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.
          </p>

          <h2>2. Use License</h2>
          <p>
            Permission is granted to temporarily download one copy of the materials (information or software) on TechKnowledge 
            for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, 
            and under this license you may not:
          </p>
          <ul>
            <li>Modifying or copying the materials</li>
            <li>Using the materials for any commercial purpose or for any public display</li>
            <li>Attempting to decompile or reverse engineer any software contained on the website</li>
            <li>Removing any copyright or other proprietary notations from the materials</li>
            <li>Transferring the materials to another person or "mirroring" the materials on any other server</li>
          </ul>

          <h2>3. Disclaimer</h2>
          <p>
            The materials on TechKnowledge are provided on an 'as is' basis. TechKnowledge makes no warranties, expressed or implied, 
            and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of 
            merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
          </p>

          <h2>4. Limitations</h2>
          <p>
            In no event shall TechKnowledge or its suppliers be liable for any damages (including, without limitation, damages for loss of 
            data or profit, or due to business interruption) arising out of the use or inability to use the materials on TechKnowledge.
          </p>

          <h2>5. Accuracy of Materials</h2>
          <p>
            The materials appearing on TechKnowledge could include technical, typographical, or photographic errors. TechKnowledge does not 
            warrant that any of the materials on the website are accurate, complete, or current.
          </p>

          <h2>6. Links</h2>
          <p>
            TechKnowledge has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. 
            The inclusion of any link does not imply endorsement by TechKnowledge of the site. Use of any such linked website is at the user's own risk.
          </p>

          <h2>7. Modifications</h2>
          <p>
            TechKnowledge may revise these terms of service for the website at any time without notice. By using this website, you are agreeing 
            to be bound by the then current version of these terms of service.
          </p>

          <h2>8. Governing Law</h2>
          <p>
            These terms and conditions are governed by and construed in accordance with the laws of [Your Jurisdiction], 
            and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
          </p>

          <p className="text-sm text-gray-600 dark:text-gray-400 pt-8">
            This is a placeholder terms of service. Please consult with legal counsel to create a terms of service that complies with 
            applicable laws and regulations in your jurisdiction.
          </p>
        </div>
      </div>
    </div>
  );
}
