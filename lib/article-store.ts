import { Article } from './types';

const STORAGE_KEY = 'techknowledge_articles';
const DEFAULT_ARTICLES: Article[] = [
  {
    id: '1',
    slug: 'how-does-5g-work',
    title: 'How Does 5G Work? A Complete Beginner\'s Guide',
    subtitle: 'Understanding fifth-generation wireless technology from the ground up',
    excerpt: 'Learn how 5G networks function, from spectrum bands and base stations to the technology that makes it all possible. A complete technical guide written for beginners.',
    content: '# How Does 5G Work?\n\n5G is the fifth generation of mobile network technology...',
    category: 'Mobile',
    tags: ['5G', 'wireless', 'networking', 'mobile-technology', 'telecommunications'],
    author: 'TechKnowledge Editorial',
    featured_image: '/images/5g-hero.jpg',
    featured_image_alt: '5G network infrastructure and connectivity visualization',
    publication_date: '2024-01-15',
    reading_time: 12,
    status: 'published',
    seo_title: 'How Does 5G Work? Complete Technical Guide for Beginners',
    seo_description: 'Comprehensive guide explaining 5G technology, spectrum bands, latency, MIMO, beamforming, and real-world applications.',
    canonical_url: 'https://techknowledge.com/article/how-does-5g-work',
  },
  {
    id: '2',
    slug: 'artificial-intelligence-explained',
    title: 'Artificial Intelligence Explained: A Beginner\'s Guide',
    subtitle: 'Understanding AI, machine learning, and neural networks',
    excerpt: 'Demystify artificial intelligence. Learn how AI works, the difference between AI and machine learning, and what neural networks actually do.',
    content: 'This is a placeholder for the AI article content. Full content coming soon.',
    category: 'AI',
    tags: ['artificial-intelligence', 'machine-learning', 'technology'],
    author: 'TechKnowledge Editorial',
    featured_image: '/images/ai-hero.jpg',
    featured_image_alt: 'Artificial intelligence and neural networks concept',
    publication_date: '2024-01-10',
    reading_time: 8,
    status: 'published',
    seo_title: 'Artificial Intelligence Explained: Beginner\'s Guide',
    seo_description: 'Learn how artificial intelligence works, the basics of machine learning, and why AI is transforming society.',
  },
  {
    id: '3',
    slug: 'gpu-rendering-gaming',
    title: 'How Do GPUs Render Video Games?',
    subtitle: 'The graphics pipeline that powers modern gaming',
    excerpt: 'Explore the journey of pixels from game code to your screen. Understand how GPUs transform game data into stunning visuals.',
    content: 'This is a placeholder for the GPU rendering article content. Full content coming soon.',
    category: 'Gaming',
    tags: ['GPU', 'graphics', 'gaming-technology', 'hardware'],
    author: 'TechKnowledge Editorial',
    featured_image: '/images/gpu-hero.jpg',
    featured_image_alt: 'GPU graphics rendering pipeline',
    publication_date: '2024-01-05',
    reading_time: 10,
    status: 'published',
    seo_title: 'How Do GPUs Render Video Games? Complete Explanation',
    seo_description: 'Understand the graphics pipeline, rendering techniques, and how GPUs create the visuals in modern video games.',
  },
];

export function readArticles(): Article[] {
  if (typeof window === 'undefined') {
    return DEFAULT_ARTICLES;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_ARTICLES));
      return DEFAULT_ARTICLES;
    }
    const parsed = JSON.parse(raw) as Article[];
    return Array.isArray(parsed) && parsed.length ? parsed : DEFAULT_ARTICLES;
  } catch {
    return DEFAULT_ARTICLES;
  }
}

export function writeArticles(articles: Article[]) {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(articles));
  }
}

export function createArticle(article: Article): Article {
  const current = readArticles();
  const next = [...current, article];
  writeArticles(next);
  return article;
}

export function updateArticle(article: Article): Article {
  const current = readArticles();
  const next = current.map((item) => item.id === article.id ? article : item);
  writeArticles(next);
  return article;
}

export function deleteArticle(id: string): void {
  const current = readArticles();
  writeArticles(current.filter((item) => item.id !== id));
}
