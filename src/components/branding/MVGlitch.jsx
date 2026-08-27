import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useMotionContext } from "../../motion/MotionProvider";

/**
 * Reusable MV chromatic burst primitive.
 *
 * Wraps arbitrary children (the MV logo, a section title, a project title,
 * a theme-transition frame) and, on demand, fires a short chromatic-slice
 * glitch burst around them. The resting state is perfectly crisp — bursts are
 * event-driven, never a continuous loop.
 *
 * Chromatic aberration is produced by rendering aria-hidden clones of the
 * children tinted red and cyan and displacing them for 150–350ms via the CSS
 * keyframes in index.css. Because the clones inherit `currentColor`, this
 * works for any children that draw with currentColor (SVG strokes, text).
 *
 * Trigger surfaces (all optional, all composable):
 *   - `burstOnMount`      → one burst when first shown (logo appearance)
 *   - `trigger`           → burst whenever this value changes (theme swaps…)
 *   - imperative ref API  → ref.current.burst({ strong: true })
 *   - as a wrapper you can also drive it from hover via onMouseEnter, but the
 *     logo uses the imperative handle so hover/focus both map to one path.
 *
 * No new dependency; ~zero cost at rest.
 */
const BURST_MS = { normal: 340, strong: 400 };

const MVGlitch = forwardRef(function MVGlitch(
  {
    children,
    trigger,
    burstOnMount = false,
    className = "",
    as: Tag = "span",
    cyan = "#22d3ee",
    ...rest
  },
  ref
) {
  const { prefersReducedMotion } = useMotionContext();
  const [burst, setBurst] = useState(null); // null | "normal" | "strong"
  const timerRef = useRef(null);
  const mountedRef = useRef(false);

  const fire = useCallback(
    (opts = {}) => {
      if (prefersReducedMotion) return;
      const strength = opts.strong ? "strong" : "normal";
      clearTimeout(timerRef.current);
      // Force a restart even if a burst is already running.
      setBurst(null);
      // Next frame so the class actually toggles off→on and the animation
      // replays from 0 rather than being ignored as "no change".
      requestAnimationFrame(() => {
        setBurst(strength);
        timerRef.current = setTimeout(
          () => setBurst(null),
          BURST_MS[strength]
        );
      });
    },
    [prefersReducedMotion]
  );

  useImperativeHandle(ref, () => ({ burst: fire }), [fire]);

  // One burst when the element first appears.
  useEffect(() => {
    if (burstOnMount && !mountedRef.current) {
      mountedRef.current = true;
      fire();
    }
  }, [burstOnMount, fire]);

  // Burst whenever `trigger` changes (skip the very first render).
  const prevTrigger = useRef(trigger);
  useEffect(() => {
    if (prevTrigger.current !== trigger) {
      prevTrigger.current = trigger;
      fire({ strong: true });
    }
  }, [trigger, fire]);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const burstClass = burst
    ? `glitch-burst${burst === "strong" ? " glitch-burst--strong" : ""}`
    : "";

  return (
    <Tag className={`glitch-host ${burstClass} ${className}`.trim()} {...rest}>
      {/* Crisp core — the only layer read by assistive tech. */}
      <span className="glitch-core">{children}</span>
      {/* Displaced monochrome slice of the core. */}
      <span className="glitch-layer glitch-layer--slice" aria-hidden="true">
        {children}
      </span>
      {/* Chromatic ghosts. */}
      <span
        className="glitch-layer glitch-layer--red"
        aria-hidden="true"
        style={{ color: "var(--accent-red)" }}
      >
        {children}
      </span>
      <span
        className="glitch-layer glitch-layer--cyan"
        aria-hidden="true"
        style={{ color: cyan }}
      >
        {children}
      </span>
    </Tag>
  );
});

export default MVGlitch;

/** Alias so call sites can read as <GlitchBurst trigger={…}>…</GlitchBurst>. */
export const GlitchBurst = MVGlitch;
