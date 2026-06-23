import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Dock from "./components/Dock";
import TopBar from "./components/TopBar";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Desktop from "./pages/Desktop";
import Interview from "./pages/Interview";
import Projects from "./pages/Projects";
import Skills from "./pages/Skills";
import Terminal from "./pages/Terminal";
import Timeline from "./pages/Timeline";

export default function App() {
  return (
    <div className="min-h-screen os-grid bg-ink">
      <TopBar />
      <main className="mx-auto max-w-7xl px-4 pb-28 pt-20 sm:px-6 lg:px-8">
        <Routes>
          <Route path="/" element={<Desktop />} />
          <Route path="/about" element={<About />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/interview" element={<Interview />} />
          <Route path="/terminal" element={<Terminal />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Dock />
    </div>
  );
}
