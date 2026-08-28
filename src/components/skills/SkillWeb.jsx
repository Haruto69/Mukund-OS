import React, { useMemo, useRef } from "react";
import { useInView } from "framer-motion";
import { buildSkillWeb } from "./webGeometry";

/**
 * The Skills constellation — a procedurally generated spider web rendered as
 * inline SVG.
 *
 * Structure, and why it is split this way:
 *
 *   - The <svg> is ENTIRELY decorative (`aria-hidden`). Strands, dots, glow
 *     and labels are paint; none of it is exposed to assistive tech.
 *   - The category controls are real HTML <button>s in an overlay, positioned
 *     over their nodes in percentage coordinates. SVG `<g role="button"
 *     tabindex="0">` looks equivalent but is not: Safari will not Tab to it,
 *     and focus events are unreliable even where it is focusable. Real buttons
 *     get keyboard focus, Enter/Space, :focus-visible and screen-reader
 *     support for free, in every browser.
 *   - Individual skills are owned by the readout's chips (see SkillsSection).
 *     The dots here are pointer-reactive mirrors of those chips, so no skill
 *     is ever reachable by hover alone.
 *
 * Animation is CSS-driven (see `index.css`), so the browser owns the timeline.
 * The strands' resting state is fully drawn — the entrance animation is an
 * enhancement layered on top, never the thing that makes them visible.
 */
