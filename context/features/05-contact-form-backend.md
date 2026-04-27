# Contact Form — Backend

## Overview

Implement the server-side logic for the contact form: API endpoint, validation, email notifications, and data storage. Currently the form fakes submission with a `setTimeout(1500)`.

## Requirements

- Create API route `src/app/api/contact/route.ts` (POST)
- Validate input with Zod: name (required), email (required, valid format), projectType (enum), budget (enum), timeline (enum), description (optional)
- Add honeypot field for basic spam protection
- Add rate limiting per IP (in-memory for start, Upstash Redis as upgrade path)
- Send admin notification email via Resend (to studio email)
- Send confirmation email to the client
- Store submission in database (decide: Sanity `contactRequest` schema vs external DB)
- Return `{ success, data, error }` response pattern per coding standards
- Handle errors gracefully with appropriate HTTP status codes

## Notes

- Zod is already in project dependencies
- Resend is the simplest email service for Next.js — needs `RESEND_API_KEY` env var
- Storage decision needed: Sanity is simplest (already configured), external DB adds complexity but more flexibility
- CSRF protection not required for same-origin fetch, but honeypot + rate limit are minimum
- Email templates should be simple and on-brand (terracotta accent, clean layout)
