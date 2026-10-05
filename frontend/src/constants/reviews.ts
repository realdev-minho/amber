import { Review } from "@/types";

export const SAMPLE_REVIEWS: Review[] = [
  {
    id: "rev-1",
    productId: "prod-1",
    userId: "usr-1",
    userName: "Chidi Okafor",
    userAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
    rating: 5,
    title: "Remarkable craftsmanship and leather grain",
    body: "The leather feel is identical to luxury European fashion houses. The brass clasp snaps with a satisfying mechanical click. Highly recommended for daily carry.",
    verifiedPurchase: true,
    helpfulCount: 24,
    createdAt: "2026-02-10T14:20:00Z",
  },
  {
    id: "rev-2",
    productId: "prod-1",
    userId: "usr-2",
    userName: "Zainab Bello",
    userAvatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80",
    rating: 5,
    title: "Compact yet surprisingly spacious",
    body: "Fits my iPhone Pro Max, card holder, lip balm, and keys without bulging. The strap length is versatile for crossbody and shoulder wear.",
    verifiedPurchase: true,
    helpfulCount: 15,
    createdAt: "2026-02-18T09:12:00Z",
  },
  {
    id: "rev-3",
    productId: "prod-6",
    userId: "usr-3",
    userName: "Emeka Davies",
    userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
    rating: 5,
    title: "Studio acoustics at a fraction of high-end prices",
    body: "The beryllium drivers provide an incredibly flat, accurate frequency response. ANC kills flight engine hum immediately without that weird pressure sensation.",
    verifiedPurchase: true,
    helpfulCount: 38,
    createdAt: "2026-02-22T19:45:00Z",
  },
  {
    id: "rev-4",
    productId: "prod-6",
    userId: "usr-4",
    userName: "Aisha Mohammed",
    rating: 4,
    title: "Exceptional build quality, slightly weighty",
    body: "The lambskin leather pads are the softest I've ever experienced. Battery life easily exceeded the stated 40 hours during my travel week.",
    verifiedPurchase: true,
    helpfulCount: 9,
    createdAt: "2026-03-01T11:30:00Z",
  },
  {
    id: "rev-5",
    productId: "prod-3",
    userId: "usr-5",
    userName: "Tunde Balogun",
    rating: 5,
    title: "Cleanest white sneaker in my rotation",
    body: "Zero break-in period required. The leather hasn't creased aggressively after 3 weeks of continuous wear. True to size.",
    verifiedPurchase: true,
    helpfulCount: 19,
    createdAt: "2026-02-27T08:15:00Z",
  }
];

export function getProductReviews(productId: string): Review[] {
  return SAMPLE_REVIEWS.filter((r) => r.productId === productId);
}
