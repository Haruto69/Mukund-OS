import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { useMotionContext } from "../../motion/MotionProvider";
import FeaturedProjectSlide from "./FeaturedProjectSlide";
import CarouselProgress from "./CarouselProgress";
import SwipeProjectRail from "./SwipeProjectRail";

/* ------------------------------------------------------------------ */
/* Desktop stage geometry (viewport-relative so no resize listener is   */
/* needed — the track's x is expressed in `vw`).                        */
/* ------------------------------------------------------------------ */
const CARD_VW = 78; // dominant centered card
const GAP_VW = 3;
const STEP_VW = CARD_VW + GAP_VW;
const EDGE_VW = (100 - CARD_VW) / 2; // leading pad → card sits centered
/** Extra scroll distance (in vh) contributed by each additional project. */
const TRAVEL_PER_SLIDE_VH = 110;

/**
 * Build the mapping from section scroll progress (0..1) to a fractional
 * carousel position (0..total-1). Each project gets a short "dwell" band so
 * the sequence reads as discrete cinematic beats rather than a constant
 * sideways drift, while remaining a pure scroll-linked transform.
 */
function buildTrackMapping(total) {
  const inputs = [];
  const outputs = [];
  for (let i = 0; i < total; i += 1) {
    const base = total > 1 ? i / (total - 1) : 0;
    let start;
    let end;
    if (i === 0) {
      start = 0;
      end = Math.min(0.1, base + 0.1);
    } else if (i === total - 1) {
      start = Math.max(0.9, base - 0.1);
      end = 1;
    } else {
      start = base - 0.07;
      end = base + 0.07;
    }
    inputs.push(start, end);
    outputs.push(i, i);
  }
  return { inputs, outputs };
}

/** Scroll progress each index sits at — used for keyboard prev/next. */
function anchorFor(index, total) {
  if (total <= 1) return 0;
  return 0.05 + (index / (total - 1)) * 0.9;
}

/* -------------------------------------------------------------------- */
/* Desktop: tall section → sticky stage → scroll-linked horizontal track  */
/* -------------------------------------------------------------------- */
function CinematicCarousel({ projects, onOpenProject }) {
  const wrapperRef = useRef(null);
  const total = projects.length;
  const [index, setIndex] = useState(0);

  // 0 when the tall wrapper's top meets the viewport top, 1 when its bottom
  // meets the viewport bottom — exactly the sticky travel window. Outside it
  // the page scrolls normally, so the user is never trapped.
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  const { inputs, outputs } = useMemo(() => buildTrackMapping(total), [total]);

  const activeFloat = useTransform(scrollYProgress, inputs, outputs);
  const trackX = useTransform(activeFloat, (v) => `${-v * STEP_VW}vw`);
  const railScale = useTransform(activeFloat, (v) =>
    total > 1 ? v / (total - 1) : 1
  );
  // Section scrim: settles the global city back during the sequence, then
  // releases it again on the way out.
  const scrimOpacity = useTransform(
    scrollYProgress,
    [0, 0.08, 0.92, 1],
    [0, 1, 1, 0]
  );
  // Stage exit: the whole sticky stage (header + track) fades out over the
  // final slice of scroll progress, so it is fully invisible by the moment
  // it un-sticks — no sliver of the last card lingers at the top of the
  // viewport while About scrolls in underneath. Entry is untouched (stays
  // at full opacity from progress 0).
  const stageOpacity = useTransform(scrollYProgress, [0, 0.93, 1], [1, 1, 0]);

  // The only React state driven by scroll — one update per card change.
  useMotionValueEvent(activeFloat, "change", (v) => {
    const next = Math.round(v);
    setIndex((prev) => (prev === next ? prev : next));
  });

  const goToIndex = useCallback(
    (next) => {
      const el = wrapperRef.current;
      if (!el || next < 0 || next > total - 1) return;
      const top = el.getBoundingClientRect().top + window.scrollY;
      const travel = el.offsetHeight - window.innerHeight;
      window.scrollTo({
        top: top + anchorFor(next, total) * travel,
        behavior: "smooth",
      });
    },
    [total]
  );

  return (
    <div
      ref={wrapperRef}
      style={{ height: `${100 + (total - 1) * TRAVEL_PER_SLIDE_VH}vh` }}
    >
      <motion.div
        className="sticky top-0 flex h-screen flex-col overflow-hidden"
        style={{ opacity: stageOpacity }}
      >
        {/* Readability scrim over the global city scene. Purely decorative. */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            opacity: scrimOpacity,
            background:
              "radial-gradient(120% 90% at 50% 45%, color-mix(in srgb, var(--bg) 82%, transparent) 0%, color-mix(in srgb, var(--bg) 60%, transparent) 62%, transparent 100%)",
          }}
        />

        {/* Composed stage header — progress/nav stays put through the whole
            sequence. No section label here: the section heading already
            introduces "Featured Projects" above the carousel. */}
        <div className="relative z-[1] flex shrink-0 items-center justify-end gap-6 px-[6vw] pb-4 pt-24">
          <CarouselProgress
            index={index}
            total={total}
            progress={railScale}
            showControls
            onPrev={() => goToIndex(index - 1)}
            onNext={() => goToIndex(index + 1)}
          />
        </div>

        {/* Horizontal track — translateX is driven purely by vertical scroll
            progress. No wheel listeners, no preventDefault, no scroll lock. */}
        <div
          className="relative z-[1] flex min-h-0 flex-1 items-center"
          role="group"
          aria-roledescription="carousel"
          aria-label="Featured projects"
        >
          <motion.div
            className="flex items-center"
            style={{
              x: trackX,
              paddingLeft: `${EDGE_VW}vw`,
              gap: `${GAP_VW}vw`,
              willChange: "transform",
            }}
          >
            {projects.map((project, i) => (
              <FeaturedProjectSlide
                key={project.id}
                project={project}
                index={i}
                total={total}
                activeFloat={activeFloat}
                variant="cinematic"
                isActive={i === index}
                onOpen={onOpenProject}
                onFocusSlide={goToIndex}
                style={{ width: `${CARD_VW}vw`, height: "min(76vh, 860px)" }}
              />
            ))}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Reduced motion: plain stacked cards, no sticky, no transforms.       */
/* ------------------------------------------------------------------ */
function StackedProjects({ projects, onOpenProject }) {
  return (
    <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6">
      {projects.map((project, i) => (
        <FeaturedProjectSlide
          key={project.id}
          project={project}
          index={i}
          total={projects.length}
          variant="static"
          onOpen={onOpenProject}
          className="w-full"
          style={{ height: "min(60vh, 560px)", minHeight: "380px" }}
        />
      ))}
    </div>
  );
}

/**
 * Mode switch for the featured project carousel.
 *
 *   reduced motion → stacked, fully static cards
 *   mobile/tablet  → native horizontal swipe rail (CSS scroll-snap)
 *   desktop        → sticky stage + scroll-linked horizontal track
 *
 * `onOpenProject(project)` is the single forward-compatible hook for the
 * future web-pull case-study expansion; slides never navigate away themselves.
 */
export default function FeaturedProjectCarousel({ projects, onOpenProject }) {
  const { tier, prefersReducedMotion } = useMotionContext();

  if (!projects || projects.length === 0) return null;

  if (prefersReducedMotion) {
    return <StackedProjects projects={projects} onOpenProject={onOpenProject} />;
  }

  if (tier === "mobile" || tier === "tablet") {
    return <SwipeProjectRail projects={projects} onOpenProject={onOpenProject} />;
  }

  return <CinematicCarousel projects={projects} onOpenProject={onOpenProject} />;
}
