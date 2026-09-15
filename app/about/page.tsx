import type { Metadata } from 'next';
import AboutPageClient from '@/components/AboutPageClient';

export const metadata: Metadata = {
  title: 'About',
  description: 'About TechKnowledge',
};

export default function AboutPage() {
  return <AboutPageClient />;
}
