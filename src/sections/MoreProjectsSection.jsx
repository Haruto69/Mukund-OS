import React from "react";
import Section from "./Section";
import ProjectCard from "../components/projects/ProjectCard";
import { moreProjects } from "../data/projects";

/** Every project not in the featured set (see src/data/projects.js). */
const more = moreProjects;

export default function MoreProjectsSection() {
  if (more.length === 0) return null;

  return (
    <Section id="projects" eyebrow="Archive" title="More Projects">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {more.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </Section>
  );
}
