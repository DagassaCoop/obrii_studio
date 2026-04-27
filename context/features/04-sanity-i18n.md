# Sanity Content Internationalization

## Overview

Enable multilingual content management in Sanity so that all CMS content (projects, services, pricing, etc.) can be authored in both EN and FR without code changes.

## Requirements

- Install and configure `@sanity/document-internationalization` plugin
- Apply internationalization to all text fields across schemas: project, service, pricingPackage, processStep, siteSettings
- Configure language switcher in Sanity Studio for content editors
- Update GROQ queries to filter/return content by current locale
- Update components to pass locale to Sanity fetch calls
- Ensure fallback behavior: if FR content is missing, fall back to EN

## Notes

- Two approaches exist: document-level (separate document per locale) vs field-level (`{ en: "...", fr: "..." }`). Document-level via `@sanity/document-internationalization` is cleaner for this project size
- This changes how GROQ queries work — they'll need locale filtering
- UI chrome strings (buttons, labels) remain in `src/messages/{locale}.json` via next-intl
- This depends on features #01 and #02 (schemas and migration must be done first)
