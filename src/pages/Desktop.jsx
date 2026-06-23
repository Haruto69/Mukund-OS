import React from "react";
import { motion } from "framer-motion";
import DesktopShortcut from "../components/DesktopShortcut";
import { Icon } from "../components/Icon";
import { desktopItems } from "../data/desktopItems";

const statusWidgets = [
  {
    label: "Best Implemented Industry Project",
    value: "Nokia University Day 2025",
    icon: "Trophy",
    accent: "text-amber-300",
    border: "border-amber-400/15",
    bg: "bg-amber-400/[0.06]",
  },
  {
    label: "Current Focus",
    value: "React, Tailwind, DSA with Java",
    icon: "Zap",
    accent: "text-cyan-300",
    border: "border-cyan-400/15",
    bg: "bg-cyan-400/[0.06]",
  },
  {
    label: "Internship Status",
    value: "Available for frontend/full-stack internships",
    icon: "Sparkles",
    accent: "text-emerald-300",
    border: "border-emerald-400/15",
    bg: "bg-emerald-400/[0.06]",
  },
  {
    label: "Latest Build",
    value: "Mukund OS v0.2",
    icon: "Monitor",
    accent: "text-purple-300",
    border: "border-purple-400/15",
    bg: "bg-purple-400/[0.06]",
  },
];

export default function Desktop() {
  return (
    <section className="relative z-10 mx-auto max-w-6xl px-4 pb-28 pt-16 sm:px-6 sm:pt-20">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
        className="mb-10 sm:mb-14"
      >
        <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-teal-400/20 bg-teal-400/[0.08] px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-teal-300">
          <span className="h-1.5 w-1.5 rounded-full bg-teal-400 animate-pulse" />
          Interactive Resume Dashboard
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
          Mukund V
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
          Frontend Developer in progress
          <span className="mx-2 text-slate-600">|</span>
          Cybersecurity background
          <span className="mx-2 text-slate-600">|</span>
          Building practical web interfaces
        </p>
      </motion.div>

      {/* Status Widgets */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="mb-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
      >
        {statusWidgets.map((widget, i) => (
          <motion.div
            key={widget.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.35,
              delay: 0.15 + i * 0.07,
              ease: [0.23, 1, 0.32, 1],
            }}
            className={`group rounded-xl border ${widget.border} ${widget.bg} p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg`}
          >
            <div className="mb-2 flex items-center gap-2">
              <Icon
                name={widget.icon}
                className={`h-4 w-4 ${widget.accent}`}
              />
              <span className="font-mono text-[10px] uppercase tracking-wider text-slate-500">
                {widget.label}
              </span>
            </div>
            <p className="text-sm font-medium text-slate-200">
              {widget.value}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* Desktop App Icons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.25 }}
      >
        <p className="mb-4 font-mono text-[11px] uppercase tracking-wider text-slate-600">
          Applications
        </p>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-7">
          {desktopItems.map((item, index) => (
            <DesktopShortcut key={item.id} item={item} index={index} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
