import React from "react";
import { Mail, Github, Linkedin } from "lucide-react";
import Section from "./Section";
import { socials } from "../data/socials";

// Only real data present in the repo. No phone exists in the data, so it is
// intentionally omitted rather than fabricated.
const emailAddress = socials.email.replace(/^mailto:/, "");

const links = [
  { label: "Email", value: emailAddress, href: socials.email, Icon: Mail },
  { label: "GitHub", value: socials.github, href: socials.github, Icon: Github },
  { label: "LinkedIn", value: socials.linkedin, href: socials.linkedin, Icon: Linkedin },
];

export default function ContactSection() {
  return (
    <Section id="contact" eyebrow="Get in touch" title="Contact">
      <p className="max-w-2xl text-[var(--text-muted)]">
        Open to frontend and full-stack internship opportunities.
      </p>

      <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {links.map(({ label, value, href, Icon }) => {
          const isExternal = href.startsWith("http");
          return (
            <li key={label}>
              <a
                href={href}
                {...(isExternal
                  ? { target: "_blank", rel: "noreferrer noopener" }
                  : {})}
                className="flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 transition-colors hover:border-[var(--red)]"
              >
                <span className="text-[var(--red)]">
                  <Icon size={20} />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs uppercase tracking-wide text-[var(--text-muted)]">
                    {label}
                  </span>
                  <span className="block truncate text-sm font-medium text-[var(--text)]">
                    {value}
                  </span>
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
