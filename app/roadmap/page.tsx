"use client";

import { motion } from "framer-motion";
import { ROADMAP_ITEMS, PHASE_CONFIG, type RoadmapPhase } from "@/lib/data";

const PHASE_ORDER: RoadmapPhase[] = ["0", "1", "1.5", "2", "3+"];

const PRIORITY_STYLES = {
  P0: { bg: "rgba(255,89,150,0.1)",   color: "var(--rose)", border: "1px solid rgba(255,89,150,0.2)" },
  P1: { bg: "rgba(248,188,66,0.1)",  color: "var(--amber)", border: "1px solid rgba(248,188,66,0.2)" },
  P2: { bg: "rgba(99,91,255,0.1)", color: "var(--v2)", border: "1px solid rgba(99,91,255,0.2)" },
};

const STATUS_STYLES = {
  done:     { bg: "rgba(0,212,177,0.1)",   color: "var(--teal)", text: "✓ Done" },
  building: { bg: "rgba(248,188,66,0.1)",  color: "var(--amber)", text: "⟳ Building" },
  planned:  { bg: "var(--bg4)",            color: "var(--text-muted)", text: "📋 Planned" },
};

export default function RoadmapPage() {
  const grouped = PHASE_ORDER.reduce<Record<RoadmapPhase, typeof ROADMAP_ITEMS>>((acc, phase) => {
    acc[phase] = ROADMAP_ITEMS.filter((item) => item.phase === phase);
    return acc;
  }, {} as Record<RoadmapPhase, typeof ROADMAP_ITEMS>);

  return (
    <div className="pt-[58px] min-h-screen">
      <div className="max-w-[920px] mx-auto px-6 py-14">

        {/* Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.16,1,0.3,1] }}
        >
          <span className="badge-accent text-[10px] mb-4 inline-flex">🗺️ Product Roadmap</span>
          <h1
            className="font-black tracking-tightest mb-3"
            style={{ fontSize: "clamp(30px,4vw,44px)", lineHeight: 1.1 }}
          >
            OneAtlas Build Plan<br />
            <span
              style={{
                background: "linear-gradient(135deg, #fff 0%, var(--v2) 55%, var(--accent-primary) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Phase 0 → Enterprise
            </span>
          </h1>
          <p className="text-md" style={{ color: "var(--text-muted)" }}>
            Fully transparent — see exactly what&apos;s done, in progress, and coming.
          </p>

          {/* Stats row */}
          <div className="flex gap-4 mt-6 flex-wrap">
            {[
              { label: "Done",     count: ROADMAP_ITEMS.filter(r => r.status === "done").length,     color: "var(--teal)" },
              { label: "Building", count: ROADMAP_ITEMS.filter(r => r.status === "building").length, color: "var(--amber)" },
              { label: "Planned",  count: ROADMAP_ITEMS.filter(r => r.status === "planned").length,  color: "var(--text-muted)" },
            ].map(({ label, count, color }) => (
              <div
                key={label}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm"
                style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-color)" }}
              >
                <span className="text-xl font-black" style={{ color }}>{count}</span>
                <span style={{ color: "var(--text-muted)" }}>{label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Phases */}
        {PHASE_ORDER.map((phase, phaseIdx) => {
          const items = grouped[phase];
          if (!items.length) return null;
          const cfg = PHASE_CONFIG[phase];

          return (
            <motion.div
              key={phase}
              className="mb-8"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: phaseIdx * 0.05, ease: [0.16,1,0.3,1] }}
            >
              {/* Phase label */}
              <span className={`${cfg.colorClass} text-[10px] font-bold tracking-[0.07em] uppercase inline-flex items-center gap-2 mb-3`}
                style={{ padding: "5px 13px", borderRadius: "9999px" }}>
                {cfg.icon} {cfg.label}
              </span>

              {/* Items */}
              <div className="flex flex-col gap-2">
                {items.map((item, i) => {
                  const pStyle = PRIORITY_STYLES[item.priority];
                  const sStyle = STATUS_STYLES[item.status];

                  return (
                    <motion.div
                      key={item.id}
                      className="roadmap-item"
                      initial={{ opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.04, ease: [0.16,1,0.3,1] }}
                      whileHover={{ x: 2 }}
                    >
                      {/* Priority */}
                      <span
                        className="text-[9px] font-bold px-2 py-[3px] rounded-full flex-shrink-0 tracking-[0.04em]"
                        style={{ background: pStyle.bg, color: pStyle.color, border: pStyle.border }}
                      >
                        {item.priority}
                      </span>

                      {/* Name */}
                      <span className="text-[13px] font-medium flex-1">{item.name}</span>

                      {/* Status */}
                      <span
                        className="text-[11px] font-semibold px-2.5 py-[3px] rounded-full flex-shrink-0"
                        style={{ background: sStyle.bg, color: sStyle.color }}
                      >
                        {sStyle.text}
                      </span>

                      {/* KPI */}
                      <span
                        className="text-[11px] flex-shrink-0 max-w-[190px] text-right leading-snug hidden lg:block"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {item.kpi}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          );
        })}

        {/* Bottom CTA */}
        <motion.div
          className="mt-12 p-8 rounded-2xl text-center"
          style={{
            background: "linear-gradient(135deg, rgba(99,91,255,0.1), rgba(99,91,255,0.03))",
            border: "1px solid rgba(99,91,255,0.18)",
          }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <h3 className="text-xl font-bold tracking-tight mb-2">Want to influence the roadmap?</h3>
          <p className="text-sm mb-5" style={{ color: "var(--text-muted)" }}>
            Join 4,200+ builders shaping OneAtlas. Feature requests are reviewed weekly.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <motion.button
              className="btn-primary text-sm px-5 py-2.5"
              whileTap={{ scale: 0.97 }}
            >
              Request a feature →
            </motion.button>
            <motion.button
              className="btn-secondary text-sm px-5 py-2.5"
              whileTap={{ scale: 0.97 }}
            >
              Join the community
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
