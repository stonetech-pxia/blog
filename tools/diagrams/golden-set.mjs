// Diagrams of the post "golden-set-agent-vocal": node golden-set.mjs
// Writes the SVGs and the header PNG into src/assets/golden-set-agent-vocal/.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { COLORS, sketch } from "./sketch.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const out = path.resolve(here, "../../src/assets/golden-set-agent-vocal");
fs.mkdirSync(out, { recursive: true });

// A chat bubble sized to its text; returns its bottom.
function bubble(s, text, { x, y, right = false, fill, dashed, size = 22, colRight = 600 }) {
  const w = s.width(text, size) + 44;
  const h = 52;
  const bx = right ? colRight - w : x;
  s.box(bx, y, w, h, { fill, dashed, r: 18 });
  s.text(text, bx + 22, y + h / 2 + size * 0.32, { size });
  return { x: bx, y, w, h };
}

// (a) What a case freezes, and what runs on today's code.
function frozenVsLive() {
  const s = sketch(1000, 780, 11);
  s.text("Un cas de test", 500, 52, { size: 34, anchor: "middle" });

  // Legend.
  const legend = [
    [COLORS.frozen, "figé : enregistré une fois"],
    [COLORS.live, "en direct, à chaque essai"],
    [COLORS.today, "code d'aujourd'hui, à chaque essai"],
  ];
  let lx = 40;
  for (const [fill, label] of legend) {
    s.box(lx, 84, 34, 24, { fill, r: 6 });
    lx += 46 + s.text(label, lx + 46, 104, { size: 21 }) + 40;
  }

  const left = 40;
  const col = 620;
  const rows = [
    ["Bonjour, je voudrais un bento poulet à emporter.", false],
    ["Un bento poulet, c'est noté. À quel nom ?", true],
    ["C'est pour Paul.", false],
    ["Merci Paul. Vous désirez autre chose ?", true],
  ];
  let y = 150;
  for (const [text, right] of rows) {
    const b = bubble(s, text, { x: left, y, right, fill: COLORS.frozen, colRight: col });
    s.snowflake(right ? b.x - 22 : b.x + b.w + 22, y + 26);
    s.text(right ? "agent" : "client", right ? b.x + b.w : b.x, y - 6, {
      size: 19,
      anchor: right ? "end" : "start",
      color: "#868e96",
    });
    y += 84;
  }
  // Bracket for the history.
  s.line(
    [
      [12, 150],
      [4, 150],
      [4, y - 32],
      [12, y - 32],
    ],
    { stroke: "#1971c2", strokeWidth: 2 },
  );

  y += 14;
  s.text("phrase testée", left, y - 6, { size: 19, color: "#d9480f" });
  const tested = bubble(s, "Et la sauce, sans gluten s'il vous plaît, je suis cœliaque.", {
    x: left,
    y,
    fill: COLORS.live,
  });
  y += 84;
  const reply = bubble(s, "?  le vrai modèle répond", {
    x: left,
    y,
    right: true,
    fill: COLORS.live,
    dashed: true,
    colRight: col,
  });
  s.text("agent, en direct", reply.x + reply.w, y - 6, {
    size: 19,
    anchor: "end",
    color: "#868e96",
  });

  // Judged by code.
  y += 96;
  s.box(170, y, 450, 70, { fill: COLORS.plain });
  s.lines(["Vérifié par du code :", "a-t-il transféré l'appel à une personne ?"], 395, y + 35, {
    size: 21,
  });
  s.arrow(
    [
      [reply.x + reply.w / 2, reply.y + reply.h + 4],
      [395, y - 6],
    ],
    { strokeWidth: 1.8 },
  );
  s.check(650, y + 36, 16);

  // Today's code, feeding the whole conversation.
  const tx = 690;
  const ty = 210;
  s.box(tx, ty, 285, 330, { fill: COLORS.today });
  s.text("Code d'aujourd'hui", tx + 142, ty + 42, { size: 26, anchor: "middle" });
  const items = [
    ["les règles du prompt,", "version du jour"],
    ["les notes que le code", "ajoute (langue, relecture…)"],
    ["les outils, ré-exécutés", "sur un menu de test"],
  ];
  items.forEach((pair, i) => {
    const iy = ty + 95 + i * 78;
    s.text("•", tx + 20, iy, { size: 22 });
    s.text(pair[0], tx + 38, iy, { size: 21 });
    s.text(pair[1], tx + 38, iy + 26, { size: 21 });
  });
  // A green bracket along the whole conversation: today's code is under every line of it.
  const top = 150;
  const bottom = reply.y + reply.h;
  s.line(
    [
      [col + 26, top],
      [col + 36, top],
      [col + 36, bottom],
      [col + 26, bottom],
    ],
    { stroke: "#2f9e44", strokeWidth: 2.2 },
  );
  s.arrow(
    [
      [tx - 6, ty + 165],
      [col + 44, ty + 165],
    ],
    { stroke: "#2f9e44", strokeWidth: 2.2 },
  );
  return s.svg("Un cas de test : ce qui est figé et ce qui tourne sur le code d'aujourd'hui");
}

