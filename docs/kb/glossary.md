# Glossary

Domain terms and concepts used by StoneTech Blog.

- **Article / blog post** — A single piece of published content, authored in Markdown or MDX with required frontmatter, rendered as its own page at `/blog/<slug>/`. See [Blog post page](features/blog-post-page.md).
- **Frontmatter** — The structured metadata block at the top of an article (title, description, publication date, optional updated date and hero image) that is schema-validated at build time. See [Configuration](configuration.md).
- **Slug** — The URL-path segment identifying an article, derived from its source document's filename. Produces the address `/blog/<slug>/`.
- **Hero image** — An optional banner image for an article, shown full-width at the top of the article page, as the card thumbnail in the listing, and as the social-preview image. See [Blog post listing](features/blog-post-listing.md).
- **Publication date (`pubDate`)** — The article's original publish date; also the sort key for the listing and the feed.
- **Updated date (`updatedDate`)** — Optional date indicating the last revision; surfaces an "updated on" line on the article page.
- **Content collection** — The build-time gathering of all articles into one validated set from which pages, the RSS feed, and the sitemap are generated. See [Architecture](architecture.md).
- **Canonical URL** — The single authoritative absolute URL for a page, emitted in the head for search engines. See [Social & SEO metadata](features/social-seo-metadata.md).
- **Open Graph tags** — Head metadata that controls how a shared link previews on social platforms (title, description, image, type).
- **Twitter card** — Head metadata controlling link previews on X/Twitter; this site uses the large-image summary card.
- **RSS feed** — A machine-readable list of articles for feed readers, served at `/rss.xml`. See [RSS feed](features/rss-feed.md).
- **Sitemap** — A machine-readable list of the site's pages for search engines, served at `/sitemap-index.xml`. See [Sitemap](features/sitemap.md).
- **Giscus** — A third-party commenting widget that stores comments and reactions as GitHub Discussions threads, embedded on article pages. See [Article comments](features/article-comments.md).
- **Discussion thread** — The GitHub Discussion, mapped one-per-page by pathname, that holds an article's comments.
- **Atkinson Hyperlegible** — The self-hosted, accessibility-focused typeface used site-wide. See [Typography & branding](features/typography-and-branding.md).
- **English-locale short date** — The display format for dates on the site (e.g. "May 15, 2026"), regardless of the French content language. See [Open Questions](open-questions.md).
