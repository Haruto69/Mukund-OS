import React from "react";
import { motion } from "framer-motion";
import { Activity, User, Target, Shield, Briefcase } from "lucide-react";
import { SectionHeader, CyberCard, DataGrid, StatusChip, CyberButton, InfoTile } from "../components/ui";
import { profile } from "../data/profile";
import { projects } from "../data/projects";

export default function Dashboard() {
  const featuredProject = projects.find(p => p.id === "nbuc-pipeline");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="flex h-full w-full flex-col p-4 overflow-y-auto no-scrollbar"
    >
      <SectionHeader 
        title="SYSTEM_DASHBOARD" 
        icon={Activity} 
        eyebrow="Primary Overview"
      />
      
      <div className="flex flex-col gap-4 pb-28 sm:pb-24">
        <DataGrid variant="two">
          {/* Profile Summary */}
          <CyberCard eyebrow="Identity" icon={User} animated>
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-display text-xl font-bold text-white">{profile.name}</h3>
              <StatusChip label="AVAILABLE" variant="online" pulse />
            </div>
            <p className="font-mono text-xs text-crimson-400 mb-4">{profile.role}</p>
            <p className="text-sm text-slate-300 leading-relaxed mb-4">{profile.summary}</p>
            <div className="flex gap-3">
              <CyberButton to="/projects" variant="primary" size="sm">View Archives</CyberButton>
              <CyberButton to="/contact" variant="secondary" size="sm">Comms Link</CyberButton>
            </div>
          </CyberCard>

          {/* Current Objective */}
          <CyberCard eyebrow="Current Directive" icon={Target} variant="highlight" animated>
            <h4 className="font-display font-bold text-white mb-2">Frontend & Full-Stack Internships</h4>
            <p className="text-sm text-slate-300 mb-4 text-balance">
              Actively seeking opportunities to apply React, Tailwind, and Node.js skills in a professional environment while continuing to master Java DSA.
            </p>
            <div className="flex flex-wrap gap-2">
              <StatusChip label="React" variant="neutral" />
              <StatusChip label="Tailwind CSS" variant="neutral" />
              <StatusChip label="Node.js" variant="neutral" />
            </div>
          </CyberCard>
        </DataGrid>

        {/* Featured Project */}
        {featuredProject && (
          <CyberCard eyebrow="Featured Module" icon={Shield} animated>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <div>
                <h3 className="font-display text-lg font-bold text-white">{featuredProject.title}</h3>
                <span className="font-mono text-[10px] text-crimson-400">{featuredProject.type}</span>
              </div>
              <StatusChip label={featuredProject.status} variant="success" />
            </div>
            <p className="text-sm text-slate-300 mb-4">{featuredProject.description}</p>
            <div className="flex flex-wrap gap-2">
              {featuredProject.tech.slice(0, 4).map(t => (
                <StatusChip key={t} label={t} variant="neutral" />
              ))}
              <span className="font-mono text-[10px] text-slate-500 self-center">+ More</span>
            </div>
          </CyberCard>
        )}
      </div>
    </motion.div>
  );
}
