# Mobile Audit

## Overview

Systematic review and fix of all pages on mobile viewports. Ensure every page works correctly on 360px, 390px, and 768px widths.

## Requirements

- Audit landing page sections on 360/390/768px:
  - Hero — text sizing, CTA button wrapping
  - FeaturedWorkRow — check `-ml-24` overlap behavior at md breakpoint transition
  - Pricing — negative margin on "Professional" card on narrow screens
  - Services, Process, Manifesto — general spacing and readability
- Audit portfolio page: grid layout, filter bar overflow, card sizing
- Audit project detail page: ProjectMedia 16:9 ratio, gallery grid, text sections
- Audit contact page: form layout, input sizing, submit button
- Audit Header: mobile Sheet menu, locale switcher tap zones (minimum 44x44px)
- Audit Footer: link spacing, logo size
- Document all issues found, then fix them
- Verify fixes across all three viewport widths

## Notes

- Use browser DevTools responsive mode for testing
- Pay special attention to breakpoint transitions (where layout shifts from mobile to desktop)
- FeaturedWorkRow overlap is a known concern — may need a different layout approach on mobile
- Run `npm run dev` and check in browser — screenshots of issues help track progress
