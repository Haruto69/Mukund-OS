import React from "react";
import { useTheme } from "../theme/ThemeProvider";
import { getCharacterAsset, getPoseMeta } from "./characterManifest";

/**
 * CharacterStage — the reusable slot where a theme-specific Spider-Man asset
 * eventually lives. This pass establishes the ARCHITECTURE only:
 *
 *   <CharacterStage character="peter" pose="hang" />
 *   <CharacterStage character="miles" pose="hang" />
 *
 * - Resolves the asset from characterManifest (all src=null for now).
 * - If an approved asset exists later, it renders it anchored/flipped per pose
 *   with a web-line — Hero and future consumers need no change.
 * - With no asset, it renders either nothing, or (for layout work) an elegant
 *   ABSTRACT placeholder that depicts no character: a web-line descending into
 *   a soft vertical light-form. No temporary/copyrighted character art.
 *
 * `character` defaults to the active theme's protagonist (peter=light,
 * miles=dark), so the Hero can simply mount <CharacterStage pose="hang" /> and
 * get the right figure per theme automatically.
 *
 * Full descend/crawl/swing choreography is intentionally NOT implemented here.
 */
export default function CharacterStage({
  character,
  pose = "hang",
  className = "",
  showPlaceholder = true,
  webline,
}) {
  const { theme } = useTheme();
  const who = character ?? theme; // "peter" | "miles"
  const asset = getCharacterAsset(who, pose);
  const meta = getPoseMeta(pose);
  const showWebline = webline ?? meta.webline;

  return (
    <div
      aria-hidden="true"
      data-character={who}
      data-pose={pose}
      className={`pointer-events-none relative flex h-full w-full justify-center ${className}`}
      style={{ alignItems: meta.align }}
    >
      {/* Web-line anchor: a thin line descending from the top edge, so a later
          asset can appear to hang/swing from the navbar/top of the Hero. */}
      {showWebline && (
        <span
          className="absolute top-0 h-[38%] w-px"
          style={{
            background:
              "linear-gradient(to bottom, color-mix(in srgb, var(--text) 45%, transparent), transparent)",
          }}
        />
      )}

      {asset.src ? (
        // Real approved asset (future). Flipped for the upside-down hang.
        <img
          src={asset.src}
          alt=""
          width={asset.width}
          height={asset.height}
          className="max-h-full w-auto object-contain"
          style={{
            transform: `translate(${asset.offsetX}px, ${asset.offsetY}px)${
              meta.flip ? " scaleY(-1)" : ""
            }`,
          }}
        />
      ) : showPlaceholder ? (
        // Abstract, character-agnostic placeholder for layout only.
        <div
          className="relative mt-[34%] w-[42%] max-w-[220px]"
          style={{ aspectRatio: "3 / 5" }}
        >
          <div
            className="absolute inset-0 rounded-[45%_45%_50%_50%/60%_60%_40%_40%]"
            style={{
              background:
                "radial-gradient(70% 60% at 50% 30%, color-mix(in srgb, var(--accent-red) 34%, transparent), transparent 72%), radial-gradient(60% 60% at 50% 80%, color-mix(in srgb, var(--accent-blue) 26%, transparent), transparent 75%)",
              filter: "blur(6px)",
              opacity: 0.55,
            }}
          />
          <div
            className="absolute inset-x-0 top-[8%] mx-auto h-[70%] w-[2px]"
            style={{
              background:
                "linear-gradient(to bottom, color-mix(in srgb, var(--text) 30%, transparent), transparent)",
            }}
          />
        </div>
      ) : null}
    </div>
  );
}
