import React, { Suspense } from "react";
import { motion } from "framer-motion";
import { Activity, Target, Shield, Zap, Terminal, GitBranch, Github, Linkedin, Mail, FolderGit2, FileText, CheckCircle2, Server, Globe, Database } from "lucide-react";
import { SectionHeader, CyberCard, DataGrid, StatusChip, CyberButton, InfoTile, TimelineCard } from "../components/ui";
import { projects } from "../data/projects";
import { skills } from "../data/skills";
import { experience } from "../data/experience";
import { socials } from "../data/socials";

const HeroModel = React.lazy(() => import("../components/visuals/HeroModel"));

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
        
        {/* 1. Main Hero / Centered Model */}
        <motion.div variants={itemVariants} className="flex flex-col items-center text-center pb-12 mb-6 border-b border-white/5 relative">
          
          <div className="max-w-4xl xl:max-w-5xl w-full px-4 sm:px-8 z-10 relative mt-4">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-bold tracking-wider text-white mb-4 leading-tight drop-shadow-md">
              Cyber Security student transitioning into frontend and full-stack development.
            </h2>
          </div>

          <div className="w-full flex justify-center -mt-4 sm:-mt-12 relative z-0 pointer-events-none">
            <Suspense fallback={
              <div className="w-full h-[260px] sm:h-[340px] lg:h-[480px] xl:h-[540px] flex items-center justify-center animate-pulse">
                <span className="font-mono text-xs text-primary-500/50 uppercase tracking-widest">Loading model data...</span>
              </div>
            }>
              <div className="w-full pointer-events-auto">
                <HeroModel />
              </div>
            </Suspense>
          </div>

          <div className="max-w-2xl flex flex-col items-center gap-6 mt-0 sm:-mt-8 relative z-10">
            <p className="text-slate-300 font-sans leading-relaxed text-base sm:text-lg">
              Building practical React projects, deployed full-stack apps, and interview-ready project case studies.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <StatusChip label="Available for internships" variant="online" pulse />
              <StatusChip label="React + Tailwind" variant="neutral" />
              <StatusChip label="DSA with Java" variant="neutral" />
              <StatusChip label="Full-stack basics" variant="neutral" />
            </div>
          </div>
          
        </motion.div>

        {/* 2. Directive & Achievement */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div variants={itemVariants}>
            <CyberCard eyebrow="Active Directive" icon={Target} variant="highlight" className="h-full">
              <div className="flex flex-col h-full">
                <h4 className="font-display font-bold text-white mb-2 text-lg">Frontend & Full-Stack Internship Readiness</h4>
                <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                  Build a polished portfolio, strengthen React fundamentals, document real projects, and prepare for frontend/full-stack internship interviews.
                </p>
                <ul className="flex flex-col gap-2 mt-auto">
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
              </div>
            </CyberCard>
          </motion.div>

          <motion.div variants={itemVariants}>
            <CyberCard eyebrow="Main Achievement Signal" icon={Shield} className="h-full">
              <div className="flex flex-col gap-4 h-full">
                <div className="flex-1">
                  <h3 className="font-display font-bold text-white leading-tight text-lg mb-2">Best Implemented Industry Project</h3>
                  <p className="text-sm text-slate-300">Nokia University Day 2025. Awarded for developing a secure RAG-based Generative AI Pipeline.</p>
                </div>
                <CyberButton to="/projects" variant="primary" size="sm" icon={FolderGit2} className="w-full sm:w-auto justify-center mt-auto">View Archives</CyberButton>
              </div>
            </CyberCard>
          </motion.div>
        </div>

        {/* 4. System Stats / Info Tiles */}
        <motion.div variants={itemVariants}>
          <DataGrid variant="four">
            <InfoTile label="Projects Loaded" value="4" description="Verified archives" icon={Database} />
            <InfoTile label="Core Stack" value="React" description="Tailwind UI" icon={Globe} />
            <InfoTile label="Internship" value="Open" description="Seeking opportunities" icon={Zap} trend="up" variant="highlight" />
            <InfoTile label="Build Version" value="v1.0.0" description="Release Candidate" icon={Terminal} />
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
            <span className="font-mono text-primary-500">{">"}</span>
            <span className="font-mono text-xs text-slate-500">Recruiter path: Archives → Service Record → Comms</span>
            <span className="animate-pulse w-1.5 h-3 bg-primary-400 ml-1 block" />
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
}
