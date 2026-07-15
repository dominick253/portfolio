"use client";

import { motion } from "framer-motion";
import { Code2, Server, Cpu, Globe2, Monitor, Bot } from "lucide-react";

const stats = [
  { value: "6+", label: "CTV Platforms" },
  { value: "100K+", label: "GitHub Stars / Contributions" },
  { value: "4", label: "Microservices" },
  { value: "600K+", label: "Knowledge Graph Nodes" },
];

const skillCategories = [
  {
    title: "AI / ML",
    icon: Bot,
    skills: ["vLLM", "llama.cpp", "LangChain", "MCP Server", "GraphRAG", "RAG Pipelines", "NER/BERT", "Embeddings (BGE)", "Qwen Models"],
  },
  {
    title: "Infrastructure",
    icon: Server,
    skills: ["Proxmox VE", "Docker / Docker Compose", "Kubernetes", "Ansible", "GitHub Actions CI/CD", "Cloudflare Tunnel", "OpenWRT", "Systemd"],
  },
  {
    title: "CTV Platforms",
    icon: Monitor,
    skills: ["Roku (BrightScript/BrighterScript)", "FireTV (Java/Kotlin)", "Android TV / Google TV", "Samsung Tizen", "LG webOS CLI", "Vizio SmartCast"],
  },
  {
    title: "Languages",
    icon: Code2,
    skills: ["Python", "TypeScript / JavaScript", "Bash / Shell", "Kotlin", "Java", "BrightScript", "SQL"],
  },
  {
    title: "Databases & Storage",
    icon: Globe2,
    skills: ["ChromaDB", "SQLite", "MySQL (mysql2)", "mem0ai History DB", "Redis", "S3 / Cloudflare R2"],
  },
  {
    title: "Tools & DevOps",
    icon: Cpu,
    skills: ["Git", "Linux (Debian/Ubuntu)", "Intel Arc GPU / ROCm", "Grafana / Uptime Kuma", "vs Code Server", "Portainer", "Nginx"],
  },
];

export default function About() {
  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-mono text-accent-hover uppercase tracking-widest">About</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mt-4 mb-6">The Architect Behind the Systems</h2>
        </motion.div>

        {/* Bio */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6 text-text-secondary text-base leading-relaxed"
          >
            <p>
              I'm <span className="text-text-primary font-medium">Dominick Pescetto</span> — an AI Engineer and Principal Architect building production-grade systems that actually work in the real world.
            </p>
            <p>
              My work spans three main areas: <span className="text-text-primary">AI Infrastructure</span> (local LLM deployment, agent frameworks, knowledge graphs), <span className="text-text-primary">CTV Platforms</span> (cross-platform streaming apps for every major smart TV ecosystem), and <span className="text-text-primary">Infrastructure Architecture</span> (Proxmox clusters, Kubernetes, automated CI/CD pipelines).
            </p>
            <p>
              I believe in autonomous execution, zero-defect delivery, and building systems that outlive their creators. Every project ships with comprehensive testing, production monitoring, and clean documentation. No drafts. No half-measures. Only verified, polished artifacts.
            </p>
            <p className="text-text-muted text-sm">
              Based in the US. Currently advancing the state of AI agent orchestration and building the ultimate CTV AI Knowledge System across Roku, FireTV, Android TV, Tizen, and webOS.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center p-4 glass rounded-xl">
                  <div className="text-2xl font-bold gradient-text">{stat.value}</div>
                  <div className="text-xs text-text-muted mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Skills Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {skillCategories.map((category) => (
              <div key={category.title} className="glass rounded-xl p-6 hover:border-accent/30 transition-colors">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-accent-glow rounded-lg">
                    <category.icon className="w-5 h-5 text-accent-hover" />
                  </div>
                  <h3 className="text-text-primary font-semibold">{category.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span key={skill} className="tech-tag">{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
