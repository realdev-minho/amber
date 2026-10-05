"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/useAuthStore";
import { ArrowRight, ShoppingBag } from "lucide-react";

export function GoToShopButton() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();

  const handleGoToShop = () => {
    if (isAuthenticated) {
      router.push("/shop");
    } else {
      // Authenticate exclusively through Google before accessing the marketplace
      router.push("/auth/callback/google?redirect=%2Fshop");
    }
  };

  return (
    <button
      type="button"
      onClick={handleGoToShop}
      className="px-5 py-2.5 rounded-full bg-[#FF8A00] hover:bg-[#F97316] text-black font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-lg shadow-[#FF8A00]/20 active:scale-95 amber-glow-sm"
    >
      <ShoppingBag className="w-4 h-4 shrink-0" />
      <span>Go to Shop</span>
      <ArrowRight className="w-4 h-4 shrink-0 stroke-[2.5]" />
    </button>
  );
}
