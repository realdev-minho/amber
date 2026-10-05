"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/stores/useAuthStore";
import {
  User,
  Package,
  MapPin,
  ShieldCheck,
  Bell,
  LogOut,
} from "lucide-react";
import Image from "next/image";

export function AccountNav() {
  const pathname = usePathname();
  const { user, logout } = useAuthStore();

  const links = [
    { href: "/account", label: "Dashboard", icon: User, exact: true },
    { href: "/account/profile", label: "Profile Info", icon: User },
    { href: "/orders", label: "Order History", icon: Package },
    { href: "/account/addresses", label: "Saved Addresses", icon: MapPin },
    { href: "/account/security", label: "Security & Password", icon: ShieldCheck },
    { href: "/account/notifications", label: "Notifications", icon: Bell },
  ];

  return (
    <div className="w-full space-y-6">
      {/* Profile quick banner */}
      <div className="p-4 rounded-2xl bg-[#1A1614] border border-white/6 flex items-center gap-3">
        <div className="relative w-12 h-12 rounded-full overflow-hidden bg-stone-800 ring-2 ring-[#FF8A00]/40 shrink-0">
          {user?.avatarUrl ? (
            <Image src={user.avatarUrl} alt={user.firstName} fill className="object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center font-bold text-white">
              {user?.firstName?.charAt(0) || "A"}
            </div>
          )}
        </div>
        <div className="min-w-0">
          <p className="text-xs font-bold text-[#FBF8F5] truncate">
            {user?.firstName} {user?.lastName}
          </p>
          <p className="text-[11px] text-[#9E948C] truncate">{user?.email}</p>
        </div>
      </div>

      {/* Nav items */}
      <nav className="space-y-1" aria-label="Account Navigation">
        {links.map((link) => {
          const isActive = link.exact
            ? pathname === link.href
            : pathname.startsWith(link.href);
          const Icon = link.icon;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-colors ${
                isActive
                  ? "bg-[#FF8A00]/15 text-[#FF8A00] font-semibold"
                  : "text-stone-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{link.label}</span>
            </Link>
          );
        })}

        <button
          type="button"
          onClick={logout}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium text-red-400 hover:bg-red-500/10 transition-colors text-left"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </nav>
    </div>
  );
}
