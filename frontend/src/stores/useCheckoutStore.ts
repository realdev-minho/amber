import { create } from "zustand";
import { Address } from "@/types";

export type DeliveryMethod = "standard" | "express";
export type PaymentMethod = "card" | "transfer" | "ussd" | "paystack" | "crypto";

interface CheckoutStore {
  step: number;
  shippingAddress: Address | null;
  deliveryMethod: DeliveryMethod;
  paymentMethod: PaymentMethod;
  savedAddresses: Address[];
  setStep: (step: number) => void;
  setShippingAddress: (address: Address) => void;
  setDeliveryMethod: (method: DeliveryMethod) => void;
  setPaymentMethod: (method: PaymentMethod) => void;
  addSavedAddress: (address: Address) => void;
  resetCheckout: () => void;
}

export const useCheckoutStore = create<CheckoutStore>((set) => ({
  step: 1,
  shippingAddress: null,
  deliveryMethod: "standard",
  paymentMethod: "card",
  savedAddresses: [],

  setStep: (step) => set({ step }),
  setShippingAddress: (shippingAddress) => set({ shippingAddress }),
  setDeliveryMethod: (deliveryMethod) => set({ deliveryMethod }),
  setPaymentMethod: (paymentMethod) => set({ paymentMethod }),
  addSavedAddress: (address) =>
    set((state) => ({ savedAddresses: [address, ...state.savedAddresses] })),
  resetCheckout: () =>
    set({
      step: 1,
      deliveryMethod: "standard",
      paymentMethod: "card",
    }),
}));
