"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordSchema, ForgotPasswordFormData } from "@/schemas/auth.schema";
import { authService } from "@/services/auth.service";
import { toast } from "@/stores/useToastStore";
import { Logo } from "@/components/layout/Navbar/Logo";
import { KeyRound, ArrowRight, ArrowLeft } from "lucide-react";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true);
    try {
      await authService.forgotPassword(data.email);
      toast.success("Instructions Sent", "Password reset code sent to your email.");
      router.push(`/auth/reset-password?email=${encodeURIComponent(data.email)}`);
    } catch {
      toast.error("Failed", "Unable to process password reset request.");
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
            <KeyRound className="w-6 h-6 text-[#FF8A00]" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[#FBF8F5]">
            Forgot Password
          </h1>
          <p className="mt-1 text-xs text-[#9E948C] max-w-xs mx-auto">
            Enter your email and we will send you a 6-digit code to reset your password
          </p>
        </div>

        <div className="p-8 rounded-3xl glass-panel-elevated border border-white/10 space-y-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#9E948C] mb-1.5">
                Account Email
              </label>
              <input
                type="email"
                {...register("email")}
                placeholder="name@example.com"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#12100F] border border-white/10 text-xs text-white focus:outline-none focus:border-[#FF8A00]"
              />
              {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-[#FF8A00] hover:bg-[#F97316] text-black font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-[#FF8A00]/25 transition-all active:scale-95 disabled:opacity-50"
            >
              {isLoading ? "Sending Code..." : "Send Reset Code"}{" "}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-2 border-t border-white/8 text-center">
            <Link
              href="/auth/sign-in"
              className="text-xs text-stone-400 hover:text-white flex items-center justify-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
