/**
 * generate-resume-data.mjs — turns `public/Mukund_V_Resume.pdf` into
 * `src/data/resume.generated.js`.
 *
 * The PDF is the single source of truth for the native Resume section. This
 * script runs from `predev` and `prebuild`, so the rendered resume can never
 * drift from the file the View / Download buttons hand out.
 *
 * Design rules:
 *   - No resume CONTENT lives in here. Only structural knowledge: how a
 *     heading looks, how a bullet looks, how a two-column entry line looks.
 *     Every string that reaches the site is read out of the PDF.
 *   - No silent fallback. If extraction or validation fails the process exits
 *     non-zero and the dev server / build fails with it, rather than leaving a
 *     stale resume on the site.
 *   - Deterministic output. The emitted file records the PDF's SHA-256, never
 *     a timestamp, so an unchanged PDF regenerates byte-identical bytes.
 */

import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PDF_PATH = path.join(ROOT, "public", "Mukund_V_Resume.pdf");
const OUT_PATH = path.join(ROOT, "src", "data", "resume.generated.js");

/** Bumped when the emitted shape changes, so stale files are recognisable. */
const GENERATOR_VERSION = 1;

/* ------------------------------------------------------------------ */
/* structural vocabulary — headings we know how to render               */
/* ------------------------------------------------------------------ */

/**
 * Maps a normalised section heading to the block renderer it feeds. A heading
 * in the PDF that is not listed here is a hard failure: the site has nowhere
 * to put it, and dropping it quietly would mean the page no longer matches
 * the PDF.
 */
const SECTION_KINDS = [
  { kind: "summary", match: /^(summary|profile|objective|about|professional summary)$/ },
  { kind: "skills", match: /^(technical skills|skills|skills (&|and) tools|core skills)$/ },
  { kind: "projects", match: /^(projects|selected projects|personal projects|academic projects)$/ },
  {
    kind: "experience",
    match: /^(experience|work experience|professional experience|internships?|employment)$/,
  },
  { kind: "education", match: /^(education|academics)$/ },
  {
    kind: "achievements",
    match: /^(achievements|awards|honou?rs|achievements (&|and) awards|awards (&|and) honou?rs)$/,
  },
];

/** Every section the native Resume section renders. All are mandatory. */
const REQUIRED_KINDS = [
  "summary",
  "skills",
  "projects",
  "experience",
  "education",
  "achievements",
];

const BULLET_RE = /^[–—•·*\-]\s+/;
/** Minimum width of a run of spaces that counts as a column gutter, in pt. */
const GUTTER_MIN_WIDTH = 8;
/** Vertical tolerance when grouping text runs onto one visual line, in pt. */
const LINE_TOLERANCE = 2.5;
/** Extra indent (pt) that marks a wrapped continuation of the previous line. */
const CONTINUATION_INDENT = 4;

class ResumeParseError extends Error {}

const fail = (msg) => {
  throw new ResumeParseError(msg);
};

const squash = (s) => s.replace(/\s+/g, " ").trim();

/* ------------------------------------------------------------------ */
/* 1. read the PDF into positioned text runs + link annotations         */
/* ------------------------------------------------------------------ */

async function readPdf(buffer) {
  const pdfjs = await import("pdfjs-dist/legacy/build/pdf.mjs");
  const doc = await pdfjs.getDocument({
    data: new Uint8Array(buffer),
    useSystemFonts: false,
    isEvalSupported: false,
  }).promise;

  const pageCount = doc.numPages;
  const runs = [];
  const links = [];

  for (let p = 1; p <= pageCount; p += 1) {
    const page = await doc.getPage(p);

    for (const item of (await page.getTextContent()).items) {
      if (typeof item.str !== "string" || item.str === "") continue;
      runs.push({
        page: p,
        x: item.transform[4],
        y: item.transform[5],
        width: item.width,
        height: item.height,
        font: item.fontName,
        str: item.str,
        blank: item.str.trim() === "",
      });
    }

    for (const a of await page.getAnnotations()) {
      if (a.subtype === "Link" && typeof a.url === "string" && a.url) {
        links.push({ page: p, url: a.url, rect: a.rect });
      }
    }
    page.cleanup();
  }

  await doc.destroy();
  if (runs.length === 0) fail("the PDF yielded no text runs (is it a scan?)");
  return { runs, links, pageCount };
}

