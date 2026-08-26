import React from "react";

/**
 * Shared <section> wrapper: stable DOM id (for navbar scrolling), consistent
 * vertical rhythm, and an optional eyebrow + heading. Placeholder-friendly so
 * each Pass-1 section stays small and focused.
 */
export default function Section({
  id,
  eyebrow,
  title,
  children,
  className = "",
}) {
  return (
    <section
      id={id}
      className={`mx-auto max-w-6xl scroll-mt-20 px-4 py-20 sm:px-6 sm:py-24 ${className}`}
    >
      {(eyebrow || title) && (
        <header className="mb-10">
          {eyebrow && (
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--red)]">
              {eyebrow}
            </p>
          )}
          {title && (
            <h2 className="text-3xl font-bold tracking-tight text-[var(--text)] sm:text-4xl">
              {title}
            </h2>
          )}
        </header>
      )}
      {children}
    </section>
  );
}
