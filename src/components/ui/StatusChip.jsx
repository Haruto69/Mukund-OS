import React from "react";

export function StatusChip({
  label,
  value,
  variant = "neutral",
  pulse = false,
  icon: Icon,
  className = "",
}) {
  const variants = {
    online: "border-emerald-500/30 text-emerald-400",
    warning: "border-amber-500/30 text-amber-400",
    danger: "border-red-500/30 text-red-400",
    info: "border-cyan-500/30 text-cyan-400",
    neutral: "border-slate-500/30 text-slate-400",
    crimson: "border-crimson-500/30 text-crimson-400",
  };

  const pulseColors = {
    online: "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]",
    warning: "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)]",
    danger: "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]",
    info: "bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.8)]",
    neutral: "bg-slate-500 shadow-[0_0_8px_rgba(100,116,139,0.8)]",
    crimson: "bg-crimson-500 shadow-[0_0_8px_rgba(220,20,60,0.8)]",
  };

  return (
    <div
      className={`inline-flex items-center gap-2 rounded border bg-white/[0.02] px-2 py-1 font-mono text-[10px] tracking-widest ${variants[variant]} ${className}`}
    >
      {pulse && (
        <span className="relative flex h-1.5 w-1.5">
          <span
            className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${pulseColors[variant]}`}
          />
          <span
            className={`relative inline-flex h-1.5 w-1.5 rounded-full ${pulseColors[variant]}`}
          />
        </span>
      )}
      {Icon && <Icon className="h-3 w-3" />}
      <span className="uppercase">{label}</span>
      {value && (
        <>
          <span className="text-white/20">|</span>
          <span className="text-white">{value}</span>
        </>
      )}
    </div>
  );
}
