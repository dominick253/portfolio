"use client";

import { motion } from "framer-motion";
import { ArrowDown, Globe, UserPlus, Mail, ExternalLink } from "lucide-react";

const terminalLines = [
  "$ hermes deploy --production",
  "$ kubectl get pods -n production",
  "$ vllm serve lmsys/vicuna-7b-v1.5 ...",
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black_60%,transparent_100%)]" />

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[128px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-[128px] animate-pulse delay-700" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center px-4 max-w-5xl mx-auto"
      >
        {/* Badge */}
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-glow border border-indigo-500/20 text-accent-hover text-sm font-medium mb-8"
        >
          <SparklesIcon />
          Available for new opportunities
        </motion.div>

        {/* Main heading */}
        <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6">
          <span className="block text-text-primary">Dominick Pescetto</span>
          <span className="block gradient-text mt-2 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium">
            AI Engineer &amp; CTV Platform Architect
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p variants={itemVariants} className="text-lg sm:text-xl text-text-secondary max-w-3xl mx-auto mb-4 leading-relaxed">
          Building production-grade AI infrastructure and cross-platform streaming apps for{" "}
          <span className="text-text-primary font-medium">Roku</span>,{" "}
          <span className="text-text-primary font-medium">FireTV</span>,{" "}
          <span className="text-text-primary font-medium">Android TV</span>,{" "}
          <span className="text-text-primary font-medium">Tizen</span>, and{" "}
          <span className="text-text-primary font-medium">webOS</span>.
        </motion.p>

        {/* Terminal animation */}
        <motion.div variants={itemVariants} className="mt-8 inline-block">
          <div className="glass rounded-xl overflow-hidden max-w-lg mx-auto">
            <div className="flex items-center gap-2 px-4 py-2 border-b border-border bg-surface/50">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="ml-2 text-text-muted text-xs font-mono">terminal</span>
            </div>
            <div className="p-4 font-mono text-sm space-y-1">
              {terminalLines.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 + i * 0.5 }}
                  className="flex items-center gap-2"
                >
                  <span className="text-green-400">$</span>
                  <span className="text-text-primary">{line.substring(2)}</span>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, delay: 3 }}
                className="w-2 h-4 bg-accent inline-block align-middle"
              />
            </div>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div variants={itemVariants} className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a href="/projects" className="btn-primary !text-base !py-3 px-8">
            View Projects
            <ArrowDown className="w-5 h-5 -rotate-90" />
          </a>
          <a href="/contact" className="btn-outline !text-base !py-3 px-8">
            Get in Touch
          </a>
        </motion.div>

        {/* Social Links */}
        <motion.div variants={itemVariants} className="mt-16 flex items-center justify-center gap-6">
          <SocialLink href="https://github.com/dominick253" icon={<Globe className="w-5 h-5" />} label="GitHub" />
          <SocialLink href="https://www.linkedin.com/in/dominickpescetto" icon={<UserPlus className="w-5 h-5" />} label="LinkedIn" />
          <SocialLink href="mailto:hello@dominickp.com" icon={<Mail className="w-5 h-5" />} label="Email" />
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2 text-text-muted">
            <span className="text-xs font-mono uppercase tracking-widest">Scroll</span>
            <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
              <ArrowDown className="w-4 h-4" />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

function SocialLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="p-2 text-text-muted hover:text-accent-hover transition-colors rounded-lg hover:bg-surface-elevated"
      aria-label={label}
    >
      {icon}
    </a>
  );
}

function SparklesIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  );
}
