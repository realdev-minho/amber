"use client";

import Image from "next/image";
import Link from "next/link";
import { CartItem } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/stores/useCartStore";
import { useWishlistStore } from "@/stores/useWishlistStore";
import { Minus, Plus, Trash2, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function CartItemList({ items }: { items: CartItem[] }) {
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const addItemToWishlist = useWishlistStore((s) => s.addItem);

  const handleSaveForLater = (item: CartItem) => {
    addItemToWishlist(item.product);
    removeItem(item.id);
  };

  return (
    <div className="space-y-4">
      <AnimatePresence initial={false}>
        {items.map((item) => {
          const itemImage =
            item.product.images?.[0]?.url ||
            "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&auto=format&fit=crop&q=80";

          return (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0, overflow: "hidden" }}
              transition={{ duration: 0.25 }}
              className="p-4 sm:p-5 rounded-2xl bg-[#1A1614] border border-white/6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between"
            >
              {/* Product Info */}
              <div className="flex items-center gap-4 min-w-0">
                <Link
                  href={`/product/${item.product.slug}`}
                  className="relative w-20 h-24 rounded-xl overflow-hidden bg-black shrink-0 border border-white/10"
                >
                  <Image src={itemImage} alt={item.product.name} fill className="object-cover" />
                </Link>

                <div className="min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF8A00]">
                    {item.product.brand}
                  </span>
                  <Link href={`/product/${item.product.slug}`} className="block">
                    <h3 className="text-sm font-semibold text-[#FBF8F5] truncate hover:text-[#FF8A00] transition-colors">
                      {item.product.name}
                    </h3>
                  </Link>

                  {/* Selected Variants */}
                  <div className="flex flex-wrap gap-2 text-xs text-stone-400 mt-1">
                    {item.selectedColor && <span>Color: <strong className="text-stone-200">{item.selectedColor}</strong></span>}
                    {item.selectedSize && <span>Size: <strong className="text-stone-200">{item.selectedSize}</strong></span>}
                  </div>

                  <p className="text-xs font-bold text-white mt-1.5 sm:hidden">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              </div>

              {/* Quantity and Actions */}
              <div className="flex items-center justify-between w-full sm:w-auto gap-6 pt-3 sm:pt-0 border-t sm:border-t-0 border-white/5">
                {/* Quantity Controls */}
                <div className="flex items-center rounded-xl bg-[#12100F] border border-white/10 p-1">
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    aria-label="Decrease item quantity"
                    className="p-1 rounded-md text-stone-400 hover:text-white disabled:opacity-30"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-8 text-center text-xs font-bold text-white">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    aria-label="Increase item quantity"
                    className="p-1 rounded-md text-stone-400 hover:text-white"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Subtotal */}
                <div className="hidden sm:block text-right min-w-[90px]">
                  <p className="text-sm font-bold text-[#FBF8F5]">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                  <p className="text-[10px] text-stone-500">
                    {formatPrice(item.price)} each
                  </p>
                </div>

                {/* Remove & Save for Later */}
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => handleSaveForLater(item)}
                    aria-label="Save item for later in wishlist"
                    className="p-2 rounded-lg text-stone-400 hover:text-[#FF8A00] hover:bg-white/5 transition-colors"
                  >
                    <Heart className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    aria-label="Remove item from bag"
                    className="p-2 rounded-lg text-stone-400 hover:text-red-400 hover:bg-white/5 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
