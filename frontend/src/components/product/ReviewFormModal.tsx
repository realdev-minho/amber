"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { reviewSchema, ReviewFormData } from "@/schemas/review.schema";
import { toast } from "@/stores/useToastStore";
import { useAuthStore } from "@/stores/useAuthStore";
import { Star, X } from "lucide-react";
import { productService } from "@/services/product.service";
import { Review } from "@/types";

interface ReviewFormModalProps {
  productId: string;
  onClose: () => void;
  onReviewSubmitted: (review: Review) => void;
}

export function ReviewFormModal({ productId, onClose, onReviewSubmitted }: ReviewFormModalProps) {
  const { isAuthenticated, user } = useAuthStore();
  const [selectedRating, setSelectedRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 5,
      title: "",
      body: "",
    },
  });

  const onSubmit = async (data: ReviewFormData) => {
    if (!isAuthenticated) {
      toast.error("Please sign in", "You must be signed in to submit a verified product review.");
      return;
    }

    setIsSubmitting(true);
    try {
      const review = await productService.submitReview(productId, data);
      toast.success("Review Submitted", "Thank you for sharing your verified experience.");
      onReviewSubmitted(review);
      onClose();
    } catch {
      toast.error("Submission failed", "Unable to save your review at this moment.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg rounded-3xl glass-panel-elevated p-6 border border-white/12 shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-4 border-b border-white/8">
          <h3 className="text-base font-bold text-[#FBF8F5]">Write a Customer Review</h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close review dialog"
            className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-white/5"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-5 space-y-4">
          {/* Rating stars */}
          <div>
            <label className="block text-xs font-semibold text-[#9E948C] mb-2">Overall Rating *</label>
            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4, 5].map((star) => {
                const active = (hoverRating || selectedRating) >= star;
                return (
                  <button
                    key={star}
                    type="button"
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => {
                      setSelectedRating(star);
                      setValue("rating", star, { shouldValidate: true });
                    }}
                    className="p-1 transition-transform hover:scale-110 active:scale-95"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        active ? "fill-amber-400 text-amber-400" : "text-stone-700"
                      }`}
                    />
                  </button>
                );
              })}
              <span className="text-xs font-bold text-white ml-2">
                {hoverRating || selectedRating} / 5 Stars
              </span>
            </div>
            {errors.rating && <p className="text-xs text-red-400 mt-1">{errors.rating.message}</p>}
          </div>

          {/* Title */}
          <div>
            <label className="block text-xs font-semibold text-[#9E948C] mb-1.5">Review Headline *</label>
            <input
              type="text"
              {...register("title")}
              placeholder="e.g. Exceptional craftsmanship and premium materials"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#12100F] border border-white/10 text-xs text-white focus:outline-none focus:border-[#FF8A00]"
            />
            {errors.title && <p className="text-xs text-red-400 mt-1">{errors.title.message}</p>}
          </div>

          {/* Body */}
          <div>
            <label className="block text-xs font-semibold text-[#9E948C] mb-1.5">Review Details *</label>
            <textarea
              rows={4}
              {...register("body")}
              placeholder="What did you like or dislike? How was the fit, acoustic quality, or materials?"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#12100F] border border-white/10 text-xs text-white focus:outline-none focus:border-[#FF8A00] resize-none"
            />
            {errors.body && <p className="text-xs text-red-400 mt-1">{errors.body.message}</p>}
          </div>

          <div className="pt-2 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-stone-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-xl bg-[#FF8A00] hover:bg-[#F97316] text-black font-bold text-xs shadow-md transition-all active:scale-95 disabled:opacity-50"
            >
              {isSubmitting ? "Submitting..." : "Publish Review"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
