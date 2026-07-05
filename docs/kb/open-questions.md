# Open Questions

Behavior that is unclear, unconfirmed, or inconsistent.

## Content language vs. declared HTML language

- Pages declare their document language as English (`lang="en"`) while all visible content, navigation, and the comment widget are in French. This mismatch may affect accessibility tooling and search engines. Unclear whether this is intentional or an oversight.

## Date display locale

- Dates render in English-locale short format (e.g. "May 15, 2026") even though the site content is French. Unclear whether a French date format is desired.

## Open Graph type on article pages

- Article pages emit Open Graph `type = "website"` rather than `"article"`. Whether article-specific Open Graph typing (and article metadata such as author or published time) is desired is unconfirmed.

## Deployment domain history

- The configured site URL is `https://stonetech.dev`. Earlier project material references `stoneblog.vercel.app`. It is unconfirmed which domain is currently live and whether `stonetech.dev` is fully provisioned. Incorrect site URL would break canonical URLs, feed/sitemap links, and social-preview image URLs. See [Configuration](configuration.md).

## About page publication date

- The About page shows a hard-coded publication date (15 May 2026). It is unclear whether this date is meaningful or a placeholder; it is not a real authoring timestamp.

## Empty header social-links area

- The header reserves a social-links area that is currently empty (social links live only in the footer). Unclear whether header social links were intended to be added later. See [Site navigation & chrome](features/navigation-and-chrome.md).

## About page empty description

- The About page passes an empty description, resulting in a blank meta description and a fallback social-preview image for that page. Unclear whether a description is intended.
