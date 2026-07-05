# Query And File

Use this prompt when answering a non-code question about the project from the knowledge base.

Task:

- Read `kb.config.md`, `index.md`, and the relevant section and feature pages.
- Answer the question using only the knowledge base. If the knowledge base cannot answer it, say so and treat it as a gap rather than reading the source to patch over it silently.
- If the answer should persist, add it to the most relevant existing section, or create a new one and list it in `index.md`'s summary table.
- Never cite the project's file paths, folder names, module names, function/class/method names, or code-level metrics in the answer.
- Log material additions in `logs/maintenance-log.md`.
