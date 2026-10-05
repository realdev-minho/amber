import React from "react";
import { ShoppingBag, Bell } from "lucide-react";
import { useCartStore } from "@/stores/useCartStore";

interface MobileHeaderProps {
  onOpenCart: () => void;
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
}

export const MobileHeader: React.FC<MobileHeaderProps> = ({
  onOpenCart,
  title,
}) => {
  const itemCount = useCartStore((state) => state.getItemCount());

  return (
    <header className="mobile-header">
      {/* Unclickable Amber Brand Logo */}
      <div className="brand-logo" aria-label="Amber">
        <span>amber</span>
        <span className="brand-dot">.</span>
      </div>

      {title && (
        <span style={{ fontSize: "14px", fontWeight: 700, color: "#FBF8F5" }}>
          {title}
        </span>
      )}

      {/* Right Action Icons: Notification bell + Bag with count badge */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <button
          className="btn-ghost"
          style={{ padding: "8px", borderRadius: "50%", border: "none" }}
          aria-label="Notifications"
        >
          <Bell size={18} color="#9E948C" />
        </button>

        <button
          onClick={onOpenCart}
          className="btn-ghost"
          style={{
            position: "relative",
            padding: "8px",
            borderRadius: "50%",
            border: "none",
          }}
          aria-label="View Shopping Bag"
        >
          <ShoppingBag size={20} color="#FBF8F5" />
          {itemCount > 0 && (
            <span
              style={{
                position: "absolute",
                top: "2px",
                right: "2px",
                background: "#FF8A00",
                color: "#0D0B0A",
                fontSize: "10px",
                fontWeight: 800,
                borderRadius: "50%",
                width: "16px",
                height: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {itemCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};
