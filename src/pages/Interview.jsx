import React, { useState } from "react";
import AccordionCard from "../components/AccordionCard";
import { interviewPrompts } from "../data/interview";

export default function Interview() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 border-b border-red-500/[0.06] pb-3">
        <span className="font-mono text-[9px] uppercase tracking-wider text-red-400/50">
          Mission Brief — Interview Mode
        </span>
      </div>
      {interviewPrompts.map((item, index) => (
        <AccordionCard
          key={item.question}
          item={item}
          isOpen={openIndex === index}
          onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
        />
      ))}
    </div>
  );
}
