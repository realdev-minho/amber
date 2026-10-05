"use client";

import { useState } from "react";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/stores/useCartStore";
import { toast } from "@/stores/useToastStore";
import { ArrowRight, Tag, Check } from "lucide-react";

export function CartSummary() {
  const { getSubtotal, getDeliveryFee, getTotal } = useCartStore();
  const [promoCode, setPromoCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);

  const subtotal = getSubtotal();
  const deliveryFee = getDeliveryFee();
  const finalTotal = Math.max(0, getTotal() - discountAmount);

  const applyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoCode.trim()) return;

    if (promoCode.toUpperCase() === "AMBER15") {
      const discount = Math.round(subtotal * 0.15);
      setDiscountAmount(discount);
      setAppliedPromo("AMBER15 (15% Off)");
      toast.success("Promo Code Applied", "15% off applied to your order!");
    } else {
      toast.error("Invalid Code", "Please enter a valid promotion code (try AMBER15).");
    }
  };

  return (
    <div className="p-6 rounded-3xl glass-panel border border-white/8 space-y-6">
      <h3 className="text-base font-bold text-[#FBF8F5]">Order Summary</h3>

      {/* Coupon form */}
      <form onSubmit={applyPromo} className="flex gap-2">
        <div className="relative flex-1">
          <Tag className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Promo code"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#12100F] border border-white/10 text-xs text-white uppercase placeholder:normal-case focus:outline-none focus:border-[#FF8A00]"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 rounded-xl bg-white/8 hover:bg-white/15 text-xs font-semibold text-white transition-colors"
        >
          Apply
        </button>
      </form>

      {appliedPromo && (
        <div className="flex items-center justify-between text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20">
          <span className="flex items-center gap-1.5 font-medium">
            <Check className="w-3.5 h-3.5" /> {appliedPromo}
          </span>
          <button
            type="button"
            onClick={() => {
              setAppliedPromo(null);
              setDiscountAmount(0);
              setPromoCode("");
            }}
            className="text-[11px] underline text-stone-400 hover:text-white"
          >
            Remove
          </button>
        </div>
      )}

      {/* Financial lines */}
      <div className="space-y-3 text-xs text-stone-300 pt-2 border-t border-white/8">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span className="font-semibold text-white">{formatPrice(subtotal)}</span>
        </div>

        {discountAmount > 0 && (
          <div className="flex justify-between text-emerald-400">
            <span>Special Promotion</span>
            <span className="font-semibold">-{formatPrice(discountAmount)}</span>
          </div>
        )}

        <div className="flex justify-between">
          <span>Estimated Delivery</span>
          <span className="font-semibold text-white">
            {deliveryFee === 0 ? "Free" : formatPrice(deliveryFee)}
          </span>
        </div>

        {deliveryFee > 0 && (
          <p className="text-[11px] text-[#FF8A00]">
            Add {formatPrice(100000 - subtotal)} more for free delivery
          </p>
        )}

        <div className="flex justify-between text-sm sm:text-base font-bold text-white pt-3 border-t border-white/8">
          <span>Total</span>
          <span className="text-[#FF8A00]">{formatPrice(finalTotal)}</span>
        </div>
      </div>

      {/* Checkout CTA */}
      <Link
        href="/checkout"
        className="w-full py-3.5 rounded-2xl bg-[#FF8A00] hover:bg-[#F97316] text-black font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xl shadow-[#FF8A00]/25 transition-all active:scale-95"
      >
        Proceed to Checkout <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
