import React, { forwardRef, useImperativeHandle, useRef } from "react";
import MVGlitch from "./MVGlitch";

/**
 * MV monogram — chromatic-glitch identity direction.
 *
 * Original angular MV monogram (M + nested V) drawn as a single-color SVG mark
 * using `currentColor`, so the surrounding MVGlitch wrapper can throw crisp red
 * and cyan chromatic ghosts during a burst. At rest the mark is a predominantly
 * neutral/white bold monogram with two restrained accent "veins" (one red, one
 * cyan) and a couple of digital fragments — memorable, but still legible at
 * navbar and favicon scale.
 *
 * Not derived from any Marvel / Sony / Spider-Man / PlayStation / Spider-Verse
 * mark — it is an original monogram.
 *
 * Imperative API (via ref): ref.current.burst({ strong }) — used by the Navbar
 * to fire a stronger burst during theme transitions.
 */
const MVLogo = forwardRef(function MVLogo(
  { className = "", size = 34, withHover = true, burstOnMount = true, title },
  ref
) {
  const glitchRef = useRef(null);
  useImperativeHandle(ref, () => ({
    burst: (opts) => glitchRef.current?.burst(opts),
  }));

  const height = Math.round(size * 0.76);
  const hoverHandlers = withHover
    ? {
        onMouseEnter: () => glitchRef.current?.burst({ strong: true }),
        onFocus: () => glitchRef.current?.burst({ strong: true }),
      }
    : {};

  return (
    <MVGlitch
      ref={glitchRef}
      burstOnMount={burstOnMount}
      className={`text-[var(--text)] ${className}`}
      {...hoverHandlers}
      {...(title ? { title } : {})}
    >
      <svg
        width={size}
        height={height}
        viewBox="0 0 132 96"
        fill="none"
        role="img"
        aria-label={title || "MV monogram"}
        style={{ display: "block", overflow: "visible" }}
      >
        {/* Restrained web-like guide lines behind the mark. */}
        <g
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.14"
          strokeLinecap="square"
        >
          <line x1="4" y1="14" x2="24" y2="6" />
          <line x1="128" y1="14" x2="108" y2="6" />
          <line x1="66" y1="4" x2="66" y2="16" />
        </g>

        {/* Core monogram — bold angular M + V, single currentColor stroke. */}
        <g
          stroke="currentColor"
          strokeWidth="9"
          strokeLinecap="square"
          strokeLinejoin="miter"
          fill="none"
        >
          {/* M */}
          <polyline points="14,82 14,22 40,54 66,22 66,82" />
          {/* V */}
          <polyline points="76,22 94,82 112,22" />
        </g>

        {/* Red accent "vein" — a single diagonal slash across the M valley. */}
        <line
          x1="24"
          y1="40"
          x2="52"
          y2="70"
          stroke="var(--accent-red)"
          strokeWidth="3"
          strokeLinecap="square"
          opacity="0.85"
        />
        {/* Cyan accent "vein" along the V. */}
        <line
          x1="100"
          y1="34"
          x2="86"
          y2="66"
          stroke="#22d3ee"
          strokeWidth="3"
          strokeLinecap="square"
          opacity="0.75"
        />

        {/* Digital fragments — tiny displaced squares. */}
        <rect x="60" y="10" width="5" height="5" fill="var(--accent-red)" opacity="0.8" />
        <rect x="118" y="70" width="4" height="4" fill="#22d3ee" opacity="0.7" />
        <rect x="8" y="70" width="4" height="4" fill="currentColor" opacity="0.5" />
      </svg>
    </MVGlitch>
  );
});

export default MVLogo;
