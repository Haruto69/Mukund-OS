import { useScroll, useTransform } from "framer-motion";

/**
 * Normalized scroll progress through a section, as a Framer Motion value
 * (never triggers a React re-render on its own):
 *
 *   0.0 -> section is just entering the viewport from below
 *   0.5 -> section is roughly centered in the viewport
 *   1.0 -> section has fully left the viewport above
 *
 * Later passes can bind this to Spider-Man crawl position, parallax offsets,
 * or layered reveals. For Pass 2 it only drives restrained ambient motion.
 *
 * @param {React.RefObject<HTMLElement>} ref - the section element to track
 */
export function useSectionProgress(ref) {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // `centered` peaks at 1 when the section is centered, falling off toward
  // its edges — convenient for effects that should be strongest mid-section.
  const centered = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

  return { progress: scrollYProgress, centered };
}
