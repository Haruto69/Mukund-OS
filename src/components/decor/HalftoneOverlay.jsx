import React from "react";

/**
 * Reusable comic halftone dot layer. Density/visibility is theme-controlled by
 * --halftone-opacity so it never fights readable text. Decorative + inert.
 *
 * @param {string} className   - extra positioning classes (defaults to full-bleed)
 * @param {number} [opacity]   - optional hard opacity override (else theme value)
 */
export default function HalftoneOverlay({ className = "", opacity }) {
  return (
    <div
      aria-hidden="true"
      className={`comic-halftone pointer-events-none ${className || "absolute inset-0"}`}
      style={opacity != null ? { opacity } : undefined}
    />
  );
}
