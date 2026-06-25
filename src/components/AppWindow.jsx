import React from "react";
import { motion } from "framer-motion";
import { Icon } from "./Icon";
import { useWindows } from "../context/WindowContext";

export default function AppWindow({ id, title, icon, children }) {
  const { activeWindow, closeWindow } = useWindows();
  const isOpen = activeWindow === id;

  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={closeWindow}
      />

      {/* Window Panel */}
      <motion.div
        className="relative z-10 flex max-h-[82vh] w-full max-w-3xl flex-col overflow-hidden rounded-lg border border-red-500/15 bg-[#0a0810]/95 shadow-2xl backdrop-blur-xl corner-brackets sm:max-h-[78vh]"
        style={{
          boxShadow:
            "0 0 0 1px rgba(232,69,69,0.05), 0 25px 80px rgba(0,0,0,0.6), 0 0 30px rgba(232,69,69,0.04)",
        }}
        initial={{ opacity: 0, scale: 0.96, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 8 }}
        transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
      >
        {/* Title bar */}
        <div className="flex items-center justify-between border-b border-red-500/10 px-4 py-2.5">
          <div className="flex items-center gap-2.5">
            <span className="grid h-7 w-7 place-items-center rounded border border-red-500/20 bg-red-500/[0.08]">
              <Icon name={icon} className="h-3.5 w-3.5 text-red-400" />
            </span>
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-white">
              {title}
            </span>
          </div>
          <button
            onClick={closeWindow}
            className="grid h-6 w-6 place-items-center rounded border border-white/[0.06] text-slate-500 transition hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-400"
            aria-label="Close window"
          >
            <Icon name="X" className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5">
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
}
