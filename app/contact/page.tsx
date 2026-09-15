import type { Metadata } from 'next';
import ContactFormClient from '@/components/ContactFormClient';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact TechKnowledge',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-900 dark:to-gray-800 py-12">
        <div className="container-custom">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Have a question or feedback? We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Form */}
      <div className="container-custom py-16">
        <div className="max-w-2xl mx-auto">
          <ContactFormClient />
        </div>
      </div>
    </div>
  );
}
