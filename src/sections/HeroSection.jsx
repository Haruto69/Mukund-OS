import React, { useCallback, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { profile } from "../data/profile";
import { useMotionContext } from "../motion/MotionProvider";
import { useSceneNavigation } from "../motion/SceneNavigationProvider";
import Reveal from "../components/motion/Reveal";
import MVLogo from "../components/branding/MVLogo";
import FragmentedHeroSpider from "../components/hero/FragmentedHeroSpider";
import GlitchFragments from "../components/decor/GlitchFragments";

/**
 * Hero.
 *
 * Architecture: a tall `hero-scroll-track` section wrapping a `sticky top-0`
 * stage — the same idea the Featured Projects carousel uses. Document scroll
 * runs through the track while the stage stays pinned in view; the track's
 * own scroll progress drives the spider's reconstruction, and the sticky stage
 * releases naturally into Featured Projects once the spider is complete. No
 * wheel hijacking, no preventDefault, no manual scroll locking, and no React
 * state per frame — everything is MotionValue-driven.
 *
 * Layout differs by tier:
 *  - Desktop / tablet-wide: text and spider side by side inside the pinned
 *    stage (the existing composition).
 *  - Stacked (mobile + tablet): the pinned stage is the spider ALONE, so the
 *    fragments are the first thing seen; the Hero text block follows *below*
 *    the track and only scrolls in after the stage releases.
 */

// Total scroll distance of the Hero track, per tier.
const TRACK_VH = { desktop: 220, stacked: 240 };
// Assembly consumes this much of the track; the remainder is a completion
// hold where the finished spider simply sits, fully assembled, in view.
const ASSEMBLY_END = 0.8;

function HeroCopy({ onViewProjects }) {
  return (
    <div className="max-w-2xl">
      {/* Brand lockup */}
      <div className="mb-6 flex items-center gap-3">
        <MVLogo size={40} burstOnMount />
        <span className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--text-muted)]">
          {profile.name}
        </span>
      </div>

      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--accent-red-text)]">
        {profile.role}
      </p>

      <Reveal
        as="h1"
        className="text-4xl font-bold uppercase leading-[0.98] tracking-tight text-[var(--text)] sm:text-6xl lg:text-7xl"
      >
        Building systems
        <br />
        that work{" "}
        <span className="text-[var(--accent-red)]">beyond the interface</span>.
      </Reveal>

      <p className="mt-6 max-w-xl text-base leading-relaxed text-[var(--text-muted)] sm:text-lg">
        {profile.summary}
      </p>

      <div className="mt-10">
        <button
          type="button"
          onClick={onViewProjects}
          className="group inline-flex items-center gap-2 rounded-full bg-[var(--accent-red)] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-transform hover:-translate-y-0.5"
        >
          View Projects
          <ArrowRight
            size={18}
            className="transition-transform group-hover:translate-x-1"
          />
        </button>
      </div>
    </div>
  );
}

/**
 * The spider stage: atmospheric glow → faint MV emblem → web geometry →
 * glass sheen → the fragmented theme spider.
 */
function SpiderStage({ progress, emblemX, stageFloatY, still }) {
  return (
    <div className="relative flex w-full items-center justify-center">
      {/* Soft brand glow pool behind the spider. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(48% 46% at 55% 44%, color-mix(in srgb, var(--accent-red) 20%, transparent), transparent 70%), radial-gradient(40% 40% at 40% 66%, color-mix(in srgb, var(--accent-blue) 18%, transparent), transparent 72%)",
        }}
      />

      {/* Faint MV emblem motif behind the spider — reads as atmosphere. */}
      <motion.img
        src="/assets/branding/mv-logo-icon.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute w-[58%] max-w-[380px] opacity-[0.10]"
        style={still ? undefined : { x: emblemX, y: stageFloatY }}
      />

      {/* Web geometry over the stage's upper-right. */}
      <img
        src="/assets/overlays/web-overlay.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -right-8 -top-6 hidden w-[46%] max-w-[300px] rotate-90 opacity-[0.16] mix-blend-luminosity lg:block"
      />

      {/* Glass sheen sweeping across the stage. */}
      <img
        src="/assets/textures/glass-reflection.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-40 mix-blend-screen"
      />

      {/* The Hero's centrepiece: theme-specific mechanical spider that
          reconstructs itself under the track's scroll progress. */}
      <motion.div
        className="relative mx-auto w-[78vw] max-w-[360px] sm:max-w-[430px] lg:w-[42vw] lg:max-w-[620px]"
        style={still ? undefined : { y: stageFloatY }}
      >
        <FragmentedHeroSpider progress={progress} />
      </motion.div>
    </div>
  );
}

