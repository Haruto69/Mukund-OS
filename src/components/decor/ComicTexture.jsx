import React from "react";

/**
 * Reusable fine print/grain texture — a subtler companion to HalftoneOverlay
 * for adding tactile "printed page" grain to a panel or hero without the
 * regular dot rhythm. Decorative + inert.
 */
export default function ComicTexture({ className = "", opacity }) {
  return (
    <div
      aria-hidden="true"
      className={`comic-grain pointer-events-none ${className || "absolute inset-0"}`}
      style={opacity != null ? { opacity } : undefined}
    />
  );
}
