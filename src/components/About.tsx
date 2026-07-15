"use client";

import { motion } from "framer-motion";
import { Code2, Server, Cpu, Globe2, Monitor, Bot, Database, GitBranch, Cloud, Wifi } from "lucide-react";

const stats = [
  { value: "6+", label: "CTV Platforms" },
  { value: "600K+", label: "Graph Nodes" },
  { value: "4", label: "Microservices" },
  { value: "99.9%", label: "Uptime" },
];

const skillCategories = [
  {
    title: "AI / ML",
    icon: Bot,
    skills: ["vLLM", "llama.cpp", "LangChain", "MCP Server", "GraphRAG", "RAG", "NER/BERT", "Embeddings", "Qwen"],
  },
  {
    title: "Infrastructure",
    icon: Server,
    skills: ["Proxmox VE", "Docker", "Kubernetes", "Ansible", "GitHub Actions", "Cloudflare", "OpenWRT", "Systemd"],
  },
  {
    title: "CTV Platforms",
    icon: Monitor,
    skills: ["Roku (BrightScript)", "FireTV (Java/Kotlin)", "Android TV / Google TV", "Samsung Tizen", "LG webOS CLI", "Vizio SmartCast"],
  },
  {
    title: "Languages",
    icon: Code2,
    skills: ["Python", "TypeScript", "Bash", "Kotlin", "Java", "BrightScript", "SQL"],
  },
  {
    title: "Databases",
    icon: Database,
    skills: ["ChromaDB", "SQLite", "MySQL", "mem0ai", "Redis", "S3 / R2"],
  },
  {
    title: "DevOps",
    icon: GitBranch,
    skills: ["Git", "Linux", "Intel Arc GPU", "Grafana", "VS Code Server", "Portainer", "Nginx"],
  },
];

export default function About() {
  return (
    <section className="py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="micro-accent">About</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-[-0.03em] text-text-primary mt-4">
            The Architect Behind the Systems
          </h2>
        </motion.div>

        {/* Bio + Stats */}
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-5 text-text-secondary text-sm leading-relaxed"
          >
            <p>
              I'm <span className="text-text-primary font-semibold">Dominick Pescetto</span> - a Senior AI Engineer building production-grade systems that actually work in the real world.
            </p>
            <p>
              <span className="text-text-primary">AI Infrastructure</span>: local LLM deployment, agent frameworks, knowledge graphs.{" "}
              <span className="text-text-primary">CTV Platforms</span>: cross-platform streaming apps for every major smart TV ecosystem.{" "}
              <span className="text-text-primary">Infrastructure</span>: Proxmox clusters, Kubernetes, automated CI/CD.
            </p>
            <p className="text-text-muted text-xs">
              Every project ships with comprehensive testing, production monitoring, and clean documentation. No drafts. No half-measures. Only verified, polished artifacts.
            </p>

            <div className="grid grid-cols-4 gap-3 pt-4">
              {stats.map((stat) => (
                <div key={stat.label} className="glass rounded-xl p-3 text-center border border-border">
                  <div className="stat-value gradient">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Skills */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-3"
          >
            {skillCategories.map((cat) => (
              <div key={cat.title} className="glass rounded-xl p-4 border border-border hover:border-[#5e6ad2]/20 transition-colors">
                <div className="flex items-center gap-2.5 mb-3">
                  <cat.icon className="w-3.5 h-3.5 text-accent-hover" />
                  <span className="micro-accent text-[10px]">{cat.title}</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {cat.skills.map((skill) => (
                    <span key={skill} className="tag">{skill}</span>
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
