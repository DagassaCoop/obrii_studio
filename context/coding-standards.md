# Coding Standards

## TypeScript

- Strict mode enabled
- No `any` types - use proper typing or `unknown`
- Define interfaces for all props, API responses, and data models
- Use type inference where obvious, explicit types where helpful

## React

- Functional components only (no class components)
- Use hooks for state and side effects
- Keep components focused - one job per component
- Extract reusable logic into custom hooks

## Next.js

- Server components by default
- Only use `'use client'` when needed (interactivity, hooks, browser APIs)
- Use Server Actions for form submissions and simple mutations
- Use API routes when you need:
  - Webhooks (Stripe, GitHub, etc.)
  - File uploads with progress tracking
  - Long-running operations
  - Specific HTTP status codes or headers
  - Endpoints for future mobile/CLI clients
  - Third-party integrations
- Otherwise, fetch data directly in server components
- Dynamic routes for item/collection pages

## Tailwind CSS v4

**CRITICAL**: We are using Tailwind CSS v4, which uses CSS-based configuration.

- **DO NOT** create `tailwind.config.ts` or `tailwind.config.js` files (those are for v3)
- All theme configuration must be done in CSS using the `@theme` directive in `src/app/globals.css`
- Use CSS custom properties for colors, spacing, etc.
- No JavaScript-based config allowed

## File Organization

- Components: `src/components/[feature]/ComponentName.tsx`
- Pages: `src/app/[route]/page.tsx`
- Server Actions: `src/actions/[feature].ts`
- Types: `src/types/[feature].ts`
- Lib/Utils: `src/lib/[utility].ts`

## Naming

- Components: PascalCase (`ItemCard.tsx`)
- Files: Match component name or kebab-case
- Functions: camelCase
- Constants: SCREAMING_SNAKE_CASE
- Types/Interfaces: PascalCase (no prefix)

## Styling

- Tailwind CSS for all styling
- Use shadcn/ui components where applicable
- No inline styles
- Light mode

## i18n (next-intl)

- Locales: `en` (default), `fr`
- Translation files: `src/messages/{locale}.json`
- In **client** components: `useTranslations("namespace")`
- In **server** components: `await getTranslations("namespace")`
- Use `Link`, `useRouter`, `usePathname` from `@/i18n/navigation` (not from `next/link` or `next/navigation`)
- New routes must be registered in `src/i18n/routing.ts` pathnames
- Never hardcode user-facing strings — all text goes through `t()`
- For arrays (e.g. feature lists): use `t.raw("key")` with explicit type cast
- Keep `en.json` and `fr.json` structure in sync — same keys, same nesting
- Namespace = top-level key in JSON (e.g. `"hero"`, `"services"`, `"portfolio"`)
- One namespace per component, name the variable `t`

## Sanity (CMS)

- Schema types: `src/sanity/schemaTypes/` — one file per document type, registered in `index.ts`
- GROQ queries: `src/lib/sanity/queries.ts` — all queries in one file, exported as named constants
- Name queries descriptively: `{entity}Query`, `{entity}By{Field}Query`, `featured{Entity}Query`
- Always project only needed fields in GROQ (no `*[_type == "x"]` without `{ field1, field2 }`)
- Sort explicitly: `| order(order asc)` — don't rely on default Sanity ordering
- Use `$param` for dynamic GROQ filters (e.g. `slug.current == $slug`)
- Content from Sanity is NOT translated — it comes as-is from the CMS (UI chrome goes through i18n, Sanity content does not)

## Error Handling

- Use try/catch in Server Actions
- Return `{ success, data, error }` pattern from actions
- Display user-friendly error messages via toast

## Code Quality

- No commented-out code unless specified
- No unused imports or variables
- Keep functions under 50 lines when possible
