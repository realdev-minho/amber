"use client";

import { useState, useMemo } from "react";
import { Product } from "@/types";
import { FilterSidebar } from "./FilterSidebar";
import { ProductGrid } from "./ProductGrid";
import { SortDropdown, SortOption } from "./SortDropdown";
import { SlidersHorizontal } from "lucide-react";

interface CatalogViewProps {
  initialProducts: Product[];
  initialCategory?: string;
  pageTitle?: string;
  pageSubtitle?: string;
}

export function CatalogView({
  initialProducts,
  initialCategory,
  pageTitle = "Explore Catalog",
  pageSubtitle = "Curated luxury goods across all marketplace departments.",
}: CatalogViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(initialCategory);
  const [selectedPriceMax, setSelectedPriceMax] = useState<number>(400000);
  const [minRating, setMinRating] = useState<number>(0);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<SortOption>("relevance");
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [showDesktopFilters, setShowDesktopFilters] = useState(true);

  const resetFilters = () => {
    setSelectedCategory(initialCategory);
    setSelectedPriceMax(400000);
    setMinRating(0);
    setInStockOnly(false);
    setSortBy("relevance");
  };

  const filteredProducts = useMemo(() => {
    return initialProducts
      .filter((p) => {
        if (selectedCategory && p.category.toLowerCase() !== selectedCategory.toLowerCase()) return false;
        if (p.price > selectedPriceMax) return false;
        if (minRating > 0 && p.rating < minRating) return false;
        if (inStockOnly && p.stock <= 0) return false;
        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price-asc") return a.price - b.price;
        if (sortBy === "price-desc") return b.price - a.price;
        if (sortBy === "rating") return b.rating - a.rating;
        if (sortBy === "popular") return b.reviewCount - a.reviewCount;
        if (sortBy === "newest") return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        return 0;
      });
  }, [initialProducts, selectedCategory, selectedPriceMax, minRating, inStockOnly, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 border-b border-white/8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#FBF8F5] tracking-tight">{pageTitle}</h1>
          {pageSubtitle && <p className="text-xs sm:text-sm text-[#9E948C] mt-1.5">{pageSubtitle}</p>}
        </div>
        <div className="flex items-center justify-between sm:justify-end gap-3">
          <button
            type="button"
            onClick={() => {
              if (typeof window !== "undefined" && window.innerWidth < 1024) {
                setIsMobileFiltersOpen(true);
              } else {
                setShowDesktopFilters((prev) => !prev);
              }
            }}
            className={`px-3.5 py-2 rounded-xl border text-xs flex items-center gap-2 transition-all ${
              showDesktopFilters
                ? "bg-[#FF8A00]/10 border-[#FF8A00]/40 text-[#FF8A00]"
                : "bg-[#1A1614] border-white/10 text-[#FBF8F5] hover:bg-white/5"
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">{showDesktopFilters ? "Hide Filters" : "Show Filters"}</span>
            <span className="lg:hidden">Filters</span>
          </button>
          <SortDropdown currentSort={sortBy} onChangeSort={setSortBy} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 pt-8 items-start">
        {/* Desktop Sidebar (Collapsible) */}
        {showDesktopFilters && (
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-28 p-5 rounded-2xl glass-panel border border-white/6">
              <FilterSidebar
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                selectedPriceMax={selectedPriceMax}
                onSelectPriceMax={setSelectedPriceMax}
                minRating={minRating}
                onSelectMinRating={setMinRating}
                inStockOnly={inStockOnly}
                onToggleInStockOnly={setInStockOnly}
                onReset={resetFilters}
              />
            </div>
          </div>
        )}

        {/* Mobile Filter Modal */}
        {isMobileFiltersOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsMobileFiltersOpen(false)} />
            <div className="relative ml-auto w-4/5 max-w-sm h-full bg-[#12100F] border-l border-white/10 p-6 overflow-y-auto">
              <FilterSidebar
                selectedCategory={selectedCategory}
                onSelectCategory={(c) => { setSelectedCategory(c); setIsMobileFiltersOpen(false); }}
                selectedPriceMax={selectedPriceMax}
                onSelectPriceMax={setSelectedPriceMax}
                minRating={minRating}
                onSelectMinRating={setMinRating}
                inStockOnly={inStockOnly}
                onToggleInStockOnly={setInStockOnly}
                onReset={resetFilters}
                onCloseMobile={() => setIsMobileFiltersOpen(false)}
              />
            </div>
          </div>
        )}

        {/* Products Grid */}
        <div className={showDesktopFilters ? "lg:col-span-3" : "lg:col-span-4"}>
          <div className="mb-4 text-xs text-[#9E948C]">
            Showing <strong className="text-white">{filteredProducts.length}</strong> products
          </div>
          <ProductGrid products={filteredProducts} onResetFilters={resetFilters} />
        </div>
      </div>
    </div>
  );
}
