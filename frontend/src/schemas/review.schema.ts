import { z } from "zod";

export const reviewSchema = z.object({
  rating: z
    .number()
    .int("Rating must be a whole number")
    .min(1, "Please select at least 1 star")
    .max(5, "Rating cannot exceed 5 stars"),
  title: z
    .string()
    .trim()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title cannot exceed 100 characters")
    .refine((val) => val.trim().length > 0, "Title cannot be whitespace only"),
  body: z
    .string()
    .trim()
    .min(10, "Review must be at least 10 characters")
    .max(1000, "Review cannot exceed 1000 characters")
    .refine((val) => val.trim().length > 0, "Review cannot be whitespace only"),
});

export type ReviewFormData = z.infer<typeof reviewSchema>;
