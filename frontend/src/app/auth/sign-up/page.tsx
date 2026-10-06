"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterFormData } from "@/schemas/auth.schema";
import { authService } from "@/services/auth.service";
import { toast } from "@/stores/useToastStore";
import { GoogleOAuthButton } from "@/components/auth/GoogleOAuthButton";
import { PasswordCheckers } from "@/components/auth/PasswordCheckers";
import { Logo } from "@/components/layout/Navbar/Logo";
import { Eye, EyeOff, ArrowRight } from "lucide-react";

export default function SignUpPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const passwordValue = watch("password") || "";

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    try {
      await authService.register(data);
      toast.success("Account Created", "A 6-digit OTP code has been sent to your email.");
      router.push(`/auth/verify?email=${encodeURIComponent(data.email)}`);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Registration failed";
      toast.error("Registration Failed", msg);
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
            Create Your Account
          </h1>
          <p className="mt-1 text-xs text-[#9E948C]">
            Experience luxury e-commerce curated for you
          </p>
        </div>

        <div className="p-8 rounded-3xl glass-panel-elevated border border-white/10 space-y-6">
          <GoogleOAuthButton text="Sign up with Google" />

          <div className="relative flex items-center justify-center">
            <div className="border-t border-white/10 w-full" />
            <span className="bg-[#1A1614] px-3 text-[11px] text-[#9E948C] uppercase tracking-wider relative">
              Or with email
            </span>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#9E948C] mb-1.5">First Name</label>
                <input
                  type="text"
                  {...register("firstName")}
                  placeholder="First name"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#12100F] border border-white/10 text-xs text-white focus:outline-none focus:border-[#FF8A00]"
                />
                {errors.firstName && <p className="text-[11px] text-red-400 mt-1">{errors.firstName.message}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#9E948C] mb-1.5">Last Name</label>
                <input
                  type="text"
                  {...register("lastName")}
                  placeholder="Last name"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#12100F] border border-white/10 text-xs text-white focus:outline-none focus:border-[#FF8A00]"
                />
                {errors.lastName && <p className="text-[11px] text-red-400 mt-1">{errors.lastName.message}</p>}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#9E948C] mb-1.5">Email Address</label>
              <input
                type="email"
                {...register("email")}
                placeholder="name@example.com"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#12100F] border border-white/10 text-xs text-white focus:outline-none focus:border-[#FF8A00]"
              />
              {errors.email && <p className="text-[11px] text-red-400 mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#9E948C] mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  placeholder="Choose strong password"
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
              {errors.password && <p className="text-[11px] text-red-400 mt-1">{errors.password.message}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#9E948C] mb-1.5">Confirm Password</label>
              <input
                type={showPassword ? "text" : "password"}
                {...register("confirmPassword")}
                placeholder="Confirm password"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#12100F] border border-white/10 text-xs text-white focus:outline-none focus:border-[#FF8A00]"
              />
              {errors.confirmPassword && <p className="text-[11px] text-red-400 mt-1">{errors.confirmPassword.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-[#FF8A00] hover:bg-[#F97316] text-black font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-[#FF8A00]/25 transition-all active:scale-95 disabled:opacity-50"
            >
              {isLoading ? "Creating Account..." : "Create Account"} <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-[#9E948C]">
          Already have an account?{" "}
          <Link href="/auth/sign-in" className="text-[#FF8A00] font-semibold hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
