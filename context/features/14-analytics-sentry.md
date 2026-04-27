# Analytics & Sentry

## Overview

Add analytics tracking and error monitoring to understand user behavior and catch runtime errors in production.

## Requirements

- Install and configure Vercel Analytics (or Plausible as alternative)
- Install and configure Vercel Speed Insights for web vitals monitoring
- Install and configure Sentry for error tracking
- Add event tracking for key user actions:
  - Contact form: submit, success, error
  - CTA button clicks (hero, pricing, personal CTA)
  - Portfolio filter interactions
  - Video player: play, pause, complete
- Configure Sentry to capture errors in VideoPlayer and contact form API route
- Add `SENTRY_DSN` and any analytics env vars to `.env.example`

## Notes

- Vercel Analytics and Speed Insights are zero-config on Vercel deployment — just install the packages
- Sentry has an official Next.js SDK (`@sentry/nextjs`) with automatic instrumentation
- Plausible is cookieless and GDPR-compliant out of the box — simpler than Google Analytics
- If using cookieless analytics, no cookie consent banner is needed (simplifies feature #13)
- Event tracking should be non-blocking — errors in analytics should never break the UI
