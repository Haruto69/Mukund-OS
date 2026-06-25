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
    <header className="fixed inset-x-0 top-0 z-40 border-b border-red-500/10 bg-[#08060b]/85 backdrop-blur-xl">
      <div className="mx-auto flex h-10 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Left */}
        <div className="flex items-center gap-2.5">
          <span className="grid h-6 w-6 place-items-center rounded border border-red-500/30 bg-red-500/10">
            <Icon name="Cpu" className="h-3.5 w-3.5 text-red-400" />
          </span>
          <span className="font-display text-[11px] font-bold uppercase tracking-widest text-white">
            Mukund OS
          </span>
          <span className="hidden h-2 w-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(232,69,69,0.5)] animate-pulse sm:inline-block" />
          <span className="hidden font-mono text-[9px] uppercase tracking-wider text-red-400/60 sm:inline">
            System Online
          </span>
        </div>

        {/* Center */}
        <div className="hidden items-center gap-1.5 sm:flex">
          <span className="h-1 w-1 rounded-full bg-red-500" />
          <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400">
            Frontend Mode
          </span>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          <span className="hidden items-center gap-1.5 rounded border border-red-500/15 bg-red-500/[0.06] px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-red-300 md:inline-flex">
            <span className="h-1 w-1 rounded-full bg-red-400 animate-pulse" />
            Available for Internships
          </span>
          <span className="font-mono text-[11px] text-slate-500">{formattedTime}</span>
        </div>
      </div>
    </header>
  );
}
