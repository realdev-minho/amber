"use client";

import Image from "next/image";
import { useCartStore } from "@/stores/useCartStore";
import { formatPrice } from "@/lib/utils";
import { ShieldCheck } from "lucide-react";

export function CheckoutOrderSummary({ deliveryFeeOverride }: { deliveryFeeOverride?: number }) {
  const { items, getSubtotal, getDeliveryFee } = useCartStore();
  const subtotal = getSubtotal();
  const deliveryFee = deliveryFeeOverride !== undefined ? deliveryFeeOverride : getDeliveryFee();
  const total = subtotal + deliveryFee;

  return (
    <div className="p-6 rounded-3xl glass-panel border border-white/8 space-y-6">
      <h3 className="text-sm font-bold text-[#FBF8F5]">Order Overview ({items.length} items)</h3>

      <div className="max-h-60 overflow-y-auto space-y-3 pr-1">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-3">
            <div className="relative w-12 h-14 rounded-lg overflow-hidden bg-black shrink-0 border border-white/10">
              <Image
                src={item.product.images?.[0]?.url || ""}
                alt={item.product.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-white truncate">{item.product.name}</p>
              <p className="text-[11px] text-stone-400">Qty: {item.quantity}</p>
            </div>
            <p className="text-xs font-bold text-white shrink-0">
              {formatPrice(item.price * item.quantity)}
            </p>
          </div>
        ))}
      </div>

      <div className="space-y-2 text-xs text-stone-300 pt-4 border-t border-white/8">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span className="font-semibold text-white">{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span>Delivery</span>
          <span className="font-semibold text-white">
            {deliveryFee === 0 ? "Free" : formatPrice(deliveryFee)}
          </span>
        </div>
        <div className="flex justify-between text-sm sm:text-base font-bold text-white pt-2 border-t border-white/8">
          <span>Total</span>
          <span className="text-[#FF8A00]">{formatPrice(total)}</span>
        </div>
      </div>
    </div>
  );
}
