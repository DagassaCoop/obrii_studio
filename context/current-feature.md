# Current Feature

Sanity Schemas (feature #01)

## Status

In Progress

## Goals

Establish the CMS foundation: create Sanity document schemas for content that
currently lives hardcoded in JSON translation files. Data layer only — UI
components are migrated in feature #02.

- New schemas: `service`, `pricingPackage`, `processStep`, `siteSettings`
  (singleton), `seo` (singleton).
- Register all schemas in `src/sanity/schemaTypes/index.ts`.
- Configure singleton pattern for `siteSettings` and `seo` via structure builder
  in `sanity.config.ts`.
- TypeScript interfaces for each schema in `src/lib/sanity/types.ts`.
- GROQ queries for each schema in `src/lib/sanity/queries.ts`
  (naming: `{entity}Query`, `{entity}By{Field}Query`).

## Notes

- Follow the existing `project.ts` pattern (`defineField` / `defineType`).
- Field shapes mirror current JSON in `src/messages/en.json` so feature #02 can
  populate Studio with matching values:
  - service: title, description, features[], icon, order, slug
  - pricingPackage: name, price, description, features[], popular, order
  - processStep: number, title, description, order
  - siteSettings: hero*, manifesto*, portfolioStats[{value,label}], clientLogos[],
    footerTagline, contactEmail
  - seo: defaultTitle, defaultDescription, ogImage, per-page overrides

## History

<!-- Keep this updated. Earliest to latest -->

- Branch `feature/sanity-schemas` created off `main`.
- Created schemas: `service`, `pricingPackage`, `processStep`, `siteSettings`,
  `seo` (following `project.ts` `defineField`/`defineType` pattern).
- Registered all schemas in `src/sanity/schemaTypes/index.ts`.
- Configured singleton pattern for `siteSettings` and `seo` in `sanity.config.ts`
  (custom structure list + filtered templates/actions).
- Added TypeScript interfaces in `src/lib/sanity/types.ts`.
- Added GROQ queries in `src/lib/sanity/queries.ts` (`servicesQuery`,
  `pricingPackagesQuery`, `processStepsQuery`, `siteSettingsQuery`, `seoQuery`).
- `npm run build` passes.
