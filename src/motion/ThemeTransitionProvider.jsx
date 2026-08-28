import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { flushSync } from "react-dom";
import { useTheme } from "../components/theme/ThemeProvider";
import { useMotionContext } from "./MotionProvider";

/**
 * ThemeTransitionProvider — the orchestration layer that turns a theme change
 * from an instantaneous `setTheme("miles")` into a well-defined, async,
 * state-based sequence. This is the foundation the signature Spider-Man
 * shutter transition (and the first-visit intro reveal) will hang off of; this
 * pass ships the STATE MACHINE + a simple overlay, not the character/shatter
 * choreography.
 *
 * Phases (a superset covering both intro reveal and theme swap):
 *
 *   idle          → nothing happening
 *   gathering     → pre-roll: glass converges, scene braces (cue only)
 *   closing       → shutter pulls across the viewport
 *   covered       → viewport fully covered  ← THEME SWAP HAPPENS HERE
 *   theme-swapping→ brief hold on the new theme while still covered
 *   opening       → shutter pulls back, revealing the (new) scene
 *   settling      → glass/scene settle back to ambient
 *
 * Public API:
 *   requestThemeChange(next?)  → run the full sequence, swapping at `covered`.
 *                                Omit `next` to toggle. Ignored while busy.
 *   phase                      → current phase string (above)
 *   mode                       → "theme" | "intro" | null
 *   isTransitioning            → phase !== "idle"
 *   glassPhase                 → derived cue for GlassField
 *                                ("ambient" | "gather" | "shatter" | "settle")
 *   shutterVariant             → "desktop" | "mobile"; the shutter artwork
 *                                orientation, frozen for the whole transition
 *                                exactly like `shutterTheme`.
 *   shutterTheme               → SOURCE theme to paint the shutter with; frozen
 *                                at the instant the transition begins and held
 *                                immutable through close→covered→open, so the
 *                                shutter artwork never changes mid-transition.
 *
 * Reduced motion: the sequence collapses to an instant, well-defined swap (no
 * moving overlay); theme switching stays fully functional.
 */

const ThemeTransitionContext = createContext(null);

const INTRO_KEY = "portfolio-intro-played";

// Shutter artwork comes in two orientations. The variant is resolved ONCE, at
// the instant a transition begins, and frozen alongside `shutterTheme` — so a
// resize (or a mobile browser's URL bar collapsing) can never swap the artwork
// halfway through a close→covered→open sequence.
const SHUTTER_MOBILE_QUERY = "(max-width: 767px)";

function currentShutterVariant() {
  if (typeof window === "undefined") return "desktop";
  return window.matchMedia(SHUTTER_MOBILE_QUERY).matches ? "mobile" : "desktop";
}

// Phase durations (ms). Kept short + cinematic.
const D = {
  gathering: 200,
  closing: 240,
  covered: 120,
  swapping: 90,
  opening: 300,
  settling: 220,
};
const INTRO = { covered: 90, opening: 340, settling: 220 };

// phase → GlassField cue.
function glassPhaseFor(phase) {
  switch (phase) {
    case "gathering":
    case "closing":
      return "gather";
    case "covered":
    case "theme-swapping":
      return "gather";
    case "opening":
      return "shatter";
    case "settling":
      return "settle";
    default:
      return "ambient";
  }
}

function introAlreadyPlayed() {
  try {
    return sessionStorage.getItem(INTRO_KEY) === "1";
  } catch {
    return false;
  }
}
function markIntroPlayed() {
  try {
    sessionStorage.setItem(INTRO_KEY, "1");
  } catch {
    /* sessionStorage unavailable — intro simply won't be remembered */
  }
}

