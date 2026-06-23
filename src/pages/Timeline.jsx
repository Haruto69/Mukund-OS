import React from "react";
import TimelineEntry from "../components/TimelineEntry";
import { timeline } from "../data/timeline";

export default function Timeline() {
  return (
    <div className="relative space-y-3">
      <div className="absolute bottom-3 left-6 top-3 hidden w-px bg-gradient-to-b from-teal-300/50 via-white/10 to-transparent sm:block" />
      {timeline.map((item, index) => (
        <TimelineEntry
          key={`${item.year}-${item.title}`}
          item={item}
          index={index}
        />
      ))}
    </div>
  );
}
