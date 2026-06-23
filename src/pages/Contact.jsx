import React from "react";
import { Icon } from "../components/Icon";
import { contactLinks } from "../data/contactLinks";

export default function Contact() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {contactLinks.map((item) => {
        const isResume = item.label === "Resume";

        return (
          <a
            key={item.label}
            href={item.action}
            className="group flex items-center gap-4 rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 transition hover:border-white/[0.15] hover:bg-white/[0.06]"
            {...(!isResume && item.action !== "#"
              ? { target: "_blank", rel: "noreferrer" }
              : {})}
          >
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-teal-400/20 bg-teal-400/[0.08]">
              <Icon name={item.icon} className="h-5 w-5 text-teal-300" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-mono text-[11px] uppercase tracking-wider text-slate-500">
                {item.label}
              </p>
              <p className="mt-0.5 truncate text-sm font-medium text-white">
                {item.value}
              </p>
            </div>
            <Icon
              name={isResume ? "FileText" : "ExternalLink"}
              className="h-4 w-4 shrink-0 text-slate-500 transition group-hover:text-white"
            />
          </a>
        );
      })}
    </div>
  );
}
