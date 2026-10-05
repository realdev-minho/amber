"use client";

import { useToastStore } from "@/stores/useToastStore";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

export function ToastContainer() {
  const { toasts, removeToast } = useToastStore();

  return (
    <div
      aria-live="polite"
      className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none"
    >
      <AnimatePresence>
        {toasts.map((toast) => {
          const isSuccess = toast.type === "success";
          const isError = toast.type === "error";

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              className="pointer-events-auto rounded-2xl glass-panel-elevated p-4 flex items-start gap-3 border shadow-2xl relative overflow-hidden"
              style={{
                borderColor: isSuccess
                  ? "rgba(255, 138, 0, 0.4)"
                  : isError
                  ? "rgba(239, 68, 68, 0.4)"
                  : "rgba(255, 255, 255, 0.15)",
              }}
            >
              <div
                className="w-1.5 absolute left-0 top-0 bottom-0"
                style={{
                  backgroundColor: isSuccess ? "#FF8A00" : isError ? "#EF4444" : "#9E948C",
                }}
              />
              <div className="mt-0.5 shrink-0">
                {isSuccess && <CheckCircle2 className="w-5 h-5 text-[#FF8A00]" />}
                {isError && <AlertCircle className="w-5 h-5 text-red-500" />}
                {!isSuccess && !isError && <Info className="w-5 h-5 text-stone-300" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[#FBF8F5] leading-tight">{toast.title}</p>
                {toast.description && (
                  <p className="text-xs text-[#9E948C] mt-1 leading-relaxed">
                    {toast.description}
                  </p>
                )}
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                aria-label="Close notification"
                className="text-stone-400 hover:text-white transition-colors p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
