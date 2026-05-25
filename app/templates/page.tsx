"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "@/components/layout/Sidebar";
import TemplateCard from "@/components/templates/TemplateCard";
import Modal, { CompareContent } from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toast";
import {
  TEMPLATES,
  TEMPLATE_CATEGORIES,
  type Template,
} from "@/lib/data";
import { useTemplateLibraryStore } from "@/lib/store";

const FEATURED = TEMPLATES.filter((t) => t.featured);

const FEATURED_STYLES = [
  "featured-card-1",
  "featured-card-2",
  "featured-card-3",
  "featured-card-4",
];

export default function TemplatesPage() {
  const router = useRouter();
  const { toast } = useToast();

  const search = useTemplateLibraryStore((state) => state.search);
  const activeCategory = useTemplateLibraryStore((state) => state.activeCategory);
  const setSearch = useTemplateLibraryStore((state) => state.setSearch);
  const setActiveCategory = useTemplateLibraryStore((state) => state.setActiveCategory);
  const incrementSavedCount = useTemplateLibraryStore((state) => state.incrementSavedCount);
  const [compareOpen, setCompareOpen] = useState(false);
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);

  const filtered = useMemo(() => {
    let list = TEMPLATES;
    if (activeCategory !== "All") {
      list = list.filter((t) => t.tags.includes(activeCategory));
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.tags.some((tag) => tag.toLowerCase().includes(q))
      );
    }
    return list;
  }, [search, activeCategory]);

  const handleUse = (t: Template) => {
    toast("🚀", `Building from "${t.name}"...`);
    setTimeout(() => router.push("/workspace"), 500);
  };

  const handlePreview = (t: Template) => setPreviewTemplate(t);

  return (
    <div className="pt-[58px] grid min-h-screen" style={{ gridTemplateColumns: "228px 1fr" }}>
      <Sidebar variant="templates" />

      <div style={{ background: "var(--bg0)", overflowY: "auto" }}>

        {/* ── HEADER ── */}
        <div className="px-8 pt-7 pb-5" style={{ borderBottom: "1px solid var(--b0)" }}>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: [0.16,1,0.3,1] }}>
            <h1 className="text-2xl font-extrabold tracking-tight mb-1.5">Template Library</h1>
            <p className="text-sm mb-5" style={{ color: "var(--t3)" }}>
              Start with a battle-tested template. Customize with AI in seconds.
            </p>

            {/* Search */}
            <div
              className="flex items-center gap-2.5 max-w-[540px] px-3.5 py-2.5 rounded-xl transition-all duration-200"
              style={{ background: "var(--bg2)", border: "1px solid var(--b1)" }}
              onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(99,91,255,0.35)"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(99,91,255,0.07)"; }}
              onBlur={(e)  => { e.currentTarget.style.borderColor = "var(--b1)";                e.currentTarget.style.boxShadow = "none"; }}
            >
              <span className="text-[15px] flex-shrink-0" style={{ color: "var(--t4)" }}>🔍</span>
              <input
                className="flex-1 bg-transparent outline-none text-sm"
                style={{ color: "var(--t1)", caretColor: "var(--v)" }}
                placeholder="Search templates..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <span
                className="text-[10px] px-1.5 py-0.5 rounded font-mono flex-shrink-0"
                style={{ background: "var(--bg3)", color: "var(--t4)", border: "1px solid var(--b1)" }}
              >
                ⌘K
              </span>
            </div>
          </motion.div>
        </div>

        {/* ── FILTER BAR ── */}
        <div
          className="flex items-center justify-between px-8 py-3.5 gap-3 overflow-x-auto scrollbar-none"
          style={{ borderBottom: "1px solid var(--b0)" }}
        >
          <div className="flex gap-1.5 flex-shrink-0">
            {TEMPLATE_CATEGORIES.map((cat) => (
              <motion.button
                key={cat}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? "text-accent-light"
                    : "text-text-3 hover:text-text-1"
                }`}
                style={{
                  background: activeCategory === cat ? "rgba(99,91,255,0.1)" : "var(--bg2)",
                  border: `1px solid ${activeCategory === cat ? "rgba(99,91,255,0.3)" : "var(--b1)"}`,
                }}
                onClick={() => setActiveCategory(cat)}
                whileTap={{ scale: 0.97 }}
              >
                {cat}
              </motion.button>
            ))}
          </div>

          <motion.button
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs flex-shrink-0 transition-all"
            style={{ background: "var(--bg2)", border: "1px solid var(--b1)", color: "var(--t3)" }}
            whileHover={{ borderColor: "var(--b2)", color: "var(--t1)" }}
            whileTap={{ scale: 0.97 }}
            onClick={() => toast("⇅", "Sorted by: Most Popular")}
          >
            ⇅ Most Popular ▾
          </motion.button>
        </div>

        {/* ── FEATURED COLLECTION ── */}
        <div className="px-8 py-5" style={{ borderBottom: "1px solid var(--b0)" }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold flex items-center gap-2">✦ Featured Collection</h3>
            <button className="text-xs text-accent-light hover:text-accent transition-colors">See all →</button>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-none">
            {FEATURED.map((t, i) => (
              <motion.div
                key={t.id}
                className={`flex-shrink-0 w-[250px] rounded-xl p-5 cursor-pointer transition-all ${FEATURED_STYLES[i] ?? "featured-card-1"}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07, ease: [0.16,1,0.3,1] }}
                whileHover={{ y: -3, boxShadow: "0 8px 40px rgba(0,0,0,0.5)" }}
                onClick={() => handlePreview(t)}
              >
                <div className="text-[28px] mb-3">{t.emoji}</div>
                <p className="text-[9px] font-bold tracking-[0.08em] uppercase mb-1.5" style={{ color: "var(--t3)" }}>
                  {t.featuredLabel ?? "Featured"}
                </p>
                <p className="text-[15px] font-bold tracking-tight mb-1">{t.name}</p>
                <p className="text-xs leading-snug" style={{ color: "var(--t2)" }}>{t.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── TEMPLATE GRID ── */}
        <div className="px-8 py-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold flex items-center gap-2">
              {activeCategory === "All" ? "All Templates" : activeCategory}
              <span className="badge-accent text-[9px]">{filtered.length}</span>
            </h3>
            <motion.button
              className="text-xs flex items-center gap-1.5 transition-colors text-accent-light hover:text-accent"
              onClick={() => setCompareOpen(true)}
            >
              ⇄ Compare
            </motion.button>
          </div>

          <AnimatePresence mode="wait">
            {filtered.length > 0 ? (
              <motion.div
                key={`${activeCategory}-${search}`}
                className="grid gap-4"
                style={{ gridTemplateColumns: "repeat(auto-fill, minmax(275px, 1fr))" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {filtered.map((t, i) => (
                  <motion.div
                    key={t.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04, ease: [0.16,1,0.3,1] }}
                  >
                    <TemplateCard
                      template={t}
                      onPreview={handlePreview}
                      onUse={handleUse}
                    />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                className="flex flex-col items-center justify-center py-24 text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="text-[52px] mb-4 opacity-30" style={{ animation: "float 3s ease-in-out infinite" }}>🔍</div>
                <h3 className="text-base font-semibold mb-2">No templates found</h3>
                <p className="text-sm max-w-[300px] leading-relaxed mb-5" style={{ color: "var(--t3)" }}>
                  Try a different search term or browse all categories.
                </p>
                <motion.button
                  className="btn-primary text-sm px-5 py-2.5"
                  onClick={() => { router.push("/workspace"); toast("✨", "Building from scratch!"); }}
                  whileTap={{ scale: 0.97 }}
                >
                  Build from scratch →
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── COMPARE MODAL ── */}
      <Modal
        open={compareOpen}
        onClose={() => setCompareOpen(false)}
        title="⇄ Compare Templates"
        maxWidth="680px"
      >
        <CompareContent
          onUse={() => {
            setCompareOpen(false);
            router.push("/workspace");
            toast("🚀", "Building from Sales Dashboard...");
          }}
        />
      </Modal>

      {/* ── PREVIEW MODAL ── */}
      <Modal
        open={!!previewTemplate}
        onClose={() => setPreviewTemplate(null)}
        title={`Preview: ${previewTemplate?.name ?? ""}`}
        maxWidth="860px"
      >
        {previewTemplate && (
          <div>
            <div
              className="h-[360px] rounded-xl flex items-center justify-center text-7xl mb-5 relative overflow-hidden"
              style={{ background: previewTemplate.bgColor, border: `1px solid ${previewTemplate.borderColor}` }}
            >
              <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 30% 40%, rgba(99,91,255,0.1), transparent 60%)" }} />
              <motion.span
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
                style={{ position: "relative", zIndex: 1 }}
              >
                {previewTemplate.emoji}
              </motion.span>
            </div>

            <p className="text-sm mb-4" style={{ color: "var(--t3)" }}>{previewTemplate.description}</p>

            <div className="flex gap-2.5 flex-wrap">
              <motion.button
                className="btn-primary text-sm px-5 py-2.5"
                onClick={() => { setPreviewTemplate(null); handleUse(previewTemplate); }}
                whileTap={{ scale: 0.97 }}
              >
                Use Template →
              </motion.button>
              <motion.button
                className="btn-secondary text-sm px-5 py-2.5"
                onClick={() => { setPreviewTemplate(null); setCompareOpen(true); }}
                whileTap={{ scale: 0.97 }}
              >
                ⇄ Compare
              </motion.button>
              <motion.button
                className="btn-secondary text-sm px-5 py-2.5"
                onClick={() => { toast("★", "Template saved!"); incrementSavedCount(); }}
                whileTap={{ scale: 0.97 }}
              >
                ☆ Save
              </motion.button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
