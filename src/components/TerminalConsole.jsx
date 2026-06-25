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

    if (!normalized) return;

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
      className="flex h-full flex-col rounded-lg border border-red-500/15 bg-[#08060b]/95 font-mono shadow-2xl"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 border-b border-red-500/10 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400/50" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/50" />
        <span className="ml-3 text-[10px] text-slate-600">
          mukund@os — resume-session
        </span>
      </div>

      {/* Output */}
      <div
        ref={scrollRef}
        className="flex-1 space-y-1 overflow-y-auto px-4 py-3 text-[12px] leading-6"
      >
        {history.map((line, index) => (
          <p
            key={`${line.type}-${index}`}
            className={
              line.type === "command"
                ? "text-red-300"
                : line.type === "system"
                ? "text-red-500/60"
                : "text-slate-400"
            }
          >
            {line.type === "command" ? (
              <span className="text-red-500">mukund@os:~$ </span>
            ) : null}
            {line.value}
          </p>
        ))}

        {/* Input */}
        <form onSubmit={runCommand} className="flex items-center gap-2">
          <label htmlFor="terminal-command" className="text-red-500">
            mukund@os:~$
          </label>
          <div className="relative flex-1">
            <input
              ref={inputRef}
              id="terminal-command"
              value={command}
              onChange={(event) => setCommand(event.target.value)}
              className="w-full border-none bg-transparent text-red-200 caret-transparent outline-none placeholder:text-slate-700"
              placeholder="help"
              autoComplete="off"
              spellCheck="false"
            />
            <span
              className="pointer-events-none absolute top-0 text-transparent"
              aria-hidden="true"
            >
              {command}
              <span className="inline-block h-[1.1em] w-[6px] translate-y-[1px] animate-blink bg-red-500/80" />
            </span>
          </div>
        </form>
      </div>
    </section>
  );
}
