import React from "react";
import { ThemeProvider } from "./components/theme/ThemeProvider";
import { MotionProvider } from "./motion/MotionProvider";
import { ThemeTransitionProvider } from "./motion/ThemeTransitionProvider";
import { SceneNavigationProvider } from "./motion/SceneNavigationProvider";
import Navbar from "./components/navigation/Navbar";
import CityScene from "./components/background/CityScene";
import GlassField from "./components/effects/GlassField";
import ThemeTransitionOverlay from "./components/transitions/ThemeTransitionOverlay";
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
      <MotionProvider>
        <ThemeTransitionProvider>
          <SceneNavigationProvider>
            {/* Global background stack: city scene (behind) → glass field. */}
            <CityScene />
            <GlassField />
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
            <footer className="relative border-t border-[var(--border)] px-4 py-8 text-center text-sm text-[var(--text-muted)] sm:px-6" style={{ zIndex: "var(--z-content)" }}>
              © {new Date().getFullYear()} {profile.name}
            </footer>
            {/* Theme-transition / intro shutter — always on top, never blocks. */}
            <ThemeTransitionOverlay />
          </SceneNavigationProvider>
        </ThemeTransitionProvider>
      </MotionProvider>
    </ThemeProvider>
  );
}
