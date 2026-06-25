import React from "react";

export function Logo({ className = "", size = 24 }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 100 100" 
      width={size} 
      height={size}
      className={`shrink-0 ${className}`}
      aria-hidden="true"
    >
      <rect width="100" height="100" rx="22" className="fill-[#0c0810] stroke-primary-500" strokeWidth="4"/>
      <g className="fill-none stroke-primary-300" strokeWidth="8" strokeLinecap="square" strokeLinejoin="miter">
        {/* M */}
        <polyline points="22,68 22,32 40,50 58,32 58,68" />
        {/* V */}
        <polyline points="68,32 78,50 88,32" />
      </g>
      {/* Cursor */}
      <rect x="68" y="63" width="20" height="5" className="fill-primary-400 animate-pulse" />
    </svg>
  );
}
