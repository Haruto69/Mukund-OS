import React from "react";
import { Icon } from "../components/Icon";

const focusAreas = [
  { label: "Frontend development", icon: "Monitor" },
  { label: "Full-stack projects", icon: "Layers3" },
  { label: "Cybersecurity foundations", icon: "ShieldCheck" },
  { label: "DSA with Java", icon: "Code2" },
];

export default function About() {
  return (
    <div className="space-y-5">
      <section className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-5">
        <p className="text-[15px] leading-7 text-slate-200">
          I&apos;m Mukund V, a Computer Science and Engineering student
          specializing in Cyber Security. I&apos;m currently transitioning into
          frontend and full-stack development by building practical, deployed
          projects.
        </p>
      </section>

      <div>
        <h3 className="mb-3 font-mono text-xs uppercase tracking-wider text-slate-500">
          Focus Areas
        </h3>
        <div className="grid gap-2 sm:grid-cols-2">
          {focusAreas.map((area) => (
            <div
              key={area.label}
              className="flex items-center gap-3 rounded-lg border border-white/[0.06] bg-white/[0.02] px-4 py-3 transition hover:border-white/[0.12] hover:bg-white/[0.04]"
            >
              <Icon
                name={area.icon}
                className="h-4 w-4 text-teal-400/70"
              />
              <span className="text-sm text-slate-200">{area.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
