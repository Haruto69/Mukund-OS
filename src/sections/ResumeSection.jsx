import React from "react";
import { FileText, Download } from "lucide-react";
import Section from "./Section";

const RESUME_URL = "/Mukund_V_Resume.pdf";

export default function ResumeSection() {
  return (
    <Section id="resume" eyebrow="Credentials" title="Resume">
      <p className="max-w-2xl text-[var(--text-muted)]">
        View the full resume in your browser or download a copy.
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <a
          href={RESUME_URL}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--red)] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-transform hover:-translate-y-0.5"
        >
          <FileText size={18} /> View Resume
        </a>
        <a
          href={RESUME_URL}
          download
          className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-[var(--text)] transition-colors hover:border-[var(--red)]"
        >
          <Download size={18} /> Download Resume
        </a>
      </div>
    </Section>
  );
}
