import React, { useMemo } from "react";
import { useMotionContext } from "../../motion/MotionProvider";
import GlassShard from "./GlassShard";
import { shardsForTier } from "./shardConfig";

/**
 * Global ambient "floating broken glass" background layer.
 *
 * Sits above the base background, behind all readable content, the Navbar,
 * and any future Spider-Man imagery — purely decorative and never
 * intercepts pointer events. Shard positions are generated once (see
 * shardConfig.js) and stay stable across re-renders and theme switches;
 * only the CSS variables the shards read from change with the theme.
 */
export default function GlassField() {
  const { tier, prefersReducedMotion, hasCoarsePointer, pointer } = useMotionContext();

  const shards = useMemo(() => shardsForTier(tier), [tier]);

  // Proximity interaction is a desktop-with-a-real-pointer feature only.
  const enableProximity = !prefersReducedMotion && !hasCoarsePointer && tier === "desktop";

  // Reduced motion: keep a handful of static shards for visual coherence
  // rather than an empty/jarring background, but drop all motion.
  if (prefersReducedMotion) {
    return (
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 overflow-hidden"
        style={{ zIndex: "var(--z-glass)" }}
      >
        {shards.slice(0, 6).map((shard) => (
          <GlassShard
            key={shard.id}
            config={shard}
            pointer={pointer}
            enableProximity={false}
            prefersReducedMotion
          />
        ))}
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 overflow-hidden"
      style={{ zIndex: "var(--z-glass)" }}
    >
      {shards.map((shard) => (
        <GlassShard
          key={shard.id}
          config={shard}
          pointer={pointer}
          enableProximity={enableProximity}
          prefersReducedMotion={false}
        />
      ))}
    </div>
  );
}
