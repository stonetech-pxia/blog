# Landing Page

## Overview

The site's home page, served at the root path `/`. It is a static welcome page that introduces the blog and its subject matter. It does not list articles — the article index is a separate page (see [Blog post listing](blog-post-listing.md)).

## Observable behavior

- Reachable at the root URL `/`.
- Displays the site brand logo (a stone-cube mark) twice, flanking a large centered heading that reads "Bonjour à tous !".
- Below the heading, four short French paragraphs introduce the blog:
  - A welcome addressed to developers, web-curious readers, and tech enthusiasts.
  - A note that coding agents are a hot topic and are deeply changing how we code.
  - A statement that the blog shares concrete tips for getting the most out of these tools day to day.
  - An invitation to leave a comment at the bottom of articles, promising the author reads and replies.
- Uses the standard site header and footer (see [Site navigation & chrome](navigation-and-chrome.md)).
- The browser tab title and meta description come from the global site title and site description (see [Configuration](../configuration.md)).

## Constraints & notes

- All visible copy is hard-coded French prose; it is not driven by article content or configuration.
- The page's social/SEO metadata falls back to the default placeholder article image because no page-specific image is supplied (see [Social & SEO metadata](social-seo-metadata.md)).
- The document's declared HTML language is English while the copy is French — see [Open Questions](../open-questions.md).
