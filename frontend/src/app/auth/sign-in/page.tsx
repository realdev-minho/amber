"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormData } from "@/schemas/auth.schema";
import { authService } from "@/services/auth.service";
import { useAuthStore } from "@/stores/useAuthStore";
import { toast } from "@/stores/useToastStore";
import { GoogleOAuthButton } from "@/components/auth/GoogleOAuthButton";
import { Logo } from "@/components/layout/Navbar/Logo";
import { Eye, EyeOff, ArrowRight } from "lucide-react";

export default function SignInPage() {
  const router = useRouter();
  const login = useAuthStore((s) => s.login);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      const res = await authService.login(data);
      login(res.user, res.tokens.accessToken);
      router.push("/account");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to sign in";
      toast.error("Sign In Failed", msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <Logo />
          <h1 className="mt-4 text-2xl font-bold tracking-tight text-[#FBF8F5]">
            Welcome Back
          </h1>
          <p className="mt-1 text-xs text-[#9E948C]">
            Sign in to manage your orders, wishlist, and profile
          </p>
        </div>

        <div className="p-8 rounded-3xl glass-panel-elevated border border-white/10 space-y-6">
          <GoogleOAuthButton text="Sign in with Google" />

          <div className="relative flex items-center justify-center">
            <div className="border-t border-white/10 w-full" />
            <span className="bg-[#1A1614] px-3 text-[11px] text-[#9E948C] uppercase tracking-wider relative">
              Or with email
            </span>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#9E948C] mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                {...register("email")}
                placeholder="name@example.com"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#12100F] border border-white/10 text-xs text-white focus:outline-none focus:border-[#FF8A00]"
              />
              {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-[#9E948C]">Password</label>
                <Link
                  href="/auth/forgot-password"
                  className="text-[11px] text-[#FF8A00] hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  placeholder="Enter your password"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#12100F] border border-white/10 text-xs text-white pr-10 focus:outline-none focus:border-[#FF8A00]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-red-400 mt-1">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-[#FF8A00] hover:bg-[#F97316] text-black font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-[#FF8A00]/25 transition-all active:scale-95 disabled:opacity-50"
            >
              {isLoading ? "Signing in..." : "Sign In"} <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-[#9E948C]">
          Do not have an account?{" "}
          <Link href="/auth/sign-up" className="text-[#FF8A00] font-semibold hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
