export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  author: string;
  featured_image: string;
  featured_image_alt: string;
  publication_date: string;
  updated_date?: string;
  reading_time: number;
  status: 'draft' | 'published' | 'scheduled';
  seo_title: string;
  seo_description: string;
  canonical_url?: string;
  social_image?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon?: string;
}

export interface Advertisement {
  id: string;
  advertiser_name: string;
  title: string;
  ad_type?: 'image' | 'video' | 'custom_code' | 'sponsor_card' | 'adsense';
  image: string;
  image_alt: string;
  destination_url: string;
  video_url?: string;
  video_poster?: string;
  custom_html?: string;
  cta_text?: string;
  sponsor_headline?: string;
  sponsor_description?: string;
  adsense_client?: string;
  adsense_slot?: string;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
  placement: 'homepage_top' | 'homepage_middle' | 'homepage_bottom' | 'blog_page' | 'article_top' | 'article_middle' | 'article_bottom' | 'sidebar' | 'footer';
  start_date: string;
  end_date: string;
  status: 'draft' | 'scheduled' | 'active' | 'paused' | 'expired';
  priority: number;
  notes?: string;
  created_date: string;
  updated_date: string;
  width?: number;
  height?: number;
  max_width?: number;
  responsive?: boolean;
  alignment?: 'left' | 'center' | 'right';
  spacing?: number;
}

export interface SiteSettings {
  site_name: string;
  logo: string;
  site_description: string;
  about_information: string;
  contact_email: string;
  admin_email: string;
  contact_phone: string;
  address: string;
  social_links: {
    twitter: string;
    linkedin: string;
    github: string;
  };
  footer_information: string;
  default_seo_title: string;
  default_seo_description: string;
  default_canonical_url: string;
  advertising_custom_price: string;
  theme: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    muted_text: string;
    border: string;
    link: string;
    header: string;
    footer: string;
  };
}

export const CATEGORIES: Category[] = [
  {
    id: '1',
    name: 'Technology',
    slug: 'technology',
    description: 'Latest news and insights about technology',
  },
  {
    id: '2',
    name: 'AI',
    slug: 'ai',
    description: 'Artificial Intelligence and Machine Learning',
  },
  {
    id: '3',
    name: 'Internet',
    slug: 'internet',
    description: 'Internet protocols and technologies',
  },
  {
    id: '4',
    name: 'Mobile',
    slug: 'mobile',
    description: 'Mobile technology and devices',
  },
  {
    id: '5',
    name: 'Gaming',
    slug: 'gaming',
    description: 'Gaming technology and hardware',
  },
  {
    id: '6',
    name: 'Hardware',
    slug: 'hardware',
    description: 'Computer hardware and components',
  },
  {
    id: '7',
    name: 'Science',
    slug: 'science',
    description: 'Science and research',
  },
  {
    id: '8',
    name: 'Space',
    slug: 'space',
    description: 'Space exploration and astronomy',
  },
  {
    id: '9',
    name: 'Cybersecurity',
    slug: 'cybersecurity',
    description: 'Security and privacy',
  },
  {
    id: '10',
    name: 'Emerging Tech',
    slug: 'emerging-tech',
    description: 'Emerging technologies and innovations',
  },
];
