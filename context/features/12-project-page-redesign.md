# Project Page Redesign

## Overview

Redesign the individual project page layout to take advantage of new fields (client, role, tags, credits, timecode) and create a more compelling case study presentation.

## Requirements

- Redesign overall page structure (currently: ProjectHero > ProjectMedia > ProjectProblemSolution > ProjectGallery > ProjectRelatedWork)
- Display new fields: client name, studio role, tags, credits list, publication date, timecode
- Create a project info sidebar or metadata block (client, role, date, tags)
- Improve ProjectGallery layout (consider masonry or varied grid)
- Improve ProjectRelatedWork section design
- Ensure the page works with both video and non-video projects
- All UI strings via i18n, all content from Sanity
- Responsive layout for mobile and desktop

## Notes

- This depends on feature #03 (new Project fields must exist in Sanity)
- A design reference or Figma mockup from the user would significantly help — ask before starting implementation
- Current components in `src/components/project/` can be refactored or replaced
- Keep the editorial, minimal feel consistent with the rest of the site
