# TypeScript Cleanup

## Overview

Fix TypeScript suppressions, tighten types, and ensure clean lint output across the codebase.

## Requirements

- Remove `@ts-ignore` / `eslint-disable` comments in Header.tsx — fix `Link` typings to use proper next-intl `Pathnames` type
- Fix or remove `@ts-expect-error` in VimeoPlayer.tsx — upgrade `@vimeo/player` types or narrow the interface
- Fix duplicate `category` in Pick type in FeaturedWorkRow.tsx
- Ensure all `t.raw()` calls have proper type assertions or runtime validation
- Run `npm run lint` — fix all warnings and errors
- Run `npm run build` — ensure zero TypeScript errors
- No remaining `any` types (use `unknown` or proper interfaces)

## Notes

- Some ts-ignore issues may resolve naturally after Sanity migration (features #01-02) removes `t.raw()` calls
- Focus on real type safety, not just suppressing errors
- Header.tsx Link issue is a known next-intl typing challenge with localized pathnames — may need a utility type or cast
