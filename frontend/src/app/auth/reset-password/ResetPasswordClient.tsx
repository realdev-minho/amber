"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema, ResetPasswordFormData } from "@/schemas/auth.schema";
import { authService } from "@/services/auth.service";
import { toast } from "@/stores/useToastStore";
import { PasswordCheckers } from "@/components/auth/PasswordCheckers";
import { Logo } from "@/components/layout/Navbar/Logo";
import { ShieldCheck, Eye, EyeOff, ArrowRight } from "lucide-react";

export function ResetPasswordClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailParam = searchParams.get("email") || "";

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const passwordValue = watch("newPassword") || "";

  const onSubmit = async (data: ResetPasswordFormData) => {
    setIsLoading(true);
    try {
      await authService.resetPassword({
        email: emailParam,
        otp: data.otp,
        newPassword: data.newPassword,
      });
      toast.success("Password Updated", "Your password has been changed. Please sign in.");
      router.push("/auth/sign-in");
    } catch {
      toast.error("Failed to Reset", "Invalid or expired code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <Logo />
          <div className="w-12 h-12 rounded-2xl bg-[#FF8A00]/10 border border-[#FF8A00]/25 flex items-center justify-center mx-auto mt-4 mb-2">
            <ShieldCheck className="w-6 h-6 text-[#FF8A00]" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[#FBF8F5]">
            Set New Password
          </h1>
          <p className="mt-1 text-xs text-[#9E948C] max-w-xs mx-auto">
            Enter the 6-digit code sent to <strong className="text-white">{emailParam}</strong>
          </p>
        </div>

        <div className="p-8 rounded-3xl glass-panel-elevated border border-white/10 space-y-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#9E948C] mb-1.5">
                6-Digit OTP Code
              </label>
              <input
                type="text"
                maxLength={6}
                inputMode="numeric"
                {...register("otp")}
                placeholder="123456"
                className="w-full text-center tracking-[0.4em] font-mono text-lg py-2.5 rounded-xl bg-[#12100F] border border-white/10 text-white focus:outline-none focus:border-[#FF8A00]"
              />
              {errors.otp && <p className="text-xs text-red-400 mt-1">{errors.otp.message}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#9E948C] mb-1.5">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("newPassword")}
                  placeholder="Enter new strong password"
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
              <PasswordCheckers password={passwordValue} />
              {errors.newPassword && <p className="text-xs text-red-400 mt-1">{errors.newPassword.message}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#9E948C] mb-1.5">
                Confirm New Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                {...register("confirmPassword")}
                placeholder="Confirm new password"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#12100F] border border-white/10 text-xs text-white focus:outline-none focus:border-[#FF8A00]"
              />
              {errors.confirmPassword && (
                <p className="text-xs text-red-400 mt-1">{errors.confirmPassword.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-[#FF8A00] hover:bg-[#F97316] text-black font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-[#FF8A00]/25 transition-all active:scale-95 disabled:opacity-50"
            >
              {isLoading ? "Updating..." : "Update Password"} <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
