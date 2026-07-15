"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Hero from "@/components/Hero";
import FeaturedProjects from "@/components/FeaturedProjects";
import About from "@/components/About";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PerlinNoiseBg from "@/components/backgrounds/PerlinNoiseBg";

export default function Home() {
  return (
    <>
      <PerlinNoiseBg />
      <Navigation />
      <main>
        <Hero />
        <FeaturedProjects />
        <About />
        <section className="py-28 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#76b900]/[0.02] to-transparent" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto px-4 text-center relative z-10"
          >
            <span className="micro-power block mb-4">Let's Build</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-[-0.03em] text-text-primary mb-4">
              Let's Build Something Together
            </h2>
            <p className="text-text-secondary text-sm max-w-lg mx-auto mb-8">
              Whether you need an AI agent orchestration system, a cross-platform CTV app, or production infrastructure - I deliver verified, polished results.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a href="/contact" className="btn-power !text-xs !py-3 !px-7">
                Start a Conversation
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
              <a href="/projects" className="btn-accent !text-xs !py-3 !px-7">
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