/** Groups text runs into visual lines, in reading order. */
function toLines(runs) {
  const sorted = [...runs].sort(
    (a, b) => a.page - b.page || b.y - a.y || a.x - b.x,
  );

  const lines = [];
  let current = null;
  for (const run of sorted) {
    if (
      !current ||
      run.page !== current.page ||
      Math.abs(run.y - current.y) > LINE_TOLERANCE
    ) {
      current = { page: run.page, y: run.y, segments: [] };
      lines.push(current);
    }
    current.segments.push(run);
  }

  for (const line of lines) {
    line.segments.sort((a, b) => a.x - b.x);
    line.words = line.segments.filter((s) => !s.blank);
    line.text = squash(line.segments.map((s) => s.str).join(""));
    line.x = line.segments[0].x;
    line.font = line.words[0]?.font ?? line.segments[0].font;
    line.height = line.words.length
      ? Math.max(...line.words.map((s) => s.height))
      : 0;
  }

  return lines.filter((l) => l.words.length > 0);
}

/**
 * Splits a two-column line ("Title …gutter… Right") on its widest run of
 * spaces. Used for title/date and degree/note pairs — no fixed offsets.
 */
function splitOnGutter(line) {
  let best = null;
  for (const seg of line.segments) {
    if (
      seg.blank &&
      seg.width >= GUTTER_MIN_WIDTH &&
      (!best || seg.width > best.width)
    ) {
      best = seg;
    }
  }
  if (!best) return { left: line.text, right: "", leftSegments: line.words };
  const leftSegs = line.segments.filter((s) => s.x < best.x);
  const rightSegs = line.segments.filter((s) => s.x > best.x);
  return {
    left: squash(leftSegs.map((s) => s.str).join("")),
    right: squash(rightSegs.map((s) => s.str).join("")),
    leftSegments: leftSegs.filter((s) => !s.blank),
  };
}

/* ------------------------------------------------------------------ */
/* 2. work out the document's own font vocabulary                       */
/* ------------------------------------------------------------------ */

/**
 * The parser never hardcodes font names. It learns them from the document:
 * the body font is whichever face carries the most text; anything at body
 * size in another face is an entry title; anything smaller is a subtitle.
 */
function profileFonts(lines) {
  const chars = new Map();
  const heights = new Map();
  for (const line of lines) {
    for (const seg of line.words) {
      chars.set(seg.font, (chars.get(seg.font) ?? 0) + seg.str.length);
      heights.set(seg.font, Math.max(heights.get(seg.font) ?? 0, seg.height));
    }
  }
  const ranked = [...chars.entries()].sort((a, b) => b[1] - a[1]);
  if (ranked.length === 0) fail("the PDF contains no readable text");
  const bodyFont = ranked[0][0];
  return { bodyFont, bodySize: heights.get(bodyFont) };
}

/* ------------------------------------------------------------------ */
/* 3. split the document into header + headed sections                  */
/* ------------------------------------------------------------------ */

