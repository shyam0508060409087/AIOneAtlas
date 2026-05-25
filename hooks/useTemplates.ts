"use client";

import { useState, useMemo, useCallback } from "react";
import { TEMPLATES, type Template, type TemplateCategory } from "@/lib/data";

export function useTemplates() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<TemplateCategory>("All");
  const [saved, setSaved] = useState<Set<number>>(new Set());

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

  const toggleSave = useCallback((id: number) => {
    setSaved((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const isSaved = useCallback((id: number) => saved.has(id), [saved]);

  const savedTemplates = useMemo(
    () => TEMPLATES.filter((t) => saved.has(t.id)),
    [saved]
  );

  return {
    search,
    setSearch,
    activeCategory,
    setActiveCategory,
    filtered,
    saved,
    savedTemplates,
    savedCount: saved.size,
    toggleSave,
    isSaved,
  };
}
