"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import PromptInput from "@/components/ai/PromptInput";
import { useToast } from "@/components/ui/Toast";

// ── FEATURES DATA ────────────────────────────
const FEATURES = [
  {
    num: "01 / 05",
    icon: "💬",
    iconBg: "rgba(99,91,255,0.12)",
    title: "Describe. Build. Ship.",
    desc: "Tell OneAtlas your idea in plain English. The AI designs your schema, builds every page, sets up auth, and deploys to Cloudflare's edge — in under 60 seconds.",
    kpi: "🎯 5s to first preview · 60s to deploy",
    span: 12,
    cardClass: "bg-gradient-violet-glow",
    borderColor: "rgba(99,91,255,0.18)",
  },
  {
    num: "02 / 05",
    icon: "⚡",
    iconBg: "rgba(0,212,177,0.1)",
    title: "Edge-native runtime",
    desc: "Cloudflare Workers + Neon DB. Your app runs at the edge, in 300+ cities, from day one.",
    kpi: "🌍 49 regions · 100% uptime",
    span: 4,
  },
  {
    num: "03 / 05",
    icon: "🔐",
    iconBg: "rgba(248,188,66,0.1)",
    title: "Auth in 3 seconds",
    desc: "Email + OAuth built in. No Supabase wiring, no Auth0 config.",
    kpi: "✓ 100% auth success on MVP apps",
    span: 4,
  },
  {
    num: "04 / 05",
    icon: "🧠",
    iconBg: "rgba(0,212,255,0.1)",
    title: "AI that remembers",
    desc: "Workspace-level memory. The AI knows your stack, team, and preferences across every session.",
    kpi: "📍 Context in 80% of sessions",
    span: 4,
  },
  {
    num: "05 / 05",
    icon: "🔮",
    iconBg: "rgba(255,89,150,0.1)",
    title: "Multi-model AI gateway",
    desc: "Claude + GPT-4 + Gemini — automatically routed to the best model for each task.",
    kpi: "⚡ AI latency <3s p90",
    span: 12,
  },
];

const TRENDING = [
  { emoji: "📊", name: "Sales Dashboard",  meta: "2,140 apps built", badge: "Analytics",    badgeClass: "badge-accent" },
  { emoji: "🗂️", name: "Project Tracker", meta: "1,820 apps built", badge: "Productivity", badgeClass: "badge-teal" },
  { emoji: "💳", name: "Invoice Manager",  meta: "1,290 apps built", badge: "Finance",      badgeClass: "badge-amber" },
  { emoji: "🏢", name: "Customer Portal",  meta: "980 apps built",   badge: "SaaS",         badgeClass: "badge-accent" },
  { emoji: "📋", name: "HR Onboarding",    meta: "740 apps built",   badge: "HR",           badgeClass: "badge-rose" },
  { emoji: "🤖", name: "AI Chat App",      meta: "690 apps built",   badge: "AI",           badgeClass: "badge-accent" },
];

const PROOF_AVATARS = [
  { letter: "A", gradient: "linear-gradient(135deg,#635BFF,#7A73FF)" },
  { letter: "B", gradient: "linear-gradient(135deg,#00D4B1,#00D4FF)" },
  { letter: "C", gradient: "linear-gradient(135deg,#FFB17A,#F8BC42)" },
  { letter: "D", gradient: "linear-gradient(135deg,#FF5996,#635BFF)" },
  { letter: "E", gradient: "linear-gradient(135deg,#00D4B1,#00D4FF)" },
];

