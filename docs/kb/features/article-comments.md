# Article Comments

## Overview

Each article page (and the About page) ends with an embedded comment thread, powered by Giscus — a commenting widget that stores comments as a GitHub Discussions thread.

## Observable behavior

- A comment widget loads at the bottom of the prose column on every page that uses the article layout.
- Comments are backed by GitHub Discussions on the repository `stonetech-pxia/blog`. Readers comment by authenticating with GitHub.
- Each page maps to its own discussion thread by page pathname, so every article gets a distinct comment thread and the About page gets its own.
- Discussions are filed under the "Announcements" category of that repository.
- Reactions (emoji) are enabled on the thread.
- The comment box is positioned at the bottom of the thread (readers type below existing comments).
- The widget renders with the light theme and its interface language set to French.
- The widget script loads asynchronously from the Giscus service and requires network access to that third-party service at page view time.

## Constraints & notes

- Because the About page uses the article layout, it also displays a comment thread (see [About page](about-page.md)).
- The comment feature depends on external services (Giscus and GitHub); it will not function offline or if those services are blocked.
- Configuration identifiers for the widget (repository, repository id, category, category id) are functional configuration values — see [Configuration](../configuration.md).
- A design record for adopting Giscus exists in the project's own design notes — see [Decisions](../decisions.md).
