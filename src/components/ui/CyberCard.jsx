import React from "react";
import { motion } from "framer-motion";

export function CyberCard({
  children,
  title,
  eyebrow,
  icon: Icon,
  variant = "default",
  className = "",
  animated = false,
}) {
  const variants = {
    default: "border-primary-500/20 bg-white/[0.02] hover:border-primary-500/40 hover:bg-primary-500/5 hover:shadow-glow-primary",
    highlight: "border-primary-500/50 bg-primary-500/10 shadow-glow-primary",
    danger: "border-red-500/50 bg-red-500/10 shadow-[0_0_15px_rgba(239,68,68,0.3)]",
    success: "border-emerald-500/50 bg-emerald-500/10 shadow-[0_0_15px_rgba(16,185,129,0.3)]",
    muted: "border-white/10 bg-white/[0.01]",
  };

  const Component = animated ? motion.div : "div";
  const motionProps = animated
    ? {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.3 },
      }
    : {};

  return (
    <Component
      {...motionProps}
      className={`relative rounded-lg border p-4 backdrop-blur-sm transition-all duration-300 ${variants[variant]} ${className}`}
    >
      {(title || eyebrow || Icon) && (
        <div className="mb-4 flex items-center justify-between border-b border-white/5 pb-3">
          <div className="flex flex-col min-w-0 flex-1 pr-2">
            {eyebrow && (
              <span className="font-mono text-[9px] uppercase tracking-widest text-slate-500 truncate">
                {eyebrow}
              </span>
            )}
            {title && (
              <h3 className="font-display text-sm font-bold tracking-wider text-white break-words overflow-hidden">
                {title}
              </h3>
            )}
          </div>
          {Icon && <Icon className="h-4 w-4 text-primary-400" />}
        </div>
      )}
      <div className="relative z-10">{children}</div>
    </Component>
  );
}
