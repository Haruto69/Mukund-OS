import React from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Restrained cinematic progress readout: `01 / 03` plus a thin red→blue rail.
 * Optional slim prev/next controls exist primarily for keyboard users — they
 * are deliberately small so they never dominate the layout.
 */
export default function CarouselProgress({
  index = 0,
  total = 0,
  progress,
  onPrev,
  onNext,
  showControls = false,
  className = "",
}) {
  const pad = (n) => String(n).padStart(2, "0");
  const staticFraction = total > 1 ? index / (total - 1) : 1;

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <p
        className="shrink-0 text-xs font-semibold tracking-[0.28em] text-[var(--text-muted)]"
        aria-live="polite"
      >
        <span className="text-[var(--text)]">{pad(index + 1)}</span>
        <span className="mx-1 opacity-50">/</span>
        {pad(total)}
      </p>

      <div
        aria-hidden="true"
        className="h-[2px] w-24 overflow-hidden rounded-full bg-[var(--border)] sm:w-40"
      >
        <motion.div
          className="h-full w-full origin-left rounded-full"
          style={{
            background:
              "linear-gradient(90deg, var(--accent-red), var(--accent-blue))",
            ...(progress ? { scaleX: progress } : { scaleX: staticFraction }),
          }}
        />
      </div>

      {showControls && (
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={onPrev}
            disabled={index <= 0}
            aria-label="Previous project"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border)] text-[var(--text)] transition-colors hover:border-[var(--accent-red)] hover:text-[var(--accent-red)] disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-[var(--border)] disabled:hover:text-[var(--text)]"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type="button"
            onClick={onNext}
            disabled={index >= total - 1}
            aria-label="Next project"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border)] text-[var(--text)] transition-colors hover:border-[var(--accent-blue)] hover:text-[var(--accent-blue)] disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-[var(--border)] disabled:hover:text-[var(--text)]"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
