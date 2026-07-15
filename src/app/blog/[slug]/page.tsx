"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Calendar, Tag, ArrowLeft, Clock } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { blogPosts } from "@/data/projects";

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <>
        <Navigation />
        <main className="pt-24">
          <div className="max-w-4xl mx-auto px-4 py-24 text-center">
            <h1 className="text-3xl font-bold text-text-primary mb-4">Post not found</h1>
            <a href="/blog" className="text-accent-hover hover:underline">← Back to blog</a>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const content = getPostContent(slug);

  return (
    <>
      <Navigation />
      <main className="pt-24">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
          {/* Back link */}
          <a href="/blog" className="inline-flex items-center gap-2 text-text-muted hover:text-accent-hover transition-colors text-sm mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to articles
          </a>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-4 text-xs text-text-muted mb-4">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {post.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5" />
                {post.category}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                5 min read
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-6 leading-tight">
              {post.title}
            </h1>
            <p className="text-lg text-text-secondary mb-12">{post.excerpt}</p>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="prose prose-invert max-w-none"
          >
            {content ? (
              <div className="text-text-secondary space-y-6 leading-relaxed">
                {content.split('\n\n').map((paragraph, i) => (
                  <p key={i}>{paragraph.trim()}</p>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-16 h-16 rounded-full bg-accent-glow flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-accent-hover" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-text-muted mb-2">Full article coming soon</p>
                <p className="text-text-muted text-xs">I&apos;m drafting this one. Check back later.</p>
              </div>
            )}
          </motion.div>

          {/* Footer */}
          <div className="mt-16 pt-8 border-t border-border">
            <a href="/blog" className="btn-outline inline-flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to all articles
            </a>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}

function getPostContent(slug: string): string | null {
  const contents: Record<string, string> = {
    "hermes-architecture-deep-dive": `The Hermes Agent Framework started with a simple question: how do you build an AI system that actually coordinates multiple models, tools, and knowledge sources without falling apart?

The answer was a modular architecture with four core services:

## Intent Router (Port 8765)
The first line of classification. Every incoming request hits a BM25-based classifier that maps natural language to one of several intents (code, research, system, creative, etc.). This alone reduced the tool surface by 94% - instead of presenting all 50+ tools to every model, each intent only sees the 2-12 tools it actually needs.

## Entity Extractor (Port 8766)
Named entity recognition fine-tuned on our specific domain. Extracts FILE_PATH, URL, CRON_ID, SKILL_NAME, MCP_TOOL, FUNC_NAME, PROJECT, and VALUE from user queries. This structured extraction feeds directly into the knowledge graph.

## MCP Matcher (Port 8770)
The glue layer. Maps extracted intent + entities to specific MCP tools and servers. When the router says "this is a code question" and the extractor finds a project name, the matcher pre-loads the relevant codebase-memory context.

## Knowledge Graph (600K+ Nodes)
Built on ChromaDB with BGE-small-en-v1.5 embeddings. Stores every codebase analysis result, entity relationship, and session context. The graph supports BM25 full-text search and semantic vector search simultaneously.

## Deployment
All four services run as systemd user units on a Proxmox VM. Health monitoring via cron every 15 minutes. The entire stack was deployed iteratively - each service was tested independently before integration.`,
    "ctv-platform-parity": `Building the same streaming app for six different TV platforms is a masterclass in managing complexity. Every platform has its own:

- SDK and development tools
- UI framework and component model
- Packaging and deployment format
- Certification and review process
- Capabilities and limitations

## The Stack

Roku uses BrighterScript (an enhanced BrightScript compiler). FireTV uses Java/Kotlin with the Amazon Fire App Builder. Android TV is Kotlin with Jetpack Compose. Samsung Tizen uses its own web-based SDK. LG webOS uses the webOS CLI with standard web technologies. Vizio has its own SmartCast SDK.

## The CI/CD Pipeline

The key insight was building a unified GitHub Actions runner VM (CTVRunner) that has every SDK installed simultaneously. One self-hosted runner, 6 SDK toolchains. When a PR hits any platform repo, the same VM handles the build.

The runner runs Node.js 22, Java 21, BrighterScript 0.73.0, webOS CLI 3.2.5, and Android SDK/ADB. It handles packaging, signing, and artifact generation for all platforms.

## YouTube Integration

One of the core features across all platforms is YouTube channel feed integration. We built a feed generator that indexes 249+ videos and serves them as structured JSON that each platform renders natively. Title formatting, description handling, and thumbnail management are all automated.`,
    "vllm-on-intel-arc": `Deploying vLLM on Intel Arc Pro B70 GPUs was a journey. Here are the key findings.

## Hardware Setup

4x Intel Arc Pro B70 GPUs connected via ADT-Link F43SC risers (PCIe 5.0 x4 M.2 to x16). Four-layer impedance PCB, 128 Gbps max bandwidth per connection. The B70 has 16GB VRAM per card, so 64GB total.

## Software Stack

The Intel XPU platform requires specific setup. We use Docker containers with XPU drivers baked in. Key flags:
- \`--device /dev/dri\` for GPU access
- \`--shm-size 200g\` for vLLM's shared memory needs
- \`--security-opt seccomp=unconfined\` for process spawning

## vLLM Configuration

For DeepSeek V4-Flash, we use:
- \`--tensor-parallel-size 4\` (one GPU per tensor parallelism shard)
- \`--reasoning-parser qwen3\` for thinking-enabled outputs
- \`--override-generation-config\` with temperature 0.6-0.7
- \`--kv-cache-dtype fp8\` to manage KV cache memory

## Benchmark Results

Generation: 25-45 tokens/second at 4-bit quantization
Prefill: 5,000-15,000+ tokens/second

The KV cache is the bottleneck. With 64GB total VRAM and FP8 KV cache, we can hold roughly 32K-64K context tokens without offloading. Beyond that, performance degrades significantly.

## The Gotcha

One critical bug: vLLM's \`--entrypoint /bin/bash\` is required when running inside the Intel container, but \`bash -lc\` eats the first argument. Use a direct \`--entrypoint /bin/bash\` and pass the command as separate CMD elements.`,
  };

  return contents[slug] || null;
}
