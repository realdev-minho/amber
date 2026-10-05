import apiClient from "./api-client";
import { Product, Category, Review } from "@/types";
import { PRODUCTS, getProductBySlug, searchProducts } from "@/constants/products";
import { CATEGORIES } from "@/constants/categories";
import { SAMPLE_REVIEWS } from "@/constants/reviews";

export const productService = {
  async getProducts(params?: { category?: string; query?: string; isOffer?: boolean }): Promise<Product[]> {
    try {
      const res = await apiClient.get<Product[]>("/products", { params });
      return res.data;
    } catch {
      let filtered = [...PRODUCTS];
      if (params?.category) {
        const cat = params.category.toLowerCase();
        filtered = filtered.filter((p) => p.category.toLowerCase() === cat);
      }
      if (params?.query) {
        filtered = searchProducts(params.query);
      }
      if (params?.isOffer) {
        filtered = filtered.filter((p) => (p.discountPercentage && p.discountPercentage >= 15) || p.isOffer);
      }
      return filtered;
    }
  },

  async getProductBySlug(slug: string): Promise<Product | undefined> {
    try {
      const res = await apiClient.get<Product>(`/products/${slug}`);
      return res.data;
    } catch {
      return getProductBySlug(slug);
    }
  },

  async getCategories(): Promise<Category[]> {
    try {
      const res = await apiClient.get<Category[]>("/categories");
      return res.data;
    } catch {
      return CATEGORIES;
    }
  },

  async getProductReviews(productId: string): Promise<Review[]> {
    try {
      const res = await apiClient.get<Review[]>(`/products/${productId}/reviews`);
      return res.data;
    } catch {
      return SAMPLE_REVIEWS.filter((r) => r.productId === productId);
    }
  },

  async submitReview(productId: string, data: { rating: number; title: string; body: string }): Promise<Review> {
    try {
      const res = await apiClient.post<Review>(`/products/${productId}/reviews`, data);
      return res.data;
    } catch {
      const newReview: Review = {
        id: `rev-${Date.now()}`,
        productId,
        userId: "user-current",
        userName: "Verified Amber Member",
        rating: data.rating,
        title: data.title,
        body: data.body,
        verifiedPurchase: true,
        helpfulCount: 0,
        createdAt: new Date().toISOString(),
      };
      return newReview;
    }
  },
};
