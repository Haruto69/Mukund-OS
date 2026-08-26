import React, { useState } from "react";
import { motion, useMotionValueEvent } from "framer-motion";
import { Menu, X } from "lucide-react";
import MVLogo from "../branding/MVLogo";
import ThemeToggle from "../theme/ThemeToggle";
import { useMotionContext } from "../../motion/MotionProvider";
import { useSceneNavigation } from "../../motion/SceneNavigationProvider";

/** Section links. `id` matches the DOM id of each <section>. */
const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "featured-projects", label: "Projects" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "resume", label: "Resume" },
  { id: "contact", label: "Contact" },
];

// Small buffer near the very top of the page so the Navbar never hides
// while the visitor is still essentially at the Hero.
const HIDE_THRESHOLD = 120;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { scrollY, scrollDirection, prefersReducedMotion } = useMotionContext();
  const { activeSection, navigateToSection } = useSceneNavigation();

  const [pastTop, setPastTop] = useState(false);
  useMotionValueEvent(scrollY, "change", (latest) => {
    const next = latest > HIDE_THRESHOLD;
    setPastTop((prev) => (prev === next ? prev : next));
  });

  const showBackdrop = activeSection !== "home";
  // Reduced motion: never hide the Navbar — keep the experience static and
  // predictable rather than choreographing scroll-driven show/hide.
  const hidden =
    !prefersReducedMotion && scrollDirection === "down" && pastTop && !open;

  const go = (id, source) => {
    setOpen(false);
    navigateToSection(id, { source });
  };

  const isActive = (id) =>
    id === activeSection ||
    (id === "featured-projects" && activeSection === "projects");

  return (
    <motion.header
      className="fixed inset-x-0 top-0"
      style={{ zIndex: "var(--z-navbar)" }}
      animate={{ y: hidden ? "-100%" : "0%" }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.3, ease: "easeInOut" }}
    >
      <div
        className={`transition-colors duration-300 ${
          showBackdrop
            ? "border-b border-[var(--border)] bg-[var(--nav-bg)] backdrop-blur-sm"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <nav
          className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6"
          aria-label="Primary"
        >
          {/* Brand */}
          <button
            type="button"
            onClick={() => go("home", "navbar-logo")}
            className="flex items-center gap-2 rounded-md"
            aria-label="Go to top"
          >
            <MVLogo />
          </button>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <button
                  type="button"
                  onClick={() => go(link.id, "navbar-desktop")}
                  aria-current={isActive(link.id) ? "true" : undefined}
                  className={`relative rounded-md px-3 py-2 text-sm font-medium uppercase tracking-wide transition-colors after:absolute after:inset-x-3 after:-bottom-0.5 after:h-0.5 after:scale-x-0 after:bg-[var(--red)] after:transition-transform after:content-[''] hover:text-[var(--red)] ${
                    isActive(link.id)
                      ? "text-[var(--text)] after:scale-x-100"
                      : "text-[var(--text-muted)]"
                  }`}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <div className="hidden md:block">
              <ThemeToggle />
            </div>

            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-[var(--text)] md:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>

        {/* Mobile dropdown (below the navbar, not fullscreen) */}
        {open && (
          <div
            id="mobile-menu"
            className="border-t border-[var(--border)] bg-[var(--nav-bg)] backdrop-blur-md md:hidden"
          >
            <ul className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3">
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <button
                    type="button"
                    onClick={() => go(link.id, "navbar-mobile")}
                    aria-current={isActive(link.id) ? "true" : undefined}
                    className={`w-full rounded-md px-3 py-2 text-left text-sm font-medium uppercase tracking-wide transition-colors hover:bg-[var(--surface)] hover:text-[var(--red)] ${
                      isActive(link.id) ? "text-[var(--red)]" : "text-[var(--text-muted)]"
                    }`}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
              <li className="mt-2 border-t border-[var(--border)] pt-3">
                <ThemeToggle className="w-full justify-center" />
              </li>
            </ul>
          </div>
        )}
      </div>
    </motion.header>
  );
}
