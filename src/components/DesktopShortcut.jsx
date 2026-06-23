import React from "react";
import { motion } from "framer-motion";
import { Icon } from "./Icon";
import { useWindows } from "../context/WindowContext";

export default function DesktopShortcut({ item, index }) {
  const { openWindow } = useWindows();

  return (
    <motion.button
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.35,
        delay: 0.3 + index * 0.06,
        ease: [0.23, 1, 0.32, 1],
      }}
      onClick={() => openWindow(item.id)}
      className="group flex flex-col items-center gap-2 rounded-xl p-3 transition-all duration-200 hover:bg-white/[0.04]"
    >
      <span
        className={`grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${item.accent} text-slate-950 shadow-lg transition-all duration-200 group-hover:-translate-y-1 group-hover:shadow-[0_8px_25px_rgba(0,0,0,0.3),0_0_20px_rgba(45,212,191,0.1)]`}
      >
        <Icon name={item.icon} className="h-7 w-7" />
      </span>
      <span className="text-[11px] font-medium text-slate-300 transition-colors group-hover:text-white">
        {item.title}
      </span>
    </motion.button>
  );
}
