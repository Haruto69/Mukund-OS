import React from "react";
import PageShell from "../components/PageShell";

const focusAreas = [
  "Frontend development",
  "Full-stack projects",
  "Cybersecurity foundations",
  "DSA with Java",
];

export default function About() {
  return (
    <PageShell
      eyebrow="Profile"
      title="About Mukund"
      description="A focused snapshot of the person behind the projects."
    >
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-lg border border-white/10 bg-slate-950/55 p-6">
          <p className="text-lg leading-8 text-slate-200">
            I&apos;m Mukund V, a Computer Science and Engineering student specializing in Cyber Security. I&apos;m currently transitioning into frontend and full-stack development by building practical, deployed projects.
          </p>
        </section>

        <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
          {focusAreas.map((area) => (
            <div key={area} className="rounded-lg border border-white/10 bg-white/[0.04] px-4 py-4 text-slate-200">
              {area}
            </div>
          ))}
        </section>
      </div>
    </PageShell>
  );
}
