"use client";

import { useFlyToCartStore } from "@/stores/useFlyToCartStore";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export function FlyToCartOverlay() {
  const flyingItems = useFlyToCartStore((s) => s.flyingItems);
  const removeFlyingItem = useFlyToCartStore((s) => s.removeFlyingItem);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      <AnimatePresence>
        {flyingItems.map((item) => (
          <motion.div
            key={item.id}
            initial={{
              position: "fixed",
              top: item.startY,
              left: item.startX,
              width: item.startWidth,
              height: item.startHeight,
              scale: 1,
              opacity: 1,
              rotate: 0,
              borderRadius: "16px",
            }}
            animate={{
              top: item.endY - 20,
              left: item.endX - 20,
              width: 40,
              height: 40,
              scale: 0.15,
              opacity: 0.2,
              rotate: 25,
              borderRadius: "9999px",
            }}
            transition={{
              duration: 0.75,
              ease: [0.16, 1, 0.3, 1],
            }}
            onAnimationComplete={() => removeFlyingItem(item.id)}
            className="overflow-hidden shadow-2xl border-2 border-[#FF8A00] bg-[#1A1614] z-[9999]"
          >
            <div className="relative w-full h-full">
              <Image
                src={item.imageUrl}
                alt="Product in flight"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
