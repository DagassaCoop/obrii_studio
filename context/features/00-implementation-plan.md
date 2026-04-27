# Implementation Plan

## Why this order

The plan follows a backend-first, frontend-second, polish-last approach. No time pressure for launch — everything ships to production as one release.

## Feature sequence

### Foundation layer (01–04)

**01 Sanity Schemas → 02 Landing Migration → 03 Project Fields → 04 Sanity i18n**

Sanity is the data layer for the entire site. Schemas must exist before any component can consume CMS data. Landing migration proves the pipeline works. Project fields extend the existing schema for richer case studies. i18n comes last because it wraps all content schemas — applying it before schemas are stable means rework.

### Contact form (05–06)

**05 Backend → 06 Frontend**

The contact form is the site's core business function — it generates leads. Backend first because the frontend needs a real endpoint to submit to. Splitting into two features keeps PRs focused and testable independently.

### Visual identity (07)

**07 Brand Assets**

Logo, favicon, and OG image depend on assets from the user. Placed here because earlier features don't need them, and later features (SEO, error pages) benefit from having brand assets in place.

### Discoverability (08)

**08 SEO**

Sitemap, OG tags, structured data, hreflang. Depends on Sanity data (project slugs for sitemap) and brand assets (OG image fallback). Must be done before launch but after content infrastructure is solid.

### Error handling and code quality (09–10)

**09 Error Pages → 10 TypeScript Cleanup**

Error pages are user-facing — visitors shouldn't see raw Next.js errors. TypeScript cleanup follows because some type issues resolve naturally after Sanity migration removes `t.raw()` patterns and after route changes in error pages.

### Visual polish (11–12)

**11 Mobile Audit → 12 Project Page Redesign**

Mobile audit first because it catches layout bugs across all existing pages. Project page redesign builds on new fields from feature #03 and benefits from a codebase that's already mobile-tested.

### Compliance and observability (13–14)

**13 Legal → 14 Analytics + Sentry**

Legal pages are required before launch (GDPR, data collection via contact form). Analytics comes after because cookie consent requirements depend on which analytics tool is chosen — and if it's cookieless (Vercel Analytics, Plausible), legal setup is simpler.

### Infrastructure and final validation (15–16)

**15 Infrastructure → 16 Performance Audit**

CI, env config, preview mode, and documentation. This is housekeeping that makes the project maintainable post-launch. Performance audit is last because it validates everything — running Lighthouse on an incomplete site wastes effort.
