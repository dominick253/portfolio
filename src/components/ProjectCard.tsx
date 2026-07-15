"use client";

import { motion } from "framer-motion";
import { ExternalLink, Code2 } from "lucide-react";
import type { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="card h-full flex flex-col group">
        {/* Card Header */}
        <div className="p-6 pb-4">
          {project.featured && (
            <span className="inline-block px-3 py-1 text-xs font-semibold bg-gradient-to-r from-indigo-500/20 to-violet-500/20 text-accent-hover border border-indigo-500/30 rounded-full mb-3">
              Featured
            </span>
          )}
          <h3 className="text-xl font-semibold text-text-primary mb-1 group-hover:text-accent-hover transition-colors">
            {project.title}
          </h3>
          <p className="text-sm text-text-muted">{project.subtitle}</p>
        </div>

        {/* Description */}
        <div className="px-6 pb-4 flex-1">
          <p className="text-text-secondary text-sm leading-relaxed mb-4">
            {project.description}
          </p>

          {/* Problem/Solution/Outcome */}
          <div className="space-y-3">
            <div>
              <span className="text-xs font-semibold text-red-400 uppercase tracking-wider">Problem</span>
              <p className="text-text-secondary text-xs mt-1">{project.problem}</p>
            </div>
            <div>
              <span className="text-xs font-semibold text-green-400 uppercase tracking-wider">Solution</span>
              <p className="text-text-secondary text-xs mt-1">{project.solution}</p>
            </div>
            {project.outcome && (
              <div>
                <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">Outcome</span>
                <p className="text-text-secondary text-xs mt-1">{project.outcome}</p>
              </div>
            )}
          </div>

          {/* Tech Tags */}
          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border">
            {project.techStack.slice(0, 6).map((tech) => (
              <span key={tech} className="text-tag">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className="px-6 py-4 border-t border-border flex items-center justify-between bg-surface/50">
          <div className="flex gap-3">
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-outline !py-1.5 !px-3 text-xs flex-1 justify-center min-w-[80px]">
                <Code2 className="w-3.5 h-3.5 mr-1" />
                Code
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
