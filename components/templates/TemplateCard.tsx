"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Template } from "@/lib/data";

interface TemplateCardProps {
  template: Template;
  onPreview: (template: Template) => void;
  onUse: (template: Template) => void;
  initialSaved?: boolean;
}

export default function TemplateCard({
  template,
  onPreview,
  onUse,
  initialSaved = false,
}: TemplateCardProps) {
  const [saved, setSaved] = useState(initialSaved);
  const [hovered, setHovered] = useState(false);

  const toggleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSaved(!saved);
  };

  return (
    <motion.div
      className="template-card"
      style={{ borderColor: template.borderColor }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {/* Preview Area */}
      <div
        className="relative h-[155px] flex items-center justify-center text-[44px] overflow-hidden"
        style={{ background: template.bgColor }}
      >
        <motion.span
          animate={hovered ? { scale: 1.1, y: -4 } : { scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {template.emoji}
        </motion.span>

        {/* Overlay */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              className="template-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <motion.button
                className="tovbtn-p px-4 py-2 rounded-lg text-xs font-semibold text-white"
                style={{ background: "var(--accent-primary)", boxShadow: "0 2px 12px rgba(255,102,0,0.35)" }}
                onClick={(e) => { e.stopPropagation(); onPreview(template); }}
                whileHover={{ background: "var(--accent-primary)" }}
                whileTap={{ scale: 0.97 }}
              >
                Preview
              </motion.button>
              <motion.button
                className="px-4 py-2 rounded-lg text-xs font-semibold"
                style={{ background: "var(--bg-tertiary)", color: "var(--text-primary)", border: "1px solid var(--b2)" }}
                onClick={(e) => { e.stopPropagation(); onUse(template); }}
                whileHover={{ background: "var(--bg-tertiary)" }}
                whileTap={{ scale: 0.97 }}
              >
                Use →
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Info */}
      <div className="p-[15px]">
        <p className="text-sm font-semibold mb-1">{template.name}</p>
        <p className="text-xs leading-[1.55] mb-3" style={{ color: "var(--text-muted)" }}>
          {template.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex gap-1.5 flex-wrap">
            {template.tags.map((tag) => (
              <span key={tag} className="text-[10px] px-2 py-[2px] rounded-full" style={{ background: "var(--bg-tertiary)", color: "var(--text-muted)", border: "1px solid var(--border-color)" }}>
                {tag}
              </span>
            ))}
          </div>

          <motion.button
            onClick={toggleSave}
            className="w-7 h-7 rounded-md flex items-center justify-center text-[13px] transition-colors flex-shrink-0"
            style={{
              background: "var(--bg-secondary)",
              border: "1px solid var(--border-color)",
              color: saved ? "var(--accent-primary)" : "var(--text-muted)",
            }}
            whileHover={{
              color: "var(--accent-primary)",
              borderColor: "rgba(255,102,0,0.3)",
            }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.span
              animate={saved ? { scale: [1, 1.3, 1] } : {}}
              transition={{ duration: 0.3 }}
            >
              {saved ? "★" : "☆"}
            </motion.span>
          </motion.button>
        </div>

        <p className="text-[11px] mt-2" style={{ color: "var(--text-muted)" }}>
          {template.usersBuilt} apps built
        </p>
      </div>
    </motion.div>
  );
}
