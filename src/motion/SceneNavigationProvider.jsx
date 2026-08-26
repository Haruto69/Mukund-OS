import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useMotionContext } from "./MotionProvider";

/**
 * Canonical, ordered list of top-level page sections. This is the single
 * source of truth for section order used by the Navbar and by
 * `navigateToSection`.
 */
export const SECTION_IDS = [
  "home",
  "featured-projects",
  "about",
  "skills",
  "experience",
  "projects",
  "resume",
  "contact",
];

const SceneNavigationContext = createContext(null);

/**
 * Shared in-page navigation controller. Nothing in the app should call
 * `element.scrollIntoView(...)` directly — everything routes through
 * `navigateToSection` so a later pass can insert real transition choreography
 * (Spider-Man swing transitions, shutter wipes, etc.) in one place without
 * touching every call site.
 *
 * Pass 2 behavior: navigation is immediate. `transitionState` stays "idle"
 * and the `beforeTransition` / `afterTransition` hooks are called
 * synchronously around the scroll — the shape exists now so later passes can
 * make them asynchronous (e.g. await an exit animation) without changing the
 * public API.
 */
export function SceneNavigationProvider({ children }) {
  const { prefersReducedMotion } = useMotionContext();
  const [activeSection, setActiveSection] = useState(SECTION_IDS[0]);
  const [transitionState, setTransitionState] = useState("idle");
  const listenersRef = useRef({ beforeTransition: [], afterTransition: [] });

  // Single IntersectionObserver watching a thin horizontal band near the
  // vertical center of the viewport. Whichever section crosses that band is
  // the active one — far cheaper than computing bounding rects on scroll.
  useEffect(() => {
    const elements = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      Boolean
    );
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length === 0) return;
        // Prefer the entry closest to the top of the viewport band.
        visible.sort(
          (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
        );
        const id = visible[0].target.id;
        setActiveSection((prev) => (prev === id ? prev : id));
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const onBeforeTransition = useCallback((fn) => {
    listenersRef.current.beforeTransition.push(fn);
    return () => {
      listenersRef.current.beforeTransition = listenersRef.current.beforeTransition.filter(
        (f) => f !== fn
      );
    };
  }, []);

  const onAfterTransition = useCallback((fn) => {
    listenersRef.current.afterTransition.push(fn);
    return () => {
      listenersRef.current.afterTransition = listenersRef.current.afterTransition.filter(
        (f) => f !== fn
      );
    };
  }, []);

  const navigateToSection = useCallback(
    (id, options = {}) => {
      const el = document.getElementById(id);
      if (!el) return;

      const payload = { id, source: options.source ?? "unknown" };
      listenersRef.current.beforeTransition.forEach((fn) => fn(payload));

      setTransitionState("navigating");
      el.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "start",
      });
      setTransitionState("idle");

      listenersRef.current.afterTransition.forEach((fn) => fn(payload));
    },
    [prefersReducedMotion]
  );

  const value = useMemo(
    () => ({
      activeSection,
      transitionState,
      navigateToSection,
      onBeforeTransition,
      onAfterTransition,
      sectionIds: SECTION_IDS,
    }),
    [activeSection, transitionState, navigateToSection, onBeforeTransition, onAfterTransition]
  );

  return (
    <SceneNavigationContext.Provider value={value}>
      {children}
    </SceneNavigationContext.Provider>
  );
}

export function useSceneNavigation() {
  const ctx = useContext(SceneNavigationContext);
  if (!ctx)
    throw new Error(
      "useSceneNavigation must be used within a SceneNavigationProvider"
    );
  return ctx;
}
