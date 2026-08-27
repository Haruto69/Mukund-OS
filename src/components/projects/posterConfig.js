/**
 * Poster slot configuration for the featured project carousel.
 *
 * Custom cinematic poster artwork is a LATER asset pass. Until then each
 * featured project renders a generated, theme-token-derived poster treatment
 * (see ProjectPoster.jsx).
 *
 * To ship a real poster later, set `image` to its path — e.g.
 *
 *   "nbuc-pipeline": { image: "/assets/projects/featured/nbuc.webp", ... }
 *
 * A single path swap is all that is required; ProjectPoster renders the image
 * instead of the generated treatment with no other change.
 */

/** Accent pairs are token references only — never literal hex. */
const ACCENT_CYCLE = [
  { from: "var(--accent-red)", to: "var(--accent-blue)" },
  { from: "var(--accent-blue)", to: "var(--accent-warm)" },
  { from: "var(--accent-warm)", to: "var(--accent-red)" },
];

/** Per-project overrides. `image: null` = generated placeholder treatment. */
export const projectPosters = {
  "nbuc-pipeline": { image: null, alt: "" },
  disharakshak: { image: null, alt: "" },
  "self-care": { image: null, alt: "" },
};

/** Initials are derived from the real title — nothing is invented here. */
function initialsFromTitle(title = "") {
  const words = title
    .replace(/[^A-Za-z0-9\s-]/g, " ")
    .split(/[\s-]+/)
    .filter(Boolean);
  if (words.length === 0) return "";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

/**
 * Resolve the poster descriptor for a project.
 * @param {object} project - entry from src/data/projects.js
 * @param {number} index - position within the featured set
 */
export function getPoster(project, index = 0) {
  const override = projectPosters[project.id] ?? {};
  const accents = ACCENT_CYCLE[index % ACCENT_CYCLE.length];
  return {
    image: override.image ?? null,
    // Decorative-only while the poster is generated; a real asset supplies
    // meaningful alt text via `projectPosters[id].alt`.
    alt: override.alt ?? "",
    initials: override.initials ?? initialsFromTitle(project.title),
    ...accents,
  };
}
