"use client";

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
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <a href="/" className="inline-flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#5e6ad2] flex items-center justify-center shadow-lg shadow-[#5e6ad2]/20">
                <span className="text-white text-xs font-bold">DP</span>
              </div>
              <span className="font-medium text-text-primary text-sm tracking-tight">Dominick Pescetto</span>
            </a>
            <p className="text-text-muted text-xs leading-relaxed">
              AI Engineer &amp; CTV Platform Architect building production-grade systems.
            </p>
            <p className="text-text-muted/50 text-[10px] mt-2 font-mono">dominickp.com</p>
          </div>

          {/* Navigate */}
          <div>
            <span className="micro block mb-4">Navigate</span>
            <ul className="space-y-2.5">
              {links.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-text-muted hover:text-text-primary transition-colors text-sm">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <span className="micro block mb-4">Connect</span>
            <ul className="space-y-2.5">
              {socialLinks.map((social) => (
                <li key={social.label}>
                  <a href={social.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-text-muted hover:text-text-primary transition-colors text-sm">
                    <social.icon className="w-3.5 h-3.5" />
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quote */}
          <div className="lg:text-right">
            <div className="glass rounded-xl p-5 text-center border border-border">
              <p className="text-text-muted italic text-sm leading-relaxed">&ldquo;Learning every day.&rdquo;</p>
              <p className="text-text-muted/50 text-[10px] mt-2 font-mono">- Dom</p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-text-muted text-[10px]">
            &copy; {new Date().getFullYear()} Dominick Pescetto. Built with{" "}
            <Heart className="w-2.5 h-2.5 inline text-red-400/70 fill-red-400/70" />{" "}
            and Next.js.
          </p>
          <div className="flex items-center gap-3 text-text-muted text-[10px]">
            <span>All systems operational</span>
            <span className="status-dot green" />
          </div>
        </div>
      </div>
    </footer>
  );
}
