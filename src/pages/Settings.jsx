import React from "react";
import { motion } from "framer-motion";
import { Settings as SettingsIcon, ShieldAlert, Lock } from "lucide-react";
import { SectionHeader, CyberCard, EmptyState } from "../components/ui";

export default function Settings() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="flex flex-1 min-h-0 w-full flex-col p-4 overflow-y-auto no-scrollbar"
    >
      <SectionHeader 
        title="SYS_CONFIG" 
        icon={SettingsIcon} 
        eyebrow="Preferences"
      />
      
      <div className="flex-1 max-w-2xl pb-28 sm:pb-24">
        <CyberCard eyebrow="Security Protocol" title="Access Denied" icon={Lock} animated variant="danger">
          <EmptyState 
            title="CONFIG_LOCKED_PHASE_11"
            message="System configurations (Theme selector, animation intensity, boot sequence) are scheduled for Phase 11 deployment."
            icon={ShieldAlert}
          />
        </CyberCard>
      </div>
    </motion.div>
  );
}
