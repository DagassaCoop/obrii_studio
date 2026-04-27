# Brand Assets

## Overview

Replace placeholder text-based logo with real brand assets. Add favicon, apple-touch-icon, and default OG image.

## Requirements

- Obtain logo SVG/PNG from the user and place in `public/brand/`
- Replace text logo in Header.tsx with `<Image>` or inline SVG
- Replace text logo in Footer.tsx with `<Image>` or inline SVG
- Add `favicon.ico` to `public/`
- Add `apple-touch-icon.png` (180x180) to `public/`
- Add default `og-image.png` (1200x630) to `public/brand/`
- Configure favicon and icons in root layout metadata

## Notes

- Current logo is text-based: "OBRII" (bold) + "STUDIO" (light) in Header.tsx and mobile Sheet
- Logo should work on terracotta background (header) and parchment background (footer)
- May need two logo variants: light (for header) and dark (for footer)
- This is blocked until the user provides actual brand files
- OG image will be used as fallback; dynamic OG generation is handled in feature #08