// (b) The replay and its stale check.
function replayLoop() {
  const s = sketch(1000, 1010, 23);
  s.text("Rejouer un cas", 400, 52, { size: 34, anchor: "middle" });
  const cx = 400;
  const w = 470;

  const node = (y, h, lines, fill, { dashed } = {}) => {
    s.box(cx - w / 2, y, w, h, { fill, dashed });
    s.lines(lines, cx, y + h / 2, { size: 22 });
    return { top: y, bottom: y + h };
  };

  const a = node(90, 64, ["Phrase suivante de l'historique"], COLORS.plain);
  const b = node(196, 86, ["Le code d'aujourd'hui prépare la conversation", "et demande une réponse au modèle"], COLORS.today);
  const c = node(324, 86, ["On lui sert la réponse enregistrée,", "sans appeler le vrai modèle"], COLORS.frozen);
  s.snowflake(cx + w / 2 - 24, 324 + 22);
  s.arrow([[cx, a.bottom + 4], [cx, b.top - 6]]);
  s.arrow([[cx, b.bottom + 4], [cx, c.top - 6]]);

  // Stale check.
  const d1 = { cy: 545, h: 170, w: 480 };
  s.diamond(cx, d1.cy, d1.w, d1.h, { fill: COLORS.ask });
  s.lines(["Autant de réponses", "demandées, avec le même", "mode réflexion ?"], cx, d1.cy, { size: 21 });
  s.arrow([[cx, c.bottom + 4], [cx, d1.cy - d1.h / 2 - 6]]);

  s.box(712, 490, 262, 110, { fill: COLORS.stale });
  s.lines(["PÉRIMÉ", "ni réussi, ni échoué :", "réenregistrer l'historique"], 843, 545, { size: 21 });
  s.arrow([[cx + d1.w / 2 + 4, d1.cy], [706, d1.cy]]);
  s.text("non", cx + d1.w / 2 + 22, d1.cy - 12, { size: 21 });

  // More history?
  const d2 = { cy: 760, h: 140, w: 400 };
  s.diamond(cx, d2.cy, d2.w, d2.h, { fill: COLORS.ask });
  s.lines(["Encore une phrase", "dans l'historique ?"], cx, d2.cy, { size: 21 });
  s.arrow([[cx, d1.cy + d1.h / 2 + 4], [cx, d2.cy - d2.h / 2 - 6]]);
  s.text("oui", cx + 14, d1.cy + d1.h / 2 + 30, { size: 21 });

  // Loop back up.
  s.arrow(
    [
      [cx - d2.w / 2 - 4, d2.cy],
      [60, d2.cy],
      [60, 122],
      [cx - w / 2 - 6, 122],
    ],
    { strokeWidth: 1.8 },
  );
  s.text("oui", cx - d2.w / 2 - 50, d2.cy - 12, { size: 21 });

  // The tested line.
  s.text("non", cx + 14, d2.cy + d2.h / 2 + 30, { size: 21 });
  const g = node(870, 96, ["Phrase testée : le vrai modèle répond", "en direct, N fois, puis le verdict"], COLORS.live);
  s.arrow([[cx, d2.cy + d2.h / 2 + 4], [cx, g.top - 6]]);

  s.text("aucun appel au modèle", 700, 250, { size: 19, color: "#868e96" });
  s.text("jusqu'ici : gratuit", 700, 274, { size: 19, color: "#868e96" });
  s.line([[692, 236], [692, 410]], { stroke: "#adb5bd", strokeWidth: 1.4 });
  return s.svg("Rejouer un cas : la réponse enregistrée est servie au code d'aujourd'hui, avec le contrôle « périmé »");
}

