import React from "react";

export default function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#050810] via-[#0a0f1e] to-[#0d0a18]" />

      {/* Animated orbs */}
      <div className="absolute -left-32 -top-32 h-[600px] w-[600px] animate-orb-1 rounded-full bg-cyan-500/[0.07] blur-[130px]" />
      <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] animate-orb-2 rounded-full bg-purple-500/[0.06] blur-[120px]" />
      <div className="absolute left-1/2 top-1/3 h-[400px] w-[400px] animate-orb-3 rounded-full bg-blue-500/[0.05] blur-[100px]" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(148,163,184,1) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Subtle noise texture */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Top scanline */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/20" />
    </div>
  );
}
