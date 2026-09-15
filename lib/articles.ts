import fs from 'fs';
import path from 'path';
import { Article, CATEGORIES } from './types';

const fiveGArticle = `# How Does 5G Work? A Complete Beginner's Guide

5G is the fifth generation of mobile network technology, succeeding 4G LTE. It promises faster speeds, lower latency, and improved reliability. But how does it actually work? Let's break it down into digestible pieces.

## What is 5G?

5G is not just "faster 4G." It's a fundamentally different approach to wireless communication. It uses higher frequency bands and more efficient data transmission methods to achieve:

- **Faster speeds**: Up to 10 Gbps (gigabits per second) compared to 4G's 100 Mbps
- **Lower latency**: As low as 1 millisecond (compared to 4G's 50ms)
- **Greater capacity**: Supporting more devices simultaneously
- **Better energy efficiency**: For both devices and infrastructure

## How Does Your Phone Connect to 5G?

When you enable 5G on your phone, it searches for 5G signals in your area. Once found, your phone performs a handshake with the nearest 5G base station. This process involves:

1. **Scanning**: Your phone scans the airwaves for 5G signals
2. **Authentication**: Your phone identifies itself to the network using your SIM card
3. **Connection**: The base station assigns your phone a connection with available bandwidth
4. **Data transfer**: Your phone exchanges data over this connection

This entire process typically takes milliseconds.

## 5G Spectrum: The Frequencies

5G uses three main frequency bands, each with different characteristics:

### Low-Band 5G

- **Frequency**: 600 MHz to 1 GHz
- **Range**: Very good (similar to 4G LTE)
- **Speed**: Moderate improvements over 4G (200-300 Mbps)
- **Deployment**: Fastest to deploy
- **Coverage**: Excellent coverage areas

Low-band 5G is the most widely available 5G today. It trades speed for coverage and penetration through walls.

### Mid-Band 5G

- **Frequency**: 2.5-3.7 GHz
- **Range**: Moderate (a few miles from base station)
- **Speed**: Very fast (100-900 Mbps)
- **Deployment**: Currently expanding rapidly
- **Coverage**: Good coverage in urban and suburban areas

Mid-band is the "sweet spot" for 5G, balancing speed and coverage. This is where most 5G networks are focusing.

### High-Band 5G (mmWave)

- **Frequency**: 24-100 GHz (millimeter waves)
- **Range**: Very short (few hundred feet)
- **Speed**: Ultra-fast (1-3+ Gbps)
- **Deployment**: Limited to dense urban areas
- **Coverage**: Poor penetration through walls and obstacles

mmWave is used for specialized high-speed applications in dense areas. You must be relatively close to a base station for a connection.

## Advanced 5G Technologies

### Massive MIMO

**MIMO** stands for "Multiple Input, Multiple Output." Traditional base stations might have 4-12 antennas. **Massive MIMO** arrays have 64, 128, or even 256 antennas.

These antennas work together to:
- Direct signals specifically at devices (instead of broadcasting to everyone)
- Receive signals more clearly
- Increase network capacity
- Reduce interference

Think of it like a conductor directing musicians precisely rather than just playing loudly.

### Beamforming

Traditional antennas broadcast signals in all directions like light bulbs. Beamforming creates focused signal "beams" aimed directly at specific devices—like flashlights instead of light bulbs.

This improves signal quality and efficiency because:
- Less energy wasted on areas with no devices
- Stronger signal reaching the target device
- Better performance in crowded areas

### Carrier Aggregation

5G can combine multiple frequency bands simultaneously, like combining multiple traffic lanes into one super-highway. A device might use:
- One low-band channel for coverage
- Two mid-band channels for speed
- One mmWave channel for ultra-speed

All at the same time.

## 5G Network Deployment Models

### 5G NSA (Non-Standalone)

NSA still depends on 4G infrastructure for certain functions, particularly the core network. Current 5G deployments are mostly NSA.

**Advantages**:
- Faster deployment
- Uses existing infrastructure
- Lower initial cost

**Limitations**:
- Not true 5G latency in all scenarios
- Dependent on 4G availability

### 5G SA (Standalone)

SA is "true" 5G where the entire network, including the core, is 5G-native. This is the long-term goal.

**Advantages**:
- True low-latency performance
- More network slicing capabilities
- Better for IoT and enterprise

**Current status**:
- Limited deployment
- Requires complete infrastructure overhaul

## 5G Core Network

Unlike previous generations that just improved the "last mile" (device to base station), 5G replaces the entire core network infrastructure.

Key features:
- **Cloud-based**: Runs on standard computing hardware
- **Network Slicing**: Creates multiple virtual networks on one infrastructure
- **Edge Computing**: Processes data closer to devices, reducing latency
- **API-first design**: Better integration with applications

## Latency: Why It Matters

Latency is the delay between sending and receiving data.

- **4G LTE**: ~50-100ms
- **5G**: ~1-10ms (in ideal conditions)
- **Fiber**: ~1-5ms

Why this matters:
- **Gaming**: Lower latency = more responsive gameplay
- **Autonomous vehicles**: Latency could mean life or death
- **Virtual reality**: Latency causes motion sickness
- **Remote surgery**: Precision depends on low latency

## Why 5G Speeds Vary

You might see "5G" but get slower speeds than expected. Here's why:

1. **Congestion**: Many users on one base station share bandwidth
2. **Distance**: Farther from base station = weaker signal
3. **Obstacles**: Buildings, trees, rain degrade signal
4. **Band type**: Low-band 5G is inherently slower than mid or high-band
5. **Device limitations**: Your phone's modem might not support all bands
6. **Time of day**: Networks are slower during peak hours

## Why 5G Can Sometimes Be Slower Than Expected

This seems counterintuitive, but can happen because:

1. **Overhead**: 5G has more signaling overhead than 4G
2. **Fallback**: If 5G connection is poor, you fall back to 4G
3. **Device modem limits**: Your phone's modem might not handle data as fast as the network can deliver
4. **Carrier implementation**: Different carriers optimize differently
5. **Shared resources**: Network slicing means the network might prioritize other traffic

## Real-World Example: Loading a Website

Let's trace what happens when you load a website on 5G:

1. **Connection**: Phone connects to 5G base station (1-5ms)
2. **DNS lookup**: Browser looks up the IP address for the website (10-50ms)
3. **TCP connection**: Establishes connection to server (10-100ms, depending on server location)
4. **TLS handshake**: Establishes secure connection (10-100ms)
5. **HTTP request**: Sends page request (1-5ms)
6. **Server processing**: Server prepares response (10-500ms)
7. **Download**: Page content downloads (depends on file size)
8. **Rendering**: Browser renders the page (depends on complexity)

**Total time**: 100ms-3 seconds depending on all factors

## 4G vs 5G Comparison

| Feature | 4G LTE | 5G |
|---------|--------|-----|
| Peak Speed | 100 Mbps | 10 Gbps |
| Latency | 50-100ms | 1-10ms |
| Connection per area | 100s | 1000s |
| Frequencies | 600 MHz - 6 GHz | 600 MHz - 100 GHz |
| Architecture | RAN + Core | Cloud-based |
| Power efficiency | Good | Better |
| Use cases | Web, streaming, calls | Everything + AR/VR, autonomous vehicles |

## Common 5G Misconceptions

### "5G is a replacement for fiber"
False. 5G is wireless; it has different strengths and weaknesses than fiber. Both exist together.

### "5G is dangerous/causes cancer"
False. 5G uses non-ionizing radiation. Studies have found no credible link to health problems. The radio waves are lower energy than visible light.

### "5G works everywhere immediately"
False. 5G is still rolling out. Coverage varies by region and carrier. Many areas remain 4G-only.

### "All 5G phones are equally fast"
False. Different devices support different bands. A phone supporting all bands will be faster than one supporting only low-band.

### "5G uses less data"
False. Data usage depends on what you do, not the network. Faster speeds might *enable* more data usage (like streaming 4K video).

## Conclusion

5G is a dramatic improvement over 4G, but it's not "magic." It combines higher frequencies, smarter antennas, more infrastructure, and better network architecture to deliver faster, lower-latency connections.

Understanding these fundamentals helps you evaluate 5G coverage claims, choose devices wisely, and appreciate what's actually happening when your phone connects to the network.

The rollout will continue for years. Keep an eye on your region's 5G availability and 5G-capable phones as they become more mainstream.`;

