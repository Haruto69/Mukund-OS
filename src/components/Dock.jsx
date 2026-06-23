import { Link, useLocation } from "react-router-dom";
import { desktopItems } from "../data/desktopItems";
import { Icon } from "./Icon";

const dockItems = [
  { title: "Desktop", path: "/", icon: "Home" },
  ...desktopItems,
];

export default function Dock() {
  const { pathname } = useLocation();

  return (
    <nav className="fixed inset-x-0 bottom-3 z-40 px-3" aria-label="Quick links">
      <div className="mx-auto flex max-w-fit gap-1 overflow-x-auto rounded-lg border border-white/10 bg-slate-950/80 p-2 shadow-2xl backdrop-blur-xl">
        {dockItems.map((item) => {
          const isActive = pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`focus-ring group relative grid h-11 w-11 shrink-0 place-items-center rounded-lg border transition sm:h-12 sm:w-12 ${
                isActive
                  ? "border-teal-300/50 bg-teal-300/15 text-teal-100"
                  : "border-white/10 bg-white/[0.03] text-slate-300 hover:border-white/25 hover:bg-white/10 hover:text-white"
              }`}
              aria-label={item.title}
              title={item.title}
            >
              <Icon name={item.icon} className="h-5 w-5" />
              <span className="pointer-events-none absolute bottom-14 hidden whitespace-nowrap rounded-lg border border-white/10 bg-slate-950 px-2 py-1 text-xs text-slate-200 shadow-xl group-hover:block">
                {item.title}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
