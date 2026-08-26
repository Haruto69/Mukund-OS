/**
 * Smoothly scroll to a section by id. Respects prefers-reduced-motion by
 * falling back to an instant jump.
 */
export function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;

  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  el.scrollIntoView({
    behavior: prefersReduced ? "auto" : "smooth",
    block: "start",
  });
}
