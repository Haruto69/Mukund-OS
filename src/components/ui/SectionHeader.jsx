import React from "react";

export function SectionHeader({
  title,
  eyebrow,
  description,
  icon: Icon,
  rightAction,
  className = "",
}) {
  return (
    <div className={`mb-6 flex flex-col gap-4 border-b border-primary-500/20 pb-4 sm:flex-row sm:items-end sm:justify-between min-w-0 ${className}`}>
      <div className="flex flex-col min-w-0 flex-1">
        {eyebrow && (
          <span className="mb-1 font-mono text-[10px] uppercase tracking-widest text-primary-500 truncate">
            {eyebrow}
          </span>
        )}
        <div className="flex items-center gap-3 min-w-0">
          {Icon && <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary-400 shrink-0" />}
          <h2 className="font-display text-lg sm:text-2xl font-bold tracking-wider sm:tracking-widest text-white break-words overflow-hidden">
            {title}
          </h2>
        </div>
        {description && (
          <p className="mt-2 font-sans text-sm text-slate-400">
            {description}
          </p>
        )}
      </div>
      {rightAction && <div>{rightAction}</div>}
    </div>
  );
}
