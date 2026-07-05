# Compile Feature Page

Use this prompt to create or update a single page under `features/`.

Task:

- Read `kb.config.md` and the existing `features/` pages to avoid duplicating another feature's scope.
- Identify the feature's inputs, outputs, behavior, edge cases, constraints, and user-facing effects, to the smallest observable detail.
- Distinguish confirmed behavior from inferred behavior.
- Link to related feature pages, `workflows.md`, `configuration.md`, and `glossary.md` where relevant.
- Note anything unclear in `open-questions.md` rather than guessing.
- Never reference file paths, folder names, module names, function/class/method names, or code-level metrics.
- Add or update the feature's row in `features/index.md` and, if new, in `index.md`'s summary table.
