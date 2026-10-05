"use client";

import { CATEGORIES } from "@/constants/categories";
import { Star, X } from "lucide-react";

interface FilterSidebarProps {
  selectedCategory?: string;
  onSelectCategory: (category?: string) => void;
  selectedPriceMax: number;
  onSelectPriceMax: (max: number) => void;
  minRating: number;
  onSelectMinRating: (rating: number) => void;
  inStockOnly: boolean;
  onToggleInStockOnly: (val: boolean) => void;
  onReset: () => void;
  onCloseMobile?: () => void;
}

export function FilterSidebar({
  selectedCategory,
  onSelectCategory,
  selectedPriceMax,
  onSelectPriceMax,
  minRating,
  onSelectMinRating,
  inStockOnly,
  onToggleInStockOnly,
  onReset,
  onCloseMobile,
}: FilterSidebarProps) {
  return (
    <aside className="w-full space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-white/8">
        <h3 className="text-sm font-bold text-[#FBF8F5]">Filters</h3>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onReset}
            className="text-xs text-[#FF8A00] hover:underline font-medium"
          >
            Clear All
          </button>
          {onCloseMobile && (
            <button
              type="button"
              onClick={onCloseMobile}
              aria-label="Close filters"
              className="lg:hidden p-1 text-stone-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Category Filter */}
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-2.5">
          Category
        </h4>
        <div className="space-y-1">
          <button
            type="button"
            onClick={() => onSelectCategory(undefined)}
            className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors ${
              !selectedCategory ? "bg-[#FF8A00]/15 text-[#FF8A00] font-semibold" : "text-stone-300 hover:bg-white/5"
            }`}
          >
            <span>All Categories</span>
          </button>
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory?.toLowerCase() === cat.slug.toLowerCase();
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onSelectCategory(isActive ? undefined : cat.slug)}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors ${
                  isActive ? "bg-[#FF8A00]/15 text-[#FF8A00] font-semibold" : "text-stone-300 hover:bg-white/5"
                }`}
              >
                <span>{cat.name}</span>
                <span className="text-[10px] text-stone-500">{cat.productCount}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Max Price Filter */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-400">
            Max Price
          </h4>
          <span className="text-xs font-bold text-[#FF8A00]">
            ₦{selectedPriceMax.toLocaleString()}
          </span>
        </div>
        <input
          type="range"
          min={20000}
          max={400000}
          step={10000}
          value={selectedPriceMax}
          onChange={(e) => onSelectPriceMax(Number(e.target.value))}
          className="w-full accent-[#FF8A00] cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-stone-500 mt-1">
          <span>₦20,000</span>
          <span>₦400,000+</span>
        </div>
      </div>

      {/* Minimum Rating */}
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-2">
          Rating
        </h4>
        <div className="space-y-1">
          {[4, 3, 2].map((stars) => (
            <button
              key={stars}
              type="button"
              onClick={() => onSelectMinRating(minRating === stars ? 0 : stars)}
              className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs transition-colors ${
                minRating === stars ? "bg-[#FF8A00]/15 text-[#FF8A00] font-medium" : "text-stone-300 hover:bg-white/5"
              }`}
            >
              <div className="flex items-center text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < stars ? "fill-amber-400 text-amber-400" : "text-stone-700"
                    }`}
                  />
                ))}
              </div>
              <span className="text-[11px]">& Up</span>
            </button>
          ))}
        </div>
      </div>

      {/* In-Stock Toggle */}
      <div className="pt-2 border-t border-white/8">
        <label className="flex items-center gap-2.5 text-xs text-stone-300 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => onToggleInStockOnly(e.target.checked)}
            className="w-4 h-4 rounded border-stone-700 bg-stone-900 text-[#FF8A00] focus:ring-[#FF8A00] accent-[#FF8A00]"
          />
          <span>In-Stock Items Only</span>
        </label>
      </div>
    </aside>
  );
}
