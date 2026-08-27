import React from "react";
import { motion, useTransform } from "framer-motion";
import { useMotionContext } from "../../motion/MotionProvider";
import { useTheme } from "../theme/ThemeProvider";

/**
 * Global city background — now driven by the supplied production photography.
 *
 *   Peter / light → peter-city.jpg (golden-hour Manhattan rooftops)
 *   Miles / dark  → miles-city.jpg (rainy neon night rooftops)
 *
 * The real photo is the dominant, full-bleed background. The former procedural
 * SVG skyline is retained only as a thin foreground rooftop silhouette for
 * parallax depth, and as a graceful fallback tint (the token sky gradient sits
 * behind the image so a failed/late image never shows a blank void).
 *
 * Readability scrims (side + bottom + vignette) keep the Hero headline legible
 * over busy imagery. Atmospheric haze and a faint comic halftone are preserved.
 * Parallax runs on the compositor and is disabled on touch / reduced-motion.
 */
export default function CityScene() {
  const { pointer, prefersReducedMotion, hasCoarsePointer, tier } =
    useMotionContext();
  const { theme } = useTheme();
  const isMiles = theme === "miles";
  const isMobile = tier === "mobile";

  const enableParallax =
    !prefersReducedMotion && !hasCoarsePointer && tier !== "mobile";

  // Gentle counter-parallax: the photo drifts a touch less than the foreground.
  const cityX = useTransform(pointer.x, [-1, 1], [-10, 10]);
  const cityY = useTransform(pointer.y, [-1, 1], [-6, 6]);
  const foreX = useTransform(pointer.x, [-1, 1], [-26, 26]);
  const foreY = useTransform(pointer.y, [-1, 1], [-12, 12]);
  const p = (x, y) => (enableParallax ? { x, y } : {});

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 overflow-hidden"
      style={{ zIndex: "var(--z-city)" }}
    >
      {/* Fallback sky tint (token gradient) — visible only if the photo is
          slow/failed to load, so there is never a blank void. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, var(--city-sky-high) 0%, var(--city-sky) 60%, var(--city-glow) 100%)",
        }}
      />

      {/* Dominant production city photo, full-bleed cover. */}
      <motion.img
        src={`/assets/backgrounds/${isMiles ? "miles" : "peter"}-city.jpg`}
        alt=""
        draggable="false"
        className="absolute inset-0 h-full w-full select-none object-cover"
        style={{
          ...(enableParallax ? { scale: 1.06, x: cityX, y: cityY } : {}),
        }}
      />

      {/* Readability scrims — a left/bottom wash so the Hero copy on the left
          stays legible over the imagery, plus a subtle theme tint. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, color-mix(in srgb, var(--bg) 78%, transparent) 0%, color-mix(in srgb, var(--bg) 30%, transparent) 34%, transparent 62%)",
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-1/2"
        style={{
          background:
            "linear-gradient(to top, color-mix(in srgb, var(--bg) 82%, transparent), transparent)",
        }}
      />

      {/* Subtle foreground rooftop silhouette for standing-on-a-roof depth —
          the only procedural geometry that remains, kept faint over the photo. */}
      {!isMobile && (
        <motion.svg
          aria-hidden="true"
          className="absolute bottom-0 left-1/2 h-[22%] w-[140%] max-w-none -translate-x-1/2"
          viewBox="0 0 1200 200"
          preserveAspectRatio="xMidYMax slice"
          style={{ opacity: 0.85, ...p(foreX, foreY) }}
        >
          <g fill="#04040a">
            <rect x="-40" y="150" width="1280" height="90" />
            <rect x="-40" y="140" width="1280" height="14" />
            <rect x="900" y="120" width="150" height="32" />
            <rect x="1050" y="52" width="4" height="100" />
            <rect x="1032" y="74" width="40" height="3" />
          </g>
          {/* wet edge / warm rim on the parapet */}
          <rect
            x="-40" y="140" width="1280" height="2"
            fill={isMiles ? "var(--accent-blue)" : "var(--accent-warm)"}
            opacity={isMiles ? 0.45 : 0.35}
          />
        </motion.svg>
      )}

      {/* Miles-only rain streaks, disabled under reduced motion / mobile. */}
      {isMiles && !prefersReducedMotion && !isMobile && (
        <div className="city-rain absolute inset-0" style={{ opacity: 0.35 }} />
      )}

      {/* Atmospheric haze rising from the street. */}
      <div
        className="absolute inset-x-0 bottom-0 h-1/3"
        style={{ background: "linear-gradient(to top, var(--city-haze), transparent)" }}
      />

      {/* Faint comic halftone over the lower band (preserved comic treatment). */}
      {!isMobile && (
        <img
          src="/assets/overlays/halftone.svg"
          alt=""
          className="absolute inset-x-0 bottom-0 h-1/2 w-full object-cover"
          style={{
            opacity: isMiles ? 0.1 : 0.07,
            mixBlendMode: isMiles ? "screen" : "multiply",
          }}
        />
      )}

      {/* Top vignette so the scene recedes behind foreground content. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 85% at 50% 0%, transparent 55%, color-mix(in srgb, var(--bg) 55%, transparent))",
        }}
      />
    </div>
  );
}
