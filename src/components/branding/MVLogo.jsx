import React from "react";

/**
 * Clean placeholder MV mark for Pass 1.
 *
 * The final logo will use a custom angular "Glitch Vein" MV design — this is a
 * simple, self-contained replacement point so that later work only needs to
 * swap the internals of this one component.
 */
export default function MVLogo({ className = "", size = 34 }) {
  return (
    <span
      className={`inline-flex select-none items-center justify-center rounded-md font-display font-bold leading-none tracking-tight text-[var(--red)] ${className}`}
      style={{ width: size, height: size, fontSize: size * 0.5 }}
      aria-hidden="true"
    >
      MV
    </span>
  );
}
