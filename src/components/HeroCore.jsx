import React from "react";
import { motion } from "framer-motion";

export default function HeroCore() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
      className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-lg border border-red-500/20 bg-[#0a0710]/90"
    >
      {/* Outer ring */}
      <div className="absolute h-[85%] w-[85%] rounded-full border border-red-500/15" />
      
      {/* Middle ring - animated */}
      <div className="absolute h-[65%] w-[65%] rounded-full border border-red-500/20 animate-spin-slow" />
      
      {/* Inner ring */}
      <div className="absolute h-[45%] w-[45%] rounded-full border border-red-500/30">
        <div className="absolute inset-0 rounded-full bg-red-500/[0.03]" />
      </div>
      
      {/* Core glow */}
      <div className="absolute h-[25%] w-[25%] rounded-full bg-red-500/10 blur-xl" />
      <div className="absolute h-3 w-3 rounded-full bg-red-500/60 shadow-[0_0_20px_rgba(232,69,69,0.4)]" />

      {/* Crosshairs */}
      <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/20 to-transparent" />
      <div className="absolute bottom-0 top-0 w-px bg-gradient-to-b from-transparent via-red-500/20 to-transparent" style={{ left: '50%' }} />

      {/* Corner brackets */}
      <div className="absolute left-3 top-3 h-6 w-6 border-l-2 border-t-2 border-red-500/30" />
      <div className="absolute right-3 top-3 h-6 w-6 border-r-2 border-t-2 border-red-500/30" />
      <div className="absolute bottom-3 left-3 h-6 w-6 border-b-2 border-l-2 border-red-500/30" />
      <div className="absolute bottom-3 right-3 h-6 w-6 border-b-2 border-r-2 border-red-500/30" />

      {/* Node dots */}
      <div className="absolute left-[20%] top-[30%] h-1.5 w-1.5 rounded-full bg-cyan-400/40" />
      <div className="absolute right-[25%] top-[25%] h-1 w-1 rounded-full bg-cyan-400/30" />
      <div className="absolute bottom-[30%] left-[30%] h-1 w-1 rounded-full bg-red-400/40" />
      <div className="absolute bottom-[25%] right-[20%] h-1.5 w-1.5 rounded-full bg-red-400/30" />

      {/* Scanline */}
      <div className="absolute inset-0 animate-scanline">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-red-500/30 to-transparent" />
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(232,69,69,1) 1px, transparent 1px), linear-gradient(90deg, rgba(232,69,69,1) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }}
      />

      {/* Text overlay */}
      <div className="relative z-10 px-6 text-center">
        <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-red-400/60">
          System Core Active
        </p>
        <p className="mt-3 text-xs leading-5 text-slate-400">
          Cybersecurity background.
          <br />
          Frontend direction.
          <br />
          Practical deployed projects.
        </p>
      </div>
    </motion.div>
  );
}
