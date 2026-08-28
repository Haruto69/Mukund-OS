import React, { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, Github, X } from "lucide-react";
import { useMotionContext } from "../../motion/MotionProvider";

/**
 * TEMPORARY lightweight detail panel for a selected featured project.
 *
 * This is a placeholder for the future in-page case study (Spider-Man webs the
 * card → pulls it open → full-width case study). It exists only so the
 * "Explore project" affordance is not a dead control in this pass. It renders
 * existing project data verbatim and nothing else.
 *
 * Replacing it later means swapping what `FeaturedProjectsSection` renders for
 * `selectedProject` — the carousel's `onOpenProject` contract does not change.
 */
export default function ProjectPreviewPanel({ project, onClose }) {
  const { prefersReducedMotion } = useMotionContext();
  const closeRef = useRef(null);

  useEffect(() => {
    if (!project) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    return () => window.removeEventListener("keydown", onKey);
  }, [project, onClose]);

  const links = project?.links ?? {};
  const motionProps = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 16 },
        transition: { duration: 0.28, ease: "easeOut" },
      };

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 flex items-end justify-center p-0 sm:items-center sm:p-6"
          style={{ zIndex: "var(--z-overlay)" }}
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={prefersReducedMotion ? undefined : { opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            type="button"
            aria-label="Close project details"
            onClick={onClose}
            className="absolute inset-0 h-full w-full cursor-default bg-[color-mix(in_srgb,var(--comic-ink)_62%,transparent)]"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${project.title} details`}
            className="relative max-h-[86vh] w-full max-w-3xl overflow-y-auto rounded-t-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:rounded-2xl sm:p-8"
            {...motionProps}
          >
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--accent-red-text)]">
                  {project.type}
                </p>
                <h3 className="text-2xl font-bold tracking-tight text-[var(--text)]">
                  {project.title}
                </h3>
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Close project details"
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--border)] text-[var(--text)] transition-colors hover:border-[var(--accent-red)] hover:text-[var(--accent-red)]"
              >
                <X size={16} />
              </button>
            </div>

            <hr className="mv-divider my-5" />

            <p className="text-sm leading-relaxed text-[var(--text-muted)]">
              {project.description}
            </p>

            {project.tech?.length > 0 && (
              <ul className="mt-5 flex flex-wrap gap-1.5">
                {project.tech.map((t) => (
                  <li
                    key={t}
                    className="rounded border border-[var(--border)] px-2 py-0.5 text-[11px] text-[var(--text-muted)]"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            )}

            {((links.showLive && links.live) ||
              (links.showSource && links.github)) && (
              <div className="mt-6 flex items-center gap-5">
                {links.showLive && links.live && (
                  <a
                    href={links.live}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--blue)] hover:underline"
                  >
                    <ExternalLink size={15} /> Live
                  </a>
                )}
                {links.showSource && links.github && (
                  <a
                    href={links.github}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--text)] hover:text-[var(--accent-red)]"
                  >
                    <Github size={15} /> Source
                  </a>
                )}
              </div>
            )}

            <p className="mt-6 text-[11px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
              Full case study coming in a later pass
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
