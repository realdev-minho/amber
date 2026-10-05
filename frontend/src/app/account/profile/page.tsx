"use client";

import { useState } from "react";
import { AccountLayout } from "@/components/account/AccountLayout";
import { useAuthStore } from "@/stores/useAuthStore";
import { toast } from "@/stores/useToastStore";
import Image from "next/image";
import { Camera, Check } from "lucide-react";

export default function ProfilePage() {
  const { user, updateUser } = useAuthStore();
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [phone, setPhone] = useState(user?.phone || "+2348012345678");
  const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80");
  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({
      firstName,
      lastName,
      phone,
      avatarUrl,
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handlePhotoCycle = () => {
    const photos = [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80",
    ];
    const nextPhoto = photos[(photos.indexOf(avatarUrl) + 1) % photos.length];
    setAvatarUrl(nextPhoto);
    toast.info("Photo Preview Updated", "Click Save Profile to persist your new avatar.");
  };

  return (
    <AccountLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-[#FBF8F5]">Profile Information</h1>
          <p className="text-xs text-[#9E948C] mt-1">
            Update your account details and customer contact information.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 max-w-xl">
          {/* Avatar row */}
          <div className="flex items-center gap-5">
            <div className="relative w-20 h-20 rounded-full overflow-hidden bg-stone-800 ring-2 ring-[#FF8A00]">
              <Image src={avatarUrl} alt="Avatar" fill className="object-cover" />
            </div>
            <div>
              <button
                type="button"
                onClick={handlePhotoCycle}
                className="px-4 py-2 rounded-xl bg-white/6 hover:bg-white/10 border border-white/12 text-xs font-semibold text-white flex items-center gap-2 transition-colors"
              >
                <Camera className="w-4 h-4 text-[#FF8A00]" /> Change Photo
              </button>
              <p className="text-[11px] text-[#9E948C] mt-1.5">PNG, JPG or WebP up to 5MB</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#9E948C] mb-1.5">First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#12100F] border border-white/10 text-xs text-white focus:outline-none focus:border-[#FF8A00]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#9E948C] mb-1.5">Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#12100F] border border-white/10 text-xs text-white focus:outline-none focus:border-[#FF8A00]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#9E948C] mb-1.5">Email Address</label>
            <input
              type="email"
              value={user?.email || ""}
              disabled
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/5 text-xs text-stone-400 cursor-not-allowed"
            />
            <p className="text-[11px] text-stone-500 mt-1">Verified account email cannot be edited directly.</p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#9E948C] mb-1.5">Phone Number</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+2348012345678"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#12100F] border border-white/10 text-xs text-white focus:outline-none focus:border-[#FF8A00]"
            />
          </div>

          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-[#FF8A00] hover:bg-[#F97316] text-black font-bold text-xs flex items-center gap-2 shadow-md transition-all active:scale-95"
          >
            {isSaved ? <Check className="w-4 h-4" /> : null}
            {isSaved ? "Saved!" : "Save Profile"}
          </button>
        </form>
      </div>
    </AccountLayout>
  );
}
