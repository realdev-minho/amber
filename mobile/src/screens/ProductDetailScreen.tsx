import React, { useState } from "react";
import { Heart, Star, CheckCircle, Shield, Truck } from "lucide-react";
import { getProductById } from "@/constants/products";
import { BackButton } from "@/components/ui/BackButton";
import { useWishlistStore } from "@/stores/useWishlistStore";
import { useCartStore } from "@/stores/useCartStore";

interface ProductDetailScreenProps {
  productId: string;
  onBack: () => void;
  onGoToCart: () => void;
}

export const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({
  productId,
  onBack,
  onGoToCart,
}) => {
  const product = getProductById(productId);
  const isInWishlist = useWishlistStore((state) => state.isInWishlist(productId));
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
  const addItem = useCartStore((state) => state.addItem);

  const [isAdded, setIsAdded] = useState(false);

  if (!product) {
    return (
      <div style={{ padding: "30px 20px", textAlign: "center" }}>
        <BackButton onClick={onBack} label="Back to Shop" />
        <p style={{ marginTop: "40px", color: "var(--text-muted)" }}>Piece not found.</p>
      </div>
    );
  }

  const primaryImage = product.images?.[0]?.url || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80";

  const handleAddToCart = () => {
    addItem(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div style={{ paddingBottom: "80px" }}>
      {/* Top Nav Bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 16px",
          background: "rgba(13, 11, 10, 0.9)",
          position: "sticky",
          top: 0,
          zIndex: 20,
          borderBottom: "1px solid var(--border-subtle)",
        }}
      >
        <BackButton onClick={onBack} label="Shop" />
        <button
          onClick={() => toggleWishlist(product)}
          className="btn-ghost"
          style={{ padding: "8px", borderRadius: "50%" }}
          aria-label="Wishlist toggle"
        >
          <Heart size={18} color={isInWishlist ? "#FF8A00" : "#FBF8F5"} fill={isInWishlist ? "#FF8A00" : "transparent"} />
        </button>
      </div>

      {/* Hero Image */}
      <div style={{ position: "relative", width: "100%", aspectRatio: "1/1", overflow: "hidden" }}>
        <img
          src={primaryImage}
          alt={product.name}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "12px",
            left: "14px",
            background: "rgba(13, 11, 10, 0.8)",
            padding: "4px 10px",
            borderRadius: "6px",
            border: "1px solid rgba(255, 138, 0, 0.3)",
            fontSize: "10px",
            fontWeight: 700,
            color: "#FF8A00",
            textTransform: "uppercase",
          }}
        >
          {product.category}
        </div>
      </div>

      {/* Product Information */}
      <div style={{ padding: "20px 16px" }}>
        <span style={{ fontSize: "12px", color: "var(--text-muted)", fontWeight: 700, textTransform: "uppercase" }}>
          {product.brand}
        </span>
        <h1 style={{ fontSize: "20px", fontWeight: 800, color: "var(--text-main)", margin: "4px 0 10px", lineHeight: 1.3 }}>
          {product.name}
        </h1>

        {/* Price & Rating Row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
            <span style={{ fontSize: "22px", fontWeight: 800, color: "#FF8A00" }}>
              ${product.price.toLocaleString()}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span style={{ fontSize: "14px", color: "var(--text-faint)", textDecoration: "line-through" }}>
                ${product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "4px", background: "rgba(255, 138, 0, 0.1)", padding: "4px 8px", borderRadius: "8px" }}>
            <Star size={13} fill="#FF8A00" color="#FF8A00" />
            <span style={{ fontSize: "12px", fontWeight: 700, color: "#FF8A00" }}>{product.rating}</span>
            <span style={{ fontSize: "10px", color: "var(--text-muted)" }}>({product.reviewCount})</span>
          </div>
        </div>

        {/* Provenance and Delivery Guarantee */}
        <div style={{ background: "var(--bg-card)", border: "1px solid var(--border-card)", borderRadius: "12px", padding: "12px", display: "flex", flexDirection: "column", gap: "8px", marginBottom: "20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "var(--text-muted)" }}>
            <Truck size={15} color="#FF8A00" />
            <span>Signature insured courier dispatch worldwide</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "var(--text-muted)" }}>
            <Shield size={15} color="#FF8A00" />
            <span>Guaranteed atelier authenticity certificate included</span>
          </div>
        </div>

        {/* Description */}
        <div style={{ marginBottom: "20px" }}>
          <h3 style={{ fontSize: "14px", fontWeight: 700, color: "var(--text-main)", marginBottom: "8px" }}>Artisan Description</h3>
          <p style={{ fontSize: "13px", color: "var(--text-muted)", lineHeight: 1.6 }}>{product.description}</p>
        </div>

        {/* Features list */}
        {product.features && product.features.length > 0 && (
          <div>
            <h3 style={{ fontSize: "14px", fontWeight: 700, color: "var(--text-main)", marginBottom: "10px" }}>Specifications & Craft</h3>
            <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
              {product.features.map((feat, idx) => (
                <li key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "12px", color: "var(--text-muted)" }}>
                  <CheckCircle size={14} color="#FF8A00" style={{ marginTop: "2px", flexShrink: 0 }} />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Sticky Bottom Add to Bag Bar */}
      <div
        style={{
          position: "fixed",
          bottom: "64px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "100%",
          maxWidth: "480px",
          padding: "10px 16px",
          background: "rgba(13, 11, 10, 0.95)",
          backdropFilter: "blur(20px)",
          borderTop: "1px solid var(--border-subtle)",
          display: "flex",
          gap: "10px",
          zIndex: 40,
        }}
      >
        <button
          onClick={handleAddToCart}
          className="btn-amber"
          style={{ flex: 1 }}
        >
          {isAdded ? "Added to Bag ✓" : `Add to Bag • $${product.price.toLocaleString()}`}
        </button>
        {isAdded && (
          <button onClick={onGoToCart} className="btn-ghost" style={{ padding: "0 16px" }}>
            View Bag
          </button>
        )}
      </div>
    </div>
  );
};
