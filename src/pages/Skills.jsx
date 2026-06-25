import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Server, Terminal, ShieldAlert, Wrench, BookOpen, ChevronDown, CheckCircle2, Link2, Info, LayoutGrid, Database, Shield, Zap } from "lucide-react";
import { SectionHeader, CyberCard, DataGrid, StatusChip, InfoTile } from "../components/ui";
import { skills } from "../data/skills";

const categoryConfig = {
  frontend: { title: "Frontend Frameworks", icon: Code2, defaultOpen: true },
  backend: { title: "Backend Architecture", icon: Server, defaultOpen: false },
  programming: { title: "Core Languages", icon: Terminal, defaultOpen: false },
  cybersecurity: { title: "Security Protocols", icon: ShieldAlert, defaultOpen: false },
  tools: { title: "Dev Tools & Infrastructure", icon: Wrench, defaultOpen: false },
  learning: { title: "Active Learning Subroutines", icon: BookOpen, defaultOpen: true },
};

function SkillModule({ id, data, config }) {
  const [isOpen, setIsOpen] = useState(config.defaultOpen);
  const Icon = config.icon;

  return (
    <CyberCard 
      className={`transition-all duration-300 ${isOpen ? "border-primary-500/50 shadow-[0_0_15px_rgba(220,20,60,0.1)] bg-primary-500/5" : "border-white/10 hover:border-primary-500/30"}`}
      padding="none" // we will handle padding manually for the header/body
    >
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 focus:outline-none"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-md ${isOpen ? "bg-primary-500/20 text-primary-400" : "bg-white/5 text-slate-400"}`}>
            <Icon className="h-5 w-5" />
          </div>
          <div className="text-left">
            <span className="font-mono text-[10px] text-slate-500 uppercase tracking-widest block leading-tight">{id}</span>
            <h3 className={`font-display font-bold ${isOpen ? "text-white" : "text-slate-300"}`}>{config.title}</h3>
          </div>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className={`h-5 w-5 ${isOpen ? "text-primary-500" : "text-slate-500"}`} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="p-4 pt-0 border-t border-white/5">
              
              <div className="flex flex-wrap gap-2 mb-6 mt-4">
                {data.skills.map(skill => (
                  <StatusChip key={skill} label={skill} variant="neutral" />
                ))}
              </div>

              <div className="mb-6">
                <span className="font-mono text-[10px] text-primary-400 uppercase tracking-widest mb-3 block border-b border-primary-500/20 pb-1">Practical Proof</span>
                <ul className="space-y-3">
                  {data.proof.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {data.projects.length > 0 && (
                <div>
                  <span className="font-mono text-[10px] text-slate-500 uppercase tracking-widest mb-3 block border-b border-white/10 pb-1">Related Archives</span>
                  <div className="flex flex-wrap gap-2">
                    {data.projects.map((proj, i) => (
                      <div key={i} className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded px-2 py-1">
                        <Link2 className="h-3 w-3 text-slate-400" />
                        <span className="text-xs font-mono text-slate-300">{proj}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </CyberCard>
  );
}

export default function Skills() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <motion.div
      initial="hidden"
      animate="show"
      exit={{ opacity: 0, y: -20 }}
      variants={containerVariants}
      className="flex flex-1 min-h-0 w-full flex-col p-4 overflow-y-auto no-scrollbar"
    >
      <SectionHeader 
        title="SYSTEM_MODULES" 
        icon={Code2} 
        eyebrow="Capability Matrix"
      />
      <p className="text-slate-400 text-sm mb-6 mt-[-1rem] px-1 font-sans leading-relaxed">
        Practical skill modules loaded through projects, coursework, and active frontend/full-stack preparation.
      </p>
      
      <div className="flex flex-col gap-6 pb-28 sm:pb-24">
        
        {/* 1. Skill Overview Stats */}
        <motion.div variants={itemVariants}>
          <DataGrid variant="four">
            <InfoTile label="Core Track" value="Frontend" description="React Architecture" icon={LayoutGrid} variant="highlight" />
            <InfoTile label="Backend Exposure" value="MERN" description="Node/Mongo Base" icon={Database} />
            <InfoTile label="DSA Track" value="Java" description="Active prep" icon={Terminal} />
            <InfoTile label="Security Base" value="Cybersecurity" description="Trivy / Tools" icon={Shield} />
          </DataGrid>
        </motion.div>

        {/* 2. No Fake Percentages Philosophy */}
        <motion.div variants={itemVariants}>
          <CyberCard variant="muted" className="border-l-2 border-l-primary-500">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-primary-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-mono text-xs text-white uppercase tracking-wider mb-1">System Notice: No Fake Percentages</h4>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Instead of claiming arbitrary percentages, this page shows practical use cases, related projects, and current learning focus.
                </p>
              </div>
            </div>
          </CyberCard>
        </motion.div>

        {/* 3. Skill Categories (Expandable) */}
        <motion.div variants={itemVariants} className="flex flex-col gap-4">
          {Object.entries(skills).map(([key, data]) => (
            <SkillModule key={key} id={key} data={data} config={categoryConfig[key]} />
          ))}
        </motion.div>



      </div>
    </motion.div>
  );
}
