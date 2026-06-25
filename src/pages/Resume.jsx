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
            className="border-primary-500/50 bg-[linear-gradient(45deg,rgba(220,20,60,0.05)_0%,transparent_100%)]"
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

            <div className="flex flex-wrap gap-3 pt-4 border-t border-primary-500/20">
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
            </div>
          </CyberCard>
        </motion.div>

        {/* 2. Compact Service Summary */}
        <motion.div variants={itemVariants}>
          <CyberCard eyebrow="EXECUTIVE_SUMMARY" title="Profile Snapshot" icon={User} animated>
            <p className="text-slate-300 leading-relaxed text-sm">
              Frontend/full-stack internship candidate with a cybersecurity academic background, project-based experience in security automation, MERN deployment, and React UI development.
            </p>
          </CyberCard>
        </motion.div>

        {/* 3. Education & Highlights */}
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
            <CyberCard eyebrow="VERIFIED_HIGHLIGHTS" title="Key Recognition" icon={Zap} animated>
              <div className="flex items-start gap-2 mt-2">
                <ShieldCheck className="h-4 w-4 text-primary-500 shrink-0 mt-0.5" />
                <span className="text-sm text-slate-300 leading-snug">Best Implemented Industry Project — Nokia University Day 2025</span>
              </div>
            </CyberCard>
          </DataGrid>
        </motion.div>

        {/* 4. Resume Sections Hint */}
        <motion.div variants={itemVariants}>
          <CyberCard eyebrow="INDEX_REFERENCE" title="Full Resume Contents" icon={Briefcase} animated variant="muted">
            <div className="flex flex-wrap gap-3 mt-2">
              <StatusChip label="Education" variant="neutral" />
              <StatusChip label="Projects" variant="neutral" />
              <StatusChip label="Skills" variant="neutral" />
              <StatusChip label="Contact" variant="neutral" />
            </div>
          </CyberCard>
        </motion.div>



      </div>
    </motion.div>
  );
}
