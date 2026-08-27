import React, { useRef } from "react";
import { motion, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { profile } from "../data/profile";
import { useMotionContext } from "../motion/MotionProvider";
import { useSceneNavigation } from "../motion/SceneNavigationProvider";
import { useSectionProgress } from "../hooks/useSectionProgress";
import Reveal from "../components/motion/Reveal";
import MVLogo from "../components/branding/MVLogo";
import CharacterStage from "../components/character/CharacterStage";
import GlitchFragments from "../components/decor/GlitchFragments";

/**
 * First art-directed Hero.
 *
 * Editorial, spacious composition: brand lockup + eyebrow, a large cinematic
 * headline, a short intro, and a single CTA on the left; deliberate negative
 * space on the right holding the (currently empty) hanging-character slot so a
 * later approved Spider-Man asset can descend from the top and hang without any
 * layout change. The city scene + glass live behind this globally.
 */
export default function HeroSection() {
  const sectionRef = useRef(null);
  const { pointer, prefersReducedMotion } = useMotionContext();
  const { navigateToSection } = useSceneNavigation();
  const { progress } = useSectionProgress(sectionRef);

  // Restrained pointer parallax on the local glow + a gentle scroll drift.
  const parallaxX = useTransform(pointer.x, [-1, 1], [-10, 10]);
  const parallaxY = useTransform(pointer.y, [-1, 1], [-8, 8]);
  const scrollDrift = useTransform(progress, [0, 1], [0, 24]);
  const backdropY = useTransform([parallaxY, scrollDrift], ([p, s]) => p + s);
  const charFloatY = useTransform(pointer.y, [-1, 1], [6, -6]);
  const emblemX = useTransform(pointer.x, [-1, 1], [10, -10]);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative flex min-h-[100svh] items-center overflow-hidden px-4 pt-16 sm:px-6"
    >
      {/* Local glow accent, layered over the global city scene. */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(55% 55% at 18% 20%, color-mix(in srgb, var(--accent-red) 14%, transparent), transparent 70%), radial-gradient(50% 50% at 88% 78%, color-mix(in srgb, var(--accent-blue) 12%, transparent), transparent 70%)",
          ...(prefersReducedMotion ? {} : { x: parallaxX, y: backdropY }),
        }}
      />

      {/* Production web-overlay asset, pinned to the top-left corner. Decorative,
          inert, and faint so it never competes with the headline. */}
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

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[1.12fr_0.88fr]">
        {/* Left — typography column */}
        <div className="max-w-2xl">
          {/* Brand lockup */}
          <div className="mb-6 flex items-center gap-3">
            <MVLogo size={40} burstOnMount />
            <span className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--text-muted)]">
              {profile.name}
            </span>
          </div>

          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--accent-red)]">
            {profile.role}
          </p>

          <Reveal
            as="h1"
            className="text-4xl font-bold uppercase leading-[0.98] tracking-tight text-[var(--text)] sm:text-6xl lg:text-7xl"
          >
            Building interfaces
            <br />
            people can{" "}
            <span className="text-[var(--accent-red)]">actually use</span>.
          </Reveal>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-[var(--text-muted)] sm:text-lg">
            {profile.summary}
          </p>

          <div className="mt-10">
            <button
              type="button"
              onClick={() =>
                navigateToSection("featured-projects", { source: "hero-cta" })
              }
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

        {/* Right — layered brand stage. Depth order (back → front):
            atmospheric glow → large MV emblem motif → web geometry → glass
            sheen → reserved hanging-character slot. Hidden on mobile so it
            never crowds the content. */}
        <div className="relative hidden min-h-[62vh] items-center justify-center lg:flex">
          {/* Soft brand glow pool behind the emblem. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(48% 46% at 55% 44%, color-mix(in srgb, var(--accent-red) 20%, transparent), transparent 70%), radial-gradient(40% 40% at 40% 66%, color-mix(in srgb, var(--accent-blue) 18%, transparent), transparent 72%)",
            }}
          />

          {/* Faint MV emblem motif behind the figure — reads as atmosphere,
              never competing with the hanging character in front of it. */}
          <motion.img
            src="/assets/branding/mv-logo-icon.svg"
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute w-[64%] max-w-[380px] opacity-[0.14]"
            style={
              prefersReducedMotion ? undefined : { x: emblemX, y: charFloatY }
            }
          />

          {/* Web geometry over the emblem's upper-right. */}
          <img
            src="/assets/overlays/web-overlay.svg"
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute -right-8 -top-6 w-[46%] max-w-[300px] rotate-90 opacity-[0.16] mix-blend-luminosity"
          />

          {/* Glass sheen sweeping across the stage. */}
          <img
            src="/assets/textures/glass-reflection.svg"
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-40 mix-blend-screen"
          />

          {/* Reserved hanging-character slot — sits in front of the brand
              stage, behind foreground content. A supplied Spider-Man asset
              descends here later with no layout change. */}
          <motion.div
            className="absolute inset-0"
            style={prefersReducedMotion ? undefined : { y: charFloatY }}
          >
            <CharacterStage pose="hang" showPlaceholder={false} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
