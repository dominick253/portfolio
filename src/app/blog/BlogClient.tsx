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
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
              <span className="micro-accent">Insights</span>
              <h1 className="text-4xl sm:text-5xl font-semibold tracking-[-0.03em] text-text-primary mt-4 mb-4">Engineering Insights</h1>
              <p className="text-text-secondary text-sm max-w-lg mx-auto">Thoughts on AI infrastructure, CTV development, and production engineering.</p>
            </motion.div>

            <div className="space-y-4">
              {blogPosts.length === 0 ? (
                <div className="text-center py-20"><p className="text-text-muted text-sm">Posts coming soon.</p></div>
              ) : (
                blogPosts.map((post, i) => (
                  <motion.article key={post.slug} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                    className="card p-6 group cursor-pointer" onClick={() => window.location.href = `/blog/${post.slug}`}>
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 text-text-muted text-[10px] mb-2 font-mono">
                          <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{post.date}</span>
                          <span className="flex items-center gap-1"><Tag className="w-3 h-3" />{post.category}</span>
                        </div>
                        <h2 className="text-base font-semibold text-text-primary group-hover:text-accent-hover transition-colors mb-2 tracking-tight">{post.title}</h2>
                        <p className="text-text-muted text-xs leading-relaxed">{post.excerpt}</p>
                      </div>
                      <div className="sm:self-center"><ArrowRight className="w-4 h-4 text-text-muted group-hover:text-accent-hover transition-colors" /></div>
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
