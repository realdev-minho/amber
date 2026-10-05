"use client";

import { useEffect } from "react";
import { useCheckoutStore } from "@/stores/useCheckoutStore";
import { useAuthStore } from "@/stores/useAuthStore";
import { useCartStore } from "@/stores/useCartStore";
import { CheckoutStepper } from "./CheckoutStepper";
import { CheckoutAddressStep } from "./CheckoutAddressStep";
import { CheckoutDeliveryStep } from "./CheckoutDeliveryStep";
import { CheckoutPaymentStep } from "./CheckoutPaymentStep";
import { CheckoutReviewStep } from "./CheckoutReviewStep";
import { CheckoutOrderSummary } from "./CheckoutOrderSummary";
import { GoogleOAuthButton } from "@/components/auth/GoogleOAuthButton";
import { BackButton } from "@/components/ui/BackButton";
import Link from "next/link";
import { ShoppingBag, ArrowRight } from "lucide-react";

export function CheckoutView() {
  const { step, setStep, deliveryMethod } = useCheckoutStore();
  const { isAuthenticated } = useAuthStore();
  const cartItems = useCartStore((s) => s.items);

  useEffect(() => {
    if (!isAuthenticated && step > 1) {
      setStep(1);
    }
  }, [isAuthenticated, step, setStep]);

  const handleStepClick = (targetStep: number) => {
    if (!isAuthenticated && targetStep > 1) return;
    setStep(targetStep);
  };

  const subtotal = useCartStore((s) => s.getSubtotal)();
  const deliveryFee = deliveryMethod === "express" ? 7500 : (subtotal > 100000 ? 0 : 3500);

  if (cartItems.length === 0) {
    return (
      <div className="max-w-md mx-auto px-4 py-24 text-center">
        <div className="w-16 h-16 rounded-3xl bg-[#FF8A00]/10 border border-[#FF8A00]/25 flex items-center justify-center mx-auto mb-4">
          <ShoppingBag className="w-8 h-8 text-[#FF8A00]" />
        </div>
        <h2 className="text-2xl font-bold text-white">Your bag is empty</h2>
        <p className="text-xs text-[#9E948C] mt-2 mb-6">Add products to your bag before checking out.</p>
        <Link
          href="/shop"
          className="px-6 py-3 rounded-xl bg-[#FF8A00] hover:bg-[#F97316] text-black font-bold text-xs inline-block"
        >
          Explore Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <BackButton label="Back to Bag" fallbackHref="/cart" />
      <div className="pb-6 mb-4">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#FBF8F5] tracking-tight">Express Checkout</h1>
      </div>

      <CheckoutStepper currentStep={step} onStepClick={handleStepClick} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl glass-panel border border-white/8">
          {/* STEP 1: AUTHENTICATION */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-white">Customer Identification</h2>
                <p className="text-xs text-[#9E948C] mt-1">Sign in for member perks, order tracking, and auto-saved addresses.</p>
              </div>

              {isAuthenticated ? (
                <div className="p-5 rounded-2xl bg-[#1A1614] border border-[#FF8A00]/30 space-y-4">
                  <p className="text-xs text-stone-300">
                    You are signed in. Click below to continue directly with your saved details.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="w-full py-3 rounded-xl bg-[#FF8A00] hover:bg-[#F97316] text-black font-bold text-xs flex items-center justify-center gap-2 transition-all active:scale-95"
                  >
                    Continue as Member <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="space-y-5">
                  <GoogleOAuthButton text="Fast Checkout with Google" />

                  <div className="relative flex items-center justify-center">
                    <div className="border-t border-white/10 w-full" />
                    <span className="bg-[#1A1614] px-3 text-[10px] text-[#9E948C] uppercase tracking-wider relative">
                      Or continue
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Link
                      href="/auth/sign-in?redirect=/checkout"
                      className="py-3 text-center rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-white transition-colors"
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/auth/sign-up?redirect=/checkout"
                      className="py-3 text-center rounded-xl bg-[#FF8A00] hover:bg-[#F97316] text-black font-bold text-xs transition-colors"
                    >
                      Create Account
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 2: ADDRESS */}
          {step === 2 && <CheckoutAddressStep onContinue={() => setStep(3)} />}

          {/* STEP 3: DELIVERY */}
          {step === 3 && <CheckoutDeliveryStep onContinue={() => setStep(4)} onBack={() => setStep(2)} />}

          {/* STEP 4: PAYMENT */}
          {step === 4 && <CheckoutPaymentStep onContinue={() => setStep(5)} onBack={() => setStep(3)} />}

          {/* STEP 5: REVIEW */}
          {step === 5 && <CheckoutReviewStep onBack={() => setStep(4)} />}
        </div>

        {/* Sidebar Summary */}
        <div className="lg:col-span-5 sticky top-28">
          <CheckoutOrderSummary deliveryFeeOverride={deliveryFee} />
        </div>
      </div>
    </div>
  );
}
