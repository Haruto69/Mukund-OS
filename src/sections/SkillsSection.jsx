import React from "react";
import Section from "./Section";
import { skills } from "../data/skills";

const CATEGORY_LABELS = {
  frontend: "Frontend",
  backend: "Backend",
  programming: "Programming",
  cybersecurity: "Cyber Security",
  tools: "Tools",
  learning: "Currently Learning",
};

export default function SkillsSection() {
  const categories = Object.entries(skills);

  return (
    <Section id="skills" eyebrow="Toolkit" title="Skills">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map(([key, group]) => (
          <div
            key={key}
            className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5"
          >
            <h3 className="text-sm font-semibold uppercase tracking-wide text-[var(--blue)]">
              {CATEGORY_LABELS[key] ?? key}
            </h3>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {group.skills.map((skill) => (
                <li
                  key={skill}
                  className="rounded border border-[var(--border)] px-2 py-0.5 text-[13px] text-[var(--text)]"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
