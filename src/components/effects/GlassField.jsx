import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { useMotionContext } from "../../motion/MotionProvider";
import { useThemeTransition } from "../../motion/ThemeTransitionProvider";
import GlassShard from "./GlassShard";
import { shardsForTier } from "./shardConfig";

/**
 * Global ambient "floating broken glass" background layer.
 *
 * Sits above the city scene and below all readable content, the Navbar, and
 * any future Spider-Man imagery — purely decorative, never intercepts pointer
 * events. Shard positions are generated once (see shardConfig.js) and stay
 * stable across re-renders and theme switches; only the CSS variables the
 * shards read from change with the theme.
 *
 * Transition API (Pass 3 = hooks only): GlassField reads `glassPhase` from the
 * ThemeTransitionProvider and maps it to a restrained FIELD-LEVEL cue —
 *
 *   ambient  → resting drift (unchanged Pass 2 behavior)
 *   gather   → field contracts + dims slightly (shards "converging")
 *   shatter  → field expands briefly (burst)
 *   settle   → field returns to ambient
 *
 * The full per-shard convergence → shutter-pull → explosion → settle
 * choreography is intentionally NOT implemented yet; the `phase` prop is
 * threaded down to each shard now so that later work can drive individual
 * shards without changing GlassField's shape.
 */

// Field-level cue per phase — deliberately subtle (small architecture proof).
const FIELD_CUE = {
  ambient: { scale: 1, opacity: 1 },
  gather: { scale: 0.96, opacity: 0.82 },
  shatter: { scale: 1.05, opacity: 1 },
  settle: { scale: 1, opacity: 1 },
};

export default function GlassField() {
  const { tier, prefersReducedMotion, hasCoarsePointer, pointer } =
    useMotionContext();
  const { glassPhase } = useThemeTransition();

  const shards = useMemo(() => shardsForTier(tier), [tier]);

  // Proximity interaction is a desktop-with-a-real-pointer feature only.
  const enableProximity =
    !prefersReducedMotion && !hasCoarsePointer && tier === "desktop";

  // Reduced motion: keep a handful of static shards for visual coherence
  // rather than an empty/jarring background, but drop all motion. Transition
  // cues are also suppressed here (the swap is instant under reduced motion).
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
            phase="ambient"
          />
        ))}
      </div>
    );
  }

  const cue = FIELD_CUE[glassPhase] ?? FIELD_CUE.ambient;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 overflow-hidden"
      style={{ zIndex: "var(--z-glass)", transformOrigin: "50% 50%" }}
      animate={{ scale: cue.scale, opacity: cue.opacity }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {shards.map((shard) => (
        <GlassShard
          key={shard.id}
          config={shard}
          pointer={pointer}
          enableProximity={enableProximity}
          prefersReducedMotion={false}
          phase={glassPhase}
        />
      ))}
    </motion.div>
  );
}
