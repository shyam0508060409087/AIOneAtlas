"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ChatRail from "@/components/ai/ChatRail";
import AIProgressCard from "@/components/ai/AIProgressCard";
import ArtifactCard, { MetricBox, MiniChart } from "@/components/workspace/ArtifactCard";
import { useToast } from "@/components/ui/Toast";

const WS_NAV = {
  Pages:  [["🏠","Overview"],["📈","Revenue"],["👥","Customers"],["🗂️","Pipeline"],["🤖","AI Insights"]],
  Data:   [["🗄️","Database"],["⚡","Workflows"],["🔗","Integrations"]],
  Deploy: [["🚀","Deployment"],["🌐","Custom Domain"],["📊","Analytics"]],
};

const TABS = ["Preview", "Data", "Code", "Settings"];

const EXPLANATION =
  "I structured this as 3 sections (KPI grid, AI summary, pipeline) because your prompt mentioned real-time metrics, summaries, and team targets — each maps to a distinct cognitive layer.";

const PIPELINE = [
  { name: "Acme Corp",      amount: "$24,000", badge: "badge-green",  status: "Closed" },
  { name: "TechFlow Inc",   amount: "$18,500", badge: "badge-amber",  status: "Proposal" },
  { name: "Nova Systems",   amount: "$9,200",  badge: "badge-accent", status: "Discovery" },
];

