// Small hand-drawn drawing kit: rough.js shapes, text as glyph outlines (opentype.js), so the
// SVG files depend on no web font and render the same in <img>, in browsers and in sharp.
import fs from "node:fs";
import { createRequire } from "node:module";
import opentype from "opentype.js";
import { createRequire as cr } from "node:module";
const rough = cr(import.meta.url)("roughjs/bundled/rough.cjs.js");

const require = createRequire(import.meta.url);
const fontFile = require.resolve(
  "@fontsource/patrick-hand/files/patrick-hand-latin-400-normal.woff",
);
const buf = fs.readFileSync(fontFile);
const font = opentype.parse(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.length));

export const INK = "#1e1e1e";

// rough.js writes 15 decimals; one is plenty at this size and divides the files by ~4.
const short = (d) => d.replace(/-?\d+\.\d+/g, (n) => String(Math.round(n * 10) / 10));
export const COLORS = {
  frozen: "#a5d8ff",
  live: "#ffc078",
  today: "#b2f2bb",
  ask: "#ffec99",
  fail: "#ffa8a8",
  stale: "#ced4da",
  plain: "#f1f3f5",
};

export function sketch(width, height, seed = 7) {
  const gen = rough.generator();
  const parts = [];
  const glyphs = new Map();
  let n = seed;
  const opts = (o = {}) => ({
    seed: n++,
    stroke: INK,
    strokeWidth: 1.6,
    roughness: 1.1,
    bowing: 1,
    fillStyle: "hachure",
    hachureGap: 7,
    fillWeight: 1.4,
    ...o,
  });
  const put = (drawable) => {
    for (const p of gen.toPaths(drawable)) {
      parts.push(
        `<path d="${short(p.d)}" stroke="${p.stroke}" stroke-width="${p.strokeWidth}" fill="${p.fill || "none"}"${
          p.stroke !== "none" ? ' stroke-linecap="round" stroke-linejoin="round"' : ""
        }/>`,
      );
    }
  };

  const api = {
    width(text, size) {
      return font.getAdvanceWidth(text, size);
    },
    text(text, x, y, { size = 22, anchor = "start", color = INK } = {}) {
      const w = font.getAdvanceWidth(text, size);
      const x0 = anchor === "middle" ? x - w / 2 : anchor === "end" ? x - w : x;
      for (const ch of text) {
        if (font.charToGlyphIndex(ch) === 0 && ch.trim()) {
          throw new Error(`no glyph for ${JSON.stringify(ch)} in ${JSON.stringify(text)}`);
        }
      }
      // Each glyph is drawn once in <defs> at size 100 and placed with <use>: the text was
      // 90% of the file when every letter carried its own outline.
      const uses = [];
      font.forEachGlyph(text, x0, y, size, undefined, (glyph, gx, gy) => {
        if (!glyph.path.commands.length) return;
        const id = `g${glyph.index}`;
        if (!glyphs.has(id)) glyphs.set(id, glyph.getPath(0, 0, 100).toPathData(1));
        uses.push(
          `<use href="#${id}" transform="translate(${gx.toFixed(1)} ${gy.toFixed(1)}) scale(${size / 100})"/>`,
        );
      });
      parts.push(`<g fill="${color}">${uses.join("")}</g>`);
      return w;
    },
    // Lines centred on (x, y) as a block.
    lines(lines, x, y, { size = 22, gap = 1.25, anchor = "middle", color } = {}) {
      const step = size * gap;
      const top = y - (step * (lines.length - 1)) / 2 + size * 0.32;
      lines.forEach((l, i) => api.text(l, x, top + i * step, { size, anchor, color }));
    },
    box(x, y, w, h, { fill, r = 14, dashed = false, strokeWidth = 1.6, fillStyle } = {}) {
      const d = `M${x + r} ${y} H${x + w - r} Q${x + w} ${y} ${x + w} ${y + r} V${y + h - r} Q${
        x + w
      } ${y + h} ${x + w - r} ${y + h} H${x + r} Q${x} ${y + h} ${x} ${y + h - r} V${y + r} Q${x} ${y} ${
        x + r
      } ${y} Z`;
      put(
        gen.path(
          d,
          opts({
            fill,
            strokeWidth,
            ...(fillStyle ? { fillStyle } : {}),
            ...(dashed ? { strokeLineDash: [8, 7], disableMultiStroke: true } : {}),
          }),
        ),
      );
    },
    diamond(cx, cy, w, h, { fill } = {}) {
      put(
        gen.polygon(
          [
            [cx, cy - h / 2],
            [cx + w / 2, cy],
            [cx, cy + h / 2],
            [cx - w / 2, cy],
          ],
          opts({ fill }),
        ),
      );
    },
    line(points, o = {}) {
      put(gen.linearPath(points, opts(o)));
    },
    arrow(points, { head = 14, ...o } = {}) {
      put(gen.linearPath(points, opts(o)));
      const [x1, y1] = points[points.length - 2];
      const [x2, y2] = points[points.length - 1];
      const a = Math.atan2(y2 - y1, x2 - x1);
      for (const s of [-1, 1]) {
        const b = a + Math.PI + (s * Math.PI) / 7;
        put(gen.line(x2, y2, x2 + head * Math.cos(b), y2 + head * Math.sin(b), opts(o)));
      }
    },
    curveArrow(points, { head = 14, ...o } = {}) {
      put(gen.curve(points, opts(o)));
      const [x1, y1] = points[points.length - 2];
      const [x2, y2] = points[points.length - 1];
      const a = Math.atan2(y2 - y1, x2 - x1);
      for (const s of [-1, 1]) {
        const b = a + Math.PI + (s * Math.PI) / 7;
        put(gen.line(x2, y2, x2 + head * Math.cos(b), y2 + head * Math.sin(b), opts(o)));
      }
    },
    // A six-armed snowflake: "frozen".
    snowflake(cx, cy, r = 11) {
      for (let i = 0; i < 3; i++) {
        const a = (i * Math.PI) / 3 + Math.PI / 2;
        put(
          gen.line(
            cx - r * Math.cos(a),
            cy - r * Math.sin(a),
            cx + r * Math.cos(a),
            cy + r * Math.sin(a),
            opts({ stroke: "#1971c2", strokeWidth: 2, roughness: 0.6 }),
          ),
        );
        // Small branches near both ends of the arm, so it reads as snow, not an asterisk.
        for (const end of [1, -1]) {
          const ex = cx + end * r * 0.62 * Math.cos(a);
          const ey = cy + end * r * 0.62 * Math.sin(a);
          for (const side of [1, -1]) {
            const b = a + (end === 1 ? 0 : Math.PI) + Math.PI + (side * Math.PI) / 4;
            put(
              gen.line(
                ex,
                ey,
                ex - r * 0.42 * Math.cos(b + Math.PI),
                ey - r * 0.42 * Math.sin(b + Math.PI),
                opts({ stroke: "#1971c2", strokeWidth: 1.6, roughness: 0.4 }),
              ),
            );
          }
        }
      }
    },
    check(cx, cy, s = 14, stroke = "#2f9e44") {
      put(
        gen.linearPath(
          [
            [cx - s, cy],
            [cx - s * 0.3, cy + s * 0.7],
            [cx + s, cy - s * 0.8],
          ],
          opts({ stroke, strokeWidth: 3, roughness: 0.8 }),
        ),
      );
    },
    cross(cx, cy, s = 12, stroke = "#e03131") {
      put(gen.line(cx - s, cy - s, cx + s, cy + s, opts({ stroke, strokeWidth: 3, roughness: 0.8 })));
      put(gen.line(cx + s, cy - s, cx - s, cy + s, opts({ stroke, strokeWidth: 3, roughness: 0.8 })));
    },
    svg(title) {
      return [
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="img" aria-label="${title}">`,
        `<title>${title}</title>`,
        `<defs>${[...glyphs].map(([id, d]) => `<path id="${id}" d="${d}"/>`).join("")}</defs>`,
        `<rect width="${width}" height="${height}" fill="#ffffff"/>`,
        ...parts,
        "</svg>",
        "",
      ].join("\n");
    },
  };
  return api;
}
