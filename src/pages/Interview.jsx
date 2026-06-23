import React, { useState } from "react";
import AccordionCard from "../components/AccordionCard";
import { interviewPrompts } from "../data/interview";

export default function Interview() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="space-y-3">
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
