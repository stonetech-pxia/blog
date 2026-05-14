# Giscus Comments & Reactions — Design Spec

**Date:** 2026-05-07

## Overview

Integrate Giscus (GitHub Discussions-backed comments and reactions) into the Astro blog at `stoneblog.vercel.app`. Each blog post gets its own comment thread mapped by URL pathname.

## Configuration

- **Repo:** `stonetech-pxia/blog` (public)
- **Repo ID:** `R_kgDOSWVGjQ`
- **Category:** Announcements
- **Category ID:** `DIC_kwDOSWVGjc4C8eeh`
- **Mapping:** `pathname` — one Discussion per post URL
- **Theme:** `light`
- **Language:** `fr`
- **Reactions:** enabled
- **Input position:** bottom

## Architecture

### New file: `src/components/Giscus.astro`

Encapsulates the Giscus `<script>` tag with `is:inline` so Astro does not attempt to bundle it. No props — configuration is static.

### Modified file: `src/layouts/BlogPost.astro`

Import `Giscus.astro` and render `<Giscus />` immediately after `<slot />` inside the `.prose` div. This places the comment section below article content, constrained to the same 720px column.

## Prerequisites (manual, already done)

1. GitHub Discussions enabled on `stonetech-pxia/blog`
2. Giscus GitHub App installed on the repo
3. Script generated from giscus.app with the IDs above
