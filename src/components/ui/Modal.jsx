import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 pt-16 pb-24 sm:p-6 sm:pt-6 sm:pb-6">
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
            className={`relative flex w-full flex-col overflow-hidden rounded-xl border border-primary-500/30 bg-[#0c0810] shadow-glow-primary-lg ${sizes[size]} ${className} max-h-full sm:max-h-[calc(100vh-6rem)]`}
          >
            {/* Header */}
            <div className="flex shrink-0 items-center justify-between border-b border-primary-500/20 bg-white/[0.02] px-6 py-4">
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
            <div className="flex-1 overflow-y-auto p-6 pb-8">
              {children}
            </div>
            
            {/* Optional Decorative Border Glow */}
            <div className="pointer-events-none absolute inset-0 rounded-xl shadow-glow-primary-inner opacity-50" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  if (!mounted) return null;

  return createPortal(modalContent, document.body);
}
