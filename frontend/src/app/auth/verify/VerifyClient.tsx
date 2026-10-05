"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { otpSchema, OtpFormData } from "@/schemas/auth.schema";
import { authService } from "@/services/auth.service";
import { useAuthStore } from "@/stores/useAuthStore";
import { toast } from "@/stores/useToastStore";
import { Logo } from "@/components/layout/Navbar/Logo";
import { ShieldCheck, ArrowRight, RotateCcw } from "lucide-react";

export function VerifyClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailParam = searchParams.get("email") || "your email";
  const login = useAuthStore((s) => s.login);

  const [isLoading, setIsLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(60);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OtpFormData>({
    resolver: zodResolver(otpSchema),
  });

  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setInterval(() => setResendCooldown((c) => c - 1), 1000);
    return () => clearInterval(timer);
  }, [resendCooldown]);

  const onSubmit = async (data: OtpFormData) => {
    setIsLoading(true);
    try {
      const res = await authService.verifyOtp(emailParam, data.otp);
      login(res.user, res.tokens.accessToken);
      toast.success("Email Verified", "Your account is verified. Welcome to Amber!");
      router.push("/account");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Invalid or expired OTP code";
      toast.error("Verification Failed", msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (resendCooldown > 0) return;
    try {
      await authService.resendOtp(emailParam);
      toast.success("Code Sent", "A new 6-digit OTP has been sent to your email.");
      setResendCooldown(60);
    } catch {
      toast.error("Failed to resend code");
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
            Verify Your Email
          </h1>
          <p className="mt-1 text-xs text-[#9E948C] max-w-xs mx-auto">
            We sent a 6-digit verification code to{" "}
            <strong className="text-white">{emailParam}</strong>
          </p>
        </div>

        <div className="p-8 rounded-3xl glass-panel-elevated border border-white/10 space-y-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#9E948C] mb-1.5 text-center">
                Enter 6-Digit Code
              </label>
              <input
                type="text"
                maxLength={6}
                inputMode="numeric"
                autoComplete="one-time-code"
                {...register("otp")}
                placeholder="123456"
                className="w-full text-center tracking-[0.5em] font-mono text-xl py-3 rounded-xl bg-[#12100F] border border-white/10 text-white focus:outline-none focus:border-[#FF8A00]"
              />
              {errors.otp && <p className="text-xs text-red-400 mt-1 text-center">{errors.otp.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-[#FF8A00] hover:bg-[#F97316] text-black font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-[#FF8A00]/25 transition-all active:scale-95 disabled:opacity-50"
            >
              {isLoading ? "Verifying..." : "Verify & Continue"}{" "}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-2 border-t border-white/8 text-center">
            {resendCooldown > 0 ? (
              <p className="text-xs text-stone-500">
                Resend code in <strong className="text-white">{resendCooldown}s</strong>
              </p>
            ) : (
              <button
                type="button"
                onClick={handleResend}
                className="text-xs font-semibold text-[#FF8A00] hover:underline flex items-center justify-center gap-1.5 mx-auto"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Resend Code
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
