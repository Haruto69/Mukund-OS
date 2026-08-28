import React from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import ProjectPoster from "./ProjectPoster";

/**
 * One large editorial featured-project card.
 *
 * `variant`:
 *   "cinematic" — depth/scale/opacity are driven by `activeFloat`, a shared
 *                 fractional carousel position (0..total-1). Restrained: no
 *                 rotation, no cover-flow, no blur.
 *   "static"    — no scroll-linked transforms (mobile swipe rail and
 *                 reduced-motion layouts).
 *
 * The card intentionally shows only index / title / category. Longer copy
 * belongs to the future expanded case study, reached through `onOpen`.
 */
export default function FeaturedProjectSlide({
  project,
  index,
  total,
  activeFloat,
  variant = "static",
  isActive = true,
  onOpen,
  onFocusSlide,
  className = "",
  style,
}) {
  const cinematic = variant === "cinematic";

  // Fallback so hook order stays stable when no shared position is supplied.
  const fallback = useMotionValue(index);
  const source = activeFloat ?? fallback;

  const distance = useTransform(source, (v) =>
    Math.min(Math.abs(v - index), 1)
  );
  const scale = useTransform(distance, [0, 1], [1, 0.92]);
  const opacity = useTransform(distance, [0, 1], [1, 0.55]);
  const depthY = useTransform(distance, [0, 1], [0, 22]);

  const label = `${String(index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;

  return (
    <motion.article
      className={`relative flex shrink-0 flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] ${className}`}
      style={{
        ...style,
        ...(cinematic ? { scale, opacity, y: depthY } : null),
        transformOrigin: "50% 55%",
        boxShadow:
          "0 24px 70px -30px color-mix(in srgb, var(--comic-ink) 55%, transparent)",
      }}
      aria-roledescription="slide"
      aria-label={`${project.title} — featured project ${index + 1} of ${total}`}
    >
      {/* Poster slot dominates the card. */}
      <div className="relative min-h-0 flex-1">
        <ProjectPoster project={project} index={index} />
      </div>

      {/* Compact footer: index, title, category, explore affordance. */}
      <div className="relative flex items-end justify-between gap-4 border-t border-[var(--border)] bg-[color-mix(in_srgb,var(--surface)_88%,transparent)] px-5 py-4 sm:px-7 sm:py-5">
        <div className="min-w-0">
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--accent-red-text)]">
            {label}
          </p>
          <h3 className="truncate text-xl font-bold tracking-tight text-[var(--text)] sm:text-2xl lg:text-3xl">
            {project.title}
          </h3>
          <p className="mt-1 truncate text-xs uppercase tracking-[0.18em] text-[var(--text-muted)] sm:text-sm">
            {project.type}
          </p>
        </div>

        <button
          type="button"
          onClick={() => onOpen?.(project)}
          onFocus={() => onFocusSlide?.(index)}
          className="group inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[var(--border)] px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--text)] transition-colors hover:border-[var(--accent-red)] hover:text-[var(--accent-red)] sm:px-5 sm:text-xs"
        >
          <span className="hidden sm:inline">Explore project</span>
          <span className="sm:hidden">Explore</span>
          <ArrowUpRight size={14} className="shrink-0" />
        </button>
      </div>

      {/* Active-card accent edge — theme-aware red→blue identity line. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] transition-opacity duration-300"
        style={{
          opacity: isActive ? 0.9 : 0.25,
          background:
            "linear-gradient(90deg, var(--accent-red), var(--accent-blue))",
        }}
      />
    </motion.article>
  );
}
