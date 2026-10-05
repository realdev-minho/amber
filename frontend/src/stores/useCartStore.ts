import { create } from "zustand";
import { CartItem, Product, ProductVariant } from "@/types";
import { toast } from "./useToastStore";

interface CartStore {
  items: CartItem[];
  addItem: (product: Product, options?: { variant?: ProductVariant; color?: string; size?: string; quantity?: number }) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
  setItems: (items: CartItem[]) => void;
  getTotalItems: () => number;
  getSubtotal: () => number;
  getDeliveryFee: () => number;
  getTotal: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],

  setItems: (items) => set({ items }),

  addItem: (product, options) => {
    const quantity = options?.quantity && options.quantity > 0 ? options.quantity : 1;
    const selectedColor = options?.color;
    const selectedSize = options?.size;
    const variant = options?.variant;
    const price = product.price + (variant?.priceModifier || 0);

    const existingIndex = get().items.findIndex(
      (item) =>
        item.productId === product.id &&
        item.selectedColor === selectedColor &&
        item.selectedSize === selectedSize &&
        item.variantId === variant?.id
    );

    let updatedItems: CartItem[];
    if (existingIndex > -1) {
      updatedItems = [...get().items];
      updatedItems[existingIndex].quantity += quantity;
    } else {
      const newItem: CartItem = {
        id: `cart-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        productId: product.id,
        product,
        variantId: variant?.id,
        variant,
        selectedColor,
        selectedSize,
        quantity,
        price,
      };
      updatedItems = [...get().items, newItem];
    }

    set({ items: updatedItems });
    toast.success("Added to Cart", `${product.name} (${quantity}) added to your bag`);
  },

  updateQuantity: (itemId, quantity) => {
    if (quantity < 1) return;
    const updatedItems = get().items.map((item) =>
      item.id === itemId ? { ...item, quantity: Math.floor(quantity) } : item
    );
    set({ items: updatedItems });
  },

  removeItem: (itemId) => {
    const itemToRemove = get().items.find((item) => item.id === itemId);
    const updatedItems = get().items.filter((item) => item.id !== itemId);
    set({ items: updatedItems });
    if (itemToRemove) {
      toast.info("Removed from Cart", `${itemToRemove.product.name} removed from your bag`);
    }
  },

  clearCart: () => {
    set({ items: [] });
  },

  getTotalItems: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0);
  },

  getSubtotal: () => {
    return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
  },

  getDeliveryFee: () => {
    const subtotal = get().getSubtotal();
    if (subtotal === 0) return 0;
    return subtotal > 100000 ? 0 : 3500;
  },

  getTotal: () => {
    return get().getSubtotal() + get().getDeliveryFee();
  },
}));
