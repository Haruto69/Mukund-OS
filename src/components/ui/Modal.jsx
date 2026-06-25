import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
  className = "",
}) {
  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden"; // Prevent background scrolling
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const sizes = {
    sm: "max-w-md",
    md: "max-w-2xl",
    lg: "max-w-4xl",
    xl: "max-w-6xl",
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#050505]/80 backdrop-blur-sm"
          />

          {/* Modal Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className={`relative flex max-h-[90vh] w-full flex-col overflow-hidden rounded-xl border border-crimson-500/30 bg-[#0c0810] shadow-[0_0_40px_rgba(220,20,60,0.15)] ${sizes[size]} ${className}`}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-crimson-500/20 bg-white/[0.02] px-6 py-4">
              <h2 className="font-display text-lg font-bold tracking-wider text-white">
                {title}
              </h2>
              <button
                onClick={onClose}
                className="rounded p-1 text-slate-400 transition-colors hover:bg-red-500/10 hover:text-red-400"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {children}
            </div>
            
            {/* Optional Decorative Border Glow */}
            <div className="pointer-events-none absolute inset-0 rounded-xl shadow-[inset_0_0_20px_rgba(220,20,60,0.05)]" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
