import React from "react";
import Section from "./Section";
import Reveal from "../components/motion/Reveal";
import { profile } from "../data/profile";

export default function AboutSection() {
  return (
    <Section id="about" eyebrow="Who I am" title="About">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-5">
          <Reveal as="p" className="text-lg leading-relaxed text-[var(--text)]">
            {profile.whyFrontend}
          </Reveal>
          <p className="leading-relaxed text-[var(--text-muted)]">
            {profile.currentDirection.text}
          </p>
          <p className="leading-relaxed text-[var(--text-muted)]">
            {profile.securityFoundation.text}
          </p>

          <ul className="flex flex-wrap gap-2 pt-2">
            {profile.currentDirection.focusChips.map((chip) => (
              <li
                key={chip}
                className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-sm text-[var(--text-muted)]"
              >
                {chip}
              </li>
            ))}
          </ul>
        </div>

        <aside className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5">
          <dl className="space-y-4 text-sm">
            <div>
              <dt className="text-[var(--text-muted)]">Background</dt>
              <dd className="mt-1 font-medium text-[var(--text)]">
                {profile.background}
              </dd>
            </div>
            <div>
              <dt className="text-[var(--text-muted)]">Institution</dt>
              <dd className="mt-1 font-medium text-[var(--text)]">
                {profile.college}
              </dd>
            </div>
            <div>
              <dt className="text-[var(--text-muted)]">Status</dt>
              <dd className="mt-1 font-medium text-[var(--text)]">
                {profile.status}
              </dd>
            </div>
          </dl>
        </aside>
      </div>
    </Section>
  );
}