function findSections(lines, fonts) {
  const nameLine = lines[0];
  const headingFont = nameLine.font;
  const nameSize = nameLine.height;
  const leftMargin = Math.min(...lines.map((l) => l.x));

  const isHeading = (line) =>
    line !== nameLine &&
    line.words.every((s) => s.font === headingFont) &&
    line.height < nameSize - 0.5 &&
    line.height > fonts.bodySize - 0.5 &&
    line.x <= leftMargin + 2 &&
    !BULLET_RE.test(line.text);

  const headingIdx = lines
    .map((l, i) => (isHeading(l) ? i : -1))
    .filter((i) => i >= 0);

  if (headingIdx.length < 3) {
    fail(
      "could not identify section headings in the PDF — the layout has " +
        `changed too much to parse (found ${headingIdx.length}).`,
    );
  }

  const header = lines.slice(0, headingIdx[0]);
  const sections = headingIdx.map((start, n) => {
    const end = headingIdx[n + 1] ?? lines.length;
    const heading = lines[start].text;
    const normalised = heading.toLowerCase().replace(/[:.]+$/, "").trim();
    const entry = SECTION_KINDS.find((s) => s.match.test(normalised));
    if (!entry) {
      fail(
        `unrecognised resume section "${heading}". The site has no block for ` +
          "it. Add it to SECTION_KINDS in scripts/generate-resume-data.mjs " +
          "and render it in src/sections/ResumeSection.jsx.",
      );
    }
    return { kind: entry.kind, heading, lines: lines.slice(start + 1, end) };
  });

  const seen = new Set();
  for (const s of sections) {
    if (seen.has(s.kind)) {
      fail(`the PDF has two "${s.kind}" sections (second one: "${s.heading}")`);
    }
    seen.add(s.kind);
  }
  for (const kind of REQUIRED_KINDS) {
    if (!seen.has(kind)) fail(`the PDF is missing its ${kind} section`);
  }

  return { nameLine, header, sections };
}

/* ------------------------------------------------------------------ */
/* 4. links — read from the PDF's own annotations, never guessed        */
/* ------------------------------------------------------------------ */

function makeLinkResolver(links) {
  const used = new Set();
  return {
    /** URL of the annotation covering these text runs, or null. */
    for(segments) {
      if (segments.length === 0) return null;
      const page = segments[0].page;
      const x0 = Math.min(...segments.map((s) => s.x));
      const x1 = Math.max(...segments.map((s) => s.x + s.width));
      const y = segments[0].y;
      for (let i = 0; i < links.length; i += 1) {
        const l = links[i];
        if (l.page !== page) continue;
        const [rx0, ry0, rx1, ry1] = l.rect;
        if (y < ry0 - 1 || y > ry1 + 1) continue;
        const overlap = Math.min(x1, rx1) - Math.max(x0, rx0);
        if (overlap > 0 && overlap >= (x1 - x0) * 0.5) {
          used.add(i);
          return l.url;
        }
      }
      return null;
    },
    unusedCount: () => links.length - used.size,
  };
}

/**
 * Classifies a contact entry. The href comes from the PDF's own annotation
 * when there is one; the only thing derived from the label is a `tel:` /
 * `mailto:` for a phone number or address that the PDF prints without a link.
 * URLs are never guessed from names.
 */
function linkKind(url, label) {
  if (!url) {
    if (/^\+?\d[\d\s()\-.]{6,}$/.test(label)) {
      return { kind: "phone", href: `tel:${label.replace(/[^\d+]/g, "")}` };
    }
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(label)) {
      return { kind: "email", href: `mailto:${label}` };
    }
    return { kind: "link", href: null };
  }
  if (url.startsWith("tel:")) return { kind: "phone", href: url };
  if (url.startsWith("mailto:")) return { kind: "email", href: url };
  if (/linkedin\.com/i.test(url)) return { kind: "linkedin", href: url };
  if (/github\.com/i.test(url)) return { kind: "github", href: url };
  return { kind: "link", href: url };
}

/* ------------------------------------------------------------------ */
/* 5. block parsers                                                     */
/* ------------------------------------------------------------------ */

