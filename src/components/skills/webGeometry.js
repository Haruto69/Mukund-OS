/**
 * Procedural spider-web geometry for the Skills constellation.
 *
 * Pure math — no React, no DOM, and deliberately NO skill content. It receives
 * categories (`{ key, label, skills }`) and returns nodes + strands in viewBox
 * coordinates. Skill data lives in `src/data/skills.js`; this module only knows
 * how a web is shaped.
 *
 * The web is built the way an orb weaver builds one:
 *   1. radial spokes out from a core, at jittered (not evenly spaced) angles
 *      and jittered lengths, so the frame is hand-tensioned rather than a pie
 *      chart;
 *   2. irregular concentric rings strung between neighbouring spokes, each
 *      segment sagging inward toward the core;
 *   3. branches fanning past each category node to its individual skills;
 *   4. a few secondary cross-links and anchor guy-lines running off to the
 *      frame edge, which is what stops it reading as a network diagram.
 *
 * All randomness comes from a seeded PRNG, so the same input always produces
 * the exact same web — stable across re-renders, theme switches and reloads.
 */

const DEG = Math.PI / 180;
const SEED = 0x5eed1a;

/** mulberry32 — tiny, fast, deterministic. */
function mulberry32(a) {
  return function next() {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const lerp = (a, b, t) => a + (b - a) * t;
const round = (n) => Math.round(n * 100) / 100;

/**
 * Per-breakpoint composition. Mobile is not a shrunken desktop: it drops to a
 * compact web with fewer rings and no permanent labels, because 23 labels do
 * not fit on a 360px screen and pretending otherwise produces collisions.
 */
const PRESETS = {
  desktop: {
    width: 1300,
    height: 760,
    cx: 650,
    cy: 372,
    yScale: 0.68,
    startAngle: -97,
    angleJitter: 11,
    catRadius: [268, 322],
    skillGap: [62, 104],
    skillStagger: 40,
    fanStep: 14,
    fanMin: 38,
    fanMax: 62,
    ringFractions: [0.42, 0.68, 0.94],
    ringJitter: 0.07,
    sag: 0.15,
    spokeBow: 13,
    branchBow: 8,
    coreR: 40,
    catR: 12,
    skillR: 5.2,
    coreFont: 20,
    coreSubFont: 12,
    catFont: 17,
    skillFont: 14,
    anchors: true,
    labelCategories: "all",
    labelSkills: "active",
    showSkills: "all",
  },
  tablet: {
    width: 800,
    height: 660,
    cx: 398,
    cy: 320,
    yScale: 0.7,
    startAngle: -95,
    angleJitter: 10,
    catRadius: [152, 188],
    skillGap: [44, 74],
    skillStagger: 30,
    fanStep: 13.5,
    fanMin: 40,
    fanMax: 66,
    ringFractions: [0.46, 0.78],
    ringJitter: 0.07,
    sag: 0.15,
    spokeBow: 9,
    branchBow: 6,
    coreR: 28,
    catR: 9,
    skillR: 4.2,
    coreFont: 16,
    coreSubFont: 10,
    catFont: 15.5,
    skillFont: 13,
    anchors: true,
    labelCategories: "all",
    labelSkills: "active",
    showSkills: "all",
  },
  mobile: {
    width: 360,
    height: 400,
    cx: 180,
    cy: 196,
    // Rounder than the wide presets: on a narrow screen a heavily squashed
    // ellipse stops reading as a web at all.
    yScale: 0.88,
    startAngle: -93,
    angleJitter: 9,
    catRadius: [100, 116],
    // The fan is kept tight to its category node so the active cluster
    // obviously belongs to that strand rather than floating on its own.
    skillGap: [24, 36],
    skillStagger: 9,
    fanStep: 15,
    fanMin: 30,
    fanMax: 64,
    // Three rings, like desktop — two was not enough structure to read as a
    // capture spiral once the branches were gone.
    ringFractions: [0.34, 0.6, 0.86],
    ringJitter: 0.06,
    sag: 0.16,
    spokeBow: 6,
    branchBow: 4,
    coreR: 24,
    catR: 8.5,
    skillR: 3.6,
    coreFont: 13,
    coreSubFont: 8.5,
    catFont: 11,
    skillFont: 0,
    anchors: true,
    // Cross-links and guy-lines hang off the CATEGORY nodes here. Anchoring
    // them to skill nodes (as the wide presets do) would leave them dangling
    // in space, because mobile only ever draws the active category's skills.
    outerAnchor: "category",
    // All six categories stay labelled; long names wrap onto a second line
    // rather than being dropped.
    labelCategories: "all",
    labelWrap: 10,
    labelSkills: "none",
    showSkills: "active",
  },
};

export const WEB_VARIANTS = Object.keys(PRESETS);

/* ------------------------------------------------------------------ */
/* path helpers                                                        */
/* ------------------------------------------------------------------ */

/** Quadratic curve bowed perpendicular to A→B. Used for spokes/branches. */
function bowPath(a, b, bow) {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy) || 1;
  return `M${round(a.x)},${round(a.y)} Q${round(mx - (dy / len) * bow)},${round(
    my + (dx / len) * bow,
  )} ${round(b.x)},${round(b.y)}`;
}

/** Quadratic curve sagging toward the core. Used for the capture rings. */
function sagPath(a, b, core, sag) {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  return `M${round(a.x)},${round(a.y)} Q${round(mx + (core.x - mx) * sag)},${round(
    my + (core.y - my) * sag,
  )} ${round(b.x)},${round(b.y)}`;
}

/**
 * Where a ray leaves the viewBox. Anchor strands run out to the frame the way
 * a real web is guyed to a window corner.
 */
function edgePoint(core, angle, p) {
  const c = Math.cos(angle * DEG);
  const s = Math.sin(angle * DEG) * p.yScale;
  const tx = c > 0 ? (p.width - core.x) / c : c < 0 ? -core.x / c : Infinity;
  const ty = s > 0 ? (p.height - core.y) / s : s < 0 ? -core.y / s : Infinity;
  const t = Math.min(tx, ty);
  return { x: core.x + c * t, y: core.y + s * t };
}

/**
 * Places a label just outside a node and keeps it inside the viewBox.
 * Width is estimated from the character count (Space Grotesk averages ~0.55em),
 * which is enough to guarantee nothing is ever clipped at the frame edge.
 */
function wrapLabel(text, maxChars) {
  if (!maxChars || text.length <= maxChars) return [text];
  const words = text.split(/\s+/);
  if (words.length < 2) return [text];
  // Two lines only, split at the word boundary closest to the middle.
  let best = null;
  for (let i = 1; i < words.length; i += 1) {
    const a = words.slice(0, i).join(" ");
    const b = words.slice(i).join(" ");
    const score = Math.max(a.length, b.length);
    if (!best || score < best.score) best = { score, lines: [a, b] };
  }
  return best.lines;
}

function placeLabel(node, text, fontSize, gap, p) {
  const c = Math.cos(node.angle * DEG);
  const s = Math.sin(node.angle * DEG);
  const lines = wrapLabel(text, p.labelWrap);
  const longest = lines.reduce((n, l) => Math.max(n, l.length), 0);
  const est = longest * fontSize * 0.55;
  const lineHeight = fontSize * 1.12;
  const block = (lines.length - 1) * lineHeight;
  let anchor;
  let x;
  let y;

  if (lines.length > 1) {
    // Wrapped labels always sit centred on the radial direction — start/end
    // anchoring a two-line block beside a small node reads as two stray words.
    anchor = "middle";
    x = node.x + c * gap;
    y =
      s > 0
        ? node.y + s * gap + fontSize * 0.85
        : node.y + s * gap - fontSize * 0.2 - block;
  } else if (Math.abs(c) < 0.34) {
    anchor = "middle";
    x = node.x;
    y = s > 0 ? node.y + gap + fontSize * 0.85 : node.y - gap - fontSize * 0.2;
  } else if (c > 0) {
    anchor = "start";
    x = node.x + gap;
    y = node.y + fontSize * 0.34;
  } else {
    anchor = "end";
    x = node.x - gap;
    y = node.y + fontSize * 0.34;
  }

  const pad = 8;
  const min = anchor === "start" ? pad : anchor === "end" ? est + pad : est / 2 + pad;
  const max =
    anchor === "start"
      ? p.width - est - pad
      : anchor === "end"
        ? p.width - pad
        : p.width - est / 2 - pad;

  const fx = Math.min(Math.max(x, min), Math.max(min, max));
  return {
    anchor,
    x: fx,
    y: Math.min(Math.max(y, fontSize + pad), p.height - pad - block),
    w: est,
    fontSize,
    lines,
    lineHeight,
    block,
    // Box edges, kept alongside the anchor so the de-collision pass below can
    // test overlaps without re-deriving them from the anchor every time.
    x0: anchor === "start" ? fx : anchor === "end" ? fx - est : fx - est / 2,
    x1: anchor === "start" ? fx + est : anchor === "end" ? fx : fx + est / 2,
  };
}

const labelTop = (L) => L.y - L.fontSize * 0.95;
/* A wrapped label occupies its extra lines below its first baseline. */
const labelBottom = (L) => L.y + L.fontSize * 0.36 + (L.block ?? 0);
const overlapsX = (a, b) => a.x0 < b.x1 && b.x0 < a.x1;
const overlapsY = (a, b) => labelTop(a) < labelBottom(b) && labelTop(b) < labelBottom(a);

/**
 * Vertical label de-confliction, the way axis labels are spread in charts.
 *
 * Fan geometry alone cannot guarantee separation: `yScale` squashes the web
 * vertically, so two skills several degrees apart can still land within a few
 * pixels of each other, and their labels are far wider than their dots. Rather
 * than hand-tuning radii per breakpoint until it happens to work, this pushes
 * overlapping labels apart along y and lets them sit slightly off their node —
 * a displacement of a few px still reads as belonging to the dot it points at.
 *
 * Deterministic: no randomness, so the same web always resolves the same way.
 */
function spreadLabels(group, fixed, p) {
  if (group.length < 2 && fixed.length === 0) return;
  const items = [...group].sort((a, b) => a.y - b.y);
  const gapFor = (a, b) => (a.fontSize + b.fontSize) * 1.02;

  for (let pass = 0; pass < 3; pass += 1) {
    // Push each label clear of the one above it.
    for (let i = 1; i < items.length; i += 1) {
      const a = items[i - 1];
      const b = items[i];
      if (!overlapsX(a, b)) continue;
      const need = a.y + gapFor(a, b) - b.y;
      if (need > 0) b.y += need;
    }
    // Pull back upward so the fan stays centred instead of drifting down.
    for (let i = items.length - 2; i >= 0; i -= 1) {
      const a = items[i];
      const b = items[i + 1];
      if (!overlapsX(a, b)) continue;
      const need = a.y + gapFor(a, b) - b.y;
      if (need > 0) a.y -= need;
    }
    // Clear the always-visible category labels, which never move. This tests
    // for insufficient CLEARANCE rather than for overlap: two labels 2px apart
    // do not technically collide but still read as one smudge.
    for (const it of items) {
      for (const f of fixed) {
        if (!overlapsX(it, f)) continue;
        const below = it.y >= f.y;
        const clearance = below
          ? labelTop(it) - labelBottom(f)
          : labelTop(f) - labelBottom(it);
        const wanted = it.fontSize * 0.6;
        if (clearance >= wanted) continue;
        it.y += below ? wanted - clearance : clearance - wanted;
      }
    }
  }

  const pad = 8;
  for (const it of items) {
    it.y = round(Math.min(Math.max(it.y, it.fontSize + pad), p.height - pad));
  }
}

/* ------------------------------------------------------------------ */
/* builder                                                             */
/* ------------------------------------------------------------------ */

/**
 * @param {Array<{key:string,label:string,skills:string[]}>} categories
 * @param {"desktop"|"tablet"|"mobile"} variant
 */
export function buildSkillWeb(categories, variant = "desktop") {
  const p = PRESETS[variant] ?? PRESETS.desktop;
  const rand = mulberry32(SEED);
  const core = { x: p.cx, y: p.cy };
  const n = categories.length;

  const at = (angle, r) => ({
    x: round(core.x + Math.cos(angle * DEG) * r),
    y: round(core.y + Math.sin(angle * DEG) * r * p.yScale),
  });

  /* 1 — spokes: jittered angles and lengths, so no two are alike. */
  const cats = categories.map((cat, i) => {
    const angle = p.startAngle + (360 / n) * i + (rand() * 2 - 1) * p.angleJitter;
    const radius = lerp(p.catRadius[0], p.catRadius[1], rand());
    return { ...cat, index: i, angle, radius, ...at(angle, radius) };
  });

  const nodes = [
    { id: "core", kind: "core", index: -1, x: core.x, y: core.y, r: p.coreR },
  ];
  const strands = [];

  cats.forEach((cat) => {
    nodes.push({
      id: `cat-${cat.key}`,
      kind: "category",
      key: cat.key,
      index: cat.index,
      label: cat.label,
      count: cat.skills.length,
      angle: cat.angle,
      x: cat.x,
      y: cat.y,
      r: p.catR,
      label2: null,
    });

    strands.push({
      id: `spoke-${cat.key}`,
      kind: "spoke",
      owners: [cat.index],
      depth: 0,
      d: bowPath(core, cat, (rand() * 2 - 1) * p.spokeBow),
    });
  });

  // Label placement needs the node object, so it runs after the push.
  nodes
    .filter((nd) => nd.kind === "category")
    .forEach((nd) => {
      nd.label2 = placeLabel(nd, nd.label, p.catFont, p.catR + 10, p);
    });

  /* 2 — capture rings: irregular arcs between neighbouring spokes. */
  for (let i = 0; i < n; i += 1) {
    const a = cats[i];
    const b = cats[(i + 1) % n];
    p.ringFractions.forEach((f, ring) => {
      const fa = f + (rand() * 2 - 1) * p.ringJitter;
      const fb = f + (rand() * 2 - 1) * p.ringJitter;
      strands.push({
        id: `ring-${ring}-${i}`,
        kind: "ring",
        owners: [a.index, b.index],
        depth: 1,
        d: sagPath(
          at(a.angle, a.radius * fa),
          at(b.angle, b.radius * fb),
          core,
          p.sag * (0.7 + rand() * 0.6),
        ),
      });
    });
  }

  /* 3 — branches: each category fans out to its own skills. */
  cats.forEach((cat) => {
    const m = cat.skills.length;
    const spread =
      m < 2
        ? 0
        : Math.min(p.fanMax, Math.max(p.fanMin, p.fanStep * (m - 1)));

    cat.skills.forEach((name, j) => {
      const t = m === 1 ? 0 : j / (m - 1) - 0.5;
      const angle = cat.angle + t * spread + (rand() * 2 - 1) * 2.4;
      const radius =
        cat.radius +
        lerp(p.skillGap[0], p.skillGap[1], rand()) +
        // Three radial tiers, not two: alternating parity would put skills j
        // and j+2 back on the same ring, which is exactly where fan labels
        // start colliding.
        (j % 3) * p.skillStagger;
      const pos = at(angle, radius);
      const node = {
        id: `skill-${cat.key}-${j}`,
        kind: "skill",
        key: cat.key,
        index: cat.index,
        label: name,
        angle,
        x: pos.x,
        y: pos.y,
        r: p.skillR,
        label2: null,
      };
      node.label2 = p.skillFont
        ? placeLabel(node, name, p.skillFont, p.skillR + 8, p)
        : null;
      nodes.push(node);

      strands.push({
        id: `branch-${cat.key}-${j}`,
        kind: "branch",
        owners: [cat.index],
        skillId: node.id,
        depth: 2,
        d: bowPath(cat, pos, (rand() * 2 - 1) * p.branchBow),
      });
    });
  });

  /* 3b — de-conflict labels. Only one fan is ever shown at a time, so each
     fan is spread against itself and against the always-visible category
     labels, which stay put. */
  const catLabels = nodes
    .filter((nd) => nd.kind === "category" && nd.label2)
    .map((nd) => nd.label2);

  if (p.skillFont) {
    cats.forEach((cat) => {
      const fan = nodes
        .filter((nd) => nd.kind === "skill" && nd.index === cat.index && nd.label2)
        .map((nd) => nd.label2);
      spreadLabels(fan, p.labelCategories === "all" ? catLabels : [], p);
    });
  } else if (p.labelCategories === "all") {
    // No skill labels to spread (mobile), but six category labels around a
    // small web can still touch — spread them against each other.
    spreadLabels(catLabels, [], p);
  }
  nodes.forEach((nd) => {
    if (nd.label2) nd.label2.y = round(nd.label2.y);
  });

  /* 4 — secondary cross-links between neighbouring fans, plus guy-lines out
         to the frame. These are what make it read as a web under tension
         rather than a tidy radial chart. */
  /* Where the outer web hangs from. The wide presets hang it off the skill
     nodes, which are all on screen there. Mobile only ever draws the ACTIVE
     category's skills, so hanging cross-links and guy-lines off skill nodes
     would leave them running to points that are not painted — the single
     biggest reason the mobile web stopped reading as a web. There they hang
     off the category nodes, which are always drawn. */
  const outerOf = (index) =>
    p.outerAnchor === "category"
      ? nodes.find((nd) => nd.kind === "category" && nd.index === index)
      : nodes.filter((nd) => nd.kind === "skill" && nd.index === index).at(-1);

  for (let i = 0; i < n; i += 2) {
    const a = outerOf(i);
    const b =
      p.outerAnchor === "category"
        ? outerOf((i + 1) % n)
        : nodes.find((nd) => nd.kind === "skill" && nd.index === (i + 1) % n);
    if (!a || !b) continue;
    strands.push({
      id: `cross-${i}`,
      kind: "cross",
      owners: [i, (i + 1) % n],
      depth: 3,
      d: sagPath(a, b, core, p.sag * 1.4),
    });
  }

  if (p.anchors) {
    cats.forEach((cat) => {
      const outer = outerOf(cat.index);
      if (!outer) return;
      strands.push({
        id: `anchor-${cat.key}`,
        kind: "anchor",
        owners: [cat.index],
        depth: 3,
        d: bowPath(outer, edgePoint(core, outer.angle, p), (rand() * 2 - 1) * 9),
      });
    });
  }

  return {
    preset: p,
    viewBox: `0 0 ${p.width} ${p.height}`,
    core: { ...core, r: p.coreR },
    nodes,
    strands,
  };
}
