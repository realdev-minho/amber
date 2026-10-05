"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Star, Truck } from "lucide-react";
import { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/stores/useCartStore";
import { useWishlistStore } from "@/stores/useWishlistStore";
import { useFlyToCartStore } from "@/stores/useFlyToCartStore";
import { motion } from "framer-motion";

export function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);
  const { toggleWishlist, isInWishlist } = useWishlistStore();
  const isWished = isInWishlist(product.id);

  const primaryImage = product.images?.[0]?.url || "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&auto=format&fit=crop&q=80";

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    useFlyToCartStore.getState().triggerFly(primaryImage, e.currentTarget);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.3 }}
      className="group relative flex flex-col rounded-2xl bg-[#1A1614] border border-white/6 hover:border-[#FF8A00]/40 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-black/70"
    >
      {/* Image container */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#12100F]">
        <Link href={`/product/${product.slug}`} className="block w-full h-full">
          <Image
            src={primaryImage}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10 pointer-events-none">
          {product.discountPercentage && product.discountPercentage > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-[#FF8A00] text-black text-[10px] font-bold tracking-tight shadow-md">
              -{product.discountPercentage}%
            </span>
          )}
          {product.freeShipping && (
            <span className="px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[#FBF8F5] text-[9px] font-medium flex items-center gap-1 shadow-md">
              <Truck className="w-2.5 h-2.5 text-[#FF8A00]" /> Free
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product);
          }}
          aria-label={isWished ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:scale-110 active:scale-90 transition-all z-10"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isWished ? "fill-[#FF8A00] text-[#FF8A00]" : "text-stone-300 hover:text-white"
            }`}
          />
        </button>

        {/* Add to Cart Button on desktop hover */}
        <div className="absolute inset-x-3 bottom-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden sm:block">
          <button
            type="button"
            onClick={handleAddToCart}
            aria-label={`Add ${product.name} to cart`}
            className="w-full py-2.5 rounded-xl bg-[#FF8A00] hover:bg-[#F97316] text-black font-bold text-xs flex items-center justify-center gap-1.5 shadow-xl transition-all active:scale-95"
          >
            <ShoppingBag className="w-3.5 h-3.5" /> Add to cart
          </button>
        </div>
      </div>

      {/* Info Section */}
      <div className="p-3 sm:p-4 flex flex-col flex-1 justify-between gap-2">
        <div>
          <div className="flex items-center justify-between text-[11px] text-[#9E948C]">
            <span className="font-medium tracking-wide uppercase">{product.brand}</span>
            <div className="flex items-center gap-1 text-amber-400">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span className="font-semibold text-stone-200">{product.rating.toFixed(1)}</span>
              <span className="text-[10px] text-stone-500">({product.reviewCount})</span>
            </div>
          </div>

          <Link href={`/product/${product.slug}`} className="block mt-1">
            <h3 className="text-xs sm:text-sm font-medium text-[#FBF8F5] line-clamp-1 group-hover:text-[#FF8A00] transition-colors">
              {product.name}
            </h3>
          </Link>
        </div>

        <div className="flex items-center justify-between pt-1">
          <div className="flex items-baseline gap-1.5">
            <span className="text-sm sm:text-base font-bold text-[#FBF8F5]">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-[11px] text-stone-500 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Mobile add to cart button */}
          <button
            type="button"
            onClick={handleAddToCart}
            aria-label={`Add ${product.name} to cart`}
            className="sm:hidden p-2 rounded-lg bg-[#FF8A00] text-black active:scale-95 transition-transform"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
