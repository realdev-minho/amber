"use client";

import { useEffect } from "react";
import Link from "next/link";
import confetti from "canvas-confetti";
import { CheckCircle2, Package, ArrowRight, Truck, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export function OrderSuccessClient({ orderId }: { orderId: string }) {
  useEffect(() => {
    // Trigger confetti celebration on load
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#FF8A00", "#F97316", "#FBF8F5", "#FFB259"],
      });
    } catch {
      // Fallback if canvas is unavailable
    }
  }, []);

  return (
    <div className="max-w-2xl mx-auto px-4 py-16 sm:py-24 text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-20 h-20 rounded-full bg-[#FF8A00]/15 border-2 border-[#FF8A00] flex items-center justify-center mx-auto mb-6 text-[#FF8A00] shadow-2xl shadow-[#FF8A00]/25"
      >
        <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="text-3xl sm:text-4xl font-extrabold text-[#FBF8F5] tracking-tight"
      >
        Order Confirmed!
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="text-xs sm:text-sm text-[#9E948C] mt-2 max-w-md mx-auto leading-relaxed"
      >
        Thank you for purchasing with Amber. We have received your order and dispatched confirmation details to your registered email.
      </motion.p>

      {/* Order info card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="my-8 p-6 rounded-3xl glass-panel-elevated border border-white/10 text-left space-y-4"
      >
        <div className="flex items-center justify-between pb-3 border-b border-white/8 text-xs">
          <span className="text-[#9E948C]">Order Reference</span>
          <span className="font-mono font-bold text-white">#{orderId}</span>
        </div>

        <div className="flex items-center justify-between pb-3 border-b border-white/8 text-xs">
          <span className="text-[#9E948C]">Estimated Delivery</span>
          <span className="font-semibold text-emerald-400 flex items-center gap-1.5">
            <Truck className="w-3.5 h-3.5" /> 2–3 Business Days
          </span>
        </div>

        <div className="flex items-center justify-between text-xs">
          <span className="text-[#9E948C]">Payment Status</span>
          <span className="font-semibold text-emerald-400 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" /> Confirmed & Secured
          </span>
        </div>
      </motion.div>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          href={`/orders/${orderId}`}
          className="px-6 py-3.5 rounded-2xl bg-[#FF8A00] hover:bg-[#F97316] text-black font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xl shadow-[#FF8A00]/25 transition-all active:scale-95"
        >
          <Package className="w-4 h-4" /> Track Order Status
        </Link>

        <Link
          href="/shop"
          className="px-6 py-3.5 rounded-2xl bg-white/6 hover:bg-white/12 border border-white/12 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all active:scale-95"
        >
          Continue Shopping <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
