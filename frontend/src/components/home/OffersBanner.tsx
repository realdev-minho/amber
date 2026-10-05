"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Tag, Zap } from "lucide-react";

export function OffersBanner() {
  return (
    <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative rounded-3xl overflow-hidden glass-panel border border-[#FF8A00]/30 p-8 sm:p-12 amber-glow">
        <div className="absolute -right-10 -bottom-10 w-96 h-96 rounded-full bg-[#FF8A00]/15 blur-[100px] pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF8A00]/15 border border-[#FF8A00]/30 text-[#FF8A00] text-xs font-bold mb-4">
              <Zap className="w-3.5 h-3.5 fill-[#FF8A00]" /> Limited Drop
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#FBF8F5] leading-tight">
              Up to <span className="text-[#FF8A00]">30% Off</span> Signature Horology & Studio Audio
            </h2>
            <p className="mt-4 text-sm text-[#9E948C] max-w-md leading-relaxed">
              Curated precision instruments and high-fidelity acoustics. Every item includes complimentary white-glove courier shipping and certificate of authenticity.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/offers"
                className="px-6 py-3 rounded-xl bg-[#FF8A00] hover:bg-[#F97316] text-black font-bold text-xs flex items-center gap-2 transition-all active:scale-95 shadow-lg shadow-[#FF8A00]/25"
              >
                Claim Exclusive Deals
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <div className="flex items-center gap-2 text-xs text-stone-400">
                <Tag className="w-4 h-4 text-[#FF8A00]" /> Use code <strong className="text-white font-mono">AMBER15</strong> at checkout
              </div>
            </div>
          </div>

          <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1000&auto=format&fit=crop&q=80"
              alt="Luxury Swiss Chronograph featured offer"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs">
              <span className="font-semibold text-white">Classic Chronograph Automatic</span>
              <span className="font-bold text-[#FF8A00]">From ₦285,000</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
