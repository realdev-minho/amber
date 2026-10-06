import React from "react";
import { Heart, Plus } from "lucide-react";
import { Product } from "@/types";
import { useWishlistStore } from "@/stores/useWishlistStore";
import { useCartStore } from "@/stores/useCartStore";

interface ProductCardProps {
  product: Product;
  onSelect: (productId: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
}) => {
  const isInWishlist = useWishlistStore((state) => state.isInWishlist(product.id));
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
  const addItem = useCartStore((state) => state.addItem);

  const primaryImage = product.images?.[0]?.url || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80";

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <div
      onClick={() => onSelect(product.id)}
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border-card)",
        borderRadius: "16px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
        position: "relative",
      }}
    >
      {/* Image container */}
      <div style={{ position: "relative", aspectRatio: "1 / 1.1", width: "100%", overflow: "hidden" }}>
        <img
          src={primaryImage}
          alt={product.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            transition: "transform 0.3s ease",
          }}
          loading="lazy"
        />

        {/* Wishlist toggle button */}
        <button
          onClick={handleToggleWishlist}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            background: "rgba(13, 11, 10, 0.65)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "50%",
            width: "32px",
            height: "32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
          aria-label="Wishlist toggle"
        >
          <Heart
            size={16}
            color={isInWishlist ? "#FF8A00" : "#FBF8F5"}
            fill={isInWishlist ? "#FF8A00" : "transparent"}
          />
        </button>

        {/* Category tag */}
        <span
          style={{
            position: "absolute",
            bottom: "8px",
            left: "8px",
            background: "rgba(13, 11, 10, 0.75)",
            color: "#FF8A00",
            fontSize: "9px",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            padding: "3px 8px",
            borderRadius: "6px",
            border: "1px solid rgba(255, 138, 0, 0.3)",
          }}
        >
          {product.category}
        </span>
      </div>

      {/* Info container */}
      <div style={{ padding: "12px", display: "flex", flexDirection: "column", flex: 1, justifyContent: "space-between" }}>
        <div>
          <span style={{ fontSize: "11px", color: "var(--text-muted)", fontWeight: 600, textTransform: "uppercase" }}>
            {product.brand}
          </span>
          <h4
            style={{
              fontSize: "13px",
              fontWeight: 700,
              color: "var(--text-main)",
              margin: "3px 0 8px",
              lineHeight: 1.3,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {product.name}
          </h4>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "6px" }}>
          <div>
            <span style={{ fontSize: "14px", fontWeight: 800, color: "#FF8A00" }}>
              ${product.price.toLocaleString()}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span
                style={{
                  fontSize: "11px",
                  color: "var(--text-faint)",
                  textDecoration: "line-through",
                  marginLeft: "6px",
                }}
              >
                ${product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          <button
            onClick={handleQuickAdd}
            style={{
              background: "#FF8A00",
              color: "#0D0B0A",
              border: "none",
              borderRadius: "8px",
              width: "28px",
              height: "28px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
            aria-label="Quick add to bag"
          >
            <Plus size={16} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  );
};
