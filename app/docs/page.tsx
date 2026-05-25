"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const DOC_SECTIONS = [
  { icon: "🚀", title: "Getting Started", desc: "Set up OneAtlas in minutes and deploy your first app." },
  { icon: "📚", title: "API Reference", desc: "Complete API documentation with examples and SDKs." },
  { icon: "🏗️", title: "Architecture", desc: "Deep dive into runtime, templates, and deployment model." },
  { icon: "🔐", title: "Security", desc: "Security practices, encryption, and compliance guidelines." },
  { icon: "🛠️", title: "Advanced", desc: "Custom schemas, webhooks, and runtime customization." },
  { icon: "❓", title: "FAQ", desc: "Common questions and troubleshooting guides." },
];

export default function DocsPage() {
  return (
    <div className="pt-[58px] min-h-screen" style={{ background: "var(--bg0)" }}>
      {/* ── HERO ── */}
      <section className="max-w-[1140px] mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <span className="badge-accent text-xs mb-5 inline-flex">Documentation</span>
          <h1
            className="font-black tracking-tightest mb-5"
            style={{ fontSize: "clamp(42px, 5vw, 72px)", lineHeight: 1.1 }}
          >
            Build with OneAtlas.
          </h1>
          <p
            className="text-lg max-w-[640px] mx-auto mb-8"
            style={{ color: "var(--t2)", lineHeight: 1.7 }}
          >
            Comprehensive guides, API reference, and examples to help you build, deploy, and scale apps on OneAtlas.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <motion.button
              className="btn-primary text-sm px-6 py-2.5"
              whileTap={{ scale: 0.97 }}
            >
              Browse Docs →
            </motion.button>
            <Link href="/support" className="btn-secondary text-sm px-6 py-2.5">
              Get Help
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ── DOC SECTIONS ── */}
      <section className="max-w-[1140px] mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {DOC_SECTIONS.map((section, i) => (
            <motion.div
              key={section.title}
              className="rounded-xl p-6 cursor-pointer"
              style={{ background: "var(--bg2)", border: "1px solid var(--b1)" }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -3, boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}
            >
              <div className="text-3xl mb-3">{section.icon}</div>
              <h3 className="font-bold mb-2 text-sm">{section.title}</h3>
              <p className="text-xs leading-relaxed" style={{ color: "var(--t3)" }}>{section.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