export const ARTICLES: Article[] = [
  {
    id: '1',
    slug: 'how-does-5g-work',
    title: 'How Does 5G Work? A Complete Beginner\'s Guide',
    subtitle: 'Understanding fifth-generation wireless technology from the ground up',
    excerpt: 'Learn how 5G networks function, from spectrum bands and base stations to the technology that makes it all possible. A complete technical guide written for beginners.',
    content: fiveGArticle,
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

const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'articles.json');

function ensureDataFile() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(ARTICLES, null, 2), 'utf8');
  }
}

function readStoredArticles(): Article[] {
  ensureDataFile();

  try {
    const file = fs.readFileSync(DATA_FILE, 'utf8');
    const parsed = JSON.parse(file) as Article[];
    if (!Array.isArray(parsed)) {
      return ARTICLES;
    }
    return parsed;
  } catch {
    return ARTICLES;
  }
}

function writeStoredArticles(articles: Article[]) {
  ensureDataFile();
  fs.writeFileSync(DATA_FILE, JSON.stringify(articles, null, 2), 'utf8');
}

export function getArticleList(): Article[] {
  return [...readStoredArticles()].sort((a, b) => new Date(b.publication_date).getTime() - new Date(a.publication_date).getTime());
}

export function getArticles(): Article[] {
  return getArticleList().filter(article => article.status === 'published');
}

