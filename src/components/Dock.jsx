import React from "react";
import { motion } from "framer-motion";
import { desktopItems } from "../data/desktopItems";
import { Icon } from "./Icon";
import { useWindows } from "../context/WindowContext";

export default function Dock() {
  const { activeWindow, toggleWindow } = useWindows();

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-red-500/10 bg-[#08060b]/90 px-2 backdrop-blur-xl"
      aria-label="App dock"
    >
      <div className="mx-auto flex max-w-2xl items-center justify-center gap-0.5 py-1.5 sm:gap-1">
        {desktopItems.map((item) => {
          const isActive = activeWindow === item.id;

          return (
            <motion.button
              key={item.id}
              onClick={() => toggleWindow(item.id)}
              className="group relative flex flex-col items-center px-1.5 py-1 sm:px-2.5"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              aria-label={item.title}
              title={item.title}
            >
              <span
                className={`grid h-9 w-9 place-items-center rounded-lg border transition-all duration-200 sm:h-10 sm:w-10 ${
                  isActive
                    ? "border-red-500/40 bg-red-500/15 text-red-300 shadow-[0_0_15px_rgba(232,69,69,0.15)]"
                    : "border-white/[0.06] bg-white/[0.03] text-slate-400 group-hover:border-red-500/20 group-hover:bg-red-500/[0.06] group-hover:text-red-300 group-hover:shadow-[0_0_12px_rgba(232,69,69,0.08)]"
                }`}
              >
                <Icon name={item.icon} className="h-4 w-4" />
              </span>

              {/* Label */}
              <span className={`mt-0.5 font-mono text-[8px] uppercase tracking-wider transition-colors ${isActive ? "text-red-400" : "text-slate-600 group-hover:text-slate-400"}`}>
                {item.title.length > 8 ? item.title.slice(0, 7) + "." : item.title}
              </span>

              {/* Active bar */}
              {isActive && (
                <motion.span
                  className="absolute -top-px left-2 right-2 h-[2px] bg-red-500 shadow-[0_0_8px_rgba(232,69,69,0.6)]"
                  layoutId="dock-active"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
}