export default function WorkspacePage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("Preview");
  const [activeNav, setActiveNav] = useState("Overview");

  return (
    <div
      className="pt-[58px] grid h-screen overflow-hidden"
      style={{ gridTemplateColumns: "200px 1fr 285px" }}
    >
      {/* ── LEFT NAV ── */}
      <div
        className="flex flex-col overflow-hidden"
        style={{ background: "var(--bg-secondary)", borderRight: "1px solid var(--border-light)" }}
      >
        <div className="flex items-center justify-between px-3 py-3.5">
          <span className="text-[13px] font-semibold">📊 Sales Dashboard</span>
          <motion.button
            className="w-[26px] h-[26px] rounded-[6px] flex items-center justify-center text-xs"
            style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-color)", color: "var(--text-muted)" }}
            whileHover={{ background: "var(--bg-tertiary)", color: "var(--text-primary)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => toast("⚙️", "App settings coming soon")}
          >
            ⚙
          </motion.button>
        </div>

        <div className="flex-1 overflow-y-auto px-2 pb-4 scrollbar-none">
          {Object.entries(WS_NAV).map(([section, items]) => (
            <div key={section}>
              <p className="text-[9px] font-bold tracking-[0.1em] uppercase px-2.5 py-2 mt-1" style={{ color: "var(--text-muted)" }}>
                {section}
              </p>
              {items.map(([icon, label]) => (
                <motion.button
                  key={label}
                  className={`flex items-center gap-1.5 w-full px-2.5 py-1.5 rounded-md text-xs text-left transition-all mb-0.5 ${activeNav === label ? "text-accent-light" : "text-text-3 hover:text-text-1 hover:bg-surface-3"}`}
                  style={activeNav === label ? { background: "rgba(255,102,0,0.09)" } : {}}
                  onClick={() => setActiveNav(label)}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>{icon}</span> {label}
                </motion.button>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── CANVAS ── */}
      <div className="flex flex-col overflow-hidden" style={{ background: "var(--bg-primary)" }}>

        {/* Canvas Bar */}
        <div
          className="flex items-center justify-between px-[18px] h-[46px] flex-shrink-0"
          style={{ background: "var(--bg-secondary)", borderBottom: "1px solid var(--border-light)" }}
        >
          <div className="flex items-center gap-1.5 text-xs">
            <span style={{ color: "var(--text-muted)" }}>Sales Dashboard</span>
            <span style={{ color: "var(--text-muted)" }}>›</span>
            <span className="font-medium">{activeNav}</span>
          </div>

          <div className="flex gap-0.5 p-[3px] rounded-md" style={{ background: "var(--bg-secondary)" }}>
            {TABS.map((tab) => (
              <button
                key={tab}
                className={`px-3 py-1 rounded-[5px] text-xs transition-all ${activeTab === tab ? "bg-surface-4 text-text-1" : "text-text-4 hover:text-text-2"}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex gap-1.5">
            <motion.button
              className="text-[11px] font-semibold px-3 py-1.5 rounded-md transition-all"
              style={{ background: "var(--bg-secondary)", color: "var(--text-primary)", border: "1px solid var(--border-color)" }}
              whileHover={{ borderColor: "var(--b2)" }}
              whileTap={{ scale: 0.97 }}
              onClick={() => toast("🔗", "Share link copied to clipboard!")}
            >
              Share
            </motion.button>
            <motion.button
              className="text-[11px] font-semibold px-3 py-1.5 rounded-md"
              style={{ background: "var(--accent-primary)", color: "#000" }}
              whileHover={{ opacity: 0.9, y: -1 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => toast("🚀", "Deploying to Cloudflare edge...")}
            >
              ▲ Deploy
            </motion.button>
          </div>
        </div>

        {/* Canvas Content */}
        <div className="flex-1 overflow-y-auto p-[22px] scrollbar-none">

          {/* AI Progress Card */}
          <AIProgressCard
            isComplete
            explanation={EXPLANATION}
            onExplainMore={() => toast("🧠", "Expanded in AI panel")}
          />

          {/* KPI Artifact */}
          <ArtifactCard
            title="📊 KPI Overview"
            badgeText="AI Generated"
            badgeVariant="ai"
            onEdit={() => toast("✏️", "Edit mode activated")}
            onExpand={() => toast("↗", "Opened full view")}
          >
            <div className="grid grid-cols-3 gap-2.5">
              <MetricBox value="$84.2k" label="Monthly Revenue" change="23.4% vs last month" trend="up" variant="green" />
              <MetricBox value="1,240"  label="Active Users"    change="11.2% vs last month" trend="up" variant="violet" />
              <MetricBox value="94.3%"  label="Retention Rate"  change="1.2% vs last month"  trend="down" variant="amber" />
            </div>
            <MiniChart data={[32,48,42,65,55,78,70,88,100]} />
          </ArtifactCard>

          {/* AI Summary Artifact */}
          <ArtifactCard
            title="🤖 AI Weekly Summary"
            badgeText="Live"
            badgeVariant="live"
            onRefresh={() => toast("🔄", "Refreshing AI summary...")}
          >
            <p className="text-[13px] leading-[1.75]" style={{ color: "var(--text-secondary)" }}>
              Revenue is up <strong className="text-text-1">23%</strong> — strongest week of Q2.
              The spike correlates with 3 enterprise deals closed Tuesday (Acme Corp, TechFlow, Nova Systems).
              Retention dipped 1.2% — I&apos;d recommend reviewing the 7-day cohort who signed up after the pricing change on May 18.{" "}
              <button
                className="text-accent-light hover:text-accent transition-colors"
                onClick={() => toast("📊", "Opening cohort analysis...")}
              >
                View cohort →
              </button>
            </p>
          </ArtifactCard>

          {/* Pipeline Artifact */}
          <ArtifactCard
            title="🗂️ Recent Pipeline"
            badgeText="AI Generated"
            badgeVariant="ai"
            onExpand={() => toast("↗", "Opened full view")}
          >
            <div className="flex flex-col gap-2">
              {PIPELINE.map((deal) => (
                <motion.div
                  key={deal.name}
                  className="flex items-center justify-between text-xs px-3 py-2.5 rounded-md"
                  style={{ background: "var(--bg-secondary)" }}
                  whileHover={{ background: "var(--bg-tertiary)" }}
                >
                  <span className="font-medium">{deal.name}</span>
                  <span style={{ color: "var(--text-muted)" }}>{deal.amount}</span>
                  <span className={`badge ${deal.badge}`}>{deal.status}</span>
                </motion.div>
              ))}
            </div>
          </ArtifactCard>
        </div>

        {/* ── BOTTOM STATUS BAR ── */}
        <div className="flex items-center justify-between px-4 text-xs h-10" style={{ background: "var(--bg-secondary)", borderTop: "1px solid var(--border-light)", color: "var(--text-muted)" }}>
          <span>Last modified: 2 hours ago</span>
          <div className="flex items-center gap-3">
            <span>Schema v3</span>
            <div className="w-2 h-2 rounded-full" style={{ background: "var(--accent-primary)", boxShadow: "0 0 6px var(--accent-primary)" }} />
            <span>Connected</span>
          </div>
        </div>
      </div>

      {/* ── CHAT RAIL ── */}
      <ChatRail />
    </div>
  );
}
