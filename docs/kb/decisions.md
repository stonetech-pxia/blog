# Decisions

Important design or product choices and their rationale. Confirmed rationale is distinguished from inferred rationale.

## Static-first, no backend

- **Choice:** Ship the blog as a fully pre-rendered static site with no application server or database.
- **Rationale (inferred):** Simplicity, speed, and cheap/robust hosting for a personal blog. Content is authored as files and everything else is generated at build time. Consistent with the author's stated preference (on the About page) for simple, direct solutions over complex architecture.

## Comments via Giscus / GitHub Discussions

- **Choice:** Use Giscus, mapping one GitHub Discussion per page by pathname, under the "Announcements" category of the `stonetech-pxia/blog` repository, with reactions enabled, French language, light theme, and the input box at the bottom.
- **Rationale (confirmed, from the project's own design note):** Adds comments and reactions to a static blog without running a comments backend; GitHub Discussions provides storage, moderation, and authentication. Pathname mapping gives each article its own thread.
- **Consequence:** The About page, which reuses the article layout, also renders a comment thread. See [Article comments](features/article-comments.md).

## Self-hosted accessible font

- **Choice:** Serve Atkinson Hyperlegible locally (preloaded, swap display) rather than from a font CDN.
- **Rationale (inferred):** Accessibility (the typeface is designed for legibility) and independence from third-party font services, avoiding an external request on every page load. See [Typography & branding](features/typography-and-branding.md).

## French content, single-author personal focus

- **Choice:** Publish articles, page copy, navigation, and the comment widget in French; center the blog on coding-agent and developer-tooling tips.
- **Rationale (confirmed, from site copy):** The landing and About pages frame it as a personal blog sharing concrete, practical tips about AI coding tools for a French-speaking developer audience.

## Reuse the article layout for the About page

- **Choice:** Render the standalone About page with the same layout as an article rather than a bespoke page.
- **Rationale (inferred):** Reuse and visual consistency. A side effect is that the About page inherits the date line and comment thread. See [About page](features/about-page.md).
