"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "Home",       href: "/" },
  { label: "Dashboard",  href: "/dashboard" },
  { label: "Templates",  href: "/templates" },
  { label: "Workspace",  href: "/workspace" },
  { label: "Roadmap",    href: "/roadmap" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -8, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={`
        fixed top-0 left-0 right-0 z-50 h-[58px]
        flex items-center justify-between px-7
        transition-all duration-300
        ${scrolled
          ? "bg-[rgba(10,37,64,0.92)] border-b border-[rgba(255,255,255,0.07)]"
          : "bg-[rgba(10,37,64,0.75)] border-b border-[rgba(255,255,255,0.04)]"
        }
      `}
      style={{ backdropFilter: "blur(28px) saturate(1.8)" }}
    >
      {/* ── LOGO ── */}
      <Link href="/" className="flex items-center gap-2.5 select-none group">
        <motion.div
          className="w-8 h-8 rounded-[10px] flex items-center justify-center text-base"
          style={{
            background: "linear-gradient(135deg, #635BFF, #7A73FF)",
            boxShadow: "0 0 20px rgba(99,91,255,0.25)",
          }}
          whileHover={{ scale: 1.08, boxShadow: "0 0 30px rgba(99,91,255,0.4)" }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
        >
          🌐
        </motion.div>
        <span
          className="text-[15px] font-bold tracking-[-0.03em]"
          style={{
            background: "linear-gradient(90deg, #fff, #7A73FF)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          OneAtlas
        </span>
        <span className="badge-accent text-[9px] font-bold tracking-wider">BETA</span>
      </Link>

      {/* ── CENTER TABS ── */}
      <div
        className="hidden md:flex items-center gap-0.5 rounded-full px-1 py-1"
        style={{
          background: "rgba(26,31,54,0.7)",
          border: "1px solid rgba(255,255,255,0.07)",
          backdropFilter: "blur(12px)",
        }}
      >
        {NAV_LINKS.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link key={link.href} href={link.href}>
              <motion.span
                className={`
                  relative px-4 py-[5px] rounded-full text-[13px] font-medium cursor-pointer
                  transition-colors duration-150
                  ${isActive ? "text-text-1" : "text-text-3 hover:text-text-2"}
                `}
                whileTap={{ scale: 0.97 }}
              >
                {isActive && (
                  <motion.span
                    layoutId="navPill"
                    className="absolute inset-0 rounded-full bg-surface-4 shadow-sm"
                    style={{ zIndex: -1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 35 }}
                  />
                )}
                {link.label}
              </motion.span>
            </Link>
          );
        })}
      </div>

      {/* ── RIGHT ACTIONS ── */}
      <div className="flex items-center gap-2">
        <motion.button
          className="btn-ghost hidden sm:flex text-[13px] px-4 py-[7px]"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.97 }}
        >
          Sign in
        </motion.button>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
          <Link
            href="/dashboard"
            className="btn-primary flex items-center gap-1.5 text-[13px] px-4 py-[7px] rounded-lg"
          >
            Start Building
            <span className="text-[15px] leading-none">→</span>
          </Link>
        </motion.div>

        <motion.div
          className="w-[33px] h-[33px] rounded-full flex items-center justify-center text-xs font-bold cursor-pointer"
          style={{
            background: "linear-gradient(135deg, #635BFF, #00D4B1)",
            border: "2px solid rgba(99,91,255,0.3)",
          }}
          whileHover={{ scale: 1.05, borderColor: "rgba(99,91,255,0.5)" }}
          whileTap={{ scale: 0.95 }}
        >
          S
        </motion.div>

        {/* Mobile burger */}
        <button
          className="md:hidden icon-btn ml-1"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* ── MOBILE MENU ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 md:hidden"
            style={{
              background: "rgba(26,31,54,0.98)",
              borderBottom: "1px solid rgba(255,255,255,0.07)",
              backdropFilter: "blur(20px)",
            }}
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`
                  block px-7 py-3 text-sm transition-colors duration-150
                  ${pathname === link.href ? "text-accent-light" : "text-text-3 hover:text-text-1"}
                `}
              >
                {link.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
