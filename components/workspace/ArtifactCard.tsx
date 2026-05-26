"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface ArtifactCardProps {
  title: string;
  badgeText?: string;
  badgeVariant?: "ai" | "live";
  children: ReactNode;
  onEdit?: () => void;
  onExpand?: () => void;
  onRefresh?: () => void;
}

export default function ArtifactCard({
  title,
  badgeText,
  badgeVariant = "ai",
  children,
  onEdit,
  onExpand,
  onRefresh,
}: ArtifactCardProps) {
  const badgeStyle =
    badgeVariant === "live"
      ? { bg: "rgba(0,212,177,0.1)", color: "var(--teal)", border: "1px solid rgba(0,212,177,0.2)" }
      : { bg: "rgba(99,91,255,0.1)", color: "#7A73FF", border: "1px solid rgba(99,91,255,0.2)" };

  return (
    <motion.div
      className="artcard mb-4 overflow-hidden rounded-xl"
      style={{
        background: "var(--bg2)",
        border: "1px solid var(--b1)",
      }}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-3.5"
        style={{ borderBottom: "1px solid var(--b0)" }}
      >
        <div className="flex items-center gap-2 text-[13px] font-semibold">
          {title}
          {badgeText && (
            <span
              className="text-[9px] font-bold tracking-[0.05em] px-2 py-[2px] rounded-full uppercase"
              style={badgeStyle}
            >
              {badgeText}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5">
          {onRefresh && (
            <motion.button
              className="icon-btn text-xs"
              onClick={onRefresh}
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.4 }}
            >
              ↺
            </motion.button>
          )}
          {onEdit && (
            <motion.button className="icon-btn text-xs" onClick={onEdit} whileTap={{ scale: 0.95 }}>
              ✏
            </motion.button>
          )}
          {onExpand && (
            <motion.button className="icon-btn text-xs" onClick={onExpand} whileTap={{ scale: 0.95 }}>
              ↗
            </motion.button>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="p-4">{children}</div>
    </motion.div>
  );
}

// ── METRIC BOX ──────────────────────────────────

interface MetricBoxProps {
  value: string;
  label: string;
  change: string;
  trend: "up" | "down";
  variant: "green" | "violet" | "amber";
}

export function MetricBox({ value, label, change, trend, variant }: MetricBoxProps) {
  const colors = {
    green:  "var(--teal)",
    violet: "#7A73FF",
    amber:  "#F8BC42",
  };

  return (
    <div className={`metric-box metric-box-${variant}`}>
      <div
        className="text-2xl font-black tracking-tighter mb-0.5"
        style={{ color: colors[variant] }}
      >
        {value}
      </div>
      <div className="text-[11px]" style={{ color: "var(--t4)" }}>{label}</div>
      <div
        className="text-[10px] mt-[5px] flex items-center gap-[3px] font-medium"
        style={{ color: trend === "up" ? "var(--teal)" : "var(--rose)" }}
      >
        {trend === "up" ? "↑" : "↓"} {change}
      </div>
    </div>
  );
}

// ── MINI CHART ──────────────────────────────────

interface MiniChartProps {
  data: number[]; // 0-100 percentages
}

export function MiniChart({ data }: MiniChartProps) {
  const max = Math.max(...data);

  return (
    <div className="flex items-end gap-[3px] h-[60px] mt-3.5 px-0.5">
      {data.map((val, i) => {
        const height = `${(val / max) * 100}%`;
        const opacity = 0.28 + (i / data.length) * 0.72;
        const isLast = i === data.length - 1;

        return (
          <motion.div
            key={i}
            className="chart-bar"
            style={{
              height,
              background: isLast ? "var(--v)" : `rgba(99,91,255,${opacity})`,
            }}
            initial={{ scaleY: 0, originY: "bottom" }}
            animate={{ scaleY: 1 }}
            transition={{ delay: i * 0.04, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          />
        );
      })}
    </div>
  );
}
