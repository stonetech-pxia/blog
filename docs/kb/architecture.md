# Architecture

This page describes the site's functional, conceptual organization — its responsibilities and how they interact — not its code layout.

## Nature of the system

StoneTech Blog is a **fully static, pre-rendered web site**. Every page is generated once at build time and served as static HTML, CSS, and assets. There is no application server or database at runtime. Dynamic behavior at view time comes only from third-party embeds (comments) and the reader's browser.

## Functional responsibilities

- **Content authoring surface** — Articles are authored as Markdown or MDX documents with a validated set of frontmatter fields. This is the sole source of article content. See [Configuration](configuration.md) for the schema.
- **Content collection & validation** — At build time all articles are gathered into a single collection and their frontmatter is schema-checked; a malformed article fails the build.
- **Page generation** — For each article, one full article page is produced. Fixed pages (landing, article listing, About) are produced directly. See the [Features](features/index.md) index.
- **Shared page assembly** — All pages are composed from shared building blocks: head metadata, header navigation, footer, and (for articles) the article layout wrapper. This gives the whole site a consistent frame.
- **Feed & discovery generation** — An RSS feed and a search-engine sitemap are produced from the same article collection during the build. See [RSS feed](features/rss-feed.md) and [Sitemap](features/sitemap.md).
- **Presentation & branding** — A global stylesheet plus a self-hosted accessible font define the site's look. See [Typography & branding](features/typography-and-branding.md).
- **Reader engagement** — A third-party comment widget is embedded per page, backed by GitHub Discussions. This is the only interactive, view-time feature. See [Article comments](features/article-comments.md).

## Interaction flow (conceptual)

1. The author writes an article and its frontmatter.
2. A production build validates the collection, renders every page, optimizes images, and emits the RSS feed and sitemap.
3. The static output is deployed to a hosting platform (Vercel).
4. A reader requests a page; the host returns pre-rendered HTML.
5. In the reader's browser, the comment widget loads from a third-party service and attaches the page's discussion thread.

## External dependencies at view time

- **Giscus / GitHub Discussions** — required for comments to render and function.
- Everything else (HTML, CSS, fonts, images, feed, sitemap) is self-contained in the deployed static output.

See [Workflows](workflows.md) for the end-to-end processes built on this architecture.
