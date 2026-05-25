"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const SECURITY_FEATURES = [
  { icon: "🔐", title: "Encryption at Rest & Transit", desc: "AES-256 encryption for all data, TLS 1.3 for all connections." },
  { icon: "🛡️", title: "Zero-Trust Architecture", desc: "All requests verified, no implicit trust, defense in depth." },
  { icon: "📋", title: "Compliance Certifications", desc: "SOC 2 Type II, HIPAA, GDPR, CCPA, and ISO 27001 ready." },
  { icon: "🔍", title: "Security Audits", desc: "Regular third-party penetration tests and security audits." },
  { icon: "🔑", title: "Credential Management", desc: "API keys, OAuth tokens, and secret management built-in." },
  { icon: "📊", title: "Audit & Logging", desc: "Immutable logs for all API calls, data access, and deployments." },
];

const COMPLIANCE = [
  { name: "SOC 2 Type II", status: "Certified", icon: "✓" },
  { name: "HIPAA", status: "Ready", icon: "✓" },
  { name: "GDPR", status: "Compliant", icon: "✓" },
  { name: "CCPA", status: "Compliant", icon: "✓" },
  { name: "ISO 27001", status: "In Progress", icon: "◐" },
];

export default function SecurityPage() {
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
          <span className="badge-accent text-xs mb-5 inline-flex">Security</span>
          <h1
            className="font-black tracking-tightest mb-5"
            style={{ fontSize: "clamp(42px, 5vw, 72px)", lineHeight: 1.1 }}
          >
            Security by default, verified by design.
          </h1>
          <p
            className="text-lg max-w-[640px] mx-auto mb-8"
            style={{ color: "var(--t2)", lineHeight: 1.7 }}
          >
            Built from day one with zero-trust architecture, end-to-end encryption, and compliance standards for regulated industries.
          </p>
          <Link href="/docs" className="btn-primary text-sm px-6 py-2.5 inline-flex">
            Read Security Docs →
          </Link>
        </motion.div>
      </section>

      {/* ── SECURITY FEATURES ── */}
      <section className="max-w-[1140px] mx-auto px-6 py-20">
        <div className="mb-12">
          <h2 className="text-2xl font-bold tracking-tight text-center mb-2">Our Security Stack</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SECURITY_FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              className="rounded-xl p-6"
              style={{ background: "var(--bg2)", border: "1px solid var(--b1)" }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -3, boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}
            >
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className="font-bold mb-2 text-sm">{f.title}</h3>
              <p className="text-xs leading-relaxed" style={{ color: "var(--t3)" }}>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── COMPLIANCE STATUS ── */}
      <section className="max-w-[1140px] mx-auto px-6 pb-20">
        <div className="mb-8">
          <h2 className="text-2xl font-bold tracking-tight text-center">Compliance Status</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {COMPLIANCE.map((c, i) => (
            <motion.div
              key={c.name}
              className="rounded-xl p-6 flex items-center justify-between"
              style={{ background: "var(--bg2)", border: "1px solid var(--b1)" }}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
            >
              <div>
                <p className="font-bold text-sm mb-1">{c.name}</p>
                <p className="text-xs" style={{ color: "var(--t3)" }}>{c.status}</p>
              </div>
              <span
                className="text-2xl"
                style={{ color: c.status === "Certified" || c.status === "Compliant" ? "#00D4B1" : "#F8BC42" }}
              >
                {c.icon}
              </span>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
