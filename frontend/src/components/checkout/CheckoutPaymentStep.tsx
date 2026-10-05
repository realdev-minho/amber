"use client";

import { useState } from "react";
import { useCheckoutStore, PaymentMethod } from "@/stores/useCheckoutStore";
import { CreditCard, Building2, Smartphone, ShieldCheck, ArrowRight, ArrowLeft } from "lucide-react";

interface CheckoutPaymentStepProps {
  onContinue: () => void;
  onBack: () => void;
}

export function CheckoutPaymentStep({ onContinue, onBack }: CheckoutPaymentStepProps) {
  const { paymentMethod, setPaymentMethod } = useCheckoutStore();
  const [cardNumber, setCardNumber] = useState("4532 •••• •••• 8920");
  const [expiry, setExpiry] = useState("12/28");
  const [cvv, setCvv] = useState("•••");

  const paymentOptions: {
    id: PaymentMethod;
    name: string;
    description: string;
    icon: typeof CreditCard;
  }[] = [
    {
      id: "card",
      name: "Debit / Credit Card",
      description: "Visa, Mastercard, Verve processed via Paystack 256-bit encryption",
      icon: CreditCard,
    },
    {
      id: "transfer",
      name: "Instant Bank Transfer",
      description: "Direct wire to unique Amber dynamic virtual account",
      icon: Building2,
    },
    {
      id: "ussd",
      name: "USSD Banking",
      description: "Fast code payment via GTBank, Zenith, Access, UBA",
      icon: Smartphone,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-[#FBF8F5]">Payment Method</h2>
        <p className="text-xs text-[#9E948C] mt-1">Select a secure payment channel for this order.</p>
      </div>

      <div className="space-y-3">
        {paymentOptions.map((opt) => {
          const isSelected = paymentMethod === opt.id;
          const Icon = opt.icon;

          return (
            <div
              key={opt.id}
              onClick={() => setPaymentMethod(opt.id)}
              className={`p-4 rounded-2xl cursor-pointer border transition-all ${
                isSelected
                  ? "bg-[#FF8A00]/10 border-[#FF8A00] shadow-md shadow-[#FF8A00]/10"
                  : "bg-[#1A1614] border-white/6 hover:border-white/20"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-xl border ${
                    isSelected ? "border-[#FF8A00] bg-[#FF8A00]/20 text-[#FF8A00]" : "border-white/10 text-stone-400"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">{opt.name}</h4>
                  <p className="text-[11px] text-stone-400">{opt.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {paymentMethod === "card" && (
        <div className="p-5 rounded-2xl bg-[#1A1614] border border-white/8 space-y-3 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white">Card Details</span>
            <ShieldCheck className="w-4 h-4 text-[#FF8A00]" />
          </div>
          <div>
            <label className="text-[10px] text-stone-400 block mb-1">Card Number</label>
            <input
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#12100F] border border-white/10 text-xs text-white"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] text-stone-400 block mb-1">Expiry Date</label>
              <input
                type="text"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#12100F] border border-white/10 text-xs text-white"
              />
            </div>
            <div>
              <label className="text-[10px] text-stone-400 block mb-1">CVV</label>
              <input
                type="text"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#12100F] border border-white/10 text-xs text-white"
              />
            </div>
          </div>
        </div>
      )}

      {paymentMethod === "transfer" && (
        <div className="p-5 rounded-2xl bg-[#1A1614] border border-white/8 space-y-2 text-xs text-stone-300">
          <p className="font-bold text-white">Amber Dedicated Virtual Account</p>
          <p className="text-[11px]">Bank: <strong className="text-white">Wema Bank / Amber Pay</strong></p>
          <p className="text-[11px]">Account Number: <strong className="text-[#FF8A00] font-mono text-sm">7890 123 456</strong></p>
          <p className="text-[10px] text-stone-500">Account expires in 30 minutes upon placing order.</p>
        </div>
      )}

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
          Review Order <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