export default function SkillWeb({
  categories,
  variant = "desktop",
  activeKey,
  activeSkillId = null,
  totalSkills,
  onSelect,
  onSkillEnter,
  onSkillLeave,
  reduced = false,
}) {
  const ref = useRef(null);
  // Positive margin on purpose: the draw-in is armed a few hundred px BEFORE
  // the web scrolls into view, so the animation is already running by the time
  // it is on screen rather than starting visibly late.
  const inView = useInView(ref, { once: true, margin: "260px 0px 260px 0px" });
  const drawn = reduced || inView;

  const web = useMemo(() => buildSkillWeb(categories, variant), [categories, variant]);
  const { preset: p, nodes, strands } = web;

  const activeIndex = categories.findIndex((c) => c.key === activeKey);
  const skillNode = activeSkillId
    ? (nodes.find((nd) => nd.id === activeSkillId) ?? null)
    : null;

  /** How lit a strand should be, given what the pointer/focus is on. */
  const strandState = (s) => {
    if (activeIndex < 0) return "base";
    if (!s.owners.includes(activeIndex)) return "dim";
    if (!skillNode) return "lit";
    // A skill is focused: light only its own branch and the spoke home to the
    // core, and hold the rest of its category at a middle tone.
    if (s.kind === "branch") return s.skillId === skillNode.id ? "lit" : "quiet";
    if (s.kind === "spoke") return "lit";
    return "quiet";
  };

  const nodeState = (nd) => {
    if (activeIndex < 0) return "base";
    if (nd.index !== activeIndex) return "dim";
    if (nd.kind === "category") return "lit";
    if (!skillNode) return "lit";
    return nd.id === skillNode.id ? "lit" : "quiet";
  };

  const showSkill = (nd) => p.showSkills === "all" || nd.index === activeIndex;

  /**
   * A branch only makes sense when the skill dot it runs to is painted. Where
   * only the active category's skills are drawn (mobile), the other branches
   * would be lines terminating in empty space, so they are not rendered at all.
   * No-op for the wide presets, which draw every skill.
   */
  const showStrand = (s) =>
    s.kind !== "branch" || p.showSkills === "all" || s.owners.includes(activeIndex);

  const showSkillLabel = (nd) => {
    if (p.labelSkills === "none" || !nd.label2) return false;
    if (p.labelSkills === "active") {
      return nd.index === activeIndex && (!skillNode || skillNode.id === nd.id);
    }
    return true;
  };

  const showCatLabel = (nd) =>
    p.labelCategories === "all" || nd.index === activeIndex;

  // Draw-in order: core → spokes → rings → branches → cross-links.
  const drawDelay = (depth, i) => `${0.12 + depth * 0.28 + (i % 7) * 0.045}s`;

  const catNodes = nodes.filter((nd) => nd.kind === "category");

  return (
    <div ref={ref} className="mv-web-host relative">
      <svg
        viewBox={web.viewBox}
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
        focusable="false"
        className={`mv-web mv-web--${variant} block h-auto w-full ${
          drawn ? "is-drawn" : ""
        } ${reduced ? "is-still" : ""}`}
      >
        <defs>
          <radialGradient id="mv-web-core" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--accent-red)" stopOpacity="0.55" />
            <stop offset="55%" stopColor="var(--accent-blue)" stopOpacity="0.22" />
            <stop offset="100%" stopColor="var(--accent-blue)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* ---- strands ---- */}
        <g className="mv-web-strands">
          {strands.filter(showStrand).map((s, i) => (
            <path
              key={s.id}
              d={s.d}
              className={`mv-web-strand mv-web-strand--${s.kind} is-${strandState(s)}`}
              pathLength="1"
              style={reduced ? undefined : { animationDelay: drawDelay(s.depth, i) }}
            />
          ))}
          {/* A single pulse travelling home along the active category's spoke. */}
          {!reduced && activeIndex >= 0 && (
            <path
              key={`pulse-${activeKey}`}
              d={strands.find((s) => s.kind === "spoke" && s.owners[0] === activeIndex)?.d}
              className="mv-web-pulse"
              pathLength="1"
            />
          )}
        </g>

        {/* ---- core ---- */}
        <g className="mv-web-core">
          <circle
            cx={web.core.x}
            cy={web.core.y}
            r={web.core.r * 2.1}
            fill="url(#mv-web-core)"
            className="mv-web-core-glow"
          />
          <circle cx={web.core.x} cy={web.core.y} r={web.core.r} className="mv-web-core-ring" />
          <text
            x={web.core.x}
            y={web.core.y}
            textAnchor="middle"
            className="mv-web-core-label"
            style={{ fontSize: p.coreFont }}
          >
            SKILLS
          </text>
          <text
            x={web.core.x}
            y={web.core.y + p.coreFont * 0.95}
            textAnchor="middle"
            className="mv-web-core-sub"
            style={{ fontSize: p.coreSubFont }}
          >
            {totalSkills}
          </text>
        </g>

        {/* ---- skill dots: pointer-reactive twins of the readout chips ---- */}
        <g>
          {nodes
            .filter((nd) => nd.kind === "skill" && showSkill(nd))
            .map((nd) => (
              <g
                key={nd.id}
                className={`mv-web-node mv-web-node--skill is-${nodeState(nd)}`}
                onMouseEnter={() => onSkillEnter?.(nd.key, nd.id)}
                onMouseLeave={() => onSkillLeave?.()}
              >
                <circle cx={nd.x} cy={nd.y} r={nd.r * 3.4} className="mv-web-hit" />
                <circle cx={nd.x} cy={nd.y} r={nd.r} className="mv-web-dot" />
                {showSkillLabel(nd) && (
                  <text
                    x={nd.label2.x}
                    y={nd.label2.y}
                    textAnchor={nd.label2.anchor}
                    className="mv-web-skill-label"
                    style={{ fontSize: p.skillFont }}
                  >
                    {nd.label}
                  </text>
                )}
              </g>
            ))}
        </g>

        {/* ---- category node marks (the buttons that drive them are below) ---- */}
        <g>
          {catNodes.map((nd) => (
            <g key={nd.id} className={`mv-web-node mv-web-node--cat is-${nodeState(nd)}`}>
              <circle cx={nd.x} cy={nd.y} r={nd.r * 2.2} className="mv-web-cat-halo" />
              <circle cx={nd.x} cy={nd.y} r={nd.r} className="mv-web-cat-dot" />
              {showCatLabel(nd) && (
                <text
                  x={nd.label2.x}
                  y={nd.label2.y}
                  textAnchor={nd.label2.anchor}
                  className="mv-web-cat-label"
                  style={{ fontSize: p.catFont }}
                >
                  {/* Long names wrap rather than being dropped (mobile). */}
                  {nd.label2.lines.map((line, li) => (
                    <tspan
                      key={line}
                      x={nd.label2.x}
                      dy={li === 0 ? 0 : nd.label2.lineHeight}
                    >
                      {line}
                    </tspan>
                  ))}
                </text>
              )}
            </g>
          ))}
        </g>
      </svg>

      {/* ---- the real controls ----
          One <button> per category node, positioned over it in percentages.
          The SVG scales uniformly (width:100% + height:auto keeps the box at
          the viewBox aspect ratio), so x/width and y/height map exactly onto
          the rendered mark underneath at every breakpoint. */}
      <div className="mv-web-controls" aria-label="Skill categories">
        {catNodes.map((nd) => (
          <button
            key={nd.id}
            type="button"
            aria-pressed={nd.index === activeIndex}
            aria-controls="skills-readout"
            className="mv-web-control"
            style={{
              left: `${(nd.x / p.width) * 100}%`,
              top: `${(nd.y / p.height) * 100}%`,
            }}
            onClick={() => onSelect?.(nd.key)}
            onMouseEnter={() => onSelect?.(nd.key)}
            onFocus={() => onSelect?.(nd.key)}
          >
            <span className="sr-only">
              {nd.label}, {nd.count} skills
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
