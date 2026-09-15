# TechKnowledge - Technology Blog Website

A modern, professional technology blog website built with Next.js, React, and Tailwind CSS.

## Features

- ✨ **Modern Design** - Clean, responsive, and accessible design
- 📱 **Mobile-First** - Optimized for all device sizes
- 🌙 **Dark Mode** - Built-in dark/light theme support
- 📝 **Article Management** - Easy-to-manage article system
- 🏷️ **Categories & Tags** - Organize content with categories and tags
- 🔍 **Search** - Full article search functionality
- 📢 **Custom Advertising** - First-party ad management system (no Google AdSense)
- 👨‍💼 **Admin Dashboard** - Secure admin interface for managing content
- 🔐 **Admin Authentication** - Protected admin routes with JWT authentication
- 📊 **SEO Optimized** - Built-in SEO features (meta tags, sitemap, robots.txt)
- ♿ **Accessible** - WCAG accessibility standards
- ⚡ **Fast** - Optimized for performance

## Tech Stack

- **Framework**: Next.js 14+
- **UI Library**: React
- **Styling**: Tailwind CSS
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcrypt
- **Content**: Static data (migrable to database)

## Project Structure

```
tech-knowledge/
├── app/                          # Next.js app directory
│   ├── page.tsx                 # Home page
│   ├── blog/                    # Blog listing page
│   ├── article/[slug]/          # Individual article pages
│   ├── categories/              # Categories listing
│   ├── category/[slug]/         # Category pages
│   ├── search/                  # Search results
│   ├── about/                   # About page
│   ├── contact/                 # Contact page
│   ├── privacy/                 # Privacy policy
│   ├── terms/                   # Terms of service
│   ├── disclaimer/              # Disclaimer
│   ├── advertise/               # Advertise with us
│   ├── admin/                   # Admin section
│   │   ├── page.tsx            # Admin login
│   │   └── dashboard/          # Admin dashboard
│   ├── api/                     # API routes
│   │   ├── contact/            # Contact form API
│   │   └── admin/              # Admin APIs
│   ├── layout.tsx               # Root layout
│   ├── globals.css              # Global styles
│   └── not-found.tsx            # 404 page
├── components/                  # React components
│   ├── Navigation.tsx           # Header navigation
│   ├── Footer.tsx              # Footer
│   ├── ArticleCard.tsx         # Article card component
│   ├── ArticleContentClient.tsx # Article content renderer
│   ├── BlogPageClient.tsx      # Blog page with filtering
│   ├── ContactFormClient.tsx   # Contact form
│   └── Providers.tsx           # App providers (theme, etc)
├── lib/                         # Utility functions
│   ├── articles.ts             # Article data and functions
│   ├── advertisements.ts       # Advertisement data and functions
│   ├── types.ts                # TypeScript types
│   └── auth.ts                 # Authentication utilities
├── public/                      # Static assets
│   ├── images/                 # Article images
│   ├── robots.txt              # SEO robots file
│   └── favicon.ico             # Site favicon
├── package.json                # Project dependencies
├── tailwind.config.js          # Tailwind configuration
├── postcss.config.js           # PostCSS configuration
├── next.config.js              # Next.js configuration
├── tsconfig.json               # TypeScript configuration
├── .env.example                # Environment variables template
├── .gitignore                  # Git ignore rules
└── README.md                   # This file
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository** (or navigate to the project directory)

```bash
cd "Tech Knowledge"
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

```bash
cp .env.example .env.local
```

Edit `.env.local` and set your values:
```
JWT_SECRET=your_very_secret_key_change_this
ADMIN_PASSWORD_HASH=your_bcrypt_hash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Running Locally

```bash
npm run dev
```

The site will be available at `http://localhost:3000`

### Admin Access

1. Go to `http://localhost:3000/admin`
2. Login with demo credentials:
   - Username: `admin`
   - Password: `admin123`

**⚠️ Important:** Change these credentials before deploying to production!

## Adding Articles

### Current Method (File-Based)

Edit `lib/articles.ts` to add new articles:

```typescript
{
  id: '4',
  slug: 'article-url-slug',
  title: 'Article Title',
  subtitle: 'Article subtitle',
  excerpt: 'Short description...',
  content: 'Full article content in markdown format...',
  category: 'Technology', // Must match a category name
  tags: ['tag1', 'tag2'],
  author: 'TechKnowledge Editorial',
  featured_image: '/images/article-image.jpg',
  featured_image_alt: 'Alt text for image',
  publication_date: '2024-01-20',
  reading_time: 8, // Estimated minutes
  status: 'published',
  seo_title: 'SEO title...',
  seo_description: 'SEO description...',
}
```

### Future: Database Integration

The system is designed to migrate to a database. To connect a database:

1. Install your database driver (e.g., `npm install prisma`)
2. Set up your database schema
3. Update functions in `lib/articles.ts` to fetch from database
4. Update functions in `lib/advertisements.ts` similarly

## Managing Advertisements

### Current Method (File-Based)

Edit `lib/advertisements.ts` to add advertisements:

