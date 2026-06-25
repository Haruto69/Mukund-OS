import React from "react";
import SkillGroupCard from "../components/SkillGroupCard";
import { skillGroups } from "../data/skills";

export default function Skills() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 border-b border-red-500/[0.06] pb-3">
        <span className="font-mono text-[9px] uppercase tracking-wider text-red-400/50">
          System Modules — Capabilities
        </span>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {skillGroups.map((group, index) => (
          <SkillGroupCard key={group.group} group={group} index={index} />
        ))}
      </div>
    </div>
  );
}
