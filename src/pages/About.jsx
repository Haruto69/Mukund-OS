import React from "react";
import { motion } from "framer-motion";
import { Icon } from "../components/Icon";

export default function About() {
  const focusAreas = [
    { label: "Frontend development", icon: "Monitor" },
    { label: "Full-stack projects", icon: "Layers3" },
    { label: "Cybersecurity foundations", icon: "ShieldCheck" },
    { label: "DSA with Java", icon: "Code2" },
  ];

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-red-500/[0.06] pb-3">
        <span className="font-mono text-[9px] uppercase tracking-wider text-red-400/50">
          System Dossier
        </span>
      </div>

      <section className="rounded-lg border border-red-500/10 bg-[#0c0810]/40 p-4">
        <p className="text-sm leading-7 text-slate-300">
          I&apos;m Mukund V, a Computer Science and Engineering student
          specializing in Cyber Security. I&apos;m currently transitioning into
          frontend and full-stack development by building practical, deployed
          projects.
        </p>
      </section>

      <div>
        <h3 className="mb-3 font-mono text-[10px] uppercase tracking-wider text-slate-500">
          Focus Areas
        </h3>
        <div className="grid gap-2 sm:grid-cols-2">
          {focusAreas.map((area) => (
            <div
              key={area.label}
              className="flex items-center gap-2.5 rounded-lg border border-white/[0.04] bg-white/[0.02] px-3 py-2.5 transition hover:border-red-500/15 hover:bg-red-500/[0.03]"
            >
              <Icon
                name={area.icon}
                className="h-3.5 w-3.5 text-red-400/50"
              />
              <span className="text-xs text-slate-300">{area.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
