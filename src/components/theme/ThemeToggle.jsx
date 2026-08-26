import React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme, THEMES } from "./ThemeProvider";

/**
 * Simple, functional theme control for Pass 1.
 * The final Spider-Man-themed toggle artwork comes in a later pass.
 */
export default function ThemeToggle({ className = "" }) {
  const { theme, isDark, toggleTheme } = useTheme();
  const nextLabel = isDark ? "Peter (light)" : "Miles (dark)";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-sm font-medium text-[var(--text)] transition-colors hover:border-[var(--red)] ${className}`}
      aria-label={`Switch theme. Current: ${theme}. Switch to ${nextLabel}.`}
      title={`Switch to ${nextLabel}`}
    >
      {isDark ? (
        <Sun size={16} aria-hidden="true" />
      ) : (
        <Moon size={16} aria-hidden="true" />
      )}
      <span className="hidden sm:inline capitalize">
        {theme === THEMES.MILES ? "Miles" : "Peter"}
      </span>
    </button>
  );
}
