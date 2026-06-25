import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Icon } from "./Icon";

export default function AccordionCard({ item, isOpen, onToggle }) {
  return (
    <article className="rounded-lg border border-red-500/10 bg-[#0c0810]/60">
      <button
        type="button"
        onClick={onToggle}
        className="focus-ring flex w-full items-center justify-between gap-4 rounded-lg px-4 py-3.5 text-left"
        aria-expanded={isOpen}
      >
        <span className="text-sm font-medium text-white">{item.question}</span>
        <Icon
          name="ChevronDown"
          className={`h-4 w-4 text-red-400/40 transition ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <p className="border-t border-red-500/[0.06] px-4 py-3.5 text-xs leading-6 text-slate-400">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}
