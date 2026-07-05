# Site Navigation & Chrome

## Overview

Every page shares a common header (top navigation) and footer (copyright and social links).

## Header

- Appears at the top of every page.
- Shows the site brand logo (stone-cube mark) next to the word "Blog", linking to the home page.
- Provides three primary navigation links:
  - "Accueil" → `/` (landing page)
  - "Blog" → `/blog` (article listing)
  - "À propos de moi" → `/about` (About page)
- The navigation link matching the current page is highlighted as active (bold with an underline, and an accent-colored bottom border).
- Includes an (empty) area reserved for social links, which is hidden on screens 720px wide or less.

## Footer

- Appears at the bottom of every page.
- Shows a copyright line: "© <current year> Stone Tech. All rights reserved." The year is computed dynamically from the current date at build time.
- Provides three external social links, each opening in a new tab, with accessible screen-reader labels:
  - X (Twitter) profile: `https://x.com/px_ia_95`
  - GitHub profile: `https://github.com/stonetech-pxia`
  - LinkedIn profile: `https://www.linkedin.com/in/xia-pengda-830589212`

## Constraints & notes

- Active-link detection is based on the current page path; only the first path segment is considered for sub-pages.
- The social links live in the footer; the header's dedicated social-links area is currently empty.
