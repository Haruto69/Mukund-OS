import React, { useMemo } from "react";
import { getPoster } from "./posterConfig";

/**
 * The poster SLOT for a featured project card.
 *
 * Two mutually exclusive renders:
 *   1. A real poster image, once `posterConfig` supplies a path (later pass).
 *   2. A generated, theme-token-derived placeholder treatment — project
 *      gradient + abstract geometry + the project's own initials/category.
 *
 * No stock photography, no screenshots, no generated imagery of people. The
 * placeholder is deliberately abstract so it reads as "art pending", and is
 * replaced by a single `image` path swap in posterConfig.js.
 */
export default function ProjectPoster({ project, index = 0, className = "" }) {
  const poster = useMemo(() => getPoster(project, index), [project, index]);

  if (poster.image) {
    return (
      <img
        src={poster.image}
        alt={poster.alt}
        loading={index === 0 ? "eager" : "lazy"}
        decoding="async"
        className={`h-full w-full object-cover ${className}`}
      />
    );
  }

  return (
    <div
      aria-hidden="true"
      className={`relative h-full w-full overflow-hidden ${className}`}
      style={{
        background: `linear-gradient(135deg,
          color-mix(in srgb, ${poster.from} 26%, var(--bg-deep)) 0%,
          color-mix(in srgb, ${poster.from} 10%, var(--bg-deep)) 42%,
          color-mix(in srgb, ${poster.to} 22%, var(--bg-deep)) 100%)`,
      }}
    >
      {/* Abstract geometry — thin diagonal rails + an arc, drawn from the
          same accent tokens so both themes stay coherent. */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 160 90"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <g
          stroke={poster.to}
          strokeWidth="0.25"
          opacity="0.5"
          vectorEffect="non-scaling-stroke"
        >
          <path d="M-20 96 L88 -6" />
          <path d="M4 96 L112 -6" />
          <path d="M28 96 L136 -6" />
        </g>
        <g stroke={poster.from} strokeWidth="0.4" opacity="0.42">
          <circle cx="126" cy="24" r="30" />
          <circle cx="126" cy="24" r="46" opacity="0.5" />
        </g>
        <path
          d="M0 70 L40 70 L52 58 L160 58"
          stroke={poster.from}
          strokeWidth="0.5"
          opacity="0.45"
        />
      </svg>

      {/* Halftone film so posters sit in the site's comic-tech language. */}
      <div className="comic-halftone pointer-events-none absolute inset-0" />

      {/* Project initials watermark — real data, not invented copy. */}
      <span
        className="absolute left-[6%] top-[8%] select-none font-bold leading-none tracking-tighter"
        style={{
          fontSize: "clamp(4rem, 16vw, 15rem)",
          color: "color-mix(in srgb, var(--text) 12%, transparent)",
        }}
      >
        {poster.initials}
      </span>

      {/* Bottom vignette keeps the card footer text readable over the art. */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3"
        style={{
          background:
            "linear-gradient(to top, color-mix(in srgb, var(--bg) 92%, transparent) 8%, transparent 100%)",
        }}
      />
    </div>
  );
}
