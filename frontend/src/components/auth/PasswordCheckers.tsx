"use client";

import { Check, X } from "lucide-react";

interface PasswordCheckersProps {
  password: string;
}

export function PasswordCheckers({ password }: PasswordCheckersProps) {
  const criteria = [
    { label: "At least 8 characters", valid: password.length >= 8 },
    { label: "One uppercase letter", valid: /[A-Z]/.test(password) },
    { label: "One number (0-9)", valid: /[0-9]/.test(password) },
    { label: "One special character", valid: /[^A-Za-z0-9]/.test(password) },
  ];

  return (
    <div className="p-3 rounded-xl bg-[#12100F] border border-white/6 space-y-1.5 mt-2">
      <p className="text-[11px] font-semibold text-[#9E948C] mb-1">Password Requirements:</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
        {criteria.map((item, i) => (
          <div key={i} className="flex items-center gap-1.5 text-[11px]">
            {item.valid ? (
              <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            ) : (
              <X className="w-3.5 h-3.5 text-stone-600 shrink-0" />
            )}
            <span className={item.valid ? "text-emerald-400 font-medium" : "text-stone-500"}>
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
