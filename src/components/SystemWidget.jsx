import React from "react";
import { motion } from "framer-motion";
import { Icon } from "./Icon";

export default function SystemWidget({ widget, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.15 + index * 0.05, ease: [0.23, 1, 0.32, 1] }}
      className="group rounded-lg border border-red-500/10 bg-[#0c0810]/60 px-3 py-2.5 transition-all duration-200 hover:border-red-500/25 hover:shadow-[0_0_15px_rgba(232,69,69,0.06)]"
    >
      <div className="mb-1 flex items-center gap-1.5">
        <Icon name={widget.icon} className="h-3 w-3 text-red-400/60" />
        <span className="font-mono text-[9px] uppercase tracking-wider text-slate-500">
          {widget.label}
        </span>
      </div>
      <p className="text-xs font-medium text-slate-200">{widget.value}</p>
    </motion.div>
  );
}
