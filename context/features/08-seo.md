# SEO

## Overview

Implement technical SEO fundamentals: sitemaps, robots, Open Graph, structured data, and i18n alternates for search engine visibility from day one.

## Requirements

- Create `src/app/sitemap.ts` — dynamic sitemap including all locales (EN/FR) and all project slugs from Sanity
- Create `src/app/robots.ts` — allow all crawlers, reference sitemap URL
- Add Open Graph and Twitter Card metadata per page (extend existing metadata in layout.tsx)
- Add dynamic OG image generation via `next/og` for project pages (title + thumbnail)
- Add JSON-LD structured data: `Organization` on landing page, `CreativeWork` or `VideoObject` on project pages
- Add `canonical` URLs per page
- Add `hreflang` alternates for EN/FR versions of each page
- Use SEO singleton from Sanity (feature #01) for default meta values

## Notes

- Next.js App Router has built-in support for `sitemap.ts`, `robots.ts`, and metadata API
- `next/og` uses Vercel Edge runtime for image generation — works on Vercel deployment
- JSON-LD can be injected via `<script type="application/ld+json">` in layout or page components
- Sitemap must query Sanity for all published project slugs
- hreflang alternates: each page declares both `/en/path` and `/fr/path` versions