function parseHeader(header, resolveLink) {
  if (header.length === 0) {
    fail("no identity block found above the first section heading");
  }
  const [nameLine, ...rest] = header;
  const name = nameLine.text;

  let contactIdx = -1;
  for (let i = rest.length - 1; i >= 0; i -= 1) {
    const hasLink = Boolean(resolveLink.for(rest[i].words));
    if (hasLink || /[@]|\bhttps?:/.test(rest[i].text)) {
      contactIdx = i;
      break;
    }
  }
  if (contactIdx < 0) fail("no contact line found in the resume header");

  const headline = squash(
    rest
      .slice(0, contactIdx)
      .map((l) => l.text)
      .join(" "),
  );

  const contactLine = rest[contactIdx];

  // Fonts used on the contact line for actual words are text fonts; every
  // other font present in the header is an icon face (envelope, GitHub mark,
  // …) whose glyphs must not leak into the labels.
  const textFonts = new Set(
    contactLine.words
      .filter((s) => /[A-Za-z0-9@+]/.test(s.str))
      .map((s) => s.font),
  );
  const iconFonts = new Set(
    header.flatMap((l) => l.words.map((s) => s.font)).filter((f) => !textFonts.has(f)),
  );

  // Split the contact line on its "|" / "•" separators.
  const groups = [[]];
  for (const seg of contactLine.words) {
    if (/^[|•·/]$/.test(seg.str.trim())) groups.push([]);
    else groups[groups.length - 1].push(seg);
  }

  const contacts = [];
  for (const group of groups) {
    const textSegs = group.filter((s) => !iconFonts.has(s.font));
    const label = squash(textSegs.map((s) => s.str).join(""));
    if (!label) continue;
    const url = resolveLink.for(group);
    const { kind, href } = linkKind(url, label);
    contacts.push({
      label,
      href,
      kind,
      ...(href && /^https?:/i.test(href) ? { external: true } : {}),
    });
  }

  if (contacts.length === 0) fail("the contact line produced no entries");
  return { name, headline, contacts };
}

function parseSummary(lines) {
  return squash(lines.map((l) => l.text).join(" "));
}

function parseSkills(lines) {
  return lines.map((line) => {
    const labelFont = line.words[0].font;
    const split = line.words.findIndex((s) => s.font !== labelFont);
    if (split <= 0) {
      fail(
        `skills row "${line.text}" has no label / values split — the two ` +
          "columns are set in the same font",
      );
    }
    return {
      label: squash(line.words.slice(0, split).map((s) => s.str).join("")),
      items: squash(line.words.slice(split).map((s) => s.str).join(" ")),
    };
  });
}

/**
 * Shared reader for the entry-shaped sections (Projects, Experience,
 * Education). An entry starts on a line whose first run is set at body size
 * in a non-body face (the bold title/date line); a smaller face underneath is
 * a subtitle; "–" lines are bullets; anything indented past the section's left
 * margin is a wrapped continuation of the line before it.
 */
function readEntries(lines, fonts, resolveLink, label) {
  const left = Math.min(...lines.map((l) => l.x));
  const entries = [];
  let last = null; // "subtitle" | "bullet" | "detail"

  const continueLine = (text) => {
    const e = entries[entries.length - 1];
    if (last === "bullet") e.bullets[e.bullets.length - 1] += ` ${text}`;
    else if (last === "subtitle") e.subtitle = squash(`${e.subtitle} ${text}`);
    else if (last === "detail") e.details[e.details.length - 1] += ` ${text}`;
    else fail(`${label}: cannot attach wrapped line "${text}" to anything`);
  };

  for (const line of lines) {
    if (BULLET_RE.test(line.text)) {
      const e = entries[entries.length - 1];
      if (!e) fail(`${label}: bullet "${line.text}" appears before any entry title`);
      e.bullets.push(squash(line.text.replace(BULLET_RE, "")));
      last = "bullet";
      continue;
    }

    if (entries.length > 0 && line.x > left + CONTINUATION_INDENT) {
      continueLine(line.text);
      continue;
    }

    const isTitle =
      line.font !== fonts.bodyFont && line.height >= fonts.bodySize - 0.5;
    if (isTitle) {
      const { left: title, right: dates, leftSegments } = splitOnGutter(line);
      entries.push({
        title,
        dates,
        href: resolveLink.for(leftSegments),
        subtitle: "",
        details: [],
        asides: [],
        bullets: [],
      });
      last = null;
      continue;
    }

    const e = entries[entries.length - 1];
    if (!e) fail(`${label}: line "${line.text}" appears before any entry title`);
    if (line.height < fonts.bodySize - 0.5 && e.bullets.length === 0) {
      e.subtitle = squash(`${e.subtitle} ${line.text}`);
      last = "subtitle";
    } else {
      const { left: main, right: aside } = splitOnGutter(line);
      e.details.push(main);
      if (aside) e.asides.push(aside);
      last = "detail";
    }
  }

  if (entries.length === 0) fail(`${label}: no entries found`);
  for (const e of entries) {
    e.bullets = e.bullets.map(squash);
    e.details = e.details.map(squash);
  }
  return entries;
}

