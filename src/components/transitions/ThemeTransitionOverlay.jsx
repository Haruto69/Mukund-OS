import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useThemeTransition } from "../../motion/ThemeTransitionProvider";
import { useMotionContext } from "../../motion/MotionProvider";

/**
 * Visual layer for the theme-transition / intro state machine.
 *
 * The shutter is now the supplied production artwork:
 *   Peter → peter-shutter.jpg        / peter-mobile-shutter.jpg
 *   Miles → miles-shutter.jpg        / miles-mobile-shutter.jpg
 *
 * Landscape artwork is used on tablet/desktop and portrait artwork on mobile;
 * the orientation is chosen from `shutterVariant`, which the transition
 * provider freezes at the start of the sequence alongside `shutterTheme`.
 *
 * It is rendered as a two-leaf shutter that parts along the artwork's central
 * vertical seam: two half-viewport panels, each a window onto its half of the
 * full image, so the closed state reproduces the artwork exactly and the open
 * state slides the halves off-screen to reveal the (already-swapped) scene.
 *
 * `shutterTheme` (the SOURCE theme, frozen when the transition begins) selects
 * which shutter to paint and never changes mid-transition: the same artwork
 * closes, stays through `covered`, and opens — even though the underlying city
 * + hero spider + theme tokens swap at `covered`.
 *
 * Never blocks interaction: always pointer-events:none, only mounted while a
 * transition runs. Reduced motion shows no moving shutter at all.
 */
/**
 * One shutter leaf: a 50vw window onto ONE shared, viewport-sized image layer
 * (object-fit: cover, centered). The left leaf shows the artwork's left half,
 * the right leaf its right half, so the closed state reproduces the artwork
 * un-stretched with its central seam landing exactly on the split. Sliding a
 * leaf slides its window, not the artwork.
 *
 * Declared at module scope so a phase change never remounts the <img>.
 */
function ShutterLeaf({ side, src }) {
  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{ backgroundColor: "var(--bg-deep)" }}
    >
      <img
        src={src}
        alt=""
        aria-hidden="true"
        className="absolute top-0 h-full w-[100vw] max-w-none object-cover object-center"
        style={side === "left" ? { left: 0 } : { right: 0 }}
      />
    </div>
  );
}

export default function ThemeTransitionOverlay() {
  const { phase, isTransitioning, shutterTheme, shutterVariant } =
    useThemeTransition();
  const { prefersReducedMotion } = useMotionContext();

  if (prefersReducedMotion) return null;

  const covering =
    phase === "closing" || phase === "covered" || phase === "theme-swapping";
  const fullyCovered = phase === "covered" || phase === "theme-swapping";
  const fading = phase === "settling";

  const ease = [0.7, 0, 0.3, 1];
  const panelTransition = { duration: 0.28, ease };
  // Frozen source theme + frozen orientation → exactly one artwork per
  // transition. Portrait artwork on mobile, landscape on tablet/desktop.
  const shutter =
    shutterVariant === "mobile"
      ? `/assets/transitions/${shutterTheme}-mobile-shutter.jpg`
      : `/assets/transitions/${shutterTheme}-shutter.jpg`;

  return (
    <AnimatePresence>
      {isTransitioning && (
        <motion.div
          key="theme-transition-overlay"
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 overflow-hidden"
          style={{ zIndex: "var(--z-overlay)" }}
          initial={{ opacity: 1 }}
          animate={{ opacity: fading ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: fading ? 0.24 : 0.12, ease }}
        >
          {/* Left leaf — shows the left half of the shutter artwork. */}
          <motion.div
            className="absolute inset-y-0 left-0 w-1/2"
            initial={false}
            animate={{ x: covering ? "0%" : "-101%" }}
            transition={panelTransition}
          >
            <ShutterLeaf side="left" src={shutter} />
            <div className="absolute inset-y-0 right-0 w-8"
              style={{ background: "linear-gradient(to right, transparent, rgba(0,0,0,0.5))" }} />
          </motion.div>

          {/* Right leaf — shows the right half of the shutter artwork. */}
          <motion.div
            className="absolute inset-y-0 right-0 w-1/2"
            initial={false}
            animate={{ x: covering ? "0%" : "101%" }}
            transition={panelTransition}
          >
            <ShutterLeaf side="right" src={shutter} />
            <div className="absolute inset-y-0 left-0 w-8"
              style={{ background: "linear-gradient(to left, transparent, rgba(0,0,0,0.5))" }} />
          </motion.div>

          {/* Small supporting effect: a bright seam core pulse while fully
              covered, reinforcing the artwork's central red seam. */}
          <AnimatePresence>
            {fullyCovered && (
              <motion.div
                key="seam-core"
                className="absolute inset-y-0 left-1/2 w-[3px] -translate-x-1/2"
                initial={{ opacity: 0, scaleY: 0.6 }}
                animate={{ opacity: 1, scaleY: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.14, ease }}
                style={{
                  background:
                    "linear-gradient(to bottom, transparent, var(--accent-red) 22%, #fff 50%, var(--accent-red) 78%, transparent)",
                  boxShadow:
                    "0 0 34px 6px color-mix(in srgb, var(--accent-red) 65%, transparent)",
                }}
              />
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
