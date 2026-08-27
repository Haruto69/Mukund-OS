/**
 * Deterministic skyline geometry for CityScene.
 *
 * Produces a single SVG path string (one DOM node per depth layer) describing a
 * row of buildings across the full viewBox width. Seeded (mulberry32) so the
 * skyline is identical on every load and never reshuffles on re-render or theme
 * switch — only the fill colors (CSS vars) change with the theme.
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

/**
 * @param {object} opts
 * @param {number} opts.seed      - PRNG seed (stable skyline per layer)
 * @param {number} opts.width     - viewBox width
 * @param {number} opts.height    - viewBox height (baseline = bottom)
 * @param {number} opts.minH      - min building height fraction (0..1 of height)
 * @param {number} opts.maxH      - max building height fraction
 * @param {number} opts.minW      - min building width (px)
 * @param {number} opts.maxW      - max building width (px)
 * @param {boolean} opts.setbacks - add occasional stepped rooftops/antennae
 * @returns {string} SVG path data
 */
export function buildSkylinePath({
  seed = 1,
  width = 1200,
  height = 400,
  minH = 0.28,
  maxH = 0.82,
  minW = 70,
  maxW = 150,
  setbacks = true,
}) {
  const rand = mulberry32(seed);
  let x = -20; // start just off-canvas so edges never show a gap
  const parts = [`M ${x} ${height}`];

  while (x < width + 20) {
    const w = minW + rand() * (maxW - minW);
    const h = height * (minH + rand() * (maxH - minH));
    const topY = height - h;

    // Rise up the left edge of the building.
    parts.push(`L ${x.toFixed(1)} ${topY.toFixed(1)}`);

    if (setbacks && rand() > 0.62) {
      // Stepped rooftop: a narrow setback block or an antenna spike.
      if (rand() > 0.5) {
        const inset = w * (0.12 + rand() * 0.18);
        const stepH = h * (0.1 + rand() * 0.16);
        parts.push(`L ${(x + inset).toFixed(1)} ${topY.toFixed(1)}`);
        parts.push(`L ${(x + inset).toFixed(1)} ${(topY - stepH).toFixed(1)}`);
        parts.push(
          `L ${(x + w - inset).toFixed(1)} ${(topY - stepH).toFixed(1)}`
        );
        parts.push(`L ${(x + w - inset).toFixed(1)} ${topY.toFixed(1)}`);
      } else {
        const ax = x + w * (0.4 + rand() * 0.2);
        const spike = h * (0.12 + rand() * 0.14);
        parts.push(`L ${ax.toFixed(1)} ${topY.toFixed(1)}`);
        parts.push(`L ${ax.toFixed(1)} ${(topY - spike).toFixed(1)}`);
        parts.push(`L ${(ax + 3).toFixed(1)} ${(topY - spike).toFixed(1)}`);
        parts.push(`L ${(ax + 3).toFixed(1)} ${topY.toFixed(1)}`);
      }
    }

    // Across the flat roof and back down to the baseline.
    parts.push(`L ${(x + w).toFixed(1)} ${topY.toFixed(1)}`);
    parts.push(`L ${(x + w).toFixed(1)} ${height}`);

    x += w + rand() * 8; // small gap between building bases
  }

  parts.push(`L ${width + 20} ${height} Z`);
  return parts.join(" ");
}
