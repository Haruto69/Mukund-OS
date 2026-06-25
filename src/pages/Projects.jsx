import React from "react";
import { motion } from "framer-motion";
import { FolderGit2, ExternalLink, Github } from "lucide-react";
import { SectionHeader, CyberCard, DataGrid, StatusChip, CyberButton } from "../components/ui";
import { projects } from "../data/projects";

export default function Projects() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="flex flex-1 min-h-0 w-full flex-col p-4 overflow-y-auto no-scrollbar"
    >
      <SectionHeader 
        title="PROJECT_ARCHIVES" 
        icon={FolderGit2} 
        eyebrow="Data Logs"
      />
      
      <div className="pb-28 sm:pb-24">
        <DataGrid variant="auto">
          {projects.map((project, i) => (
            <CyberCard 
              key={project.id} 
              eyebrow={project.type} 
              title={project.title} 
              animated 
              className="flex flex-col h-full"
            >
              <div className="mb-3">
                <StatusChip 
                  label={project.status} 
                  variant={project.status === "Completed" ? "success" : "warning"} 
                  className="mb-2"
                />
              </div>
              <p className="text-sm text-slate-300 flex-1 mb-4">
                {project.description}
              </p>
              
              <div className="mb-4">
                <span className="text-[10px] uppercase font-mono text-crimson-500 mb-1 block">Highlight</span>
                <p className="text-xs text-slate-400">{project.highlight}</p>
              </div>

              <div className="flex flex-wrap gap-1 mb-4">
                {project.tech.map(t => (
                  <span key={t} className="text-[9px] font-mono border border-white/10 bg-white/5 px-1.5 py-0.5 rounded text-slate-400">
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex gap-2 mt-auto pt-4 border-t border-white/5">
                <CyberButton variant="secondary" size="sm" icon={Github} href={project.links.github} className="flex-1">
                  Source
                </CyberButton>
                {project.links.live && (
                  <CyberButton variant="ghost" size="sm" icon={ExternalLink} href={project.links.live} className="flex-1">
                    Live
                  </CyberButton>
                )}
              </div>
            </CyberCard>
          ))}
        </DataGrid>
      </div>
    </motion.div>
  );
}
