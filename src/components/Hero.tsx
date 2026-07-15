"use client";

import { motion } from "framer-motion";
import { ArrowRight, Globe, UserPlus, Mail, Terminal } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Dark energy grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(94,106,210,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(94,106,210,0.04)_1px,transparent_1px)] bg-[size:48px_48px]" />

      {/* NVIDIA green scan line */}
      <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(118,185,0,0.015)_2px,rgba(118,185,0,0.015)_4px)]" />

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#5e6ad2]/5 rounded-full blur-[150px] animate-pulse" style={{ animationDuration: "6s" }} />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#76b900]/5 rounded-full blur-[150px] animate-pulse" style={{ animationDuration: "8s", animationDelay: "2s" }} />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center px-4 max-w-5xl mx-auto"
      >
        {/* Eyebrow */}
        <motion.div variants={itemVariants} className="flex items-center justify-center gap-3 mb-10">
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#5e6ad2]/8 border border-[#5e6ad2]/15">
            <span className="status-dot green" />
            <span className="micro-accent text-[10px]">Available for opportunities</span>
          </div>
        </motion.div>

        {/* Main Heading */}
        <motion.h1 variants={itemVariants} className="mb-4">
          <span className="block text-text-primary text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-semibold tracking-[-0.04em] leading-[1.05]">
            Dominick Pescetto
          </span>
          <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-[2.5rem] font-medium tracking-[-0.02em] leading-[1.15] mt-3 gradient-fire">
            AI Engineer &gt; CTV Platform Architect
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p variants={itemVariants} className="text-text-secondary text-base sm:text-lg max-w-2xl mx-auto mb-8 leading-relaxed tracking-tight">
          Building production-grade AI infrastructure and cross-platform streaming apps for{" "}
          <span className="text-text-primary font-medium">Roku</span>,{" "}
          <span className="text-text-primary font-medium">FireTV</span>,{" "}
          <span className="text-text-primary font-medium">Android TV</span>,{" "}
          <span className="text-text-primary font-medium">Tizen</span>, and{" "}
          <span className="text-text-primary font-medium">webOS</span>.
        </motion.p>

        {/* Terminal Window */}
        <motion.div variants={itemVariants} className="mb-10 inline-block w-full max-w-md mx-auto">
          <div className="glass rounded-xl overflow-hidden border border-border">
            <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-border bg-surface">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57]/80" />
                <div className="w-3 h-3 rounded-full bg-[#febc2e]/80" />
                <div className="w-3 h-3 rounded-full bg-[#28c840]/80" />
              </div>
              <div className="flex items-center gap-2 ml-3">
                <Terminal className="w-3.5 h-3.5 text-text-muted" />
                <span className="text-text-muted text-xs font-mono tracking-tight">~/portfolio $</span>
              </div>
            </div>
            <div className="p-4 font-mono text-xs space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-[#76b900] font-semibold">$</span>
                <span className="text-text-primary">hermes deploy --production</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#76b900] font-semibold">$</span>
                <span className="text-text-primary">kubectl get pods -n production</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#76b900] font-semibold">$</span>
                <span className="text-text-muted">vllm serve --tensor-parallel 4 ...</span>
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 1.2, delay: 3 }}
                className="w-2 h-4 bg-[#76b900] inline-block"
              />
            </div>
          </div>
        </motion.div>

        {/* CTAs */}
        <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-3 mb-12">
          <a href="/projects" className="btn-power !text-xs !py-3 !px-7">
            View Projects
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
          <a href="/contact" className="btn-outline !text-xs !py-3 !px-7">
            Get in Touch
          </a>
        </motion.div>

        {/* Social */}
        <motion.div variants={itemVariants} className="flex items-center justify-center gap-5">
          <a href="https://github.com/dominick253" target="_blank" rel="noopener noreferrer" className="p-2.5 text-text-muted hover:text-text-primary transition-colors rounded-xl hover:bg-surface border border-transparent hover:border-border" aria-label="GitHub">
            <Globe className="w-4 h-4" />
          </a>
          <a href="https://www.linkedin.com/in/dominickpescetto" target="_blank" rel="noopener noreferrer" className="p-2.5 text-text-muted hover:text-text-primary transition-colors rounded-xl hover:bg-surface border border-transparent hover:border-border" aria-label="LinkedIn">
            <UserPlus className="w-4 h-4" />
          </a>
          <a href="mailto:hello@dominickp.com" className="p-2.5 text-text-muted hover:text-text-primary transition-colors rounded-xl hover:bg-surface border border-transparent hover:border-border" aria-label="Email">
            <Mail className="w-4 h-4" />
          </a>
        </motion.div>

        {/* Scroll */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2 text-text-muted">
            <span className="micro text-[9px]">Scroll</span>
            <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
              <ArrowRight className="w-3.5 h-3.5 rotate-90" />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
