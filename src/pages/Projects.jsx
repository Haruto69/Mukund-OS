import React, { useState } from "react";
import { motion } from "framer-motion";
import { FolderGit2, ExternalLink, Github, Shield, Map, Activity, Terminal, LayoutGrid, CheckCircle, Clock } from "lucide-react";
import { SectionHeader, CyberCard, DataGrid, StatusChip, CyberButton, InfoTile, Modal } from "../components/ui";
import { ProjectCarousel3D } from "../components/visuals/ProjectCarousel3D";
import { projects } from "../data/projects";
import { playSound } from "../utils/sound";

export default function Projects() {
  const [filter, setFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);

  const featuredProject = projects.find(p => p.id === "nbuc-pipeline");

  // Determine icon based on project ID
  const getProjectIcon = (id) => {
    switch (id) {
      case "nbuc-pipeline": return Shield;
      case "disharakshak": return Map;
      case "self-care": return Activity;
      case "cyberdeck-os": return Terminal;
      default: return FolderGit2;
    }
  };

  const filters = ["All", "Industry", "Academic", "Full-stack", "Frontend", "Completed", "In Progress"];

  const filteredProjects = projects.filter(p => {
    if (filter === "All") return true;
    if (filter === "Industry") return p.type.toLowerCase().includes("industry");
    if (filter === "Academic") return p.type.toLowerCase().includes("academic");
    if (filter === "Full-stack") return p.type.toLowerCase().includes("full-stack");
    if (filter === "Frontend") return p.type.toLowerCase().includes("frontend");
    if (filter === "Completed") return p.status === "Completed" || p.status === "Deployed";
    if (filter === "In Progress") return p.status.toLowerCase().includes("in progress");
    return true;
  });

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
        title="PROJECT_ARCHIVES" 
        icon={FolderGit2} 
        eyebrow="Data Logs"
      />
      <p className="text-slate-400 text-sm mb-6 mt-[-1rem] px-1 font-sans leading-relaxed">
        Mission files for my strongest projects, including industry-recognized security work, academic prototypes, deployed full-stack apps, and this portfolio OS.
      </p>
      
      <div className="flex flex-col gap-6 pb-28 sm:pb-24">
        
        {/* 1. Summary Stats */}
        <motion.div variants={itemVariants}>
          <DataGrid variant="four">
            <InfoTile label="Total Projects" value="4" description="Verified archives" icon={LayoutGrid} />
            <InfoTile label="Completed" value="2" description="Deployed/Finished" icon={CheckCircle} />
            <InfoTile label="In Progress" value="2" description="Active development" icon={Clock} />
            <InfoTile label="Featured" value="Nokia NBUC" description="Industry Award" icon={Shield} variant="highlight" />
          </DataGrid>
        </motion.div>

        {/* 2. Featured Project Area */}
        {featuredProject && (
          <motion.div variants={itemVariants}>
            <CyberCard 
              eyebrow="PRIORITY ARCHIVE" 
              icon={Shield} 
              variant="highlight"
              className="border-primary-500/50 bg-[linear-gradient(45deg,rgba(220,20,60,0.08)_0%,transparent_100%)]"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                <div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-white leading-tight">{featuredProject.title}</h3>
                  <span className="font-mono text-xs text-primary-400 mt-1 block uppercase tracking-wider">{featuredProject.highlight}</span>
                </div>
                <StatusChip label={featuredProject.status} variant="success" className="w-fit" />
              </div>
              <p className="text-sm sm:text-base text-slate-300 mb-6 leading-relaxed">
                {featuredProject.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {featuredProject.tech.map(t => (
                  <StatusChip key={t} label={t} variant="neutral" />
                ))}
              </div>
              <div className="flex flex-wrap gap-3 pt-4 border-t border-primary-500/20">
                <CyberButton variant="primary" size="sm" onClick={() => setSelectedProject(featuredProject)}>
                  View Details
                </CyberButton>
                <CyberButton 
                  variant="secondary" 
                  size="sm" 
                  icon={Github} 
                  href={featuredProject.links.github !== "#" ? featuredProject.links.github : undefined}
                  disabled={featuredProject.links.github === "#"}
                >
                  {featuredProject.links.github === "#" ? "Source (Restricted)" : "Source"}
                </CyberButton>
              </div>
            </CyberCard>
          </motion.div>
        )}

        {/* 3. Filters */}
        <motion.div variants={itemVariants} className="w-full overflow-x-auto no-scrollbar py-2">
          <div className="flex flex-wrap sm:flex-nowrap gap-2 min-w-max">
            {filters.map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-sm font-mono text-[10px] sm:text-xs uppercase tracking-wider transition-all border ${
                  filter === f 
                    ? "bg-primary-500/20 border-primary-500/50 text-primary-300 shadow-[0_0_10px_rgba(220,20,60,0.2)]" 
                    : "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </motion.div>

        {/* 4. Project Cards Grid (Replaced with 3D Carousel) */}
        <motion.div variants={itemVariants}>
          <ProjectCarousel3D 
            projects={filteredProjects} 
            onSelect={(p) => {
              playSound("open");
              setSelectedProject(p);
            }} 
          />
          
          {filteredProjects.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 border border-dashed border-white/10 rounded-lg bg-white/[0.01]">
              <FolderGit2 className="h-8 w-8 text-slate-500 mb-2" />
              <p className="font-mono text-xs text-slate-400">NO_ARCHIVES_FOUND</p>
            </div>
          )}
        </motion.div>
      </div>

      {/* 5. Project Detail Modal */}
      <Modal 
        isOpen={!!selectedProject} 
        onClose={() => {
          playSound("close");
          setSelectedProject(null);
        }}
        title={selectedProject?.title}
        size="lg"
      >
        {selectedProject && (
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <StatusChip label={selectedProject.type} variant="neutral" />
              <StatusChip 
                label={selectedProject.status} 
                variant={selectedProject.status === "Completed" || selectedProject.status === "Deployed" ? "success" : "warning"} 
              />
            </div>
            
            <div className="bg-primary-500/10 border border-primary-500/20 p-4 rounded-lg">
              <span className="font-mono text-[10px] text-primary-400 uppercase tracking-wider block mb-1">Mission Highlight</span>
              <p className="text-white font-medium">{selectedProject.highlight}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div>
                  <h4 className="flex items-center gap-2 font-display text-lg text-white mb-2 border-b border-white/10 pb-2">
                    <Activity className="h-4 w-4 text-primary-500" />
                    The Problem
                  </h4>
                  <p className="text-sm text-slate-300 leading-relaxed">{selectedProject.problem}</p>
                </div>
                
                <div>
                  <h4 className="flex items-center gap-2 font-display text-lg text-white mb-2 border-b border-white/10 pb-2">
                    <Shield className="h-4 w-4 text-primary-500" />
                    Role & Contribution
                  </h4>
                  <p className="text-sm text-slate-300 leading-relaxed">{selectedProject.role}</p>
                </div>

                <div>
                  <h4 className="flex items-center gap-2 font-display text-lg text-white mb-2 border-b border-white/10 pb-2">
                    <Terminal className="h-4 w-4 text-primary-500" />
                    Tech Stack
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map(t => (
                      <span key={t} className="text-xs font-mono border border-white/10 bg-white/5 px-2 py-1 rounded text-slate-300">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="font-display text-lg text-white mb-2 border-b border-white/10 pb-2">Key Features</h4>
                  <ul className="space-y-2">
                    {selectedProject.keyFeatures.map((f, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                        <span className="text-primary-500 mt-1">▹</span>
                        <span className="leading-relaxed">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-display text-lg text-white mb-2 border-b border-white/10 pb-2">Challenges Overcome</h4>
                  <ul className="space-y-2">
                    {selectedProject.challenges.map((c, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                        <span className="text-amber-500 mt-1">▹</span>
                        <span className="leading-relaxed">{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-display text-lg text-white mb-2 border-b border-white/10 pb-2">What I Learned</h4>
                  <ul className="space-y-2">
                    {selectedProject.learned.map((l, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                        <span className="text-emerald-500 mt-1">▹</span>
                        <span className="leading-relaxed">{l}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-6 border-t border-white/10 mt-2">
              {selectedProject.links.github !== "#" && (
                <CyberButton href={selectedProject.links.github} variant="secondary" icon={Github}>
                  View Source Code
                </CyberButton>
              )}
              {selectedProject.links.live && selectedProject.links.live !== "#" && (
                <CyberButton href={selectedProject.links.live} variant="primary" icon={ExternalLink}>
                  View Live Deployment
                </CyberButton>
              )}
              {selectedProject.links.github === "#" && (
                <p className="font-mono text-xs text-slate-500 py-2 border border-dashed border-white/10 px-4 rounded w-full text-center">
                  [ SOURCE REPOSITORY RESTRICTED OR CURRENTLY UNAVAILABLE ]
                </p>
              )}
            </div>
          </div>
        )}
      </Modal>

    </motion.div>
  );
}
