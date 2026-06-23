import { motion } from "framer-motion";
import { Icon } from "./Icon";

export default function SkillGroupCard({ group, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: index * 0.04 }}
      className="rounded-lg border border-white/10 bg-slate-950/55 p-5"
    >
      <div className="mb-5 flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 bg-white/[0.04]">
          <Icon name={group.icon} className={`h-5 w-5 ${group.accent}`} />
        </span>
        <h2 className="text-lg font-semibold text-white">{group.group}</h2>
      </div>
      <div className="flex flex-wrap gap-2">
        {group.skills.map((skill) => (
          <span
            key={skill}
            className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-slate-200"
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.article>
  );
}
