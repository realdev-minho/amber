import Link from "next/link";
import { ArrowRight, ShoppingBag, Smartphone } from "lucide-react";

export function MarketplaceCta() {
  return (
    <section className="py-20 lg:py-28 relative overflow-hidden border-t border-white/5">
      {/* Background glow and gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FF8A00]/5 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#FF8A00]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="rounded-3xl p-8 sm:p-14 lg:p-16 bg-gradient-to-br from-[#1F1916] via-[#171312] to-[#0D0B0A] border border-[#FF8A00]/25 shadow-2xl relative overflow-hidden">
          {/* Decorative amber ring */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full border border-[#FF8A00]/15 pointer-events-none" />
          <div className="absolute -right-10 -bottom-10 w-60 h-60 rounded-full border border-[#FF8A00]/10 pointer-events-none" />

          <div className="max-w-2xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF8A00]/15 border border-[#FF8A00]/30 text-[#FF8A00] text-xs font-bold uppercase tracking-wider mb-5">
              <ShoppingBag className="w-3.5 h-3.5" /> Instant Discovery
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#FBF8F5] tracking-tight leading-tight">
              Ready to Upgrade Your Everyday?
            </h2>

            <p className="mt-4 text-sm sm:text-base text-[#9E948C] leading-relaxed">
              Step into the marketplace. Discover thousands of curated pieces across audio, horology, footwear, and living spaces — ready for fast express delivery.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/shop"
                className="px-8 py-4 rounded-2xl bg-[#FF8A00] hover:bg-[#F97316] text-black font-bold text-sm flex items-center gap-2 shadow-xl shadow-[#FF8A00]/25 transition-all active:scale-95 amber-glow-sm"
              >
                Enter Marketplace
                <ArrowRight className="w-4 h-4" />
              </Link>

              <div className="inline-flex items-center gap-2.5 px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-xs font-semibold text-stone-300">
                <Smartphone className="w-4 h-4 text-[#FF8A00]" />
                <span>Mobile APK App Coming to Android</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
