import React, { useMemo } from "react";

/**
 * Sparse decorative "digital fragments" + faint web-line geometry, as a single
 * lightweight SVG layer. Static by design (no continuous animation) so it stays
 * restrained and cheap; the animated glitch language lives in MVGlitch bursts.
 *
 * Seeded so the fragment scatter is stable across renders. Colors are the
 * theme red / cyan identity at low opacity.
 *
 * @param {number} [count]   - number of fragments (kept small)
 * @param {number} [seed]    - PRNG seed for placement
 * @param {string} [className]
 */
function mulberry32(seed) {
  let a = seed;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export default function GlitchFragments({
  count = 10,
  seed = 77,
  className = "",
}) {
  const { frags, lines } = useMemo(() => {
    const rand = mulberry32(seed);
    const frags = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: rand() * 100,
      y: rand() * 100,
      w: 4 + rand() * 18,
      h: 2 + rand() * 4,
      cyan: rand() > 0.5,
      opacity: 0.12 + rand() * 0.22,
    }));
    const lines = Array.from({ length: 3 }, () => ({
      x1: rand() * 100,
      y1: rand() * 100,
      x2: rand() * 100,
      y2: rand() * 100,
    }));
    return { frags, lines };
  }, [count, seed]);

  return (
    <svg
      aria-hidden="true"
      className={`pointer-events-none ${className || "absolute inset-0 h-full w-full"}`}
      preserveAspectRatio="none"
      viewBox="0 0 100 100"
    >
      <g stroke="var(--accent-blue)" strokeWidth="0.15" opacity="0.18">
        {lines.map((l, i) => (
          <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} />
        ))}
      </g>
      {frags.map((f) => (
        <rect
          key={f.id}
          x={f.x}
          y={f.y}
          width={f.w}
          height={f.h}
          fill={f.cyan ? "#22d3ee" : "var(--accent-red)"}
          opacity={f.opacity}
        />
      ))}
    </svg>
  );
}
