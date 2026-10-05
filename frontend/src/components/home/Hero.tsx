"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=1600&auto=format&fit=crop&q=80",
];

export function Hero() {
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full min-h-[580px] lg:min-h-[680px] flex items-center overflow-hidden py-16 sm:py-24">
      {/* Animated transitioning background images with warm obsidian tint */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIdx}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.28, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.8, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={HERO_IMAGES[currentIdx]}
              alt="Amber hero ambient backdrop"
              fill
              priority
              className="object-cover object-center filter blur-[1px]"
            />
          </motion.div>
        </AnimatePresence>
        {/* Obsidian gradient fades */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0B0A] via-[#0D0B0A]/80 to-[#0D0B0A]/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D0B0A] via-transparent to-[#0D0B0A]" />
        {/* Soft amber glow center-left */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#FF8A00]/15 rounded-full blur-[140px] pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl">
          {/* Tag pill */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/6 border border-white/10 backdrop-blur-md mb-6"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#FF8A00]" />
            <span className="text-xs font-medium text-[#FBF8F5]">
              Curated Spring & Summer 2026 Collection
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#FBF8F5] leading-[1.08]"
          >
            Shop Better.
            <br />
            <span className="text-gradient-amber">Live Better.</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-base sm:text-lg text-[#9E948C] leading-relaxed max-w-xl"
          >
            Amber connects discerning shoppers with world-class essentials across luxury fashion,
            studio acoustics, Swiss horology, and artisanal home craftsmanship.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <Link
              href="/shop"
              className="px-7 py-3.5 rounded-2xl bg-[#FF8A00] hover:bg-[#F97316] text-black font-bold text-sm flex items-center gap-2.5 transition-all shadow-xl shadow-[#FF8A00]/20 active:scale-95 amber-glow-sm"
            >
              Shop Now
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/offers"
              className="px-7 py-3.5 rounded-2xl bg-white/6 hover:bg-white/10 border border-white/12 text-[#FBF8F5] font-semibold text-sm backdrop-blur-md transition-all active:scale-95"
            >
              Explore Offers
            </Link>
          </motion.div>

          {/* Image carousel indicators */}
          <div className="mt-12 flex items-center gap-2">
            {HERO_IMAGES.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIdx(i)}
                aria-label={`Jump to hero slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === currentIdx ? "w-8 bg-[#FF8A00]" : "w-2 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
