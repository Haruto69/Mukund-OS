import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const bootLines = [
  { text: "> Initializing profile...", delay: 0 },
  { text: "> Loading project logs...", delay: 300 },
  { text: "> System ready.", delay: 600 },
];

export default function BootScreen({ onComplete }) {
  const [visibleLines, setVisibleLines] = useState(0);
  const [showCTA, setShowCTA] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const timers = bootLines.map((line, i) =>
      setTimeout(() => setVisibleLines(i + 1), line.delay)
    );
    const ctaTimer = setTimeout(() => setShowCTA(true), 900);
    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(ctaTimer);
    };
  }, []);

  function handleEnter() {
    setExiting(true);
    setTimeout(() => onComplete(), 400);
  }

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#08060b]"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {/* Red glow */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500/[0.06] blur-[120px]" />
          </div>

          {/* Corner frames */}
          <div className="absolute left-6 top-6 h-10 w-10 border-l-2 border-t-2 border-red-500/20" />
          <div className="absolute right-6 top-6 h-10 w-10 border-r-2 border-t-2 border-red-500/20" />
          <div className="absolute bottom-6 left-6 h-10 w-10 border-b-2 border-l-2 border-red-500/20" />
          <div className="absolute bottom-6 right-6 h-10 w-10 border-b-2 border-r-2 border-red-500/20" />

          {/* Grid */}
          <div
            className="absolute inset-0 opacity-[0.015]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(232,69,69,1) 1px, transparent 1px), linear-gradient(90deg, rgba(232,69,69,1) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center px-6 text-center">
            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
              className="font-display text-5xl font-black uppercase tracking-[0.15em] text-white sm:text-7xl md:text-8xl"
            >
              Mukund OS
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="mt-3 font-mono text-xs uppercase tracking-[0.2em] text-red-400/60"
            >
              Interactive Resume System
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.35 }}
              className="mt-6 max-w-sm text-sm leading-6 text-slate-500"
            >
              Cybersecurity foundation. Frontend direction. Practical deployed work.
            </motion.p>

            {/* Boot lines */}
            <div className="mt-8 w-full max-w-xs text-left font-mono text-[11px]">
              {bootLines.slice(0, visibleLines).map((line, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.15 }}
                  className={
                    line.text.includes("ready")
                      ? "text-red-400/70"
                      : "text-slate-600"
                  }
                >
                  {line.text}
                </motion.p>
              ))}
            </div>

            {/* CTA */}
            {showCTA && (
              <motion.button
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                onClick={handleEnter}
                className="mt-8 rounded-lg border border-red-500/30 bg-red-500/10 px-8 py-3 font-mono text-sm font-semibold uppercase tracking-widest text-red-300 transition-all duration-200 hover:border-red-500/50 hover:bg-red-500/20 hover:shadow-[0_0_30px_rgba(232,69,69,0.15)] hover:text-white"
              >
                Enter the System
              </motion.button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
