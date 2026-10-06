"use client";

import { Product } from "@/types";
import { ProductCard } from "./ProductCard";
import { PackageOpen, RotateCcw } from "lucide-react";

interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
  onResetFilters?: () => void;
}

export function ProductGrid({ products, isLoading, onResetFilters }: ProductGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl bg-[#1A1614] border border-white/5 overflow-hidden animate-pulse flex flex-col"
          >
            <div className="aspect-[4/5] bg-white/5" />
            <div className="p-4 space-y-2.5">
              <div className="h-3 w-16 bg-white/5 rounded" />
              <div className="h-4 w-3/4 bg-white/10 rounded" />
              <div className="h-4 w-20 bg-white/10 rounded mt-3" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="py-20 flex flex-col items-center justify-center text-center px-4 rounded-3xl glass-panel border border-white/6">
        <div className="w-16 h-16 rounded-3xl bg-[#FF8A00]/10 border border-[#FF8A00]/20 flex items-center justify-center mb-4">
          <PackageOpen className="w-8 h-8 text-[#FF8A00]" />
        </div>
        <h3 className="text-lg font-bold text-[#FBF8F5]">No products found</h3>
        <p className="text-xs text-[#9E948C] max-w-sm mt-1 mb-6 leading-relaxed">
          We could not find any products matching your selected criteria. Try adjusting your filters or search terms.
        </p>
        {onResetFilters && (
          <button
            type="button"
            onClick={onResetFilters}
            className="px-5 py-2.5 rounded-xl bg-[#FF8A00] hover:bg-[#F97316] text-black font-semibold text-xs flex items-center gap-2 transition-all active:scale-95"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset Filters
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
