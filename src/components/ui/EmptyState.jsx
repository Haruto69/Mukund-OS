import React from "react";
import { motion } from "framer-motion";
import { TerminalSquare } from "lucide-react";
import { CyberButton } from "./CyberButton";

export function EmptyState({
  title = "DATA_UNAVAILABLE",
  message = "System was unable to retrieve the requested telemetry.",
  icon: Icon = TerminalSquare,
  actionLabel,
  onAction,
  className = "",
}) {
  return (
    <div className={`flex flex-col items-center justify-center p-8 text-center h-full w-full min-h-[300px] rounded-lg border border-dashed border-crimson-500/20 bg-crimson-500/5 ${className}`}>
      <motion.div
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        className="mb-4 rounded-full bg-crimson-500/10 p-4 shadow-glow-crimson"
      >
        <Icon className="h-8 w-8 text-crimson-400" />
      </motion.div>
      <h3 className="mb-2 font-display text-lg font-bold tracking-widest text-white">
        {title}
      </h3>
      <p className="mb-6 max-w-md font-mono text-xs text-slate-400">
        {message}
      </p>
      {actionLabel && onAction && (
        <CyberButton variant="secondary" onClick={onAction}>
          {actionLabel}
        </CyberButton>
      )}
    </div>
  );
}
