# Contact Form — Frontend

## Overview

Rebuild the contact form UI with proper form handling, validation feedback, and a design aligned with the studio's visual language. Replace the current mock submission with real API calls.

## Requirements

- Integrate React Hook Form with Zod resolver for client-side validation
- Connect form submission to the API route from feature #05
- Fields: name, email, projectType (select), budget (select), timeline (select), description (textarea)
- Hidden honeypot field (invisible to users, catches bots)
- Real-time validation feedback per field
- Submit button: disabled state while sending, loading indicator
- Success state: clear message with i18n, form reset
- Error state: user-friendly message with i18n, retry option
- Redesign form layout to match studio aesthetic (terracotta accents, parchment background, Josefin Slab headings)
- All user-facing strings via `useTranslations("contact")`

## Notes

- This is a `'use client'` component (React Hook Form requires client-side)
- Update both `en.json` and `fr.json` with any new translation keys
- Existing form fields in `contact.form` namespace can be reused/extended
- This depends on feature #05 (backend must exist to submit to)
