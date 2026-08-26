import React, { useRef } from "react";
import { motion, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { profile } from "../data/profile";
import { useMotionContext } from "../motion/MotionProvider";
import { useSceneNavigation } from "../motion/SceneNavigationProvider";
import { useSectionProgress } from "../hooks/useSectionProgress";
import Reveal from "../components/motion/Reveal";

export default function HeroSection() {
  const sectionRef = useRef(null);
  const { pointer, prefersReducedMotion } = useMotionContext();
  const { navigateToSection } = useSceneNavigation();
  const { progress } = useSectionProgress(sectionRef);

  // Restrained temporary effects only: a few px of pointer parallax on the
  // CSS-only backdrop, and a gentle drift as the section scrolls away.
  const parallaxX = useTransform(pointer.x, [-1, 1], [-10, 10]);
  const parallaxY = useTransform(pointer.y, [-1, 1], [-8, 8]);
  const scrollDrift = useTransform(progress, [0, 1], [0, 24]);
  const backdropY = useTransform([parallaxY, scrollDrift], ([p, s]) => p + s);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative flex min-h-[100svh] items-center overflow-hidden px-4 pt-16 sm:px-6"
    >
      {/* Tasteful CSS-only temporary backdrop (no artwork/images yet). */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(60% 60% at 20% 15%, color-mix(in srgb, var(--red) 16%, transparent), transparent 70%), radial-gradient(55% 55% at 85% 90%, color-mix(in srgb, var(--blue) 14%, transparent), transparent 70%)",
          ...(prefersReducedMotion ? {} : { x: parallaxX, y: backdropY }),
        }}
      />

      <div className="relative mx-auto w-full max-w-6xl">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-[var(--red)]">
          {profile.role}
        </p>

        <Reveal as="h1" className="max-w-4xl text-4xl font-bold leading-[1.05] tracking-tight text-[var(--text)] sm:text-6xl lg:text-7xl">
          Building interfaces people can{" "}
          <span className="text-[var(--red)]">actually use</span>.
        </Reveal>

        <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--text-muted)] sm:text-lg">
          {profile.summary}
        </p>

        <div className="mt-10">
          <button
            type="button"
            onClick={() => navigateToSection("featured-projects", { source: "hero-cta" })}
            className="group inline-flex items-center gap-2 rounded-full bg-[var(--red)] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-transform hover:-translate-y-0.5"
          >
            View Projects
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </button>
        </div>
      </div>
    </section>
  );
}
