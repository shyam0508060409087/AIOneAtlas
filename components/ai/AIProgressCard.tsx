"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface AIStep {
  label: string;
  status: "done" | "active" | "waiting";
}

interface AIProgressCardProps {
  steps?: AIStep[];
  isComplete?: boolean;
  explanation?: string;
  onExplainMore?: () => void;
}

const DEFAULT_STEPS: AIStep[] = [
  { label: "Analyzed intent — extracted KPI, trend & team targets", status: "done" },
  { label: "Designed PostgreSQL schema (4 tables, 18 fields)", status: "done" },
  { label: "Generated dashboard — 3 sections, 9 components", status: "done" },
  { label: "Set up OAuth + email auth, Cloudflare Workers runtime", status: "done" },
  { label: "Deployed to 49 edge regions — live in 48 seconds", status: "done" },
];

const STEP_DOT = {
  done:    { bg: "rgba(0,212,177,0.12)",   color: "#00D4B1", icon: "✓" },
  active:  { bg: "rgba(99,91,255,0.12)", color: "#7A73FF", icon: "⟳" },
  waiting: { bg: "var(--bg4)",             color: "var(--t4)", icon: "○" },
};

export function StreamingCursor() {
  return (
    <span
      className="inline-block w-[2px] h-3 ml-0.5 align-middle bg-accent"
      style={{ animation: "blink 1s step-end infinite" }}
    />
  );
}

export default function AIProgressCard({
  steps = DEFAULT_STEPS,
  isComplete = true,
  explanation,
  onExplainMore,
}: AIProgressCardProps) {
  const [animatedSteps, setAnimatedSteps] = useState<AIStep[]>(
    isComplete ? steps : steps.map((s) => ({ ...s, status: "waiting" as const }))
  );

  useEffect(() => {
    if (isComplete) {
      setAnimatedSteps(steps);
      return;
    }

    // Animate steps one by one
    let i = 0;
    const interval = setInterval(() => {
      setAnimatedSteps((prev) =>
        prev.map((step, idx) => {
          if (idx < i) return { ...step, status: "done" };
          if (idx === i) return { ...step, status: "active" };
          return { ...step, status: "waiting" };
        })
      );
      i++;
      if (i >= steps.length) clearInterval(interval);
    }, 900);

    return () => clearInterval(interval);
  }, [isComplete, steps]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="ai-progress-card"
    >
      {/* Header */}
      <div className="flex items-center gap-2.5 mb-4 text-sm font-semibold">
        <div
          className="w-7 h-7 rounded-[7px] flex items-center justify-center text-sm flex-shrink-0"
          style={{ background: "linear-gradient(135deg, #635BFF, #7A73FF)" }}
        >
          🌐
        </div>
        <span>
          OneAtlas built this{" "}
          <span className="text-text-4 font-normal">· 12 seconds ago</span>
        </span>
        <AnimatePresence>
          {isComplete && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="badge-green ml-auto text-[9px]"
            >
              ✓ Done
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Steps */}
      <div className="flex flex-col gap-2">
        {animatedSteps.map((step, i) => {
          const dot = STEP_DOT[step.status];
          return (
            <motion.div
              key={i}
              className="flex items-center gap-2.5 text-xs"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
            >
              <div
                className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] flex-shrink-0"
                style={{
                  background: dot.bg,
                  color: dot.color,
                  animation: step.status === "active" ? "pulseDot 1.5s ease-in-out infinite" : undefined,
                }}
              >
                {dot.icon}
              </div>
              <span
                style={{
                  color:
                    step.status === "done"    ? "var(--t3)" :
                    step.status === "active"  ? "var(--t1)" :
                    "var(--t4)",
                  fontWeight: step.status === "active" ? "500" : undefined,
                }}
              >
                {step.label}
                {step.status === "active" && <StreamingCursor />}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* Explanation — OneAtlas differentiator */}
      {isComplete && explanation && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-3.5 pt-3 text-[11px] leading-relaxed"
          style={{
            borderTop: "1px solid rgba(255,255,255,0.04)",
            color: "var(--t3)",
          }}
        >
          ✦ {explanation}{" "}
          {onExplainMore && (
            <button
              onClick={onExplainMore}
              className="text-accent-light hover:text-accent transition-colors"
            >
              Read full reasoning →
            </button>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}
