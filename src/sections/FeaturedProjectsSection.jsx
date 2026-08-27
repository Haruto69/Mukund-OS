import React, { useCallback, useState } from "react";
import Reveal from "../components/motion/Reveal";
import FeaturedProjectCarousel from "../components/projects/FeaturedProjectCarousel";
import ProjectPreviewPanel from "../components/projects/ProjectPreviewPanel";
import { projects } from "../data/projects";

/**
 * Featured Projects — cinematic horizontal project carousel.
 *
 * Selection logic is unchanged from Pass 1: the data has no explicit
 * `featured` flag, so the first three entries in src/data/projects.js remain
 * the featured set. If a `featured` flag is added later this is the one place
 * that needs to change.
 *
 * This section composes only the heading, the carousel, and the temporary
 * detail panel — all interaction lives in components/projects/.
 */
const featured = projects.slice(0, 3);

export default function FeaturedProjectsSection() {
  const [selectedProject, setSelectedProject] = useState(null);

  /**
   * Forward-compatible hook for the future web-pull case-study expansion.
   * Featured projects never navigate away from the page.
   */
  const handleOpenProject = useCallback((project) => {
    setSelectedProject(project);
  }, []);

  return (
    <section id="featured-projects" className="relative scroll-mt-20">
      {/* Entry: heading reveal before the carousel takes over the viewport. */}
      <div className="mx-auto max-w-6xl px-4 pb-10 pt-24 sm:px-6 sm:pb-12 sm:pt-28">
        <Reveal>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--accent-red)]">
            Selected work
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-[var(--text)] sm:text-4xl">
            Featured Projects
          </h2>
          <hr className="mv-divider mt-6 max-w-xs" />
        </Reveal>
      </div>

      <FeaturedProjectCarousel
        projects={featured}
        onOpenProject={handleOpenProject}
      />

      {/* Exit: a short settle band so leaving into About is not a hard cut. */}
      <div aria-hidden="true" className="h-16 sm:h-24" />

      <ProjectPreviewPanel
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
