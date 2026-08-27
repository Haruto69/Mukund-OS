import React, { useEffect, useMemo } from "react";
import {
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from "framer-motion";

const DEPTH_PROXIMITY_STRENGTH = { far: 0, mid: 0.45, near: 1 };
// How close (in normalized -1..1 pointer space) a shard needs to be to the
// cursor before it starts reacting — the reaction begins well before the
// pointer visually overlaps the shard.
const PROXIMITY_RADIUS = 0.55;

/**
 * A single ambient glass shard. Pure CSS/DOM + Framer Motion — no canvas, no
 * WebGL. Reflection is abstract/theme-aware only for now; `reflection` is a
 * forward-looking prop so later passes can swap in a real reflection source
 * (e.g. `reflection="city"`) without changing this component's shape.
 *
 * All hooks below run unconditionally on every render (Rules of Hooks); the
 * `prefersReducedMotion` / `enableProximity` flags only affect which of the
 * already-created motion values get used in the final style.
 */
export default function GlassShard({
  config,
  pointer,
  enableProximity,
  prefersReducedMotion,
  reflection = "abstract",
  // Reserved transition hook: "ambient" | "gather" | "shatter" | "settle".
  // Pass 3 handles the transition cue at the FIELD level (see GlassField); this
  // prop exists now so a later pass can drive per-shard convergence/explosion
  // from here without changing GlassField's or this component's shape.
  // eslint-disable-next-line no-unused-vars
  phase = "ambient",
}) {
  const {
    x,
    y,
    width,
    height,
    rotation,
    depth,
    polygon,
    driftX,
    driftY,
    driftRotation,
    duration,
    delay,
    baseOpacity,
    blur,
  } = config;

  // Ambient drift — animated imperatively so it never touches React state.
  const driftXValue = useMotionValue(0);
  const driftYValue = useMotionValue(0);
  const driftRotateValue = useMotionValue(0);

  useEffect(() => {
    if (prefersReducedMotion) return undefined;

    const controls = [
      animate(driftXValue, [0, driftX, 0], {
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }),
      animate(driftYValue, [0, driftY, 0], {
        duration: duration * 1.15,
        delay: delay * 0.8,
        repeat: Infinity,
        ease: "easeInOut",
      }),
      animate(driftRotateValue, [0, driftRotation, 0], {
        duration: duration * 1.3,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }),
    ];

    return () => controls.forEach((c) => c.stop());
  }, [prefersReducedMotion, driftX, driftY, driftRotation, duration, delay, driftXValue, driftYValue, driftRotateValue]);

  // Shard's own position in the same normalized -1..1 space as the shared
  // pointer, computed once — used purely for a distance calculation.
  const normX = useMemo(() => (x / 100) * 2 - 1, [x]);
  const normY = useMemo(() => (y / 100) * 2 - 1, [y]);
  const strength = enableProximity ? DEPTH_PROXIMITY_STRENGTH[depth] ?? 0 : 0;

  const proximity = useTransform([pointer.x, pointer.y], ([px, py]) => {
    if (strength === 0) return 0;
    const dist = Math.hypot(px - normX, py - normY);
    const falloff = Math.max(0, 1 - dist / PROXIMITY_RADIUS);
    return falloff * strength;
  });

  // Nudge toward the *live* pointer position, not a fixed point — direction
  // must track wherever the cursor currently is, scaled down so it reads as
  // a subtle lean rather than the shard chasing the cursor.
  const proxOffsetX = useTransform([pointer.x, proximity], ([px, p]) => (px - normX) * p * 18);
  const proxOffsetY = useTransform([pointer.y, proximity], ([py, p]) => (py - normY) * p * 18);
  const proxScale = useTransform(proximity, [0, 1], [1, 1.12]);
  const proxBlur = useTransform(proximity, (p) => Math.max(0.4, blur - p * blur * 0.75));
  const proxOpacity = useTransform(proximity, (p) => baseOpacity + p * 0.18);
  const proxGlow = useTransform(proximity, (p) => p * 0.5);

  const finalX = useTransform([driftXValue, proxOffsetX], ([d, p]) => d + p);
  const finalY = useTransform([driftYValue, proxOffsetY], ([d, p]) => d + p);
  const finalRotate = useTransform(driftRotateValue, (r) => rotation + r);
  const filter = useMotionTemplate`blur(${proxBlur}px)`;
  const boxShadow = useMotionTemplate`0 0 calc(${proxGlow} * 40px) color-mix(in srgb, var(--red) 55%, var(--blue) 45%)`;

  const dynamicStyle = {
    x: finalX,
    y: finalY,
    rotate: finalRotate,
    scale: proxScale,
    filter,
    opacity: proxOpacity,
    boxShadow: enableProximity ? boxShadow : undefined,
  };

  const staticStyle = {
    rotate: rotation,
    filter: `blur(${blur}px)`,
    opacity: baseOpacity,
  };

  return (
    <motion.div
      aria-hidden="true"
      data-reflection={reflection}
      className="absolute rounded-[2px]"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width,
        height,
        clipPath: polygon,
        background:
          "linear-gradient(135deg, color-mix(in srgb, var(--blue) 22%, transparent), color-mix(in srgb, var(--red) 18%, transparent) 60%, transparent)",
        border: "1px solid color-mix(in srgb, var(--text) 12%, transparent)",
        ...(prefersReducedMotion ? staticStyle : dynamicStyle),
      }}
    />
  );
}
