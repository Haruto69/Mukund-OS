import React from "react";
import { motion } from "framer-motion";
import { Icon } from "./Icon";

const focusItems = ["React", "Tailwind", "DSA with Java"];

export default function ProfileDossier() {
  return (
    <motion.aside
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
      className="rounded-lg border border-red-500/20 bg-[#0c0810]/80 p-4 backdrop-blur-sm"
    >
      {/* Cyber Avatar */}
      <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center">
        <div className="relative flex h-20 w-20 items-center justify-center rounded-full border-2 border-red-500/40 bg-[#0a0710]">
          <div className="absolute inset-0 rounded-full border border-red-500/10 animate-pulse" />
          <span className="font-mono text-2xl font-bold text-red-400">MV</span>
          <div className="absolute -inset-2 rounded-full border border-red-500/10" />
        </div>
      </div>

      {/* Name & Role */}
      <div className="mb-4 text-center">
        <h2 className="font-mono text-lg font-bold tracking-wider text-white">MUKUND V</h2>
        <p className="mt-1 text-xs text-slate-400">Frontend Developer in progress</p>
        <p className="text-xs text-slate-500">CSE Cyber Security</p>
      </div>

      {/* System Online */}
      <div className="mb-4 flex items-center justify-center gap-2">
        <span className="h-2 w-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(232,69,69,0.6)] animate-pulse" />
        <span className="font-mono text-[10px] uppercase tracking-widest text-red-400">System Online</span>
      </div>

      {/* Status */}
      <div className="mb-4 rounded border border-red-500/15 bg-red-500/[0.06] px-3 py-2 text-center">
        <span className="font-mono text-[10px] uppercase tracking-wider text-red-400">Open for Internships</span>
      </div>

      {/* Current Focus */}
      <div className="mb-3">
        <p className="mb-2 font-mono text-[10px] uppercase tracking-wider text-slate-500">Current Focus</p>
        <div className="flex flex-wrap gap-1.5">
          {focusItems.map((item) => (
            <span
              key={item}
              className="rounded border border-white/[0.06] bg-white/[0.03] px-2 py-1 text-[11px] text-slate-300"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Social */}
      <div className="border-t border-white/[0.06] pt-3">
        <div className="flex items-center gap-2">
          <Icon name="Signal" className="h-3 w-3 text-cyan-400/60" />
          <span className="text-[11px] text-slate-400">Open Connection</span>
        </div>
      </div>
    </motion.aside>
  );
}
