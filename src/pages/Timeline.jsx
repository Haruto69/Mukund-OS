import PageShell from "../components/PageShell";
import TimelineEntry from "../components/TimelineEntry";
import { timeline } from "../data/timeline";

export default function Timeline() {
  return (
    <PageShell
      eyebrow="Resume Timeline"
      title="Recent Milestones"
      description="A concise route through project work, recognition, and current preparation."
    >
      <div className="relative space-y-4">
        <div className="absolute bottom-4 left-6 top-4 hidden w-px bg-gradient-to-b from-teal-300/60 via-white/20 to-transparent sm:block" />
        {timeline.map((item, index) => (
          <TimelineEntry key={`${item.year}-${item.title}`} item={item} index={index} />
        ))}
      </div>
    </PageShell>
  );
}
