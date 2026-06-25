import React from "react";
import { motion } from "framer-motion";
import ProfileDossier from "../components/ProfileDossier";
import HeroCore from "../components/HeroCore";
import ActiveGoalPanel from "../components/ActiveGoalPanel";
import SystemWidget from "../components/SystemWidget";
import AchievementBadge from "../components/AchievementBadge";
import DesktopShortcut from "../components/DesktopShortcut";
import { systemWidgets } from "../data/widgets";
import { achievements } from "../data/achievements";
import { desktopItems } from "../data/desktopItems";

export default function Desktop() {
  return (
    <section className="relative z-10 mx-auto max-w-6xl px-4 pb-20 pt-14 sm:px-6 sm:pt-16">
      {/* Three-Panel Dashboard */}
      <div className="grid gap-4 lg:grid-cols-[220px_1fr_220px]">
        {/* Left — Profile Dossier */}
        <div className="hidden lg:block">
          <ProfileDossier />
        </div>

        {/* Center — HeroCore */}
        <div className="flex flex-col items-center">
          {/* Mobile profile summary */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="mb-4 w-full lg:hidden"
          >
            <ProfileDossier />
          </motion.div>

          <HeroCore />

          {/* Mobile active goal */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="mt-4 w-full lg:hidden"
          >
            <ActiveGoalPanel />
          </motion.div>
        </div>

        {/* Right — Active Goal */}
        <div className="hidden lg:block">
          <ActiveGoalPanel />
        </div>
      </div>

      {/* System Widgets */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        className="mt-6"
      >
        <p className="mb-3 font-mono text-[9px] uppercase tracking-wider text-slate-600">
          System Status
        </p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
          {systemWidgets.map((widget, i) => (
            <SystemWidget key={widget.label} widget={widget} index={i} />
          ))}
        </div>
      </motion.div>

      {/* Achievement Badges */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.35 }}
        className="mt-6"
      >
        <p className="mb-3 font-mono text-[9px] uppercase tracking-wider text-slate-600">
          Achievements
        </p>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {achievements.map((achievement, i) => (
            <AchievementBadge
              key={achievement.id}
              achievement={achievement}
              index={i}
            />
          ))}
        </div>
      </motion.div>

      {/* Quick Launch */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.4 }}
        className="mt-6"
      >
        <p className="mb-3 font-mono text-[9px] uppercase tracking-wider text-slate-600">
          System Modules — Quick Launch
        </p>
        <div className="flex flex-wrap gap-2">
          {desktopItems.map((item, index) => (
            <DesktopShortcut key={item.id} item={item} index={index} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
