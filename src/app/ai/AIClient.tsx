"use client";

import { motion } from "framer-motion";
import {
  Brain, Cpu, Network, Database, BarChart3, Bot,
  GitBranch, Workflow, Layers, Globe
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const aiProjects = [
  {
    icon: Brain,
    title: "Hermes Agent Framework",
    description: "Full AI agent orchestration system with intent routing, MCP integration, entity extraction, and a 600K+ node knowledge graph. Microservices architecture deployed on Proxmox.",
    highlights: ["4+ microservices", "Intent Router (BM25)", "MCP Server", "Systemd health monitoring"],
  },
  {
    icon: Network,
    title: "CodeGraphContext (CGC)",
    description: "Code knowledge graph toolkit with LSP call/usage resolution, Leiden community detection, Cypher-queryable graph, and hot-path risk analysis across codebases.",
    highlights: ["Multi-repo indexing", "Data flow tracing", "Cross-service HTTP edges", "Architecture clusters"],
  },
  {
    icon: Globe,
    title: "AI Knowledge Router",
    description: "Multi-system RAG routing layer that classifies queries and dispatches to the optimal backend (GraphRAG, wiki-rag, codebase-memory) with fallback.",
    highlights: ["4+ backends", "Automatic routing", "Confidence scoring", "Semantic + BM25 hybrid"],
  },
  {
    icon: Database,
    title: "Mem0ai Memory Architecture",
    description: "4-layer persistent memory system (L0-L3) with NER entity extraction, embedding quality monitoring, ChromaDB vector storage, and multi-type memory indexing.",
    highlights: ["NER retraining >90%", "BGE embeddings", "1.8K+ entities", "Scene block synthesis"],
  },
  {
    icon: Cpu,
    title: "Intel Arc B70 Inference Server",
    description: "Production vLLM deployment on Intel Arc Pro B70 GPUs with tensor parallelism (TP=4), NVFP4 quantization, and Docker toolboxes for multi-model serving.",
    highlights: ["vLLM + llama.cpp", "25-45 t/s generation", "5K-15K+ t/s prefill", "CI/CD toolboxes"],
  },
  {
    icon: Workflow,
    title: "Agentic Architectures Library",
    description: "35 production-grade agentic AI architectures documented from real implementations: DeerFlow, AutoGPT-style, subagent orchestration, MCP-based tools, and RAG pipelines.",
    highlights: ["35 patterns", "Production benchmarks", "Trade-off analysis", "Documentation-driven"],
  },
];

export default function AIClient() {
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
              Artificial Intelligence
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl font-bold text-text-primary mt-4 mb-6"
            >
              AI Engineering Work
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-text-secondary text-lg max-w-3xl mx-auto"
            >
              From agent orchestration frameworks to production LLM inference on custom GPU hardware —
              I build AI systems that work in the real world, not just in notebooks.
            </motion.p>
          </div>
        </section>

        {/* AI Projects */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-24">
          <div className="grid sm:grid-cols-2 gap-6">
            {aiProjects.map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="card p-6"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-2.5 bg-accent-glow rounded-xl shrink-0">
                    <project.icon className="w-6 h-6 text-accent-hover" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary">{project.title}</h3>
                  </div>
                </div>
                <p className="text-text-secondary text-sm leading-relaxed mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.highlights.map((h) => (
                    <span key={h} className="tech-tag">{h}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Philosophy */}
        <section className="pb-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass rounded-2xl p-8 sm:p-12 text-center"
            >
              <Bot className="w-12 h-12 text-accent-hover mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-text-primary mb-4">My AI Philosophy</h2>
              <p className="text-text-secondary text-sm leading-relaxed max-w-2xl mx-auto">
                AI systems should be autonomous, auditable, and actually useful. Every system I build ships with
                verified outputs, comprehensive testing, and clean documentation. No black boxes, no hand-waving,
                no &ldquo;it works on my machine.&rdquo; I believe models are tools — not magic — and production-grade
                engineering is what makes them valuable.
              </p>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
