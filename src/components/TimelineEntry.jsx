import React from "react";
import { motion } from "framer-motion";

export default function TimelineEntry({ item, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.25, delay: index * 0.06 }}
      className="relative grid gap-3 rounded-lg border border-red-500/10 bg-[#0c0810]/60 p-4 sm:grid-cols-[7rem_1fr]"
    >
      <div className="flex items-center gap-2 sm:block">
        <span className="inline-flex rounded border border-red-500/20 bg-red-500/[0.06] px-2.5 py-1 font-mono text-xs font-bold text-red-400">
          {item.year}
        </span>
      </div>
      <div>
        <h2 className="text-sm font-semibold text-white">{item.title}</h2>
        <p className="mt-1.5 text-xs leading-5 text-slate-400">{item.detail}</p>
      </div>
    </motion.article>
  );
}
