import React from "react";
import { Icon } from "../components/Icon";
import { contactLinks } from "../data/contactLinks";

export default function Contact() {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 border-b border-red-500/[0.06] pb-3">
        <span className="font-mono text-[9px] uppercase tracking-wider text-red-400/50">
          Contact — Secure Channels
        </span>
      </div>
      <div className="grid gap-2.5 sm:grid-cols-2">
        {contactLinks.map((item) => {
          const isResume = item.label === "Resume";

          return (
            <a
              key={item.label}
              href={item.action}
              className="group flex items-center gap-3 rounded-lg border border-red-500/10 bg-[#0c0810]/40 p-3.5 transition hover:border-red-500/20 hover:shadow-[0_0_12px_rgba(232,69,69,0.05)]"
              {...(!isResume && item.action !== "#"
                ? { target: "_blank", rel: "noreferrer" }
                : {})}
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded border border-red-500/15 bg-red-500/[0.06]">
                <Icon name={item.icon} className="h-4 w-4 text-red-400" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-mono text-[9px] uppercase tracking-wider text-slate-500">
                  {item.label}
                </p>
                <p className="mt-0.5 truncate text-xs font-medium text-white">
                  {item.value}
                </p>
              </div>
              <Icon
                name={isResume ? "FileText" : "ExternalLink"}
                className="h-3.5 w-3.5 shrink-0 text-slate-600 transition group-hover:text-red-400"
              />
            </a>
          );
        })}
      </div>
    </div>
  );
}
