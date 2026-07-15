export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  problem: string;
  solution: string;
  outcome: string;
  techStack: string[];
  featured?: boolean;
  githubUrl?: string;
  liveUrl?: string;
  imageAlt: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  category: string;
}

export const projects: Project[] = [
  {
    slug: "hermes-agent",
    title: "Hermes Agent Framework",
    subtitle: "AI Agent Orchestration System",
    description:
      "Production-grade AI agent framework with multi-model routing, MCP integration, and a 600K+ node knowledge graph. Orchestrates intent classification, entity extraction, and tool execution across microservices.",
    problem:
      "Need a scalable architecture where multiple AI models collaborate, context is maintained across sessions, and tools are dynamically dispatched based on intent - all with sub-second latency.",
    solution:
      "Built a modular agent framework with an Intent Router (BM25 classification), Entity Extractor, MCP server integration, and a unified knowledge graph. Deployed as 4+ microservices with health monitoring cron.",
    outcome:
      "600K+ node memory index, 94% tool reduction via intent routing, sub-100ms classification, production deployment on Proxmox cluster.",
    techStack: [
      "Python",
      "FastAPI",
      "MCP",
      "GraphRAG",
      "ChromaDB",
      "BM25",
      "Docker",
      "Systemd",
      "Cron",
    ],
    featured: true,
    githubUrl: "https://github.com/dominick253/hermes-agent",
    liveUrl: "https://www.dominickp.com/ai",
    imageAlt: "Hermes Agent Framework architecture diagram",
  },
  {
    slug: "ctv-platforms",
    title: "CTV Platform Development",
    subtitle: "Cross-Platform Streaming Applications",
    description:
      "Production streaming apps across all major smart TV platforms: Roku, FireTV, Android TV, Samsung Tizen, LG webOS, and Vizio. Includes SDK toolchains, CI/CD pipelines, and YouTube channel feed integration.",
    problem:
      "Each CTV platform has its own ecosystem, SDK, packaging format, and certification process. Maintaining feature parity across all platforms requires significant effort and specialized tooling.",
    solution:
      "Built a unified development infrastructure with GitHub Actions runners for each platform, shared component libraries, automated CI/CD pipelines via BrighterScript (Roku), Java/Kotlin (FireTV), and webOS CLI toolchains.",
    outcome:
      "Production apps on 6 platforms, automated CI/CD for all, YouTube channel integration with 249+ videos indexed. GitHub Actions runner handling multi-platform builds.",
    techStack: [
      "Roku",
      "BrighterScript",
      "FireTV",
      "Android TV",
      "Tizen",
      "webOS",
      "Node.js",
      "GitHub Actions",
      "Docker",
      "YouTube API",
    ],
    featured: true,
    githubUrl: "https://github.com/dominick253",
    liveUrl: "https://www.dominickp.com/homelab",
    imageAlt: "CTV platform development dashboard",
  },
  {
    slug: "codegraph-context",
    title: "CodeGraphContext (CGC)",
    subtitle: "Code Knowledge Graph Toolkit",
    description:
      "MCP server and CLI toolkit that indexes codebases into knowledge graphs for intelligent code discovery, call graph analysis, data flow tracing, and automated bug detection.",
    problem:
      "Understanding large codebases requires traversing files, functions, and relationships manually. Existing tools don't provide semantic search across function definitions or cross-service dependency tracking.",
    solution:
      "Built a knowledge graph indexer that parses code into structured representations (nodes for functions, classes, imports; edges for calls, data flows). Added BM25 ranking, Cypher query support, and MCP integration.",
    outcome:
      "Production toolkit used for cross-service analysis, hot-path detection (loop depth, memory allocations), architecture clustering. Supports full-text search with structural boosting.",
    techStack: [
      "Python",
      "LSP",
      "Cypher",
      "MCP",
      "ChromaDB",
      "BM25",
      "Leiden Clustering",
      "Git",
    ],
    featured: true,
    githubUrl: "https://github.com/dominick253/CodeGraphContext",
    liveUrl: "https://www.dominickp.com/ai",
    imageAlt: "CodeGraphContext knowledge graph visualization",
  },
  {
    slug: "intel-b70-toolboxes",
    title: "Intel Arc B70 AI Toolboxes",
    subtitle: "GPU-Accelerated LLM Inference Infrastructure",
    description:
      "Production Docker toolboxes for vLLM and llama.cpp on Intel Arc Pro B70 GPUs. Supports NVFP4/INT4 quantization, XPU optimization, and CI/CD pipeline for automated image publishing.",
    problem:
      "Intel ARC GPUs require special setup for LLM inference (XPU drivers, SYCL/vulkan). Deploying vLLM with tensor parallelism across 4 GPUs needs careful shared memory, security, and driver configuration.",
    solution:
      "Created isolated Docker toolboxes for llama.cpp (SYCL + Vulkan) and vLLM with proper XPU environment variables. Configured --tensor-parallel-size 4, --shm-size 200g, --security-opt seccomp=unconfined for multi-GPU inference.",
    outcome:
      "DeepSeek V4-Flash deployment on Intel Arc Pro B70 with NVFP4 quantization (~68-85GB weights). ~25-45 tokens/sec generation, 5K-15K+ tokens/sec prefill. Automated CI/CD via GitHub Actions.",
    techStack: [
      "Python",
      "vLLM",
      "llama.cpp",
      "Docker",
      "Intel GPU (XPU)",
      "NVFP4",
      "Tensor Parallelism",
      "GitHub Actions",
      "CI/CD",
    ],
    featured: true,
    githubUrl: "https://github.com/dominick253/intel-b70-ai-toolboxes",
    imageAlt: "Intel Arc B70 GPU server setup",
  },
  {
    slug: "mem0ai-integration",
    title: "Mem0ai Integration",
    subtitle: "Persistent Memory for AI Agents",
    description:
      "Multi-layer memory system for AI agents with NER extraction, embedding quality monitoring, ChromaDB storage, and episodic/constructional memory indexing.",
    problem:
      "AI agents need durable context across sessions but traditional approaches either lose all state or accumulate unbounded noise. Need structured memory that's queryable by type (persona, episodic, instruction).",
    solution:
      "Implemented 4-layer memory system (L0 conversations -> L1 structured memories -> L2 scene blocks -> L3 persona synthesis). Added NER retraining pipeline targeting >90% accuracy for 8 entity types.",
    outcome:
      "Structured memory extraction working across all layers. NER models trained on target types. Embedding quality tracking logs to JSONL format.",
    techStack: [
      "Python",
      "ChromaDB",
      "BGE Embeddings",
      "NER",
      "BERT",
      "JSONL",
      "Docker",
    ],
    featured: false,
    githubUrl: "https://github.com/dominick253/mem0",
    imageAlt: "Mem0ai memory architecture diagram",
  },
  {
    slug: "all-agentic-architectures",
    title: "All-Agentic-Architectures",
    subtitle: "35 Production Agent Architecture Reference",
    description:
      "Comprehensive reference library of 35 production-grade agentic AI architectures including retrieval agents, coding assistants, research systems, and multi-agent workflows.",
    problem:
      "The agentic AI space is growing rapidly but developers lack a curated reference of proven architecture patterns with implementation details and trade-off analysis.",
    solution:
      "Documented 35 architectures from real implementations: DeerFlow, AutoGPT-style agents, subagent orchestration, MCP-based tools, RAG pipelines. Each with pattern description, complexity analysis, and when-to-use guidance.",
    outcome:
      "Production reference library used for architecture decisions across multiple projects. Benchmarked and tested patterns in real deployments.",
    techStack: [
      "Research",
      "Architecture",
      "MCP",
      "RAG",
      "Subagents",
      "Documentation",
    ],
    featured: false,
    githubUrl: "https://github.com/dominick253/all-agentic-architectures",
    imageAlt: "Agentic architecture reference library",
  },
  {
    slug: "ai-knowledge-router",
    title: "AI Knowledge Router",
    subtitle: "Multi-System RAG Routing",
    description:
      "Intelligent knowledge routing system that classifies queries and dispatches them to the optimal MCP backend (GraphRAG, wiki-rag, unified-rag, codebase-memory) with a fallback mechanism.",
    problem:
      "Multiple knowledge retrieval systems exist but users/tools need a single entry point that picks the right backend for each query type without manual configuration.",
    solution:
      "Built classification layer that routes queries to GraphRAG (entity relationships), wiki-rag (documentation), unified-rag (semantic across all collections), and codebase-memory (project-specific code). Includes router confidence scoring.",
    outcome:
      "Single knowledge query endpoint serving 4+ backends with automatic routing. Router handles entity lookup, semantic search, and project-aware queries.",
    techStack: [
      "Python",
      "FastAPI",
      "MCP",
      "GraphRAG",
      "ChromaDB",
      "BM25",
      "Semantic Routing",
    ],
    featured: false,
    githubUrl: "https://github.com/dominick253/hermes-agent",
    imageAlt: "Knowledge router architecture",
  },
  {
    slug: "dirtbike-game",
    title: "Dirt Bike Racing Game",
    subtitle: "Three.js Browser Game with TDD",
    description:
      "Production-quality browser racing game built with Three.js featuring modular terrain, physics-based bike controls, and comprehensive test suite using Vitest.",
    problem:
      "Need a performant, self-contained browser game that demonstrates real engineering skills (physics, rendering, testing) without heavy dependencies or build complexity.",
    solution:
      "Built with Three.js for 3D rendering, custom physics integration, modular terrain system. TDD workflow with Vitest covering collision detection, physics updates, and render loop logic.",
    outcome:
      "Fully playable browser game with smooth 60fps rendering, realistic physics, single-file HTML delivery option, comprehensive test coverage.",
    techStack: [
      "Three.js",
      "JavaScript",
      "HTML5 Canvas",
      "Vitest",
      "TDD",
      "Physics",
      "3D Rendering",
    ],
    featured: false,
    githubUrl: "https://github.com/dominick253/threejs-arcade-games",
    liveUrl: "/projects/dirtbike",
    imageAlt: "Dirt bike racing game screenshot",
  },
  {
    slug: "homelab-infra",
    title: "Homelab Infrastructure",
    subtitle: "Production Home Lab with Kubernetes & Proxmox",
    description:
      "Multi-node Proxmox cluster running Kubernetes, Docker containers, VMs, and dedicated services - all exposed via Cloudflare tunnel. CI/CD pipeline using Ansible for zero-downtime deployments.",
    problem:
      "Home lab needs to support multiple concurrent workloads (AI inference, CTV development, media streaming, monitoring) with high availability and automated deployments.",
    solution:
      "Proxmox cluster with 2 nodes + Raspberry Pi quorum. 3 Kubernetes nodes for HA. Docker networks with static IPs. Cloudflare tunnel for external access. Ansible playbook webhook listener for CI/CD from GitHub.",
    outcome:
      "Production-grade infrastructure running on repurposed hardware. Zero-downtime deployments via Ansible webhooks. Multi-service orchestration including Jellyfin, Nextcloud, Uptime Kuma, Portainer, VS Code Server.",
    techStack: [
      "Proxmox",
      "Kubernetes",
      "Docker",
      "Ansible",
      "Cloudflare Tunnel",
      "OpenWRT",
      "GitHub Actions",
      "Raspberry Pi",
    ],
    featured: false,
    githubUrl: "https://www.dominickp.com/homelab",
    imageAlt: "Homelab infrastructure diagram",
  },
];

export const blogPosts: BlogPost[] = [
  {
    slug: "hermes-architecture-deep-dive",
    title: "Architecture of Hermes: Building a Production AI Agent Framework",
    date: "2026-07-14",
    excerpt:
      "How we built an AI agent framework with intent routing, MCP integration, and a 600K+ node knowledge graph - including lessons learned from deploying on Intel Arc GPUs.",
    category: "AI Architecture",
  },
  {
    slug: "ctv-platform-parity",
    title: "Achieving Feature Parity Across 6 CTV Platforms",
    date: "2026-07-10",
    excerpt:
      "Challenges and solutions for maintaining feature parity across Roku, FireTV, Android TV, Tizen, webOS, and Vizio - from shared components to platform-specific CI/CD.",
    category: "CTV Development",
  },
  {
    slug: "vllm-on-intel-arc",
    title: "vLLM on Intel Arc Pro B70: Benchmarks, Optimizations, and Gotchas",
    date: "2026-07-12",
    excerpt:
      "Deploying vLLM with tensor parallelism across 4 Intel Arc GPUs - prefill benchmarks, KV cache management, NVFP4 quantization results, and the --entrypoint /bin/bash gotcha.",
    category: "GPU Inference",
  },
];
