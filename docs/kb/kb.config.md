# StoneTech Blog Knowledge Base Config

Slug: `stonetech-blog`
Flavor: `codebase`
Created: `2026-07-05`
Root: `/c/Users/Xia/projects/blog/satnaing/astro-paper/docs/kb`

## Purpose

Document the non-code, functional knowledge of this project so an AI assistant can answer any non-code question about it without reading the source.

## Audience

AI agents (and humans) who need to understand what this project does and why, without touching implementation detail.

## Content Rules

- Never reference the project's file paths, folder names, module names, function/class/method names, or code-level metrics (line counts, function counts, and similar).
- Operational identifiers that are part of the project's functional surface (environment variable names, config keys, CLI flags) are fine to mention — they answer configuration questions, not code-structure questions.
- Cross-linking between this knowledge base's own markdown files is expected and encouraged.
- Every feature must be documented to the smallest observable detail: inputs, outputs, behavior, edge cases, constraints, and user-facing effects.
- Use precise, direct, unambiguous vocabulary. Write for machine consumption first, human readability second.
- Mark uncertainty explicitly when project behavior cannot be confirmed from available material.
- Never invent behavior that cannot be observed or reasonably inferred from the project.

## Freshness Policy

- There is no external source material here — the project itself is the material, so there is no `sources.md`.
- Re-validate a section whenever the underlying project changes materially.
- Record the review date and outcome per section in `logs/maintenance-log.md`.
- Do not assume a section is still accurate just because it exists; check the freshness log before relying on it.

## Page Types

- `index.md` for global project info and the section summary (with file paths).
- `features/<feature-slug>.md` for each individual feature, detailed exhaustively.
- `architecture.md` for the functional, conceptual organization of the system.
- `workflows.md` for end-to-end processes the project supports.
- `configuration.md` for configurable behavior, environments, and deployment concepts.
- `glossary.md` for domain terms and concepts.
- `decisions.md` for important design choices and rationale.
- `open-questions.md` for unresolved or unclear behavior.

Add further section files whenever a category of non-code question is not yet answerable, and list them here and in `index.md`'s summary table.

## Maintenance Rules

- Update `index.md`'s summary table whenever a section file is added, removed, or renamed.
- Update `logs/maintenance-log.md` with the review date whenever a section is created or re-validated.