export function getArticleById(id: string): Article | undefined {
  return getArticleList().find(article => article.id === id);
}

export function getArticleBySlug(slug: string): Article | undefined {
  return getArticleList().find(article => article.slug === slug && article.status === 'published');
}

export function getArticlesByCategory(category: string): Article[] {
  return getArticleList().filter(article => article.category === category && article.status === 'published');
}

export function searchArticles(query: string): Article[] {
  const lowerQuery = query.toLowerCase();
  return getArticleList().filter(article => {
    if (article.status !== 'published') return false;
    return (
      article.title.toLowerCase().includes(lowerQuery) ||
      article.excerpt.toLowerCase().includes(lowerQuery) ||
      article.category.toLowerCase().includes(lowerQuery) ||
      article.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
  });
}

export function createArticleRecord(input: Partial<Article>): Article {
  const list = getArticleList();
  const newId = input.id || crypto.randomUUID();
  const article: Article = {
    id: newId,
    slug: input.slug || input.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `article-${Date.now()}`,
    title: input.title || 'Untitled Article',
    subtitle: input.subtitle || '',
    excerpt: input.excerpt || '',
    content: input.content || '',
    category: input.category || 'Technology',
    tags: Array.isArray(input.tags) ? input.tags : [],
    author: input.author || 'TechKnowledge Editorial',
    featured_image: input.featured_image || '/images/placeholder.svg',
    featured_image_alt: input.featured_image_alt || 'Article image',
    publication_date: input.publication_date || new Date().toISOString().slice(0, 10),
    reading_time: Number(input.reading_time || 5),
    status: input.status || 'draft',
    seo_title: input.seo_title || input.title || 'Untitled Article',
    seo_description: input.seo_description || input.excerpt || '',
    canonical_url: input.canonical_url,
    social_image: input.social_image,
    updated_date: new Date().toISOString(),
  };

  const next = [article, ...list];
  writeStoredArticles(next);
  return article;
}

export function updateArticleRecord(input: Partial<Article>): Article {
  const list = getArticleList();
  const idx = list.findIndex(article => article.id === input.id);

  if (idx === -1) {
    return createArticleRecord(input);
  }

  const updated: Article = {
    ...list[idx],
    ...input,
    slug: input.slug || list[idx].slug,
    title: input.title || list[idx].title,
    featured_image: input.featured_image || list[idx].featured_image,
    tags: Array.isArray(input.tags) ? input.tags : list[idx].tags,
    reading_time: Number(input.reading_time || list[idx].reading_time),
    updated_date: new Date().toISOString(),
  };

  const next = list.map(article => article.id === input.id ? updated : article);
  writeStoredArticles(next);
  return updated;
}

export function deleteArticleById(id: string): void {
  const next = getArticleList().filter(article => article.id !== id);
  writeStoredArticles(next);
}

export { CATEGORIES };
