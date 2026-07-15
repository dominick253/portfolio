"use client";

import { motion } from "framer-motion";
import { Server, Cpu, Cloud, GitBranch, Shield, HardDrive, Monitor, Globe, Activity } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const infraItems = [
  { icon: Server, title: "Proxmox Cluster (2 Nodes + Pi Quorum)", desc: "HA virtualization cluster running VMs for Kubernetes, AI inference, and development. Raspberry Pi 5 as QDevice." },
  { icon: Cloud, title: "Kubernetes (3 Nodes)", desc: "Multi-node K3s cluster across Proxmox VMs. Hosts AI agent orchestration, monitoring, and internal tooling." },
  { icon: Cpu, title: "Intel Arc Pro B70 GPU Server", desc: "4x Arc Pro B70 GPUs running vLLM. DeepSeek V4-Flash with NVFP4 quantization at ~45 t/s." },
  { icon: GitBranch, title: "CI/CD via Ansible + GitHub Actions", desc: "GitHub webhooks trigger Ansible playbooks for zero-downtime deploys across all services." },
  { icon: Shield, title: "Cloudflare Tunnel", desc: "All external traffic routed through Cloudflare edge network with Access policies." },
  { icon: Monitor, title: "OpenWRT Router (Pi 4B)", desc: "Self-managed router on Raspberry Pi 4B with firewall rules and static IP allocation." },
  { icon: HardDrive, title: "Docker + Portainer", desc: "Container orchestration for Jellyfin, Nextcloud, Uptime Kuma, VS Code Server, CasaOS." },
  { icon: Activity, title: "Monitoring (Kuma + Grafana)", desc: "Self-hosted stack tracking health, uptime, and performance across all services." },
  { icon: Globe, title: "Domain: dominickp.com", desc: "Custom domains routed through Cloudflare. Microservices via subdomains with Access." },
];

const specs = [
  { value: "12+", label: "VMs" },
  { value: "20+", label: "Containers" },
  { value: "99.9%", label: "Uptime" },
  { value: "~64GB", label: "GPU RAM" },
];

export default function HomelabClient() {
  return (
    <>
      <Navigation />
      <main className="pt-24">
        <section className="py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="micro-accent">Infrastructure</motion.span>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl sm:text-5xl font-semibold tracking-[-0.03em] text-text-primary mt-4 mb-4">
              Production Home Lab
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="text-text-secondary text-sm max-w-2xl mx-auto">
              Multi-node Kubernetes cluster, AI inference server with 4x Intel Arc GPUs, and automated CI/CD - all accessible via Cloudflare from anywhere.
            </motion.p>
          </div>
        </section>

        {/* Stats */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-16">
          <div className="grid grid-cols-4 gap-3">
            {specs.map((s) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass rounded-xl p-4 text-center border border-border">
                <div className="stat-value gradient">{s.value}</div>
                <div className="stat-label">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Grid */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-24">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {infraItems.map((item, i) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }} className="glass rounded-xl p-5 border border-border hover:border-[#76b900]/20 transition-all">
                <item.icon className="w-4 h-4 text-[#76b900] mb-3" />
                <h3 className="text-sm font-semibold text-text-primary mb-1.5 tracking-tight">{item.title}</h3>
                <p className="text-text-muted text-xs leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Origin Story */}
        <section className="pb-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass rounded-2xl p-8 border border-border">
              <span className="micro-power block mb-4">The Evolution</span>
              <div className="space-y-3 text-text-muted text-sm leading-relaxed">
                <p>
                  What started as a fix for a flaky WiFi router evolved into a production-grade infrastructure. The journey: <strong className="text-text-primary">2014 HP laptop running OpnSense</strong> &rarr; <strong className="text-text-primary">Raspberry Pi 4 with OpenWRT</strong> &rarr; <strong className="text-text-primary">Proxmox cluster with Kubernetes</strong> &rarr; <strong className="text-text-primary">Intel Arc Pro B70 GPU inference server</strong>.
                </p>
                <p>
                  Every component is version-controlled, deployments are automated through Ansible, and the entire stack is monitored 24/7. No cloud vendor lock-in - just self-owned, production-grade infrastructure.
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
