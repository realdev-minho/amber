import { ShieldCheck, Truck, Sparkles, Gem, ArrowRight } from "lucide-react";
import Link from "next/link";

const PILLARS = [
  {
    icon: Gem,
    title: "Atelier & Direct Provenance",
    desc: "Every silhouette, acoustic driver, and timepiece is sourced directly from certified ateliers and verified manufacturers. Zero counterfeits.",
  },
  {
    icon: Truck,
    title: "White-Glove Express Fulfillment",
    desc: "Precision tracking from our climate-controlled fulfillment network to your doorstep within 24 to 48 hours.",
  },
  {
    icon: ShieldCheck,
    title: "Transparent & Guaranteed",
    desc: "Clear upfront checkout pricing with zero surprise import tariffs, backed by our 14-day hassle-free buyer protection guarantee.",
  },
  {
    icon: Sparkles,
    title: "Editorial Curation",
    desc: "Instead of millions of low-quality cloned listings, Amber curates timeless luxury and everyday essentials selected by industry tastemakers.",
  },
];

const METRICS = [
  { value: "50,000+", label: "Active Members" },
  { value: "99.8%", label: "On-Time Dispatch" },
  { value: "100%", label: "Authenticity Verified" },
  { value: "4.92 / 5", label: "Customer Satisfaction" },
];

export function WhyAmber() {
  return (
    <section className="py-20 lg:py-28 relative overflow-hidden border-t border-white/5">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#FF8A00]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF8A00]/10 border border-[#FF8A00]/25 text-[#FF8A00] text-xs font-semibold uppercase tracking-wider mb-4">
            The Amber Standard
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#FBF8F5] tracking-tight leading-tight">
            Why Discerning Shoppers Choose <span className="text-gradient-amber">Amber</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#9E948C] leading-relaxed">
            We built Amber to cure the frustration of cluttered mass marketplaces. High craftsmanship, guaranteed provenance, and a shopping experience that respects your taste.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {PILLARS.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="p-7 rounded-3xl glass-panel border border-white/8 hover:border-[#FF8A00]/30 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#FF8A00]/10 border border-[#FF8A00]/20 flex items-center justify-center text-[#FF8A00] mb-6 group-hover:scale-105 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-[#FBF8F5] mb-2">{p.title}</h3>
                  <p className="text-xs sm:text-sm text-[#9E948C] leading-relaxed">{p.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Brand Metrics Strip */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#1A1614] via-[#211B18] to-[#1A1614] border border-white/8 grid grid-cols-2 lg:grid-cols-4 gap-6 items-center">
          {METRICS.map((m) => (
            <div key={m.label} className="text-center sm:text-left">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#FBF8F5] tracking-tight">{m.value}</div>
              <div className="text-xs text-[#9E948C] mt-1 font-medium">{m.label}</div>
            </div>
          ))}
        </div>

        {/* CTA to Marketplace */}
        <div className="mt-12 text-center">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-[#FF8A00] hover:bg-[#F97316] text-black font-bold text-sm shadow-xl shadow-[#FF8A00]/20 transition-all active:scale-95 amber-glow-sm"
          >
            Explore The Marketplace
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
