"use client";

import { motion } from "framer-motion";

const BLOG_POSTS = [
  { date: "May 24, 2026", title: "Introducing OneAtlas: Apps from Plain English", desc: "We're excited to announce OneAtlas in beta. Build full apps from natural language in 60 seconds." },
  { date: "May 20, 2026", title: "How AI Schema Design Works", desc: "Deep dive into how OneAtlas parses prompts and generates production-ready database schemas." },
  { date: "May 15, 2026", title: "Edge Deployment at Scale", desc: "Running 1,000+ apps on Cloudflare Workers: lessons learned and performance insights." },
  { date: "May 10, 2026", title: "Security First: SOC 2 Certification", desc: "How we achieved SOC 2 Type II compliance from day one—architecture and practices." },
  { date: "May 5, 2026", title: "Template-First Development", desc: "Why we chose templates as the core abstraction for OneAtlas and how it drives consistency." },
  { date: "April 30, 2026", title: "Multi-Model AI Gateway", desc: "Automatically routing prompts to Claude, GPT-4, and Gemini for optimal performance." },
];

export default function BlogPage() {
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
          <span className="badge-accent text-xs mb-5 inline-flex">Blog</span>
          <h1
            className="font-black tracking-tightest mb-5"
            style={{ fontSize: "clamp(42px, 5vw, 72px)", lineHeight: 1.1 }}
          >
            OneAtlas updates and insights.
          </h1>
          <p
            className="text-lg max-w-[640px] mx-auto"
            style={{ color: "var(--text-secondary)", lineHeight: 1.7 }}
          >
            Product releases, technical deep dives, and stories from builders on OneAtlas.
          </p>
        </motion.div>
      </section>

      {/* ── BLOG POSTS ── */}
      <section className="max-w-[900px] mx-auto px-6 pb-20">
        <div className="space-y-4">
          {BLOG_POSTS.map((post, i) => (
            <motion.div
              key={post.title}
              className="rounded-xl p-6 cursor-pointer"
              style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-color)" }}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ x: 4 }}
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <p className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>{post.date}</p>
              </div>
              <h3 className="font-bold text-lg mb-2">{post.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{post.desc}</p>
              <p className="text-xs mt-4 text-accent-light">Read more →</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
