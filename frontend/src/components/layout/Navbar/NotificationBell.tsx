"use client";

import { useState, useRef, useEffect } from "react";
import { Bell, CheckCheck, Package, Truck, Info, X } from "lucide-react";
import { useNotificationStore, NotificationItem } from "@/stores/useNotificationStore";
import Link from "next/link";

export function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const notifications = useNotificationStore((s) => s.notifications);
  const markAsRead = useNotificationStore((s) => s.markAsRead);
  const markAllAsRead = useNotificationStore((s) => s.markAllAsRead);
  const rawUnreadCount = useNotificationStore((s) => s.getUnreadCount)();

  useEffect(() => {
    setMounted(true);
  }, []);

  const unreadCount = mounted ? rawUnreadCount : 0;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const getIcon = (type: NotificationItem["type"]) => {
    switch (type) {
      case "order":
        return <Package className="w-4 h-4 text-[#FF8A00]" />;
      case "delivery":
        return <Truck className="w-4 h-4 text-emerald-400" />;
      default:
        return <Info className="w-4 h-4 text-blue-400" />;
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={`Notifications, ${unreadCount} unread`}
        className="relative p-2 rounded-full text-stone-300 hover:text-white hover:bg-white/5 transition-colors"
      >
        <Bell className="w-5 h-5 transition-transform hover:scale-110 active:scale-95" />
        {unreadCount > 0 && (
          <span className="absolute top-0.5 right-0.5 min-w-[18px] h-[18px] flex items-center justify-center rounded-full bg-[#FF8A00] text-black text-[10px] font-bold px-1 ring-2 ring-[#0D0B0A] animate-in zoom-in-75 duration-150">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-80 sm:w-96 rounded-3xl bg-[#1A1614]/95 backdrop-blur-2xl border border-white/10 shadow-2xl z-50 overflow-hidden animate-in fade-in-50 zoom-in-95 duration-200">
          <div className="p-4 border-b border-white/8 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-white">Notifications</span>
              {unreadCount > 0 && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#FF8A00]/20 text-[#FF8A00] font-semibold">
                  {unreadCount} new
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button
                  type="button"
                  onClick={() => markAllAsRead()}
                  className="text-[11px] text-stone-400 hover:text-[#FF8A00] flex items-center gap-1 transition-colors"
                >
                  <CheckCheck className="w-3.5 h-3.5" />
                  <span>Mark all read</span>
                </button>
              )}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1 text-stone-400 hover:text-white rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="max-h-80 overflow-y-auto divide-y divide-white/5 no-scrollbar">
            {notifications.length === 0 ? (
              <div className="py-12 text-center text-xs text-stone-400">
                No notifications right now
              </div>
            ) : (
              notifications.slice(0, 8).map((notif) => (
                <div
                  key={notif.id}
                  onClick={() => markAsRead(notif.id)}
                  className={`p-3.5 flex items-start gap-3 cursor-pointer transition-colors hover:bg-white/[0.03] ${
                    !notif.read ? "bg-[#FF8A00]/5" : ""
                  }`}
                >
                  <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
                    {getIcon(notif.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-xs font-semibold text-white truncate">{notif.title}</h4>
                      {!notif.read && (
                        <span className="w-2 h-2 rounded-full bg-[#FF8A00] shrink-0" />
                      )}
                    </div>
                    <p className="text-[11px] text-stone-400 line-clamp-2 mt-0.5 leading-relaxed">
                      {notif.message}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="p-3 bg-black/40 border-t border-white/8 text-center">
            <Link
              href="/account/notifications"
              onClick={() => setIsOpen(false)}
              className="text-xs text-[#FF8A00] hover:text-[#F97316] font-medium transition-colors"
            >
              View All Notifications →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
