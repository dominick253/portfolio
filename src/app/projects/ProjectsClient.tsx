"use client";

import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";

export default function ProjectsClient() {
  return (
    <>
      <Navigation />
      <main className="pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <span className="text-sm font-mono text-accent-hover uppercase tracking-widest">
              Portfolio
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-text-primary mt-4 mb-6">
              Production Systems I&apos;ve Built
            </h1>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              Every project ships with verified outcomes, real problem-solving, and
              measurable results. No fluff — only production-grade work.
            </p>
          </motion.div>

          {/* Filter/Sort Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            <button className="px-4 py-2 rounded-full bg-accent-glow text-accent-hover border border-accent/30 text-sm font-medium">
              All Projects
            </button>
            <span className="px-3 py-1 text-text-muted text-xs flex items-center font-mono">
              {projects.length} projects
            </span>
          </div>

          {/* Project Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, i) => (
              <ProjectCard key={project.slug} project={project} index={i} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
