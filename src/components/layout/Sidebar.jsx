import React from "react";
import { motion } from "framer-motion";
import { Mail, Briefcase } from "lucide-react";
import { ProgressBar, StatusChip, CyberButton } from "../ui";
import { profile } from "../../data/profile";

export default function Sidebar({ children }) {
  return (
    <motion.aside 
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="cyber-panel hidden md:flex w-64 flex-col gap-4 p-4 shrink-0"
    >
      {/* Identity Block */}
      <div className="flex items-center gap-3 border-b border-primary-500/20 pb-4">
        <div className="flex h-12 w-12 items-center justify-center rounded bg-primary-500/10 border border-primary-500/30 shadow-glow-primary shrink-0">
          <span className="font-display text-lg font-bold text-primary-400">MV</span>
        </div>
        <div className="flex flex-col">
          <span className="font-display text-sm font-bold text-white tracking-widest uppercase">{profile.name}</span>
          <span className="font-mono text-[9px] text-slate-400">ACCESS_LEVEL: ADMIN</span>
        </div>
      </div>

      {/* Profile Details */}
      <div className="flex-1 space-y-4 overflow-y-auto no-scrollbar mt-2">
        <div className="flex flex-col gap-1">
          <span className="font-mono text-[9px] uppercase tracking-wider text-slate-500">Current Role</span>
          <span className="font-sans text-xs text-primary-400 font-bold">{profile.role}</span>
        </div>

        <div className="flex flex-col gap-1">
          <span className="font-mono text-[9px] uppercase tracking-wider text-slate-500">Background</span>
          <span className="font-sans text-[11px] text-slate-300 leading-snug">{profile.background}</span>
        </div>

        <div className="flex flex-col gap-2 pt-2 border-t border-white/5">
          <span className="font-mono text-[9px] uppercase tracking-wider text-slate-500">Availability</span>
          <StatusChip label="OPEN FOR INTERNSHIPS" variant="online" pulse />
        </div>

        <div className="flex flex-col gap-2 pt-2 border-t border-white/5">
          <span className="font-mono text-[9px] uppercase tracking-wider text-slate-500">Current Focus</span>
          <div className="flex flex-wrap gap-1.5">
            <span className="px-1.5 py-0.5 rounded border border-white/10 bg-white/5 font-mono text-[9px] text-slate-400">React</span>
            <span className="px-1.5 py-0.5 rounded border border-white/10 bg-white/5 font-mono text-[9px] text-slate-400">Tailwind</span>
            <span className="px-1.5 py-0.5 rounded border border-white/10 bg-white/5 font-mono text-[9px] text-slate-400">JavaScript</span>
            <span className="px-1.5 py-0.5 rounded border border-primary-500/20 bg-primary-500/10 font-mono text-[9px] text-primary-300">Java DSA</span>
          </div>
        </div>

        <div className="pt-4">
          <CyberButton to="/contact" variant="primary" size="sm" icon={Mail} className="w-full">
            Open Connection
          </CyberButton>
        </div>
      </div>

      {/* Memory Usage Meter (Preserved) */}
      <div className="mt-auto border-t border-primary-500/20 pt-4 flex flex-col gap-3">
        <ProgressBar label="MEM_USAGE" value={32} showValue className="mt-1" />
      </div>
      
      {children}
    </motion.aside>
  );
}
