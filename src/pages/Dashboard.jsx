import React from "react";
import { motion } from "framer-motion";
import { Activity, Target, Shield, Zap, Terminal, GitBranch, Github, Linkedin, Mail, FolderGit2, FileText, CheckCircle2, Server, Globe, Database } from "lucide-react";
import { SectionHeader, CyberCard, DataGrid, StatusChip, CyberButton, InfoTile, TimelineCard } from "../components/ui";
import { projects } from "../data/projects";
import { skills } from "../data/skills";
import { experience } from "../data/experience";
import { socials } from "../data/socials";

export default function Dashboard() {
  const featuredProject = projects.find(p => p.id === "nbuc-pipeline");

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
        title="SYSTEM_DASHBOARD" 
        icon={Activity} 
        eyebrow="Primary Overview"
      />
      
      <div className="flex flex-col gap-6 pb-28 sm:pb-24">
        
        {/* 1. Hero / Command Summary */}
        <motion.div variants={itemVariants}>
          <CyberCard 
            variant="default"
            className="border-crimson-500/40 bg-[linear-gradient(45deg,rgba(220,20,60,0.05)_0%,transparent_100%)]"
          >
            <div className="flex flex-col gap-4">
              <div>
                <h2 className="font-display text-xl sm:text-2xl font-bold tracking-widest text-white mb-2">
                  Cyber Security student transitioning into frontend and full-stack development.
                </h2>
                <p className="text-slate-300 font-sans leading-relaxed text-sm sm:text-base">
                  Building practical React projects, deployed full-stack apps, and interview-ready project case studies.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                <StatusChip label="Available for internships" variant="online" pulse />
                <StatusChip label="React + Tailwind" variant="neutral" />
                <StatusChip label="DSA with Java" variant="neutral" />
                <StatusChip label="Full-stack basics" variant="neutral" />
              </div>
            </div>
          </CyberCard>
        </motion.div>

        <DataGrid variant="two">
          {/* 2. Current Objective */}
          <motion.div variants={itemVariants}>
            <CyberCard eyebrow="Active Directive" icon={Target} variant="highlight">
              <h4 className="font-display font-bold text-white mb-2 text-lg">Frontend & Full-Stack Internship Readiness</h4>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                Build a polished portfolio, strengthen React fundamentals, document real projects, and prepare for frontend/full-stack internship interviews.
              </p>
              <ul className="flex flex-col gap-2">
                {[
                  "Build portfolio OS",
                  "Improve React component structure",
                  "Document project case studies",
                  "Practice DSA with Java",
                  "Apply for internships"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-slate-400">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CyberCard>
          </motion.div>

          {/* 3. Featured Achievement */}
          <motion.div variants={itemVariants}>
            <CyberCard eyebrow="Main Achievement Signal" icon={Shield} className="h-full">
              <div className="flex flex-col gap-4 h-full">
                <div className="flex-1">
                  <h3 className="font-display font-bold text-white leading-tight text-lg mb-2">Best Implemented Industry Project</h3>
                  <p className="text-sm text-slate-300">Nokia University Day 2025. Awarded for developing a secure RAG-based Generative AI Pipeline.</p>
                </div>
                <CyberButton to="/projects" variant="primary" size="sm" icon={FolderGit2} className="w-full sm:w-auto justify-center">View Archives</CyberButton>
              </div>
            </CyberCard>
          </motion.div>
        </DataGrid>

        {/* 4. System Stats / Info Tiles */}
        <motion.div variants={itemVariants}>
          <DataGrid variant="four">
            <InfoTile label="Projects Loaded" value="4" description="Verified archives" icon={Database} />
            <InfoTile label="Core Stack" value="React" description="Tailwind UI" icon={Globe} />
            <InfoTile label="Internship" value="Open" description="Seeking opportunities" icon={Zap} trend="up" variant="highlight" />
            <InfoTile label="Build Version" value="v2.0.4" description="Stable release" icon={Terminal} />
          </DataGrid>
        </motion.div>



        {/* 7. Quick Actions */}
        <motion.div variants={itemVariants}>
          <CyberCard variant="muted" className="mt-4">
            <div className="flex flex-col sm:flex-row flex-wrap items-center justify-between gap-4">
              <span className="font-mono text-[10px] uppercase tracking-widest text-slate-400">External Comms</span>
              <div className="flex flex-wrap gap-3 w-full sm:w-auto justify-center">
                <CyberButton href={socials.github} variant="secondary" size="sm" icon={Github}>GitHub</CyberButton>
                <CyberButton href={socials.linkedin} variant="secondary" size="sm" icon={Linkedin}>LinkedIn</CyberButton>
                <CyberButton href={socials.email} variant="primary" size="sm" icon={Mail}>Initialize Contact</CyberButton>
              </div>
            </div>
          </CyberCard>
        </motion.div>

        {/* 8. Optional Command Hint */}
        <motion.div variants={itemVariants} className="mt-2 flex justify-center">
          <div className="flex items-center gap-2 rounded bg-[#050505] px-4 py-2 border border-white/5 shadow-inner">
            <span className="font-mono text-crimson-500">{">"}</span>
            <span className="font-mono text-xs text-slate-500">Recruiter path: Archives → Service Record → Comms</span>
            <span className="animate-pulse w-1.5 h-3 bg-crimson-400 ml-1 block" />
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
}
