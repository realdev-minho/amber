"use client";

import { useState } from "react";
import { AccountLayout } from "@/components/account/AccountLayout";
import { PasswordCheckers } from "@/components/auth/PasswordCheckers";
import { toast } from "@/stores/useToastStore";
import { ShieldCheck, Lock, Check } from "lucide-react";

export default function SecurityPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Mismatch", "New passwords do not match.");
      return;
    }
    if (newPassword.length < 8) {
      toast.error("Weak Password", "Password must be at least 8 characters.");
      return;
    }
    toast.success("Security Updated", "Your account password has been updated.");
    setIsSaved(true);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <AccountLayout>
      <div className="space-y-8 max-w-xl">
        <div>
          <h1 className="text-2xl font-bold text-[#FBF8F5]">Security & Password</h1>
          <p className="text-xs text-[#9E948C] mt-1">
            Ensure your account is protected with strong credentials and two-factor safety.
          </p>
        </div>

        <form onSubmit={handlePasswordChange} className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider mb-2">
            <Lock className="w-4 h-4 text-[#FF8A00]" /> Change Password
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#9E948C] mb-1.5">
              Current Password
            </label>
            <input
              type="password"
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#12100F] border border-white/10 text-xs text-white focus:outline-none focus:border-[#FF8A00]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#9E948C] mb-1.5">
              New Password
            </label>
            <input
              type="password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#12100F] border border-white/10 text-xs text-white focus:outline-none focus:border-[#FF8A00]"
            />
            <PasswordCheckers password={newPassword} />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#9E948C] mb-1.5">
              Confirm New Password
            </label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#12100F] border border-white/10 text-xs text-white focus:outline-none focus:border-[#FF8A00]"
            />
          </div>

          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-[#FF8A00] hover:bg-[#F97316] text-black font-bold text-xs flex items-center gap-2 shadow-md transition-all active:scale-95"
          >
            {isSaved ? <Check className="w-4 h-4" /> : null}
            {isSaved ? "Password Changed!" : "Update Password"}
          </button>
        </form>

        <div className="p-5 rounded-2xl bg-[#1A1614] border border-white/6 space-y-2">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <h4 className="text-xs font-bold text-white">Two-Factor Authentication (OTP)</h4>
          </div>
          <p className="text-xs text-stone-400">
            Amber protects login attempts and transactions with dynamic 6-digit email verification codes.
          </p>
        </div>
      </div>
    </AccountLayout>
  );
}
