import React from "react";
import Section from "./Section";
import ProjectCard from "../components/projects/ProjectCard";
import { projects } from "../data/projects";

/** First three projects act as the "featured" set for Pass 1. */
const featured = projects.slice(0, 3);

export default function FeaturedProjectsSection() {
  return (
    <Section id="featured-projects" eyebrow="Selected work" title="Featured Projects">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </Section>
  );
}
