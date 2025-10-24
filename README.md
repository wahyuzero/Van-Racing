# Van Racing Exhaust Indonesia Website

Website resmi Van Racing Exhaust Indonesia - Spesialis knalpot custom dan racing motor berkualitas premium.

## 🚀 Fitur Utama

### Halaman Website
- **Home** - Landing page dengan hero section, featured products, testimonials
- **Produk** - Katalog produk dengan filter, sorting, dan detail produk
- **Tentang Kami** - Company profile, visi misi, timeline, team
- **Workshop** - Layanan workshop, custom order, proses kerja
- **Testimoni** - Review dan rating dari customer
- **FAQ** - Frequently Asked Questions dengan search dan kategori
- **Blog** - Artikel tips dan panduan seputar knalpot motor
- **Galeri** - Koleksi foto produk dan customer bikes
- **Kontak** - Form kontak, informasi workshop, dan media sosial

### Fitur Teknis
- ✅ **SEO Optimized** - Meta tags, Open Graph, Twitter Cards, Schema markup
- ✅ **Responsive Design** - Mobile-first approach dengan Tailwind CSS
- ✅ **Modern UI/UX** - Shadcn/ui components dengan animasi smooth
- ✅ **Performance** - Optimized images, lazy loading, code splitting
- ✅ **Accessibility** - WCAG compliant dengan proper ARIA labels
- ✅ **PWA Ready** - Web manifest dan service worker support
- ✅ **WhatsApp Integration** - Direct chat untuk konsultasi dan order

## 🛠️ Teknologi

### Frontend
- **React 19** - Modern JavaScript framework
- **Vite** - Fast build tool dan development server
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/ui** - High-quality React components
- **Lucide React** - Beautiful icon library
- **React Router** - Client-side routing
- **React Helmet Async** - SEO meta tags management

### Tools & Utilities
- **ESLint** - Code linting dan formatting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes
- **PNPM** - Fast package manager

## 📁 Struktur Project

```
Van Racing-exhaust-website/
├── public/                     # Static assets
│   ├── favicon.ico            # Website favicon
│   ├── robots.txt             # Search engine crawling rules
│   ├── sitemap.xml            # SEO sitemap
│   └── site.webmanifest       # PWA manifest
├── src/
│   ├── components/            # React components
│   │   ├── common/           # Shared components
│   │   │   ├── Header.jsx    # Navigation header
│   │   │   ├── Footer.jsx    # Website footer
│   │   │   └── SEO.jsx       # SEO meta tags component
│   │   ├── home/             # Home page components
│   │   │   ├── Hero.jsx      # Hero section
│   │   │   └── FeaturedProducts.jsx
│   │   ├── products/         # Product components
│   │   │   ├── ProductCard.jsx
│   │   │   └── ProductFilter.jsx
│   │   └── ui/               # Shadcn/ui components
│   ├── data/                 # Static data
│   │   ├── products.js       # Product catalog
│   │   ├── testimonials.js   # Customer testimonials
│   │   ├── faq.js           # FAQ data
│   │   ├── blog-posts.js    # Blog articles
│   │   └── gallery.js       # Gallery images
│   ├── pages/               # Page components
│   │   ├── Home.jsx         # Homepage
│   │   ├── Products.jsx     # Product catalog
│   │   ├── ProductDetail.jsx # Product detail
│   │   ├── About.jsx        # About us
│   │   ├── Workshop.jsx     # Workshop services
│   │   ├── Testimonials.jsx # Customer testimonials
│   │   ├── FAQ.jsx          # FAQ page
│   │   ├── Blog.jsx         # Blog listing
│   │   ├── Gallery.jsx      # Photo gallery
│   │   └── Contact.jsx      # Contact page
│   ├── styles/              # Custom styles
│   │   └── animations.css   # CSS animations
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utility libraries
│   ├── utils/               # Helper functions
│   ├── App.jsx              # Main app component
│   ├── main.jsx             # App entry point
│   └── index.css            # Global styles
├── package.json             # Dependencies dan scripts
├── tailwind.config.js       # Tailwind configuration
├── vite.config.js           # Vite configuration
└── README.md               # Project documentation
```

## 🚀 Development

### Prerequisites
- Node.js 18+ 
- PNPM (recommended) atau NPM

