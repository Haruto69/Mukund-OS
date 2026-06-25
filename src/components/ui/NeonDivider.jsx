import React from "react";

export function NeonDivider({ label, variant = "center", className = "" }) {
  if (!label) {
    return (
      <div className={`h-px w-full bg-gradient-to-r from-transparent via-primary-500/50 to-transparent shadow-[0_0_10px_rgba(220,20,60,0.5)] ${className}`} />
    );
  }

  return (
    <div className={`flex w-full items-center gap-3 ${className}`}>
      {variant === "center" && (
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-primary-500/50 shadow-glow-primary" />
      )}
      <span className="font-mono text-[10px] uppercase tracking-widest text-primary-400">
        {label}
      </span>
      <div className="h-px flex-1 bg-gradient-to-r from-primary-500/50 to-transparent shadow-glow-primary" />
    </div>
  );
}
