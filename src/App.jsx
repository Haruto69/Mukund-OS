import React, { useState, useEffect, Suspense, lazy } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import PageShell from "./components/layout/PageShell";
import BootSequence from "./components/system/BootSequence";
import CommandPalette from "./components/system/CommandPalette";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Projects = lazy(() => import("./pages/Projects"));
const Skills = lazy(() => import("./pages/Skills"));
const About = lazy(() => import("./pages/About"));
const Resume = lazy(() => import("./pages/Resume"));
const Contact = lazy(() => import("./pages/Contact"));
const Settings = lazy(() => import("./pages/Settings"));

export default function App() {
  const location = useLocation();
  const [isBooting, setIsBooting] = useState(true);

  useEffect(() => {
    // Theme logic
    const theme = localStorage.getItem("cyberdeck-theme") || "shadow-purple";
    document.documentElement.setAttribute("data-theme", theme);

    // Boot logic
    const bootPreference = localStorage.getItem("cyberdeck-boot-sequence");
    const sessionBootComplete = sessionStorage.getItem("cyberdeck-boot-complete");

    if (bootPreference === "false" || sessionBootComplete === "true") {
      setIsBooting(false);
    }
  }, []);

  const handleBootComplete = () => {
    sessionStorage.setItem("cyberdeck-boot-complete", "true");
    setIsBooting(false);
  };

  return (
    <>
      <AnimatePresence>
        {isBooting && <BootSequence onComplete={handleBootComplete} />}
      </AnimatePresence>

      {!isBooting && (
        <PageShell>
      <AnimatePresence mode="wait">
        <Suspense fallback={
          <div className="flex h-full w-full items-center justify-center">
            <div className="flex flex-col items-center gap-4 opacity-50">
              <div className="h-6 w-6 animate-spin rounded-full border-t-2 border-primary-500"></div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-primary-400">Loading module...</span>
            </div>
          </div>
        }>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/about" element={<About />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Suspense>
      </AnimatePresence>
      <CommandPalette />
      </PageShell>
      )}
    </>
  );
}
