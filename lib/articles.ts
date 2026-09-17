import fs from 'fs';
import path from 'path';
import { Article, CATEGORIES } from './types';
import { executeSql, isCloudDatabaseConfigured } from './db';

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
- **Coverage**: Excellent wide-area coverage

Low-band 5G is the foundation of national rollouts. It trades maximum throughput for penetration through buildings and walls.

### Mid-Band 5G
- **Frequency**: 2.5-3.7 GHz (C-Band)
- **Range**: Moderate (several miles from base station)
- **Speed**: Very fast (300-900 Mbps)
- **Coverage**: Ideal for suburban and metropolitan regions

Mid-band is considered the "sweet spot" of 5G, providing the perfect balance between high-bandwidth throughput and geographic reach.

### High-Band 5G (mmWave)
- **Frequency**: 24-100 GHz (millimeter waves)
- **Range**: Very short (a few hundred feet)
- **Speed**: Ultra-fast (1-3+ Gbps)
- **Coverage**: Dense urban hotspots, stadiums, and transit hubs

mmWave achieves blistering speeds but struggles to penetrate solid objects like concrete walls or dense foliage.

## Advanced 5G Technologies

### Massive MIMO
**MIMO** stands for "Multiple Input, Multiple Output." Traditional 4G antennas typically utilize 4 to 8 antenna elements. Massive MIMO arrays deploy 64 or 128 elements simultaneously to transmit independent data streams to multiple users at once.

### Beamforming
Rather than broadcasting electromagnetic energy in all directions like a traditional lightbulb, beamforming acts like a focused laser pointer, dynamically steering RF energy toward active user devices.

### Network Slicing
Network slicing allows telecom providers to partition a single physical 5G network into multiple isolated virtual networks customized for specific latency and bandwidth requirements (e.g., autonomous vehicles vs. video streaming).

## Conclusion
5G represents an infrastructure shift that powers connected IoT ecosystems, telemedicine, and next-generation mobile experiences. As coverage expands globally, understanding how these underlying radio frequencies and antenna architectures operate helps users make informed device and connectivity decisions.`;

const aiArticle = `# Artificial Intelligence Explained: A Complete Beginner's Guide

Artificial Intelligence (AI) has transformed from science fiction into an indispensable technology powering modern software, search engines, creative tools, and autonomous robotics. But what actually happens behind the scenes?

## The Core Concept of AI

At its simplest level, Artificial Intelligence refers to computational systems engineered to perform tasks that historically required human cognitive ability. These tasks include pattern recognition, natural language comprehension, logical decision-making, and visual interpretation.

AI is best understood as a hierarchy of concepts:

1. **Artificial Intelligence (Broadest)**: Any machine technique that mimics human problem-solving.
2. **Machine Learning (Subset of AI)**: Algorithms that learn predictive patterns directly from historical data rather than following static, hardcoded rules.
3. **Deep Learning (Subset of ML)**: Neural networks structured with dozens or hundreds of computational layers modeled loosely after biological brains.
4. **Generative AI & LLMs (Modern Frontier)**: Neural models trained on massive text, code, or visual corpora to generate new, original content.

## How Do Neural Networks Learn?

Modern AI relies on artificial neural networks composed of interconnected nodes (neurons) organized in layers:

- **Input Layer**: Receives raw numerical representations (pixels, audio frequencies, tokenized text).
- **Hidden Layers**: Perform mathematical transformations (matrix multiplications, activations) to extract increasingly abstract features.
- **Output Layer**: Produces probabilities or target classifications (e.g., "Is this an image of a cat?").

### The Training Loop: Forward Pass & Backpropagation
1. **Weights & Biases**: Each connection in a neural network has an assigned numerical weight.
2. **Loss Function**: When the model makes a prediction, the loss function measures the numerical discrepancy between the prediction and the ground truth.
3. **Backpropagation & Gradient Descent**: The network calculates mathematical gradients and nudges every weight slightly to minimize prediction error across billions of parameters.

## Transformers: The Engine Behind Modern Large Language Models (LLMs)

