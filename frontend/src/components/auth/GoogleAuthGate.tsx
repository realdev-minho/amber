"use client";

import { GoogleOAuthButton } from "./GoogleOAuthButton";
import { Lock, Sparkles, ShieldCheck } from "lucide-react";
import Link from "next/link";

interface GoogleAuthGateProps {
  redirect?: string;
}

export function GoogleAuthGate({ redirect = "/shop" }: GoogleAuthGateProps) {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md p-8 sm:p-10 rounded-3xl glass-panel border border-[#FF8A00]/25 shadow-2xl relative overflow-hidden text-center">
        {/* Amber glow behind badge */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-[#FF8A00]/15 rounded-full blur-[90px] pointer-events-none" />

        {/* Lock / Amber Badge */}
        <div className="relative w-16 h-16 rounded-3xl bg-[#FF8A00]/10 border border-[#FF8A00]/30 flex items-center justify-center mx-auto mb-6 text-[#FF8A00]">
          <Lock className="w-7 h-7" />
          <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#FF8A00] flex items-center justify-center text-black">
            <Sparkles className="w-3 h-3 stroke-[3]" />
          </div>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#FBF8F5] tracking-tight">
          Amber Marketplace Access
        </h2>

        <p className="mt-3 text-xs sm:text-sm text-[#9E948C] leading-relaxed">
          Amber is an exclusive curated destination. Please authenticate with your Google account to explore our catalog, view member pricing, and place orders.
        </p>

        <div className="mt-8 space-y-4">
          <GoogleOAuthButton text="Sign In with Google to Enter Shop" redirect={redirect} />

          <div className="flex items-center justify-center gap-2 text-[11px] text-stone-400 pt-2">
            <ShieldCheck className="w-3.5 h-3.5 text-[#FF8A00]" />
            <span>Google verified authentication required</span>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-white/8">
          <Link
            href="/"
            className="text-xs text-stone-400 hover:text-[#FF8A00] transition-colors"
          >
            ← Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
