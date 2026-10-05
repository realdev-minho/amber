"use client";

import { useCheckoutStore, DeliveryMethod } from "@/stores/useCheckoutStore";
import { formatPrice } from "@/lib/utils";
import { Truck, Zap, ArrowRight, ArrowLeft } from "lucide-react";

interface CheckoutDeliveryStepProps {
  onContinue: () => void;
  onBack: () => void;
}

export function CheckoutDeliveryStep({ onContinue, onBack }: CheckoutDeliveryStepProps) {
  const { deliveryMethod, setDeliveryMethod } = useCheckoutStore();

  const methods: {
    id: DeliveryMethod;
    name: string;
    price: number;
    estimate: string;
    description: string;
    icon: typeof Truck;
  }[] = [
    {
      id: "standard",
      name: "Amber Standard Insured Courier",
      price: 3500,
      estimate: "2–3 Business Days",
      description: "Carefully packed with signature required upon drop-off. Free on orders above ₦100,000.",
      icon: Truck,
    },
    {
      id: "express",
      name: "Amber VIP Express Next-Day",
      price: 7500,
      estimate: "Next Day Delivery (by 2:00 PM)",
      description: "Priority expedited shipping with dedicated courier handler and live SMS tracking.",
      icon: Zap,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-[#FBF8F5]">Choose Delivery Method</h2>
        <p className="text-xs text-[#9E948C] mt-1">Select your preferred courier handling speed.</p>
      </div>

      <div className="space-y-3">
        {methods.map((m) => {
          const isSelected = deliveryMethod === m.id;
          const Icon = m.icon;

          return (
            <div
              key={m.id}
              onClick={() => setDeliveryMethod(m.id)}
              className={`p-5 rounded-2xl cursor-pointer border transition-all flex items-start justify-between ${
                isSelected
                  ? "bg-[#FF8A00]/10 border-[#FF8A00] shadow-md shadow-[#FF8A00]/10"
                  : "bg-[#1A1614] border-white/6 hover:border-white/20"
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`p-2.5 rounded-xl border mt-0.5 ${
                    isSelected ? "border-[#FF8A00] bg-[#FF8A00]/20 text-[#FF8A00]" : "border-white/10 text-stone-400"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-white">{m.name}</h4>
                  <p className="text-[11px] text-[#FF8A00] font-semibold">{m.estimate}</p>
                  <p className="text-[11px] text-stone-400 max-w-sm leading-relaxed">{m.description}</p>
                </div>
              </div>

              <span className="text-xs font-bold text-white shrink-0 ml-4">
                {formatPrice(m.price)}
              </span>
            </div>
          );
        })}
      </div>

      <div className="flex gap-3 pt-4">
        <button
          type="button"
          onClick={onBack}
          className="py-3.5 px-5 rounded-2xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-stone-300 flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <button
          type="button"
          onClick={onContinue}
          className="flex-1 py-3.5 rounded-2xl bg-[#FF8A00] hover:bg-[#F97316] text-black font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#FF8A00]/25 transition-all active:scale-95"
        >
          Continue to Payment <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
