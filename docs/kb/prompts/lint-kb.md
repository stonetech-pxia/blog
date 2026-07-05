# Lint Knowledge Base

Use this prompt to improve an existing codebase knowledge base without changing its intent.

Task:

- Read `kb.config.md`, `index.md`, and a representative sample of section and feature pages.
- Find any reference to a file path, folder name, module name, function/class/method name, or code-level metric, and rewrite it in functional terms.
- Find stale cross-links, missing rows in `index.md`'s summary table or `features/index.md`, duplicated content across pages, and unmarked speculation.
- Patch focused issues when the fix is obvious; otherwise log them in `open-questions.md`.
- Leave a concise entry in `logs/maintenance-log.md`.
