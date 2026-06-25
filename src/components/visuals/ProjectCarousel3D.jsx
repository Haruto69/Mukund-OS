import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Github, ExternalLink, Shield, Map, Activity, Terminal, FolderGit2 } from "lucide-react";
import { CyberCard, StatusChip, CyberButton } from "../ui";
import { playSound } from "../../utils/sound";

export function ProjectCarousel3D({ projects, onSelect }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  // Reset index if projects array changes (e.g., filtered)
  useEffect(() => {
    setCurrentIndex(0);
  }, [projects]);

  if (!projects || projects.length === 0) return null;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const handleNext = () => {
    playSound("select");
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const handlePrev = () => {
    playSound("select");
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const getProjectIcon = (id) => {
    switch (id) {
      case "nbuc-pipeline": return Shield;
      case "disharakshak": return Map;
      case "self-care": return Activity;
      case "cyberdeck-os": return Terminal;
      default: return FolderGit2;
    }
  };

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") handlePrev();
    if (e.key === "ArrowRight") handleNext();
  };

  // Render a single project card
  const renderCard = (project, isActive, offset) => {
    const Icon = getProjectIcon(project.id);
    const isCompleted = project.status === "Completed" || project.status === "Deployed";

    // Desktop 3D depth calculations
    const scale = isActive ? 1 : 0.85;
    const zIndex = isActive ? 10 : 5 - Math.abs(offset);
    const opacity = isActive ? 1 : 0.4;
    const xOffset = offset * 40; // Desktop percentage offset
    
    // Mobile simpler stacking
    const mobileX = offset * 100;
    const mobileOpacity = isActive ? 1 : 0;
    const mobileScale = isActive ? 1 : 0.9;

    return (
      <motion.div
        key={project.id}
        initial={prefersReducedMotion ? { opacity: 0 } : { 
          opacity: 0, 
          scale: 0.8, 
          x: direction > 0 ? "50%" : "-50%" 
        }}
        animate={prefersReducedMotion ? { opacity } : {
          scale: [null, scale],
          opacity: [null, opacity],
          x: [`${direction * 20}%`, "0%"],
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={`absolute w-full h-full transition-all duration-500`}
        style={{
          zIndex,
          transform: `translateX(${xOffset}%) scale(${scale})`, // Desktop CSS fallback logic
        }}
      >
        <CyberCard 
          eyebrow={project.type} 
          icon={Icon}
          animated={isActive}
          className={`flex flex-col h-full bg-black/80 backdrop-blur-sm transition-all duration-300 ${isActive ? 'border-primary-500 shadow-glow-primary' : 'border-white/5 grayscale pointer-events-none'}`}
        >
          <div className="flex flex-col mb-3">
            <h4 className="font-display text-lg font-bold text-white mb-2 leading-tight truncate">{project.title}</h4>
            <StatusChip 
              label={project.status} 
              variant={isCompleted ? "success" : "warning"} 
              className="w-fit"
            />
          </div>
          
          <p className="text-sm text-slate-300 flex-1 mb-4 line-clamp-3">
            {project.description}
          </p>
          
          <div className="mb-4 bg-white/[0.02] p-2 border-l-2 border-primary-500/50">
            <span className="text-[9px] uppercase font-mono text-slate-500 block">Highlight</span>
            <p className="text-xs text-slate-300 font-medium truncate">{project.highlight}</p>
          </div>

          <div className="flex gap-2 mt-auto pt-4 border-t border-white/5 pointer-events-auto">
            <CyberButton 
              variant="primary" 
              size="sm" 
              className="flex-1 justify-center"
              onClick={() => onSelect(project)}
              disabled={!isActive}
              tabIndex={isActive ? 0 : -1}
            >
              View Details
            </CyberButton>
          </div>
        </CyberCard>
      </motion.div>
    );
  };

  // Safe modulo for previous index
  const prevIndex = (currentIndex - 1 + projects.length) % projects.length;
  const nextIndex = (currentIndex + 1) % projects.length;

  return (
    <div 
      className="relative w-full flex flex-col items-center justify-center outline-none py-6"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      aria-label="Project Carousel"
    >
      {/* 3D Carousel Track */}
      <div className="relative w-full max-w-sm sm:max-w-md h-[400px] flex items-center justify-center perspective-1000">
        <AnimatePresence mode="popLayout" custom={direction}>
          {projects.length === 1 ? (
            renderCard(projects[0], true, 0)
          ) : projects.length === 2 ? (
            <>
              {renderCard(projects[currentIndex], true, 0)}
              <div className="hidden sm:block opacity-30 absolute right-[-10%] scale-90 translate-x-full">
                {renderCard(projects[nextIndex], false, 1)}
              </div>
            </>
          ) : (
            <>
              <div className="hidden sm:block absolute left-[-15%] sm:left-[-30%] w-full h-full opacity-40 scale-90 -translate-x-full">
                {renderCard(projects[prevIndex], false, -1)}
              </div>
              
              {renderCard(projects[currentIndex], true, 0)}
              
              <div className="hidden sm:block absolute right-[-15%] sm:right-[-30%] w-full h-full opacity-40 scale-90 translate-x-full">
                {renderCard(projects[nextIndex], false, 1)}
              </div>
            </>
          )}
        </AnimatePresence>
      </div>

      {/* Controls */}
      {projects.length > 1 && (
        <div className="flex items-center gap-4 mt-8 z-20">
          <CyberButton 
            variant="secondary" 
            size="sm" 
            icon={ChevronLeft} 
            onClick={handlePrev}
            aria-label="Previous Project"
            className="px-3"
          />
          <div className="font-mono text-xs text-primary-400 font-bold tracking-widest w-16 text-center">
            {currentIndex + 1} / {projects.length}
          </div>
          <CyberButton 
            variant="secondary" 
            size="sm" 
            icon={ChevronRight} 
            onClick={handleNext}
            aria-label="Next Project"
            className="px-3"
          />
        </div>
      )}
    </div>
  );
}
