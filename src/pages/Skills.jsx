import React from "react";
import { motion } from "framer-motion";
import { Code2, Server, Terminal, ShieldAlert, Wrench, BookOpen } from "lucide-react";
import { SectionHeader, CyberCard, DataGrid, ProgressBar } from "../components/ui";
import { skills } from "../data/skills";

const categoryConfig = {
  frontend: { title: "Frontend Frameworks", icon: Code2 },
  backend: { title: "Backend Architecture", icon: Server },
  programming: { title: "Core Languages", icon: Terminal },
  cybersecurity: { title: "Security Protocols", icon: ShieldAlert },
  tools: { title: "Dev Tools & Infrastructure", icon: Wrench },
};

export default function Skills() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="flex h-full w-full flex-col p-4 overflow-y-auto no-scrollbar"
    >
      <SectionHeader 
        title="SYSTEM_MODULES" 
        icon={Code2} 
        eyebrow="Capabilities"
      />
      
      <div className="pb-28 sm:pb-24">
        <DataGrid variant="two">
          {Object.entries(skills).map(([key, items]) => {
            if (key === "learning") return null;
            const config = categoryConfig[key];
            
            return (
              <CyberCard 
                key={key}
                eyebrow={key.toUpperCase()}
                title={config.title}
                icon={config.icon}
                animated
              >
                <div className="flex flex-col gap-3 mt-2">
                  {items.map(skill => (
                    <ProgressBar 
                      key={skill.name}
                      label={skill.name}
                      value={skill.proficiency}
                      description={skill.desc}
                      showValue
                    />
                  ))}
                </div>
              </CyberCard>
            );
          })}

          <CyberCard 
            eyebrow="CURRENT_FOCUS" 
            title="Active Learning Subroutines" 
            icon={BookOpen} 
            animated 
            variant="highlight"
          >
            <ul className="list-disc list-inside space-y-2 mt-2 text-sm text-slate-300 font-mono">
              {skills.learning.map(item => (
                <li key={item} className="marker:text-crimson-500">{item}</li>
              ))}
            </ul>
          </CyberCard>
        </DataGrid>
      </div>
    </motion.div>
  );
}
