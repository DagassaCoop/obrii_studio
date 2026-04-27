# Project Schema — New Fields

## Overview

Extend the existing Project schema in Sanity with additional fields needed for richer project pages and portfolio display.

## Requirements

- Add `timecode` field (string) — video duration display, replaces `__:__` placeholder in ProjectCard and FeaturedWorkRow
- Add `client` field (string) — client/brand name
- Add `role` field (string) — studio's role in the project (e.g. "Director, Editor")
- Add `tags` field (array of strings) — project tags for filtering/display
- Add `credits` field (array of { role: string, name: string }) — project credits list
- Add `publishedAt` field (datetime) — project publication date
- Update TypeScript interfaces in `src/lib/sanity/types.ts`
- Update GROQ queries to include new fields where needed
- Update ProjectCard and FeaturedWorkRow to display `timecode` instead of placeholder

## Notes

- The existing `category` field (video/social/smm) stays as-is — new fields complement it, not replace it
- `timecode` format: "MM:SS" string (e.g. "02:34")
- `credits` is an array of objects within the project document, not a separate schema
- These fields will be fully utilized in feature #12 (Project page redesign)
