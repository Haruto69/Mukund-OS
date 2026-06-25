import React from "react";
import { Link } from "react-router-dom";

export function CyberButton({
  children,
  variant = "primary",
  size = "md",
  icon: Icon,
  disabled = false,
  className = "",
  onClick,
  to,
  href,
}) {
  const baseStyles =
    "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded font-mono uppercase tracking-widest transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50";

  const variants = {
    primary:
      "border border-primary-500 bg-primary-500/20 text-primary-100 shadow-glow-primary hover:bg-primary-500/40 hover:shadow-glow-primary-lg",
    crimson:
      "border border-primary-500 bg-primary-500/20 text-primary-100 shadow-glow-primary hover:bg-primary-500/40 hover:shadow-glow-primary-lg",
    secondary:
      "border border-primary-500/30 bg-white/[0.02] text-primary-300 hover:border-primary-500 hover:bg-primary-500/10 hover:shadow-glow-primary",
    ghost:
      "border border-transparent bg-transparent text-slate-400 hover:text-primary-300 hover:bg-white/5",
    danger:
      "border border-red-500/50 bg-red-500/10 text-red-200 shadow-[0_0_10px_rgba(239,68,68,0.2)] hover:border-red-500 hover:bg-red-500/30",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-[10px]",
    md: "px-4 py-2 text-xs",
    lg: "px-6 py-3 text-sm font-bold",
  };

  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  const content = (
    <>
      {/* Decorative scanline on hover for primary/secondary */}
      {(variant === "primary" || variant === "secondary") && (
        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
      )}
      {Icon && <Icon className="relative z-10 h-4 w-4" />}
      <span className="relative z-10">{children}</span>
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {content}
      </a>
    );
  }

  return (
    <button onClick={onClick} disabled={disabled} className={classes}>
      {content}
    </button>
  );
}
