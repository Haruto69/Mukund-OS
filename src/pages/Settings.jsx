import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Settings as SettingsIcon, Palette, MonitorPlay, Power, Maximize, Volume2, RefreshCw, Cpu } from "lucide-react";
import { SectionHeader, CyberCard, DataGrid, CyberButton, StatusChip } from "../components/ui";

const THEMES = [
  { id: "shadow-purple", label: "Shadow Purple" },
  { id: "crimson", label: "Crimson" },
  { id: "blue", label: "Blue" },
  { id: "green", label: "Green" },
];

const ANIMATION_INTENSITIES = ["Minimal", "Standard", "Enhanced"];
const DENSITIES = ["Comfortable", "Compact"];

export default function Settings() {
  const [theme, setTheme] = useState("shadow-purple");
  const [animationIntensity, setAnimationIntensity] = useState("Standard");
  const [reducedMotion, setReducedMotion] = useState(false);
  const [bootSequence, setBootSequence] = useState(false);
  const [uiDensity, setUiDensity] = useState("Comfortable");
  const [soundEffects, setSoundEffects] = useState(false);

  useEffect(() => {
    // Load from localStorage
    setTheme(localStorage.getItem("cyberdeck-theme") || "shadow-purple");
    setAnimationIntensity(localStorage.getItem("cyberdeck-animation-intensity") || "Standard");
    setReducedMotion(localStorage.getItem("cyberdeck-reduced-motion") === "true");
    setBootSequence(localStorage.getItem("cyberdeck-boot-sequence") === "true");
    setUiDensity(localStorage.getItem("cyberdeck-ui-density") || "Comfortable");
    setSoundEffects(localStorage.getItem("cyberdeck-sound-effects") === "true");
  }, []);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem("cyberdeck-theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const updateSetting = (key, value, setter) => {
    setter(value);
    localStorage.setItem(key, value.toString());
  };

  const resetConfig = () => {
    localStorage.removeItem("cyberdeck-theme");
    localStorage.removeItem("cyberdeck-animation-intensity");
    localStorage.removeItem("cyberdeck-reduced-motion");
    localStorage.removeItem("cyberdeck-boot-sequence");
    localStorage.removeItem("cyberdeck-ui-density");
    localStorage.removeItem("cyberdeck-sound-effects");

    setTheme("shadow-purple");
    setAnimationIntensity("Standard");
    setReducedMotion(false);
    setBootSequence(false);
    setUiDensity("Comfortable");
    setSoundEffects(false);

    document.documentElement.setAttribute("data-theme", "shadow-purple");
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
  };

  return (
    <motion.div
      initial="hidden"
      animate="show"
      exit={{ opacity: 0, y: -20 }}
      variants={containerVariants}
      className={`flex flex-1 min-h-0 w-full flex-col p-4 overflow-y-auto no-scrollbar ${uiDensity === "Compact" ? "gap-4" : "gap-6"}`}
    >
      <div>
        <SectionHeader 
          title="SYS_CONFIG" 
          icon={SettingsIcon} 
          eyebrow="SYSTEM SETTINGS"
        />
        <p className="text-slate-400 text-sm mt-[-1rem] px-1 font-sans leading-relaxed">
          Local interface preferences for the CyberDeck portfolio environment.
        </p>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-6 pb-28 sm:pb-24">
        
        {/* Left Column: Settings Controls */}
        <div className="flex-1 flex flex-col gap-6">
          
          {/* Theme Selector */}
          <motion.div variants={itemVariants}>
            <CyberCard eyebrow="VISUAL_INTERFACE" title="Theme Matrix" icon={Palette} animated>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
                {THEMES.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => handleThemeChange(t.id)}
                    className={`p-3 rounded border text-xs font-mono transition-all ${
                      theme === t.id 
                        ? "bg-primary-500/20 border-primary-500 text-primary-300 shadow-glow-primary" 
                        : "bg-white/[0.02] border-white/10 text-slate-400 hover:border-white/30 hover:bg-white/5"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </CyberCard>
          </motion.div>

          <DataGrid variant="two">
            {/* Animations */}
            <motion.div variants={itemVariants}>
              <CyberCard eyebrow="RENDER_ENGINE" title="Motion Controls" icon={MonitorPlay} animated className="h-full">
                <div className="flex flex-col gap-4 mt-4">
                  <div className="space-y-2">
                    <span className="text-[10px] uppercase font-mono text-slate-500 tracking-wider">Intensity</span>
                    <div className="flex bg-white/5 rounded p-1 border border-white/10">
                      {ANIMATION_INTENSITIES.map(intensity => (
                        <button
                          key={intensity}
                          onClick={() => updateSetting("cyberdeck-animation-intensity", intensity, setAnimationIntensity)}
                          className={`flex-1 text-[10px] uppercase font-mono py-1.5 rounded transition-colors ${
                            animationIntensity === intensity ? "bg-primary-500/30 text-primary-300 shadow-sm" : "text-slate-500 hover:text-slate-300"
                          }`}
                        >
                          {intensity}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded border border-white/5 bg-white/[0.02]">
                    <span className="text-sm text-slate-300">Reduced Motion</span>
                    <button 
                      onClick={() => updateSetting("cyberdeck-reduced-motion", !reducedMotion, setReducedMotion)}
                      className={`relative w-10 h-5 rounded-full transition-colors ${reducedMotion ? "bg-primary-500" : "bg-white/10"}`}
                    >
                      <span className={`absolute top-0.5 left-0.5 bg-white w-4 h-4 rounded-full transition-transform ${reducedMotion ? "translate-x-5" : ""}`} />
                    </button>
                  </div>
                </div>
              </CyberCard>
            </motion.div>

            {/* Boot Sequence */}
            <motion.div variants={itemVariants}>
              <CyberCard eyebrow="INITIALIZATION" title="Boot Sequence" icon={Power} animated className="h-full">
                <div className="flex flex-col gap-4 mt-4 h-full">
                  <p className="text-xs text-slate-400 leading-relaxed border-l border-primary-500/30 pl-2">
                    Boot sequence will be used in Phase 12. Toggling this will store the preference for future initialization.
                  </p>
                  <div className="mt-auto flex items-center justify-between p-3 rounded border border-white/5 bg-white/[0.02]">
                    <span className="text-sm text-slate-300">Enable Boot Auth</span>
                    <button 
                      onClick={() => updateSetting("cyberdeck-boot-sequence", !bootSequence, setBootSequence)}
                      className={`relative w-10 h-5 rounded-full transition-colors ${bootSequence ? "bg-primary-500" : "bg-white/10"}`}
                    >
                      <span className={`absolute top-0.5 left-0.5 bg-white w-4 h-4 rounded-full transition-transform ${bootSequence ? "translate-x-5" : ""}`} />
                    </button>
                  </div>
                </div>
              </CyberCard>
            </motion.div>
          </DataGrid>

          <DataGrid variant="two">
            {/* UI Density */}
            <motion.div variants={itemVariants}>
              <CyberCard eyebrow="LAYOUT" title="UI Density" icon={Maximize} animated className="h-full">
                <div className="flex flex-col gap-3 mt-4">
                  {DENSITIES.map(density => (
                    <button
                      key={density}
                      onClick={() => updateSetting("cyberdeck-ui-density", density, setUiDensity)}
                      className={`text-left p-3 rounded border transition-all ${
                        uiDensity === density ? "bg-primary-500/10 border-primary-500/50 text-primary-200" : "bg-white/[0.02] border-white/5 text-slate-400 hover:border-white/20"
                      }`}
                    >
                      <span className="text-sm block">{density}</span>
                      <span className="text-[10px] font-mono text-slate-500">{density === "Comfortable" ? "Standard spacing padding" : "Reduced spacing for data-heavy views"}</span>
                    </button>
                  ))}
                </div>
              </CyberCard>
            </motion.div>

            {/* Sound & Reset */}
            <motion.div variants={itemVariants} className="flex flex-col gap-6">
              <CyberCard eyebrow="AUDIO" title="Sound Effects" icon={Volume2} animated className="flex-1">
                <div className="flex flex-col gap-4 mt-4 h-full">
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Sound effects are disabled by default and not implemented yet.
                  </p>
                  <div className="mt-auto flex items-center justify-between p-3 rounded border border-white/5 bg-white/[0.02] opacity-50 cursor-not-allowed">
                    <span className="text-sm text-slate-300">Enable UI Sounds</span>
                    <button 
                      disabled
                      className={`relative w-10 h-5 rounded-full transition-colors bg-white/10`}
                    >
                      <span className={`absolute top-0.5 left-0.5 bg-white w-4 h-4 rounded-full transition-transform`} />
                    </button>
                  </div>
                </div>
              </CyberCard>

            </motion.div>
          </DataGrid>
          
          <motion.div variants={itemVariants}>
            <CyberButton 
              variant="danger" 
              icon={RefreshCw} 
              onClick={resetConfig} 
              className="w-full sm:w-auto"
            >
              RESET_LOCAL_CONFIG
            </CyberButton>
          </motion.div>

        </div>

        {/* Right Column: System Info */}
        <motion.div variants={itemVariants} className="lg:w-80 shrink-0">
          <CyberCard eyebrow="DIAGNOSTICS" title="System Status" icon={Cpu} animated className="sticky top-4">
            <div className="flex flex-col gap-4 mt-4">
              <div className="flex justify-between items-center pb-2 border-b border-white/5">
                <span className="text-xs text-slate-400">Build</span>
                <StatusChip label="v0.2.0" variant="neutral" />
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-white/5">
                <span className="text-xs text-slate-400">Framework</span>
                <span className="text-sm text-slate-200">React + Vite</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-white/5">
                <span className="text-xs text-slate-400">Styling</span>
                <span className="text-sm text-slate-200">Tailwind CSS</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-white/5">
                <span className="text-xs text-slate-400">Motion Engine</span>
                <span className="text-sm text-slate-200">Framer Motion</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-white/5">
                <span className="text-xs text-slate-400">Deploy Target</span>
                <span className="text-sm text-slate-200">Vercel</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-xs text-slate-400">Active Theme</span>
                <span className="text-xs font-mono text-primary-300 uppercase tracking-widest">{THEMES.find(t => t.id === theme)?.label || "Unknown"}</span>
              </div>
            </div>
          </CyberCard>
        </motion.div>

      </div>
    </motion.div>
  );
}
