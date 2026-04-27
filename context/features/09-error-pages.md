# Error Pages

## Overview

Create custom 404 and 500 error pages styled in the studio's brand. Users hitting broken links or server errors should see a polished page, not a default Next.js error screen.

## Requirements

- Create `src/app/[locale]/not-found.tsx` — custom 404 page
- Create `src/app/[locale]/error.tsx` — custom 500/runtime error page (must be `'use client'`)
- Both pages must use studio design language (parchment background, Josefin Slab heading, terracotta CTA)
- Include navigation back to home and portfolio
- Add i18n strings for error pages in `en.json` and `fr.json`
- Error page should include a "Try Again" button (for error.tsx) and "Go Home" link

## Notes

- `not-found.tsx` is a server component, `error.tsx` must be a client component (Next.js requirement)
- `error.tsx` receives `error` and `reset` props from Next.js
- Keep the design minimal — a heading, short message, and one or two action links
- Remove `/instagram` page (placeholder) and its route from `src/i18n/routing.ts` pathnames
- Remove `blog` and `instagram` entries from navigation in Header if still present
