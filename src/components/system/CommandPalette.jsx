import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Search, FolderGit2, FileText, Settings, Radio, BookOpen, User, Zap, EyeOff, Power, ShieldAlert, Cpu } from "lucide-react";
import { applyTheme, getSetting, setSetting, SETTINGS_KEYS } from "../../utils/settings";

const COMMANDS = [
  // Navigation
  { id: "nav-dash", category: "Navigation", title: "Go to Dashboard", route: "/", icon: Terminal, keywords: ["dashboard", "home", "overview"] },
  { id: "nav-arch", category: "Navigation", title: "Open Archives", route: "/projects", icon: FolderGit2, keywords: ["archives", "projects", "project", "case studies"] },
  { id: "nav-mod", category: "Navigation", title: "Open Modules", route: "/skills", icon: Cpu, keywords: ["modules", "skills", "stack", "technologies"] },
  { id: "nav-dos", category: "Navigation", title: "Open User Dossier", route: "/about", icon: User, keywords: ["dossier", "about", "profile", "background"] },
  { id: "nav-res", category: "Navigation", title: "Open Service Record", route: "/resume", icon: FileText, keywords: ["service", "resume", "cv", "record"] },
  { id: "nav-com", category: "Navigation", title: "Open Comms", route: "/contact", icon: Radio, keywords: ["comms", "contact", "email", "linkedin", "github"] },
  { id: "nav-sys", category: "Navigation", title: "Open Sys Config", route: "/settings", icon: Settings, keywords: ["sys", "config", "settings", "system settings", "preferences", "theme", "options"] },
  
  // Projects
  { id: "proj-nokia", category: "Projects", title: "Open Nokia NBUC Archive", route: "/projects", icon: FolderGit2 },
  { id: "proj-disha", category: "Projects", title: "Open DishaRakshak Archive", route: "/projects", icon: FolderGit2 },
  { id: "proj-mern", category: "Projects", title: "Open Self-care MERN App Archive", route: "/projects", icon: FolderGit2 },
  { id: "proj-cyber", category: "Projects", title: "Open CyberDeck Portfolio OS Archive", route: "/projects", icon: FolderGit2 },
  
  // Interface
  { id: "theme-purple", category: "Interface", title: "Set Theme: Shadow Purple", action: "theme", value: "shadow-purple", icon: Zap },
  { id: "theme-crimson", category: "Interface", title: "Set Theme: Crimson", action: "theme", value: "crimson", icon: Zap },
  { id: "theme-blue", category: "Interface", title: "Set Theme: Blue", action: "theme", value: "blue", icon: Zap },
  { id: "theme-green", category: "Interface", title: "Set Theme: Green", action: "theme", value: "green", icon: Zap },
  { id: "toggle-motion", category: "Interface", title: "Toggle Reduced Motion", action: "toggle-motion", icon: EyeOff },
  { id: "toggle-boot", category: "Interface", title: "Toggle Boot Sequence", action: "toggle-boot", icon: Power },
  
  // System
  { id: "sys-clear-boot", category: "System", title: "Clear Boot Session Flag", action: "clear-boot", icon: ShieldAlert },
];

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [feedback, setFeedback] = useState("");
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const navigate = useNavigate();

  // Handle global shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };

    const handleCustomOpen = () => setIsOpen(true);

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-command-palette", handleCustomOpen);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-command-palette", handleCustomOpen);
    };
  }, []);

  // Filter commands
  const filteredCommands = COMMANDS.filter((c) => {
    const q = query.toLowerCase();
    return c.title.toLowerCase().includes(q) || 
           c.category.toLowerCase().includes(q) ||
           (c.keywords && c.keywords.some(kw => kw.includes(q)));
  });

  // Group commands safely
  const groupedCommands = filteredCommands.reduce((acc, cmd) => {
    if (!acc[cmd.category]) acc[cmd.category] = [];
    acc[cmd.category].push(cmd);
    return acc;
  }, {});

  // Reset state when opened/closed
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      setFeedback("");
      // slight delay to ensure input is mounted
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Handle keyboard navigation inside palette
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => Math.min(prev + 1, filteredCommands.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filteredCommands.length > 0) {
          executeCommand(filteredCommands[selectedIndex]);
        }
      } else if (e.key === "Escape") {
        e.preventDefault();
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, selectedIndex, filteredCommands]);

  // Scroll active item into view
  useEffect(() => {
    if (listRef.current) {
      const activeEl = listRef.current.querySelector('[data-selected="true"]');
      if (activeEl) {
        activeEl.scrollIntoView({ block: "nearest" });
      }
    }
  }, [selectedIndex]);

  const executeCommand = (cmd) => {
    if (cmd.route) {
      navigate(cmd.route);
      setIsOpen(false);
      return;
    }

    if (cmd.action === "theme") {
      applyTheme(cmd.value);
      showFeedback(`Theme applied: ${cmd.value}`);
    } else if (cmd.action === "toggle-motion") {
      const current = getSetting(SETTINGS_KEYS.REDUCED_MOTION, false);
      setSetting(SETTINGS_KEYS.REDUCED_MOTION, !current);
      showFeedback(`Reduced motion: ${!current ? "Enabled" : "Disabled"}`);
    } else if (cmd.action === "toggle-boot") {
      const current = getSetting(SETTINGS_KEYS.BOOT_SEQUENCE, false);
      setSetting(SETTINGS_KEYS.BOOT_SEQUENCE, !current);
      showFeedback(`Boot sequence: ${!current ? "Enabled" : "Disabled"}`);
    } else if (cmd.action === "clear-boot") {
      sessionStorage.removeItem("cyberdeck-boot-complete");
      showFeedback("Session boot flag cleared.");
    }
  };

  const showFeedback = (msg) => {
    setFeedback(msg);
    setTimeout(() => {
      setIsOpen(false);
    }, 1000);
  };

  const reducedMotion = getSetting(SETTINGS_KEYS.REDUCED_MOTION, false);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[150] flex items-start justify-center pt-[15vh] sm:pt-[20vh] px-4">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.2 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-ink/80 backdrop-blur-sm"
          />

          {/* Palette Modal */}
          <motion.div 
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: reducedMotion ? 0 : 0.2, ease: "easeOut" }}
            className="relative w-full max-w-2xl rounded-xl border border-primary-500/50 bg-[#0a0a0c] shadow-glow-primary overflow-hidden flex flex-col max-h-[60vh]"
          >
            {/* Header / Input */}
            <div className="flex items-center gap-3 border-b border-primary-500/20 px-4 py-3 bg-white/[0.02]">
              <Search className="h-5 w-5 text-primary-400 shrink-0" />
              <input 
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                placeholder="Search commands... (e.g. 'theme', 'dashboard')"
                className="flex-1 bg-transparent border-none outline-none text-slate-200 placeholder-slate-500 font-mono text-sm"
              />
              <div className="flex items-center gap-2 shrink-0">
                <span className="hidden sm:inline-block font-mono text-[10px] text-slate-500 uppercase px-1.5 py-0.5 rounded border border-white/10 bg-white/5">ESC</span>
                <span className="hidden sm:inline-block text-[10px] text-slate-500">to close</span>
              </div>
            </div>

            {/* Feedback Bar */}
            {feedback && (
              <div className="bg-primary-500/20 px-4 py-2 border-b border-primary-500/30 text-primary-300 font-mono text-xs flex items-center gap-2">
                <Terminal className="h-3 w-3" />
                {feedback}
              </div>
            )}

            {/* Command List */}
            <div ref={listRef} className="flex-1 overflow-y-auto no-scrollbar py-2">
              {filteredCommands.length === 0 ? (
                <div className="px-6 py-12 text-center flex flex-col items-center gap-3 opacity-50">
                  <Terminal className="h-8 w-8 text-primary-500" />
                  <span className="font-mono text-xs tracking-widest text-primary-400">NO_COMMANDS_FOUND</span>
                </div>
              ) : (
                Object.entries(groupedCommands).map(([category, cmds]) => {
                  return (
                    <div key={category} className="mb-2">
                      <div className="px-4 py-1.5 text-[10px] uppercase tracking-widest font-mono text-slate-500">
                        {category}
                      </div>
                      {cmds.map(cmd => {
                        const globalIndex = filteredCommands.findIndex(c => c.id === cmd.id);
                        const isSelected = globalIndex === selectedIndex;
                        const Icon = cmd.icon;

                        return (
                          <div
                            key={cmd.id}
                            data-selected={isSelected}
                            onClick={() => executeCommand(cmd)}
                            onMouseEnter={() => setSelectedIndex(globalIndex)}
                            className={`flex items-center gap-3 px-4 py-2.5 mx-2 rounded cursor-pointer transition-colors ${
                              isSelected 
                                ? "bg-primary-500/20 border-l-2 border-primary-500 text-white" 
                                : "border-l-2 border-transparent text-slate-400 hover:bg-white/5"
                            }`}
                          >
                            <Icon className={`h-4 w-4 shrink-0 ${isSelected ? "text-primary-400" : "text-slate-500"}`} />
                            <span className="text-sm font-sans truncate">{cmd.title}</span>
                          </div>
                        );
                      })}
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-primary-500/20 bg-white/[0.02] px-4 py-2 flex items-center justify-between text-[10px] font-mono text-slate-500">
              <div className="flex gap-4">
                <span className="flex items-center gap-1"><span className="bg-white/10 px-1 rounded">↑↓</span> navigate</span>
                <span className="flex items-center gap-1"><span className="bg-white/10 px-1 rounded">↵</span> select</span>
              </div>
              <span className="tracking-widest">MUKUND_OS // CMD</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
