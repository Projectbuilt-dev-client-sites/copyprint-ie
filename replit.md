# Copyprint.ie - Print Shop Website

## Overview
Multi-page print shop website for Copyprint.ie, a Dublin-based printing business established in 1982. Located at 29-30 Dame St, Dublin 2.

## Tech Stack
- **Frontend**: React + TypeScript + Vite + Tailwind CSS + shadcn/ui + Framer Motion
- **Backend**: Express.js
- **Routing**: Wouter (client-side)
- **Forms**: React Hook Form + Zod validation
- **Data Fetching**: TanStack React Query

## Design
- **Primary Color**: Orange (#f97316) via CSS variable `--primary`
- **Dark Sections**: Navy (#1a1a2e) via tailwind `navy` color
- **Header/Footer**: White background with gray borders
- **Location Hero**: bg-[#32373c] section, full-size hero image, frosted pane bg-black/40 backdrop-blur-md
- **Font**: Montserrat
- **Style**: Clean, modern, professional

## Architecture
- `client/src/components/Header.tsx` - Sticky white header with top bar, logo, navigation dropdown, mobile sheet menu, Blog link
- `client/src/components/Footer.tsx` - White footer with contact info, service links, blog link, location links
- `client/src/pages/Home.tsx` - Homepage with sections: hero, services grid, CTA, why choose us, testimonials, about, FAQ (12 Qs), SEO keywords, contact form
- `client/src/pages/ServicePage.tsx` - Dynamic service page with pricing, upload, FAQ (10 per service), keyword content, JSON-LD
- `client/src/pages/LocalServicePage.tsx` - Location pages with hero, features, FAQ (10 per page), nearby areas, keyword content
- `client/src/pages/BlogIndex.tsx` - Blog index with grid of 8 post cards
- `client/src/pages/BlogPost.tsx` - Individual blog post page with Article JSON-LD
- `client/src/lib/services.ts` - All 13 service data definitions (slug, pricing, 10 FAQs each, icons)
- `client/src/lib/dublin-areas.ts` - 119 Dublin areas with slugs, 6 local services
- `client/src/lib/dublin-locations.ts` - Area data with lat/lng, attractions
- `client/src/lib/service-heroes.ts` - Seeded RNG hero image selection (18 images, 3 per service)
- `client/src/lib/seo-keywords.ts` - SEO keywords for home, services, and location pages
- `client/src/lib/blog-posts.ts` - 8 full blog posts with content, meta, keywords
- `client/src/lib/spintax.ts` - Spintax content generation for location pages
- `script/build.ts` - SSG build script pre-rendering 730+ pages (services, 714 local, 9 blog)

## Services (13 total)
Business Cards, Flyers & Leaflets, Stickers & Labels, Posters, PVC Banners, Business Stationery, Restaurant Printing, Roller Banners, Party Banners, Booklets, Student Services, Personal Printing, Laminating & Binding

## Local Services (6, generating 714 location pages)
Business Cards, Flyers and Leaflets, Posters, Roller Banners, Business Stationery, Restaurant Printing

## Routes
- `/` - Homepage
- `/shop` - Shop page with Stripe checkout (3 products: Business Cards, Flyers & Leaflets, Posters)
- `/services/:slug` - Individual service pages (13 services)
- `/printing` - All Dublin areas index
- `/printing/:area/:service` - 714 local service pages (119 areas x 6 services)
- `/blog` - Blog index
- `/blog/:slug` - 8 individual blog posts

## Stripe Integration
- Stripe connected via Replit connector (sandbox mode for dev, auto-switches to live on deploy)
- Products/prices created via `script/seed-products.ts` and synced to PostgreSQL `stripe` schema by `stripe-replit-sync`
- Server files: `server/stripeClient.ts`, `server/webhookHandlers.ts`
- Webhook route registered BEFORE express.json() in `server/index.ts`
- API routes: GET `/api/shop/products`, POST `/api/shop/checkout`, GET `/api/stripe/publishable-key`
- Never insert directly into stripe schema tables — use Stripe API only

## SEO Features
- Meta keywords on all pages (home, service, location, blog)
- JSON-LD structured data: LocalBusiness (home), Service (service pages), FAQPage (all pages with FAQs), Article (blog posts), BreadcrumbList (all inner pages), WebSite+SearchAction (global)
- Canonical URLs on all SSR pages via `<link rel="canonical">`
- OpenGraph: og:title, og:description, og:type, og:url, og:site_name, og:locale (en_IE), og:image
- Keyword-rich content sections with internal links
- 10 FAQs per service page, 10 FAQs per location page, 12 FAQs on home page
- SSG pre-rendering for all 730+ pages
- robots.txt, llms.txt, sitemap.xml (dynamic server route + build-time)
- Proper heading hierarchy (h1 on every page)
- Descriptive image alt text

## API
- `POST /api/contact` - Contact form submission (in-memory storage)
- `POST /api/artwork-submit` - Artwork upload form (name, email, phone, fileName) saved to DB; email notification via SendGrid when SENDGRID_API_KEY is set (sends to copyprintdublin@gmail.com)

## Email Notifications
- SendGrid package installed (`@sendgrid/mail`)
- Email module: `server/email.ts`
- Currently logs to console (no SENDGRID_API_KEY configured yet)
- To enable: set SENDGRID_API_KEY secret and verify sender email in SendGrid dashboard

## Contact Details
- Phone: 01 677 4234
- WhatsApp: +353 870 687 728
- Email: info@copyprint.ie
- Address: 29-30 Dame St, Dublin 2

## Hero Images
- 18 AI-generated images in attached_assets/heroes/{service-slug}-{1|2|3}.png
- Imported via @assets alias
