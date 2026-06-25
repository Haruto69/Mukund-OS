import React, { useState } from "react";
import { motion } from "framer-motion";
import { Radio, Mail, Github, Linkedin, FileText, Copy, Check, MessageSquare, Briefcase, Users, Lock, Terminal as TerminalIcon, Send, ExternalLink, Navigation } from "lucide-react";
import { SectionHeader, CyberCard, DataGrid, StatusChip, CyberButton } from "../components/ui";
import { socials } from "../data/socials";
import { profile } from "../data/profile";
import { Link } from "react-router-dom";

export default function Contact() {
  const [copied, setCopied] = useState(null);
  
  const [name, setName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle"); // idle, submitting, success, error

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

  const safeSocials = socials || {};
  const safeProfile = profile || {};

  const isPlaceholder = (url) => {
    if (!url) return true;
    if (url === "#") return true;
    if (url.includes("placeholder")) return true;
    if (url.includes("/#")) return true;
    return false;
  };

  const emailValid = !isPlaceholder(safeSocials.email);
  const githubValid = !isPlaceholder(safeSocials.github);
  const linkedinValid = !isPlaceholder(safeSocials.linkedin);
  const resumeValid = !isPlaceholder(safeSocials.resume);

  const handleCopy = (text, type) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const extractEmail = (mailto) => mailto ? mailto.replace("mailto:", "") : "";
  const recipientEmail = extractEmail(safeSocials.email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Honeypot check
    const gotcha = e.target.elements._gotcha?.value;
    if (gotcha) return;

    if (!name || !senderEmail || !message) return;

    setStatus("submitting");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", senderEmail);
    formData.append("subject", subject || "Portfolio Contact");
    formData.append("message", message);

    try {
      const response = await fetch("https://formspree.io/f/mvzjkonz", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      if (response.ok) {
        setStatus("success");
        setName("");
        setSenderEmail("");
        setSubject("");
        setMessage("");
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  const getButtonText = () => {
    switch (status) {
      case "submitting": return "Transmitting...";
      case "success": return "Message Sent";
      case "error": return "Retry Transmission";
      default: return "Transmit Message";
    }
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
        title="COMMS" 
        icon={Radio} 
        eyebrow="Contact Channels"
      />
      <p className="text-slate-400 text-sm mb-6 mt-[-1rem] px-1 font-sans leading-relaxed">
        Open communication channels for internship opportunities, project discussions, and professional connections.
      </p>

      <div className="flex flex-col gap-6 pb-28 sm:pb-24">

        {/* 1. Main Contact Status */}
        <motion.div variants={itemVariants}>
          <CyberCard 
            eyebrow="CONNECTION_STATUS" 
            title="System Online" 
            icon={Radio} 
            animated
            className="border-emerald-500/50 bg-[linear-gradient(45deg,rgba(16,185,129,0.05)_0%,transparent_100%)]"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
              <div className="space-y-3 flex-1">
                <div className="flex flex-col">
                  <span className="font-mono text-[10px] text-slate-500 uppercase">Availability</span>
                  <span className="text-white text-sm font-medium">{safeProfile.status || "Open for frontend/full-stack internships"}</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-mono text-[10px] text-slate-500 uppercase">Response Type</span>
                  <span className="text-emerald-400 text-sm font-mono tracking-tight">Internships / Projects / Connections</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-mono text-[10px] text-slate-500 uppercase">Current Focus</span>
                  <span className="text-slate-300 text-sm">{safeProfile.currentFocus || "React, Tailwind CSS, JavaScript, DSA with Java"}</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-mono text-[10px] text-slate-500 uppercase">Location Origin</span>
                  <span className="text-slate-300 text-sm">Bangalore, Karnataka</span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <StatusChip label="Open for internships" variant="success" className="w-fit" />
                <StatusChip label="Available" variant="neutral" className="w-fit" />
              </div>
            </div>
            <div className="mt-4 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded text-sm text-emerald-400/90 font-mono flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              Preferred Contact: LinkedIn or Email
            </div>
          </CyberCard>
        </motion.div>

        {/* 2. Contact Channels Grid */}
        <motion.div variants={itemVariants}>
          <DataGrid variant="auto">
            {/* Email */}
            <div className="bg-white/[0.02] border border-white/10 p-4 rounded-xl flex flex-col gap-3">
              <div className="flex items-center gap-2 mb-1">
                <Mail className="h-5 w-5 text-slate-400" />
                <h4 className="font-display font-bold text-white tracking-wider">Email Protocol</h4>
              </div>
              {emailValid ? (
                <>
                  <p className="text-sm text-slate-300 font-mono truncate">{extractEmail(safeSocials.email)}</p>
                  <div className="flex gap-2 mt-auto pt-2">
                    <a 
                      href={`mailto:${recipientEmail}?subject=${encodeURIComponent("Frontend Internship Opportunity")}&body=${encodeURIComponent("Hi Mukund,\n\nI came across your portfolio and wanted to connect.\n")}`}
                      className="group relative inline-flex flex-1 items-center justify-center gap-2 overflow-hidden rounded font-mono uppercase tracking-widest transition-all duration-300 border border-primary-500 bg-primary-500/20 text-primary-100 shadow-glow-primary hover:bg-primary-500/40 hover:shadow-glow-primary-lg px-3 py-1.5 text-[10px]"
                      aria-label="Open email client to contact Mukund"
                    >
                      <ExternalLink className="relative z-10 h-4 w-4" />
                      <span className="relative z-10">Open Email Client</span>
                    </a>
                    <CyberButton 
                      variant="ghost" 
                      size="sm" 
                      icon={copied === "email" ? Check : Copy} 
                      onClick={() => handleCopy(extractEmail(safeSocials.email), "email")}
                      className="border border-white/10 px-3"
                    />
                  </div>
                  <p className="text-[10px] text-slate-500 mt-2 leading-snug">
                    Email fallback depends on the visitor’s mail app/browser configuration. The form is the preferred contact method.
                  </p>
                </>
              ) : (
                <>
                  <p className="text-xs text-slate-500 italic">Email placeholder — replace later</p>
                  <div className="mt-auto pt-2">
                    <CyberButton variant="ghost" size="sm" icon={Lock} disabled className="w-full justify-center">
                      Offline
                    </CyberButton>
                  </div>
                </>
              )}
            </div>

            {/* LinkedIn */}
            <div className="bg-white/[0.02] border border-white/10 p-4 rounded-xl flex flex-col gap-3">
              <div className="flex items-center gap-2 mb-1">
                <Linkedin className="h-5 w-5 text-blue-400" />
                <h4 className="font-display font-bold text-white tracking-wider">LinkedIn Net</h4>
              </div>
              {linkedinValid ? (
                <>
                  <p className="text-sm text-slate-300 font-mono truncate">Professional Network</p>
                  <div className="flex gap-2 mt-auto pt-2">
                    <CyberButton 
                      variant="primary" 
                      size="sm" 
                      icon={ExternalLink} 
                      href={safeSocials.linkedin} 
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 justify-center"
                      aria-label="Open LinkedIn Profile"
                    >
                      Open LinkedIn
                    </CyberButton>
                    <CyberButton 
                      variant="ghost" 
                      size="sm" 
                      icon={copied === "linkedin" ? Check : Copy} 
                      onClick={() => handleCopy(safeSocials.linkedin, "linkedin")}
                      className="border border-white/10 px-3"
                    />
                  </div>
                </>
              ) : (
                <>
                  <p className="text-xs text-slate-500 italic">LinkedIn disconnected</p>
                  <div className="mt-auto pt-2">
                    <CyberButton variant="ghost" size="sm" icon={Lock} disabled className="w-full justify-center">
                      Coming Soon
                    </CyberButton>
                  </div>
                </>
              )}
            </div>

            {/* GitHub */}
            <div className="bg-white/[0.02] border border-white/10 p-4 rounded-xl flex flex-col gap-3">
              <div className="flex items-center gap-2 mb-1">
                <Github className="h-5 w-5 text-purple-400" />
                <h4 className="font-display font-bold text-white tracking-wider">GitHub Repo</h4>
              </div>
              {githubValid ? (
                <>
                  <p className="text-sm text-slate-300 font-mono truncate">Source Code Host</p>
                  <div className="flex gap-2 mt-auto pt-2">
                    <CyberButton 
                      variant="primary" 
                      size="sm" 
                      icon={ExternalLink} 
                      href={safeSocials.github} 
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 justify-center"
                      aria-label="Open GitHub Profile"
                    >
                      Open GitHub
                    </CyberButton>
                    <CyberButton 
                      variant="ghost" 
                      size="sm" 
                      icon={copied === "github" ? Check : Copy} 
                      onClick={() => handleCopy(safeSocials.github, "github")}
                      className="border border-white/10 px-3"
                    />
                  </div>
                </>
              ) : (
                <>
                  <p className="text-xs text-slate-500 italic">GitHub disconnected</p>
                  <div className="mt-auto pt-2">
                    <CyberButton variant="ghost" size="sm" icon={Lock} disabled className="w-full justify-center">
                      Coming Soon
                    </CyberButton>
                  </div>
                </>
              )}
            </div>
          </DataGrid>
        </motion.div>



        {/* 4. Contact Intent Cards */}
        <motion.div variants={itemVariants}>
          <DataGrid variant="auto">
            <CyberCard padding="sm" className="border-t-2 border-t-emerald-500">
              <Briefcase className="h-5 w-5 text-emerald-500 mb-3" />
              <h4 className="font-display font-bold text-white mb-2">Internship Opportunities</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Open to frontend/full-stack internship opportunities where I can work on practical UI, React, and full-stack features.
              </p>
            </CyberCard>

            <CyberCard padding="sm" className="border-t-2 border-t-purple-500">
              <TerminalIcon className="h-5 w-5 text-purple-500 mb-3" />
              <h4 className="font-display font-bold text-white mb-2">Project Discussion</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Available to explain project architecture, deployment decisions, and technical challenges from my portfolio.
              </p>
            </CyberCard>

            <CyberCard padding="sm" className="border-t-2 border-t-blue-500">
              <Users className="h-5 w-5 text-blue-500 mb-3" />
              <h4 className="font-display font-bold text-white mb-2">Professional Connection</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Open to connecting with developers, recruiters, mentors, and students working around frontend, full-stack, and security.
              </p>
            </CyberCard>
          </DataGrid>
        </motion.div>

        {/* 5. Message Terminal Placeholder */}
        <motion.div variants={itemVariants}>
          <CyberCard 
            eyebrow="MESSAGE_TERMINAL" 
            title="Direct Comm Link" 
            icon={MessageSquare} 
            animated
            className="border-dashed border-white/20 opacity-80"
          >
            <div className="bg-black/40 border border-white/5 rounded-lg p-6 flex flex-col items-center justify-center text-center">
              <Lock className="h-8 w-8 text-slate-500 mb-3" />
              <p className="text-slate-400 text-sm mb-4">
                This form sends your message through the portfolio contact endpoint.
              </p>
              
              {status === "success" && (
                <div className="w-full max-w-md p-3 mb-4 bg-emerald-500/10 border border-emerald-500/30 rounded text-emerald-400 text-sm text-left flex items-start gap-2">
                  <Check className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>Message transmitted successfully. I’ll receive it through my portfolio inbox.</span>
                </div>
              )}

              {status === "error" && (
                <div className="w-full max-w-md p-3 mb-4 bg-red-500/10 border border-red-500/30 rounded text-red-400 text-sm text-left flex items-start gap-2">
                  <Lock className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>Transmission failed. Please try again or use Email, GitHub, or LinkedIn.</span>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="w-full max-w-md space-y-3">
                <input type="text" name="_gotcha" className="hidden" tabIndex="-1" autoComplete="off" />
                <input 
                  type="text" 
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                  placeholder="SENDER_ID (Name)" 
                  className="w-full bg-white/5 border border-white/10 rounded px-4 py-2 text-sm text-white font-mono placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500" 
                  aria-label="Name"
                />
                <input 
                  type="email" 
                  value={senderEmail}
                  onChange={e => setSenderEmail(e.target.value)}
                  required
                  placeholder="RETURN_PATH (Email)" 
                  className="w-full bg-white/5 border border-white/10 rounded px-4 py-2 text-sm text-white font-mono placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500" 
                  aria-label="Email"
                />
                <input 
                  type="text" 
                  value={subject}
                  onChange={e => setSubject(e.target.value)}
                  placeholder="SUBJECT_LINE (Topic)" 
                  className="w-full bg-white/5 border border-white/10 rounded px-4 py-2 text-sm text-white font-mono placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500" 
                  aria-label="Subject"
                />
                <textarea 
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  required
                  placeholder="TRANSMISSION_PAYLOAD (Message)" 
                  rows={3} 
                  className="w-full bg-white/5 border border-white/10 rounded px-4 py-2 text-sm text-white font-mono placeholder:text-slate-500 resize-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500" 
                  aria-label="Message payload"
                />
                <CyberButton 
                  variant="primary" 
                  icon={Send} 
                  disabled={status === "submitting"} 
                  className="w-full justify-center"
                  type="submit"
                >
                  {getButtonText()}
                </CyberButton>
              </form>
            </div>
          </CyberCard>
        </motion.div>

      </div>
    </motion.div>
  );
}
