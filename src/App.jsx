import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import PageShell from "./components/layout/PageShell";
import BootSequence from "./components/system/BootSequence";
import CommandPalette from "./components/system/CommandPalette";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Skills from "./pages/Skills";
import About from "./pages/About";
import Resume from "./pages/Resume";
import Contact from "./pages/Contact";
import Settings from "./pages/Settings";

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
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/about" element={<About />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </AnimatePresence>
      <CommandPalette />
      </PageShell>
      )}
    </>
  );
}
