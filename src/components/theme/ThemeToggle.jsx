import React from "react";
import { useTheme, THEMES } from "./ThemeProvider";
import { useThemeTransition } from "../../motion/ThemeTransitionProvider";

/**
 * Polished Peter/Miles theme control.
 *
 * - Routes through requestThemeChange() so it drives the theme-transition
 *   state machine (shutter overlay) rather than swapping instantly.
 * - Uses a compact spider/web-node glyph (original geometry — not an official
 *   icon) plus Peter/Miles palette cues rather than a generic sun/moon pill.
 * - Fully labelled/accessible; clear hover + focus states.
 */
export default function ThemeToggle({ className = "" }) {
  const { theme, isDark } = useTheme();
  const { requestThemeChange, isTransitioning } = useThemeTransition();
  const nextLabel = isDark ? "Peter (light)" : "Miles (dark)";

  return (
    <button
      type="button"
      onClick={() => requestThemeChange()}
      disabled={isTransitioning}
      className={`group inline-flex items-center gap-2 rounded-full border border-[var(--nav-border)] bg-[color-mix(in_srgb,var(--surface)_70%,transparent)] px-3 py-1.5 text-sm font-medium text-[var(--text)] backdrop-blur-sm transition-colors hover:border-[var(--accent-red)] disabled:opacity-60 ${className}`}
      aria-label={`Switch theme. Current: ${theme}. Switch to ${nextLabel}.`}
      title={`Switch to ${nextLabel}`}
    >
      {/* Web-node glyph — a central node with radiating web strands. The
          strand colors carry the theme cue (warm/red for Peter, crimson/blue
          for Miles); the whole thing rotates a touch on hover. */}
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="transition-transform duration-300 group-hover:rotate-45"
      >
        <g
          stroke={isDark ? "var(--accent-red)" : "var(--accent-warm)"}
          strokeWidth="1.4"
          strokeLinecap="round"
          opacity="0.9"
        >
          <line x1="12" y1="12" x2="12" y2="3" />
          <line x1="12" y1="12" x2="19" y2="7" />
          <line x1="12" y1="12" x2="20" y2="15" />
          <line x1="12" y1="12" x2="14" y2="21" />
          <line x1="12" y1="12" x2="5" y2="19" />
          <line x1="12" y1="12" x2="4" y2="10" />
          <line x1="12" y1="12" x2="7" y2="4" />
        </g>
        {/* Concentric web rings */}
        <g
          fill="none"
          stroke={isDark ? "var(--accent-blue)" : "var(--accent-red)"}
          strokeWidth="1.1"
          opacity="0.75"
        >
          <path d="M12 8 L16 11 L14 16 L9 15 L8 10 Z" />
        </g>
        <circle cx="12" cy="12" r="1.4" fill="var(--text)" />
      </svg>
      <span className="hidden capitalize sm:inline">
        {theme === THEMES.MILES ? "Miles" : "Peter"}
      </span>
    </button>
  );
}
