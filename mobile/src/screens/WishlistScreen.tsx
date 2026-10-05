import React from "react";
import { Heart, ShoppingBag, Trash2 } from "lucide-react";
import { useWishlistStore } from "@/stores/useWishlistStore";
import { useCartStore } from "@/stores/useCartStore";
import { Product } from "@/types";

interface WishlistScreenProps {
  onSelectProduct: (productId: string) => void;
  onExplore: () => void;
}

export const WishlistScreen: React.FC<WishlistScreenProps> = ({
  onSelectProduct,
  onExplore,
}) => {
  const items = useWishlistStore((state) => state.items);
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
  const addItem = useCartStore((state) => state.addItem);

  const handleMoveToBag = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product);
    toggleWishlist(product);
  };

  if (items.length === 0) {
    return (
      <div style={{ padding: "60px 20px", textAlign: "center" }}>
        <div style={{ width: "60px", height: "60px", borderRadius: "50%", background: "var(--bg-card)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
          <Heart size={28} color="var(--text-muted)" />
        </div>
        <h3 style={{ fontSize: "18px", fontWeight: 700, color: "var(--text-main)", marginBottom: "6px" }}>No Saved Pieces</h3>
        <p style={{ fontSize: "13px", color: "var(--text-muted)", marginBottom: "24px" }}>Save your favorite horology, acoustics, and atelier garments.</p>
        <button onClick={onExplore} className="btn-amber">Explore Marketplace</button>
      </div>
    );
  }

  return (
    <div style={{ padding: "16px 14px", paddingBottom: "100px" }}>
      <h2 style={{ fontSize: "18px", fontWeight: 800, color: "var(--text-main)", marginBottom: "16px" }}>
        Saved Pieces ({items.length})
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {items.map((product) => (
          <div
            key={product.id}
            onClick={() => onSelectProduct(product.id)}
            style={{
              display: "flex",
              gap: "12px",
              background: "var(--bg-card)",
              border: "1px solid var(--border-card)",
              borderRadius: "14px",
              padding: "10px",
              cursor: "pointer",
            }}
          >
            <img src={product.images?.[0]?.url} alt={product.name} style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "10px" }} />
            <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <span style={{ fontSize: "10px", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 600 }}>{product.brand}</span>
                  <h4 style={{ fontSize: "13px", fontWeight: 700, color: "var(--text-main)", lineHeight: 1.2 }}>{product.name}</h4>
                  <span style={{ fontSize: "14px", fontWeight: 800, color: "#FF8A00", display: "block", marginTop: "4px" }}>${product.price.toLocaleString()}</span>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); toggleWishlist(product); }}
                  style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", padding: "2px" }}
                  aria-label="Remove from wishlist"
                >
                  <Trash2 size={15} />
                </button>
              </div>

              <button
                onClick={(e) => handleMoveToBag(product, e)}
                className="btn-ghost"
                style={{ alignSelf: "flex-start", gap: "6px", padding: "6px 12px", fontSize: "11px", borderRadius: "8px", marginTop: "6px" }}
              >
                <ShoppingBag size={13} color="#FF8A00" />
                <span>Move to Bag</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
