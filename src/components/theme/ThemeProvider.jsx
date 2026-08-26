import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

/**
 * Two character-based themes for the redesign foundation:
 *   - "peter" -> light theme (system light)
 *   - "miles" -> dark theme  (system dark)
 *
 * Initial theme follows the OS preference. If the visitor manually switches,
 * the choice is remembered in sessionStorage for the rest of the session and
 * stops tracking the OS. (No localStorage — old CyberDeck theme must not win.)
 */

export const THEMES = { PETER: "peter", MILES: "miles" };

const SESSION_OVERRIDE_KEY = "portfolio-theme-override";
const DARK_QUERY = "(prefers-color-scheme: dark)";

const ThemeContext = createContext(null);

function systemTheme() {
  if (typeof window === "undefined" || !window.matchMedia) return THEMES.PETER;
  return window.matchMedia(DARK_QUERY).matches ? THEMES.MILES : THEMES.PETER;
}

function storedOverride() {
  try {
    const v = sessionStorage.getItem(SESSION_OVERRIDE_KEY);
    return v === THEMES.PETER || v === THEMES.MILES ? v : null;
  } catch {
    return null;
  }
}

export function ThemeProvider({ children }) {
  // Whether the visitor has manually overridden the system preference.
  const [hasOverride, setHasOverride] = useState(() => storedOverride() !== null);
  const [theme, setThemeState] = useState(() => storedOverride() ?? systemTheme());

  // Reflect the current theme onto <html data-theme="...">.
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Track the OS preference until the visitor manually overrides it.
  useEffect(() => {
    if (hasOverride || !window.matchMedia) return;
    const mql = window.matchMedia(DARK_QUERY);
    const onChange = (e) => setThemeState(e.matches ? THEMES.MILES : THEMES.PETER);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [hasOverride]);

  const setTheme = (next) => {
    setThemeState(next);
    setHasOverride(true);
    try {
      sessionStorage.setItem(SESSION_OVERRIDE_KEY, next);
    } catch {
      /* sessionStorage unavailable — theme still applies for this view */
    }
  };

  const toggleTheme = () =>
    setTheme(theme === THEMES.MILES ? THEMES.PETER : THEMES.MILES);

  const value = useMemo(
    () => ({ theme, isDark: theme === THEMES.MILES, setTheme, toggleTheme }),
    [theme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
  return ctx;
}
