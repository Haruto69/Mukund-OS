import React from "react";
import { motion } from "framer-motion";
import { Icon } from "./Icon";
import ProjectVisual from "./ProjectVisual";

const visualTypes = {
  "Nokia NBUC Generative AI Security Pipeline": "nokia",
  "DishaRakshak": "navigation",
  "Self-care MERN App": "wellness",
};

export default function ProjectCard({ project, index }) {
  const visualType = visualTypes[project.name];

  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.08 }}
      className="overflow-hidden rounded-lg border border-red-500/10 bg-[#0c0810]/60 transition hover:border-red-500/20 hover:shadow-[0_0_20px_rgba(232,69,69,0.05)]"
    >
      {/* Visual */}
      <ProjectVisual type={visualType} />

      {/* Content */}
      <div className="p-4">
        {/* Log Entry Label */}
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded border border-red-500/20 bg-red-500/[0.06]">
              <Icon name={project.icon} className="h-4 w-4 text-red-400" />
            </span>
            <div>
              <p className="font-mono text-[9px] uppercase tracking-wider text-red-400/60">
                Log Entry — {project.tag}
              </p>
              <h2 className="text-sm font-semibold text-white">{project.name}</h2>
            </div>
          </div>
        </div>

        <p className="mb-3 text-xs leading-5 text-slate-400">{project.description}</p>

        {/* Highlight */}
        <div className="mb-3 rounded border border-red-500/15 bg-red-500/[0.04] px-3 py-2">
          <p className="text-xs text-red-300/80">{project.highlight}</p>
        </div>

        {/* Tech tags */}
        <div className="mb-3 flex flex-wrap gap-1.5">
          {project.stack.map((item) => (
            <span
              key={item}
              className="rounded border border-white/[0.06] bg-white/[0.03] px-2 py-0.5 font-mono text-[10px] text-slate-400"
            >
              {item}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className="flex items-center gap-1.5 text-red-400/60">
          <span className="font-mono text-[10px] uppercase tracking-wider">View Module</span>
          <Icon name="ExternalLink" className="h-3 w-3" />
        </div>
      </div>
    </motion.article>
  );
}
