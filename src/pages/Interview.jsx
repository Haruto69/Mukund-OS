import React, { useState } from "react";
import AccordionCard from "../components/AccordionCard";
import PageShell from "../components/PageShell";
import { interviewPrompts } from "../data/interview";

export default function Interview() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <PageShell
      eyebrow="Interview Mode"
      title="Recruiter Q&A"
      description="Short answers for common internship-screening conversations."
    >
      <div className="grid gap-3">
        {interviewPrompts.map((item, index) => (
          <AccordionCard
            key={item.question}
            item={item}
            isOpen={openIndex === index}
            onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
          />
        ))}
      </div>
    </PageShell>
  );
}
