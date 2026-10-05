"use client";

import { useEffect } from "react";
import { CheckoutView } from "@/components/checkout/CheckoutView";
import { useCheckoutStore } from "@/stores/useCheckoutStore";

export default function CheckoutReviewPage() {
  const setStep = useCheckoutStore((s) => s.setStep);

  useEffect(() => {
    setStep(5);
  }, [setStep]);

  return <CheckoutView />;
}
