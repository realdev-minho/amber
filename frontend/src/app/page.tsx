import { Hero } from "@/components/home/Hero";
import { CategorySection } from "@/components/home/CategorySection";
import { WhyAmber } from "@/components/home/WhyAmber";
import { Testimonials } from "@/components/home/Testimonials";
import { FaqSection } from "@/components/home/FaqSection";
import { MarketplaceCta } from "@/components/home/MarketplaceCta";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero with photo transitions & marketplace CTAs */}
      <Hero />

      {/* 2. Category explorer directing users to specific marketplace collections */}
      <CategorySection />

      {/* 3. The Amber Standard: Editorial article on why Amber is the best */}
      <WhyAmber />

      {/* 4. Tastemaker Testimonials & Verified Buyer Endorsements */}
      <Testimonials />

      {/* 5. Frequently Asked Questions interactive accordion */}
      <FaqSection />

      {/* 6. High-converting direct portal to the Marketplace (/shop) */}
      <MarketplaceCta />
    </div>
  );
}
