import React from "react";
import { ExternalLink, Github } from "lucide-react";

/**
 * Basic project card for Pass 1. The final cinematic carousel / poster
 * treatment is intentionally deferred to a later pass.
 */
export default function ProjectCard({ project }) {
  const { title, type, status, description, tech = [], links = {} } = project;

  return (
    <article className="flex h-full flex-col rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 transition-colors hover:border-[var(--red)]">
      <div className="mb-3 flex items-center justify-between gap-3">
        <span className="text-xs font-medium uppercase tracking-wide text-[var(--text-muted)]">
          {type}
        </span>
        {status && (
          <span className="rounded-full border border-[var(--border)] px-2 py-0.5 text-[10px] uppercase tracking-wide text-[var(--text-muted)]">
            {status}
          </span>
        )}
      </div>

      <h3 className="text-lg font-semibold text-[var(--text)]">{title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--text-muted)]">
        {description}
      </p>

      {tech.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {tech.slice(0, 5).map((t) => (
            <li
              key={t}
              className="rounded border border-[var(--border)] px-2 py-0.5 text-[11px] text-[var(--text-muted)]"
            >
              {t}
            </li>
          ))}
        </ul>
      )}

      {(links.showLive && links.live) || (links.showSource && links.github) ? (
        <div className="mt-5 flex items-center gap-4">
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
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--text)] hover:text-[var(--red)]"
            >
              <Github size={15} /> Source
            </a>
          )}
        </div>
      ) : null}
    </article>
  );
}
