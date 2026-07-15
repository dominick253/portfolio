"use client";

import { motion } from "framer-motion";
import { Mail, Globe, Video, UserPlus, ExternalLink } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";

const quickContacts = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@dominickp.com",
    href: "mailto:hello@dominickp.com",
  },
  {
    icon: Globe,
    label: "GitHub",
    value: "github.com/dominick253",
    href: "https://github.com/dominick253",
  },
  {
    icon: UserPlus,
    label: "LinkedIn",
    value: "linkedin.com/in/dominickpescetto",
    href: "https://www.linkedin.com/in/dominickpescetto",
  },
  {
    icon: Video,
    label: "YouTube",
    value: "youtube.com/@dominickpescetto",
    href: "https://www.youtube.com/channel/UCLJ1DvfOket2VpfooqYVPmQ",
  },
];

export default function ContactClient() {
  return (
    <>
      <Navigation />
      <main className="pt-24">
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <span className="text-sm font-mono text-accent-hover uppercase tracking-widest">
                Connect
              </span>
              <h1 className="text-4xl sm:text-5xl font-bold text-text-primary mt-4 mb-6">
                Let&apos;s Build Something
              </h1>
              <p className="text-text-secondary text-lg max-w-2xl mx-auto">
                Whether you have a project in mind, a collaboration idea, or just want to
                connect — drop me a message.
              </p>
            </motion.div>

            {/* Two column layout */}
            <div className="grid lg:grid-cols-5 gap-12 items-start">
              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="lg:col-span-2 space-y-6"
              >
                <div className="glass rounded-2xl p-6">
                  <h2 className="text-text-primary font-semibold mb-4">Quick Links</h2>
                  <div className="space-y-4">
                    {quickContacts.map((contact) => (
                      <a
                        key={contact.label}
                        href={contact.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-4 p-3 rounded-xl hover:bg-surface-elevated transition-colors group"
                      >
                        <div className="p-2 bg-accent-glow rounded-lg group-hover:bg-accent/20 transition-colors">
                          <contact.icon className="w-5 h-5 text-accent-hover" />
                        </div>
                        <div>
                          <p className="text-text-muted text-xs">{contact.label}</p>
                          <p className="text-text-primary text-sm font-medium">{contact.value}</p>
                        </div>
                        <ExternalLink className="w-4 h-4 text-text-muted ml-auto group-hover:text-accent-hover transition-colors" />
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Contact form */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="lg:col-span-3"
              >
                <div className="glass rounded-2xl p-6 sm:p-8">
                  <h2 className="text-text-primary font-semibold mb-6">Send a Message</h2>
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
