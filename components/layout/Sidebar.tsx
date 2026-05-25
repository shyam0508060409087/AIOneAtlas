"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

// ── TYPES ─────────────────────────────────────────────────────────

interface SidebarSection {
  section: string;
  icon?: never;
  label?: never;
  href?: never;
  onClick?: never;
  badge?: never;
}

interface SidebarLink {
  section?: never;
  icon: string;
  label: string;
  href?: string;
  onClick?: () => void;
  badge?: { text: string; variant: "live" | "new" | "building" };
}

type SidebarItem = SidebarSection | SidebarLink;

// ── NAV DATA ──────────────────────────────────────────────────────

const DASHBOARD_ITEMS: SidebarItem[] = [
  { section: "Workspace" },
  { icon: "🏠", label: "Home",             href: "/dashboard" },
  { icon: "🎨", label: "Templates",        href: "/templates",  badge: { text: "NEW",      variant: "new" } },
  { icon: "🗺️", label: "Roadmap",         href: "/roadmap" },
  { section: "My Apps" },
  { icon: "📊", label: "Sales Dashboard",  href: "/workspace",  badge: { text: "Live",     variant: "live" } },
  { icon: "🗂️", label: "Project Tracker", href: "/workspace",  badge: { text: "Live",     variant: "live" } },
  { icon: "🧠", label: "Knowledge Base",   href: "/workspace",  badge: { text: "Building", variant: "building" } },
  { section: "Account" },
  { icon: "⚙️", label: "Settings" },
  { icon: "💳", label: "Billing" },
  { icon: "📖", label: "Docs" },
];

const TEMPLATE_SIDEBAR: SidebarItem[] = [
  { section: "Categories" },
  { icon: "✦",  label: "All Templates",  href: "/templates" },
  { icon: "📊", label: "Analytics",       href: "/templates?cat=Analytics" },
  { icon: "🗂️", label: "Productivity",   href: "/templates?cat=Productivity" },
  { icon: "💳", label: "Finance",         href: "/templates?cat=Finance" },
  { icon: "🏢", label: "SaaS / B2B",      href: "/templates?cat=SaaS" },
  { icon: "👥", label: "HR & Ops",        href: "/templates?cat=HR" },
  { icon: "🤖", label: "AI Apps",         href: "/templates?cat=AI" },
  { icon: "🛒", label: "E-commerce",      href: "/templates?cat=E-com" },
  { section: "Tools" },
  { icon: "☆",  label: "Saved Templates" },
  { icon: "⇄",  label: "Compare Mode" },
];

// ── BADGE STYLES ─────────────────────────────────────────────────

const BADGE_STYLES: Record<"live" | "new" | "building", string> = {
  live:     "bg-[rgba(0,212,177,0.1)]   text-[#00D4B1]  border border-[rgba(0,212,177,0.2)]",
  new:      "bg-[rgba(248,188,66,0.1)]  text-[#F8BC42]  border border-[rgba(248,188,66,0.2)]",
  building: "bg-[rgba(99,91,255,0.1)] text-[#635BFF] border border-[rgba(99,91,255,0.2)]",
};

// ── COMPONENT ────────────────────────────────────────────────────

interface SidebarProps {
  variant?: "dashboard" | "templates" | "workspace";
  newAppClick?: () => void;
}

export default function Sidebar({ variant = "dashboard", newAppClick }: SidebarProps) {
  const pathname = usePathname();
  const items = variant === "templates" ? TEMPLATE_SIDEBAR : DASHBOARD_ITEMS;

  return (
    <aside
      className="sticky top-[58px] h-[calc(100vh-58px)] overflow-y-auto overflow-x-hidden flex flex-col px-2.5 py-3.5"
      style={{ background: "var(--bg1)", borderRight: "1px solid var(--b0)", scrollbarWidth: "none" }}
    >
      {/* Templates header */}
      {variant === "templates" && (
        <div className="px-2.5 pb-3 mb-1">
          <p className="text-[15px] font-bold tracking-tight">Templates</p>
          <p className="text-[11px] mt-0.5" style={{ color: "var(--t4)" }}>120 ready-to-use apps</p>
        </div>
      )}

      {/* New App Button */}
      {variant === "dashboard" && (
        <motion.button
          onClick={newAppClick}
          className="flex items-center gap-2 w-full px-3 py-2.5 mb-3 rounded-lg text-sm font-semibold text-white"
          style={{ background: "var(--v)", boxShadow: "0 2px 14px rgba(99,91,255,0.3)" }}
          whileHover={{ opacity: 0.9, boxShadow: "0 4px 22px rgba(99,91,255,0.45)" }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="text-base">＋</span> New App
        </motion.button>
      )}

      {/* Nav items */}
      {items.map((item, i) => {
        // Section header
        if ("section" in item && item.section) {
          return (
            <p
              key={`section-${i}`}
              className="text-[10px] font-bold tracking-[0.1em] uppercase px-2.5 mt-3 mb-1"
              style={{ color: "var(--t4)" }}
            >
              {item.section}
            </p>
          );
        }

        // Nav link — safe cast since we know icon/label exist here
        const navItem = item as SidebarLink;
        const isActive = navItem.href
          ? pathname === navItem.href || (navItem.href !== "/" && pathname.startsWith(navItem.href.split("?")[0]))
          : false;

        const inner = (
          <motion.div
            className={`flex items-center gap-2 w-full px-2.5 py-[7px] rounded-md text-xs cursor-pointer mb-0.5 transition-colors ${
              isActive ? "text-[#635BFF]" : "text-text-3 hover:text-text-1"
            }`}
            style={isActive ? { background: "rgba(99,91,255,0.09)" } : {}}
            whileTap={{ scale: 0.98 }}
          >
            <span className="text-[15px] w-5 text-center flex-shrink-0">{navItem.icon}</span>
            <span className="flex-1 leading-none">{navItem.label}</span>
            {navItem.badge && (
              <span className={`text-[9px] font-bold px-[7px] py-[2px] rounded-full ${BADGE_STYLES[navItem.badge.variant]}`}>
                {navItem.badge.text}
              </span>
            )}
          </motion.div>
        );

        return navItem.href ? (
          <Link key={`item-${i}`} href={navItem.href}>
            {inner}
          </Link>
        ) : (
          <div key={`item-${i}`} onClick={navItem.onClick}>
            {inner}
          </div>
        );
      })}
    </aside>
  );
}
