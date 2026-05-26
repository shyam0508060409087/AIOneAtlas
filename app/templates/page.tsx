"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "@/components/layout/Sidebar";
import TemplateCard from "@/components/templates/TemplateCard";
import Modal from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toast";
import { TEMPLATES, TEMPLATE_CATEGORIES, type Template } from "@/lib/data";
import { useTemplateLibraryStore } from "@/lib/store";

const FEATURED = TEMPLATES.filter((t) => t.featured);
const FEATURED_STYLES = ["featured-card-1", "featured-card-2", "featured-card-3", "featured-card-4"];

function TemplatesPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const search = useTemplateLibraryStore((state) => state.search);
  const activeCategory = useTemplateLibraryStore((state) => state.activeCategory);
  const setSearch = useTemplateLibraryStore((state) => state.setSearch);
  const setActiveCategory = useTemplateLibraryStore((state) => state.setActiveCategory);

  useEffect(() => {
    const cat = searchParams.get("cat") as typeof activeCategory || "All";
    if (cat !== activeCategory) setActiveCategory(cat);
  }, [searchParams, activeCategory, setActiveCategory]);

  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);

  const filtered = useMemo(() => {
    let list = TEMPLATES;
    if (activeCategory !== "All") {
      list = list.filter((t) => t.tags.includes(activeCategory));
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((t) => t.name.toLowerCase().includes(q) || t.description.toLowerCase().includes(q) || t.tags.some((tag) => tag.toLowerCase().includes(q)));
    }
    return list;
  }, [search, activeCategory]);

  const handleUse = (t: Template) => {
    toast("🚀", `Building from "${t.name}"...`);
    setTimeout(() => router.push("/workspace"), 500);
  };

  return (
    <div className="pt-[58px] grid min-h-screen" style={{ gridTemplateColumns: "228px 1fr" }}>
      <Sidebar variant="templates" />
      <div style={{ background: "var(--bg-primary)", overflowY: "auto" }}>
        <div className="px-8 pt-7 pb-5" style={{ borderBottom: "1px solid var(--border-light)" }}>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <h1 className="text-2xl font-extrabold tracking-tight mb-1.5">Template Library</h1>
            <p className="text-sm mb-5" style={{ color: "var(--text-muted)" }}>Start with a battle-tested template. Customize with AI in seconds.</p>
            <div className="flex items-center gap-2.5 max-w-[540px] px-3.5 py-2.5 rounded-xl" style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-color)" }}>
              <span className="text-[15px]" style={{ color: "var(--text-muted)" }}>🔍</span>
              <input className="flex-1 bg-transparent outline-none text-sm" style={{ color: "var(--text-primary)" }} placeholder="Search templates..." value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
          </motion.div>
        </div>

        <div className="flex items-center justify-between px-8 py-3.5 gap-3 overflow-x-auto" style={{ borderBottom: "1px solid var(--border-light)" }}>
          <div className="flex gap-1.5 flex-shrink-0">
            {TEMPLATE_CATEGORIES.map((cat) => (
              <motion.button key={cat} className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${activeCategory === cat ? "text-accent-light" : "text-text-3 hover:text-text-1"}`} style={{ background: activeCategory === cat ? "rgba(99,91,255,0.1)" : "var(--bg-secondary)", border: `1px solid ${activeCategory === cat ? "rgba(99,91,255,0.3)" : "var(--border-color)"}` }} onClick={() => { setActiveCategory(cat); router.push(`/templates?cat=${cat}`); }} whileTap={{ scale: 0.97 }}>{cat}</motion.button>
            ))}
          </div>
        </div>

        <div className="px-8 py-5" style={{ borderBottom: "1px solid var(--border-light)" }}>
          <h3 className="text-sm font-bold flex items-center gap-2 mb-4">✦ Featured Collection</h3>
          <div className="flex gap-3 overflow-x-auto pb-1">
            {FEATURED.map((t, i) => (
              <motion.div key={t.id} className={`flex-shrink-0 w-[250px] rounded-xl p-5 cursor-pointer transition-all ${FEATURED_STYLES[i]}`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }} whileHover={{ y: -3 }} onClick={() => setPreviewTemplate(t)}>
                <div className="text-[28px] mb-3">{t.emoji}</div>
                <p className="text-[9px] font-bold tracking-[0.08em] uppercase mb-1.5" style={{ color: "var(--text-muted)" }}>{t.featuredLabel ?? "Featured"}</p>
                <p className="text-[15px] font-bold tracking-tight mb-1">{t.name}</p>
                <p className="text-xs leading-snug" style={{ color: "var(--text-secondary)" }}>{t.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="px-8 py-5">
          <h3 className="text-sm font-bold flex items-center gap-2 mb-4">{activeCategory === "All" ? "All Templates" : activeCategory} <span className="badge-accent text-[9px]">{filtered.length}</span></h3>
          <AnimatePresence mode="wait">
            {filtered.length > 0 ? (
              <motion.div key={`${activeCategory}-${search}`} className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(275px, 1fr))" }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                {filtered.map((t, i) => (
                  <motion.div key={t.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                    <TemplateCard template={t} onPreview={setPreviewTemplate} onUse={handleUse} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div key="empty" className="flex flex-col items-center justify-center py-24 text-center" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <div className="text-[52px] mb-4 opacity-30">🔍</div>
                <h3 className="text-base font-semibold mb-2">No templates found</h3>
                <p className="text-sm max-w-[300px] leading-relaxed mb-5" style={{ color: "var(--text-muted)" }}>Try a different search term or browse all categories.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <Modal open={!!previewTemplate} onClose={() => setPreviewTemplate(null)} title={`Preview: ${previewTemplate?.name ?? ""}`} maxWidth="860px">
        {previewTemplate && (
          <div>
            <div className="h-[360px] rounded-xl flex items-center justify-center text-7xl mb-5 relative overflow-hidden" style={{ background: previewTemplate.bgColor, border: `1px solid ${previewTemplate.borderColor}` }}>
              <span>{previewTemplate.emoji}</span>
            </div>
            <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>{previewTemplate.description}</p>
            <div className="flex gap-2.5 flex-wrap">
              <motion.button className="btn-primary text-sm px-5 py-2.5" onClick={() => { setPreviewTemplate(null); handleUse(previewTemplate); }} whileTap={{ scale: 0.97 }}>Use Template →</motion.button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default function TemplatesPage() {
  return (
    <Suspense fallback={<div className="pt-[58px] min-h-screen flex items-center justify-center">Loading...</div>}>
      <TemplatesPageContent />
    </Suspense>
  );
}

