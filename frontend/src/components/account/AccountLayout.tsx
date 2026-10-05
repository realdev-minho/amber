"use client";

import { ReactNode, useEffect, useState } from "react";
import { AccountNav } from "./AccountNav";
import { useAuthStore } from "@/stores/useAuthStore";
import { BackButton } from "@/components/ui/BackButton";
import Link from "next/link";
import { User } from "lucide-react";

export function AccountLayout({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 animate-pulse">
        <div className="h-8 w-28 bg-white/5 rounded-full mb-6" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-3 h-64 bg-white/5 rounded-3xl" />
          <div className="lg:col-span-9 h-[500px] bg-white/5 rounded-3xl" />
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto px-4 py-24 text-center">
        <div className="w-16 h-16 rounded-3xl bg-[#FF8A00]/10 border border-[#FF8A00]/25 flex items-center justify-center mx-auto mb-4">
          <User className="w-8 h-8 text-[#FF8A00]" />
        </div>
        <h2 className="text-2xl font-bold text-[#FBF8F5]">Sign in to access your account</h2>
        <p className="text-xs text-[#9E948C] mt-2 mb-6">
          Access your order history, saved delivery locations, and membership profile.
        </p>
        <Link
          href="/auth/sign-in"
          className="px-6 py-3 rounded-xl bg-[#FF8A00] hover:bg-[#F97316] text-black font-bold text-xs inline-block shadow-md transition-all active:scale-95"
        >
          Sign In Now
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <BackButton label="Back to Shop" fallbackHref="/shop" />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-3">
          <AccountNav />
        </div>
        <div className="lg:col-span-9 p-6 sm:p-8 rounded-3xl glass-panel border border-white/8 min-h-[500px]">
          {children}
        </div>
      </div>
    </div>
  );
}
