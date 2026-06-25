import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Activity, Code2, FolderGit2, Mail, User, FileText, Settings } from "lucide-react";

const navTabs = [
  { id: "/", icon: Activity, label: "Dashboard" },
  { id: "/projects", icon: FolderGit2, label: "Archives" },
  { id: "/skills", icon: Code2, label: "Modules" },
  { id: "/about", icon: User, label: "Dossier" },
  { id: "/resume", icon: FileText, label: "Service Record" },
  { id: "/contact", icon: Mail, label: "Comms" },
  { id: "/settings", icon: Settings, label: "Sys Config" },
];

export default function BottomDock({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const activePath = location.pathname;

  return (
    <div className="w-full border-t border-crimson-500/20 bg-[#050505]/95 backdrop-blur-md">
      <nav 
        className="flex w-full overflow-x-auto no-scrollbar"
        role="navigation"
      >
        {navTabs.map((tab) => {
          const isActive = activePath === tab.id;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              onClick={() => navigate(tab.id)}
              className={`group relative flex-1 min-w-[50px] sm:min-w-0 h-12 flex flex-col sm:flex-row items-center justify-center gap-1.5 border-r border-white/5 transition-all duration-300 ${
                isActive 
                  ? "bg-crimson-500/10 text-crimson-300" 
                  : "bg-transparent text-slate-500 hover:bg-white/5 hover:text-slate-300"
              }`}
            >
              <Icon className={`h-4 w-4 sm:h-4 sm:w-4 transition-transform duration-300 shrink-0 ${isActive ? "scale-110 text-crimson-400" : "group-hover:scale-110"}`} />
              <span className={`font-mono text-[9px] sm:text-[10px] uppercase tracking-wider hidden sm:block truncate px-1 ${isActive ? "text-crimson-200 font-bold" : ""}`}>
                {tab.label}
              </span>

              {/* Mobile label fallback for clarity if space permits, or just icons. The prompt says "icons only or very short labels". We'll keep it icon-only below sm. */}
              
              {isActive && (
                <motion.div
                  layoutId="active-tab"
                  className="absolute top-0 left-0 right-0 h-[2px] bg-crimson-500 shadow-glow-crimson"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              
              {/* Corner accent for active state */}
              {isActive && (
                <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-crimson-400 opacity-50" />
              )}
            </button>
          );
        })}
        {children}
      </nav>
    </div>
  );
}
