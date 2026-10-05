import { Suspense } from "react";
import { ResetPasswordClient } from "./ResetPasswordClient";

export const metadata = {
  title: "Reset Password — Amber",
  description: "Set a new secure password for your Amber account.",
};

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[85vh] flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-[#FF8A00] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <ResetPasswordClient />
    </Suspense>
  );
}
