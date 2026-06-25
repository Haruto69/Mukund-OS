import React from "react";
import { motion } from "framer-motion";
import { Cpu, Wifi, Activity, Terminal, Shield, Command } from "lucide-react";
import { StatusChip } from "../ui";

export default function TopBar({ children }) {
  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="cyber-panel flex h-14 w-full items-center justify-between px-3 sm:px-6 min-w-0"
    >
      {/* Left Area - System Identification */}
      <div className="flex items-center gap-2 sm:gap-4 min-w-0">
        <div className="flex items-center gap-2 min-w-0">
          <Terminal className="h-4 w-4 text-primary-400 shrink-0" />
          <span className="font-display text-sm font-bold tracking-widest text-white truncate">MUKUND OS</span>
          <StatusChip label="v2.0.4" variant="primary" className="ml-1 sm:ml-2 shrink-0" />
        </div>
      </div>

      {/* Center Status - Technical Info */}
      <div className="hidden items-center gap-6 sm:flex">
        <div className="flex items-center gap-2 group cursor-default">
          <Cpu className="h-3.5 w-3.5 text-slate-400 group-hover:text-primary-400 transition-colors" />
          <span className="font-mono text-xs text-slate-300">2.4 GHz</span>
          <span className="font-mono text-[10px] text-primary-500/80">42°C</span>
        </div>
        
        <StatusChip label="SYS_ONLINE" variant="primary" pulse />

        <div className="flex items-center gap-2 group cursor-default">
          <Activity className="h-3.5 w-3.5 text-slate-400 group-hover:text-primary-400 transition-colors" />
          <span className="font-mono text-xs text-slate-300">60 FPS</span>
        </div>
      </div>

      {/* Right Actions - Connectivity & Power */}
      <div className="flex items-center gap-3 sm:gap-4 shrink-0">
        <button 
          onClick={() => window.dispatchEvent(new Event("open-command-palette"))}
          className="flex items-center gap-2 rounded border border-primary-500/30 bg-white/[0.02] p-1.5 sm:px-2 sm:py-1 transition-colors hover:bg-white/5 hover:border-primary-500/50"
        >
          <Command className="h-4 w-4 sm:h-3 sm:w-3 text-primary-400" />
          <span className="hidden sm:inline-block font-mono text-[10px] text-slate-300">CMD</span>
          <span className="hidden sm:inline-block font-mono text-[9px] text-slate-500 opacity-60">Ctrl K</span>
        </button>

        <div className="hidden md:flex items-center gap-4">
          <div className="h-3 w-px bg-white/10" />
          <div className="flex items-center gap-2">
            <Shield className="h-3.5 w-3.5 text-primary-400" />
            <span className="font-mono text-[10px] text-slate-400 uppercase">Secure</span>
          </div>
          <div className="h-3 w-px bg-white/10" />
          <div className="flex items-center gap-2">
            <Wifi className="h-3.5 w-3.5 text-slate-300" />
            <span className="font-mono text-xs text-slate-300">14ms</span>
          </div>
        </div>
      </div>

      {children}
    </motion.header>
  );
}
