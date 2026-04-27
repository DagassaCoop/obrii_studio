# Legal Pages

## Overview

Add Privacy Policy and Terms of Use pages, and a GDPR consent checkbox on the contact form. Required for collecting user data, especially with FR locale implying EU traffic.

## Requirements

- Create `src/app/[locale]/privacy/page.tsx` — Privacy Policy page
- Create `src/app/[locale]/terms/page.tsx` — Terms of Use page
- Register both routes in `src/i18n/routing.ts`
- Add translations for both pages in `en.json` and `fr.json`
- Add GDPR consent checkbox to the contact form: "I agree to the processing of my personal data" with link to Privacy Policy
- Make consent checkbox required for form submission
- Add cookie consent banner (if analytics from feature #14 requires cookies)
- Add Privacy/Terms links to Footer
- Style pages consistently with studio design (parchment background, clean typography)

## Notes

- Privacy Policy must cover: what data is collected (form fields), how it's stored, who has access, retention period, user rights (access, deletion)
- For EU/GDPR compliance: explicit consent required, data minimization, right to be forgotten
- Legal text content can be placeholder initially — user should review with legal counsel
- Cookie consent banner only needed if analytics sets cookies (Vercel Analytics is cookieless, Plausible is cookieless — may not need it)
- This depends on feature #06 (contact form frontend must exist to add checkbox)
