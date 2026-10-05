"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Heart, ShoppingBag, User } from "lucide-react";
import { useCartStore } from "@/stores/useCartStore";
import { useWishlistStore } from "@/stores/useWishlistStore";
import { useAuthStore } from "@/stores/useAuthStore";
import { NotificationBell } from "./NotificationBell";
import Image from "next/image";

export function NavLinks() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const rawCartCount = useCartStore((s) => s.getTotalItems());
  const rawWishlistCount = useWishlistStore((s) => s.getTotalItems());
  const { user, isAuthenticated } = useAuthStore();

  const cartItemsCount = mounted ? rawCartCount : 0;
  const wishlistItemsCount = mounted ? rawWishlistCount : 0;
  const isAuth = mounted ? isAuthenticated : false;

  return (
    <div className="flex items-center gap-1 sm:gap-2.5">
      {/* 1. Wishlist */}
      <Link
        href="/wishlist"
        aria-label={`Wishlist, ${wishlistItemsCount} items`}
        className="relative p-2 rounded-full text-stone-300 hover:text-white hover:bg-white/5 transition-colors"
      >
        <Heart className="w-5 h-5 transition-transform hover:scale-110 active:scale-95" />
        {wishlistItemsCount > 0 && (
          <span className="absolute top-0.5 right-0.5 min-w-[18px] h-[18px] flex items-center justify-center rounded-full bg-[#FF8A00] text-black text-[10px] font-bold px-1 ring-2 ring-[#0D0B0A] animate-in zoom-in-75 duration-150">
            {wishlistItemsCount}
          </span>
        )}
      </Link>

      {/* 2. Notifications */}
      <NotificationBell />

      {/* 3. Account Profile */}
      <Link
        href={isAuth ? "/account" : "/auth/sign-in"}
        aria-label="Account profile"
        className="p-1.5 rounded-full text-stone-300 hover:text-white hover:bg-white/5 transition-colors flex items-center"
      >
        {isAuth && user?.avatarUrl ? (
          <div className="relative w-7 h-7 rounded-full overflow-hidden ring-1 ring-[#FF8A00]">
            <Image src={user.avatarUrl} alt={user.firstName || "User"} fill className="object-cover" />
          </div>
        ) : (
          <div className="p-1">
            <User className="w-5 h-5 transition-transform hover:scale-110 active:scale-95" />
          </div>
        )}
      </Link>

      {/* 4. Cart */}
      <Link
        id="navbar-cart-icon"
        href="/cart"
        aria-label={`Shopping bag, ${cartItemsCount} items`}
        className="relative p-2 rounded-full text-stone-300 hover:text-white hover:bg-white/5 transition-colors"
      >
        <ShoppingBag className="w-5 h-5 text-[#FF8A00] transition-transform hover:scale-110 active:scale-95" />
        {cartItemsCount > 0 && (
          <span className="absolute top-0.5 right-0.5 min-w-[18px] h-[18px] flex items-center justify-center rounded-full bg-[#FF8A00] text-black text-[10px] font-bold px-1 ring-2 ring-[#0D0B0A] animate-in zoom-in-75 duration-150">
            {cartItemsCount}
          </span>
        )}
      </Link>
    </div>
  );
}
