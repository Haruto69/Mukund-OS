import React from "react";
import { motion } from "framer-motion";

export function CircularProgress({
  value,
  max = 100,
  label,
  sublabel,
  icon: Icon,
  variant = "default",
  className = "",
}) {
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const colors = {
    default: "text-primary-500 drop-shadow-[0_0_4px_rgba(220,20,60,0.5)]",
    success: "text-emerald-500 drop-shadow-[0_0_4px_rgba(16,185,129,0.5)]",
    warning: "text-amber-500 drop-shadow-[0_0_4px_rgba(245,158,11,0.5)]",
  };

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <div className="relative flex h-16 w-16 items-center justify-center">
        {/* Background Circle */}
        <svg className="absolute inset-0 h-full w-full -rotate-90 transform">
          <circle
            cx="32"
            cy="32"
            r={radius}
            stroke="currentColor"
            strokeWidth="4"
            fill="transparent"
            className="text-white/5"
          />
          {/* Progress Circle */}
          <motion.circle
            cx="32"
            cy="32"
            r={radius}
            stroke="currentColor"
            strokeWidth="4"
            fill="transparent"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            strokeLinecap="round"
            className={colors[variant]}
          />
        </svg>
        <div className="absolute flex flex-col items-center justify-center">
          {Icon ? (
            <Icon className="h-5 w-5 text-slate-300" />
          ) : (
            <span className="font-mono text-[10px] font-bold text-white">
              {percentage.toFixed(0)}%
            </span>
          )}
        </div>
      </div>
      {(label || sublabel) && (
        <div className="flex flex-col">
          {label && <span className="font-mono text-[11px] uppercase tracking-widest text-slate-300">{label}</span>}
          {sublabel && <span className="font-mono text-[9px] text-slate-500">{sublabel}</span>}
        </div>
      )}
    </div>
  );
}