Introduced by Google researchers in 2017, the **Transformer architecture** revolutionized natural language processing through the **Self-Attention mechanism**.

Unlike older sequential recurrent architectures (RNNs), Transformers:
- Process entire paragraphs or sentences simultaneously in parallel.
- Calculate dynamic mathematical attention weights between every word in a sentence, capturing nuanced grammatical relationships and context.

## Practical Everyday Applications

- **Healthcare**: Analyzing radiological MRI scans to detect early-stage anomalies with superhuman precision.
- **Software Engineering**: Assisting developers with automated code completion, refactoring, and bug discovery.
- **Autonomous Systems**: Real-time sensor fusion combining LiDAR, radar, and camera feeds for self-driving vehicles.
- **Personalized Recommendations**: Dynamic content ranking algorithms powering modern streaming and discovery platforms.

## Summary
AI is not conscious or magical—it is sophisticated statistical modeling and linear algebra accelerated by high-performance GPUs. As foundation models become faster and more energy-efficient, AI will continue to augment human capability across every discipline.`;

const gpuArticle = `# How Do GPUs Render Video Games? The Graphics Pipeline

When you play a modern video game at 60 or 120 frames per second, your computer's Graphics Processing Unit (GPU) performs trillions of mathematical calculations every second to construct each frame. Let's trace how game code transforms into realistic 3D imagery.

## CPU vs. GPU: Architectural Differences

To understand graphics rendering, we must understand why GPUs are uniquely suited for rendering:

- **CPU (Central Processing Unit)**: Optimized for sequential execution with 8 to 24 high-clock-speed cores designed for complex logic and branching decisions.
- **GPU (Graphics Processing Unit)**: Massive parallel computing architecture containing thousands of smaller arithmetic logic units (ALUs) engineered to perform identical mathematical operations on millions of pixels simultaneously.

## The 3D Graphics Rendering Pipeline

Rendering a 3D scene onto a flat 2D monitor involves a series of sequential stages called the **Graphics Pipeline**:

\`\`\`
3D Scene Data ➔ Vertex Processing ➔ Primitive Assembly & Clipping ➔ Rasterization ➔ Fragment / Pixel Shading ➔ Frame Buffer Display
\`\`\`

### 1. Vertex Processing & 3D Geometry
Every 3D object in a game (characters, terrain, vehicles) is composed of a polygon mesh made of triangles. Each triangle corner is a **vertex** with $(X, Y, Z)$ coordinates, texture coordinates $(U, V)$, and lighting normals.
- The **Vertex Shader** applies mathematical matrix transforms to convert 3D world coordinates into camera-space perspective coordinates.

### 2. Primitive Assembly, Culling & Clipping
The GPU groups vertices into triangular faces. It automatically discards triangles that are:
- Located outside the camera's field of view (**Clipping**).
- Facing away from the camera lens (**Back-Face Culling**).

### 3. Rasterization: Geometry to Pixels
Triangles are mathematical vectors, but screens display discreet pixel grids. During **rasterization**, the hardware interpolates triangle boundaries to determine which exact monitor pixels fall inside each polygon.

### 4. Fragment (Pixel) Shading & Lighting
The **Pixel Shader** calculates the final color, specular reflection, roughness, and shadow values for every rasterized pixel. It samples high-resolution texture maps and calculates dynamic light equations (such as PBR - Physically Based Rendering).

### 5. Depth Testing & Alpha Blending
Using the **Z-Buffer** (depth buffer), the GPU ensures foreground objects properly occlude background geometry without graphical clipping artifacts.

## Modern Graphics Innovations

### Real-Time Ray Tracing (DXR / Vulkan RT)
Traditional rasterization approximates lighting using tricks. **Ray Tracing** simulates physical photons by shooting millions of simulated light rays from the camera into the scene, calculating realistic reflections, ambient occlusion, and global illumination.

### AI Upscaling (DLSS / FSR / XeSS)
Modern GPUs render games at lower internal resolutions (e.g. 1080p) and employ deep learning convolutional autoencoders or temporal algorithms to reconstruct a razor-sharp 4K image with minimal performance loss.

## Conclusion
Modern GPU graphics rendering is one of computer engineering's greatest achievements—combining parallel silicon hardware, real-time shaders, and machine-learning upscalers to deliver lifelike visual worlds in milliseconds.`;

