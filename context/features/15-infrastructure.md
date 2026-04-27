# Infrastructure & DX

## Overview

Set up development infrastructure for maintainability: environment config, documentation, CI pipeline, git hooks, and Sanity preview mode.

## Requirements

- Create `.env.example` with all required variables documented: `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `SANITY_API_READ_TOKEN`, `RESEND_API_KEY`, `CONTACT_NOTIFY_EMAIL`, `SENTRY_DSN`
- Move hardcoded Sanity projectId from `sanity.config.ts` (`kcffnd7i`) to env vars
- Rewrite `README.md`: project description, tech stack, setup instructions, env vars, Sanity content management, deployment
- Set up GitHub Actions CI: `npm run lint`, TypeScript check, `npm run build` on pull requests
- Set up Husky + lint-staged for pre-commit hooks (lint + type check on staged files)
- Configure Sanity Preview Mode / Draft Mode via next-sanity Visual Editing (content managers can preview draft content)
- Configure Sanity Studio deployment (either embedded at `/studio` route or separate deploy)

## Notes

- Sanity Studio is already partially configured — check `sanity.config.ts` for current setup
- Preview Mode requires a Sanity read token with draft access and a Next.js draft mode API route
- Husky v9+ uses a different setup than older versions — check current package versions
- CI should fail the PR if build or lint fails — enforces code quality standards
- README should be useful for onboarding a new developer to the project