function parseBulletList(lines, label) {
  const left = Math.min(...lines.map((l) => l.x));
  const bullets = [];
  for (const line of lines) {
    if (BULLET_RE.test(line.text)) {
      bullets.push(squash(line.text.replace(BULLET_RE, "")));
    } else if (bullets.length > 0 && line.x > left + CONTINUATION_INDENT) {
      bullets[bullets.length - 1] += ` ${line.text}`;
    } else {
      bullets.push(line.text);
    }
  }
  if (bullets.length === 0) fail(`${label}: no items found`);
  return bullets.map(squash);
}

/* ------------------------------------------------------------------ */
/* 6. assemble + validate                                              */
/* ------------------------------------------------------------------ */

function buildResume(lines, links) {
  const fonts = profileFonts(lines);
  const resolveLink = makeLinkResolver(links);
  const { header, sections } = findSections(lines, fonts);

  const out = { identity: parseHeader(header, resolveLink) };
  const warnings = [];

  for (const section of sections) {
    if (section.lines.length === 0) {
      fail(`the "${section.heading}" section is empty`);
    }
    switch (section.kind) {
      case "summary":
        out.summary = parseSummary(section.lines);
        break;
      case "skills":
        out.skills = parseSkills(section.lines);
        break;
      case "projects":
        out.projects = readEntries(section.lines, fonts, resolveLink, "Projects").map(
          (e) => ({
            title: e.title,
            dates: e.dates,
            stack: squash([e.subtitle, ...e.details].filter(Boolean).join(" ")),
            href: e.href,
            bullets: e.bullets,
          }),
        );
        break;
      case "experience":
        out.experience = readEntries(section.lines, fonts, resolveLink, "Experience").map(
          (e) => ({
            role: e.title,
            dates: e.dates,
            subtitle: squash([e.subtitle, ...e.details].filter(Boolean).join(" ")),
            href: e.href,
            bullets: e.bullets,
          }),
        );
        break;
      case "education":
        out.education = readEntries(section.lines, fonts, resolveLink, "Education").map(
          (e) => ({
            institution: e.title,
            dates: e.dates,
            degree: squash([e.subtitle, ...e.details].filter(Boolean).join(" ")),
            note: e.asides.join(" ") || null,
            bullets: e.bullets,
          }),
        );
        break;
      case "achievements":
        out.achievements = parseBulletList(section.lines, "Achievements");
        break;
      default:
        fail(`no parser for section kind "${section.kind}"`);
    }
  }

  /* ---- validation: refuse to emit anything hollow ---- */

  if (!out.identity.name) fail("no name found at the top of the resume");
  if (!out.identity.headline) warnings.push("no headline line found under the name");
  if (out.identity.contacts.length < 2) {
    fail(`only ${out.identity.contacts.length} contact entry/entries found in the header`);
  }
  if (out.summary.length < 40) fail("the summary section is suspiciously short");
  if (out.skills.length === 0) fail("no technical-skill rows were parsed");
  for (const s of out.skills) {
    if (!s.label || !s.items) {
      fail(`skills row "${s.label || s.items}" is missing one of its two sides`);
    }
  }
  if (out.projects.length === 0) fail("no projects were parsed");
  for (const p of out.projects) {
    if (!p.title) fail("a project entry has no title");
    if (p.bullets.length === 0) fail(`project "${p.title}" has no bullets`);
    if (!p.href) {
      warnings.push(`project "${p.title}" carries no link annotation in the PDF`);
    }
  }
  if (out.experience.length === 0) fail("no experience entries were parsed");
  for (const x of out.experience) {
    if (!x.role) fail("an experience entry has no role line");
    if (x.bullets.length === 0) fail(`experience entry "${x.role}" has no bullets`);
  }
  if (out.education.length === 0) fail("no education entries were parsed");
  for (const e of out.education) {
    if (!e.institution) fail("an education entry has no institution");
    if (!e.degree) fail(`education entry "${e.institution}" has no degree line`);
  }
  if (out.achievements.length === 0) fail("no achievements were parsed");

  const orphaned = resolveLink.unusedCount();
  if (orphaned > 0) {
    warnings.push(
      `${orphaned} link annotation(s) in the PDF were not matched to any text ` +
        "and are therefore not shown on the site",
    );
  }

  return { resume: out, warnings };
}

