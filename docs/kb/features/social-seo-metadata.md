# Social & SEO Metadata

## Overview

Every page emits a consistent set of head metadata for search engines and social sharing: a canonical URL, primary meta tags, Open Graph tags (Facebook and general link previews), and Twitter card tags.

## Observable behavior

Each page's head includes:

- Character set, responsive viewport, favicon links (SVG and ICO), a sitemap link, and an RSS alternate-feed link.
- A generator meta tag identifying the site generator.
- A preloaded custom web font (see [Typography & branding](typography-and-branding.md)).
- A canonical URL built from the configured site URL plus the current page path.
- Primary meta tags: page title, title meta, and description.
- Open Graph tags: type "website", the page URL, title, description, and a preview image.
- Twitter tags: card type "summary_large_image", the page URL, title, description, and a preview image.

## Inputs & fallbacks

- Title and description are supplied per page. Article pages pass the article's own title and description; the landing and listing pages pass the global site title and site description.
- Preview image resolution:
  - Article pages pass the article's hero image when present.
  - When no image is supplied (landing page, listing page, About page, or an article without a hero image), a default placeholder image is used so link previews always have an image.
- The image is emitted as an absolute URL suitable for social crawlers.

## Constraints & notes

- Correct canonical and preview URLs depend on the deployment site URL being set to the real production URL (see [Configuration](../configuration.md)).
- The Open Graph type is always "website" (not "article"), even on article pages — see [Open Questions](../open-questions.md).
