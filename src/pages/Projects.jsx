import React from "react";
import ProjectCard from "../components/ProjectCard";
import { projects } from "../data/projects";

export default function Projects() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 border-b border-red-500/[0.06] pb-3">
        <span className="font-mono text-[9px] uppercase tracking-wider text-red-400/50">
          Project Logs — Case Studies
        </span>
      </div>
      <div className="space-y-4">
        {projects.map((project, index) => (
          <ProjectCard key={project.name} project={project} index={index} />
        ))}
      </div>
    </div>
  );
}
