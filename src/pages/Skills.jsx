import React from "react";
import SkillGroupCard from "../components/SkillGroupCard";
import { skillGroups } from "../data/skills";

export default function Skills() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {skillGroups.map((group, index) => (
        <SkillGroupCard key={group.group} group={group} index={index} />
      ))}
    </div>
  );
}
