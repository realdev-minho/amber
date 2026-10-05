"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCheckoutStore } from "@/stores/useCheckoutStore";
import { useCartStore } from "@/stores/useCartStore";
import { useNotificationStore } from "@/stores/useNotificationStore";
import { formatPrice } from "@/lib/utils";
import { MapPin, Truck, CreditCard, ArrowLeft, CheckCircle2 } from "lucide-react";
import Image from "next/image";

interface CheckoutReviewStepProps {
  onBack: () => void;
}

export function CheckoutReviewStep({ onBack }: CheckoutReviewStepProps) {
  const router = useRouter();
  const { shippingAddress, deliveryMethod, paymentMethod, resetCheckout } = useCheckoutStore();
  const { items, getSubtotal, clearCart } = useCartStore();
  const [isPlacing, setIsPlacing] = useState(false);

  const subtotal = getSubtotal();
  const deliveryFee = deliveryMethod === "express" ? 7500 : (subtotal > 100000 ? 0 : 3500);
  const total = subtotal + deliveryFee;

  const handlePlaceOrder = () => {
    setIsPlacing(true);
    const orderId = `AMB-${Math.floor(100000 + Math.random() * 900000)}`;

    setTimeout(() => {
      // 1. Dispatch real-time order confirmation notification
      useNotificationStore.getState().addNotification(
        `Order #${orderId} Confirmed`,
        `Your order of ${items.length} item(s) (${formatPrice(total)}) was placed successfully and is being prepped.`,
        "order"
      );

      // 2. Schedule delivery update notification
      setTimeout(() => {
        useNotificationStore.getState().addNotification(
          `Order #${orderId} Out for Delivery`,
          `White-glove express courier has dispatched package #${orderId} for doorstep delivery.`,
          "delivery"
        );
      }, 8000);

      clearCart();
      resetCheckout();
      router.push(`/order/success/${orderId}`);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-[#FBF8F5]">Review Your Order</h2>
        <p className="text-xs text-[#9E948C] mt-1">Please confirm all shipment and payment specifications before placing.</p>
      </div>

      {/* Details Summary grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-4 rounded-2xl bg-[#1A1614] border border-white/6 text-xs text-stone-300 space-y-1">
          <span className="font-bold text-white flex items-center gap-1.5 mb-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#FF8A00]" /> Ship To
          </span>
          <p className="font-semibold text-white">{shippingAddress?.fullName}</p>
          <p className="line-clamp-2">{shippingAddress?.street}, {shippingAddress?.city}</p>
          <p>{shippingAddress?.phone}</p>
        </div>

        <div className="p-4 rounded-2xl bg-[#1A1614] border border-white/6 text-xs text-stone-300 space-y-1">
          <span className="font-bold text-white flex items-center gap-1.5 mb-1.5">
            <Truck className="w-3.5 h-3.5 text-[#FF8A00]" /> Courier
          </span>
          <p className="font-semibold text-white capitalize">{deliveryMethod} Delivery</p>
          <p className="text-[11px] text-stone-400">
            {deliveryMethod === "express" ? "Next-Day VIP Delivery" : "2-3 Business Days"}
          </p>
          <p className="text-[#FF8A00] font-bold">{formatPrice(deliveryFee)}</p>
        </div>

        <div className="p-4 rounded-2xl bg-[#1A1614] border border-white/6 text-xs text-stone-300 space-y-1">
          <span className="font-bold text-white flex items-center gap-1.5 mb-1.5">
            <CreditCard className="w-3.5 h-3.5 text-[#FF8A00]" /> Payment
          </span>
          <p className="font-semibold text-white uppercase">{paymentMethod}</p>
          <p className="text-[11px] text-emerald-400">Authorized & Protected</p>
          <p className="text-stone-400 text-[10px]">256-bit Tokenized</p>
        </div>
      </div>

      {/* Items List preview */}
      <div className="p-5 rounded-2xl bg-[#1A1614] border border-white/6 space-y-3">
        <h4 className="text-xs font-bold text-white">Items to be Dispatched ({items.length})</h4>
        <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
          {items.map((item) => (
            <div key={item.id} className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-12 rounded-lg overflow-hidden bg-black shrink-0 border border-white/10">
                  <Image src={item.product.images?.[0]?.url || ""} alt={item.product.name} fill className="object-cover" />
                </div>
                <div>
                  <p className="font-semibold text-white truncate max-w-[200px]">{item.product.name}</p>
                  <p className="text-[11px] text-stone-400">Qty: {item.quantity}</p>
                </div>
              </div>
              <span className="font-bold text-white">{formatPrice(item.price * item.quantity)}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <button
          type="button"
          onClick={onBack}
          disabled={isPlacing}
          className="py-3.5 px-5 rounded-2xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-stone-300 flex items-center gap-1.5 transition-colors disabled:opacity-50"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <button
          type="button"
          onClick={handlePlaceOrder}
          disabled={isPlacing}
          className="flex-1 py-3.5 rounded-2xl bg-[#FF8A00] hover:bg-[#F97316] text-black font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xl shadow-[#FF8A00]/25 transition-all active:scale-95 disabled:opacity-50"
        >
          {isPlacing ? (
            <span>Authorizing & Placing Order...</span>
          ) : (
            <>
              <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
              Place Order • {formatPrice(total)}
            </>
          )}
        </button>
      </div>
    </div>
  );
}
