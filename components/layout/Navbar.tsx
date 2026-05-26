"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Product", href: "/product" },
    { label: "Templates", href: "/templates" },
    { label: "Enterprise", href: "/enterprise" },
    { label: "Security", href: "/security" },
    { label: "Pricing", href: "/pricing" },
  ];

  return (
    <motion.nav initial={{ y: -8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} className={`fixed top-0 left-0 right-0 z-50 h-[58px] flex items-center justify-between px-7 transition-all duration-300 ${scrolled ? "bg-[rgba(10,37,64,0.92)] border-b border-[rgba(255,255,255,0.07)]" : "bg-[rgba(10,37,64,0.75)]"}`} style={{ backdropFilter: "blur(28px)" }}>
      <Link href="/" className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-[10px] flex items-center justify-center text-base" style={{ background: "none, var(--accent-primary))" }}>🌐</div>
        <span className="text-[15px] font-bold" style={{ background: "none)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>OneAtlas</span>
        <span className="badge-accent text-[9px]">BETA</span>
      </Link>

      <div className="hidden lg:flex items-center gap-3">
        {links.map((link) => (
          <Link key={link.href} href={link.href}>
            <span className={`px-3 py-2 text-[13px] font-medium cursor-pointer transition-colors ${pathname === link.href ? "text-accent-light" : "text-text-3 hover:text-text-1"}`}>{link.label}</span>
          </Link>
        ))}
        <div className="relative group px-3 py-2 text-[13px] font-medium text-text-3 hover:text-text-1 cursor-pointer">
          Resources ▾
          <div className="absolute top-full left-0 mt-2 w-48 rounded-xl p-2 hidden group-hover:block" style={{ background: "rgba(26,31,54,0.98)", border: "1px solid rgba(255,255,255,0.07)" }}>
            {[{ label: "Docs", href: "/docs" }, { label: "Blog", href: "/blog" }, { label: "Support", href: "/support" }].map((item) => (
              <Link key={item.href} href={item.href} className="block px-3 py-2 text-xs rounded hover:bg-surface-3 text-text-2">{item.label}</Link>
            ))}
          </div>
        </div>
        <div className="relative group px-3 py-2 text-[13px] font-medium text-text-3 hover:text-text-1 cursor-pointer">
          Community ▾
          <div className="absolute top-full left-0 mt-2 w-56 rounded-xl p-3 hidden group-hover:grid gap-2 grid-cols-3" style={{ background: "rgba(26,31,54,0.98)", border: "1px solid rgba(255,255,255,0.07)" }}>
            {[{ label: "Discord", icon: "💬" }, { label: "LinkedIn", icon: "💼" }, { label: "Twitter", icon: "𝕏" }, { label: "Reddit", icon: "👾" }, { label: "GitHub", icon: "🐙" }].map((item) => (
              <a key={item.label} href="#" className="flex flex-col items-center gap-1 p-2 rounded hover:bg-surface-3 text-xs text-text-2"><span>{item.icon}</span>{item.label}</a>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Link href="/dashboard" className="btn-primary hidden sm:flex text-[13px] px-4 py-2">Start Building →</Link>
        <button className="lg:hidden icon-btn" onClick={() => setMobileOpen(!mobileOpen)}>{mobileOpen ? "✕" : "☰"}</button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <div className="absolute top-full left-0 right-0 lg:hidden" style={{ background: "rgba(26,31,54,0.98)" }}>
            {links.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="block px-7 py-3 text-sm text-text-3 hover:text-text-1">{link.label}</Link>
            ))}
            <Link href="/docs" onClick={() => setMobileOpen(false)} className="block px-7 py-3 text-sm text-text-3 hover:text-text-1">Docs</Link>
            <Link href="/support" onClick={() => setMobileOpen(false)} className="block px-7 py-3 text-sm text-text-3 hover:text-text-1">Support</Link>
          </div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
