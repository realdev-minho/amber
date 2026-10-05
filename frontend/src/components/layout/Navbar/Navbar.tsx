"use client";

import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { NavLinks } from "./NavLinks";
import { GoToShopButton } from "./GoToShopButton";

export function Navbar() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0D0B0A]/85 backdrop-blur-xl border-b border-white/8 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Left section: Logo */}
          <div className="flex items-center shrink-0">
            <Logo />
          </div>

          {/* Right section: On homepage, ONLY "Go to Shop" button. On shop/marketplace, ONLY Wishlist, Notifications, Profile, Cart */}
          <div className="flex items-center shrink-0">
            {isHomePage ? <GoToShopButton /> : <NavLinks />}
          </div>
        </div>
      </div>
    </header>
  );
}
