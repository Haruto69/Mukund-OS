import React from "react";
import { motion } from "framer-motion";
import { User, GraduationCap } from "lucide-react";
import { SectionHeader, CyberCard, DataGrid } from "../components/ui";
import { profile } from "../data/profile";

export default function About() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="flex flex-1 min-h-0 w-full flex-col p-4 overflow-y-auto no-scrollbar"
    >
      <SectionHeader 
        title="USER_DOSSIER" 
        icon={User} 
        eyebrow="Identity"
      />
      
      <div className="pb-28 sm:pb-24">
        <DataGrid variant="two">
          <CyberCard 
            eyebrow="Primary Designation" 
            title={profile.name} 
            icon={User} 
            animated
          >
            <p className="font-mono text-sm text-crimson-400 mb-4">{profile.role}</p>
            <p className="text-slate-300 leading-relaxed text-sm">
              {profile.summary}
            </p>
          </CyberCard>

          <CyberCard 
            eyebrow="Background" 
            title="Education & Affiliation" 
            icon={GraduationCap} 
            animated
          >
            <div className="space-y-4 mt-2">
              <div>
                <span className="block text-[10px] uppercase font-mono text-slate-500 mb-1">Degree</span>
                <span className="text-white text-sm">{profile.background}</span>
              </div>
              <div>
                <span className="block text-[10px] uppercase font-mono text-slate-500 mb-1">Institution</span>
                <span className="text-white text-sm">{profile.college}</span>
              </div>
              <div>
                <span className="block text-[10px] uppercase font-mono text-slate-500 mb-1">Status</span>
                <span className="text-crimson-400 text-sm font-mono">{profile.status}</span>
              </div>
            </div>
          </CyberCard>
        </DataGrid>
      </div>
    </motion.div>
  );
}
