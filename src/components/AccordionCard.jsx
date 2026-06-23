import { AnimatePresence, motion } from "framer-motion";
import { Icon } from "./Icon";

export default function AccordionCard({ item, isOpen, onToggle }) {
  return (
    <article className="rounded-lg border border-white/10 bg-slate-950/55">
      <button
        type="button"
        onClick={onToggle}
        className="focus-ring flex w-full items-center justify-between gap-4 rounded-lg px-5 py-4 text-left"
        aria-expanded={isOpen}
      >
        <span className="font-semibold text-white">{item.question}</span>
        <Icon
          name="ChevronDown"
          className={`h-5 w-5 text-slate-400 transition ${isOpen ? "rotate-180" : ""}`}
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
            <p className="border-t border-white/10 px-5 py-4 text-sm leading-6 text-slate-300">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}
