import { motion } from "framer-motion";
import DesktopShortcut from "../components/DesktopShortcut";
import { Icon } from "../components/Icon";
import { desktopItems } from "../data/desktopItems";

const statusItems = ["React", "Tailwind CSS", "Cybersecurity", "DSA with Java"];

export default function Desktop() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="space-y-8"
    >
      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
        <div>
          <p className="mb-3 inline-flex rounded-lg border border-teal-300/25 bg-teal-300/10 px-3 py-1.5 font-mono text-xs uppercase text-teal-100">
            Interactive Resume Dashboard
          </p>
          <h1 className="max-w-4xl text-4xl font-semibold text-white sm:text-5xl md:text-6xl">
            Mukund OS
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-slate-300 sm:text-lg">
            Frontend Developer in progress | Cybersecurity background | Building practical web interfaces
          </p>
        </div>

        <div className="rounded-lg border border-white/10 bg-slate-950/55 p-5">
          <div className="mb-4 flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-lg border border-teal-300/30 bg-teal-300/10 text-teal-100">
              <Icon name="Sparkles" className="h-5 w-5" />
            </span>
            <div>
              <p className="font-mono text-xs uppercase text-slate-400">Current Build</p>
              <p className="font-semibold text-white">v0.1 - Frontend learning system</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {statusItems.map((item) => (
              <span key={item} className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-slate-300">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {desktopItems.map((item, index) => (
          <DesktopShortcut key={item.path} item={item} index={index} />
        ))}
      </div>
    </motion.section>
  );
}
