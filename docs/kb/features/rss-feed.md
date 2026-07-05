# RSS Feed

## Overview

A machine-readable RSS feed of all articles, served at `/rss.xml`, generated at build time.

## Observable behavior

- Reachable at `/rss.xml`.
- The feed's channel title and description are the global site title and site description (see [Configuration](../configuration.md)).
- The feed's site link is the configured deployment site URL.
- Contains one item per published article, carrying the article's frontmatter (title, description, publication date, etc.).
- Each item links to that article at `/blog/<slug>/`.
- The feed is advertised in every page's head via an alternate-feed link, so browsers and feed readers can auto-discover it.

## Constraints & notes

- Item ordering follows the underlying article collection; the feed itself does not re-sort.
- Correct absolute links in the feed depend on the deployment site URL being set to the real production URL (see [Configuration](../configuration.md)).
