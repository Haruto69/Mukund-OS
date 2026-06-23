import React from "react";
import { motion } from "framer-motion";
import { desktopItems } from "../data/desktopItems";
import { Icon } from "./Icon";
import { useWindows } from "../context/WindowContext";

export default function Dock() {
  const { activeWindow, openWindow, toggleWindow } = useWindows();

  return (
    <nav
      className="fixed inset-x-0 bottom-3 z-40 px-3"
      aria-label="App dock"
    >
      <div className="mx-auto flex max-w-fit items-end gap-1 rounded-2xl border border-white/[0.08] bg-slate-950/70 px-2 py-2 shadow-[0_8px_40px_rgba(0,0,0,0.5)] backdrop-blur-xl sm:gap-1.5 sm:px-3">
        {desktopItems.map((item) => {
          const isActive = activeWindow === item.id;

          return (
            <motion.button
              key={item.id}
              onClick={() => toggleWindow(item.id)}
              className="group relative flex flex-col items-center"
              whileHover={{ scale: 1.18, y: -6 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              aria-label={item.title}
              title={item.title}
            >
              <span
                className={`grid h-11 w-11 place-items-center rounded-xl border transition-all duration-200 sm:h-12 sm:w-12 ${
                  isActive
                    ? "border-teal-300/40 bg-teal-300/15 text-teal-100 shadow-[0_0_20px_rgba(45,212,191,0.15)]"
                    : "border-white/[0.08] bg-white/[0.04] text-slate-300 group-hover:border-white/20 group-hover:bg-white/[0.08] group-hover:text-white group-hover:shadow-[0_0_20px_rgba(148,163,184,0.1)]"
                }`}
              >
                <Icon name={item.icon} className="h-5 w-5" />
              </span>

              {/* Tooltip */}
              <span className="pointer-events-none absolute -top-9 whitespace-nowrap rounded-lg border border-white/10 bg-slate-900 px-2.5 py-1 text-[11px] font-medium text-slate-200 opacity-0 shadow-xl transition-opacity group-hover:opacity-100">
                {item.title}
              </span>

              {/* Active indicator dot */}
              {isActive && (
                <motion.span
                  className="mt-1 h-1 w-1 rounded-full bg-teal-400 shadow-[0_0_6px_rgba(45,212,191,0.8)]"
                  layoutId="dock-indicator"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              {!isActive && <span className="mt-1 h-1 w-1" />}
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
}
