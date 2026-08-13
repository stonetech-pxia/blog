# Typography & Branding

## Overview

The site uses a single typeface, loaded from Google Fonts, and a consistent stone-cube brand mark.

## Typography

- The site font is Inter, chosen for its visual identity.
- Two weights are used: regular (400) and bold (700), both in normal style.
- The font is loaded from Google Fonts via Astro's Google font provider, not self-hosted.
- The font is preloaded and uses swap display, so text renders immediately in a fallback and swaps to Inter once loaded. The declared fallback is a generic sans-serif.

## Branding

- The site brand is "StoneTech Blog" / "Stone Tech".
- A stone-cube logo mark is used in the header (beside "Blog"), on the landing page (flanking the welcome heading), and as the image alt identity.
- The browser favicon is provided in both SVG and ICO formats.
- The visual theme uses a light background with a defined accent color and grayscale palette applied through global styles (headings, links, hover states, code blocks, etc.).

## Constraints & notes

- Because the font is loaded from Google Fonts, page rendering depends on that third-party service being reachable; this dependency was knowingly accepted in exchange for the Inter typeface. See [Decisions](../decisions.md).
- Brand strings (site title, site description) are centralized configuration values — see [Configuration](../configuration.md).
