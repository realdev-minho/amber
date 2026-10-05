"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/stores/useAuthStore";
import { toast } from "@/stores/useToastStore";
import { authService } from "@/services/auth.service";
import Link from "next/link";

function GoogleCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const login = useAuthStore((s) => s.login);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const targetRedirect = searchParams.get("redirect") || "/shop";

    // 1. Check for token in URL hash (e.g. #id_token=... or #access_token=...)
    let idToken = "";
    if (typeof window !== "undefined" && window.location.hash) {
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      idToken = hashParams.get("id_token") || hashParams.get("access_token") || "";
    }

    // 2. Check for token in search params (?id_token=... or ?credential=...)
    if (!idToken) {
      idToken = searchParams.get("id_token") || searchParams.get("credential") || "";
    }

    if (!idToken) {
      setError("No Google authentication credentials received.");
      return;
    }

    // 3. Verify real Google token with Amber backend
    async function exchangeToken() {
      try {
        const authData = await authService.googleAuth(idToken);
        login(authData.user, authData.tokens.accessToken);
        toast.success("Welcome to Amber", `Signed in as ${authData.user.firstName}`);
        router.push(targetRedirect);
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Google authentication failed";
        setError(msg);
        toast.error("Authentication Error", msg);
      }
    }

    exchangeToken();
  }, [login, router, searchParams]);

  if (error) {
    return (
      <div className="min-h-[85vh] flex flex-col items-center justify-center text-center p-4">
        <div className="w-16 h-16 rounded-3xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-4 text-red-400 font-bold text-xl">
          !
        </div>
        <h2 className="text-xl font-bold text-[#FBF8F5]">Google Sign-In Failed</h2>
        <p className="text-xs text-[#9E948C] mt-2 max-w-sm mb-6">{error}</p>
        <Link
          href="/auth/sign-in"
          className="px-6 py-2.5 rounded-xl bg-[#FF8A00] text-black text-xs font-bold hover:bg-[#F97316] transition-all"
        >
          Return to Sign In
        </Link>
      </div>
    );
  }

  return (
    <div suppressHydrationWarning className="min-h-[85vh] flex flex-col items-center justify-center text-center p-4">
      <div suppressHydrationWarning className="w-12 h-12 border-3 border-[#FF8A00] border-t-transparent rounded-full animate-spin mb-4" />
      <h2 className="text-lg font-bold text-[#FBF8F5]">Verifying Google Account...</h2>
      <p className="text-xs text-[#9E948C] mt-1">Connecting to Amber backend authentication.</p>
    </div>
  );
}

export default function GoogleCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[85vh] flex items-center justify-center">
          <div className="w-10 h-10 border-2 border-[#FF8A00] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <GoogleCallbackContent />
    </Suspense>
  );
}