/* ------------------------------------------------------------------ */
/* 7. emit                                                             */
/* ------------------------------------------------------------------ */

function render(resume, meta) {
  const k = (name, value) =>
    `export const ${name} = ${JSON.stringify(value, null, 2)};\n`;

  return [
    "/**",
    ` * AUTO-GENERATED FROM public/${meta.file}`,
    " * DO NOT EDIT MANUALLY.",
    " *",
    " * Regenerate with `npm run generate:resume`; `predev` / `prebuild` do it",
    " * for you. To change what the site shows, replace the PDF — not this file.",
    " *",
    ` * source:    public/${meta.file}`,
    ` * sha256:    ${meta.sha256}`,
    ` * generator: scripts/generate-resume-data.mjs v${meta.generator}`,
    " *",
    " * No generation timestamp is recorded, on purpose: the output is a pure",
    " * function of the PDF above, so an unchanged PDF regenerates byte-identical",
    " * output and never produces a spurious git diff.",
    " */",
    "",
    k("RESUME_SOURCE", {
      file: `public/${meta.file}`,
      sha256: meta.sha256,
      generator: meta.generator,
    }),
    k("RESUME_URL", `/${meta.file}`),
    k("resumeIdentity", resume.identity),
    k("resumeSummary", resume.summary),
    k("resumeSkills", resume.skills),
    k("resumeProjects", resume.projects),
    k("resumeExperience", resume.experience),
    k("resumeEducation", resume.education),
    k("resumeAchievements", resume.achievements),
  ].join("\n");
}

export async function generateResumeData({ quiet = false } = {}) {
  if (!fs.existsSync(PDF_PATH)) {
    fail(
      `${path.relative(ROOT, PDF_PATH).replace(/\\/g, "/")} is missing — ` +
        "the resume cannot be generated",
    );
  }
  const buffer = fs.readFileSync(PDF_PATH);
  const sha256 = crypto.createHash("sha256").update(buffer).digest("hex");

  const { runs, links, pageCount } = await readPdf(buffer);
  const lines = toLines(runs);
  const { resume, warnings } = buildResume(lines, links);

  const contents = render(resume, {
    file: path.basename(PDF_PATH),
    sha256,
    generator: GENERATOR_VERSION,
  });

  const existing = fs.existsSync(OUT_PATH) ? fs.readFileSync(OUT_PATH, "utf8") : null;
  const changed = existing !== contents;
  if (changed) fs.writeFileSync(OUT_PATH, contents, "utf8");

  for (const w of warnings) console.warn(`  ! resume: ${w}`);
  if (!quiet) {
    console.log(
      `resume: ${path.relative(ROOT, OUT_PATH).replace(/\\/g, "/")} ` +
        `${changed ? "updated" : "already up to date"} — ${pageCount} page(s), ` +
        `${resume.projects.length} projects, ${resume.experience.length} experience, ` +
        `sha256 ${sha256.slice(0, 12)}…`,
    );
  }

  return { changed, sha256, resume, contents };
}

const invokedDirectly =
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (invokedDirectly) {
  try {
    await generateResumeData();
  } catch (err) {
    console.error("\nResume generation FAILED — refusing to emit stale resume data.");
    console.error(err instanceof ResumeParseError ? `  ${err.message}` : err);
    console.error(
      "\nThe native Resume section is generated from public/Mukund_V_Resume.pdf.\n" +
        "Fix the PDF, or extend scripts/generate-resume-data.mjs, then rerun.\n",
    );
    process.exit(1);
  }
}
