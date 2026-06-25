import React from "react";
import { motion } from "framer-motion";
import { Icon } from "./Icon";

export default function AchievementBadge({ achievement, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 + index * 0.06, ease: [0.23, 1, 0.32, 1] }}
      className="group flex items-center gap-3 rounded-lg border border-red-500/10 bg-[#0c0810]/60 px-3 py-2.5 transition-all duration-200 hover:border-red-500/25 hover:shadow-[0_0_15px_rgba(232,69,69,0.06)]"
    >
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded border border-red-500/20 bg-red-500/[0.08]">
        <Icon name={achievement.icon} className="h-4 w-4 text-red-400" />
      </span>
      <div className="min-w-0">
        <p className="text-xs font-medium text-slate-200 truncate">{achievement.title}</p>
        <p className="text-[10px] text-slate-500">{achievement.detail}</p>
      </div>
    </motion.div>
  );
}
