"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const PRODUCT_SURFACES = [
  {
    label: "Homepage",
    title: "Convert the idea",
    detail: "Clear product promise, prompt-first entry, trust markers, and template discovery.",
    status: "Ready",
  },
  {
    label: "Templates",
    title: "Start from real use cases",
    detail: "Search, categories, featured collections, previews, compare flow, and saved actions.",
    status: "Ready",
  },
  {
    label: "Product Pages",
    title: "Explain the platform",
    detail: "This page maps the OneAtlas product surface, builder flow, runtime, and deployment model.",
    status: "Ready",
  },
  {
    label: "Builder Shell",
    title: "Create and refine apps",
    detail: "Workspace canvas, app navigation, AI progress, assistant rail, deploy and share controls.",
    status: "Ready",
  },
];

const PLATFORM_MODULES = [
  ["Prompt", "Natural-language app brief with planning mode"],
  ["Schema", "AI-designed data model and app structure"],
  ["Pages", "Generated dashboards, portals, trackers, and workflows"],
  ["Runtime", "Edge-ready frontend shell prepared for deployment"],
];

export default function ProductPage() {
  return (
    <div className="pt-[58px] min-h-screen" style={{ background: "var(--bg-primary)" }}>
      <section className="max-w-[1140px] mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-8 items-start"
        >
          <div>
            <span className="badge-accent text-[10px] mb-5 inline-flex">
              OneAtlas Product
            </span>
            <h1
              className="font-black tracking-tightest mb-5"
              style={{ fontSize: "clamp(38px, 5vw, 68px)", lineHeight: 1.02 }}
            >
              The frontend surface for building apps from plain English.
            </h1>
            <p className="text-md max-w-[560px]" style={{ color: "var(--text-secondary)", lineHeight: 1.75 }}>
              OneAtlas brings the core product journey into one frontend: explain the product,
              browse templates, generate an app shell, and review the AI builder workspace.
            </p>

            <div className="flex gap-2.5 flex-wrap mt-7">
              <Link href="/dashboard" className="btn-primary text-sm px-5 py-2.5">
                Open Builder →
              </Link>
              <Link href="/templates" className="btn-secondary text-sm px-5 py-2.5">
                Browse Templates
              </Link>
            </div>
          </div>

          <div className="rounded-2xl p-5" style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-color)" }}>
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-bold">Platform Flow</p>
              <span className="badge-teal text-[9px]">Mapped</span>
            </div>
            <div className="space-y-3">
              {PLATFORM_MODULES.map(([label, detail], index) => (
                <div
                  key={label}
                  className="flex gap-3 rounded-xl p-3"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid var(--border-color)" }}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
                    style={{
                      background:
                        index === 0
                          ? "var(--accent-primary)"
                          : index === 1
                            ? "var(--teal)"
                            : index === 2
                              ? "var(--orange)"
                              : "var(--sky)",
                      color: index === 2 ? "#0A2540" : "#fff",
                    }}
                  >
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{label}</p>
                    <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      <section className="max-w-[1140px] mx-auto px-6 pb-20">
        <div className="mb-5">
          <p className="text-[11px] font-bold tracking-[0.08em] uppercase text-accent-light mb-2">
            Required Surfaces
          </p>
          <h2 className="text-2xl font-extrabold tracking-tight">Every page maps to a product surface</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PRODUCT_SURFACES.map((item, index) => (
            <motion.div
              key={item.label}
              className="rounded-xl p-5"
              style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-color)" }}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -3, boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}
            >
              <div className="flex items-center justify-between gap-3 mb-4">
                <p className="text-[11px] font-bold tracking-[0.08em] uppercase" style={{ color: "var(--text-muted)" }}>
                  {item.label}
                </p>
                <span className="badge-green text-[9px]">{item.status}</span>
              </div>
              <h3 className="text-lg font-bold tracking-tight mb-2">{item.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{item.detail}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
