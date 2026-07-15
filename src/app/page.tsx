"use client";

import { motion } from "framer-motion";
import Hero from "@/components/Hero";
import FeaturedProjects from "@/components/FeaturedProjects";
import About from "@/components/About";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        {/* Hero Section */}
        <Hero />

        {/* Featured Projects */}
        <FeaturedProjects />

        {/* About + Skills */}
        <About />

        {/* Contact CTA Section */}
        <section className="py-24 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-glow/5 to-transparent" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto px-4 text-center relative z-10"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-6">
              Let's Build Something Together
            </h2>
            <p className="text-text-secondary text-lg mb-10 leading-relaxed">
              Whether you need an AI agent orchestration system, a cross-platform CTV app,
              or production infrastructure—I deliver verified, polished results.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="/contact" className="btn-primary !text-base !py-3 !px-8">
                Start a Conversation
              </a>
              <a href="/projects" className="btn-outline !text-base !py-3 !px-8">
                See All Projects
              </a>
            </div>
          </motion.div>
        </section>
      </main>
      <Footer />
    </>
  );
}
