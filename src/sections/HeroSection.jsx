import React from "react";
import { ArrowRight } from "lucide-react";
import { profile } from "../data/profile";
import { scrollToId } from "../utils/scroll";

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center overflow-hidden px-4 pt-16 sm:px-6"
    >
      {/* Tasteful CSS-only temporary backdrop (no artwork/images yet). */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(60% 60% at 20% 15%, color-mix(in srgb, var(--red) 16%, transparent), transparent 70%), radial-gradient(55% 55% at 85% 90%, color-mix(in srgb, var(--blue) 14%, transparent), transparent 70%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-6xl">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-[var(--red)]">
          {profile.role}
        </p>

        <h1 className="max-w-4xl text-4xl font-bold leading-[1.05] tracking-tight text-[var(--text)] sm:text-6xl lg:text-7xl">
          Building interfaces people can{" "}
          <span className="text-[var(--red)]">actually use</span>.
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--text-muted)] sm:text-lg">
          {profile.summary}
        </p>

        <div className="mt-10">
          <button
            type="button"
            onClick={() => scrollToId("featured-projects")}
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
