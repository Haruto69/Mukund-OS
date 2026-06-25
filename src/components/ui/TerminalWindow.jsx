import React from "react";
import { Terminal } from "lucide-react";

export function TerminalWindow({ title, children, prompt = ">", className = "" }) {
  return (
    <div className={`flex flex-col overflow-hidden rounded-lg border border-primary-500/30 bg-[#020202] shadow-[0_0_20px_rgba(220,20,60,0.1)] ${className}`}>
      {/* Terminal Header */}
      <div className="flex items-center justify-between border-b border-primary-500/20 bg-primary-500/10 px-3 py-2">
        <div className="flex items-center gap-2">
          <Terminal className="h-3.5 w-3.5 text-primary-400" />
          <span className="font-mono text-[10px] uppercase tracking-widest text-primary-200">
            {title || "MUKUND_OS_TERMINAL"}
          </span>
        </div>
        <div className="flex gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full border border-white/10 bg-white/5" />
          <div className="h-2.5 w-2.5 rounded-full border border-white/10 bg-white/5" />
          <div className="h-2.5 w-2.5 rounded-full border border-primary-500/30 bg-primary-500/50 shadow-glow-primary" />
        </div>
      </div>
      
      {/* Terminal Body */}
      <div className="flex-1 overflow-y-auto p-4 font-mono text-xs leading-relaxed text-slate-300">
        {children}
        <div className="mt-2 flex items-center gap-2">
          <span className="text-primary-400">{prompt}</span>
          <span className="h-3 w-2 animate-pulse bg-primary-400" />
        </div>
      </div>
    </div>
  );
}
