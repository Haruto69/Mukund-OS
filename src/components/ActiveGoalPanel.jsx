import React from "react";
import { motion } from "framer-motion";
import { Icon } from "./Icon";

const rewards = [
  "Strong portfolio",
  "Internship readiness",
  "Frontend confidence",
  "Better interview storytelling",
];

export default function ActiveGoalPanel() {
  return (
    <motion.aside
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
      className="rounded-lg border border-red-500/20 bg-[#0c0810]/80 p-4 backdrop-blur-sm"
    >
      {/* Header */}
      <div className="mb-4 flex items-center gap-2">
        <Icon name="Target" className="h-4 w-4 text-red-400" />
        <span className="font-mono text-xs font-bold uppercase tracking-wider text-red-400">
          Active Goal
        </span>
      </div>

      {/* Goal */}
      <h3 className="mb-2 text-sm font-semibold text-white">
        Build Internship-Ready Frontend Portfolio
      </h3>
      <p className="mb-4 text-xs leading-5 text-slate-400">
        Create a polished React portfolio with interactive resume modules,
        project case studies, and recruiter-friendly interview mode.
      </p>

      {/* Rewards */}
      <div>
        <p className="mb-2 font-mono text-[10px] uppercase tracking-wider text-slate-500">
          Rewards
        </p>
        <div className="space-y-1.5">
          {rewards.map((reward) => (
            <div
              key={reward}
              className="flex items-center gap-2 rounded border border-white/[0.05] bg-white/[0.02] px-2.5 py-1.5"
            >
              <span className="h-1 w-1 rounded-full bg-red-400/60" />
              <span className="text-[11px] text-slate-300">{reward}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.aside>
  );
}
