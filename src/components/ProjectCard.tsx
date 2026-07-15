"use client";

import { motion } from "framer-motion";
import { ExternalLink, Code2 } from "lucide-react";
import type { Project } from "@/data/projects";

export default function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] as const }}
    >
      <div className="card-power h-full flex flex-col group">
        {/* Header */}
        <div className="p-6 pb-3 border-b border-border">
          <div className="flex items-start justify-between gap-4 mb-2">
            <div>
              {project.featured && (
                <span className="micro-power text-[10px] block mb-2">Featured</span>
              )}
              <h3 className="text-lg font-semibold text-text-primary tracking-tight group-hover:text-accent-hover transition-colors">
                {project.title}
              </h3>
              <p className="text-sm text-text-muted tracking-tight">{project.subtitle}</p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 flex-1 flex flex-col gap-3">
          <p className="text-text-secondary text-sm leading-relaxed">{project.description}</p>

          {/* Problem / Solution / Outcome as compact rows */}
          <div className="grid gap-2 mt-2">
            <div className="flex items-start gap-3 text-xs">
              <span className="micro text-[10px] whitespace-nowrap mt-0.5 text-red-400/70">Problem</span>
              <span className="text-text-muted">{project.problem}</span>
            </div>
            <div className="flex items-start gap-3 text-xs">
              <span className="micro text-[10px] whitespace-nowrap mt-0.5 text-emerald-400/70">Solution</span>
              <span className="text-text-muted">{project.solution}</span>
            </div>
            {project.outcome && (
              <div className="flex items-start gap-3 text-xs">
                <span className="micro text-[10px] whitespace-nowrap mt-0.5 text-accent-hover/70">Outcome</span>
                <span className="text-text-muted">{project.outcome}</span>
              </div>
            )}
          </div>

          {/* Tech Tags */}
          <div className="flex flex-wrap gap-1.5 mt-auto pt-4 border-t border-border">
            {project.techStack.slice(0, 6).map((tech) => (
              <span key={tech} className="tag">{tech}</span>
            ))}
            {project.techStack.length > 6 && (
              <span className="tag">+{project.techStack.length - 6}</span>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-border flex items-center justify-between bg-surface/50">
          {project.githubUrl ? (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-text-subtle hover:text-text-primary transition-colors text-xs font-medium">
              <Code2 className="w-3.5 h-3.5" />
              View Source
            </a>
          ) : <div />}
          <span className="text-text-muted text-[10px] font-mono">{project.slug}</span>
        </div>
      </div>
    </motion.div>
  );
}
