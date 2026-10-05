import { Suspense } from "react";
import { VerifyClient } from "./VerifyClient";

export const metadata = {
  title: "Verify Email — Amber",
  description: "Verify your email address to activate your Amber account.",
};

export default function VerifyPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[85vh] flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-[#FF8A00] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <VerifyClient />
    </Suspense>
  );
}
