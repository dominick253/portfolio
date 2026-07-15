"use client";

import { motion } from "framer-motion";
import { Mail, Globe, Video, UserPlus, ExternalLink } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import QuantumCloudBg from "@/components/backgrounds/QuantumCloudBg";

const quickContacts = [
  { icon: Mail, label: "Email", value: "hello@dominickp.com", href: "mailto:hello@dominickp.com" },
  { icon: Globe, label: "GitHub", value: "github.com/dominick253", href: "https://github.com/dominick253" },
  { icon: UserPlus, label: "LinkedIn", value: "linkedin.com/in/dominickpescetto", href: "https://www.linkedin.com/in/dominickpescetto" },
  { icon: Video, label: "YouTube", value: "youtube.com/@dominickpescetto", href: "https://www.youtube.com/channel/UCLJ1DvfOket2VpfooqYVPmQ" },
];

export default function ContactClient() {
  return (
    <>
      <QuantumCloudBg />
      <Navigation />
      <main className="pt-24">
        <section className="py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
              <span className="micro-accent">Connect</span>
              <h1 className="text-4xl sm:text-5xl font-semibold tracking-[-0.03em] text-text-primary mt-4 mb-4">
                Let&apos;s Build Something
              </h1>
              <p className="text-text-secondary text-sm max-w-lg mx-auto">
                Whether you have a project, collaboration idea, or just want to connect - drop me a message.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-5 gap-8 items-start">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="lg:col-span-2 space-y-4">
                <div className="glass rounded-xl p-5 border border-border">
                  <span className="micro block mb-4">Quick Links</span>
                  <div className="space-y-3">
                    {quickContacts.map((c) => (
                      <a key={c.label} href={c.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-xl hover:bg-surface transition-colors group">
                        <div className="p-2 rounded-lg bg-[#5e6ad2]/10"><c.icon className="w-4 h-4 text-accent-hover" /></div>
                        <div>
                          <p className="text-text-muted text-[10px] font-mono">{c.label}</p>
                          <p className="text-text-primary text-sm font-medium tracking-tight">{c.value}</p>
                        </div>
                        <ExternalLink className="w-3.5 h-3.5 text-text-muted ml-auto group-hover:text-accent-hover transition-colors" />
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-3">
                <div className="glass rounded-xl p-6 border border-border">
                  <span className="micro block mb-5">Send a Message</span>
                  <ContactForm />
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
