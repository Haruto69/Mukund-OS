import React, { useEffect, useMemo, useRef, useState } from "react";
import { projects } from "../data/projects";
import { skillGroups } from "../data/skills";
import { terminalCommands } from "../data/terminalCommands";

export default function TerminalConsole() {
  const [history, setHistory] = useState([
    { type: "system", value: "Mukund OS terminal ready. Type help to begin." },
  ]);
  const [command, setCommand] = useState("");
  const inputRef = useRef(null);
  const scrollRef = useRef(null);

  const commandMap = useMemo(
    () => ({
      ...terminalCommands,
      skills: skillGroups.map(
        (group) => `${group.group}: ${group.skills.join(", ")}`
      ),
      projects: projects.map(
        (project) => `${project.name}: ${project.highlight}`
      ),
    }),
    []
  );

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

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
      "Type help to see available commands.",
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
      className="flex h-full flex-col rounded-xl border border-emerald-400/15 bg-[#0a0e14]/90 font-mono shadow-2xl"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 border-b border-emerald-400/10 px-4 py-2.5">
        <span className="h-3 w-3 rounded-full bg-rose-400/80" />
        <span className="h-3 w-3 rounded-full bg-amber-300/80" />
        <span className="h-3 w-3 rounded-full bg-emerald-300/80" />
        <span className="ml-3 text-[11px] text-slate-500">
          mukund@os — resume-session
        </span>
      </div>

      {/* Output area */}
      <div
        ref={scrollRef}
        className="flex-1 space-y-1 overflow-y-auto px-4 py-4 text-[13px] leading-6"
      >
        {history.map((line, index) => (
          <p
            key={`${line.type}-${index}`}
            className={
              line.type === "command"
                ? "text-emerald-200"
                : line.type === "system"
                ? "text-teal-400/80"
                : "text-slate-300"
            }
          >
            {line.type === "command" ? (
              <span className="text-emerald-400">mukund@os:~$ </span>
            ) : null}
            {line.value}
          </p>
        ))}

        {/* Input line */}
        <form onSubmit={runCommand} className="flex items-center gap-2">
          <label htmlFor="terminal-command" className="text-emerald-400">
            mukund@os:~$
          </label>
          <div className="relative flex-1">
            <input
              ref={inputRef}
              id="terminal-command"
              value={command}
              onChange={(event) => setCommand(event.target.value)}
              className="w-full border-none bg-transparent text-emerald-100 caret-transparent outline-none placeholder:text-slate-600"
              placeholder="help"
              autoComplete="off"
              spellCheck="false"
            />
            {/* Blinking cursor overlay */}
            <span
              className="pointer-events-none absolute top-0 text-transparent"
              aria-hidden="true"
            >
              {command}
              <span className="inline-block h-[1.1em] w-[7px] translate-y-[1px] animate-blink bg-emerald-400/90" />
            </span>
          </div>
        </form>
      </div>
    </section>
  );
}
