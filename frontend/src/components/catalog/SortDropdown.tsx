"use client";

import { ArrowUpDown } from "lucide-react";

export type SortOption = "relevance" | "newest" | "price-asc" | "price-desc" | "rating" | "popular";

interface SortDropdownProps {
  currentSort: SortOption;
  onChangeSort: (sort: SortOption) => void;
}

export function SortDropdown({ currentSort, onChangeSort }: SortDropdownProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-[#9E948C] hidden sm:inline flex items-center gap-1">
        <ArrowUpDown className="w-3.5 h-3.5" /> Sort:
      </span>
      <select
        value={currentSort}
        onChange={(e) => onChangeSort(e.target.value as SortOption)}
        aria-label="Sort products by"
        className="px-3 py-1.5 rounded-xl bg-[#1A1614] border border-white/10 text-xs text-[#FBF8F5] focus:outline-none focus:border-[#FF8A00] transition-colors cursor-pointer"
      >
        <option value="relevance">Relevance</option>
        <option value="newest">Newest Arrivals</option>
        <option value="price-asc">Price: Low → High</option>
        <option value="price-desc">Price: High → Low</option>
        <option value="rating">Highest Rated</option>
        <option value="popular">Most Popular</option>
      </select>
    </div>
  );
}
