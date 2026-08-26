/**
 * Deterministic shard generation for GlassField.
 *
 * No `Math.random()` — a small seeded PRNG (mulberry32) produces the same
 * shard layout on every load/rerender, so the field is stable rather than
 * reshuffling every time React re-renders the tree.
 */

// A handful of irregular polygon templates so shards are not all triangles.
// Each is a normalized 0-100 percentage polygon (applied via clip-path).
const POLYGON_TEMPLATES = [
  "polygon(10% 0%, 100% 15%, 85% 100%, 0% 80%)", // irregular quad
  "polygon(20% 0%, 100% 0%, 80% 100%, 0% 70%)", // irregular quad
  "polygon(0% 20%, 60% 0%, 100% 55%, 70% 100%, 10% 90%)", // pentagon
  "polygon(15% 0%, 100% 30%, 90% 100%, 30% 90%, 0% 50%)", // pentagon
  "polygon(0% 0%, 70% 10%, 100% 60%, 55% 100%, 0% 75%, 5% 30%)", // hexagon
  "polygon(30% 0%, 100% 20%, 75% 100%, 0% 65%)", // irregular quad
];

const DEPTH_LEVELS = ["far", "mid", "near"];

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

/** Fixed seed -> identical field across reloads and rerenders. */
const SEED = 20260827;

/**
 * Generate the full desktop-tier shard pool once. Smaller tiers take a
 * stable prefix of this array rather than regenerating, so shards don't
 * visually reshuffle when the viewport crosses a breakpoint.
 *
 * @param {number} count - total shards to generate (desktop max)
 */
export function generateShards(count = 16) {
  const rand = mulberry32(SEED);
  const shards = [];

  for (let i = 0; i < count; i++) {
    // Depth distribution: roughly 40% far / 35% mid / 25% near.
    const depthRoll = rand();
    const depth =
      depthRoll < 0.4 ? "far" : depthRoll < 0.75 ? "mid" : "near";

    const depthScale = depth === "far" ? 0.7 : depth === "mid" ? 1 : 1.3;

    shards.push({
      id: `shard-${i}`,
      x: rand() * 100, // vw %
      y: rand() * 100, // vh %
      width: (28 + rand() * 46) * depthScale, // px
      height: (24 + rand() * 40) * depthScale, // px
      rotation: rand() * 360,
      depth,
      polygon: POLYGON_TEMPLATES[i % POLYGON_TEMPLATES.length],
      driftX: (rand() - 0.5) * (depth === "near" ? 26 : depth === "mid" ? 18 : 10),
      driftY: (rand() - 0.5) * (depth === "near" ? 26 : depth === "mid" ? 18 : 10),
      driftRotation: (rand() - 0.5) * (depth === "near" ? 14 : 8),
      duration: 18 + rand() * 22, // seconds per drift loop
      delay: rand() * -20, // negative delay: loops start pre-offset, not in sync
      baseOpacity:
        depth === "far" ? 0.14 + rand() * 0.08 : depth === "mid" ? 0.18 + rand() * 0.1 : 0.22 + rand() * 0.12,
      blur: depth === "far" ? 6 + rand() * 4 : depth === "mid" ? 3 + rand() * 3 : 1 + rand() * 2,
    });
  }

  return shards;
}

export const SHARD_POOL = generateShards(16);

export const SHARD_COUNTS = {
  mobile: 5,
  tablet: 8,
  desktop: 14,
};

export function shardsForTier(tier) {
  const count = SHARD_COUNTS[tier] ?? SHARD_COUNTS.desktop;
  return SHARD_POOL.slice(0, count);
}
