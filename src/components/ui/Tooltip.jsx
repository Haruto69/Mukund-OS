import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Tooltip({ children, content, placement = "top", className = "" }) {
  const [isVisible, setIsVisible] = useState(false);

  const placements = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  const animations = {
    top: { initial: { opacity: 0, y: 5 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: 5 } },
    bottom: { initial: { opacity: 0, y: -5 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -5 } },
    left: { initial: { opacity: 0, x: 5 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: 5 } },
    right: { initial: { opacity: 0, x: -5 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -5 } },
  };

  return (
    <div 
      className={`relative inline-flex ${className}`}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            {...animations[placement]}
            transition={{ duration: 0.15 }}
            className={`absolute z-50 whitespace-nowrap rounded border border-primary-500/30 bg-[#050505]/95 px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-wider text-primary-200 shadow-glow-primary pointer-events-none ${placements[placement]}`}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
