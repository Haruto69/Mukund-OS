import React from "react";
import TimelineEntry from "../components/TimelineEntry";
import { timeline } from "../data/timeline";

export default function Timeline() {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 border-b border-red-500/[0.06] pb-3">
        <span className="font-mono text-[9px] uppercase tracking-wider text-red-400/50">
          System History — Achievements
        </span>
      </div>
      <div className="relative space-y-3">
        {/* Vertical line */}
        <div className="absolute bottom-3 left-[3.5rem] top-3 hidden w-px bg-gradient-to-b from-red-500/20 via-red-500/[0.08] to-transparent sm:block" />
        {timeline.map((item, index) => (
          <TimelineEntry
            key={`${item.year}-${item.title}`}
            item={item}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}
