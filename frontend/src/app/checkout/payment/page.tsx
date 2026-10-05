"use client";

import { useEffect } from "react";
import { CheckoutView } from "@/components/checkout/CheckoutView";
import { useCheckoutStore } from "@/stores/useCheckoutStore";

export default function CheckoutPaymentPage() {
  const setStep = useCheckoutStore((s) => s.setStep);

  useEffect(() => {
    setStep(4);
  }, [setStep]);

  return <CheckoutView />;
}
