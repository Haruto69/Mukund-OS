import React, { useCallback, useEffect, useRef, useState } from "react";
import FeaturedProjectSlide from "./FeaturedProjectSlide";
import CarouselProgress from "./CarouselProgress";

/**
 * Touch-first horizontal rail used on mobile and tablet.
 *
 * Native CSS scroll-snap only — no wheel interception, no sticky choreography,
 * no transform-driven track. Vertical page scrolling stays completely normal
 * and `overscroll-behavior-x: contain` keeps the swipe from ever turning into
 * horizontal page overflow / back-navigation gestures.
 */
export default function SwipeProjectRail({ projects, onOpenProject }) {
  const railRef = useRef(null);
  const tickingRef = useRef(false);
  const [index, setIndex] = useState(0);
  const total = projects.length;

  // Derive the active card from scroll position, rAF-throttled and only
  // committed to state when the rounded index actually changes.
  useEffect(() => {
    const el = railRef.current;
    if (!el) return;

    const onScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;
      requestAnimationFrame(() => {
        const max = el.scrollWidth - el.clientWidth;
        const ratio = max > 0 ? el.scrollLeft / max : 0;
        const next = Math.round(ratio * (total - 1));
        setIndex((prev) => (prev === next ? prev : next));
        tickingRef.current = false;
      });
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [total]);

  const goTo = useCallback((next) => {
    const el = railRef.current;
    if (!el) return;
    const card = el.children[next];
    if (!card) return;
    el.scrollTo({
      left: card.offsetLeft - (el.clientWidth - card.clientWidth) / 2,
      behavior: "smooth",
    });
  }, []);

  return (
    <div>
      <div
        ref={railRef}
        role="group"
        aria-roledescription="carousel"
        aria-label="Featured projects"
        tabIndex={0}
        className="mv-swipe-rail flex snap-x snap-mandatory gap-[2vw] overflow-x-auto overflow-y-hidden px-[7vw] pb-4 pt-1"
        style={{ overscrollBehaviorX: "contain", scrollPaddingInline: "7vw" }}
      >
        {projects.map((project, i) => (
          <FeaturedProjectSlide
            key={project.id}
            project={project}
            index={i}
            total={total}
            variant="static"
            isActive={i === index}
            onOpen={onOpenProject}
            className="w-[86vw] snap-center"
            style={{ height: "min(64vh, 560px)", minHeight: "420px" }}
          />
        ))}
      </div>

      <div className="mt-5 flex justify-center px-4">
        <CarouselProgress
          index={index}
          total={total}
          showControls
          onPrev={() => goTo(Math.max(0, index - 1))}
          onNext={() => goTo(Math.min(total - 1, index + 1))}
        />
      </div>
    </div>
  );
}
