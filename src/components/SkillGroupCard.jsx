import React from "react";
import { motion } from "framer-motion";
import { Icon } from "./Icon";

export default function SkillGroupCard({ group, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: index * 0.05 }}
      className="rounded-lg border border-red-500/10 bg-[#0c0810]/60 p-4"
    >
      <div className="mb-3 flex items-center gap-2.5">
        <span className="grid h-8 w-8 place-items-center rounded border border-red-500/20 bg-red-500/[0.06]">
          <Icon name={group.icon} className="h-4 w-4 text-red-400" />
        </span>
        <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-white">
          {group.group}
        </h2>
        <span className="font-mono text-[8px] uppercase tracking-wider text-red-400/40">
          Loaded
        </span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {group.skills.map((skill) => (
          <span
            key={skill}
            className="rounded border border-white/[0.06] bg-white/[0.03] px-2.5 py-1 text-xs text-slate-300 transition hover:border-red-500/15 hover:bg-red-500/[0.04]"
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.article>
  );
}
