import React from "react";
import { motion } from "framer-motion";
import { Icon } from "./Icon";
import { useWindows } from "../context/WindowContext";

export default function DesktopShortcut({ item, index }) {
  const { openWindow } = useWindows();

  return (
    <motion.button
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        delay: 0.3 + index * 0.04,
        ease: [0.23, 1, 0.32, 1],
      }}
      onClick={() => openWindow(item.id)}
      className="group flex items-center gap-2 rounded border border-white/[0.04] bg-white/[0.02] px-2.5 py-1.5 transition-all duration-200 hover:border-red-500/20 hover:bg-red-500/[0.04] hover:shadow-[0_0_12px_rgba(232,69,69,0.06)]"
    >
      <Icon name={item.icon} className="h-3.5 w-3.5 text-red-400/60 transition-colors group-hover:text-red-400" />
      <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400 transition-colors group-hover:text-slate-200">
        {item.title}
      </span>
    </motion.button>
  );
}
