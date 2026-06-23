import React, { useEffect, useState } from "react";
import { Icon } from "./Icon";

export default function TopBar() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = time.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/[0.06] bg-slate-950/70 backdrop-blur-xl">
      <div className="mx-auto flex h-10 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Left: Logo */}
        <div className="flex items-center gap-2">
          <span className="grid h-6 w-6 place-items-center rounded-md border border-teal-400/30 bg-teal-400/10">
            <Icon name="Cpu" className="h-3.5 w-3.5 text-teal-300" />
          </span>
          <span className="text-xs font-semibold text-white">Mukund OS</span>
          <span className="hidden rounded-full border border-white/10 px-1.5 py-0.5 text-[10px] text-slate-500 sm:inline">
            v0.2
          </span>
        </div>

        {/* Center: Mode */}
        <div className="hidden items-center gap-1.5 sm:flex">
          <span className="h-1.5 w-1.5 rounded-full bg-teal-400 shadow-[0_0_6px_rgba(45,212,191,0.6)]" />
          <span className="text-xs font-medium text-slate-300">Frontend Mode</span>
        </div>

        {/* Right: Status */}
        <div className="flex items-center gap-3">
          <span className="hidden items-center gap-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/[0.08] px-2 py-0.5 text-[10px] font-medium text-emerald-300 md:inline-flex">
            <span className="h-1 w-1 rounded-full bg-emerald-400 animate-pulse" />
            Available for internships
          </span>
          <span className="font-mono text-xs text-slate-400">{formattedTime}</span>
        </div>
      </div>
    </header>
  );
}
