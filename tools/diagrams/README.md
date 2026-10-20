# Diagrams

Hand-drawn diagrams of the blog posts. Not part of the site build: run the script and commit
the files it writes into `src/assets/`.

```bash
cd tools/diagrams && npm ci && npm run golden-set
```

`sketch.mjs` draws with [rough.js](https://roughjs.com) and writes text as glyph outlines
(font: Patrick Hand, SIL Open Font License, from `@fontsource/patrick-hand`), so the SVGs need
no web font. `golden-set.mjs` writes the diagrams and the header of `golden-set-agent-vocal`.
