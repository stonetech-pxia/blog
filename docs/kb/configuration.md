# Configuration

Configurable behavior, supported environments, and deployment concepts. Named identifiers here are part of the functional surface, not code structure.

## Site identity

- **Site title** — global brand title. Currently "StoneTech Blog". Used for browser tab titles on the landing and listing pages, the RSS channel title, and the RSS auto-discovery link label.
- **Site description** — global tagline. Currently "Welcome to my website!". Used as the default meta/social description and the RSS channel description.

Both are centralized single-source values; change them to rebrand text across the site. See [Typography & branding](features/typography-and-branding.md).

## Deployment site URL

- The canonical production URL is currently configured as `https://stonetech.dev`.
- This value drives canonical URLs, the RSS feed's site link and item links, the sitemap's URLs, and absolute social-preview image URLs.
- It must match the real production domain, or those absolute URLs will be wrong. See [Open Questions](open-questions.md) regarding domain history.

## Article frontmatter schema

Each article is validated against this schema at build time:

| Field | Required | Meaning |
| --- | --- | --- |
| `title` | yes | Article title |
| `description` | yes | Short summary; used for meta description and social tags |
| `pubDate` | yes | Publication date (date string, coerced to a date) |
| `updatedDate` | no | Last-updated date; shows an "updated on" line when present |
| `heroImage` | no | Banner and social-preview image for the article |

A missing required field fails the build. See [Blog post page](features/blog-post-page.md).

## Comment widget configuration (Giscus)

Static configuration values that bind the comment widget to a GitHub Discussions backend:

| Key | Value |
| --- | --- |
| Repository | `stonetech-pxia/blog` (public) |
| Repository ID | `R_kgDOSWVGjQ` |
| Category | `Announcements` |
| Category ID | `DIC_kwDOSWVGjc4C8eeh` |
| Thread mapping | `pathname` (one discussion per page URL) |
| Theme | `light` |
| Language | `fr` |
| Reactions | enabled |
| Input position | bottom |

Prerequisites for the widget to work: GitHub Discussions enabled on the repository, the Giscus GitHub App installed on it. See [Article comments](features/article-comments.md).

## Fonts

- Typeface: Inter, loaded from Google Fonts (weights 400 and 700), preloaded, swap display, sans-serif fallback. See [Typography & branding](features/typography-and-branding.md).

## Build & runtime environment

- Requires Node.js version 22.12.0 or newer to build.
- Build produces a fully static site; there is no server runtime or database.
- Local development, production build, and local preview of the built site are all supported as standard operations.
- Hosting/deployment target is Vercel.
- No application environment variables are required for the site to build or run; third-party service credentials for comments are handled by the Giscus GitHub App, not by site config.
