import { Star, CheckCircle, Quote } from "lucide-react";
import Image from "next/image";

const TESTIMONIALS = [
  {
    name: "Dr. Amara Okafor",
    role: "Architectural Designer, Lagos",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
    quote: "Amber solved the perpetual anxiety of ordering high-end craftsmanship online. The ceramic acoustic drivers arrived in immaculate condition within 24 hours. The packaging alone felt like a luxury gallery delivery.",
    rating: 5,
    tag: "Verified Collector",
  },
  {
    name: "Marcus Vance",
    role: "Creative Director, London & Abuja",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
    quote: "Finally, a marketplace that curates rather than dumps inventory. The silk-linen trench and leather goods I purchased have superior stitching to department store brands at twice the price.",
    rating: 5,
    tag: "Member since 2025",
  },
  {
    name: "Zainab Al-Hassan",
    role: "Fintech Executive, Accra",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80",
    quote: "The checkout was seamless, and address auto-save actually works. Having a direct line to client support via WhatsApp gave me total peace of mind for high-ticket orders.",
    rating: 5,
    tag: "Verified Buyer",
  },
];

export function Testimonials() {
  return (
    <section className="py-20 lg:py-28 relative overflow-hidden bg-[#0A0807] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-stone-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Quote className="w-3.5 h-3.5 text-[#FF8A00]" /> Tastemaker Reviews
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#FBF8F5] tracking-tight">
            Endorsed by Those with <span className="text-gradient-amber">Discerning Taste</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#9E948C]">
            Real feedback from our members across fashion, architecture, and technology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="p-8 rounded-3xl glass-panel border border-white/8 hover:border-[#FF8A00]/25 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-[#FF8A00] mb-6">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-stone-200 leading-relaxed italic mb-8">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-4 pt-6 border-t border-white/8">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border border-[#FF8A00]/40 flex-shrink-0">
                  <Image src={t.image} alt={t.name} fill className="object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-sm font-bold text-white truncate">{t.name}</h4>
                  <p className="text-xs text-[#9E948C] truncate">{t.role}</p>
                  <div className="flex items-center gap-1 text-[11px] text-[#FF8A00] mt-0.5">
                    <CheckCircle className="w-3 h-3" />
                    <span>{t.tag}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