// (c) Four verdicts, not two.
function verdicts() {
  const s = sketch(1000, 800, 41);
  s.text("Quatre verdicts, pas deux", 500, 52, { size: 34, anchor: "middle" });
  const cx = 640;
  const dw = 430;
  const dh = 150;
  const vx = 40;
  const vw = 300;

  const ask = (cy, lines) => {
    s.diamond(cx, cy, dw, dh, { fill: COLORS.ask });
    s.lines(lines, cx, cy, { size: 21 });
  };
  const verdict = (cy, fill, title, sub) => {
    s.box(vx, cy - 48, vw, 96, { fill });
    s.text(title, vx + vw / 2, cy - 6, { size: 25, anchor: "middle" });
    s.lines(sub, vx + vw / 2, cy + 26, { size: 19 });
  };
  const toLeft = (cy, label) => {
    s.arrow([[cx - dw / 2 - 4, cy], [vx + vw + 6, cy]]);
    s.text(label, cx - dw / 2 - 40, cy - 12, { size: 21, anchor: "middle" });
  };
  const down = (from, to, label) => {
    s.arrow([[cx, from + dh / 2 + 4], [cx, to - 6]]);
    s.text(label, cx + 14, from + dh / 2 + 30, { size: 21 });
  };

  ask(170, ["L'historique correspond-il", "encore au code ?"]);
  verdict(170, COLORS.stale, "PÉRIMÉ", ["ne compte pas"]);
  toLeft(170, "non");

  ask(350, ["Le résultat attendu", "est-il obtenu ?"]);
  down(170, 350 - dh / 2, "oui");
  verdict(350, COLORS.fail, "ÉCHOUÉ", ["erreur du modèle"]);
  toLeft(350, "non");

  ask(530, ["Le code a-t-il dû bloquer", "une mauvaise réponse", "en chemin ?"]);
  down(350, 530 - dh / 2, "oui");
  s.box(vx, 530 - 58, vw, 116, { fill: COLORS.ask });
  s.lines(["RÉUSSI GRÂCE AU CODE"], vx + vw / 2, 530 - 22, { size: 23 });
  s.lines(["compte comme une", "erreur du modèle"], vx + vw / 2, 530 + 24, { size: 19 });
  toLeft(530, "oui");

  s.box(cx - 150, 690, 300, 86, { fill: COLORS.today });
  s.text("RÉUSSI", cx, 728, { size: 25, anchor: "middle" });
  s.text("le modèle, tout seul", cx, 758, { size: 19, anchor: "middle" });
  s.arrow([[cx, 530 + dh / 2 + 4], [cx, 684]]);
  s.text("non", cx + 14, 530 + dh / 2 + 30, { size: 21 });
  s.check(cx + 120, 718, 13);
  return s.svg("Quatre verdicts : périmé, échoué, réussi grâce au code, réussi");
}

// Header: a frozen conversation, one live line, a rate instead of a yes/no.
function header() {
  const s = sketch(1020, 510, 59);
  const y0 = 70;
  const rows = [
    ["Bonjour, une commande à emporter", false],
    ["Avec plaisir, que désirez-vous ?", true],
    ["Deux bentos poulet", false],
    ["C'est noté. À quel nom ?", true],
  ];
  rows.forEach(([text, right], i) => {
    const b = bubble(s, text, { x: 40, y: y0 + i * 70, right, fill: COLORS.frozen, size: 21, colRight: 520 });
    s.snowflake(right ? b.x - 20 : b.x + b.w + 20, b.y + 26, 10);
  });
  const t = bubble(s, "Sans gluten, je suis cœliaque.", { x: 40, y: y0 + 4 * 70 + 12, fill: COLORS.live, size: 21 });
  s.text("phrase testée", 40, t.y - 6, { size: 19, color: "#d9480f" });

  s.arrow([[t.x + t.w + 12, t.y + 26], [610, 262]], { strokeWidth: 2 });
  s.box(620, 120, 360, 280, { fill: COLORS.plain });
  s.text("× 10 essais", 800, 170, { size: 30, anchor: "middle" });
  const marks = [1, 1, 1, 0, 1, 1, 1, 1, 1, 1];
  marks.forEach((ok, i) => {
    const mx = 670 + (i % 5) * 65;
    const my = 230 + Math.floor(i / 5) * 62;
    if (ok) s.check(mx, my, 15);
    else s.cross(mx, my, 13);
  });
  s.text("9 / 10", 800, 375, { size: 40, anchor: "middle" });
  return s.svg("Une conversation figée, une phrase testée dix fois");
}

const files = {
  "fige-vs-direct.svg": frozenVsLive(),
  "relecture.svg": replayLoop(),
  "verdicts.svg": verdicts(),
};
for (const [name, svg] of Object.entries(files)) {
  fs.writeFileSync(path.join(out, name), svg);
  console.log(name, `${(svg.length / 1024).toFixed(0)} KB`);
}
await sharp(Buffer.from(header()), { density: 144 })
  .resize(1020, 510)
  .png({ compressionLevel: 9 })
  .toFile(path.join(out, "header.png"));
console.log("header.png");
