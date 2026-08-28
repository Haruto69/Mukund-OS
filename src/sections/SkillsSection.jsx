import React, { useCallback, useMemo, useState } from "react";
import Section from "./Section";
import SkillWeb from "../components/skills/SkillWeb";
import { skills, skillCategoryLabels } from "../data/skills";
import { useMotionContext } from "../motion/MotionProvider";

/**
 * Skills — a spider-web constellation rather than a card grid.
 *
 * Content is untouched: every category, skill, proof line and linked project
 * comes straight from `src/data/skills.js`. This section only changes how they
 * are presented, and the geometry of the web lives entirely in
 * `components/skills/webGeometry.js`, so skill data and visual layout stay
 * separate.
 *
 * Two surfaces, one state:
 *   - the web (SVG) is the spatial view — category nodes are real buttons;
 *   - the readout underneath is the textual view — it always shows the
 *     selected category's skills, proof and projects as plain, selectable
 *     text, so nothing in this section is hover-only.
 */
export default function SkillsSection() {
  const { tier, prefersReducedMotion } = useMotionContext();

  const categories = useMemo(
    () =>
      Object.entries(skills).map(([key, group]) => ({
        key,
        label: skillCategoryLabels[key] ?? key,
        skills: group.skills,
        proof: group.proof,
        projects: group.projects,
      })),
    [],
  );

  const totalSkills = useMemo(
    () => categories.reduce((n, c) => n + c.skills.length, 0),
    [categories],
  );

  const [activeKey, setActiveKey] = useState(categories[0].key);
  const [activeSkillId, setActiveSkillId] = useState(null);

  const active = categories.find((c) => c.key === activeKey) ?? categories[0];
  const activeIndex = categories.indexOf(active);

  const select = useCallback((key) => {
    setActiveKey(key);
    setActiveSkillId(null);
  }, []);

  const enterSkill = useCallback((key, id) => {
    setActiveKey(key);
    setActiveSkillId(id);
  }, []);

  const leaveSkill = useCallback(() => setActiveSkillId(null), []);

  const variant = tier === "mobile" ? "mobile" : tier === "tablet" ? "tablet" : "desktop";
  const isMobile = tier === "mobile";

  return (
    <Section id="skills" eyebrow="Toolkit" title="Skills">
      <p className="mv-content-scrim -mx-4 -my-2 mb-8 max-w-2xl rounded-2xl px-4 py-2 text-[var(--text-muted)] sm:-mx-6 sm:px-6">
        {totalSkills} skills, strung across {categories.length} strands. Pick a
        node — or a chip below — to follow one back to the core.
      </p>

      {/* On touch, the chip row is the primary selector: it gives every
          category a full-size tap target without asking anyone to hit a dot. */}
      {isMobile && (
        <div className="mb-5 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c.key}
              type="button"
              onClick={() => select(c.key)}
              aria-pressed={c.key === activeKey}
              className={`min-h-[44px] rounded-full border px-4 text-sm font-semibold transition-colors ${
                c.key === activeKey
                  ? "border-[var(--red)] bg-[var(--red)] text-white"
                  : "border-[var(--border)] bg-[var(--surface)] text-[var(--text)]"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      )}

      <div className="mv-content-scrim -mx-4 rounded-3xl px-2 py-4 sm:-mx-6 sm:px-4 sm:py-6">
        <SkillWeb
          categories={categories}
          variant={variant}
          activeKey={activeKey}
          activeSkillId={activeSkillId}
          totalSkills={totalSkills}
          onSelect={select}
          onSkillEnter={enterSkill}
          onSkillLeave={leaveSkill}
          reduced={prefersReducedMotion}
        />

        {/* ---- readout: the same data, as text ---- */}
        <div
          id="skills-readout"
          aria-live="polite"
          className="mt-6 border-t border-[var(--border)] px-2 pt-6 sm:px-4"
        >
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h3 className="text-lg font-bold tracking-tight text-[var(--text)]">
              {active.label}
            </h3>
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent-red-text)]">
              Strand {String(activeIndex + 1).padStart(2, "0")} /{" "}
              {String(categories.length).padStart(2, "0")}
            </span>
          </div>

          <ul className="mt-4 flex flex-wrap gap-2">
            {active.skills.map((skill, j) => {
              const id = `skill-${active.key}-${j}`;
              const lit = activeSkillId === id;
              return (
                <li key={skill}>
                  <button
                    type="button"
                    onMouseEnter={() => enterSkill(active.key, id)}
                    onMouseLeave={leaveSkill}
                    onFocus={() => enterSkill(active.key, id)}
                    onBlur={leaveSkill}
                    className={`min-h-[44px] rounded-full border px-3.5 text-[13px] transition-colors sm:min-h-[34px] sm:px-3 ${
                      lit
                        ? "border-[var(--red)] bg-[var(--red)] text-white"
                        : "border-[var(--border)] bg-[var(--surface)] text-[var(--text)] hover:border-[var(--red)]"
                    }`}
                  >
                    {skill}
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <div>
              <h4 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--blue)]">
                Evidence
              </h4>
              <ul className="mt-2 space-y-1.5">
                {active.proof.map((line) => (
                  <li
                    key={line}
                    className="relative pl-4 text-sm leading-relaxed text-[var(--text-muted)]"
                  >
                    <span
                      aria-hidden="true"
                      className="absolute left-0 top-[0.6em] h-1 w-1 rounded-[1px] bg-[var(--accent-red)]"
                    />
                    {line}
                  </li>
                ))}
              </ul>
            </div>

            {active.projects.length > 0 && (
              <div>
                <h4 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--blue)]">
                  Used in
                </h4>
                <ul className="mt-2 flex flex-wrap gap-1.5">
                  {active.projects.map((project) => (
                    <li
                      key={project}
                      className="rounded border border-[var(--border)] px-2 py-0.5 text-[13px] text-[var(--text-muted)]"
                    >
                      {project}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}
