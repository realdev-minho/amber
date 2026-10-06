"use client";

import { useState } from "react";
import { AccountLayout } from "@/components/account/AccountLayout";
import { toast } from "@/stores/useToastStore";
import { Bell, Check } from "lucide-react";

export function NotificationsPage() {
  const [orderEmails, setOrderEmails] = useState(true);
  const [promoEmails, setPromoEmails] = useState(true);
  const [securityAlerts, setSecurityAlerts] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setIsSaved(true);
    toast.success("Preferences Saved", "Your notification settings have been updated.");
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <AccountLayout>
      <div className="space-y-6 max-w-xl">
        <div>
          <h1 className="text-2xl font-bold text-[#FBF8F5]">Notifications & Alerts</h1>
          <p className="text-xs text-[#9E948C] mt-1">
            Choose what transactional notifications and exclusive drop alerts you receive.
          </p>
        </div>

        <div className="space-y-4">
          <label className="flex items-start justify-between p-4 rounded-2xl bg-[#1A1614] border border-white/6 cursor-pointer">
            <div className="pr-4">
              <p className="text-xs font-bold text-white">Order Status Updates</p>
              <p className="text-[11px] text-stone-400 mt-0.5">
                Real-time tracking and delivery updates sent to your email.
              </p>
            </div>
            <input
              type="checkbox"
              checked={orderEmails}
              onChange={(e) => setOrderEmails(e.target.checked)}
              className="w-4 h-4 mt-1 accent-[#FF8A00]"
            />
          </label>

          <label className="flex items-start justify-between p-4 rounded-2xl bg-[#1A1614] border border-white/6 cursor-pointer">
            <div className="pr-4">
              <p className="text-xs font-bold text-white">Exclusive Offers & Drops</p>
              <p className="text-[11px] text-stone-400 mt-0.5">
                Early access to seasonal reductions and limited designer pieces.
              </p>
            </div>
            <input
              type="checkbox"
              checked={promoEmails}
              onChange={(e) => setPromoEmails(e.target.checked)}
              className="w-4 h-4 mt-1 accent-[#FF8A00]"
            />
          </label>

          <label className="flex items-start justify-between p-4 rounded-2xl bg-[#1A1614] border border-white/6 cursor-pointer">
            <div className="pr-4">
              <p className="text-xs font-bold text-white">Security Alerts</p>
              <p className="text-[11px] text-stone-400 mt-0.5">
                Immediate notifications for logins, password updates, or suspicious activity.
              </p>
            </div>
            <input
              type="checkbox"
              checked={securityAlerts}
              onChange={(e) => setSecurityAlerts(e.target.checked)}
              className="w-4 h-4 mt-1 accent-[#FF8A00]"
            />
          </label>
        </div>

        <button
          type="button"
          onClick={handleSave}
          className="px-6 py-2.5 rounded-xl bg-[#FF8A00] hover:bg-[#F97316] text-black font-bold text-xs flex items-center gap-2 shadow-md transition-all active:scale-95"
        >
          {isSaved ? <Check className="w-4 h-4" /> : <Bell className="w-4 h-4" />}
          {isSaved ? "Saved!" : "Save Preferences"}
        </button>
      </div>
    </AccountLayout>
  );
}

export default NotificationsPage;
