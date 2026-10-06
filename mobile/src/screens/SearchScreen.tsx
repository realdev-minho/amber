import React, { useState, useMemo } from "react";
import { Search, X } from "lucide-react";
import { PRODUCTS, searchProducts } from "@/constants/products";
import { ProductCard } from "@/components/product/ProductCard";

interface SearchScreenProps {
  onSelectProduct: (productId: string) => void;
}

const POPULAR_SEARCHES = ["Ceramic", "Acoustics", "Titanium", "Leather", "Automatic", "Chronograph"];

export const SearchScreen: React.FC<SearchScreenProps> = ({ onSelectProduct }) => {
  const [query, setQuery] = useState("");

  const searchResults = useMemo(() => {
    if (!query.trim()) return PRODUCTS.slice(0, 8);
    return searchProducts(query);
  }, [query]);

  return (
    <div style={{ padding: "16px 14px" }}>
      {/* Search Input Box */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          background: "var(--bg-card)",
          border: "1px solid var(--border-subtle)",
          borderRadius: "14px",
          padding: "12px 14px",
          marginBottom: "16px",
        }}
      >
        <Search size={18} color="#FF8A00" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by piece, brand, or material..."
          style={{
            background: "transparent",
            border: "none",
            color: "var(--text-main)",
            fontSize: "13px",
            outline: "none",
            width: "100%",
          }}
          autoFocus
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            style={{ background: "none", border: "none", cursor: "pointer", display: "flex", padding: 0 }}
          >
            <X size={16} color="#9E948C" />
          </button>
        )}
      </div>

      {/* Popular quick searches */}
      <div style={{ marginBottom: "20px" }}>
        <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--text-faint)", textTransform: "uppercase" }}>
          Trending Curations
        </span>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "8px" }}>
          {POPULAR_SEARCHES.map((term) => (
            <button
              key={term}
              onClick={() => setQuery(term)}
              style={{
                background: "rgba(255, 255, 255, 0.04)",
                border: "1px solid var(--border-subtle)",
                borderRadius: "16px",
                padding: "6px 12px",
                color: "var(--text-muted)",
                fontSize: "11px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              {term}
            </button>
          ))}
        </div>
      </div>

      {/* Results Header */}
      <div style={{ marginBottom: "12px" }}>
        <span style={{ fontSize: "13px", fontWeight: 700, color: "var(--text-main)" }}>
          {query.trim() ? `Search Results (${searchResults.length})` : "Curated Recommendations"}
        </span>
      </div>

      {/* Results Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "12px",
        }}
      >
        {searchResults.map((product) => (
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
