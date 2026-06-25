import React from "react";
import { motion } from "framer-motion";

export function ProgressBar({
  label,
  value,
  max = 100,
  description,
  variant = "default",
  showValue = false,
  className = "",
}) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const fills = {
    default: "bg-crimson-500 shadow-[0_0_8px_rgba(220,20,60,0.6)]",
    success: "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]",
    warning: "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]",
    danger: "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]",
  };

  return (
    <div className={`w-full flex flex-col gap-1.5 ${className}`}>
      {(label || showValue) && (
        <div className="flex items-end justify-between font-mono text-[10px]">
          {label && <span className="uppercase tracking-wider text-slate-400">{label}</span>}
          {showValue && (
            <span className="text-crimson-300">
              {value}
              {max === 100 ? "%" : `/${max}`}
            </span>
          )}
        </div>
      )}
      <div className="h-1.5 w-full overflow-hidden rounded bg-white/5">
        <motion.div
          className={`h-full rounded-r ${fills[variant]}`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
      {description && (
        <span className="font-mono text-[9px] text-slate-500">{description}</span>
      )}
    </div>
  );
}
