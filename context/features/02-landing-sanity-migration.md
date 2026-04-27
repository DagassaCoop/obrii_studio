# Landing Sections — Sanity Migration

## Overview

Migrate landing page sections (Services, Pricing, ProcessTimeline, PortfolioStats) from hardcoded JSON translations to Sanity CMS data. After this, content managers can edit landing content without code deploys.

## Requirements

- Refactor `Services.tsx` to fetch service data from Sanity instead of `t.raw("video.features")`
- Refactor `Pricing.tsx` to fetch pricing packages from Sanity instead of `t.raw("packages")`
- Refactor `ProcessTimeline.tsx` to fetch process steps from Sanity instead of `t.raw("steps")`
- Refactor `PortfolioStats.tsx` to fetch stats from Sanity siteSettings instead of hardcoded values (50+, 12, 98%, 4M+)
- Remove migrated content keys from `en.json` and `fr.json` — keep only UI strings (button labels, aria text, placeholders)
- Ensure components handle empty/loading states gracefully (Sanity data not yet populated)
- Populate Sanity Studio with initial content matching current JSON values

## Notes

- Server components can fetch Sanity data directly — no need for client-side fetching
- UI strings (overlines like "Services", "Process", button text like "Get Started") stay in i18n JSON files
- Domain content (service descriptions, pricing features, step descriptions) moves to Sanity
- This depends on feature #01 (schemas must exist first)
