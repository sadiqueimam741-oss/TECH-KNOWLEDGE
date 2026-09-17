import { SiteSettings } from './types';

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  site_name: 'TechKnowledge',
  logo: '/logo.png',
  site_description: 'Clear, practical explanations of the technology shaping our world.',
  about_information: `Welcome to TechKnowledge — your go-to destination for clear, in-depth, and accessible explanations of modern technology.

Our Mission:
Our goal is to demystify complex engineering and computer science concepts—from 5G telecommunications and artificial intelligence to GPU rendering architectures and cloud computing. Whether you are a software developer, tech enthusiast, student, or curious professional, we provide structured, easy-to-understand guides designed to keep you informed.

Editorial Standards:
Every article published on TechKnowledge undergoes research and review for technical accuracy, clarity, and practical relevance. We prioritize original, high-value analysis and actionable insights over hype.

Get in Touch:
Have questions, editorial suggestions, or partnership inquiries? Reach out via our contact form or email us at support@techknowledge.com.`,
  contact_email: 'support@techknowledge.com',
  admin_email: 'admin@techknowledge.com',
  contact_phone: '',
  address: '',
  social_links: {
    twitter: 'https://twitter.com',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
  },
  footer_information: '© 2026 TechKnowledge. All rights reserved. Understand technology, simply.',
  default_seo_title: 'TechKnowledge | Understand Technology. Simply.',
  default_seo_description: 'Clear, practical explanations of the technology shaping our world.',
  default_canonical_url: 'https://techknowledge.com',
  advertising_custom_price: '$49/month',
  theme: {
    primary: '#2563eb',
    secondary: '#1d4ed8',
    accent: '#60a5fa',
    background: '#ffffff',
    surface: '#ffffff',
    text: '#111827',
    muted_text: '#4b5563',
    border: '#d1d5db',
    link: '#2563eb',
    header: '#ffffff',
    footer: '#111827',
  },
};
