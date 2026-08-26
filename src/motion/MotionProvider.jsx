import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useMotionValue } from "framer-motion";

/**
 * Shared motion primitives for the whole app.
 *
 * Design goal: keep high-frequency data (scroll position, pointer position)
 * out of React state entirely. They live in Framer Motion `MotionValue`s that
 * consumers read via `useTransform` / `style={{ ... }}` bindings, which never
 * trigger a React re-render. Only *discrete, infrequent* changes (scroll
 * direction flipping, breakpoint tier changing, reduced-motion toggling) go
 * through `useState`, and each is guarded so it only fires on an actual
 * change of value.
 */

const MOBILE_QUERY = "(max-width: 767px)";
const TABLET_QUERY = "(min-width: 768px) and (max-width: 1023px)";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const COARSE_POINTER_QUERY = "(pointer: coarse)";

// Minimum scroll delta (px) required to flip the reported direction. Filters
// out 1-2px trackpad/touch jitter so the Navbar doesn't flicker.
const DIRECTION_THRESHOLD = 6;

const MotionContext = createContext(null);

function getTier() {
  if (typeof window === "undefined") return "desktop";
  if (window.matchMedia(MOBILE_QUERY).matches) return "mobile";
  if (window.matchMedia(TABLET_QUERY).matches) return "tablet";
  return "desktop";
}

export function MotionProvider({ children }) {
  const scrollY = useMotionValue(typeof window !== "undefined" ? window.scrollY : 0);
  // Normalized -1..1 pointer position, relative to viewport center.
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  // Raw client coordinates, for consumers that need real pixel positions.
  const pointerClientX = useMotionValue(0);
  const pointerClientY = useMotionValue(0);

  const [scrollDirection, setScrollDirection] = useState("idle");
  const [tier, setTier] = useState(getTier);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia(REDUCED_MOTION_QUERY).matches
  );
  const [hasCoarsePointer, setHasCoarsePointer] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia(COARSE_POINTER_QUERY).matches
  );

  const lastDirectionRef = useRef("idle");
  const lastYRef = useRef(typeof window !== "undefined" ? window.scrollY : 0);
  const scrollTicking = useRef(false);
  const pointerTicking = useRef(false);
  const pendingPointer = useRef({ x: 0, y: 0 });
  const idleTimerRef = useRef(null);

  // --- Scroll tracking (rAF-batched, direction has hysteresis) ----------
  useEffect(() => {
    const onScroll = () => {
      if (scrollTicking.current) return;
      scrollTicking.current = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        scrollY.set(y);

        const delta = y - lastYRef.current;
        if (Math.abs(delta) >= DIRECTION_THRESHOLD) {
          const next = delta > 0 ? "down" : "up";
          if (next !== lastDirectionRef.current) {
            lastDirectionRef.current = next;
            setScrollDirection(next);
          }
          lastYRef.current = y;
        }

        // After scrolling stops for a moment, report "idle" so consumers
        // (e.g. Navbar) can decide whether to treat that as "up".
        clearTimeout(idleTimerRef.current);
        idleTimerRef.current = setTimeout(() => {
          lastDirectionRef.current = "idle";
          setScrollDirection("idle");
        }, 200);

        scrollTicking.current = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(idleTimerRef.current);
    };
  }, [scrollY]);

  // --- Pointer tracking (skipped on touch/coarse pointers) ---------------
  useEffect(() => {
    if (hasCoarsePointer) return;

    const onMove = (e) => {
      pendingPointer.current = { x: e.clientX, y: e.clientY };
      if (pointerTicking.current) return;
      pointerTicking.current = true;
      requestAnimationFrame(() => {
        const { x, y } = pendingPointer.current;
        pointerClientX.set(x);
        pointerClientY.set(y);
        pointerX.set((x / window.innerWidth) * 2 - 1);
        pointerY.set((y / window.innerHeight) * 2 - 1);
        pointerTicking.current = false;
      });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [hasCoarsePointer, pointerX, pointerY, pointerClientX, pointerClientY]);

  // --- Breakpoint tier ----------------------------------------------------
  useEffect(() => {
    const mobileMql = window.matchMedia(MOBILE_QUERY);
    const tabletMql = window.matchMedia(TABLET_QUERY);
    const update = () => setTier(getTier());
    mobileMql.addEventListener("change", update);
    tabletMql.addEventListener("change", update);
    return () => {
      mobileMql.removeEventListener("change", update);
      tabletMql.removeEventListener("change", update);
    };
  }, []);

  // --- Reduced motion / coarse pointer preferences ------------------------
  useEffect(() => {
    const reducedMql = window.matchMedia(REDUCED_MOTION_QUERY);
    const coarseMql = window.matchMedia(COARSE_POINTER_QUERY);
    const onReduced = (e) => setPrefersReducedMotion(e.matches);
    const onCoarse = (e) => setHasCoarsePointer(e.matches);
    reducedMql.addEventListener("change", onReduced);
    coarseMql.addEventListener("change", onCoarse);
    return () => {
      reducedMql.removeEventListener("change", onReduced);
      coarseMql.removeEventListener("change", onCoarse);
    };
  }, []);

  const value = useMemo(
    () => ({
      scrollY,
      scrollDirection,
      pointer: { x: pointerX, y: pointerY },
      pointerClient: { x: pointerClientX, y: pointerClientY },
      isMobile: tier === "mobile",
      isTablet: tier === "tablet",
      tier,
      prefersReducedMotion,
      hasCoarsePointer,
    }),
    [
      scrollY,
      scrollDirection,
      pointerX,
      pointerY,
      pointerClientX,
      pointerClientY,
      tier,
      prefersReducedMotion,
      hasCoarsePointer,
    ]
  );

  return <MotionContext.Provider value={value}>{children}</MotionContext.Provider>;
}

export function useMotionContext() {
  const ctx = useContext(MotionContext);
  if (!ctx) throw new Error("useMotionContext must be used within a MotionProvider");
  return ctx;
}
