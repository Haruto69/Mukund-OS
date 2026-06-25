import React from "react";
import { motion } from "framer-motion";
import { FileText, Download, Briefcase } from "lucide-react";
import { SectionHeader, CyberCard, TimelineCard, CyberButton } from "../components/ui";
import { experience } from "../data/experience";
import { socials } from "../data/socials";

export default function Resume() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="flex h-full w-full flex-col p-4 overflow-y-auto no-scrollbar"
    >
      <SectionHeader 
        title="SERVICE_RECORD" 
        icon={FileText} 
        eyebrow="Documentation"
        rightAction={
          <CyberButton variant="primary" icon={Download} href={socials.resume}>
            Download PDF
          </CyberButton>
        }
      />
      
      <div className="pb-28 sm:pb-24 max-w-3xl">
        <CyberCard eyebrow="Experience & Education" title="Career Timeline" animated>
          <div className="mt-6 flex flex-col gap-2">
            {experience.map((exp, i) => (
              <TimelineCard 
                key={i}
                date={exp.duration}
                title={`${exp.role} @ ${exp.company}`}
                description={exp.description}
                icon={Briefcase}
                tags={exp.highlights}
                highlight={i === 0}
              />
            ))}
          </div>
        </CyberCard>
      </div>
    </motion.div>
  );
}
