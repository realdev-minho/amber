"use client";

import { Check } from "lucide-react";

interface CheckoutStepperProps {
  currentStep: number;
  onStepClick?: (step: number) => void;
}

export function CheckoutStepper({ currentStep, onStepClick }: CheckoutStepperProps) {
  const steps = [
    { number: 1, title: "Account" },
    { number: 2, title: "Address" },
    { number: 3, title: "Delivery" },
    { number: 4, title: "Payment" },
    { number: 5, title: "Review" },
  ];

  return (
    <div className="w-full pb-8">
      <div className="max-w-xl mx-auto flex items-center justify-between">
        {steps.map((s, index) => {
          const isCompleted = s.number < currentStep;
          const isActive = s.number === currentStep;

          return (
            <div key={s.number} className="flex-1 flex items-center last:flex-none">
              {/* Step indicator node */}
              <div className="flex flex-col items-center relative group">
                <button
                  type="button"
                  disabled={s.number > currentStep}
                  onClick={() => onStepClick && onStepClick(s.number)}
                  aria-label={`Step ${s.number}: ${s.title}`}
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    isCompleted
                      ? "bg-[#FF8A00] text-black"
                      : isActive
                      ? "bg-[#FF8A00] text-black ring-4 ring-[#FF8A00]/20"
                      : "bg-[#1A1614] border border-white/15 text-stone-500"
                  }`}
                >
                  {isCompleted ? <Check className="w-4 h-4 stroke-[3]" /> : s.number}
                </button>
                <span
                  className={`text-[11px] font-medium mt-1.5 absolute -bottom-5 whitespace-nowrap hidden sm:block ${
                    isActive ? "text-[#FF8A00] font-bold" : isCompleted ? "text-stone-300" : "text-stone-500"
                  }`}
                >
                  {s.title}
                </span>
              </div>

              {/* Segment line connecting to the next step */}
              {index < steps.length - 1 && (
                <div className="flex-1 h-[2px] mx-2 bg-white/10 overflow-hidden rounded-full">
                  <div
                    className={`h-full transition-all duration-300 ${
                      s.number < currentStep ? "bg-[#FF8A00] w-full" : "w-0"
                    }`}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="h-4 sm:h-5" />
    </div>
  );
}
