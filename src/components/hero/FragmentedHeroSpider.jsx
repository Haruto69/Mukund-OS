import React, { useMemo } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useTheme } from "../theme/ThemeProvider";
import { useMotionContext } from "../../motion/MotionProvider";

/**
 * FragmentedHeroSpider — the Hero's signature visual.
 *
 * The theme's mechanical spider starts as a field of scattered metallic
 * shards and reconstructs itself under scroll control. The owning Hero
 * supplies a 0..1 `progress` MotionValue (from its pinned scroll track), so
 * this component never listens to scroll itself and never re-renders per
 * frame.
 *
 * How it works (no canvas, no WebGL, no new dependencies):
 *
 *  - One <img> of the full artwork is rendered per fragment, each inside a
 *    wrapper clipped to its own `clip-path` polygon. Every wrapper is
 *    `absolute inset-0` over a container whose aspect ratio matches the source
 *    image, so at rest (all transforms zeroed) the fragments reconstruct the
 *    source artwork pixel-for-pixel — that is the "final reconstruction
 *    method": identity transforms over a partition of the same image.
 *
 *  - The partition is NOT a grid. `partition()` starts from the full square
 *    and repeatedly slices one existing piece with a straight line at an
 *    arbitrary angle through an off-centre point (Sutherland–Hodgman
 *    half-plane clipping). Because the two children of a cut are clipped
 *    against the exact same line, they share exact vertices — the pieces tile
 *    the square with no gaps and no overlaps — while ending up wildly
 *    different in area, aspect and orientation: long thin leg shards, one big
 *    asymmetric abdomen slab, several tiny splinters.
 *
 *  - Scatter is deterministic (a seeded LCG evaluated once at module scope,
 *    memoized per tier) — never `Math.random()` during render — and is RADIAL:
 *    each shard is thrown OUTWARD along the unit vector from the image centre
 *    to its own centroid, like glass blown out from a central impact. A small
 *    bounded angular deviation (5°..15°) keeps it from looking mechanical but
 *    never enough to push a shard out of its own sector, so no piece travels
 *    through the spider centre. Distance is seeded per fragment over a wide
 *    range, so shards never sit on one circular radius.
 *
 *  - At progress 0 the field is deliberately near-invisible: heavily dimmed,
 *    desaturated and blurred so it reads as faint debris inside the city
 *    plate. Colour, contrast and sharpness return progressively as it
 *    converges, and are fully normal at 1.
 *
 *  - Assembly is staggered by an authored key: small peripheral splinters
 *    drift in first, leg structures next, and the large central body pieces
 *    lock in last, so the spider only becomes identifiable in the second half.
 *
 * Reduced motion: renders the plain, fully assembled artwork immediately.
 */

const SPIDERS = {
  peter: "/assets/hero/peter-hero-spider.png",
  miles: "/assets/hero/miles-hero-spider.png",
};

// Intrinsic size of both supplied cutouts (square, alpha-preserved).
const ART = { width: 1254, height: 1254 };

/**
 * Per-tier fragment tuning.
 *
 * `scatter` is expressed in % of the container box, not pixels, so it scales
 * with the stage. Desktop stage ≈ 620px wide → 20%..105% ≈ 124px..650px.
 * Mobile is tuned independently (not a shrunken desktop): a tighter range so
 * shards stay near the viewport and can never cause horizontal overflow.
 * `spread` is the bounded angular deviation (degrees) added to the radial
 * direction — small enough that every shard stays inside its own sector.
 */
const TIERS = {
  desktop: {
    count: 22,
    seed: 90210,
    scatter: [20, 105],
    rotate: 34,
    lift: 0.9,
    spread: [5, 15],
  },
  mobile: {
    count: 13,
    seed: 4471,
    scatter: [14, 56],
    rotate: 26,
    lift: 1.05,
    spread: [5, 14],
  },
};

