# Analyze Project

Use this prompt for the first full pass over a project, or to re-run a full pass after major changes.

Task:

- Read `kb.config.md` for the content rules before doing anything else.
- Explore the project to determine its project type, primary language(s), and key technologies, and fill in `index.md`'s Global Info block.
- Enumerate every distinct feature the project offers. Create one page per feature under `features/` and list each in `features/index.md`.
- Fill in `architecture.md`, `workflows.md`, `configuration.md`, and `glossary.md` from what the project's behavior actually shows.
- Record any confirmed design rationale in `decisions.md`.
- Record anything unclear or unconfirmed in `open-questions.md` instead of guessing.
- Never reference file paths, folder names, module names, function/class/method names, or code-level metrics anywhere in the knowledge base.
- Update `index.md`'s summary table for every section file created.
- Log the pass in `logs/maintenance-log.md`.
