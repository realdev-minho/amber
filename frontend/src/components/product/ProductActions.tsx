"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Product } from "@/types";
import { useCartStore } from "@/stores/useCartStore";
import { useWishlistStore } from "@/stores/useWishlistStore";
import { ShoppingBag, Heart, Share2, Plus, Minus, ArrowRight } from "lucide-react";
import { ProductShareModal } from "./ProductShareModal";
import { useFlyToCartStore } from "@/stores/useFlyToCartStore";

export function ProductActions({ product }: { product: Product }) {
  const router = useRouter();
  const addItem = useCartStore((s) => s.addItem);
  const { toggleWishlist, isInWishlist } = useWishlistStore();
  const isWished = isInWishlist(product.id);

  const [selectedColor, setSelectedColor] = useState<string | undefined>(product.colors?.[0]);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(product.sizes?.[0]);
  const [quantity, setQuantity] = useState<number>(1);
  const [isShareOpen, setIsShareOpen] = useState(false);

  const handleAddToCart = (e?: React.MouseEvent<HTMLButtonElement>) => {
    addItem(product, {
      color: selectedColor,
      size: selectedSize,
      quantity,
    });
    if (e) {
      const img = product.images?.[0]?.url || "";
      useFlyToCartStore.getState().triggerFly(img, e.currentTarget);
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push("/checkout");
  };

  return (
    <div className="space-y-6 pt-4 border-t border-white/8">
      {/* Colors */}
      {product.colors && product.colors.length > 0 && (
        <div>
          <span className="text-xs font-semibold text-stone-300">
            Color: <strong className="text-white">{selectedColor}</strong>
          </span>
          <div className="flex flex-wrap gap-2 mt-2">
            {product.colors.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => setSelectedColor(color)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                  selectedColor === color
                    ? "border-[#FF8A00] bg-[#FF8A00]/15 text-[#FF8A00] shadow-sm"
                    : "border-white/10 text-stone-300 hover:border-white/20"
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Sizes */}
      {product.sizes && product.sizes.length > 0 && (
        <div>
          <span className="text-xs font-semibold text-stone-300">
            Size: <strong className="text-white">{selectedSize}</strong>
          </span>
          <div className="flex flex-wrap gap-2 mt-2">
            {product.sizes.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => setSelectedSize(size)}
                className={`w-11 h-10 rounded-xl text-xs font-semibold border flex items-center justify-center transition-all ${
                  selectedSize === size
                    ? "border-[#FF8A00] bg-[#FF8A00] text-black font-bold"
                    : "border-white/10 text-stone-300 hover:border-white/20"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity Selector */}
      <div className="flex items-center gap-4">
        <span className="text-xs font-semibold text-stone-300">Quantity:</span>
        <div className="flex items-center rounded-xl bg-[#1A1614] border border-white/10 p-1">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            aria-label="Decrease quantity"
            className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-white/5 transition-colors disabled:opacity-30"
            disabled={quantity <= 1}
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <span className="w-10 text-center text-xs font-bold text-white">{quantity}</span>
          <button
            type="button"
            onClick={() => setQuantity((q) => q + 1)}
            aria-label="Increase quantity"
            className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          type="button"
          onClick={(e) => handleAddToCart(e)}
          className="flex-1 py-3.5 px-6 rounded-2xl bg-[#FF8A00] hover:bg-[#F97316] text-black font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#FF8A00]/25 transition-all active:scale-95"
        >
          <ShoppingBag className="w-4 h-4 stroke-[2.5]" /> Add to cart
        </button>

        <button
          type="button"
          onClick={handleBuyNow}
          className="flex-1 py-3.5 px-6 rounded-2xl bg-white/8 hover:bg-white/12 border border-white/15 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all active:scale-95"
        >
          Buy Now <ArrowRight className="w-4 h-4" />
        </button>

        <div className="flex gap-2 justify-center sm:justify-start">
          <button
            type="button"
            onClick={() => toggleWishlist(product)}
            aria-label="Toggle wishlist"
            className="p-3.5 rounded-2xl bg-[#1A1614] border border-white/10 hover:border-[#FF8A00]/40 text-stone-300 hover:text-white transition-all active:scale-95"
          >
            <Heart className={`w-5 h-5 ${isWished ? "fill-[#FF8A00] text-[#FF8A00]" : ""}`} />
          </button>

          <button
            type="button"
            onClick={() => setIsShareOpen(true)}
            aria-label="Share product"
            className="p-3.5 rounded-2xl bg-[#1A1614] border border-white/10 hover:border-white/20 text-stone-300 hover:text-white transition-all active:scale-95"
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {isShareOpen && (
        <ProductShareModal product={product} onClose={() => setIsShareOpen(false)} />
      )}
    </div>
  );
}
