# Performance Audit

## Overview

Run Lighthouse and PageSpeed audits on key pages and optimize for Core Web Vitals. Ensure the site loads fast on mobile and desktop.

## Requirements

- Run Lighthouse audit on: landing page, portfolio page, project detail page, contact page
- Target: Performance >= 90, SEO >= 90 on mobile
- Verify `next/image` usage: correct `sizes` attribute, priority flag on LCP images (Hero, ProjectHero)
- Add lazy loading for Vimeo player (currently YouTube uses lite-youtube-embed which is already lazy)
- Optimize font loading: ensure `font-display: swap` or `optional` for all custom fonts
- Check bundle size: no unnecessary large dependencies
- Verify static generation where possible (landing page, portfolio listing)
- Add `prefers-reduced-motion` media query: disable hover-scale animations and auto-play video

## Notes

- Run audits on production build (`npm run build && npm run start`), not dev server
- Lighthouse scores on dev server are unreliable
- `next/image` with Sanity requires a configured image loader — check if already set up
- Font optimization is handled by `next/font/google` (already configured in layout.tsx)
- This should be the last feature before production deploy — it validates everything else
