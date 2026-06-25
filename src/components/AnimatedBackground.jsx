import React from "react";

export default function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Base gradient: deep black → maroon */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#08060b] via-[#0c0810] to-[#120a10]" />

      {/* Red glow orb */}
      <div className="absolute -left-32 -top-32 h-[550px] w-[550px] animate-orb-1 rounded-full bg-red-500/[0.04] blur-[130px]" />

      {/* Secondary maroon orb */}
      <div className="absolute -bottom-40 -right-40 h-[450px] w-[450px] animate-orb-2 rounded-full bg-red-900/[0.06] blur-[120px]" />

      {/* Subtle cyan accent */}
      <div className="absolute left-1/2 top-1/3 h-[300px] w-[300px] rounded-full bg-cyan-500/[0.015] blur-[100px]" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(232,69,69,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(232,69,69,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Noise texture */}
      <div
        className="absolute inset-0 opacity-[0.012]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Animated scanline */}
      <div className="absolute inset-0 animate-scanline">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-red-500/[0.08] to-transparent" />
      </div>

      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40" />

      {/* Corner frame accents */}
      <div className="absolute left-4 top-14 h-16 w-16 border-l border-t border-red-500/[0.08]" />
      <div className="absolute right-4 top-14 h-16 w-16 border-r border-t border-red-500/[0.08]" />
      <div className="absolute bottom-14 left-4 h-16 w-16 border-b border-l border-red-500/[0.08]" />
      <div className="absolute bottom-14 right-4 h-16 w-16 border-b border-r border-red-500/[0.08]" />
    </div>
  );
}
