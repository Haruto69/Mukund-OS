import React from "react";

export function DataGrid({ children, variant = "auto", className = "" }) {
  const variants = {
    auto: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    two: "grid-cols-1 sm:grid-cols-2",
    three: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    four: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <div className={`grid gap-4 ${variants[variant]} ${className}`}>
      {children}
    </div>
  );
}
