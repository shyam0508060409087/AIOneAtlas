"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const SUPPORT_CHANNELS = [
  { icon: "💬", title: "Discord", desc: "Chat with builders and the team in real time.", link: "#" },
  { icon: "📧", title: "Email", desc: "support@oneatlas.dev — we reply within 24 hours.", link: "#" },
  { icon: "📚", title: "Docs", desc: "Search our knowledge base and API reference.", link: "/docs" },
  { icon: "✔️", title: "Status Page", desc: "Check real-time platform status and uptime.", link: "#" },
];

const FAQ_ITEMS = [
  { q: "How long does it take to build an app?", a: "From prompt to live app: under 60 seconds. From idea to production: depends on your testing cycle." },
  { q: "Can I edit a generated app?", a: "Yes. Apps remain fully editable after generation. You can modify schemas, pages, and deploy custom logic." },
  { q: "What happens to my data?", a: "Your app's database lives in Neon PostgreSQL under your account. You own all data and can export anytime." },
  { q: "Can I use OneAtlas for client work?", a: "Yes. Spin up client apps in seconds, modify as needed, and hand over. Full ownership transfer possible." },
  { q: "Is there an API?", a: "Yes. Complete REST API for creating apps, managing schemas, and triggering deployments programmatically." },
  { q: "What are your SLAs?", a: "Starter: 99.5% uptime. Growth: 99.9%. Enterprise: 99.99% with guaranteed response times." },
];

export default function SupportPage() {
  return (
    <div className="pt-[58px] min-h-screen" style={{ background: "var(--bg-primary)" }}>
      {/* ── HERO ── */}
      <section className="max-w-[1140px] mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <span className="badge-accent text-xs mb-5 inline-flex">Support</span>
          <h1
            className="font-black tracking-tightest mb-5"
            style={{ fontSize: "clamp(42px, 5vw, 72px)", lineHeight: 1.1 }}
          >
            We're here to help.
          </h1>
          <p
            className="text-lg max-w-[640px] mx-auto"
            style={{ color: "var(--text-secondary)", lineHeight: 1.7 }}
          >
            Get help through documentation, chat, or email. Our team responds within hours.
          </p>
        </motion.div>
      </section>

      {/* ── SUPPORT CHANNELS ── */}
      <section className="max-w-[1140px] mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SUPPORT_CHANNELS.map((channel, i) => (
            <motion.a
              key={channel.title}
              href={channel.link}
              className="rounded-xl p-8 cursor-pointer block"
              style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-color)" }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -3, boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}
            >
              <div className="text-4xl mb-4">{channel.icon}</div>
              <h3 className="font-bold text-lg mb-2">{channel.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{channel.desc}</p>
            </motion.a>
          ))}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="max-w-[1140px] mx-auto px-6 pb-20">
        <div className="mb-12">
          <h2 className="text-2xl font-bold tracking-tight text-center">Frequently Asked Questions</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {FAQ_ITEMS.map((item, i) => (
            <motion.div
              key={item.q}
              className="rounded-xl p-6"
              style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-color)" }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <h4 className="font-bold mb-2 text-sm">{item.q}</h4>
              <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>{item.a}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
