# Blog Post Page

## Overview

The full rendered view of a single article, served at `/blog/<slug>/`. One such page exists per published article and is generated at build time.

## URL & slug

- Each article's URL slug is derived from its source filename (without extension). The published address is `/blog/<slug>/`.
- Articles may be authored in Markdown or MDX; both render to the same page format.

## Article schema (frontmatter)

Every article must supply:

- `title` — the article title (required).
- `description` — a short summary used for the page's meta description and social tags (required).
- `pubDate` — publication date; accepts a date string and is coerced to a date (required).

Every article may optionally supply:

- `updatedDate` — a last-updated date.
- `heroImage` — a reference to an image asset used as the article's banner and social preview image.

An article missing any required field fails the build.

## Observable behavior

- Renders, top to bottom:
  - The hero image as a full-width banner (only if `heroImage` is set), with rounded corners and a shadow.
  - The publication date, formatted as an English-locale short date.
  - If `updatedDate` is present, an italic line reading "Last updated on <date>" beneath the publication date.
  - The article title as a large centered heading, followed by a horizontal rule.
  - The article body, rendered from its Markdown/MDX content.
  - A comment thread at the end of the article (see [Article comments](article-comments.md)).
- Uses the standard site header and footer (see [Site navigation & chrome](navigation-and-chrome.md)).
- Sets page-specific social/SEO metadata: the title, description, and — when present — the hero image are passed to the meta tags so shared links preview correctly (see [Social & SEO metadata](social-seo-metadata.md)).

## Constraints & notes

- The About page reuses this same article layout even though it is not part of the article collection (see [About page](about-page.md)).
- Body content styling (the "prose" column) is fixed-width and centered for readability.
