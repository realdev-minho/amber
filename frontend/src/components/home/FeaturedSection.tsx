"use client";

import Link from "next/link";
import { ProductCard } from "@/components/catalog/ProductCard";
import { getFeaturedProducts } from "@/constants/products";
import { ArrowRight, Flame } from "lucide-react";

export function FeaturedSection() {
  const featured = getFeaturedProducts().slice(0, 10);

  return (
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-end justify-between mb-8">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#FF8A00]">
            <Flame className="w-3.5 h-3.5" /> Handpicked Excellence
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#FBF8F5] mt-1">
            Featured Marketplace Highlights
          </h2>
        </div>
        <Link
          href="/shop"
          className="text-xs font-semibold text-stone-300 hover:text-[#FF8A00] flex items-center gap-1 transition-colors"
        >
          Explore All <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Grid: 2 columns mobile, 3 columns tablet, 4-5 columns desktop */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-5">
        {featured.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
