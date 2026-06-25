import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Terminal } from "lucide-react";
import { playSound } from "../../utils/sound";

const BOOT_MESSAGES = [
  "INITIALIZING_MUKUND_OS",
  "Loading interface modules...",
  "Mounting project archives...",
  "Syncing skill matrix...",
  "Establishing comms channel...",
  "Loading Shadow Purple interface...",
  "SYSTEM_READY"
];

export default function BootSequence({ onComplete }) {
  const [messages, setMessages] = useState([]);
  const [progress, setProgress] = useState(0);
  const [isSkipping, setIsSkipping] = useState(false);
  const scrollRef = useRef(null);

  const reducedMotion = localStorage.getItem("cyberdeck-reduced-motion") === "true";
  const intensity = localStorage.getItem("cyberdeck-animation-intensity") || "Standard";

  const duration = 2500; // 2.5 seconds max
  const intervalTime = duration / BOOT_MESSAGES.length;

  // Keyboard shortcut for skip
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && !isSkipping) {
        setIsSkipping(true);
        onComplete();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSkipping, onComplete]);

  useEffect(() => {
    // Scroll to bottom whenever new messages arrive
    if (scrollRef.current && intensity !== "Minimal" && !reducedMotion) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, intensity, reducedMotion]);

  useEffect(() => {
    let timers = [];
    let progressTimer = null;

    if (reducedMotion || intensity === "Minimal") {
      // Just show start and end immediately, animate progress smoothly
      setMessages([BOOT_MESSAGES[0], "INITIALIZING_SYSTEM..."]);
      
      let startTime = Date.now();
      progressTimer = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const p = Math.min((elapsed / duration) * 100, 100);
        setProgress(p);
        
        if (p === 100) {
          clearInterval(progressTimer);
          setMessages(prev => [...prev, "SYSTEM_READY"]);
          playSound("success");
          const t = setTimeout(onComplete, 300);
          timers.push(t);
        }
      }, 50);

    } else {
      // Standard / Enhanced: Type out lines
      BOOT_MESSAGES.forEach((msg, index) => {
        const t = setTimeout(() => {
          setMessages(prev => [...prev, msg]);
          setProgress(Math.floor(((index + 1) / BOOT_MESSAGES.length) * 100));
          
          if (index === BOOT_MESSAGES.length - 1) {
            playSound("success");
            const finishTimer = setTimeout(onComplete, 400); // brief pause on 100%
            timers.push(finishTimer);
          }
        }, index * intervalTime);
        timers.push(t);
      });
    }

    // Fallback safety timeout ensuring completion even if something hangs
    const safety = setTimeout(onComplete, duration + 1000);
    timers.push(safety);

    return () => {
      timers.forEach(clearTimeout);
      if (progressTimer) clearInterval(progressTimer);
    };
  }, [reducedMotion, intensity, intervalTime, onComplete, duration]);

  const handleSkip = () => {
    setIsSkipping(true);
    onComplete();
  };

  const showGlow = intensity === "Enhanced" && !reducedMotion;

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050505] p-4 font-mono text-xs text-primary-300 ${showGlow ? "shadow-glow-primary-inner" : ""}`}
    >
      {/* Background Elements (Enhanced only) */}
      {showGlow && (
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-20 mix-blend-screen">
          <div className="absolute inset-0 bg-grid-cyber" />
          <motion.div 
            animate={{ y: [0, 20] }} 
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            className="h-[2px] w-full bg-gradient-to-r from-transparent via-primary-500 to-transparent" 
          />
        </div>
      )}

      {/* Main Terminal Window */}
      <div className="relative z-10 w-full max-w-xl rounded-lg border border-primary-500/30 bg-black/60 p-6 backdrop-blur-sm shadow-2xl">
        <div className="mb-4 flex items-center justify-between border-b border-primary-500/20 pb-2">
          <div className="flex items-center gap-2">
            <Terminal className="h-4 w-4 text-primary-400" />
            <span className="font-bold tracking-widest text-primary-400">MUKUND_OS_BOOTLOADER</span>
          </div>
          <button 
            onClick={handleSkip}
            disabled={isSkipping}
            aria-label="Skip Boot Sequence"
            className="text-[10px] uppercase tracking-widest text-slate-500 transition-colors hover:text-primary-400 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded px-1"
          >
            SKIP_BOOT [ESC]
          </button>
        </div>

        {/* Console Output */}
        <div 
          ref={scrollRef}
          className="h-32 w-full overflow-y-auto overflow-x-hidden whitespace-pre-wrap no-scrollbar"
        >
          {messages.map((msg, i) => (
            <motion.div 
              key={i}
              initial={reducedMotion ? false : { opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-1 leading-relaxed text-slate-300 break-words"
            >
              <span className="mr-2 text-primary-500/50">{">"}</span>
              <span className={i === messages.length - 1 && msg === "SYSTEM_READY" ? "text-primary-300 font-bold" : ""}>
                {msg}
              </span>
            </motion.div>
          ))}
          {/* Blinking Cursor */}
          {!reducedMotion && progress < 100 && (
            <motion.span 
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="inline-block h-3 w-2 bg-primary-500"
            />
          )}
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="mb-1 flex justify-between text-[10px] text-slate-500">
            <span>MEM_ALLOC</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-1 w-full overflow-hidden rounded bg-white/5">
            <motion.div 
              className={`h-full bg-primary-500 ${showGlow ? "shadow-[0_0_8px_rgba(90,40,190,0.8)]" : ""}`}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "linear", duration: reducedMotion ? 0 : 0.1 }}
            />
          </div>
        </div>

      </div>
    </motion.div>
  );
}