const cloudArticle = `# Cloud Computing Fundamentals: IaaS, PaaS, and Serverless

Modern digital infrastructure runs on the Cloud. From streaming services to global banking networks, businesses have transitioned from physical on-premise server rooms to distributed cloud computing platforms.

## What is Cloud Computing?

Cloud computing is the on-demand delivery of compute power, database storage, applications, and IT resources over the internet with pay-as-you-go pricing. Rather than purchasing and maintaining physical servers, organizations lease virtualized computing capacity from providers like Google Cloud (GCP), Amazon Web Services (AWS), and Microsoft Azure.

## The Three Primary Cloud Service Models

### 1. Infrastructure as a Service (IaaS)
- **What it is**: Provides fundamental compute blocks including virtual machines, block storage, and virtual private cloud (VPC) networking.
- **User Responsibility**: Operating system configuration, security patching, application runtime, and middleware.
- **Examples**: Amazon EC2, Google Compute Engine, Azure VMs.

### 2. Platform as a Service (PaaS)
- **What it is**: Provides a pre-configured execution environment where developers simply deploy application source code without managing underlying operating systems or virtual server instances.
- **User Responsibility**: Application business logic and database schema design.
- **Examples**: Google App Engine, Vercel, Heroku, AWS Elastic Beanstalk.

### 3. Software as a Service (SaaS)
- **What it is**: Complete, centrally hosted application software accessible directly through web browsers or APIs.
- **Examples**: Google Workspace, Microsoft 365, Slack, Salesforce.

## The Rise of Serverless & Edge Computing

In traditional setups, developers must provision server capacity in advance. In a **Serverless architecture** (such as AWS Lambda or Google Cloud Functions):
- Code executes only when triggered by an HTTP event or queue message.
- Providers scale compute from zero to thousands of concurrent executions instantaneously.
- You pay strictly for CPU execution milliseconds consumed.

**Edge Computing** pushes this concept even further by distributing serverless execution across hundreds of global points of presence (PoPs) located close to end-users, cutting latency down to sub-10ms.

## Key Benefits of Cloud Adoption

- **Elastic Scalability**: Instantly scale up during traffic spikes and scale down during quiet hours.
- **High Availability & Disaster Recovery**: Geographic multi-region redundancy protects against hardware faults.
- **Cost Optimization**: Eliminates massive upfront capital expenditures (CapEx) in favor of predictable operational expenses (OpEx).

## Conclusion
Whether you are building a simple portfolio, an e-commerce platform, or an enterprise SaaS application, leveraging cloud infrastructure allows development teams to focus on delivering product value rather than managing physical hardware.`;

