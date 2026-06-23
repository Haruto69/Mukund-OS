import React from "react";
import PageShell from "../components/PageShell";
import TerminalConsole from "../components/TerminalConsole";

export default function Terminal() {
  return (
    <PageShell
      eyebrow="Terminal"
      title="Command Resume"
      description="Type supported commands to inspect the same resume content from a terminal-style interface."
    >
      <TerminalConsole />
    </PageShell>
  );
}
