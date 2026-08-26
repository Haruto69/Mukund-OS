import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { useMotionContext } from "../../motion/MotionProvider";

/**
 * Lightweight reveal-on-scroll primitive. Fully inert under
 * prefers-reduced-motion (renders children with no animation at all).
 *
 * Intentionally used sparingly in Pass 2 — this is the hook later passes
 * (Resume layered reveals, etc.) build on, not a blanket scroll-animation
 * wrapper.
 */
export default function Reveal({
  children,
  as: Component = "div",
  delay = 0,
  y = 16,
  className = "",
  once = true,
}) {
  const { prefersReducedMotion } = useMotionContext();
  const MotionComponent = useMemo(() => motion.create(Component), [Component]);

  if (prefersReducedMotion) {
    const Plain = Component;
    return <Plain className={className}>{children}</Plain>;
  }

  return (
    <MotionComponent
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-10% 0px -10% 0px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
    >
      {children}
    </MotionComponent>
  );
}
