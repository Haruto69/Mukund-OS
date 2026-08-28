import React from "react";
import {
  FileText,
  Download,
  Mail,
  Phone,
  Linkedin,
  Github,
  ExternalLink,
} from "lucide-react";
import Section from "./Section";
import {
  RESUME_URL,
  resumeIdentity,
  resumeSummary,
  resumeSkills,
  resumeProjects,
  resumeExperience,
  resumeEducation,
  resumeAchievements,
} from "../data/resume";

/**
 * Resume — a native HTML "credential dossier", not a PDF embed.
 *
 * Every string rendered here comes from `src/data/resume.js`, which is a
 * verbatim transcription of `public/Mukund_V_Resume.pdf`. Nothing is merged in
 * from `projects.js` / `experience.js` / `profile.js`, and the section order
 * follows the PDF exactly. The PDF itself stays reachable through the View /
 * Download controls.
 *
 * Layout: one coherent document surface rather than a field of floating cards.
 * Blocks run in the PDF's own order top to bottom at every breakpoint — no
 * side rail reshuffling the reading sequence — with prose held to a
 * comfortable measure inside the wide panel and the Skills block expanding
 * into a two-column grid on desktop so the surface never goes empty.
 * Deliberately NOT a timeline — the Experience section already owns that.
 */

const CONTACT_ICONS = {
  phone: Phone,
  email: Mail,
  linkedin: Linkedin,
  github: Github,
};

/** Shared heading rule for each block of the document. */
function DocHeading({ children, id }) {
  return (
    <h3
      id={id}
      className="mb-4 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em] text-[var(--text)]"
    >
      <span>{children}</span>
      <span
        aria-hidden="true"
        className="h-px flex-1 bg-gradient-to-r from-[var(--accent-red)] via-[var(--accent-blue)] to-transparent opacity-60"
      />
    </h3>
  );
}

/** Bulleted list with a small red marker, used for every bullet block. */
function Bullets({ items }) {
  return (
    <ul className="space-y-2">
      {items.map((text) => (
        <li
          key={text}
          className="relative pl-5 text-sm leading-relaxed text-[var(--text-muted)]"
        >
          <span
            aria-hidden="true"
            className="absolute left-0 top-[0.55em] h-1.5 w-1.5 rounded-[1px] bg-[var(--accent-red)]"
          />
          {text}
        </li>
      ))}
    </ul>
  );
}

/** The View / Download pair. Rendered above the document and again below it. */
function ResumeControls({ className = "" }) {
  return (
    <div className={`flex flex-col gap-3 sm:flex-row ${className}`}>
      <a
        href={RESUME_URL}
        target="_blank"
        rel="noreferrer noopener"
        className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--red)] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-transform hover:-translate-y-0.5"
      >
        <FileText size={18} aria-hidden="true" /> View Resume
      </a>
      <a
        href={RESUME_URL}
        download
        className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-[var(--text)] transition-colors hover:border-[var(--red)]"
      >
        <Download size={18} aria-hidden="true" /> Download Resume
      </a>
    </div>
  );
}

