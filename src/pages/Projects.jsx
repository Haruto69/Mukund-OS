import React from "react";
import ProjectCard from "../components/ProjectCard";
import { projects } from "../data/projects";

export default function Projects() {
  return (
    <div className="space-y-4">
      {projects.map((project, index) => (
        <ProjectCard key={project.name} project={project} index={index} />
      ))}
    </div>
  );
}
