import Link from "next/link";
import { ShieldCheck, Truck, RotateCcw, CreditCard } from "lucide-react";
import { Logo } from "./Navbar/Logo";

export function Footer() {
  const trustFeatures = [
    { icon: Truck, title: "Expedited Shipping", desc: "Doorstep delivery nationwide" },
    { icon: ShieldCheck, title: "100% Authentic", desc: "Curated designer items" },
    { icon: RotateCcw, title: "Seamless Returns", desc: "7-day effortless returns" },
    { icon: CreditCard, title: "Secure Checkout", desc: "Encrypted transactions" },
  ];

  return (
    <footer className="w-full bg-[#12100F] border-t border-white/8 pt-16 pb-24 md:pb-16 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Trust features banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-14 border-b border-white/8">
          {trustFeatures.map((feat) => {
            const Icon = feat.icon;
            return (
              <div key={feat.title} className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-[#FF8A00]/10 border border-[#FF8A00]/20 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-[#FF8A00]" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-[#FBF8F5]">{feat.title}</h4>
                  <p className="text-[11px] text-[#9E948C]">{feat.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Links grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 py-12">
          <div className="col-span-2">
            <Logo />
            <p className="mt-3 text-xs text-[#9E948C] max-w-sm leading-relaxed">
              Your premium shop for everything. Curating exceptional fashion, acoustic
              audio, mechanical horology, and architectural home objects.
            </p>
            <p className="mt-4 text-xs text-stone-500">
              © {new Date().getFullYear()} Amber Shop E-commerce. All rights reserved.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#FBF8F5] mb-3">
              Marketplace
            </h4>
            <ul className="space-y-2 text-xs text-[#9E948C]">
              <li><Link href="/shop" className="hover:text-[#FF8A00] transition-colors">Discover All</Link></li>
              <li><Link href="/shop/fashion" className="hover:text-[#FF8A00] transition-colors">Fashion</Link></li>
              <li><Link href="/shop/electronics" className="hover:text-[#FF8A00] transition-colors">Electronics</Link></li>
              <li><Link href="/shop/watches" className="hover:text-[#FF8A00] transition-colors">Watches</Link></li>
              <li><Link href="/offers" className="hover:text-[#FF8A00] transition-colors">Limited Offers</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#FBF8F5] mb-3">
              Account
            </h4>
            <ul className="space-y-2 text-xs text-[#9E948C]">
              <li><Link href="/account" className="hover:text-[#FF8A00] transition-colors">My Profile</Link></li>
              <li><Link href="/orders" className="hover:text-[#FF8A00] transition-colors">Order Tracking</Link></li>
              <li><Link href="/wishlist" className="hover:text-[#FF8A00] transition-colors">Saved Wishlist</Link></li>
              <li><Link href="/cart" className="hover:text-[#FF8A00] transition-colors">Cart</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#FBF8F5] mb-3">
              Support
            </h4>
            <ul className="space-y-2 text-xs text-[#9E948C]">
              <li><span className="cursor-pointer hover:text-[#FF8A00] transition-colors">Shipping Guide</span></li>
              <li><span className="cursor-pointer hover:text-[#FF8A00] transition-colors">Authenticity Guarantee</span></li>
              <li><span className="cursor-pointer hover:text-[#FF8A00] transition-colors">Customer Care</span></li>
              <li><span className="cursor-pointer hover:text-[#FF8A00] transition-colors">Privacy & Terms</span></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
