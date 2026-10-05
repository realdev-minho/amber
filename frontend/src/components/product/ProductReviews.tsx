"use client";

import { useState } from "react";
import { Review } from "@/types";
import { Star, CheckCircle, ThumbsUp, PenSquare } from "lucide-react";
import Image from "next/image";
import { ReviewFormModal } from "./ReviewFormModal";

interface ProductReviewsProps {
  productId: string;
  initialReviews: Review[];
  rating: number;
  reviewCount: number;
}

export function ProductReviews({ productId, initialReviews, rating, reviewCount }: ProductReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [helpfulClicked, setHelpfulClicked] = useState<Record<string, boolean>>({});

  const distribution = [
    { stars: 5, pct: 78 },
    { stars: 4, pct: 16 },
    { stars: 3, pct: 4 },
    { stars: 2, pct: 1 },
    { stars: 1, pct: 1 },
  ];

  const handleHelpful = (id: string) => {
    if (helpfulClicked[id]) return;
    setHelpfulClicked((prev) => ({ ...prev, [id]: true }));
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, helpfulCount: r.helpfulCount + 1 } : r))
    );
  };

  return (
    <section className="mt-16 pt-12 border-t border-white/8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-extrabold text-[#FBF8F5]">Customer Ratings & Reviews</h2>
          <p className="text-xs text-[#9E948C] mt-1">Verified feedback from authenticated buyers</p>
        </div>
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-2.5 rounded-xl bg-white/6 hover:bg-white/10 border border-white/12 text-xs font-semibold text-white flex items-center gap-2 self-start transition-all active:scale-95"
        >
          <PenSquare className="w-3.5 h-3.5 text-[#FF8A00]" /> Write a Review
        </button>
      </div>

      {/* Rating summary & breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-6 rounded-3xl glass-panel border border-white/8 mb-10">
        <div className="flex flex-col items-center justify-center text-center p-4 border-b md:border-b-0 md:border-r border-white/8">
          <span className="text-5xl font-black text-[#FBF8F5]">{rating.toFixed(1)}</span>
          <div className="flex items-center gap-1 text-amber-400 my-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <span className="text-xs text-[#9E948C]">Based on {reviewCount} verified ratings</span>
        </div>

        {/* Rating bars */}
        <div className="md:col-span-2 space-y-2 flex flex-col justify-center">
          {distribution.map((d) => (
            <div key={d.stars} className="flex items-center gap-3 text-xs">
              <span className="w-12 text-stone-400 font-medium">{d.stars} stars</span>
              <div className="flex-1 h-2 rounded-full bg-white/5 overflow-hidden">
                <div className="h-full bg-[#FF8A00] rounded-full" style={{ width: `${d.pct}%` }} />
              </div>
              <span className="w-10 text-right text-stone-400 text-[11px] font-medium">{d.pct}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Review list */}
      <div className="space-y-4">
        {reviews.map((rev) => (
          <div key={rev.id} className="p-5 rounded-2xl bg-[#1A1614] border border-white/6 space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="relative w-9 h-9 rounded-full overflow-hidden bg-stone-800 shrink-0">
                  {rev.userAvatar ? (
                    <Image src={rev.userAvatar} alt={rev.userName} fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-bold text-xs text-stone-300">
                      {rev.userName.charAt(0)}
                    </div>
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">{rev.userName}</span>
                    {rev.verifiedPurchase && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-medium border border-emerald-500/20">
                        <CheckCircle className="w-2.5 h-2.5" /> Verified Purchase
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex text-amber-400">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${i < rev.rating ? "fill-amber-400" : "text-stone-700"}`}
                        />
                      ))}
                    </div>
                    <span className="text-[10px] text-stone-500">
                      {new Date(rev.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleHelpful(rev.id)}
                className={`text-[11px] flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-colors ${
                  helpfulClicked[rev.id]
                    ? "border-[#FF8A00]/40 text-[#FF8A00] bg-[#FF8A00]/10"
                    : "border-white/10 text-stone-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <ThumbsUp className="w-3 h-3" /> Helpful ({rev.helpfulCount})
              </button>
            </div>

            <div>
              <h4 className="text-xs font-bold text-[#FBF8F5]">{rev.title}</h4>
              <p className="text-xs text-stone-300 mt-1 leading-relaxed">{rev.body}</p>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <ReviewFormModal
          productId={productId}
          onClose={() => setIsModalOpen(false)}
          onReviewSubmitted={(newRev) => setReviews([newRev, ...reviews])}
        />
      )}
    </section>
  );
}
