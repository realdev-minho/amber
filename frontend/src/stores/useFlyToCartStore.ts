import { create } from "zustand";

export interface FlyingItem {
  id: string;
  imageUrl: string;
  startX: number;
  startY: number;
  startWidth: number;
  startHeight: number;
  endX: number;
  endY: number;
}

interface FlyToCartState {
  flyingItems: FlyingItem[];
  triggerFly: (imageUrl: string, startElement: HTMLElement) => void;
  removeFlyingItem: (id: string) => void;
}

export const useFlyToCartStore = create<FlyToCartState>((set) => ({
  flyingItems: [],

  triggerFly: (imageUrl: string, startElement: HTMLElement) => {
    if (typeof window === "undefined") return;

    const startRect = startElement.getBoundingClientRect();
    const cartEl = document.getElementById("navbar-cart-icon");

    let endX = window.innerWidth - 48;
    let endY = 24;

    if (cartEl) {
      const cartRect = cartEl.getBoundingClientRect();
      endX = cartRect.left + cartRect.width / 2;
      endY = cartRect.top + cartRect.height / 2;
    }

    const newItem: FlyingItem = {
      id: `fly-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      imageUrl,
      startX: startRect.left,
      startY: startRect.top,
      startWidth: Math.min(startRect.width, 100),
      startHeight: Math.min(startRect.height, 100),
      endX,
      endY,
    };

    set((state) => ({
      flyingItems: [...state.flyingItems, newItem],
    }));

    // Trigger subtle bounce on the cart icon when item lands
    setTimeout(() => {
      if (cartEl) {
        cartEl.classList.add("scale-125");
        setTimeout(() => cartEl.classList.remove("scale-125"), 200);
      }
    }, 700);
  },

  removeFlyingItem: (id: string) => {
    set((state) => ({
      flyingItems: state.flyingItems.filter((item) => item.id !== id),
    }));
  },
}));