```typescript
{
  id: '1',
  advertiser_name: 'Company Name',
  title: 'Ad Title',
  image: '/images/ad-banner.jpg',
  image_alt: 'Alt text',
  destination_url: 'https://example.com',
  placement: 'homepage_top', // See types for all placement options
  start_date: '2024-01-01',
  end_date: '2024-12-31',
  status: 'active', // draft, scheduled, active, paused, expired
  priority: 1, // Higher number = higher priority
}
```

### Future: Admin Dashboard Integration

The admin dashboard is prepared for full ad management. Once database is set up:

1. Implement ad creation/editing forms
2. Image upload handling
3. Date range selection
4. Status management

## Building for Production

### Build the Application

```bash
npm run build
```

### Start Production Server

```bash
npm run start
```

The application will be optimized for production.

## Deployment

### Option 1: Vercel (Recommended for Next.js)

1. Push your code to GitHub
2. Go to https://vercel.com
3. Import your repository
4. Set environment variables in Vercel dashboard
5. Deploy

```bash
# Or deploy directly from terminal
npm install -g vercel
vercel
```

### Option 2: Traditional Hosting (Node.js)

1. Build the project: `npm run build`
2. Upload `public` and `.next` directories to your server
3. Set environment variables on the server
4. Run: `npm run start`

### Option 3: Docker

Create a `Dockerfile`:

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

Deploy using Docker to your hosting provider.

## Security Checklist

- [ ] Change admin password (update `ADMIN_PASSWORD_HASH`)
- [ ] Change `JWT_SECRET` to a strong, unique value
- [ ] Set `NODE_ENV=production`
- [ ] Use HTTPS in production
- [ ] Keep `.env.local` and sensitive files out of version control
- [ ] Update dependencies regularly: `npm update`
- [ ] Enable security headers (implemented in Next.js)
- [ ] Validate all user inputs
- [ ] Review the privacy policy and terms with legal counsel

## SEO Configuration

The site includes:

- ✅ Meta tags on all pages
- ✅ Open Graph tags for social sharing
- ✅ Robots.txt for search engine crawling
- ✅ Sitemap generation (automatic with Next.js)
- ✅ Structured data support
- ✅ Semantic HTML
- ✅ Mobile optimization

To complete SEO setup:

1. Add your Google Analytics ID to `.env.local`
2. Submit sitemap to Google Search Console
3. Verify domain ownership
4. Monitor search performance

## Customization

### Changing Site Colors

Edit `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: '#0066cc',
      // Add more custom colors
    },
  },
},
```

### Adding New Pages

1. Create a new directory in `app/`
2. Add `page.tsx` file
3. Add to navigation in `components/Navigation.tsx`

### Customizing Design

- Edit `app/globals.css` for global styles
- Edit component files in `components/` for component styles
- All CSS uses Tailwind classes

## Performance Optimization

The site is optimized for performance:

- ✅ Next.js automatic code splitting
- ✅ Image optimization
- ✅ CSS minification
- ✅ Lazy loading
- ✅ Reduced motion support

## Accessibility

The site meets accessibility standards:

- ✅ Semantic HTML
- ✅ ARIA labels
- ✅ Keyboard navigation
- ✅ Sufficient color contrast
- ✅ Alt text for images
- ✅ Reduced motion support

## Troubleshooting

### Port Already in Use

```bash
# On Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# On macOS/Linux
lsof -i :3000
kill -9 <PID>
```

### Build Errors

```bash
# Clear build cache
rm -rf .next
npm run build
```

### Styling Issues

```bash
# Rebuild Tailwind
npm run build
```

## Environment Variables Reference

| Variable | Description | Required |
|----------|-------------|----------|
| `JWT_SECRET` | Secret key for JWT tokens | Yes |
| `ADMIN_PASSWORD_HASH` | Bcrypt hash of admin password | Yes |
| `NEXT_PUBLIC_SITE_URL` | Your site URL | Yes |
| `NEXT_PUBLIC_SITE_NAME` | Site name | No |
| `NODE_ENV` | Environment (development/production) | Yes |

## Future Enhancements

- [ ] Connect to database (PostgreSQL, MongoDB, etc.)
- [ ] Full admin dashboard (CRUD operations)
- [ ] Article scheduling
- [ ] Comment system
- [ ] Newsletter subscription
- [ ] Ad analytics (impressions, clicks)
- [ ] Advanced search filters
- [ ] Related articles AI suggestions
- [ ] Social media integration
- [ ] Email notifications

## License

This project is ready for commercial use. Ensure you have proper licensing for:
- Images used
- Third-party services
- Fonts and icons

## Support

For help:
1. Check this README
2. Review the code comments
3. Check Next.js documentation: https://nextjs.org/docs
4. Review Tailwind CSS documentation: https://tailwindcss.com/docs

## Version History

- **1.0.0** (Initial Release)
  - Basic site structure
  - Article system
  - Advertisement framework
  - Admin login page
  - SEO optimization
  - Responsive design
  - Dark mode

---

**Built with ❤️ for technology enthusiasts**
