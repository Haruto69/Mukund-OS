import React, { useMemo, useRef, useState } from "react";
import { projects } from "../data/projects";
import { skillGroups } from "../data/skills";

const baseCommands = {
  help: ["Available commands: help, about, skills, projects, contact, clear"],
  about: [
    "Mukund V - CSE student specializing in Cyber Security.",
    "Currently building practical frontend and full-stack projects for internship preparation.",
  ],
  contact: [
    "Email: your.email@example.com",
    "LinkedIn: placeholder",
    "GitHub: placeholder",
    "Resume: download placeholder",
  ],
};

export default function TerminalConsole() {
  const [history, setHistory] = useState([
    { type: "system", value: "Mukund OS terminal ready. Type help to begin." },
  ]);
  const [command, setCommand] = useState("");
  const inputRef = useRef(null);

  const commandMap = useMemo(
    () => ({
      ...baseCommands,
      skills: skillGroups.map((group) => `${group.group}: ${group.skills.join(", ")}`),
      projects: projects.map((project) => `${project.name}: ${project.highlight}`),
    }),
    []
  );

  function runCommand(event) {
    event.preventDefault();
    const normalized = command.trim().toLowerCase();

    if (!normalized) {
      return;
    }

    if (normalized === "clear") {
      setHistory([]);
      setCommand("");
      return;
    }

    const output = commandMap[normalized] || [
      `Command not found: ${normalized}`,
      "Type help to see supported commands.",
    ];

    setHistory((items) => [
      ...items,
      { type: "command", value: normalized },
      ...output.map((line) => ({ type: "output", value: line })),
    ]);
    setCommand("");
  }

  return (
    <section
      className="rounded-lg border border-lime-300/20 bg-black/75 font-mono shadow-2xl"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex items-center gap-2 border-b border-lime-300/20 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-rose-400" />
        <span className="h-3 w-3 rounded-full bg-amber-300" />
        <span className="h-3 w-3 rounded-full bg-lime-300" />
        <span className="ml-3 text-xs text-slate-400">resume-session</span>
      </div>
      <div className="min-h-[24rem] space-y-2 px-4 py-5 text-sm leading-6 text-lime-100 sm:px-5">
        {history.map((line, index) => (
          <p key={`${line.type}-${index}`} className={line.type === "command" ? "text-teal-200" : "text-slate-200"}>
            {line.type === "command" ? <span className="text-lime-300">mukund@os:~$ </span> : null}
            {line.value}
          </p>
        ))}
        <form onSubmit={runCommand} className="flex items-center gap-2 pt-2">
          <label htmlFor="terminal-command" className="text-lime-300">
            mukund@os:~$
          </label>
          <input
            ref={inputRef}
            id="terminal-command"
            value={command}
            onChange={(event) => setCommand(event.target.value)}
            className="min-w-0 flex-1 border-none bg-transparent text-lime-100 outline-none placeholder:text-slate-600"
            placeholder="help"
            autoComplete="off"
          />
        </form>
      </div>
    </section>
  );
}
