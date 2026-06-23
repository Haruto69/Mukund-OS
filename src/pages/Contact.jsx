import PageShell from "../components/PageShell";
import { Icon } from "../components/Icon";
import { contactLinks } from "../data/contactLinks";

export default function Contact() {
  return (
    <PageShell
      eyebrow="Contact"
      title="Connect"
      description="Public profile and resume placeholders to replace before sharing the site."
    >
      <div className="grid gap-4 md:grid-cols-2">
        {contactLinks.map((item) => {
          const isResume = item.label === "Resume";

          return (
            <a
              key={item.label}
              href={item.action}
              className="focus-ring group rounded-lg border border-white/10 bg-slate-950/55 p-5 transition hover:border-white/25 hover:bg-white/[0.06]"
              {...(!isResume && item.action !== "#" ? { target: "_blank", rel: "noreferrer" } : {})}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-lg border border-teal-300/25 bg-teal-300/10 text-teal-100">
                    <Icon name={item.icon} className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-mono text-xs uppercase text-slate-400">{item.label}</p>
                    <p className="mt-1 font-semibold text-white">{item.value}</p>
                  </div>
                </div>
                <Icon name={isResume ? "FileText" : "ExternalLink"} className="h-5 w-5 text-slate-500 transition group-hover:text-white" />
              </div>
            </a>
          );
        })}
      </div>
    </PageShell>
  );
}
