import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const bootLines = [
  { text: "> Booting Mukund OS...", delay: 0 },
  { text: "> Loading profile...", delay: 400 },
  { text: "> Loading projects...", delay: 800 },
  { text: "> Initializing desktop...", delay: 1200 },
  { text: "> System ready.", delay: 1600 },
];

export default function BootScreen({ onComplete }) {
  const [visibleLines, setVisibleLines] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const timers = bootLines.map((line, i) =>
      setTimeout(() => setVisibleLines(i + 1), line.delay)
    );

    const exitTimer = setTimeout(() => setExiting(true), 2000);
    const completeTimer = setTimeout(() => onComplete(), 2400);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050810]"
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {/* Glow */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/[0.07] blur-[120px]" />
          </div>

          {/* Boot text */}
          <div className="relative z-10 w-full max-w-md px-6 font-mono text-sm">
            {bootLines.slice(0, visibleLines).map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className={
                  i === visibleLines - 1 && line.text.includes("ready")
                    ? "text-teal-300"
                    : "text-slate-400"
                }
              >
                {line.text}
              </motion.p>
            ))}
            {visibleLines < bootLines.length && (
              <span className="inline-block h-4 w-2 animate-pulse bg-teal-400/80" />
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
