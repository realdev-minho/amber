"use client";

import { AccountLayout } from "@/components/account/AccountLayout";
import { useAuthStore } from "@/stores/useAuthStore";
import { useCheckoutStore } from "@/stores/useCheckoutStore";
import { useWishlistStore } from "@/stores/useWishlistStore";
import Link from "next/link";
import { Package, Heart, MapPin, ArrowRight } from "lucide-react";

export default function AccountDashboardPage() {
  const { user } = useAuthStore();
  const { savedAddresses } = useCheckoutStore();
  const wishlistCount = useWishlistStore((s) => s.getTotalItems());

  const defaultAddr = savedAddresses.find((a) => a.isDefault) || savedAddresses[0];

  return (
    <AccountLayout>
      <div className="space-y-8">
        <div>
          <span className="text-xs font-semibold text-[#FF8A00] uppercase tracking-wider">
            Account Dashboard
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#FBF8F5] tracking-tight mt-1">
            Welcome back, {user?.firstName}
          </h1>
          <p className="text-xs text-[#9E948C] mt-1">
            Manage your personal settings, addresses, and track real-time delivery status.
          </p>
        </div>

        {/* Quick summary stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            href="/orders"
            className="p-5 rounded-2xl bg-[#1A1614] border border-white/6 hover:border-[#FF8A00]/40 transition-all flex items-center justify-between group"
          >
            <div>
              <p className="text-xs text-[#9E948C]">Active Orders</p>
              <p className="text-2xl font-bold text-white mt-1">1</p>
            </div>
            <div className="p-3 rounded-xl bg-[#FF8A00]/10 text-[#FF8A00] group-hover:scale-110 transition-transform">
              <Package className="w-5 h-5" />
            </div>
          </Link>

          <Link
            href="/wishlist"
            className="p-5 rounded-2xl bg-[#1A1614] border border-white/6 hover:border-[#FF8A00]/40 transition-all flex items-center justify-between group"
          >
            <div>
              <p className="text-xs text-[#9E948C]">Saved Items</p>
              <p className="text-2xl font-bold text-white mt-1">{wishlistCount}</p>
            </div>
            <div className="p-3 rounded-xl bg-[#FF8A00]/10 text-[#FF8A00] group-hover:scale-110 transition-transform">
              <Heart className="w-5 h-5" />
            </div>
          </Link>

          <Link
            href="/account/addresses"
            className="p-5 rounded-2xl bg-[#1A1614] border border-white/6 hover:border-[#FF8A00]/40 transition-all flex items-center justify-between group"
          >
            <div>
              <p className="text-xs text-[#9E948C]">Addresses</p>
              <p className="text-2xl font-bold text-white mt-1">{savedAddresses.length}</p>
            </div>
            <div className="p-3 rounded-xl bg-[#FF8A00]/10 text-[#FF8A00] group-hover:scale-110 transition-transform">
              <MapPin className="w-5 h-5" />
            </div>
          </Link>
        </div>

        {/* Default Shipping Address */}
        <div className="p-5 rounded-2xl bg-[#1A1614] border border-white/6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#FBF8F5] flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#FF8A00]" /> Primary Delivery Location
            </h3>
            <Link href="/account/addresses" className="text-xs text-[#FF8A00] hover:underline">
              Change
            </Link>
          </div>
          {defaultAddr ? (
            <div className="text-xs text-stone-300 space-y-1">
              <p className="font-semibold text-white">{defaultAddr.fullName}</p>
              <p>{defaultAddr.street} {defaultAddr.apartment && `• ${defaultAddr.apartment}`}</p>
              <p>{defaultAddr.city}, {defaultAddr.state}, {defaultAddr.country}</p>
              <p className="text-stone-400">Phone: {defaultAddr.phone}</p>
            </div>
          ) : (
            <p className="text-xs text-stone-400">No default address saved yet.</p>
          )}
        </div>

        {/* Recent Order Preview */}
        <div className="p-5 rounded-2xl bg-[#1A1614] border border-white/6 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white">Order #AMB-849201</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-semibold">
                In Transit
              </span>
            </div>
            <p className="text-xs text-stone-400 mt-1">Estimated delivery by tomorrow, 4:00 PM</p>
          </div>
          <Link
            href="/orders/AMB-849201"
            className="text-xs font-semibold text-[#FF8A00] hover:underline flex items-center gap-1"
          >
            Track Order <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </AccountLayout>
  );
}
