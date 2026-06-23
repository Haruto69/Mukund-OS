import { motion } from "framer-motion";
import { Icon } from "./Icon";

export default function ProjectCard({ project, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: index * 0.05 }}
      className="rounded-lg border border-white/10 bg-slate-950/55 p-5 transition hover:border-white/25 hover:bg-white/[0.06]"
    >
      <div className="mb-5 flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-lg border border-teal-300/25 bg-teal-300/10 text-teal-100">
            <Icon name={project.icon} className="h-5 w-5" />
          </span>
          <div>
            <p className="font-mono text-xs uppercase text-amber-200">{project.tag}</p>
            <h2 className="mt-1 text-lg font-semibold text-white">{project.name}</h2>
          </div>
        </div>
      </div>
      <p className="text-sm leading-6 text-slate-300">{project.description}</p>
      <p className="mt-4 rounded-lg border border-amber-300/20 bg-amber-300/10 px-3 py-2 text-sm text-amber-100">
        {project.highlight}
      </p>
      <div className="mt-5 flex flex-wrap gap-2">
        {project.stack.map((item) => (
          <span key={item} className="rounded-lg border border-white/10 px-3 py-1.5 text-xs text-slate-300">
            {item}
          </span>
        ))}
      </div>
    </motion.article>
  );
}
