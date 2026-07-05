# Typography & Branding

## Overview

The site uses a single custom, accessibility-oriented typeface and a consistent stone-cube brand mark.

## Typography

- The site font is Atkinson Hyperlegible, a typeface designed for high legibility.
- Two variants are used: regular (weight 400) and bold (weight 700), both in normal style.
- The font is served locally (self-hosted), not from a third-party font CDN.
- The font is preloaded and uses swap display, so text renders immediately in a fallback and swaps to the custom font once loaded. The declared fallback is a generic sans-serif.

## Branding

- The site brand is "StoneTech Blog" / "Stone Tech".
- A stone-cube logo mark is used in the header (beside "Blog"), on the landing page (flanking the welcome heading), and as the image alt identity.
- The browser favicon is provided in both SVG and ICO formats.
- The visual theme uses a light background with a defined accent color and grayscale palette applied through global styles (headings, links, hover states, code blocks, etc.).

## Constraints & notes

- Because the font is self-hosted and preloaded, page rendering does not depend on an external font service.
- Brand strings (site title, site description) are centralized configuration values — see [Configuration](../configuration.md).
