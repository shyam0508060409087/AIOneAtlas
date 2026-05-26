"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Sidebar from "@/components/layout/Sidebar";
import PromptInput from "@/components/ai/PromptInput";
import { useToast } from "@/components/ui/Toast";
import { USER_APPS, TEMPLATES, type UserApp } from "@/lib/data";

// ── STATUS BADGE ─────────────────────────────────────────────────

function AppStatusBadge({ status }: { status: string }) {
  const map: Record<string, { text: string; cls: string }> = {
    live:     { text: "● Live",     cls: "bg-[rgba(0,212,177,0.1)] text-[var(--teal)] border border-[rgba(0,212,177,0.2)]" },
    building: { text: "◎ Building", cls: "bg-[rgba(99,91,255,0.1)] text-[var(--v)] border border-[rgba(99,91,255,0.2)]" },
    draft:    { text: "Draft",      cls: "bg-[rgba(26,31,54,0.8)] text-text-3 border border-[rgba(255,255,255,0.12)]" },
  };
  const cfg = map[status] ?? { text: status, cls: "" };
  return (
    <span className={`text-[10px] font-semibold px-[9px] py-[3px] rounded-full ${cfg.cls}`}>
      {cfg.text}
    </span>
  );
}

// ── ACCENT GLOW MAP ───────────────────────────────────────────────

const ACCENT_GLOWS: Record<UserApp["accentVariant"], string> = {
  teal:   "rgba(0,212,177,0.05)",
  violet: "rgba(99,91,255,0.07)",
  amber:  "rgba(248,188,66,0.05)",
  rose:   "rgba(255,89,150,0.05)",
};

const ACCENT_ICON_BG: Record<UserApp["accentVariant"], string> = {
  teal:   "rgba(0,212,177,0.12)",
  violet: "rgba(99,91,255,0.12)",
  amber:  "rgba(248,188,66,0.12)",
  rose:   "rgba(255,89,150,0.12)",
};

// ── CONTEXT BAR DATA ──────────────────────────────────────────────

interface ContextItem {
  icon?: string;
  label: string;
  strong?: string;
}

const CONTEXT_ITEMS: ContextItem[] = [
  { icon: "👤", label: "Shyam S." },
  { label: "·" },
  { label: "Workspace:", strong: "My Org" },
  { label: "·" },
  { label: "3 apps ·", strong: "2 live" },
  { label: "·" },
  { label: "Session:", strong: "#8 this month" },
  { label: "·" },
  { label: "Stack:", strong: "Next.js · Neon · Cloudflare" },
];

// ── PAGE ─────────────────────────────────────────────────────────

