import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { desktopItems } from "../data/desktopItems";
import { Icon } from "./Icon";

export default function TopBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-ink/85 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="focus-ring flex items-center gap-3 rounded-lg" onClick={() => setIsOpen(false)}>
          <span className="grid h-9 w-9 place-items-center rounded-lg border border-teal-300/30 bg-teal-300/10 text-teal-200 shadow-glow">
            <Icon name="Cpu" className="h-5 w-5" />
          </span>
          <span className="flex items-baseline gap-2">
            <span className="text-sm font-semibold text-white sm:text-base">Mukund OS</span>
            <span className="hidden rounded-full border border-white/10 px-2 py-0.5 text-xs text-slate-400 sm:inline">
              v0.1
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
          {desktopItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `focus-ring rounded-lg px-3 py-2 text-sm transition ${
                  isActive
                    ? "bg-white/10 text-white"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`
              }
            >
              {item.title}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          className="focus-ring grid h-10 w-10 place-items-center rounded-lg border border-white/10 text-slate-200 lg:hidden"
          onClick={() => setIsOpen((value) => !value)}
          aria-label="Toggle navigation"
          aria-expanded={isOpen}
        >
          <Icon name={isOpen ? "X" : "Menu"} className="h-5 w-5" />
        </button>
      </div>

      {isOpen && (
        <nav className="border-t border-white/10 bg-ink/95 px-4 py-3 lg:hidden" aria-label="Mobile navigation">
          <div className="mx-auto grid max-w-7xl gap-2 sm:grid-cols-2">
            {desktopItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `focus-ring flex items-center gap-3 rounded-lg px-3 py-3 text-sm transition ${
                    isActive
                      ? "bg-white/10 text-white"
                      : "text-slate-300 hover:bg-white/5 hover:text-white"
                  }`
                }
              >
                <Icon name={item.icon} className="h-4 w-4" />
                {item.title}
              </NavLink>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
