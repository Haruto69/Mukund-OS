import React from "react";

export function TimelineCard({
  date,
  title,
  description,
  icon: Icon,
  tags = [],
  highlight = false,
  className = "",
}) {
  return (
    <div className={`relative pl-6 pb-6 ${className}`}>
      {/* Vertical Line */}
      <div className="absolute left-[11px] top-6 bottom-0 w-px bg-primary-500/20" />
      
      {/* Node Marker */}
      <div className={`absolute left-0 top-1 flex h-6 w-6 items-center justify-center rounded-full border border-[#050505] bg-[#050505] z-10`}>
        <div className={`h-2.5 w-2.5 rounded-full ${highlight ? "bg-primary-500 shadow-glow-primary" : "bg-white/20 border border-white/40"}`} />
      </div>

      <div className={`rounded-lg border bg-white/[0.02] p-4 transition-colors hover:border-primary-500/30 ${highlight ? "border-primary-500/40" : "border-white/5"}`}>
        <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-col">
            <span className="font-mono text-[10px] text-primary-400">{date}</span>
            <h4 className="font-display text-sm font-bold text-white">{title}</h4>
          </div>
          {Icon && <Icon className="h-5 w-5 text-slate-500" />}
        </div>
        
        <p className="font-sans text-sm text-slate-300 leading-relaxed mb-3">
          {description}
        </p>
        
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, i) => (
              <span key={i} className="rounded bg-white/5 px-2 py-0.5 font-mono text-[9px] text-slate-400 border border-white/10">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
