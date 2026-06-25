import React from "react";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, ExternalLink } from "lucide-react";
import { SectionHeader, CyberCard, DataGrid, CyberButton } from "../components/ui";
import { socials } from "../data/socials";

export default function Contact() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="flex h-full w-full flex-col p-4 overflow-y-auto no-scrollbar"
    >
      <SectionHeader 
        title="SECURE_COMMS" 
        icon={Mail} 
        eyebrow="Transmission"
      />
      
      <div className="pb-28 sm:pb-24 max-w-2xl">
        <CyberCard eyebrow="Open Channels" title="Direct Links" icon={ExternalLink} animated>
          <div className="flex flex-col gap-4 mt-4">
            <CyberButton variant="primary" icon={Mail} href={socials.email} className="w-full justify-start">
              Initialize Email
            </CyberButton>
            <CyberButton variant="secondary" icon={Github} href={socials.github} className="w-full justify-start">
              GitHub Repository
            </CyberButton>
            <CyberButton variant="secondary" icon={Linkedin} href={socials.linkedin} className="w-full justify-start">
              LinkedIn Network
            </CyberButton>
          </div>
        </CyberCard>
      </div>
    </motion.div>
  );
}
