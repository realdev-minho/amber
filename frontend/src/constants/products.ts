import { Product } from "@/types";
import { PRODUCTS_BATCH_1 } from "./products-batch1";
import { PRODUCTS_BATCH_2 } from "./products-batch2";
import { PRODUCTS_BATCH_3 } from "./products-batch3";
import { PRODUCTS_BATCH_4 } from "./products-batch4";
import { PRODUCTS_BATCH_5 } from "./products-batch5";
import { PRODUCTS_BATCH_6 } from "./products-batch6";

export const PRODUCTS: Product[] = [
  ...PRODUCTS_BATCH_1,
  ...PRODUCTS_BATCH_2,
  ...PRODUCTS_BATCH_3,
  ...PRODUCTS_BATCH_4,
  ...PRODUCTS_BATCH_5,
  ...PRODUCTS_BATCH_6,
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  const norm = category.toLowerCase().trim();
  return PRODUCTS.filter((p) => p.category.toLowerCase() === norm);
}

export function getFeaturedProducts(): Product[] {
  return PRODUCTS.filter((p) => p.isFeatured);
}

export function getOfferProducts(): Product[] {
  return PRODUCTS.filter((p) => (p.discountPercentage && p.discountPercentage >= 15) || p.isOffer);
}

export function searchProducts(query: string): Product[] {
  if (!query || query.trim() === "") return PRODUCTS;
  const q = query.toLowerCase().trim();
  return PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
  );
}
