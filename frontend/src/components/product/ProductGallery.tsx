"use client";

import { useState } from "react";
import Image from "next/image";
import { ProductImage } from "@/types";

interface ProductGalleryProps {
  images: ProductImage[];
  productName: string;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [selectedIdx, setSelectedIdx] = useState(0);

  const displayImages = images.length > 0 ? images : [
    { id: "fallback", url: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=1000&auto=format&fit=crop&q=80", altText: productName, isPrimary: true }
  ];

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4">
      {/* Thumbnails rail */}
      {displayImages.length > 1 && (
        <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-visible no-scrollbar pb-2 md:pb-0">
          {displayImages.map((img, idx) => (
            <button
              key={img.id || idx}
              type="button"
              onClick={() => setSelectedIdx(idx)}
              aria-label={`View photo ${idx + 1}`}
              className={`relative w-16 h-20 sm:w-20 sm:h-24 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                idx === selectedIdx
                  ? "border-[#FF8A00] ring-2 ring-[#FF8A00]/20"
                  : "border-white/10 opacity-60 hover:opacity-100"
              }`}
            >
              <Image src={img.url} alt={img.altText || productName} fill className="object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Main active image */}
      <div className="relative aspect-[4/5] flex-1 rounded-3xl overflow-hidden bg-[#1A1614] border border-white/8 shadow-2xl">
        <Image
          src={displayImages[selectedIdx].url}
          alt={displayImages[selectedIdx].altText || productName}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-all duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
      </div>
    </div>
  );
}
