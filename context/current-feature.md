# Current Feature

Sanity Data Migration (feature #02)

## Status

In Progress

## Goals

Populate the cloud `production` dataset with the content that currently lives
hardcoded in `src/messages/en.json`, using the schemas created in feature #01.
Content layer only — UI components still read from JSON and are migrated to read
from Sanity in a later feature.

Migrate into these document types:

- `service` — 3 docs (video, social, smm)
- `pricingPackage` — 3 docs (Starter, Professional, Enterprise)
- `processStep` — 4 docs (Briefing, Production, Post-Production, Delivery)
- `siteSettings` — 1 singleton (hero*, manifesto*, portfolioStats[], footerTagline, contactEmail)
- `seo` — 1 singleton (defaultTitle, defaultDescription)

## Approach

- Reproducible seed script: `scripts/seed-sanity.ts`.
- Uses `@sanity/client` with `SANITY_API_WRITE_TOKEN` (write access).
- Idempotent: `createOrReplace` with deterministic `_id`s so re-runs don't
  duplicate (e.g. `service-video`, `pricingPackage-starter`, `siteSettings`,
  `seo`).
- Run via `npm run seed:sanity`.
- Source values mirror `src/messages/en.json` exactly (English content only —
  Sanity content is not translated).

## Notes

- Singletons use fixed `_id`s `siteSettings` and `seo` (matches the structure
  builder config from feature #01).
- `order` fields set sequentially so `| order(order asc)` in queries is stable.
- `slug` for services derived from the category key.
- Projects are NOT seeded here (real client work, added manually in Studio).

## History

<!-- Keep this updated. Earliest to latest -->

- Branch `feature/sanity-data-migration` created off `main`.
- Added `scripts/seed-sanity.ts` (idempotent `createOrReplace`, deterministic
  `_id`s) and `npm run seed:sanity` (tsx + `--env-file=.env.local`). Added `tsx`
  to devDependencies.
- `npm run build` passes; seed script typechecks clean.
- Ran seed: 12 documents created in cloud `production` (3 services, 3 pricing
  packages, 4 process steps, siteSettings + seo singletons). Verified via GROQ.
