import React from "react";
import { motion } from "framer-motion";
import { Zap, Activity, Radio, AlertCircle } from "lucide-react";
import { CyberCard, ProgressBar } from "../ui";

const processes = [
  { name: "core_sys.exe", mem: "142 MB", status: "Running" },
  { name: "visual_hud.dll", mem: "84 MB", status: "Running" },
  { name: "network_sync", mem: "12 MB", status: "Waiting" },
];

export default function RightPanel({ children }) {
  return (
    <motion.aside 
      initial={{ x: 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="cyber-panel hidden lg:flex w-72 flex-col gap-4 p-4 shrink-0"
    >
      {/* Panel Title */}
      <div className="mb-2 flex items-center justify-between border-b border-crimson-500/20 pb-2">
        <div className="flex items-center gap-2">
          <Activity className="h-4 w-4 text-crimson-400" />
          <span className="font-mono text-[10px] uppercase tracking-widest text-slate-300">Telemetry</span>
        </div>
        <div className="h-2 w-2 animate-pulse rounded-full bg-crimson-500 shadow-glow-crimson" />
      </div>

      {/* Info Cards */}
      <div className="space-y-4 flex-1 overflow-y-auto pr-1">
        
        {/* Power Status */}
        <CyberCard eyebrow="Power Grid" icon={Zap} animated>
          <div className="flex items-end justify-between">
            <div>
              <span className="font-display text-2xl font-bold text-white">98</span>
              <span className="font-mono text-[10px] text-crimson-400 ml-1">%</span>
            </div>
            <span className="font-mono text-[9px] text-slate-400">DISCHARGING</span>
          </div>
          <ProgressBar value={98} className="mt-2" />
        </CyberCard>

        {/* Network Traffic */}
        <CyberCard eyebrow="Uplink Status" icon={Radio} animated>
          <div className="flex justify-between font-mono text-xs mt-1">
            <div className="flex flex-col">
              <span className="text-[9px] text-slate-500">RX (DOWN)</span>
              <span className="text-crimson-300">14.2 MB/s</span>
            </div>
            <div className="flex flex-col text-right">
              <span className="text-[9px] text-slate-500">TX (UP)</span>
              <span className="text-crimson-300">2.1 MB/s</span>
            </div>
          </div>
        </CyberCard>

        {/* Active Processes */}
        <CyberCard eyebrow="Active Tasks" icon={AlertCircle} animated>
          <div className="space-y-2 mt-1">
            {processes.map((proc, i) => (
              <div key={i} className="flex items-center justify-between font-mono text-[10px]">
                <span className="text-slate-300">{proc.name}</span>
                <span className="text-slate-500">{proc.mem}</span>
              </div>
            ))}
          </div>
        </CyberCard>

      </div>

      {children}
    </motion.aside>
  );
}
