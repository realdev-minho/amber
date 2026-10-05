import React from "react";
import { Store, Search, Heart, ShoppingBag, User } from "lucide-react";
import { useCartStore } from "@/stores/useCartStore";
import { useWishlistStore } from "@/stores/useWishlistStore";

export type TabType = "shop" | "search" | "wishlist" | "cart" | "account";

interface BottomTabBarProps {
  currentTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const BottomTabBar: React.FC<BottomTabBarProps> = ({
  currentTab,
  onTabChange,
}) => {
  const cartCount = useCartStore((state) => state.getItemCount());
  const wishlistCount = useWishlistStore((state) => state.items.length);

  const tabs = [
    { id: "shop" as TabType, label: "Shop", icon: Store },
    { id: "search" as TabType, label: "Search", icon: Search },
    {
      id: "wishlist" as TabType,
      label: "Saved",
      icon: Heart,
      badge: wishlistCount,
    },
    {
      id: "cart" as TabType,
      label: "Bag",
      icon: ShoppingBag,
      badge: cartCount,
    },
    { id: "account" as TabType, label: "Account", icon: User },
  ];

  return (
    <nav className="bottom-nav">
      {tabs.map((tab) => {
        const IconComponent = tab.icon;
        const isActive = currentTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`nav-tab ${isActive ? "active" : ""}`}
            aria-label={tab.label}
          >
            <IconComponent size={20} strokeWidth={isActive ? 2.4 : 1.8} />
            <span>{tab.label}</span>

            {Boolean(tab.badge && tab.badge > 0) && (
              <span className="badge-dot">{tab.badge}</span>
            )}
          </button>
        );
      })}
    </nav>
  );
};
