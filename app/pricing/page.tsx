"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const PRICING_TIERS = [
  {
    name: "Starter",
    price: "Free",
    desc: "Build and learn",
    features: ["3 apps", "10 users", "Community support", "Deploy to Cloudflare", "Unlimited API calls"],
    cta: "Get Started",
    variant: "secondary",
  },
  {
    name: "Growth",
    price: "$99",
    period: "/month",
    desc: "For small teams",
    highlighted: true,
    features: ["50 apps", "100 users", "Email support", "Advanced RBAC", "Audit logs (7 days)", "Custom domains", "Webhook endpoints"],
    cta: "Start Free Trial",
    variant: "primary",
  },
  {
    name: "Enterprise",
    price: "Custom",
    desc: "For mission-critical apps",
    features: ["Unlimited apps", "Unlimited users", "24/7 priority support", "SOC 2 + HIPAA", "SAML SSO", "Unlimited audit logs", "Dedicated infrastructure"],
    cta: "Contact Sales",
    variant: "secondary",
  },
];

export default function PricingPage() {
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
          <span className="badge-accent text-xs mb-5 inline-flex">Pricing</span>
          <h1
            className="font-black tracking-tightest mb-5"
            style={{ fontSize: "clamp(42px, 5vw, 72px)", lineHeight: 1.1 }}
          >
            Simple, transparent pricing.
          </h1>
          <p
            className="text-lg max-w-[640px] mx-auto"
            style={{ color: "var(--t2)", lineHeight: 1.7 }}
          >
            Pay only for what you use. No hidden fees. Cancel anytime.
          </p>
        </motion.div>
      </section>

      {/* ── PRICING CARDS ── */}
      <section className="max-w-[1280px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PRICING_TIERS.map((tier, i) => (
            <motion.div
              key={tier.name}
              className="rounded-2xl p-8 relative overflow-hidden"
              style={{
                background: tier.highlighted ? "linear-gradient(135deg, rgba(99,91,255,0.1), var(--bg2))" : "var(--bg2)",
                border: tier.highlighted ? "2px solid rgba(99,91,255,0.3)" : "1px solid var(--b1)",
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4, boxShadow: "0 12px 48px rgba(0,0,0,0.3)" }}
            >
              {tier.highlighted && (
                <div
                  className="absolute top-0 right-0 px-3 py-1 text-xs font-bold rounded-bl-lg"
                  style={{ background: "rgba(99,91,255,0.2)", color: "#7A73FF" }}
                >
                  Most Popular
                </div>
              )}

              <h3 className="font-bold text-xl mb-2">{tier.name}</h3>
              <p className="text-sm mb-6" style={{ color: "var(--t3)" }}>{tier.desc}</p>

              <div className="mb-6">
                <span className="font-black" style={{ fontSize: "42px" }}>
                  {tier.price}
                </span>
                {tier.period && <span style={{ color: "var(--t4)" }}>{tier.period}</span>}
              </div>

              <motion.button
                className={`btn-${tier.variant} w-full text-sm px-4 py-2.5 mb-8`}
                whileTap={{ scale: 0.98 }}
              >
                {tier.cta}
              </motion.button>

              <div className="space-y-3">
                {tier.features.map((f) => (
                  <div key={f} className="flex items-start gap-2.5 text-sm">
                    <span style={{ color: "#00D4B1" }}>✓</span>
                    <span style={{ color: "var(--t2)" }}>{f}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="max-w-[1140px] mx-auto px-6 pb-20">
        <div className="mb-12">
          <h2 className="text-2xl font-bold tracking-tight text-center">Frequently Asked Questions</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { q: "Can I change plans anytime?", a: "Yes, upgrade or downgrade at any time. Changes take effect on your next billing cycle." },
            { q: "Is there a free trial?", a: "Yes, Growth and Enterprise tiers include a 14-day free trial. No credit card required." },
            { q: "What payment methods do you accept?", a: "We accept all major credit cards, bank transfers, and purchase orders for Enterprise." },
            { q: "Do you offer discounts for annual billing?", a: "Yes, annual plans get 20% off. Contact sales for Enterprise volume discounts." },
          ].map((item, i) => (
            <motion.div
              key={item.q}
              className="rounded-xl p-6"
              style={{ background: "var(--bg2)", border: "1px solid var(--b1)" }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <h4 className="font-bold mb-2 text-sm">{item.q}</h4>
              <p className="text-xs leading-relaxed" style={{ color: "var(--t3)" }}>{item.a}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
