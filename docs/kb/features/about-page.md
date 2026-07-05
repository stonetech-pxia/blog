# About Page

## Overview

A standalone page, served at `/about`, introducing the author. It is not part of the article collection but is presented using the same visual layout as an article (see [Blog post page](blog-post-page.md)).

## Observable behavior

- Reachable at `/about`, and linked from the site header as "À propos de moi".
- Rendered with the article layout, so it shows a title, a publication date line, and a body in the centered prose column.
- Title: "À propos de moi". The page supplies an empty description and a fixed publication date of 15 May 2026.
- Body copy (French) presents the author as a developer and webmaster of ten years who values simple, readable, direct code over impressive but hard-to-maintain architecture, is skeptical of over-engineering, and views AI coding tools as an opportunity rather than a threat.

## Constraints & notes

- Because it uses the article layout, the About page also renders a comment thread at the bottom (see [Article comments](article-comments.md)).
- The publication date shown on the page is a hard-coded value, not a real authoring timestamp.
- The empty description means this page's meta description is blank and its social preview image falls back to the default placeholder (see [Social & SEO metadata](social-seo-metadata.md)).
