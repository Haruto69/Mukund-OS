import React from "react";
import Section from "./Section";
import { experience } from "../data/experience";

export default function ExperienceSection() {
  return (
    <Section id="experience" eyebrow="Timeline" title="Experience">
      <ol className="relative space-y-8 border-l border-[var(--border)] pl-6">
        {experience.map((item, i) => (
          <li key={`${item.role}-${i}`} className="relative">
            <span
              aria-hidden="true"
              className="absolute -left-[27px] top-1.5 h-3 w-3 rounded-full bg-[var(--red)]"
            />
            <div className="flex flex-wrap items-baseline justify-between gap-x-4">
              <h3 className="text-lg font-semibold text-[var(--text)]">
                {item.role}
              </h3>
              <span className="text-sm text-[var(--text-muted)]">
                {item.duration}
              </span>
            </div>
            <p className="text-sm font-medium text-[var(--blue)]">
              {item.company}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
              {item.description}
            </p>
            {item.highlights?.length > 0 && (
              <ul className="mt-3 flex flex-wrap gap-2">
                {item.highlights.map((h) => (
                  <li
                    key={h}
                    className="rounded-full border border-[var(--border)] px-3 py-1 text-xs text-[var(--text-muted)]"
                  >
                    {h}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ol>
    </Section>
  );
}