export function ThemeTransitionProvider({ children }) {
  const { theme, setTheme, toggleTheme } = useTheme();
  const { prefersReducedMotion } = useMotionContext();

  const [phase, setPhase] = useState("idle");
  const [mode, setMode] = useState(null); // "theme" | "intro" | null
  // The SOURCE theme the shutter artwork is painted with. Frozen for the whole
  // transition (never reassigned at `covered`) so one and only one shutter
  // artwork is shown per transition.
  const [shutterTheme, setShutterTheme] = useState(theme);
  // Frozen for the same window as `shutterTheme`: "desktop" | "mobile".
  const [shutterVariant, setShutterVariant] = useState(currentShutterVariant);

  const busyRef = useRef(false);
  const runIdRef = useRef(0);

  const cancellableWait = useCallback((ms, id) => {
    return new Promise((resolve) => {
      const t = setTimeout(() => resolve(runIdRef.current === id), ms);
      // If a newer run starts, the stale resolve simply reports false.
      void t;
    });
  }, []);

  const finish = useCallback(() => {
    busyRef.current = false;
    setMode(null);
    setPhase("idle");
  }, []);

  // ---- Theme swap sequence ------------------------------------------------
  const requestThemeChange = useCallback(
    (next) => {
      const target =
        next === "peter" || next === "miles"
          ? next
          : theme === "miles"
          ? "peter"
          : "miles";

      if (target === theme) return;

      // Reduced motion (or already busy): swap instantly, no choreography.
      if (prefersReducedMotion) {
        setTheme(target);
        return;
      }
      if (busyRef.current) return;

      busyRef.current = true;
      const id = ++runIdRef.current;
      setMode("theme");
      // Freeze the SOURCE theme and COMMIT it synchronously *before* the shutter
      // overlay can mount, so its very first painted frame already resolves to
      // the source artwork — never a stale leftover from a prior transition.
      // The shutter then stays this artwork the entire sequence, even after
      // setTheme(target) swaps the scene at `covered`.
      flushSync(() => {
        setShutterTheme(theme);
        setShutterVariant(currentShutterVariant());
      });

      (async () => {
        setPhase("gathering");
        if (!(await cancellableWait(D.gathering, id))) return;

        setPhase("closing");
        if (!(await cancellableWait(D.closing, id))) return;

        // Fully covered — the single well-defined swap point. The scene
        // (city + hero spider + theme tokens) swaps here, but the shutter keeps
        // rendering the frozen SOURCE artwork (shutterTheme is NOT touched).
        setPhase("covered");
        setTheme(target);
        if (!(await cancellableWait(D.covered, id))) return;

        setPhase("theme-swapping");
        if (!(await cancellableWait(D.swapping, id))) return;

        setPhase("opening");
        if (!(await cancellableWait(D.opening, id))) return;

        setPhase("settling");
        if (!(await cancellableWait(D.settling, id))) return;

        finish();
      })();
    },
    [theme, prefersReducedMotion, setTheme, cancellableWait, finish]
  );

  // ---- First-visit intro reveal ------------------------------------------
  useEffect(() => {
    // Only the very first paint of a browser session plays the intro.
    // A reload within the same session (key present) skips it; reduced motion
    // skips it entirely. This is the architecture — the full character/shutter
    // intro comes later.
    if (introAlreadyPlayed()) return;
    markIntroPlayed();
    if (prefersReducedMotion) return;

    busyRef.current = true;
    const id = ++runIdRef.current;
    setMode("intro");
    // No previous theme on first-session intro — use the active theme's shutter.
    setShutterTheme(theme);
    setShutterVariant(currentShutterVariant());

    (async () => {
      // Intro starts already covered, then reveals.
      setPhase("covered");
      if (!(await cancellableWait(INTRO.covered, id))) return;
      setPhase("opening");
      if (!(await cancellableWait(INTRO.opening, id))) return;
      setPhase("settling");
      if (!(await cancellableWait(INTRO.settling, id))) return;
      finish();
    })();
    // Intentionally run once on mount only.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = useMemo(
    () => ({
      phase,
      mode,
      isTransitioning: phase !== "idle",
      glassPhase: glassPhaseFor(phase),
      shutterTheme,
      shutterVariant,
      requestThemeChange,
      // Convenience: a plain toggle that still routes through the sequence.
      toggleThemeAnimated: () => requestThemeChange(),
      // Escape hatch kept for parity / non-animated call sites.
      setThemeInstant: setTheme,
      toggleThemeInstant: toggleTheme,
    }),
    [
      phase,
      mode,
      shutterTheme,
      shutterVariant,
      requestThemeChange,
      setTheme,
      toggleTheme,
    ]
  );

  return (
    <ThemeTransitionContext.Provider value={value}>
      {children}
    </ThemeTransitionContext.Provider>
  );
}

export function useThemeTransition() {
  const ctx = useContext(ThemeTransitionContext);
  if (!ctx)
    throw new Error(
      "useThemeTransition must be used within a ThemeTransitionProvider"
    );
  return ctx;
}
