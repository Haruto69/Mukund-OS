import React, { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import AnimatedBackground from "./components/AnimatedBackground";
import AppWindow from "./components/AppWindow";
import BootScreen from "./components/BootScreen";
import Dock from "./components/Dock";
import TopBar from "./components/TopBar";
import { WindowProvider, useWindows } from "./context/WindowContext";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Desktop from "./pages/Desktop";
import Interview from "./pages/Interview";
import Projects from "./pages/Projects";
import Skills from "./pages/Skills";
import Terminal from "./pages/Terminal";
import Timeline from "./pages/Timeline";

const windowContent = {
  about: { component: About, title: "About", icon: "UserRound" },
  skills: { component: Skills, title: "Skills", icon: "Code2" },
  projects: { component: Projects, title: "Projects", icon: "BriefcaseBusiness" },
  timeline: { component: Timeline, title: "Resume Timeline", icon: "GitBranch" },
  interview: { component: Interview, title: "Interview Mode", icon: "MessageSquareText" },
  terminal: { component: Terminal, title: "Terminal", icon: "TerminalSquare" },
  contact: { component: Contact, title: "Contact", icon: "Mail" },
};

function AppContent() {
  const location = useLocation();
  const { activeWindow, openWindow } = useWindows();

  // Open window based on URL path on initial load
  useEffect(() => {
    const path = location.pathname.replace("/", "");
    if (path && windowContent[path]) {
      openWindow(path);
    }
  }, []); // Only on mount

  return (
    <>
      <AnimatedBackground />
      <TopBar />
      <Desktop />

      {/* App Windows */}
      <AnimatePresence>
        {activeWindow && windowContent[activeWindow] && (() => {
          const { component: Content, title, icon } = windowContent[activeWindow];
          return (
            <AppWindow
              key={activeWindow}
              id={activeWindow}
              title={title}
              icon={icon}
            >
              <Content />
            </AppWindow>
          );
        })()}
      </AnimatePresence>

      <Dock />
    </>
  );
}

export default function App() {
  const [isBooted, setIsBooted] = useState(false);

  const handleBootComplete = useCallback(() => {
    setIsBooted(true);
  }, []);

  return (
    <WindowProvider>
      <div className="min-h-screen">
        {!isBooted && <BootScreen onComplete={handleBootComplete} />}
        {isBooted && <AppContent />}
      </div>
    </WindowProvider>
  );
}
