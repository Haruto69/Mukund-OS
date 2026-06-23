import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Icon } from "./Icon";

export default function DesktopShortcut({ item, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: index * 0.04 }}
    >
      <Link
        to={item.path}
        className="focus-ring group flex h-full min-h-44 flex-col justify-between rounded-lg border border-white/10 bg-slate-950/55 p-5 transition hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.07] hover:shadow-glow"
      >
        <div className="flex items-start justify-between gap-4">
          <span className={`grid h-12 w-12 place-items-center rounded-lg bg-gradient-to-br ${item.accent} text-slate-950 shadow-lg`}>
            <Icon name={item.icon} className="h-6 w-6" />
          </span>
          <Icon name="ExternalLink" className="h-4 w-4 text-slate-500 transition group-hover:text-slate-200" />
        </div>
        <div>
          <h2 className="mt-6 text-lg font-semibold text-white">{item.title}</h2>
          <p className="mt-2 text-sm leading-6 text-slate-400">{item.description}</p>
        </div>
      </Link>
    </motion.div>
  );
}
