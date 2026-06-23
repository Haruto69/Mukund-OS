import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Icon } from "./Icon";

export default function PageShell({ eyebrow, title, description, children }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="space-y-8"
    >
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div className="max-w-3xl">
          <p className="mb-3 font-mono text-xs uppercase text-teal-200">{eyebrow}</p>
          <h1 className="text-3xl font-semibold text-white sm:text-4xl">{title}</h1>
          {description && <p className="mt-3 max-w-2xl text-base leading-7 text-slate-300">{description}</p>}
        </div>
        <Link
          to="/"
          className="focus-ring inline-flex w-fit items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-slate-200 transition hover:border-white/25 hover:bg-white/10 hover:text-white"
        >
          <Icon name="ArrowLeft" className="h-4 w-4" />
          Desktop
        </Link>
      </div>
      {children}
    </motion.section>
  );
}
