import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import MVLogo from "../branding/MVLogo";
import ThemeToggle from "../theme/ThemeToggle";
import { scrollToId } from "../../utils/scroll";

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

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const go = (id) => {
    setOpen(false);
    scrollToId(id);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-[var(--nav-bg)] backdrop-blur-md">
      <nav
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6"
        aria-label="Primary"
      >
        {/* Brand */}
        <button
          type="button"
          onClick={() => go("home")}
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
                onClick={() => go(link.id)}
                className="rounded-md px-3 py-2 text-sm font-medium uppercase tracking-wide text-[var(--text-muted)] transition-colors hover:text-[var(--red)]"
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
                  onClick={() => go(link.id)}
                  className="w-full rounded-md px-3 py-2 text-left text-sm font-medium uppercase tracking-wide text-[var(--text-muted)] transition-colors hover:bg-[var(--surface)] hover:text-[var(--red)]"
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
    </header>
  );
}