export const ARTICLES: Article[] = [
  {
    id: '1',
    slug: 'how-does-5g-work',
    title: 'How Does 5G Work? A Complete Beginner\'s Guide',
    subtitle: 'Understanding fifth-generation wireless technology from the ground up',
    excerpt: 'Learn how 5G networks function, from spectrum bands and base stations to Massive MIMO and Beamforming. A comprehensive technical guide.',
    content: fiveGArticle,
    category: 'Mobile',
    tags: ['5G', 'wireless', 'networking', 'mobile-technology', 'telecommunications'],
    author: 'TechKnowledge Editorial',
    featured_image: '/images/5g-hero.jpg',
    featured_image_alt: '5G network infrastructure and connectivity visualization',
    publication_date: '2024-01-15',
    reading_time: 8,
    status: 'published',
    seo_title: 'How Does 5G Work? Complete Technical Guide for Beginners',
    seo_description: 'Comprehensive guide explaining 5G technology, spectrum bands, latency, MIMO, beamforming, and real-world applications.',
    canonical_url: 'https://techknowledge.com/article/how-does-5g-work',
  },
  {
    id: '2',
    slug: 'artificial-intelligence-explained',
    title: 'Artificial Intelligence Explained: A Complete Beginner\'s Guide',
    subtitle: 'Understanding AI, machine learning, neural networks, and transformer models',
    excerpt: 'Demystify artificial intelligence. Learn how neural networks learn, what transformer architectures do, and how modern AI transforms our world.',
    content: aiArticle,
    category: 'AI',
    tags: ['artificial-intelligence', 'machine-learning', 'neural-networks', 'deep-learning', 'transformers'],
    author: 'TechKnowledge Editorial',
    featured_image: '/images/ai-hero.jpg',
    featured_image_alt: 'Artificial intelligence and neural networks concept visualization',
    publication_date: '2024-01-18',
    reading_time: 9,
    status: 'published',
    seo_title: 'Artificial Intelligence Explained: Complete Beginner\'s Guide',
    seo_description: 'Learn how artificial intelligence works, the basics of neural networks, machine learning, and transformer models.',
    canonical_url: 'https://techknowledge.com/article/artificial-intelligence-explained',
  },
  {
    id: '3',
    slug: 'gpu-rendering-gaming',
    title: 'How Do GPUs Render Video Games? The Graphics Pipeline',
    subtitle: 'The hardware architecture and graphics pipeline powering modern gaming visuals',
    excerpt: 'Explore the journey of 3D geometry to screen pixels. Understand vertex shaders, rasterization, ray tracing, and AI upscalers.',
    content: gpuArticle,
    category: 'Gaming',
    tags: ['GPU', 'graphics', 'gaming-technology', 'hardware', 'ray-tracing'],
    author: 'TechKnowledge Editorial',
    featured_image: '/images/gpu-hero.jpg',
    featured_image_alt: 'GPU graphics rendering pipeline and 3D visual processing',
    publication_date: '2024-01-20',
    reading_time: 10,
    status: 'published',
    seo_title: 'How Do GPUs Render Video Games? Graphics Pipeline Explained',
    seo_description: 'Understand the GPU graphics pipeline, vertex shading, rasterization, ray tracing, and modern DLSS rendering techniques.',
    canonical_url: 'https://techknowledge.com/article/gpu-rendering-gaming',
  },
  {
    id: '4',
    slug: 'cloud-computing-fundamentals',
    title: 'Cloud Computing Fundamentals: IaaS, PaaS, and Serverless',
    subtitle: 'A clear guide to cloud architecture, distributed systems, and edge computing',
    excerpt: 'Understand cloud computing infrastructure, the difference between IaaS, PaaS, and Serverless, and why modern web apps rely on the cloud.',
    content: cloudArticle,
    category: 'Cloud',
    tags: ['cloud-computing', 'serverless', 'devops', 'aws', 'gcp', 'infrastructure'],
    author: 'TechKnowledge Editorial',
    featured_image: '/images/cloud-hero.jpg',
    featured_image_alt: 'Cloud computing server networks and global infrastructure',
    publication_date: '2024-01-22',
    reading_time: 7,
    status: 'published',
    seo_title: 'Cloud Computing Fundamentals: IaaS, PaaS, & Serverless Explained',
    seo_description: 'Learn the core models of cloud computing, serverless architectures, and how modern distributed applications run.',
    canonical_url: 'https://techknowledge.com/article/cloud-computing-fundamentals',
  },
];

const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'articles.json');

// In-memory cache to ensure serverless platforms (Vercel / Cloudflare) run safely without filesystem errors
let memoryArticles: Article[] | null = null;

function ensureDataFile() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, JSON.stringify(ARTICLES, null, 2), 'utf8');
      memoryArticles = [...ARTICLES];
    }
  } catch {
    // Read-only filesystem on serverless; fallback to memoryArticles
    if (!memoryArticles) {
      memoryArticles = [...ARTICLES];
    }
  }
}

