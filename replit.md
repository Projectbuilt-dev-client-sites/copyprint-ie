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
- **Font**: Montserrat
- **Style**: Clean, modern, professional

## Architecture
- `client/src/components/Header.tsx` - Sticky header with top bar, logo, navigation dropdown, mobile sheet menu
- `client/src/components/Footer.tsx` - Footer with contact info, service links, social links
- `client/src/pages/Home.tsx` - Homepage with 7 sections: hero, services grid, CTA, why choose us, testimonials, about, contact form
- `client/src/pages/ServicePage.tsx` - Dynamic service page template with pricing, upload, FAQ
- `client/src/lib/services.ts` - All 13 service data definitions (slug, pricing, FAQs, icons)

## Services (13 total)
Business Cards, Flyers & Leaflets, Stickers & Labels, Posters, PVC Banners, Business Stationery, Restaurant Printing, Roller Banners, Party Banners, Booklets, Student Services, Personal Printing, Laminating & Binding

## Routes
- `/` - Homepage
- `/services/:slug` - Individual service pages (13 services)

## API
- `POST /api/contact` - Contact form submission (in-memory storage)

## Key Features
- Sticky header with dropdown navigation
- Mobile responsive with sheet menu
- Scroll animations via Framer Motion
- Contact form with validation
- Stripe payment placeholder on service pages
- SEO meta tags
