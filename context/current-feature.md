# Current Feature

Landing Sections — Sanity Migration

See full spec: `context/features/02-landing-sanity-migration.md`

## Status

In Progress

## Goals

Migrate landing page sections from hardcoded JSON translations to Sanity CMS
data, so content managers can edit landing content without code deploys. Schemas
(feature #01) and cloud content (data migration) are already in place.

Sections in scope (extended beyond the original spec to include Hero/Manifesto,
since their data was already seeded into `siteSettings`):

- `Services.tsx` ← `servicesQuery`
- `Pricing.tsx` ← `pricingPackagesQuery`
- `ProcessTimeline.tsx` ← `processStepsQuery`
- `PortfolioStats.tsx` ← `siteSettings.portfolioStats`
- `Hero.tsx` ← `siteSettings.hero*`
- `Manifesto.tsx` ← `siteSettings.manifesto*`

SEO singleton migration is deferred to a later feature.

## Notes

- Convert affected components to async server components: `await getTranslations`
  + `serverClient.fetch` (same pattern as `FeaturedWork.tsx`).
- UI chrome strings (overlines, button labels, currency, CTA text) stay in i18n
  JSON; domain content (descriptions, features, steps, stats, hero/manifesto
  copy) comes from Sanity.
- Remove migrated content keys from `en.json` / `fr.json`, keep UI strings only.
- Services icon is stored as a Lucide name string in Sanity → resolve via a
  local icon map (fallback for unknown names).
- Sanity content is English-only (not translated) — FR locale shows the same
  Sanity copy for these sections, consistent with existing project behaviour.
- Handle empty/missing Sanity data gracefully (guards + fallbacks).

## History

<!-- Keep this updated. Earliest to latest. Format: date / feature — short description -->

- 2026-06-19 / Sanity Schemas — created `service`, `pricingPackage`,
  `processStep`, `siteSettings`, `seo` schemas; registered them, configured the
  singleton structure in `sanity.config.ts`, added TS types and GROQ queries;
  deployed schema manifest and hosted Studio (https://obrii.sanity.studio/);
  merged to `main`.
- 2026-06-19 / Sanity Data Migration — added idempotent `scripts/seed-sanity.ts`
  + `npm run seed:sanity` (tsx) to populate the cloud `production` dataset;
  seeded 12 documents (3 services, 3 pricing packages, 4 process steps,
  siteSettings + seo singletons) mirrored from `en.json`; verified via GROQ;
  merged to `main`.
- 2026-06-19 / Landing Sanity Migration — converted Hero, Manifesto, Services,
  Pricing, ProcessTimeline, PortfolioStats to async server components fetching
  from Sanity (`serverClient.fetch`); added Lucide icon resolver for services;
  removed migrated content keys from `en.json` / `fr.json` (kept UI strings, EN
  parity); fixed Hero CTAs to use typed `Link` (hash href); added `dist/**` and
  `.claude/**` to ESLint ignores (Sanity build output was OOM-ing lint).
  `npm run build` + `npm run lint` (0 errors) pass; verified rendered HTML on
  `/en`, `/en/portfolio`, `/fr`.
