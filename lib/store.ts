"use client";

import { create } from "zustand";
import type { TemplateCategory } from "@/lib/data";

interface TemplateLibraryState {
  search: string;
  activeCategory: TemplateCategory;
  savedCount: number;
  setSearch: (search: string) => void;
  setActiveCategory: (category: TemplateCategory) => void;
  incrementSavedCount: () => void;
}

export const useTemplateLibraryStore = create<TemplateLibraryState>((set) => ({
  search: "",
  activeCategory: "All",
  savedCount: 0,
  setSearch: (search) => set({ search }),
  setActiveCategory: (activeCategory) => set({ activeCategory }),
  incrementSavedCount: () =>
    set((state) => ({ savedCount: state.savedCount + 1 })),
}));
