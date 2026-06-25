export const SETTINGS_KEYS = {
  THEME: "cyberdeck-theme",
  REDUCED_MOTION: "cyberdeck-reduced-motion",
  ANIMATION_INTENSITY: "cyberdeck-animation-intensity",
  BOOT_SEQUENCE: "cyberdeck-boot-sequence",
  UI_DENSITY: "cyberdeck-ui-density",
  SOUND_EFFECTS: "cyberdeck-sound-effects",
};

export function getSetting(key, fallback = null) {
  const val = localStorage.getItem(key);
  if (val === null) return fallback;
  if (val === "true") return true;
  if (val === "false") return false;
  return val;
}

export function setSetting(key, value) {
  localStorage.setItem(key, value.toString());
}

export function applyTheme(theme) {
  setSetting(SETTINGS_KEYS.THEME, theme);
  document.documentElement.setAttribute("data-theme", theme);
}
