"use client";

import { motion } from "framer-motion";
import {
  Server, Cpu, Cloud, GitBranch, Shield, HardDrive, Wifi,
  Monitor, Globe, Activity
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const infraItems = [
  {
    icon: Server,
    title: "Proxmox Cluster (2 Nodes + Pi Quorum)",
    description: "High-availability virtualization cluster running VMs for Kubernetes, AI inference, and development environments. Raspberry Pi 5 as QDevice for quorum.",
  },
  {
    icon: Cloud,
    title: "Kubernetes (3 Nodes)",
    description: "Multi-node K3s cluster deployed across Proxmox VMs. Hosts services for AI agent orchestration, monitoring, and internal tooling.",
  },
  {
    icon: Cpu,
    title: "Intel Arc Pro B70 GPU Server",
    description: "Dedicated GPU inference server running vLLM with 4× Arc Pro B70 GPUs. Supports DeepSeek V4-Flash with NVFP4 quantization at ~45 t/s.",
  },
  {
    icon: GitBranch,
    title: "CI/CD via Ansible + GitHub Actions",
    description: "Automated deployments triggered by GitHub webhooks. Ansible playbooks handle repo cloning, dependency install, service restarts with zero-downtime.",
  },
  {
    icon: Shield,
    title: "Cloudflare Tunnel",
    description: "DNS and reverse proxy via Cloudflare tunnel. All external traffic routed through Cloudflare's edge network.",
  },
  {
    icon: Wifi,
    title: "OpenWRT Router (Raspberry Pi 4B)",
    description: "Self-managed router running OpenWRT for network traffic management, firewall rules, and static IP allocation.",
  },
  {
    icon: HardDrive,
    title: "Docker + Portainer",
    description: "Containerized services with Portainer management. Services include Jellyfin, Nextcloud, Uptime Kuma, VS Code Server, CasaOS.",
  },
  {
    icon: Activity,
    title: "Monitoring (Uptime Kuma + Grafana)",
    description: "Self-hosted monitoring stack tracking server health, uptime, and performance metrics across all services and nodes.",
  },
  {
    icon: Globe,
    title: "Domain Management (dominickp.com)",
    description: "Custom domains routed through Cloudflare. Microservices exposed via subdomains with Cloudflare Access for security.",
  },
];

const specHighlights = [
  { label: "VMs Total", value: "12+" },
  { label: "Containers", value: "20+" },
  { label: "Uptime", value: "99.9%" },
  { label: "GPU RAM", value: "~64GB" },
  { label: "Total Storage", value: "~4TB" },
  { label: "Services", value: "15+" },
];

export default function HomelabClient() {
  return (
    <>
      <Navigation />
      <main className="pt-24">
        {/* Hero */}
        <section className="py-16 relative">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-sm font-mono text-accent-hover uppercase tracking-widest"
            >
              Infrastructure
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl font-bold text-text-primary mt-4 mb-6"
            >
              Production Home Lab Infrastructure
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-text-secondary text-lg max-w-3xl mx-auto"
            >
              Not your average homelab. This is a production-grade multi-node infrastructure
              running Kubernetes, AI inference, and automated CI/CD — all accessible via
              Cloudflare from anywhere.
            </motion.p>
          </div>
        </section>

        {/* Stats */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 mb-20">
            {specHighlights.map((stat) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass rounded-xl p-4 text-center"
              >
                <div className="text-2xl font-bold gradient-text">{stat.value}</div>
                <div className="text-xs text-text-muted mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Infrastructure Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-24">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {infraItems.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="glass rounded-xl p-6 hover:border-accent/30 transition-all"
              >
                <div className="p-2 bg-accent-glow rounded-lg w-fit mb-4">
                  <item.icon className="w-5 h-5 text-accent-hover" />
                </div>
                <h3 className="text-text-primary font-semibold mb-2">{item.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Origin Story (brief) */}
        <section className="pb-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass rounded-2xl p-8 sm:p-12"
            >
              <h2 className="text-2xl font-bold text-text-primary mb-6">The Evolution</h2>
              <div className="space-y-4 text-text-secondary text-sm leading-relaxed">
                <p>
                  What started as a fix for a flaky WiFi router evolved into a production-grade
                  infrastructure that rivals small data centers. The journey: <strong className="text-text-primary">2014 HP laptop running OpnSense</strong>{" "}
                  → <strong className="text-text-primary">Raspberry Pi 4 with OpenWRT</strong>{" "}
                  → <strong className="text-text-primary">Proxmox cluster with Kubernetes</strong>{" "}
                  → <strong className="text-text-primary">Intel Arc Pro B70 GPU inference server</strong>.
                </p>
                <p>
                  Every component is version-controlled via GitHub, deployments are automated
                  through Ansible webhook listeners, and the entire stack is monitored 24/7.
                  No cloud vendor lock-in — just self-owned, self-managed, production-grade infrastructure.
                </p>
                <p className="text-text-muted text-xs">
                  Originally documented August 2023. Continuously upgraded since.
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
