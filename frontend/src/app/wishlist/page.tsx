"use client";

import Link from "next/link";
import { useWishlistStore } from "@/stores/useWishlistStore";
import { useCartStore } from "@/stores/useCartStore";
import { ProductCard } from "@/components/catalog/ProductCard";
import { Heart, ArrowRight, ShoppingBag } from "lucide-react";

export default function WishlistPage() {
  const { items, clearWishlist } = useWishlistStore();
  const addItem = useCartStore((s) => s.addItem);

  const moveAllToCart = () => {
    items.forEach((product) => addItem(product));
    clearWishlist();
  };

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 rounded-3xl bg-[#FF8A00]/10 border border-[#FF8A00]/25 flex items-center justify-center mb-6">
          <Heart className="w-10 h-10 text-[#FF8A00]" />
        </div>
        <h1 className="text-3xl font-extrabold text-[#FBF8F5] tracking-tight">
          Save products you love.
        </h1>
        <p className="text-sm text-[#9E948C] max-w-md mt-2 mb-8 leading-relaxed">
          Keep track of exceptional pieces you have your eye on. Tap the heart on any product to save it here.
        </p>
        <Link
          href="/shop"
          className="px-8 py-3.5 rounded-2xl bg-[#FF8A00] hover:bg-[#F97316] text-black font-bold text-xs sm:text-sm flex items-center gap-2 shadow-xl shadow-[#FF8A00]/20 transition-all active:scale-95"
        >
          Discover Products <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 border-b border-white/8 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-[#FBF8F5] tracking-tight">Saved Wishlist</h1>
          <p className="text-xs text-[#9E948C] mt-1">
            You have <strong className="text-white">{items.length}</strong> item{items.length === 1 ? "" : "s"} saved for later
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={moveAllToCart}
            className="px-5 py-2.5 rounded-xl bg-[#FF8A00] hover:bg-[#F97316] text-black font-bold text-xs flex items-center gap-2 transition-all active:scale-95 shadow-md shadow-[#FF8A00]/20"
          >
            <ShoppingBag className="w-3.5 h-3.5" /> Move All To Bag
          </button>
          <button
            type="button"
            onClick={clearWishlist}
            className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-stone-300 hover:text-white text-xs font-semibold transition-colors"
          >
            Clear Wishlist
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-5">
        {items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
