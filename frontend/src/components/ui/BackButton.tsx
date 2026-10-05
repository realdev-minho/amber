"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
  label?: string;
  fallbackHref?: string;
  className?: string;
}

export function BackButton({
  label = "Back",
  fallbackHref = "/shop",
  className = "",
}: BackButtonProps) {
  const router = useRouter();

  const handleBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push(fallbackHref);
    }
  };

  return (
    <button
      type="button"
      onClick={handleBack}
      className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-stone-300 hover:text-white transition-all active:scale-95 group mb-6 ${className}`}
    >
      <ArrowLeft className="w-3.5 h-3.5 text-[#FF8A00] transition-transform group-hover:-translate-x-1" />
      <span>{label}</span>
    </button>
  );
}
