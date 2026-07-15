"use client";

import { motion } from "framer-motion";
import { Brain, Cpu, Network, Database, Bot, Workflow, Globe, BarChart3 } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const aiProjects = [
  { icon: Brain, title: "Hermes Agent Framework", desc: "Full AI agent orchestration with intent routing, MCP integration, entity extraction, and a 600K+ node knowledge graph. 4+ microservices with systemd health monitoring.", tags: ["4 microservices", "BM25 Router", "MCP Server", "600K nodes"] },
  { icon: Network, title: "CodeGraphContext (CGC)", desc: "Code knowledge graph toolkit with LSP call resolution, Leiden community detection, Cypher queries, and hot-path risk analysis.", tags: ["Multi-repo", "Data flow", "Cross-service", "Clustering"] },
  { icon: Globe, title: "AI Knowledge Router", desc: "Multi-system RAG routing that classifies queries and dispatches to GraphRAG, wiki-rag, or codebase-memory with confidence scoring.", tags: ["4 backends", "Auto routing", "Confidence", "Hybrid search"] },
  { icon: Database, title: "Mem0ai Memory Architecture", desc: "4-layer persistent memory with NER extraction, embedding quality monitoring, ChromaDB vector storage, and scene block synthesis.", tags: ["NER >90%", "BGE embeddings", "1.8K entities", "Scene blocks"] },
  { icon: Cpu, title: "Intel Arc B70 Inference", desc: "Production vLLM on 4x Intel Arc Pro B70 GPUs with NVFP4 quantization, tensor parallelism, and Docker toolboxes.", tags: ["25-45 t/s gen", "5K-15K+ prefill", "NVFP4", "CI/CD toolboxes"] },
  { icon: Workflow, title: "Agentic Architectures Library", desc: "35 production-grade agentic AI patterns documented from real deployments with benchmarks and trade-off analysis.", tags: ["35 patterns", "Benchmarks", "Production", "OSS"] },
];

export default function AIClient() {
  return (
    <>
      <Navigation />
      <main className="pt-24">
        <section className="py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="micro-accent">Artificial Intelligence</motion.span>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl sm:text-5xl font-semibold tracking-[-0.03em] text-text-primary mt-4 mb-4">
              AI Engineering Work
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="text-text-secondary text-sm max-w-2xl mx-auto">
              From agent orchestration frameworks to production LLM inference on custom GPU hardware - I build AI systems that work in the real world, not just in notebooks.
            </motion.p>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-24">
          <div className="grid sm:grid-cols-2 gap-4">
            {aiProjects.map((p, i) => (
              <motion.div key={p.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="card p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-[#76b900]/10"><p.icon className="w-4 h-4 text-[#76b900]" /></div>
                  <h3 className="text-sm font-semibold text-text-primary tracking-tight">{p.title}</h3>
                </div>
                <p className="text-text-muted text-xs leading-relaxed mb-3">{p.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (<span key={t} className="tag">{t}</span>))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="pb-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass rounded-2xl p-8 text-center border border-border">
              <Bot className="w-10 h-10 text-[#5e6ad2] mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-text-primary mb-3 tracking-tight">My AI Philosophy</h2>
              <p className="text-text-muted text-sm leading-relaxed max-w-xl mx-auto">
                AI systems should be autonomous, auditable, and actually useful. Every system I build ships with verified outputs, comprehensive testing, and clean documentation. No black boxes, no hand-waving. Models are tools - not magic - and production-grade engineering is what makes them valuable.
              </p>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
