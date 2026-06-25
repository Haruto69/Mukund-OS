import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export function InfoTile({
  label,
  value,
  description,
  icon: Icon,
  trend, // "up", "down", "neutral"
  variant = "default",
  className = "",
}) {
  const variants = {
    default: "border-crimson-500/10 hover:border-crimson-500/30 hover:bg-crimson-500/5 hover:shadow-glow-crimson",
    highlight: "border-crimson-500/30 bg-crimson-500/10 shadow-glow-crimson",
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`rounded-lg border bg-white/[0.02] p-3 transition-colors ${variants[variant]} ${className}`}
    >
      <div className="mb-3 flex items-center justify-between">
        <span className="font-mono text-[9px] uppercase tracking-wider text-slate-500">
          {label}
        </span>
        {Icon && <Icon className="h-3 w-3 text-crimson-400" />}
      </div>
      <div className="flex items-end justify-between">
        <span className="font-display text-2xl font-bold text-white">
          {value}
        </span>
        {trend && (
          <div className={`flex items-center text-[10px] ${trend === "up" ? "text-emerald-400" : trend === "down" ? "text-red-400" : "text-slate-400"}`}>
            {trend === "up" && <ArrowUpRight className="h-3 w-3 mr-1" />}
            {trend === "down" && <ArrowDownRight className="h-3 w-3 mr-1" />}
            {trend === "neutral" && <span className="mr-1">-</span>}
          </div>
        )}
      </div>
      {description && (
        <p className="mt-1 font-mono text-[9px] text-slate-500">
          {description}
        </p>
      )}
    </motion.div>
  );
}
