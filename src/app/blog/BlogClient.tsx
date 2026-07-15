"use client";

import { motion } from "framer-motion";
import { Calendar, Tag, ArrowRight } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { blogPosts } from "@/data/projects";

export default function BlogClient() {
  return (
    <>
      <Navigation />
      <main className="pt-24">
        <section className="py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <span className="text-sm font-mono text-accent-hover uppercase tracking-widest">
                Insights
              </span>
              <h1 className="text-4xl sm:text-5xl font-bold text-text-primary mt-4 mb-6">
                Engineering Insights
              </h1>
              <p className="text-text-secondary text-lg max-w-2xl mx-auto">
                Thoughts on AI infrastructure, CTV development, and production engineering.
              </p>
            </motion.div>

            {/* Posts */}
            <div className="space-y-6">
              {blogPosts.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-text-muted">Posts coming soon. Stay tuned.</p>
                </div>
              ) : (
                blogPosts.map((post, i) => (
                  <motion.article
                    key={post.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="card p-6 sm:p-8 group cursor-pointer"
                    onClick={() => window.location.href = `/blog/${post.slug}`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 text-xs text-text-muted mb-3">
                          <span className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" />
                            {post.date}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Tag className="w-3.5 h-3.5" />
                            {post.category}
                          </span>
                        </div>
                        <h2 className="text-xl font-semibold text-text-primary group-hover:text-accent-hover transition-colors mb-3">
                          {post.title}
                        </h2>
                        <p className="text-text-secondary text-sm leading-relaxed">
                          {post.excerpt}
                        </p>
                      </div>
                      <div className="sm:self-center">
                        <ArrowRight className="w-5 h-5 text-text-muted group-hover:text-accent-hover transition-colors" />
                      </div>
                    </div>
                  </motion.article>
                ))
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
