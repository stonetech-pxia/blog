# Workflows

End-to-end processes the project supports.

## Publishing a new article

1. The author creates a new Markdown or MDX document in the article content area.
2. The document's filename becomes the article's URL slug (`/blog/<slug>/`).
3. The author fills in the required frontmatter — `title`, `description`, `pubDate` — and optionally `updatedDate` and `heroImage`. See [Blog post page](features/blog-post-page.md).
4. On the next build, the article is validated, its page is generated, and it automatically appears:
   - as a card on the [article listing](features/blog-post-listing.md) (inserted in date order, newest first),
   - as an item in the [RSS feed](features/rss-feed.md),
   - as an entry in the [sitemap](features/sitemap.md).
5. No manual registration anywhere is needed; discovery is automatic from the content collection.

## Marking an article as updated

1. The author adds or changes the optional `updatedDate` frontmatter field.
2. On rebuild, the article page shows an italic "Last updated on <date>" line beneath the publication date.

## Reading and commenting

1. A reader browses the [listing](features/blog-post-listing.md) or lands on an [article](features/blog-post-page.md).
2. At the bottom of the article the comment widget loads from the third-party service.
3. The reader authenticates with GitHub and posts a comment or reaction, which is stored as a GitHub Discussion thread mapped to that page's path. See [Article comments](features/article-comments.md).

## Building and deploying

1. A production build validates all articles, renders every page, optimizes images, and emits the RSS feed and sitemap.
2. The static output is deployed to the hosting platform (Vercel).
3. For correct canonical URLs, feed links, sitemap URLs, and social preview images, the deployment site URL must match the real production domain. See [Configuration](configuration.md).

## Rebranding the site

1. Update the centralized site title and site description values (used by page titles, the RSS channel, and default social metadata).
2. Update the deployment site URL if the domain changes.
3. Replace the brand logo/favicon assets as needed. See [Typography & branding](features/typography-and-branding.md) and [Configuration](configuration.md).
