import React from "react";
import { motion } from "framer-motion";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import RightPanel from "./RightPanel";
import BottomDock from "./BottomDock";

export default function PageShell({ children }) {
  return (
    <div className="relative flex h-[100dvh] w-full flex-col overflow-hidden bg-ink text-slate-300">
      {/* Immersive Background Layers */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <motion.div 
          className="absolute inset-0 bg-grid-cyber opacity-[0.15]"
          animate={{ y: [0, 30] }}
          transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
        />
        
        <div className="absolute -left-[20%] top-[10%] h-[60vh] w-[60vh] rounded-full bg-primary-900/30 blur-[120px]" />
        <div className="absolute -right-[10%] bottom-[10%] h-[50vh] w-[50vh] rounded-full bg-primary-900/20 blur-[150px]" />
        <div className="absolute left-[40%] top-[40%] h-[30vh] w-[30vh] rounded-full bg-primary-500/5 blur-[100px] mix-blend-screen" />

        <div className="absolute inset-0 animate-scanline">
          <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-primary-500/10 to-transparent" />
        </div>

        <div className="absolute inset-0 bg-noise opacity-30 mix-blend-overlay" />
        <div className="absolute inset-0 vignette" />
      </div>

      {/* Main Layout Grid */}
      <div className="relative z-10 flex h-full w-full flex-col pt-2 sm:pt-4 px-2 sm:px-4 pb-0 gap-2 sm:gap-4">
        <TopBar />

        <div className="flex min-h-0 flex-1 gap-4">
          <Sidebar />
          
          {/* Center Content Area */}
          <main className="cyber-panel relative flex min-w-0 flex-1 flex-col overflow-hidden">
            {children}
          </main>

          <RightPanel />
        </div>

        <BottomDock />
      </div>
    </div>
  );
}