function readStoredArticles(): Article[] {
  ensureDataFile();
  try {
    if (fs.existsSync(DATA_FILE)) {
      const file = fs.readFileSync(DATA_FILE, 'utf8');
      const parsed = JSON.parse(file) as Article[];
      if (Array.isArray(parsed)) {
        memoryArticles = parsed;
        return parsed;
      }
    }
  } catch {
    // Ignore filesystem read failure, use memoryArticles
  }
  return memoryArticles || [];
}

function writeStoredArticles(articles: Article[]) {
  memoryArticles = articles;
  try {
    ensureDataFile();
    fs.writeFileSync(DATA_FILE, JSON.stringify(articles, null, 2), 'utf8');
  } catch {
    // Graceful fallback for read-only serverless lambdas
  }
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
  return getArticleList().filter(article => article.category.toLowerCase() === category.toLowerCase() && article.status === 'published');
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

  // Cloud Database Sync
  if (isCloudDatabaseConfigured()) {
    executeSql(`
      INSERT INTO articles (id, slug, title, subtitle, excerpt, content, category, tags, author, featured_image, featured_image_alt, publication_date, updated_date, reading_time, status, seo_title, seo_description, canonical_url, social_image)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(id) DO UPDATE SET
        slug = excluded.slug,
        title = excluded.title,
        subtitle = excluded.subtitle,
        excerpt = excluded.excerpt,
        content = excluded.content,
        category = excluded.category,
        tags = excluded.tags,
        author = excluded.author,
        featured_image = excluded.featured_image,
        featured_image_alt = excluded.featured_image_alt,
        publication_date = excluded.publication_date,
        updated_date = excluded.updated_date,
        reading_time = excluded.reading_time,
        status = excluded.status,
        seo_title = excluded.seo_title,
        seo_description = excluded.seo_description,
        canonical_url = excluded.canonical_url,
        social_image = excluded.social_image;
    `, [
      article.id, article.slug, article.title, article.subtitle || '', article.excerpt || '',
      article.content, article.category, JSON.stringify(article.tags || []), article.author,
      article.featured_image, article.featured_image_alt, article.publication_date, article.updated_date || '',
      article.reading_time, article.status, article.seo_title, article.seo_description,
      article.canonical_url || '', article.social_image || ''
    ]).catch(err => console.error('Cloud DB sync error:', err));
  }

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

  // Cloud Database Sync
  if (isCloudDatabaseConfigured()) {
    executeSql(`
      INSERT INTO articles (id, slug, title, subtitle, excerpt, content, category, tags, author, featured_image, featured_image_alt, publication_date, updated_date, reading_time, status, seo_title, seo_description, canonical_url, social_image)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(id) DO UPDATE SET
        slug = excluded.slug,
        title = excluded.title,
        subtitle = excluded.subtitle,
        excerpt = excluded.excerpt,
        content = excluded.content,
        category = excluded.category,
        tags = excluded.tags,
        author = excluded.author,
        featured_image = excluded.featured_image,
        featured_image_alt = excluded.featured_image_alt,
        publication_date = excluded.publication_date,
        updated_date = excluded.updated_date,
        reading_time = excluded.reading_time,
        status = excluded.status,
        seo_title = excluded.seo_title,
        seo_description = excluded.seo_description,
        canonical_url = excluded.canonical_url,
        social_image = excluded.social_image;
    `, [
      updated.id, updated.slug, updated.title, updated.subtitle || '', updated.excerpt || '',
      updated.content, updated.category, JSON.stringify(updated.tags || []), updated.author,
      updated.featured_image, updated.featured_image_alt, updated.publication_date, updated.updated_date || '',
      updated.reading_time, updated.status, updated.seo_title, updated.seo_description,
      updated.canonical_url || '', updated.social_image || ''
    ]).catch(err => console.error('Cloud DB sync error:', err));
  }

  return updated;
}

export function deleteArticleById(id: string): void {
  const next = getArticleList().filter(article => article.id !== id);
  writeStoredArticles(next);

  if (isCloudDatabaseConfigured()) {
    executeSql('DELETE FROM articles WHERE id = ?;', [id]).catch(err =>
      console.error('Cloud DB delete error:', err)
    );
  }
}

export { CATEGORIES };