### Installation
```bash
# Clone repository
git clone https://github.com/Van Racing/website.git
cd Van Racing-exhaust-website

# Install dependencies
pnpm install

# Start development server
pnpm run dev
```

### Available Scripts
```bash
# Development server
pnpm run dev

# Build for production
pnpm run build

# Preview production build
pnpm run preview

# Lint code
pnpm run lint
```

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px
- **Large Desktop**: > 1280px

## 🎨 Design System

### Colors
- **Primary**: Red (#dc2626) - Brand color Van Racing
- **Secondary**: Gray (#6b7280) - Text dan UI elements
- **Success**: Green (#10b981) - Success states
- **Warning**: Yellow (#f59e0b) - Warning states
- **Error**: Red (#ef4444) - Error states

### Typography
- **Headings**: Inter font family, bold weights
- **Body**: Inter font family, regular weights
- **Code**: Mono font family

### Spacing
- Menggunakan Tailwind CSS spacing scale (4px base unit)
- Consistent padding dan margin across components

## 🔍 SEO Features

### Meta Tags
- Title tags yang descriptive dan keyword-rich
- Meta descriptions yang compelling
- Open Graph tags untuk social media sharing
- Twitter Card tags untuk Twitter sharing
- Canonical URLs untuk duplicate content prevention

### Structured Data
- Organization schema untuk company information
- LocalBusiness schema untuk workshop location
- Product schema untuk product pages
- Article schema untuk blog posts
- WebSite schema dengan search action

### Technical SEO
- XML Sitemap (`/sitemap.xml`)
- Robots.txt (`/robots.txt`)
- Proper heading hierarchy (H1-H6)
- Alt text untuk semua images
- Internal linking strategy
- Fast loading times
- Mobile-friendly design

## 📊 Performance

### Optimizations
- **Code Splitting** - Lazy loading untuk pages
- **Image Optimization** - WebP format dengan fallbacks
- **CSS Optimization** - Purged unused styles
- **JavaScript Optimization** - Minified dan compressed
- **Caching Strategy** - Browser caching headers
- **CDN Ready** - Static assets optimization

### Core Web Vitals
- **LCP** (Largest Contentful Paint) < 2.5s
- **FID** (First Input Delay) < 100ms  
- **CLS** (Cumulative Layout Shift) < 0.1

## 🔒 Security

### Best Practices
- Content Security Policy (CSP) headers
- XSS protection dengan React built-in sanitization
- HTTPS enforcement
- Secure cookie settings
- Input validation dan sanitization

## 🌐 Browser Support

- **Chrome** 90+
- **Firefox** 88+
- **Safari** 14+
- **Edge** 90+
- **Mobile browsers** dengan modern JavaScript support

## 📞 WhatsApp Integration

### Features
- Direct chat buttons di semua halaman
- Pre-filled messages untuk different actions:
  - Konsultasi gratis
  - Custom order
  - Reservasi workshop
  - Informasi produk
  - Customer service

### Implementation
```javascript
const message = 'Halo Van Racing, saya ingin konsultasi gratis';
const whatsappUrl = `https://wa.me/6281234567890?text=${encodeURIComponent(message)}`;
window.open(whatsappUrl, '_blank');
```

## 🚀 Deployment

### Build Process
```bash
# Production build
pnpm run build

# Files akan di-generate di folder 'dist/'
# Upload folder 'dist/' ke web server
```

### Environment Variables
```env
# Optional: Analytics tracking
VITE_GA_TRACKING_ID=your_google_analytics_id

# Optional: API endpoints
VITE_API_BASE_URL=https://api.Van Racingexhaust.com
```

## 📈 Analytics & Tracking

### Google Analytics 4
- Page views tracking
- Event tracking untuk:
  - WhatsApp clicks
  - Product views
  - Form submissions
  - Download actions

### Facebook Pixel
- Conversion tracking
- Retargeting audiences
- Custom events

## 🤝 Contributing

1. Fork repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

Copyright © 2024 Van Racing Exhaust Indonesia. All rights reserved.

## 📞 Support

- **Website**: https://Van Racingexhaust.com
- **Email**: info@Van Racingexhaust.com
- **WhatsApp**: +62 812-3456-7890
- **Instagram**: @Van Racingexhaust
- **Facebook**: Van Racing Exhaust Indonesia

---

**Dibuat dengan ❤️ oleh Tim Van Racing untuk komunitas bikers Indonesia**
