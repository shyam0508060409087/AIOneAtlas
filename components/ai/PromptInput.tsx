"use client";

import { useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PROMPT_CHIPS, type PromptChip } from "@/lib/data";

interface PromptInputProps {
  placeholder?: string;
  onSubmit?: (value: string, planMode: boolean) => void;
  size?: "hero" | "inline";
  showChips?: boolean;
  className?: string;
}

export default function PromptInput({
  placeholder = "Describe what you want to build...",
  onSubmit,
  size = "hero",
  showChips = true,
  className = "",
}: PromptInputProps) {
  const [value, setValue] = useState("");
  const [planMode, setPlanMode] = useState(false);
  const [focused, setFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const autoGrow = useCallback(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = `${ta.scrollHeight}px`;
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    autoGrow();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (!value.trim()) return;
    onSubmit?.(value.trim(), planMode);
  };

  const fillChip = (chip: PromptChip) => {
    setValue(chip.prompt);
    textareaRef.current?.focus();
    setTimeout(autoGrow, 0);
  };

  const isHero = size === "hero";

  return (
    <div className={`w-full ${className}`}>
      {/* ── PROMPT BOX ── */}
      <motion.div
        className="prompt-box"
        animate={focused ? { scale: 1 } : { scale: 1 }}
        style={{
          borderColor: focused ? "rgba(99,91,255,0.4)" : undefined,
          boxShadow: focused
            ? "0 8px 48px rgba(0,0,0,0.55), 0 0 0 1px rgba(99,91,255,0.3), 0 0 40px rgba(99,91,255,0.12), 0 0 0 4px rgba(99,91,255,0.06)"
            : undefined,
        }}
      >
        <textarea
          ref={textareaRef}
          className="prompt-textarea"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          rows={isHero ? 3 : 2}
          style={{ minHeight: isHero ? "78px" : "52px" }}
        />

        {/* ── ACTION BAR ── */}
        <div
          className="flex items-center justify-between mt-3 pt-3"
          style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
        >
          <div className="flex items-center gap-1.5">
            {/* Attach */}
            <motion.button
              className="icon-btn"
              title="Attach file"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              📎
            </motion.button>

            {/* Voice */}
            <motion.button
              className="icon-btn"
              title="Voice input"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              🎙️
            </motion.button>

            {/* Plan Toggle */}
            <motion.button
              className={`plan-toggle ${planMode ? "active" : ""}`}
              onClick={() => setPlanMode(!planMode)}
              whileTap={{ scale: 0.97 }}
            >
              <div className={`toggle-track ${planMode ? "on" : ""}`}>
                <div className="toggle-thumb" />
              </div>
              Think first
            </motion.button>
          </div>

          {/* Send Button */}
          <motion.button
            className="btn-send"
            onClick={handleSubmit}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            animate={value.trim() ? { opacity: 1 } : { opacity: 0.6 }}
          >
            ↑
          </motion.button>
        </div>
      </motion.div>

      {/* ── CHIPS ── */}
      <AnimatePresence>
        {showChips && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap gap-2 mt-4 justify-center"
          >
            {PROMPT_CHIPS.map((chip, i) => (
              <motion.button
                key={chip.label}
                className="prompt-chip"
                onClick={() => fillChip(chip)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                <span>{chip.emoji}</span>
                {chip.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
