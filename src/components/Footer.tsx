"use client";

import { motion } from "framer-motion";
import { Globe, Video, UserPlus, Mail, Heart } from "lucide-react";

const links = [
  { label: "Projects", href: "/projects" },
  { label: "Homelab", href: "/homelab" },
  { label: "AI", href: "/ai" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const socialLinks = [
  { label: "GitHub", href: "https://github.com/dominick253", icon: Globe },
  { label: "YouTube", href: "https://www.youtube.com/channel/UCLJ1DvfOket2VpfooqYVPmQ", icon: Video },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/dominickpescetto", icon: UserPlus },
  { label: "Email", href: "mailto:hello@dominickp.com", icon: Mail },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-border mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <a href="/" className="inline-flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
                <span className="text-white text-xs font-bold">DP</span>
              </div>
              <span className="font-semibold text-text-primary">Dominick Pescetto</span>
            </a>
            <p className="text-text-muted text-sm leading-relaxed">
              AI Engineer &amp; CTV Platform Architect building production-grade systems.
            </p>
            <p className="text-text-muted text-xs mt-2 font-mono">
              dominickp.com
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-text-primary font-medium mb-4 text-sm uppercase tracking-wider">Navigate</h4>
            <ul className="space-y-3">
              {links.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-text-secondary hover:text-accent-hover transition-colors text-sm">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-text-primary font-medium mb-4 text-sm uppercase tracking-wider">Connect</h4>
            <ul className="space-y-3">
              {socialLinks.map((social) => (
                <li key={social.label}>
                  <a href={social.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-text-secondary hover:text-accent-hover transition-colors text-sm">
                    <social.icon className="w-4 h-4" />
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quote */}
          <div className="lg:text-right">
            <div className="glass rounded-xl p-6 text-center">
              <p className="text-text-secondary italic text-sm leading-relaxed">&ldquo;Learning every day.&rdquo;</p>
              <p className="text-text-muted text-xs mt-2">— Dom</p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-text-muted text-xs">
            &copy; {new Date().getFullYear()} Dominick Pescetto. Built with{" "}
            <Heart className="w-3 h-3 inline text-red-400 fill-red-400" />{" "}
            and Next.js.
          </p>
          <div className="flex items-center gap-4 text-text-muted text-xs">
            <span>All systems operational</span>
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
          </div>
        </div>
      </div>
    </footer>
  );
}
