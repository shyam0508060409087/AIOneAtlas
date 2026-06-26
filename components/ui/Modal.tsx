"use client";

import { ReactNode, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ═══════════════════════════════════════════
// BASE MODAL
// ═══════════════════════════════════════════

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  maxWidth?: string;
}

export default function Modal({
  open,
  onClose,
  title,
  children,
  maxWidth = "600px",
}: ModalProps) {
  // Close on Escape
  
  useEffect(() => {
    
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[400] flex items-center justify-center p-5"
          style={{ background: "rgba(0,0,0,0.8)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            className="relative w-full rounded-2xl p-7 overflow-y-auto"
            style={{
              maxWidth,
              maxHeight: "90vh",
              background: "var(--bg-secondary)",
              border: "1px solid var(--b2)",
              boxShadow:
                "0 8px 48px rgba(0,0,0,0.55), 0 2px 8px rgba(0,0,0,0.6)",
            }}
            initial={{ opacity: 0, scale: 0.94, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 4 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-bold tracking-tight">{title}</h2>
              <motion.button
                className="w-[30px] h-[30px] rounded-md flex items-center justify-center text-sm"
                style={{
                  background: "var(--bg-secondary)",
                  border: "1px solid var(--border-color)",
                  color: "var(--text-muted)",
                }}
                onClick={onClose}
                whileHover={{ background: "var(--bg-tertiary)", color: "var(--text-primary)" }}
                whileTap={{ scale: 0.95 }}
              >
                ✕
              </motion.button>
            </div>

            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ═══════════════════════════════════════════
// COMPARE MODAL CONTENT
// ═══════════════════════════════════════════

const COMPARE_COLS = [
  {
    name: "📊 Sales Dashboard",
    rows: [
      ["Category",   "Analytics"],
      ["Components", "12"],
      ["AI Features","3"],
      ["Setup time", "< 2 min"],
      ["Apps built", "2,140"],
      ["AI memory",  "Yes"],
    ],
  },
  {
    name: "🗂️ Project Tracker",
    rows: [
      ["Category",   "Productivity"],
      ["Components", "9"],
      ["AI Features","2"],
      ["Setup time", "< 1 min"],
      ["Apps built", "1,820"],
      ["AI memory",  "Yes"],
    ],
  },
];

interface CompareContentProps {
  onUse?: () => void;
}

export function CompareContent({ onUse }: CompareContentProps) {
  return (
    <div>
      <div className="grid grid-cols-2 gap-3 mb-5">
        {COMPARE_COLS.map((col) => (
          <div
            key={col.name}
            className="rounded-xl p-4"
            style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-color)" }}
          >
            <h4 className="text-sm font-bold mb-3">{col.name}</h4>
            {col.rows.map(([k, v]) => (
              <div
                key={k}
                className="flex justify-between items-center text-xs py-1.5"
                style={{ borderBottom: "1px solid var(--border-light)" }}
              >
                <span style={{ color: "var(--text-muted)" }}>{k}</span>
                <span className="font-medium">{v}</span>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="flex gap-2.5 flex-wrap">
        <motion.button
          className="btn-primary text-sm px-5 py-2.5"
          onClick={onUse}
          whileTap={{ scale: 0.97 }}
        >
          Use Sales Dashboard
        </motion.button>
        <motion.button
          className="btn-secondary text-sm px-5 py-2.5"
          whileTap={{ scale: 0.97 }}
        >
          Use Project Tracker
        </motion.button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
// PREVIEW MODAL CONTENT
// ═══════════════════════════════════════════

interface PreviewContentProps {
  emoji: string;
  name: string;
  onUse: () => void;
  onCompare: () => void;
}

export function PreviewContent({
  emoji,
  name,
  onUse,
  onCompare,
}: PreviewContentProps) {
  const [saved, setSaved] = useState(false);

  return (
    <div>
      {/* Preview canvas */}
      <div
        className="h-[380px] rounded-xl flex items-center justify-center text-7xl mb-5 relative overflow-hidden"
        style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-color)" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 30% 40%, rgba(255,102,0,0.12), transparent 60%)",
          }}
        />
        <motion.span
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
          style={{ position: "relative", zIndex: 1 }}
        >
          {emoji}
        </motion.span>
      </div>

      <p className="text-sm mb-1 font-semibold">{name}</p>

      {/* Actions */}
      <div className="flex gap-2.5 flex-wrap mt-3">
        <motion.button
          className="btn-primary text-sm px-5 py-2.5"
          onClick={onUse}
          whileTap={{ scale: 0.97 }}
        >
          Use Template →
        </motion.button>
        <motion.button
          className="btn-secondary text-sm px-5 py-2.5"
          onClick={onCompare}
          whileTap={{ scale: 0.97 }}
        >
          ⇄ Compare
        </motion.button>
        <motion.button
          className="btn-secondary text-sm px-5 py-2.5"
          onClick={() => setSaved((s) => !s)}
          whileTap={{ scale: 0.97 }}
        >
          <motion.span
            animate={saved ? { scale: [1, 1.3, 1] } : {}}
            transition={{ duration: 0.3 }}
          >
            {saved ? "★ Saved" : "☆ Save"}
          </motion.span>
        </motion.button>
      </div>
    </div>
  );
}
