/**
 * Character asset manifest.
 *
 * Single source of truth mapping a character + pose to a renderable asset slot.
 * Right now NO approved character artwork exists locally, so every `src` is
 * null and CharacterStage falls back to an empty slot. Approved hang assets are
 * now supplied as transparent PNG cutouts in `public/assets/characters/` and
 * wired below; other poses remain null until their art lands.
 */

export const CHARACTERS = ["peter", "miles"];
export const POSES = ["hang", "crawl", "swing", "perch"];

/**
 * Per-pose layout metadata, shared across characters. `anchor` says which edge
 * the figure is tethered to (drives the web-line origin + descent direction).
 */
export const POSE_META = {
  // hang assets are already rendered upside-down and carry their own web line,
  // so we neither flip them nor draw a second synthetic web line.
  hang: { anchor: "top", align: "flex-start", webline: false, flip: false },
  crawl: { anchor: "left", align: "center", webline: false, flip: false },
  swing: { anchor: "top", align: "center", webline: true, flip: false },
  perch: { anchor: "bottom", align: "flex-end", webline: false, flip: false },
};

/**
 * asset shape: { src, width, height, offsetX, offsetY }
 *   src === null → no approved asset yet (render empty slot / placeholder).
 */
export const characterManifest = {
  peter: {
    hang: {
      src: "/assets/characters/peter-hang.png",
      width: 736, height: 1089, offsetX: 0, offsetY: 0,
    },
    crawl: { src: null, width: 360, height: 300, offsetX: 0, offsetY: 0 },
    swing: { src: null, width: 420, height: 460, offsetX: 0, offsetY: 0 },
    perch: { src: null, width: 320, height: 340, offsetX: 0, offsetY: 0 },
  },
  miles: {
    hang: {
      src: "/assets/characters/miles-hang.png",
      width: 672, height: 1159, offsetX: 0, offsetY: 0,
    },
    crawl: { src: null, width: 360, height: 300, offsetX: 0, offsetY: 0 },
    swing: { src: null, width: 420, height: 460, offsetX: 0, offsetY: 0 },
    perch: { src: null, width: 320, height: 340, offsetX: 0, offsetY: 0 },
  },
};

/** Safe lookup with sensible fallbacks. */
export function getCharacterAsset(character, pose) {
  const c = characterManifest[character] ?? characterManifest.peter;
  return c[pose] ?? c.hang;
}

export function getPoseMeta(pose) {
  return POSE_META[pose] ?? POSE_META.hang;
}
