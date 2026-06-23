import React from "react";
import PageShell from "../components/PageShell";
import SkillGroupCard from "../components/SkillGroupCard";
import { skillGroups } from "../data/skills";

export default function Skills() {
  return (
    <PageShell
      eyebrow="Skill Matrix"
      title="Skills"
      description="Grouped capabilities across web development, programming, security, and deployment tools."
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {skillGroups.map((group, index) => (
          <SkillGroupCard key={group.group} group={group} index={index} />
        ))}
      </div>
    </PageShell>
  );
}
