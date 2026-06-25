import React from "react";
import { motion } from "framer-motion";
import { FileText, Download, Briefcase, GraduationCap, ShieldCheck, Code2, Navigation, Zap, Calendar, ArrowRight, User, Terminal, CheckCircle2 } from "lucide-react";
import { SectionHeader, CyberCard, DataGrid, StatusChip, CyberButton, TimelineCard } from "../components/ui";
import { profile } from "../data/profile";
import { projects } from "../data/projects";
import { skills } from "../data/skills";
import { experience } from "../data/experience";
import { timeline } from "../data/timeline";
import { Link } from "react-router-dom";

export default function Resume() {
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

  const safeProjects = projects || [];
  const safeExperience = experience || [];
  const safeTimeline = timeline || [];
  const safeSkills = skills || {};

  return (
    <motion.div
      initial="hidden"
      animate="show"
      exit={{ opacity: 0, y: -20 }}
      variants={containerVariants}
      className="flex flex-1 min-h-0 w-full flex-col p-4 overflow-y-auto no-scrollbar"
    >
      <SectionHeader 
        title="SERVICE_RECORD" 
        icon={FileText} 
        eyebrow="Resume File"
      />
      <p className="text-slate-400 text-sm mb-6 mt-[-1rem] px-1 font-sans leading-relaxed">
        Structured resume data covering education, project evidence, technical skills, and internship readiness.
      </p>
      
      <div className="flex flex-col gap-6 pb-28 sm:pb-24">
        
        {/* 1. Resume Download / Status Card */}
        <motion.div variants={itemVariants}>
          <CyberCard 
            eyebrow="FILE_STATUS" 
            title="Mukund_V_Resume.pdf" 
            icon={FileText} 
            animated
            className="border-crimson-500/50 bg-[linear-gradient(45deg,rgba(220,20,60,0.05)_0%,transparent_100%)]"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
              <div className="space-y-3">
                <div className="flex flex-col">
                  <span className="font-mono text-[10px] text-slate-500 uppercase">Role Target</span>
                  <span className="text-white text-sm font-medium">Frontend / Full-stack Intern</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-mono text-[10px] text-slate-500 uppercase">Availability</span>
                  <span className="text-emerald-400 text-sm font-mono tracking-tight">Open for internships</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-mono text-[10px] text-slate-500 uppercase">Last Updated</span>
                  <span className="text-slate-300 text-sm">Draft / PDF coming soon</span>
                </div>
              </div>
              <StatusChip label="Draft" variant="warning" className="w-fit h-fit" />
            </div>

            <div className="flex flex-wrap gap-3 pt-4 border-t border-crimson-500/20">
              <CyberButton 
                variant="primary" 
                size="sm" 
                icon={Download} 
                disabled 
                title="Resume PDF path not connected yet"
              >
                Resume PDF Coming Soon
              </CyberButton>
              <Link to="/contact">
                <CyberButton variant="secondary" size="sm" icon={User}>
                  Contact
                </CyberButton>
              </Link>
              <Link to="/projects">
                <CyberButton variant="ghost" size="sm" icon={Briefcase} className="border border-white/10">
                  View Projects
                </CyberButton>
              </Link>
            </div>
          </CyberCard>
        </motion.div>

        {/* 2. Education & Highlights */}
        <motion.div variants={itemVariants}>
          <DataGrid variant="two">
            {/* Education */}
            <CyberCard eyebrow="ACADEMIC_RECORD" title="Education" icon={GraduationCap} animated>
              <div className="space-y-4 mt-2">
                <div>
                  <span className="block text-[10px] uppercase font-mono text-slate-500 mb-1">Degree</span>
                  <span className="text-white text-sm font-medium">{profile?.background || "B.E. Computer Science"}</span>
                </div>
                <div>
                  <span className="block text-[10px] uppercase font-mono text-slate-500 mb-1">Institution</span>
                  <span className="text-slate-300 text-sm">{profile?.college || "RNS Institute of Technology"}</span>
                </div>
                <div className="flex justify-between items-center bg-white/5 border border-white/10 p-2 rounded-md mt-4">
                  <span className="text-xs text-slate-400">Current Status</span>
                  <StatusChip label="Undergraduate Student" variant="neutral" />
                </div>
              </div>
            </CyberCard>

            {/* Highlights */}
            <CyberCard eyebrow="VERIFIED_HIGHLIGHTS" title="Key Achievements" icon={Zap} animated>
              <ul className="space-y-3 mt-2">
                <li className="flex items-start gap-2">
                  <ShieldCheck className="h-4 w-4 text-crimson-500 shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-300 leading-snug">Best Implemented Industry Project — Nokia University Day 2025</span>
                </li>
                <li className="flex items-start gap-2">
                  <Code2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-300 leading-snug">Self-care MERN App built and deployed to production</span>
                </li>
                <li className="flex items-start gap-2">
                  <Terminal className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-300 leading-snug">CyberDeck Portfolio OS frontend architecture showcase</span>
                </li>
                <li className="flex items-start gap-2">
                  <Navigation className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-300 leading-snug">DishaRakshak major academic project (hardware + UI)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Code2 className="h-4 w-4 text-purple-500 shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-300 leading-snug">Active DSA practice with Java</span>
                </li>
              </ul>
            </CyberCard>
          </DataGrid>
        </motion.div>

        {/* 3. Project Evidence Section */}
        <motion.div variants={itemVariants}>
          <CyberCard eyebrow="PROJECT_EVIDENCE" title="Key Implementations" icon={Briefcase} animated>
            {safeProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {safeProjects.map((proj) => (
                  <div key={proj.id} className="bg-white/[0.02] border border-white/5 p-4 rounded-lg flex flex-col h-full hover:border-crimson-500/30 transition-colors">
                    <div className="flex justify-between items-start mb-2 gap-2">
                      <h4 className="font-display font-bold text-white leading-tight">{proj.title}</h4>
                      <StatusChip label={proj.status === "Completed" || proj.status === "Deployed" ? "Completed" : "In Progress"} variant={proj.status === "Completed" || proj.status === "Deployed" ? "success" : "warning"} className="shrink-0" />
                    </div>
                    <span className="font-mono text-[10px] text-slate-500 uppercase mb-3 block">{proj.type}</span>
                    <p className="text-sm text-slate-400 mb-4 flex-1">{proj.description}</p>
                    <div className="bg-crimson-500/10 border border-crimson-500/20 p-2 rounded mb-4">
                      <span className="text-xs text-crimson-300 font-medium">{proj.highlight}</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {(proj.tech || []).slice(0, 4).map(t => (
                        <span key={t} className="text-[9px] font-mono border border-white/10 bg-[#050505] px-1.5 py-0.5 rounded text-slate-500">
                          {t}
                        </span>
                      ))}
                      {(proj.tech || []).length > 4 && <span className="text-[9px] font-mono border border-white/10 bg-[#050505] px-1.5 py-0.5 rounded text-slate-500">+{(proj.tech || []).length - 4}</span>}
                    </div>
                    <div className="mt-auto pt-3 border-t border-white/5">
                      <Link to="/projects">
                        <CyberButton variant="ghost" size="sm" icon={ArrowRight} className="w-full justify-center border border-white/5 text-slate-400">
                          View in Archives
                        </CyberButton>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-4 p-4 border border-white/10 border-dashed rounded text-center text-slate-400 text-sm">
                No project archives loaded.
              </div>
            )}
          </CyberCard>
        </motion.div>

        {/* 4. Technical Skills Summary */}
        <motion.div variants={itemVariants}>
          <CyberCard eyebrow="CAPABILITY_MATRIX" title="Technical Skills" icon={Code2} animated>
            {Object.keys(safeSkills).length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {Object.entries(safeSkills).map(([key, data]) => (
                  <div key={key} className="bg-white/[0.02] border border-white/5 p-4 rounded-lg">
                    <h4 className="font-mono text-xs text-slate-400 uppercase tracking-wider mb-3">{key}</h4>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {(data?.skills || []).map(skill => (
                        <span key={skill} className="text-[10px] font-mono border border-white/10 bg-white/5 px-1.5 py-0.5 rounded text-slate-300">
                          {skill}
                        </span>
                      ))}
                    </div>
                    {data?.proof?.[0] && (
                      <p className="text-xs text-slate-500 italic leading-relaxed border-l-2 border-crimson-500/50 pl-2">
                        "{data.proof[0]}"
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-4 p-4 border border-white/10 border-dashed rounded text-center text-slate-400 text-sm">
                No technical skills loaded.
              </div>
            )}
          </CyberCard>
        </motion.div>

        {/* 5. Experience / Exposure & Timeline */}
        <motion.div variants={itemVariants}>
          <DataGrid variant="two">
            <CyberCard eyebrow="INDUSTRY_EXPOSURE" title="Project Experience" icon={Briefcase} animated>
              {safeExperience.length > 0 ? (
                <div className="mt-4 flex flex-col gap-6">
                  {safeExperience.map((exp, i) => (
                    <div key={i} className={`relative pl-4 border-l-2 ${i === 0 ? "border-crimson-500" : "border-white/10"}`}>
                      <div className={`absolute left-[-5px] top-1.5 h-2 w-2 rounded-full ${i === 0 ? "bg-crimson-500 shadow-[0_0_8px_rgba(220,20,60,0.8)]" : "bg-slate-600"}`} />
                      <h4 className="text-white font-medium text-sm">{exp.role}</h4>
                      <span className="font-mono text-[10px] text-slate-400 uppercase block mb-2">{exp.company} | {exp.duration}</span>
                      <p className="text-sm text-slate-300 mb-2 leading-relaxed">{exp.description}</p>
                      <div className="flex flex-col gap-1">
                        {(exp.highlights || []).map((h, j) => (
                          <span key={j} className="text-xs text-slate-500 flex items-center gap-1.5">
                            <CheckCircle2 className="h-3 w-3 text-emerald-500/70 shrink-0" />
                            {h}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="mt-4 p-4 border border-white/10 border-dashed rounded text-center text-slate-400 text-sm">
                  No experience records loaded.
                </div>
              )}
            </CyberCard>

            <CyberCard eyebrow="SERVICE_HISTORY" title="Timeline" icon={Calendar} animated>
              {safeTimeline.length > 0 ? (
                <div className="mt-4 flex flex-col gap-2">
                  {safeTimeline.map((item, i) => (
                    <TimelineCard 
                      key={i}
                      date={item.year}
                      title={item.title}
                      description={item.description}
                      icon={Calendar}
                      highlight={i === 0}
                    />
                  ))}
                </div>
              ) : (
                <div className="mt-4 p-4 border border-white/10 border-dashed rounded text-center text-slate-400 text-sm">
                  No timeline entries loaded.
                </div>
              )}
            </CyberCard>
          </DataGrid>
        </motion.div>

        {/* 6. Recruiter Scan Section */}
        <motion.div variants={itemVariants}>
          <CyberCard 
            eyebrow="RECRUITER_SCAN" 
            title="Fast Navigation" 
            icon={Navigation} 
            animated
            className="border-t-2 border-t-crimson-500"
          >
            <p className="text-slate-300 leading-relaxed text-sm mb-6">
              Quick path: Review Archives for projects, Modules for practical skills, User Dossier for background, and Comms to contact.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <Link to="/projects">
                <CyberButton variant="primary" size="sm" className="w-full justify-center">Archives</CyberButton>
              </Link>
              <Link to="/skills">
                <CyberButton variant="secondary" size="sm" className="w-full justify-center">Modules</CyberButton>
              </Link>
              <Link to="/about">
                <CyberButton variant="ghost" size="sm" className="w-full justify-center border border-white/10">User Dossier</CyberButton>
              </Link>
              <Link to="/contact">
                <CyberButton variant="ghost" size="sm" className="w-full justify-center border border-white/10">Comms</CyberButton>
              </Link>
            </div>
          </CyberCard>
        </motion.div>

      </div>
    </motion.div>
  );
}
