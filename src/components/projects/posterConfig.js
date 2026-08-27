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

/**
 * Per-project overrides, keyed to the currently featured project IDs.
 *
 * `image` is a production poster served from /public. When present, the real
 * poster renders; when null, ProjectPoster falls back to the generated
 * treatment (still used for any non-featured project).
 *
 * `alt` is intentionally empty: the poster is a supporting visual and the
 * project title/type already exist as real DOM text in the card footer, so
 * duplicating them for screen readers would be noise (decorative image).
 *
 * `objectPosition` tunes the cover-crop focal point per poster (CSS
 * object-position). Center preserves each poster's central core/focus while
 * cropping symmetrically — correct for the wide desktop card and the tall
 * mobile card alike.
 *
 * `label` / `tagline` are passive semantic hints reserved for the future
 * poster art variations + case study — they are NOT rendered on the collapsed
 * carousel card, which stays minimal by design.
 */
export const projectPosters = {
  "nbuc-pipeline": {
    image: "/assets/projects/featured/nokia-poster.png",
    alt: "",
    objectPosition: "center",
  },
  vulnverify: {
    image: "/assets/projects/featured/vulnverify-poster.png",
    alt: "",
    objectPosition: "center",
    label: "VERIFY THE SIGNAL",
    tagline: "ZAP + BURP → VERIFY → PRIORITIZE",
  },
  "self-care": {
    image: "/assets/projects/featured/self-care-poster.png",
    alt: "",
    objectPosition: "center",
  },
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
    // Decorative by design: the card footer carries the title/type as real
    // DOM text, so the poster image uses empty alt.
    alt: override.alt ?? "",
    objectPosition: override.objectPosition ?? "center",
    initials: override.initials ?? initialsFromTitle(project.title),
    ...accents,
  };
}
