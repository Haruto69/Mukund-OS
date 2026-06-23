import PageShell from "../components/PageShell";
import ProjectCard from "../components/ProjectCard";
import { projects } from "../data/projects";

export default function Projects() {
  return (
    <PageShell
      eyebrow="Portfolio"
      title="Projects"
      description="Selected work showing security thinking, embedded-system concepts, full-stack practice, and production debugging."
    >
      <div className="grid gap-4 lg:grid-cols-3">
        {projects.map((project, index) => (
          <ProjectCard key={project.name} project={project} index={index} />
        ))}
      </div>
    </PageShell>
  );
}
