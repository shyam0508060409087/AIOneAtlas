"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { StreamingCursor } from "./AIProgressCard";

interface Message {
  id: string;
  role: "user" | "ai";
  content: string;
  timestamp: string;
  streaming?: boolean;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: "1",
    role: "user",
    content: "Build me a sales dashboard with real-time KPIs and AI insights",
    timestamp: "12s ago",
  },
  {
    id: "2",
    role: "ai",
    content:
      "Done! Built your Sales Dashboard — KPI grid, AI weekly summary, and pipeline view. I structured it this way because your prompt mentioned real-time metrics, summaries, and team context. Each maps to a distinct data need.",
    timestamp: "12s ago",
  },
  {
    id: "3",
    role: "user",
    content: "Add a retention cohort chart",
    timestamp: "just now",
  },
  {
    id: "4",
    role: "ai",
    content: "Adding a 30/60/90-day retention cohort chart below pipeline. Pulling from your users table, segmented by signup week.",
    timestamp: "just now",
    streaming: true,
  },
];

const AI_REPLIES = [
  "On it — I'll add that to your dashboard now. I structured it to complement the existing sections by reusing your data schema.",
  "Got it. Updating the layout and wiring the data query. This should take about 3 seconds.",
  "Done! I added that section. I chose this placement because it flows naturally from the previous context.",
  "Making that change now. I kept the same design language as the rest of your dashboard.",
];

export default function ChatRail() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const taRef = useRef<HTMLTextAreaElement>(null);
  let replyIndex = 0;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = () => {
    const v = input.trim();
    if (!v || isTyping) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: v,
      timestamp: "just now",
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    if (taRef.current) {
      taRef.current.style.height = "auto";
    }

    setTimeout(() => {
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "ai",
        content: AI_REPLIES[replyIndex % AI_REPLIES.length],
        timestamp: "just now",
        streaming: true,
      };
      replyIndex++;
      setMessages((prev) => [...prev, aiMsg]);

      setTimeout(() => {
        setMessages((prev) =>
          prev.map((m) => (m.id === aiMsg.id ? { ...m, streaming: false } : m))
        );
        setIsTyping(false);
      }, 2500);
    }, 750);
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  const autoGrow = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    const ta = e.target;
    ta.style.height = "auto";
    ta.style.height = `${Math.min(ta.scrollHeight, 80)}px`;
  };

  return (
    <div
      className="flex flex-col h-full overflow-hidden"
      style={{ background: "var(--bg1)", borderLeft: "1px solid var(--b0)" }}
    >
      {/* Header */}
      <div
        className="flex items-center gap-2 px-4 py-3.5 flex-shrink-0"
        style={{ borderBottom: "1px solid var(--b0)" }}
      >
        <div
          className="w-[22px] h-[22px] rounded-[5px] flex items-center justify-center text-[10px] flex-shrink-0"
          style={{ background: "linear-gradient(135deg, #635BFF, #7A73FF)" }}
        >
          🌐
        </div>
        <span className="text-[13px] font-semibold">AI Assistant</span>
        <div className="ml-auto flex items-center gap-1.5 text-[11px] text-green">
          <span
            className="w-1.5 h-1.5 rounded-full bg-green"
            style={{
              boxShadow: "0 0 6px #00D4B1",
              animation: "pulseDot 2s ease-in-out infinite",
            }}
          />
          Live
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-3.5 py-3.5 flex flex-col gap-3 scrollbar-none">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              {msg.role === "user" ? (
                <div className="chat-msg-user">{msg.content}</div>
              ) : (
                <div className="chat-msg-ai">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <div
                      className="w-[18px] h-[18px] rounded-[4px] flex items-center justify-center text-[9px]"
                      style={{ background: "linear-gradient(135deg, #635BFF, #7A73FF)" }}
                    >
                      🌐
                    </div>
                    <span className="text-[10px]" style={{ color: "var(--t4)" }}>
                      OneAtlas · {msg.timestamp}
                    </span>
                  </div>
                  <span>
                    {msg.content}
                    {msg.streaming && <StreamingCursor />}
                  </span>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing indicator */}
        <AnimatePresence>
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              className="chat-msg-ai flex items-center gap-1.5"
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="w-1.5 h-1.5 rounded-full"
                  style={{
                    background: "var(--v2)",
                    animation: `pulseDot 1.2s ease-in-out ${i * 0.2}s infinite`,
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-3 flex-shrink-0" style={{ borderTop: "1px solid var(--b0)" }}>
        <div
          className="flex items-end gap-2 rounded-xl px-2.5 py-2 transition-all duration-200"
          style={{
            background: "var(--bg2)",
            border: "1px solid var(--b1)",
          }}
          onFocus={(e) => {
            const el = e.currentTarget;
            el.style.borderColor = "rgba(99,91,255,0.35)";
            el.style.boxShadow = "0 0 0 3px rgba(99,91,255,0.06)";
          }}
          onBlur={(e) => {
            const el = e.currentTarget;
            el.style.borderColor = "var(--b1)";
            el.style.boxShadow = "none";
          }}
        >
          <textarea
            ref={taRef}
            value={input}
            onChange={autoGrow}
            onKeyDown={handleKey}
            placeholder="Ask anything or describe a change..."
            rows={1}
            className="flex-1 bg-transparent outline-none resize-none text-xs leading-relaxed"
            style={{
              color: "var(--t1)",
              caretColor: "var(--v)",
              maxHeight: "80px",
            }}
          />
          <motion.button
            className="w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0 text-[13px] text-white"
            style={{ background: "var(--v)" }}
            onClick={send}
            whileHover={{ background: "var(--v2)", scale: 1.05 }}
            whileTap={{ scale: 0.94 }}
          >
            ↑
          </motion.button>
        </div>
      </div>
    </div>
  );
}
