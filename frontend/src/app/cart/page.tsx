"use client";

import Link from "next/link";
import { useCartStore } from "@/stores/useCartStore";
import { CartItemList } from "@/components/cart/CartItemList";
import { CartSummary } from "@/components/cart/CartSummary";
import { ShoppingBag, ArrowRight } from "lucide-react";

import { BackButton } from "@/components/ui/BackButton";

export default function CartPage() {
  const items = useCartStore((s) => s.items);

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 rounded-3xl bg-[#FF8A00]/10 border border-[#FF8A00]/25 flex items-center justify-center mb-6">
          <ShoppingBag className="w-10 h-10 text-[#FF8A00]" />
        </div>
        <h1 className="text-3xl font-extrabold text-[#FBF8F5] tracking-tight">
          Your cart is waiting.
        </h1>
        <p className="text-sm text-[#9E948C] max-w-md mt-2 mb-8 leading-relaxed">
          Explore our seasonal curation of bespoke clothing, studio monitors, timepieces, and home goods.
        </p>
        <Link
          href="/shop"
          className="px-8 py-3.5 rounded-2xl bg-[#FF8A00] hover:bg-[#F97316] text-black font-bold text-xs sm:text-sm flex items-center gap-2 shadow-xl shadow-[#FF8A00]/20 transition-all active:scale-95"
        >
          Start Shopping <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <BackButton label="Continue Shopping" fallbackHref="/shop" />
      <div className="pb-8 border-b border-white/8 mb-8">
        <h1 className="text-3xl font-extrabold text-[#FBF8F5] tracking-tight">Shopping Bag</h1>
        <p className="text-xs text-[#9E948C] mt-1">Review your selections and proceed to checkout</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        <div className="lg:col-span-8">
          <CartItemList items={items} />
        </div>

        <div className="lg:col-span-4 sticky top-28">
          <CartSummary />
        </div>
      </div>
    </div>
  );
}
