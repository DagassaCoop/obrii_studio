# Sanity Schemas

## Overview

Create new Sanity document schemas for content that currently lives hardcoded in JSON translation files. This establishes the CMS foundation that other features depend on.

## Requirements

- Create `service.ts` schema — fields: title, description, features (array of strings), icon (string), order (number), slug
- Create `pricingPackage.ts` schema — fields: name, price (string), description, features (array of strings), popular (boolean), order (number)
- Create `processStep.ts` schema — fields: number (string), title, description, order (number)
- Create `siteSettings.ts` singleton schema — fields: heroHeadline, heroSubheadline, heroOverline, manifestoTitle, manifestoHeading, manifestoText, portfolioStats (array of { value, label }), clientLogos (array of images), footerTagline, contactEmail
- Create `seo.ts` singleton schema — fields: defaultTitle, defaultDescription, ogImage, per-page overrides
- Register all new schemas in `src/sanity/schemaTypes/index.ts`
- Add TypeScript interfaces for each schema in `src/lib/sanity/types.ts`
- Add GROQ queries for each schema in `src/lib/sanity/queries.ts`

## Notes

- Follow existing pattern from `project.ts` — use `defineField` / `defineType` from sanity
- siteSettings and seo should be singletons (only one document of each type). Use Sanity's singleton pattern with `__experimental_actions` or structure builder
- Query naming convention: `{entity}Query`, `{entity}By{Field}Query` per coding standards
- These schemas provide data only — UI components will be migrated in feature #02
