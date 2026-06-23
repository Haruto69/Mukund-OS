import React from "react";
import { motion } from "framer-motion";

export default function TimelineEntry({ item, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, x: -14 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.25, delay: index * 0.05 }}
      className="relative grid gap-4 rounded-lg border border-white/10 bg-slate-950/55 p-5 sm:grid-cols-[8rem_1fr]"
    >
      <div className="flex items-center gap-3 sm:block">
        <span className="inline-flex rounded-lg border border-teal-300/25 bg-teal-300/10 px-3 py-1.5 font-mono text-sm text-teal-100">
          {item.year}
        </span>
      </div>
      <div>
        <h2 className="text-lg font-semibold text-white">{item.title}</h2>
        <p className="mt-2 text-sm leading-6 text-slate-300">{item.detail}</p>
      </div>
    </motion.article>
  );
}