/** Small deterministic PRNG so the shard layout is stable across renders. */
function makeRandom(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

/** Signed shoelace area of a polygon. */
function area(poly) {
  let a = 0;
  for (let i = 0; i < poly.length; i += 1) {
    const p = poly[i];
    const q = poly[(i + 1) % poly.length];
    a += p.x * q.y - q.x * p.y;
  }
  return Math.abs(a) / 2;
}

/** Below this radius (in % units) a centroid has no usable radial vector. */
const CENTRAL_EPSILON = 4;

function centroid(poly) {
  const cx = poly.reduce((s, p) => s + p.x, 0) / poly.length;
  const cy = poly.reduce((s, p) => s + p.y, 0) / poly.length;
  return { x: cx, y: cy };
}

/**
 * Clip `poly` against the half-plane `nx*x + ny*y <= c` (or `>=` when `keepLE`
 * is false). Sutherland–Hodgman. Both halves of a cut compute their crossing
 * points from the identical line equation, so the two children share exact
 * vertices and the partition stays gap-free.
 */
function clipHalf(poly, nx, ny, c, keepLE) {
  const sign = keepLE ? 1 : -1;
  const f = (p) => sign * (nx * p.x + ny * p.y - c);
  const out = [];
  for (let i = 0; i < poly.length; i += 1) {
    const a = poly[i];
    const b = poly[(i + 1) % poly.length];
    const fa = f(a);
    const fb = f(b);
    if (fa <= 0) out.push(a);
    if ((fa < 0 && fb > 0) || (fa > 0 && fb < 0)) {
      const t = fa / (fa - fb);
      out.push({ x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t });
    }
  }
  return out;
}

/**
 * Slice the unit square (expressed 0..100) into `count` irregular convex
 * pieces of deliberately uneven size.
 */
function partition(count, rand) {
  let pieces = [
    [
      { x: 0, y: 0 },
      { x: 100, y: 0 },
      { x: 100, y: 100 },
      { x: 0, y: 100 },
    ],
  ];

  while (pieces.length < count) {
    // Bias toward larger pieces, but not strictly largest-first — that is what
    // keeps a few splinters tiny while one abdomen slab stays huge.
    const scored = pieces
      .map((p, i) => ({ i, w: area(p) * (0.45 + rand() * 0.9) }))
      .sort((a, b) => b.w - a.w);
    const targetIndex = scored[0].i;
    const target = pieces[targetIndex];
    const bounds = target.reduce(
      (acc, p) => ({
        minX: Math.min(acc.minX, p.x),
        maxX: Math.max(acc.maxX, p.x),
        minY: Math.min(acc.minY, p.y),
        maxY: Math.max(acc.maxY, p.y),
      }),
      { minX: 100, maxX: 0, minY: 100, maxY: 0 }
    );
    const c0 = centroid(target);
    const targetArea = area(target);

    let a = null;
    let b = null;
    for (let attempt = 0; attempt < 12 && !a; attempt += 1) {
      const angle = rand() * Math.PI;
      const nx = Math.cos(angle);
      const ny = Math.sin(angle);
      // Push the cut off-centre so halves are unequal — this is the main
      // source of area variation between shards.
      const ox = (rand() - 0.5) * (bounds.maxX - bounds.minX) * 0.55;
      const oy = (rand() - 0.5) * (bounds.maxY - bounds.minY) * 0.55;
      const c = nx * (c0.x + ox) + ny * (c0.y + oy);
      const left = clipHalf(target, nx, ny, c, true);
      const right = clipHalf(target, nx, ny, c, false);
      const la = left.length >= 3 ? area(left) : 0;
      const ra = right.length >= 3 ? area(right) : 0;
      // Reject degenerate slivers; anything above ~9% of the parent is fine.
      if (la > targetArea * 0.09 && ra > targetArea * 0.09) {
        a = left;
        b = right;
      }
    }

    if (!a) {
      // Fallback: a clean cut through the centroid, guaranteed to split.
      a = clipHalf(target, 1, 0, c0.x, true);
      b = clipHalf(target, 1, 0, c0.x, false);
    }

    pieces = pieces.filter((_, i) => i !== targetIndex).concat([a, b]);
  }

  return pieces;
}

/**
 * Build the full fragment configuration: clip polygon + per-fragment broken
 * state + its own stagger window.
 */
function buildFragments(tier) {
  const { count, seed, scatter, rotate, lift, spread } = tier;
  const rand = makeRandom(seed);
  const pieces = partition(count, rand);

  const areas = pieces.map(area);
  const maxArea = Math.max(...areas);

  const fragments = pieces.map((poly, i) => {
    const c = centroid(poly);

    // Grow each polygon ~0.6% about its own centroid so neighbouring shards
    // overlap by a sub-pixel sliver: no hairline seams once assembled.
    const clipPath = `polygon(${poly
      .map(
        (p) =>
          `${(c.x + (p.x - c.x) * 1.006).toFixed(3)}% ${(
            c.y +
            (p.y - c.y) * 1.006
          ).toFixed(3)}%`
      )
      .join(", ")})`;

    // Radial outward scatter: the shard travels along the vector from the
    // image centre to its own centroid, so a top-left piece begins farther
    // top-left and no shard ever passes through the spider's centre.
    const dx = c.x - 50;
    const dy = c.y - 50;
    const radius = Math.hypot(dx, dy);

    // Fragments sitting almost exactly on the centre have no meaningful
    // radial vector. Give each a deterministic sector, walked around the
    // circle by the golden angle so they fan out instead of clumping.
    const baseAngle =
      radius < CENTRAL_EPSILON
        ? (i * 2.399963 + seed * 0.0007) % (Math.PI * 2)
        : Math.atan2(dy, dx);

    // Bounded tangential deviation — breaks the perfect star, never enough to
    // leave the shard's own outward sector.
    const deviation =
      ((spread[0] + rand() * (spread[1] - spread[0])) * Math.PI) / 180;
    const angle = baseAngle + (rand() < 0.5 ? -deviation : deviation);

    const t = rand();
    // Cubic bias → most shards land mid-range, a few are thrown very far.
    const distance = scatter[0] + (scatter[1] - scatter[0]) * (t * t * t * 0.65 + t * 0.35);

    const norm = areas[i] / maxArea; // 1 = the biggest body slab
    const central = 1 - Math.min(1, radius / 60);

    return {
      clipPath,
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance * lift,
      // Restrained, signed rotation — shards rotate *into* alignment.
      rotate: (rand() - 0.5) * 2 * rotate,
      scale: 0.8 + rand() * 0.4,
      // Very low at rest — multiplied by the field-wide dimming below this
      // lands near 0.05..0.09: barely-there specks in the city plate.
      opacity: 0.16 + rand() * 0.1,
      // Assembly order key: small peripheral splinters lowest, large central
      // body slabs highest → the body lands last and reveals the spider.
      order: norm * 0.62 + central * 0.38,
    };
  });

  // Stagger windows. Everything is closed by 0.92, leaving a completion hold
  // where the finished spider simply sits there fully assembled.
  const ordered = [...fragments].sort((a, b) => a.order - b.order);
  const last = Math.max(1, ordered.length - 1);
  ordered.forEach((f, i) => {
    const k = i / last;
    f.start = k * 0.5;
    f.end = f.start + 0.42;
  });

  return ordered;
}

/** One clipped shard. Its own MotionValues, so nothing re-renders on scroll. */
function Fragment({ fragment, progress, src }) {
  const { start, end } = fragment;
  const x = useTransform(progress, [start, end], [`${fragment.x}%`, "0%"]);
  const y = useTransform(progress, [start, end], [`${fragment.y}%`, "0%"]);
  const rotate = useTransform(progress, [start, end], [fragment.rotate, 0]);
  const scale = useTransform(progress, [start, end], [fragment.scale, 1]);
  // Held down for most of the window, then brought up late: a shard stays
  // faint while it is travelling and only resolves as it locks into place.
  const opacity = useTransform(
    progress,
    [start, start + (end - start) * 0.45, start + (end - start) * 0.85],
    [fragment.opacity, fragment.opacity + 0.22, 1]
  );

  return (
    <motion.div
      className="absolute inset-0 will-change-transform"
      style={{ clipPath: fragment.clipPath, x, y, rotate, scale, opacity }}
    >
      <img
        src={src}
        alt=""
        aria-hidden="true"
        width={ART.width}
        height={ART.height}
        draggable={false}
        className="h-full w-full select-none object-contain"
      />
    </motion.div>
  );
}

/**
 * @param {object}  props
 * @param {import('framer-motion').MotionValue<number>} [props.progress]
 *        0 = fully shattered, 1 = fully reconstructed. Supplied by the Hero's
 *        pinned scroll track.
 */
export default function FragmentedHeroSpider({ progress, className = "" }) {
  const { theme } = useTheme();
  const { prefersReducedMotion, isMobile } = useMotionContext();
  const src = SPIDERS[theme] ?? SPIDERS.peter;

  // Assembled fallback for callers that pass no progress (reduced motion).
  const assembled = useMotionValue(1);
  const p = progress ?? assembled;

  const fragments = useMemo(
    () => buildFragments(isMobile ? TIERS.mobile : TIERS.desktop),
    [isMobile]
  );

  // Final settle: a whisper of scale + a glow that stabilises as it completes.
  const settleScale = useTransform(p, [0.7, 0.92], [1.015, 1]);
  const glowOpacity = useTransform(p, [0.55, 0.92], [0, 1]);

  // Field-wide reveal. At progress 0 the shards are dim, desaturated and
  // softly blurred — environmental debris rather than a glowing spider. The
  // treatment lifts smoothly so the silhouette only becomes readable past the
  // midpoint, and is fully neutral (no filter, no dimming) by completion.
  const fieldOpacity = useTransform(p, [0, 0.35, 0.7, 0.95], [0.34, 0.5, 0.82, 1]);
  const fieldBlur = useTransform(p, [0, 0.4, 0.8, 0.95], [3.2, 2.2, 0.5, 0]);
  const fieldSaturate = useTransform(p, [0.15, 0.55, 0.9], [0.22, 0.55, 1]);
  const fieldBrightness = useTransform(p, [0.15, 0.6, 0.9], [0.52, 0.78, 1]);
  const fieldContrast = useTransform(p, [0.2, 0.7, 0.95], [0.78, 0.9, 1]);
  const fieldFilter = useMotionTemplate`blur(${fieldBlur}px) saturate(${fieldSaturate}) brightness(${fieldBrightness}) contrast(${fieldContrast})`;

  if (prefersReducedMotion) {
    return (
      <div
        className={`relative w-full ${className}`}
        style={{ aspectRatio: `${ART.width} / ${ART.height}` }}
      >
        <img
          src={src}
          alt=""
          aria-hidden="true"
          width={ART.width}
          height={ART.height}
          className="h-full w-full object-contain"
        />
      </div>
    );
  }

  return (
    <motion.div
      aria-hidden="true"
      data-theme-spider={theme}
      className={`pointer-events-none relative w-full ${className}`}
      style={{
        aspectRatio: `${ART.width} / ${ART.height}`,
        scale: settleScale,
      }}
    >
      {/* Stabilising glow pool behind the assembled spider. */}
      <motion.div
        className="pointer-events-none absolute inset-[8%] rounded-full"
        style={{
          opacity: glowOpacity,
          background:
            "radial-gradient(50% 50% at 50% 50%, color-mix(in srgb, var(--accent-red) 26%, transparent), transparent 70%)",
          filter: "blur(28px)",
        }}
        animate={{ scale: [1, 1.03, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute inset-0"
        style={{ opacity: fieldOpacity, filter: fieldFilter }}
      >
        {fragments.map((fragment, i) => (
          <Fragment
            key={`${theme}-${isMobile ? "m" : "d"}-${i}`}
            fragment={fragment}
            progress={p}
            src={src}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}
