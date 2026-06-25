import React from "react";

function NokiaVisual() {
  return (
    <div className="relative flex h-32 items-center justify-center overflow-hidden rounded-t-lg bg-[#08060b]">
      {/* Shield shape */}
      <div className="relative h-16 w-14">
        <div className="absolute inset-0 rounded-b-full rounded-t-lg border-2 border-red-500/30 bg-red-500/[0.05]" />
        <div className="absolute inset-2 flex items-center justify-center rounded-b-full rounded-t-md border border-red-500/20">
          <span className="font-mono text-[10px] font-bold text-red-400">AI</span>
        </div>
      </div>
      {/* Network nodes */}
      <div className="absolute left-4 top-4 h-1.5 w-1.5 rounded-full bg-cyan-400/40" />
      <div className="absolute left-12 top-8 h-1 w-1 rounded-full bg-cyan-400/30" />
      <div className="absolute right-8 top-6 h-1.5 w-1.5 rounded-full bg-red-400/40" />
      <div className="absolute right-4 bottom-6 h-1 w-1 rounded-full bg-cyan-400/30" />
      {/* Connection lines */}
      <div className="absolute left-4 top-5 h-px w-8 rotate-12 bg-cyan-400/15" />
      <div className="absolute right-4 top-7 h-px w-10 -rotate-6 bg-red-400/15" />
      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(232,69,69,1) 1px, transparent 1px), linear-gradient(90deg, rgba(232,69,69,1) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
      {/* Label */}
      <div className="absolute bottom-2 left-3 font-mono text-[8px] uppercase tracking-wider text-red-500/40">Security Pipeline</div>
    </div>
  );
}

function NavigationVisual() {
  return (
    <div className="relative flex h-32 items-center justify-center overflow-hidden rounded-t-lg bg-[#08060b]">
      {/* Path trail */}
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 200 128">
        <path d="M30 100 L60 70 L100 80 L140 40 L170 50" stroke="rgba(232,69,69,0.25)" strokeWidth="1.5" fill="none" strokeDasharray="4 4" />
        <circle cx="30" cy="100" r="3" fill="rgba(232,69,69,0.4)" />
        <circle cx="60" cy="70" r="2" fill="rgba(232,69,69,0.3)" />
        <circle cx="100" cy="80" r="2" fill="rgba(61,216,224,0.3)" />
        <circle cx="140" cy="40" r="2" fill="rgba(232,69,69,0.3)" />
        <circle cx="170" cy="50" r="3" fill="rgba(61,216,224,0.5)" />
      </svg>
      {/* Crosshair at destination */}
      <div className="absolute right-8 top-8">
        <div className="h-6 w-6 rounded-full border border-cyan-400/30" />
        <div className="absolute left-3 top-0 h-6 w-px bg-cyan-400/20" />
        <div className="absolute left-0 top-3 h-px w-6 bg-cyan-400/20" />
      </div>
      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(61,216,224,1) 1px, transparent 1px), linear-gradient(90deg, rgba(61,216,224,1) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
      <div className="absolute bottom-2 left-3 font-mono text-[8px] uppercase tracking-wider text-cyan-500/40">Navigation HUD</div>
    </div>
  );
}

function WellnessVisual() {
  return (
    <div className="relative flex h-32 items-center justify-center overflow-hidden rounded-t-lg bg-[#08060b]">
      {/* Progress bars */}
      <div className="flex w-3/4 flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[7px] text-slate-500 w-8">GOAL</span>
          <div className="flex-1 h-1.5 rounded-full bg-white/[0.05]">
            <div className="h-full w-[78%] rounded-full bg-red-500/40" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono text-[7px] text-slate-500 w-8">TASK</span>
          <div className="flex-1 h-1.5 rounded-full bg-white/[0.05]">
            <div className="h-full w-[62%] rounded-full bg-cyan-400/30" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono text-[7px] text-slate-500 w-8">LOG</span>
          <div className="flex-1 h-1.5 rounded-full bg-white/[0.05]">
            <div className="h-full w-[90%] rounded-full bg-red-500/30" />
          </div>
        </div>
      </div>
      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(232,69,69,1) 1px, transparent 1px), linear-gradient(90deg, rgba(232,69,69,1) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
      <div className="absolute bottom-2 left-3 font-mono text-[8px] uppercase tracking-wider text-red-500/40">Wellness Dashboard</div>
    </div>
  );
}

const visuals = {
  nokia: NokiaVisual,
  navigation: NavigationVisual,
  wellness: WellnessVisual,
};

export default function ProjectVisual({ type }) {
  const Visual = visuals[type];
  if (!Visual) return null;
  return <Visual />;
}
