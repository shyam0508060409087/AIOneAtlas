"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const ENTERPRISE_FEATURES = [
  { icon: "🔐", title: "SOC 2 Compliance", desc: "Type II certified, HIPAA ready, SOC 2 audited infrastructure." },
  { icon: "👥", title: "Advanced RBAC", desc: "Team roles, workspace hierarchies, and granular permission controls." },
  { icon: "🔑", title: "SSO & SAML", desc: "OAuth, SAML 2.0, and enterprise directory integration." },
  { icon: "📊", title: "Audit Logs", desc: "Complete activity trails, compliance reports, and data governance." },
  { icon: "🛡️", title: "Data Residency", desc: "Deployment in specific regions with dedicated infrastructure." },
  { icon: "💼", title: "Dedicated Support", desc: "24/7 enterprise support, SLA guarantees, and CSM." },
];

const TIER_COMPARISON = [
  ["Feature", "Startup", "Growth", "Enterprise"],
  ["Apps", "Unlimited", "Unlimited", "Unlimited"],
  ["Users", "10", "100", "Unlimited"],
  ["RBAC", "Basic", "Advanced", "Full + Custom"],
  ["SSO/SAML", "—", "—", "✓"],
  ["Audit Logs", "—", "7 days", "Unlimited"],
  ["SLA", "99.5%", "99.9%", "99.99%"],
  ["Support", "Community", "Email", "24/7 + CSM"],
];

export default function EnterprisePage() {
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
          <span className="badge-accent text-xs mb-5 inline-flex">Enterprise</span>
          <h1
            className="font-black tracking-tightest mb-5"
            style={{ fontSize: "clamp(42px, 5vw, 72px)", lineHeight: 1.1 }}
          >
            Build with enterprise-grade security.
          </h1>
          <p
            className="text-lg max-w-[640px] mx-auto mb-8"
            style={{ color: "var(--text-secondary)", lineHeight: 1.7 }}
          >
            SOC 2 certified infrastructure, SAML SSO, advanced audit logs, and dedicated support for teams building mission-critical apps.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <motion.button
              className="btn-primary text-sm px-6 py-2.5"
              whileTap={{ scale: 0.97 }}
            >
              Request Demo →
            </motion.button>
            <Link href="/contact" className="btn-secondary text-sm px-6 py-2.5">
              Contact Sales
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ── FEATURES GRID ── */}
      <section className="max-w-[1140px] mx-auto px-6 pb-20">
        <div className="mb-12">
          <h2 className="text-2xl font-bold tracking-tight text-center mb-2">Enterprise Features</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ENTERPRISE_FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              className="rounded-xl p-6"
              style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-color)" }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -3, boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}
            >
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className="font-bold mb-2 text-sm">{f.title}</h3>
              <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── PRICING COMPARISON ── */}
      <section className="max-w-[1140px] mx-auto px-6 pb-20">
        <div className="mb-8">
          <h2 className="text-2xl font-bold tracking-tight text-center">Enterprise vs Other Tiers</h2>
        </div>
        <div className="overflow-x-auto rounded-xl border" style={{ borderColor: "var(--border-color)" }}>
          <table className="w-full text-sm">
            <tbody>
              {TIER_COMPARISON.map((row, i) => (
                <tr
                  key={i}
                  style={{
                    borderBottom: i < TIER_COMPARISON.length - 1 ? "1px solid var(--border-color)" : "none",
                    background: i === 0 ? "var(--bg-secondary)" : "transparent",
                  }}
                >
                  {row.map((cell, j) => (
                    <td
                      key={j}
                      className="px-6 py-4 font-medium"
                      style={{
                        textAlign: j === 0 ? "left" : "center",
                        color: i === 0 ? "var(--text-primary)" : "var(--text-secondary)",
                        background: j === 3 && i > 0 ? "rgba(255,102,0,0.08)" : "transparent",
                      }}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
