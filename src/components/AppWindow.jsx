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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={closeWindow}
      />

      {/* Window */}
      <motion.div
        className="relative z-10 flex max-h-[85vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-white/[0.12] bg-slate-950/90 shadow-2xl backdrop-blur-xl sm:max-h-[80vh]"
        style={{
          boxShadow:
            "0 0 0 1px rgba(148,163,184,0.06), 0 25px 80px rgba(0,0,0,0.5), 0 0 40px rgba(56,189,248,0.06)",
        }}
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 8 }}
        transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
      >
        {/* Title bar */}
        <div className="flex items-center justify-between border-b border-white/[0.08] px-5 py-3">
          <div className="flex items-center gap-3">
            <span className="grid h-8 w-8 place-items-center rounded-lg border border-white/10 bg-white/[0.05]">
              <Icon name={icon} className="h-4 w-4 text-teal-300" />
            </span>
            <span className="text-sm font-semibold text-white">{title}</span>
          </div>
          <button
            onClick={closeWindow}
            className="grid h-7 w-7 place-items-center rounded-lg text-slate-400 transition hover:bg-white/10 hover:text-white"
            aria-label="Close window"
          >
            <Icon name="X" className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6">
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
}
