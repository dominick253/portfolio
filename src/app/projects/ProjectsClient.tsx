"use client";

import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";
import VoronoiBg from "@/components/backgrounds/VoronoiBg";

export default function ProjectsClient() {
  return (
    <>
      <VoronoiBg />
      <Navigation />
      <main className="pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <span className="micro-accent">Portfolio</span>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-[-0.03em] text-text-primary mt-4 mb-4">
              Production Systems I&apos;ve Built
            </h1>
            <p className="text-text-secondary text-sm max-w-lg mx-auto">
              Every project ships with verified outcomes, real problem-solving, and measurable results. No fluff - only production-grade work.
            </p>
          </motion.div>

          <div className="flex justify-center mb-10">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full glass border border-border">
              <span className="tag-power">All</span>
              <span className="text-text-muted text-xs font-mono">{projects.length} projects</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
