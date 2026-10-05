import React, { useState, useMemo } from "react";
import { SlidersHorizontal, Sparkles } from "lucide-react";
import { PRODUCTS } from "@/constants/products";
import { ProductCard } from "@/components/product/ProductCard";

interface ShopScreenProps {
  onSelectProduct: (productId: string) => void;
}

const CATEGORIES = [
  { id: "all", label: "All Collections" },
  { id: "audio", label: "Studio Acoustics" },
  { id: "watches", label: "Horology" },
  { id: "fashion", label: "Fashion & Leather" },
  { id: "home", label: "Architectural Home" },
];

export const ShopScreen: React.FC<ShopScreenProps> = ({ onSelectProduct }) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "rating">("featured");

  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    if (selectedCategory !== "all") {
      result = result.filter(
        (p) =>
          p.category.toLowerCase().includes(selectedCategory) ||
          (selectedCategory === "audio" && p.category.toLowerCase().includes("acoustic")) ||
          (selectedCategory === "watches" && p.category.toLowerCase().includes("horology"))
      );
    }

    if (sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [selectedCategory, sortBy]);

  return (
    <div style={{ padding: "16px 14px" }}>
      {/* Category Pills Slider */}
      <div
        style={{
          display: "flex",
          gap: "8px",
          overflowX: "auto",
          paddingBottom: "12px",
          scrollbarWidth: "none",
        }}
      >
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              style={{
                whiteSpace: "nowrap",
                padding: "8px 14px",
                borderRadius: "20px",
                border: isSelected ? "1px solid #FF8A00" : "1px solid var(--border-subtle)",
                background: isSelected ? "rgba(255, 138, 0, 0.12)" : "var(--bg-card)",
                color: isSelected ? "#FF8A00" : "var(--text-muted)",
                fontSize: "12px",
                fontWeight: isSelected ? 700 : 500,
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Filter and Count Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          margin: "8px 0 16px",
          padding: "0 2px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <Sparkles size={14} color="#FF8A00" />
          <span style={{ fontSize: "12px", color: "var(--text-muted)", fontWeight: 600 }}>
            {filteredProducts.length} Exclusive Pieces
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <SlidersHorizontal size={13} color="#9E948C" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            style={{
              background: "transparent",
              color: "var(--text-main)",
              border: "none",
              fontSize: "12px",
              fontWeight: 600,
              outline: "none",
              cursor: "pointer",
            }}
          >
            <option value="featured" style={{ background: "#1B1715" }}>Featured</option>
            <option value="price-asc" style={{ background: "#1B1715" }}>Price: Low to High</option>
            <option value="price-desc" style={{ background: "#1B1715" }}>Price: High to Low</option>
            <option value="rating" style={{ background: "#1B1715" }}>Top Rated</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "12px",
        }}
      >
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onSelect={onSelectProduct}
          />
        ))}
      </div>
    </div>
  );
};
