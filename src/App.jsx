import React from "react";
import { ThemeProvider } from "./components/theme/ThemeProvider";
import Navbar from "./components/navigation/Navbar";
import HeroSection from "./sections/HeroSection";
import FeaturedProjectsSection from "./sections/FeaturedProjectsSection";
import AboutSection from "./sections/AboutSection";
import SkillsSection from "./sections/SkillsSection";
import ExperienceSection from "./sections/ExperienceSection";
import MoreProjectsSection from "./sections/MoreProjectsSection";
import ResumeSection from "./sections/ResumeSection";
import ContactSection from "./sections/ContactSection";
import { profile } from "./data/profile";

/**
 * Single long, normally-scrolling cinematic portfolio page.
 * Section order is the storytelling order used by the navbar.
 */
export default function App() {
  return (
    <ThemeProvider>
      <Navbar />
      <main>
        <HeroSection />
        <FeaturedProjectsSection />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <MoreProjectsSection />
        <ResumeSection />
        <ContactSection />
      </main>
      <footer className="border-t border-[var(--border)] px-4 py-8 text-center text-sm text-[var(--text-muted)] sm:px-6">
        © {new Date().getFullYear()} {profile.name}
      </footer>
    </ThemeProvider>
  );
}
