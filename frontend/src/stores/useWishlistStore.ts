import { create } from "zustand";
import { Product } from "@/types";
import { toast } from "./useToastStore";

interface WishlistStore {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
  setItems: (items: Product[]) => void;
  getTotalItems: () => number;
}

export const useWishlistStore = create<WishlistStore>((set, get) => ({
  items: [],

  setItems: (items) => set({ items }),

  addItem: (product) => {
    if (get().isInWishlist(product.id)) return;
    const updated = [...get().items, product];
    set({ items: updated });
    toast.success("Saved to Wishlist", `${product.name} saved for later`);
  },

  removeItem: (productId) => {
    const removed = get().items.find((p) => p.id === productId);
    const updated = get().items.filter((p) => p.id !== productId);
    set({ items: updated });
    if (removed) {
      toast.info("Removed from Wishlist", `${removed.name} removed from saved items`);
    }
  },

  toggleWishlist: (product) => {
    if (get().isInWishlist(product.id)) {
      get().removeItem(product.id);
    } else {
      get().addItem(product);
    }
  },

  isInWishlist: (productId) => {
    return get().items.some((item) => item.id === productId);
  },

  clearWishlist: () => {
    set({ items: [] });
  },

  getTotalItems: () => {
    return get().items.length;
  },
}));
