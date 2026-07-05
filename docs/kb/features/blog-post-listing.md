# Blog Post Listing

## Overview

An index page, served at `/blog`, that presents every published article as a grid of cards. It is the main way readers browse content.

## Observable behavior

- Reachable at `/blog`.
- Collects all published articles and sorts them by publication date, newest first.
- Renders the articles as a list of cards. Each card links to that article's full page and shows:
  - The article's hero image, if the article defines one (cards for articles without a hero image show no image).
  - The article title.
  - The publication date, formatted as an English-locale short date (e.g. "May 15, 2026") — see [Glossary](../glossary.md) for the date-format note.
- Layout rules:
  - The first (newest) article is featured full-width and centered, with a larger title and a full-width image.
  - All remaining articles are laid out two-per-row.
  - On narrow screens (720px wide or less) every card becomes full-width and centered.
- Hover interactions on each card: the card lifts slightly, the title gains an underline, the date shifts to the accent color, and the image gains a shadow.

## Inputs

- The set of published articles and their frontmatter (title, publication date, optional hero image). See [Blog post page](blog-post-page.md) and [Configuration](../configuration.md) for the article schema.

## Constraints & notes

- Ordering is strictly by publication date descending; there is no pagination, tagging, category filter, or search.
- An article with no hero image still appears, just without a thumbnail.
