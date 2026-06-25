import React from "react";
import { motion } from "framer-motion";
import { User, GraduationCap, Target, Crosshair, ShieldCheck, BrainCircuit, Zap, CheckCircle2, Navigation, FileText, Code2, FolderGit2, Calendar, Shield } from "lucide-react";
import { SectionHeader, CyberCard, DataGrid, StatusChip, CyberButton, InfoTile } from "../components/ui";
import { profile } from "../data/profile";
import { Link } from "react-router-dom";

export default function About() {
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
        title="USER_DOSSIER" 
        icon={User} 
        eyebrow="Identity"
      />
      <p className="text-slate-400 text-sm mb-6 mt-[-1rem] px-1 font-sans leading-relaxed">
        Structured profile data covering background, current direction, project mindset, and internship readiness.
      </p>
      
      <div className="flex flex-col gap-6 pb-28 sm:pb-24">
        
        {/* 1 & 2. Primary Identity & Current Direction */}
        <motion.div variants={itemVariants}>
          <DataGrid variant="two">
            {/* Identity Card */}
            <CyberCard 
              eyebrow="PRIMARY DESIGNATION" 
              title={profile.name} 
              icon={User} 
              animated
              className="border-l-2 border-l-crimson-500"
            >
              <p className="font-mono text-sm text-crimson-400 mb-4 tracking-wider uppercase">{profile.role}</p>
              <div className="space-y-4 mt-2 mb-6">
                <div>
                  <span className="block text-[10px] uppercase font-mono text-slate-500 mb-1">Background</span>
                  <span className="text-white text-sm">{profile.background}</span>
                </div>
                <div>
                  <span className="block text-[10px] uppercase font-mono text-slate-500 mb-1">Institution</span>
                  <span className="text-white text-sm">{profile.college}</span>
                </div>
                <div>
                  <span className="block text-[10px] uppercase font-mono text-slate-500 mb-1">Status</span>
                  <span className="text-emerald-400 text-sm font-mono tracking-tight">{profile.status}</span>
                </div>
              </div>
              <div className="bg-white/5 border border-white/10 p-3 rounded-md">
                <p className="text-slate-300 leading-relaxed text-sm">
                  {profile.summary}
                </p>
              </div>
            </CyberCard>

            {/* Current Direction Card */}
            <CyberCard 
              eyebrow="CURRENT_DIRECTION" 
              title="Active Focus" 
              icon={Navigation} 
              animated
            >
              <p className="text-slate-300 leading-relaxed text-sm mb-6">
                {profile.currentDirection.text}
              </p>
              <span className="block text-[10px] uppercase font-mono text-slate-500 mb-2">Priority Stacks</span>
              <div className="flex flex-wrap gap-2">
                {profile.currentDirection.focusChips.map(chip => (
                  <StatusChip key={chip} label={chip} variant="neutral" />
                ))}
              </div>
            </CyberCard>
          </DataGrid>
        </motion.div>

        {/* 3 & 4. Why Frontend & Security Foundation */}
        <motion.div variants={itemVariants}>
          <DataGrid variant="two">
            <CyberCard 
              eyebrow="WHY_FRONTEND" 
              title="Building Interfaces" 
              icon={Code2} 
              animated
            >
              <p className="text-slate-300 leading-relaxed text-sm">
                {profile.whyFrontend}
              </p>
            </CyberCard>

            <CyberCard 
              eyebrow="SECURITY_FOUNDATION" 
              title="Secure Design Thinking" 
              icon={ShieldCheck} 
              animated
              variant="muted"
            >
              <p className="text-slate-300 leading-relaxed text-sm mb-4">
                {profile.securityFoundation.text}
              </p>
              <div className="flex flex-wrap gap-1.5 mt-auto">
                {profile.securityFoundation.skills.map(skill => (
                  <span key={skill} className="text-[10px] font-mono border border-white/10 bg-[#050505] px-1.5 py-0.5 rounded text-slate-400">
                    {skill}
                  </span>
                ))}
              </div>
            </CyberCard>
          </DataGrid>
        </motion.div>

        {/* 5. Key Highlights / Signals */}
        <motion.div variants={itemVariants}>
          <CyberCard eyebrow="KEY_SIGNALS" icon={Zap} padding="sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              <div className="bg-white/[0.02] border border-crimson-500/20 p-3 rounded-md flex flex-col gap-2">
                <Shield className="h-4 w-4 text-crimson-500" />
                <span className="text-[10px] font-mono text-slate-400 uppercase">Award</span>
                <span className="text-xs text-white">Best Implemented Industry Project (Nokia 2025)</span>
              </div>
              <div className="bg-white/[0.02] border border-white/5 p-3 rounded-md flex flex-col gap-2">
                <Code2 className="h-4 w-4 text-emerald-500" />
                <span className="text-[10px] font-mono text-slate-400 uppercase">Deployed</span>
                <span className="text-xs text-white">Self-care MERN App</span>
              </div>
              <div className="bg-white/[0.02] border border-white/5 p-3 rounded-md flex flex-col gap-2">
                <User className="h-4 w-4 text-amber-500" />
                <span className="text-[10px] font-mono text-slate-400 uppercase">Frontend</span>
                <span className="text-xs text-white">CyberDeck Portfolio OS</span>
              </div>
              <div className="bg-white/[0.02] border border-white/5 p-3 rounded-md flex flex-col gap-2">
                <Navigation className="h-4 w-4 text-blue-500" />
                <span className="text-[10px] font-mono text-slate-400 uppercase">Academic</span>
                <span className="text-xs text-white">DishaRakshak (Major Project)</span>
              </div>
              <div className="bg-white/[0.02] border border-white/5 p-3 rounded-md flex flex-col gap-2">
                <BrainCircuit className="h-4 w-4 text-purple-500" />
                <span className="text-[10px] font-mono text-slate-400 uppercase">Practice</span>
                <span className="text-xs text-white">Active DSA with Java</span>
              </div>
            </div>
          </CyberCard>
        </motion.div>

        {/* 6 & 7. Project Mindset & Working Style */}
        <motion.div variants={itemVariants}>
          <DataGrid variant="two">
            <CyberCard 
              eyebrow="BUILDING_MINDSET" 
              title="Execution Philosophy" 
              icon={Target} 
              animated
            >
              <p className="text-slate-400 text-sm mb-4">
                I'm trying to build projects that prove actual problem-solving: deployed apps, responsive interfaces, reusable components, and case studies I can explain clearly in interviews.
              </p>
              <ul className="space-y-2">
                {profile.buildingMindset.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                    <Crosshair className="h-4 w-4 text-crimson-500 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </CyberCard>

            <CyberCard 
              eyebrow="WORKING_STYLE" 
              title="Operational Approach" 
              icon={BrainCircuit} 
              animated
            >
              <ul className="space-y-2 mt-2">
                {profile.workingStyle.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </CyberCard>
          </DataGrid>
        </motion.div>

        {/* 8. Recruiter Brief & Timeline Preview */}
        <motion.div variants={itemVariants}>
          <DataGrid variant="two">
            <CyberCard 
              eyebrow="RECRUITER_BRIEF" 
              title="Quick Navigation" 
              icon={FileText} 
              animated
              className="border-crimson-500/30"
            >
              <p className="text-slate-300 leading-relaxed text-sm mb-6">
                If you're reviewing this portfolio for an internship, start with Archives for projects, Modules for skills, and Service Record for resume highlights.
              </p>
              <div className="grid grid-cols-2 gap-3">
                <Link to="/projects" className="w-full">
                  <CyberButton variant="primary" size="sm" className="w-full justify-center">View Projects</CyberButton>
                </Link>
                <Link to="/skills" className="w-full">
                  <CyberButton variant="secondary" size="sm" className="w-full justify-center">View Skills</CyberButton>
                </Link>
                <Link to="/resume" className="w-full">
                  <CyberButton variant="ghost" size="sm" className="w-full justify-center border border-white/10">View Resume</CyberButton>
                </Link>
                <Link to="/contact" className="w-full">
                  <CyberButton variant="ghost" size="sm" className="w-full justify-center border border-white/10">Contact</CyberButton>
                </Link>
              </div>
            </CyberCard>

            <CyberCard 
              eyebrow="TIMELINE_PREVIEW" 
              title="Recent Milestones" 
              icon={Calendar} 
              animated
            >
              <div className="relative border-l border-crimson-500/30 ml-3 mt-2 space-y-6">
                <div className="relative pl-6">
                  <div className="absolute left-[-5px] top-1.5 h-2 w-2 rounded-full bg-crimson-500 shadow-[0_0_8px_rgba(220,20,60,0.8)]" />
                  <span className="font-mono text-xs text-crimson-400 block mb-1">Now</span>
                  <p className="text-sm text-white font-medium">Portfolio, DSA, Internship Prep</p>
                </div>
                <div className="relative pl-6">
                  <div className="absolute left-[-4px] top-1.5 h-1.5 w-1.5 rounded-full bg-slate-500" />
                  <span className="font-mono text-xs text-slate-400 block mb-1">2026</span>
                  <p className="text-sm text-slate-300">Major project + MERN app + frontend focus</p>
                </div>
                <div className="relative pl-6">
                  <div className="absolute left-[-4px] top-1.5 h-1.5 w-1.5 rounded-full bg-slate-500" />
                  <span className="font-mono text-xs text-slate-400 block mb-1">2025</span>
                  <p className="text-sm text-slate-300">Nokia University Day recognition</p>
                </div>
              </div>
            </CyberCard>
          </DataGrid>
        </motion.div>

      </div>
    </motion.div>
  );
}