function HeroBackdrop({ style }) {
  return (
    <>
      {/* Local glow accent, layered over the global city scene. */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(55% 55% at 18% 20%, color-mix(in srgb, var(--accent-red) 14%, transparent), transparent 70%), radial-gradient(50% 50% at 88% 78%, color-mix(in srgb, var(--accent-blue) 12%, transparent), transparent 70%)",
          ...style,
        }}
      />

      {/* Production web-overlay asset, pinned to the top-left corner.
          Decorative, inert, and faint so it never competes with the headline. */}
      <img
        src="/assets/overlays/web-overlay.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -left-16 -top-16 hidden w-[34vw] max-w-[520px] opacity-[0.12] mix-blend-luminosity md:block"
      />

      {/* Sparse comic glitch fragments — desktop/tablet only, very subtle. */}
      <GlitchFragments
        count={8}
        seed={31}
        className="pointer-events-none absolute inset-0 hidden opacity-70 md:block"
      />
    </>
  );
}

export default function HeroSection() {
  const trackRef = useRef(null);
  const { pointer, prefersReducedMotion, isMobile, isTablet } =
    useMotionContext();
  const { navigateToSection } = useSceneNavigation();

  // Mobile and tablet both stack, so both need the spider-first narrative.
  const stacked = isMobile || isTablet;

  // Direct, unembellished navigation — no character choreography, no delay.
  const handleViewProjects = useCallback(
    () => navigateToSection("featured-projects", { source: "hero-cta" }),
    [navigateToSection]
  );

  // Track progress: 0 when the track's top meets the viewport top (the sticky
  // stage pins) → 1 when the track's bottom meets the viewport bottom (the
  // stage releases).
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  // Assembly finishes at ASSEMBLY_END; the tail is the completion hold.
  const assembly = useTransform(scrollYProgress, [0, ASSEMBLY_END], [0, 1], {
    clamp: true,
  });

  // Restrained pointer parallax on the local glow + a gentle scroll drift.
  const parallaxX = useTransform(pointer.x, [-1, 1], [-10, 10]);
  const parallaxY = useTransform(pointer.y, [-1, 1], [-8, 8]);
  const scrollDrift = useTransform(scrollYProgress, [0, 1], [0, 24]);
  const backdropY = useTransform([parallaxY, scrollDrift], ([p, s]) => p + s);
  const stageFloatY = useTransform(pointer.y, [-1, 1], [6, -6]);
  const emblemX = useTransform(pointer.x, [-1, 1], [10, -10]);

  // --- Reduced motion: no track, no pinning, no meaningless scrubbing. -----
  if (prefersReducedMotion) {
    return (
      <section
        id="home"
        className="relative overflow-x-clip px-4 pb-16 pt-24 sm:px-6"
      >
        <HeroBackdrop />
        <div className="relative mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Assembled spider first on stacked layouts, per the narrative. */}
          <div className="order-1 lg:order-2">
            <SpiderStage still />
          </div>
          <div className="order-2 lg:order-1">
            <HeroCopy onViewProjects={handleViewProjects} />
          </div>
        </div>
      </section>
    );
  }

  // --- Stacked (mobile / tablet): pinned spider FIRST, then the copy. ------
  if (stacked) {
    return (
      <section id="home" className="relative overflow-x-clip">
        {/* Tall scroll track → sticky spider stage → natural release. */}
        <div
          ref={trackRef}
          className="relative"
          style={{ height: `${TRACK_VH.stacked}vh` }}
        >
          <div className="sticky top-0 flex h-[100svh] items-center justify-center overflow-x-clip px-4 sm:px-6">
            <HeroBackdrop style={{ x: parallaxX, y: backdropY }} />
            <SpiderStage
              progress={assembly}
              emblemX={emblemX}
              stageFloatY={stageFloatY}
            />
          </div>
        </div>

        {/* Hero text scrolls in below the released stage — it never overlaps
            the assembly. */}
        <div className="relative mx-auto w-full max-w-6xl px-4 pb-16 pt-4 sm:px-6">
          <HeroCopy onViewProjects={handleViewProjects} />
        </div>
      </section>
    );
  }

  // --- Desktop: pinned side-by-side composition. ---------------------------
  return (
    <section id="home" className="relative overflow-x-clip">
      <div
        ref={trackRef}
        className="relative"
        style={{ height: `${TRACK_VH.desktop}vh` }}
      >
        <div className="sticky top-0 flex h-[100svh] items-center overflow-x-clip px-4 pt-16 sm:px-6">
          <HeroBackdrop style={{ x: parallaxX, y: backdropY }} />
          <div className="relative mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <HeroCopy onViewProjects={handleViewProjects} />
            <SpiderStage
              progress={assembly}
              emblemX={emblemX}
              stageFloatY={stageFloatY}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