// ── PAGE ─────────────────────────────────────
export default function HomePage() {
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = (value: string, planMode: boolean) => {
    toast("🚀", planMode ? "Planning your app first..." : "Building your app...");
    setTimeout(() => router.push("/workspace"), 600);
  };

  return (
    <div className="pt-[58px]">

      {/* ═══ HERO ═══ */}
      <section className="min-h-[calc(100vh-58px)] flex flex-col items-center justify-center px-6 pb-16 text-center relative">

        {/* Eyebrow */}
        <motion.button
          className="inline-flex items-center gap-2 mb-7 px-4 py-1.5 rounded-full text-xs font-medium cursor-pointer transition-all"
          style={{
            background: "rgba(99,91,255,0.07)",
            border: "1px solid rgba(99,91,255,0.18)",
            color: "var(--v2)",
          }}
          onClick={() => toast("✨", "4,200+ builders on the waitlist!")}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ background: "rgba(99,91,255,0.12)", borderColor: "rgba(99,91,255,0.28)" }}
        >
          <span
            className="w-[7px] h-[7px] rounded-full bg-accent"
            style={{ boxShadow: "0 0 8px var(--v)", animation: "pulseDot 2s ease-in-out infinite" }}
          />
          Now in Beta — 4,200+ builders on the waitlist ↗
        </motion.button>

        {/* Headline */}
        <motion.h1
          className="font-black tracking-tightest leading-none mb-5"
          style={{ fontSize: "clamp(42px, 6.5vw, 82px)" }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.07, ease: [0.16, 1, 0.3, 1] }}
        >
          Build apps at the<br />
          <span className="gradient-text">speed of thought</span>
        </motion.h1>

        {/* Sub */}
        <motion.p
          className="text-lg max-w-[500px] mb-12 font-normal"
          style={{ color: "var(--t3)", lineHeight: 1.75 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
        >
          OneAtlas turns plain English into fully-functional apps — AI-designed schemas, edge deployment, and built-in auth. From idea to live in 60 seconds.
        </motion.p>

        {/* Prompt Input */}
        <motion.div
          className="w-full max-w-[700px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.21, ease: [0.16, 1, 0.3, 1] }}
        >
          <PromptInput
            placeholder="Build me a sales analytics dashboard with real-time KPIs, AI weekly summaries, and team targets..."
            onSubmit={handleSubmit}
            size="hero"
            showChips
          />
        </motion.div>

        {/* Social Proof */}
        <motion.div
          className="flex items-center gap-3.5 mt-10 text-sm"
          style={{ color: "var(--t4)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.5 }}
        >
          <div className="flex">
            {PROOF_AVATARS.map((a, i) => (
              <div
                key={a.letter}
                className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold border-2"
                style={{
                  background: a.gradient,
                  borderColor: "var(--bg0)",
                  marginLeft: i === 0 ? "0" : "-7px",
                }}
              >
                {a.letter}
              </div>
            ))}
          </div>
          <span style={{ color: "#F8BC42", letterSpacing: "-1px" }}>★★★★★</span>
          <span>Loved by 4,200+ builders worldwide</span>
        </motion.div>

        {/* Scroll indicator */}
        <motion.button
          className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[11px] cursor-pointer"
          style={{ color: "var(--t4)", animation: "float 2.5s ease-in-out infinite" }}
          onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <span>Scroll to explore</span>
          <span className="text-base">↓</span>
        </motion.button>
      </section>

      {/* ═══ FEATURES ═══ */}
      <section id="features" className="max-w-[1140px] mx-auto px-6 py-24">
        <div className="mb-14">
          <div className="flex items-center gap-2 mb-4 text-[11px] font-bold tracking-[0.08em] uppercase text-accent-light">
            <div className="w-6 h-px bg-accent opacity-50" />
            Why OneAtlas
            <div className="w-6 h-px bg-accent opacity-50" />
          </div>
          <h2
            className="font-extrabold tracking-tighter mb-3.5"
            style={{ fontSize: "clamp(30px, 4.5vw, 52px)", lineHeight: 1.1 }}
          >
            Everything your app needs,<br />
            <span className="gradient-text-teal">none of the setup</span>
          </h2>
          <p className="text-lg max-w-[460px]" style={{ color: "var(--t3)", lineHeight: 1.7 }}>
            From idea to deployed, production-ready app — in under 60 seconds.
          </p>
        </div>

        <div className="grid grid-cols-12 gap-3.5">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              className={`col-span-${f.span} md:col-span-${f.span} col-span-12 rounded-2xl p-8 relative overflow-hidden cursor-default`}
              style={{
                background: f.cardClass ? `var(--bg2)` : "var(--bg2)",
                border: `1px solid ${f.borderColor || "var(--b1)"}`,
                ...(f.cardClass && { background: "linear-gradient(135deg, rgba(99,91,255,0.08), var(--bg2))" }),
              }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -3, boxShadow: "0 8px 40px rgba(0,0,0,0.45)" }}
            >
              <p className="text-[10px] font-bold tracking-[0.1em] font-mono mb-4.5" style={{ color: "var(--t4)" }}>
                {f.num}
              </p>
              <div
                className="w-[46px] h-[46px] rounded-xl flex items-center justify-center text-[22px] mb-4.5"
                style={{ background: f.iconBg }}
              >
                {f.icon}
              </div>
              <h3 className="text-lg font-bold tracking-tight mb-2">{f.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--t3)" }}>{f.desc}</p>
              <div
                className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full"
                style={{
                  background: "rgba(0,212,177,0.08)",
                  border: "1px solid rgba(0,212,177,0.15)",
                  color: "#00D4B1",
                }}
              >
                {f.kpi}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══ ATLAS FOR ROLES ═══ */}
      <section className="max-w-[1140px] mx-auto px-6 py-24">
        <div className="mb-14 text-center">
          <h2 className="font-extrabold tracking-tighter mb-3" style={{ fontSize: "clamp(30px, 4.5vw, 52px)" }}>Built for every role</h2>
          <p className="text-lg max-w-[460px] mx-auto" style={{ color: "var(--t3)" }}>Whether you're a founder, operator, or engineer, OneAtlas adapts to your workflow.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[{ role: "Founders", use: "Validate ideas and launch MVPs in 60 seconds without engineering" }, { role: "Product Managers", use: "Build operational dashboards and internal tools instantly" }, { role: "Engineers", use: "Deploy production apps with customizable runtime and APIs" }].map((r) => (
            <div key={r.role} className="rounded-2xl p-8" style={{ background: "var(--bg2)", border: "1px solid var(--b1)" }}>
              <h3 className="font-bold text-lg mb-2">{r.role}</h3>
              <p style={{ color: "var(--t3)" }}>{r.use}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ TRENDING STRIP ═══ */}
      <section className="max-w-[1140px] mx-auto px-6 pb-24">
        <div className="flex items-center justify-between mb-4.5">
          <h3 className="text-[15px] font-bold flex items-center gap-2">🔥 Trending this week</h3>
          <Link href="/templates" className="text-sm text-accent-light hover:text-accent transition-colors">
            Browse all templates →
          </Link>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-1.5 scrollbar-none">
          {TRENDING.map((t, i) => (
            <motion.div
              key={t.name}
              className="flex-shrink-0 w-[200px] rounded-xl p-4 cursor-pointer transition-all duration-200"
              style={{ background: "var(--bg2)", border: "1px solid var(--b1)" }}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -3, boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}
              onClick={() => router.push("/templates")}
            >
              <div
                className="w-[38px] h-[38px] rounded-xl flex items-center justify-center text-[19px] mb-3"
                style={{ background: "rgba(99,91,255,0.08)" }}
              >
                {t.emoji}
              </div>
              <p className="text-sm font-semibold mb-0.5">{t.name}</p>
              <p className="text-[11px] mb-2.5" style={{ color: "var(--t4)" }}>{t.meta}</p>
              <span className={`badge ${t.badgeClass}`}>{t.badge}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="max-w-[1140px] mx-auto px-7 py-10 flex items-center justify-between flex-wrap gap-4" style={{ borderTop: "1px solid var(--b0)" }}>
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-[8px] flex items-center justify-center text-sm" style={{ background: "linear-gradient(135deg,#635BFF,#7A73FF)" }}>🌐</div>
          <span className="text-sm font-bold gradient-text">OneAtlas</span>
        </div>
        <div className="flex gap-6 flex-wrap">
          {["Docs", "Roadmap", "Pricing", "Blog", "Changelog"].map((l) => (
            <Link key={l} href={l === "Roadmap" ? "/roadmap" : "#"} className="text-sm transition-colors hover:text-text-1" style={{ color: "var(--t4)" }}>
              {l}
            </Link>
          ))}
        </div>
        <p className="text-xs" style={{ color: "var(--t4)" }}>© 2026 OneAtlas Inc. · AI-native from day one.</p>
      </footer>
    </div>
  );
}
