"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Homelab", href: "/homelab" },
  { label: "AI", href: "/ai" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "glass-strong shadow-lg shadow-black/40" : ""
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <a href="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-[#5e6ad2] flex items-center justify-center shadow-lg shadow-[#5e6ad2]/20">
                <span className="text-white text-xs font-bold tracking-tight">DP</span>
              </div>
              <span className="text-text-primary font-medium text-sm tracking-tight group-hover:text-accent-hover transition-colors hidden sm:block">
                Dominick Pescetto
              </span>
            </a>

            <div className="hidden md:flex items-center gap-0.5">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="px-3.5 py-2 text-text-subtle hover:text-text-primary rounded-lg hover:bg-surface transition-all text-sm font-medium tracking-tight"
                >
                  {item.label}
                </a>
              ))}
            </div>

            <div className="hidden md:block">
              <a href="/contact" className="btn-power !py-2 !px-5 text-xs">
                Hire Me
              </a>
            </div>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-text-subtle hover:text-text-primary"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <Menu className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div className="absolute inset-0 bg-canvas/80 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] as const }}
              className="relative glass-strong m-3 rounded-2xl p-5 border border-border"
            >
              <nav className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="px-4 py-3 text-text-subtle hover:text-text-primary hover:bg-surface rounded-xl transition-all text-sm font-medium"
                  >
                    {item.label}
                  </a>
                ))}
                <a
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="btn-power mt-3 justify-center"
                >
                  Hire Me
                </a>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