export default function ResumeSection() {
  return (
    <Section id="resume" eyebrow="Credentials" title="Resume">
      <p className="max-w-2xl text-[var(--text-muted)]">
        The full resume, rendered here in full. Open the original PDF in a new
        tab or download a copy.
      </p>

      <ResumeControls className="mt-8" />

      {/* The document surface. One panel, internally divided — not a grid of
          disconnected cards. */}
      <article
        aria-label="Resume of Mukund V"
        className="mt-10 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-sm"
      >
        {/* Identity header */}
        <header className="border-b border-[var(--border)] bg-[var(--surface-soft)] px-6 py-8 sm:px-10">
          <div
            aria-hidden="true"
            className="mb-6 h-1 w-24 rounded-full bg-gradient-to-r from-[var(--accent-red)] to-[var(--accent-blue)]"
          />
          <h3 className="text-2xl font-bold tracking-tight text-[var(--text)] sm:text-3xl">
            {resumeIdentity.name}
          </h3>
          <p className="mt-2 text-sm font-medium text-[var(--blue)] sm:text-base">
            {resumeIdentity.headline}
          </p>

          <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-3">
            {resumeIdentity.contacts.map((c) => {
              const Icon = CONTACT_ICONS[c.kind] ?? ExternalLink;
              return (
                <li key={c.href}>
                  <a
                    href={c.href}
                    {...(c.external
                      ? { target: "_blank", rel: "noreferrer noopener" }
                      : {})}
                    className="inline-flex items-center gap-2 break-all text-sm text-[var(--text-muted)] underline-offset-4 transition-colors hover:text-[var(--red)] hover:underline"
                  >
                    <Icon
                      size={15}
                      aria-hidden="true"
                      className="shrink-0 text-[var(--accent-red)]"
                    />
                    {c.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </header>

        {/* Body — PDF order: Summary, Technical Skills, Projects,
            Experience, Education, Achievements. */}
        <div className="space-y-10 px-6 py-8 sm:px-10 sm:py-10">
          <section aria-labelledby="resume-summary">
            <DocHeading id="resume-summary">Summary</DocHeading>
            <p className="max-w-[70ch] text-sm leading-relaxed text-[var(--text-muted)]">
              {resumeSummary}
            </p>
          </section>

          <section aria-labelledby="resume-skills">
            <DocHeading id="resume-skills">Technical Skills</DocHeading>
            <dl className="grid gap-x-10 gap-y-4 sm:grid-cols-2">
              {resumeSkills.map((group) => (
                <div key={group.label}>
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--blue)]">
                    {group.label}
                  </dt>
                  <dd className="mt-1 text-sm leading-relaxed text-[var(--text-muted)]">
                    {group.items}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          <section aria-labelledby="resume-projects">
            <DocHeading id="resume-projects">Projects</DocHeading>
            <div className="space-y-7">
              {resumeProjects.map((p) => (
                <article key={p.title} className="max-w-[80ch]">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h4 className="text-base font-semibold text-[var(--text)]">
                      {p.href ? (
                        <a
                          href={p.href}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="inline-flex items-center gap-1.5 underline-offset-4 transition-colors hover:text-[var(--red)] hover:underline"
                        >
                          {p.title}
                          <ExternalLink
                            size={14}
                            aria-hidden="true"
                            className="shrink-0 opacity-70"
                          />
                        </a>
                      ) : (
                        p.title
                      )}
                    </h4>
                    <span className="text-xs font-medium uppercase tracking-[0.12em] text-[var(--text-muted)]">
                      {p.dates}
                    </span>
                  </div>
                  <p className="mb-3 mt-1 text-sm font-medium text-[var(--blue)]">
                    {p.stack}
                  </p>
                  <Bullets items={p.bullets} />
                </article>
              ))}
            </div>
          </section>

          <section aria-labelledby="resume-experience">
            <DocHeading id="resume-experience">Experience</DocHeading>
            <div className="space-y-7">
              {resumeExperience.map((x) => (
                <article key={x.role} className="max-w-[80ch]">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h4 className="text-base font-semibold text-[var(--text)]">
                      {x.role}
                    </h4>
                    <span className="text-xs font-medium uppercase tracking-[0.12em] text-[var(--text-muted)]">
                      {x.dates}
                    </span>
                  </div>
                  <div className="mt-3">
                    <Bullets items={x.bullets} />
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section aria-labelledby="resume-education">
            <DocHeading id="resume-education">Education</DocHeading>
            {resumeEducation.map((e) => (
              <div
                key={e.institution}
                className="flex max-w-[80ch] flex-wrap items-baseline justify-between gap-x-6 gap-y-1"
              >
                <div>
                  <p className="text-sm font-semibold text-[var(--text)]">
                    {e.institution}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-[var(--text-muted)]">
                    {e.degree}
                  </p>
                </div>
                <div className="sm:text-right">
                  <p className="text-xs font-medium uppercase tracking-[0.12em] text-[var(--text-muted)]">
                    {e.dates}
                  </p>
                  {e.note && (
                    <p className="mt-1 text-sm font-semibold text-[var(--red)]">
                      {e.note}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </section>

          <section aria-labelledby="resume-achievements">
            <DocHeading id="resume-achievements">Achievements</DocHeading>
            <div className="max-w-[80ch]">
              <Bullets items={resumeAchievements} />
            </div>
          </section>
        </div>

        {/* Repeat the controls at the foot of the document. */}
        <footer className="border-t border-[var(--border)] bg-[var(--surface-soft)] px-6 py-6 sm:px-10">
          <ResumeControls />
        </footer>
      </article>
    </Section>
  );
}