export default function DashboardPage() {
  const router = useRouter();
  const { toast } = useToast();

  const handlePrompt = (_value: string, planMode: boolean) => {
    toast("✨", planMode ? "Planning your app..." : "Building your app...");
    setTimeout(() => router.push("/workspace"), 600);
  };

  const trending = TEMPLATES.slice(0, 4);

  return (
    <div className="pt-[58px] grid grid-cols-[228px_1fr] min-h-screen">
      <Sidebar
        variant="dashboard"
        newAppClick={() => {
          router.push("/workspace");
          toast("✨", "New workspace ready!");
        }}
      />

      <div style={{ background: "var(--bg0)" }}>

        {/* ── CONTEXT BAR ── */}
        <div
          className="flex items-center gap-3 px-7 overflow-x-auto scrollbar-none"
          style={{
            height: "40px",
            background: "var(--bg1)",
            borderBottom: "1px solid var(--b0)",
            fontSize: "12px",
          }}
        >
          {CONTEXT_ITEMS.map((item, i) => (
            <span
              key={i}
              className="flex items-center gap-1.5 flex-shrink-0"
              style={{ color: "var(--t4)" }}
            >
              {item.icon && <span>{item.icon}</span>}
              <span style={{ color: "var(--t3)" }}>{item.label}</span>
              {item.strong && (
                <strong style={{ color: "var(--t2)", fontWeight: 500 }}>
                  {item.strong}
                </strong>
              )}
            </span>
          ))}

          {/* AI status pill */}
          <div
            className="ml-auto flex items-center gap-1.5 text-[11px] flex-shrink-0"
            style={{ color: "var(--teal)" }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full inline-block"
              style={{
                background: "var(--teal)",
                boxShadow: "0 0 6px var(--teal)",
                animation: "pulseDot 2s ease-in-out infinite",
              }}
            />
            AI context loaded
          </div>
        </div>

        {/* ── MAIN CONTENT ── */}
        <div className="px-8 py-8 pb-16">

          {/* Greeting */}
          <motion.div
            className="mb-5"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-2xl font-bold tracking-tight mb-1.5">
              Good morning, Shyam 👋
            </h2>
            <p className="text-sm" style={{ color: "var(--t3)" }}>
              2 apps live · 1 building · What are we building today?
            </p>
          </motion.div>

          {/* Inline Prompt */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.07, ease: [0.16, 1, 0.3, 1] }}
          >
            <PromptInput
              placeholder="Describe your next app — or say 'add a payments page to Sales Dashboard'..."
              onSubmit={handlePrompt}
              size="inline"
              showChips={false}
            />
          </motion.div>

          {/* ── YOUR APPS ── */}
          <div className="flex items-center justify-between mb-3.5">
            <h3 className="text-sm font-bold flex items-center gap-2">
              📱 Your Apps
              <span
                className="text-[9px] font-bold px-2 py-[2px] rounded-full"
                style={{
                  background: "rgba(99,91,255,0.12)",
                  color: "var(--v2)",
                  border: "1px solid rgba(99,91,255,0.2)",
                }}
              >
                3
              </span>
            </h3>
            <button
              className="text-xs transition-colors"
              style={{ color: "var(--v2)" }}
              onClick={() => router.push("/workspace")}
            >
              Manage all →
            </button>
          </div>

          <div className="grid gap-3.5 mb-8" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(225px, 1fr))" }}>
            {USER_APPS.map((app, i) => (
              <motion.div
                key={app.id}
                className="relative rounded-xl p-[18px] cursor-pointer overflow-hidden"
                style={{ background: "var(--bg2)", border: "1px solid var(--b1)" }}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.14 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{
                  y: -3,
                  boxShadow: "0 8px 40px rgba(0,0,0,0.45)",
                }}
                onClick={() => router.push("/workspace")}
              >
                {/* Accent glow overlay */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `linear-gradient(135deg, ${ACCENT_GLOWS[app.accentVariant]}, transparent 60%)`,
                  }}
                />

                <div className="flex items-start justify-between mb-3 relative">
                  <div
                    className="w-[38px] h-[38px] rounded-xl flex items-center justify-center text-[19px]"
                    style={{ background: ACCENT_ICON_BG[app.accentVariant] }}
                  >
                    {app.emoji}
                  </div>
                  <AppStatusBadge status={app.status} />
                </div>

                <p className="text-sm font-semibold mb-1 relative">{app.name}</p>
                <p className="text-xs mb-3.5 leading-snug relative" style={{ color: "var(--t3)" }}>
                  {app.description}
                </p>
                <div
                  className="flex items-center justify-between text-[11px] relative"
                  style={{ color: "var(--t4)" }}
                >
                  <span>{app.updatedAt}</span>
                  <span>{app.userCount !== null ? `${app.userCount} users` : "—"}</span>
                </div>
              </motion.div>
            ))}

            {/* New App Card */}
            <motion.div
              className="rounded-xl cursor-pointer flex flex-col items-center justify-center min-h-[152px] gap-2"
              style={{ border: "1px dashed rgba(99,91,255,0.18)" }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{
                borderColor: "rgba(99,91,255,0.4)",
                backgroundColor: "rgba(99,91,255,0.04)",
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                router.push("/workspace");
                toast("✨", "New workspace opened!");
              }}
            >
              <span className="text-2xl" style={{ color: "var(--t4)" }}>＋</span>
              <span className="text-xs font-medium" style={{ color: "var(--t4)" }}>New App</span>
            </motion.div>
          </div>

          {/* ── TRENDING TEMPLATES ── */}
          <div className="flex items-center justify-between mb-3.5">
            <h3 className="text-sm font-bold">🔥 Trending Templates</h3>
            <button
              className="text-xs transition-colors"
              style={{ color: "var(--v2)" }}
              onClick={() => router.push("/templates")}
            >
              Browse all →
            </button>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
            {trending.map((t) => (
              <motion.div
                key={t.id}
                className="flex-shrink-0 w-[200px] rounded-xl p-4 cursor-pointer"
                style={{ background: "var(--bg2)", border: "1px solid var(--b1)" }}
                whileHover={{ y: -3, boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}
                onClick={() => router.push("/templates")}
              >
                <div
                  className="w-[38px] h-[38px] rounded-xl flex items-center justify-center text-[19px] mb-3"
                  style={{ background: t.bgColor }}
                >
                  {t.emoji}
                </div>
                <p className="text-sm font-semibold mb-0.5">{t.name}</p>
                <p className="text-[11px] mb-2.5" style={{ color: "var(--t4)" }}>
                  {t.usersBuilt} apps built
                </p>
                <span
                  className="text-[10px] font-semibold px-2.5 py-[3px] rounded-full"
                  style={{
                    background: "rgba(99,91,255,0.1)",
                    color: "var(--v2)",
                    border: "1px solid rgba(99,91,255,0.2)",
                  }}
                >
                  {t.tags[0]}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
