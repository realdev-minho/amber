import { Product } from "@/types";

export const PRODUCTS_BATCH_5: Product[] = [
  {
    id: "prod-21",
    slug: "minimalist-leather-card-holder",
    name: "Minimalist Leather Card Holder",
    brand: "Atelier Vesper",
    description: "Slim profile card case crafted from vegetable-tanned Buttero leather with 4 card slots and a central bill sleeve.",
    features: ["Italian vegetable-tanned Buttero leather", "Hand-stitched perimeter with waxed thread", "Holds 6-8 cards plus folded cash", "RFID blocking inner shield"],
    price: 18000,
    originalPrice: 22000,
    discountPercentage: 18,
    category: "accessories",
    stock: 65,
    rating: 4.8,
    reviewCount: 138,
    freeShipping: false,
    colors: ["Chestnut Brown", "Midnight Black", "Forest Green"],
    images: [
      { id: "img-21-1", url: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=1000&auto=format&fit=crop&q=80", altText: "Slim leather card holder wallet", isPrimary: true }
    ],
    createdAt: "2026-02-22T10:00:00Z"
  },
  {
    id: "prod-22",
    slug: "aero-hydration-insulated-flask",
    name: "Aero Hydration Insulated Flask 750ml",
    brand: "Vanguard",
    description: "Double-wall vacuum-insulated 18/8 pro-grade stainless steel flask with powder coat finish and magnetic quick-cap closure.",
    features: ["Keeps cold for 24 hrs, hot for 12 hrs", "Pro-grade 18/8 food stainless steel", "Leak-proof magnetic cap", "BPA and toxin-free construction"],
    price: 21000,
    originalPrice: 25000,
    discountPercentage: 16,
    category: "sports",
    stock: 55,
    rating: 4.7,
    reviewCount: 104,
    freeShipping: false,
    colors: ["Matte Obsidian", "Amber Sunset", "Stone Gray"],
    images: [
      { id: "img-22-1", url: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=1000&auto=format&fit=crop&q=80", altText: "Vacuum insulated water flask", isPrimary: true }
    ],
    createdAt: "2026-02-23T14:00:00Z"
  },
  {
    id: "prod-23",
    slug: "heritage-linen-relaxed-shirt",
    name: "Heritage Linen Relaxed Shirt",
    brand: "Kuro Form",
    description: "Breathable 100% Normandy flax linen shirt cut with a relaxed camp collar, mother-of-pearl buttons, and rounded hemline.",
    features: ["100% French Normandy flax linen", "Natural mother-of-pearl buttons", "Garment-washed for ultra-soft drape", "Breathable camp collar silhouette"],
    price: 38000,
    originalPrice: 45000,
    discountPercentage: 15,
    category: "fashion",
    stock: 32,
    rating: 4.9,
    reviewCount: 97,
    freeShipping: false,
    colors: ["Natural Ecru", "Olive Olive", "Midnight Black"],
    sizes: ["S", "M", "L", "XL"],
    images: [
      { id: "img-23-1", url: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=1000&auto=format&fit=crop&q=80", altText: "Relaxed linen button up shirt", isPrimary: true }
    ],
    createdAt: "2026-02-24T16:00:00Z"
  },
  {
    id: "prod-24",
    slug: "phantom-minimalist-desk-lamp",
    name: "Phantom Minimalist LED Desk Lamp",
    brand: "Form & Function",
    description: "Extruded anodized aluminum architecture with capacitive touch dimming, color temperature tuning (2700K-5000K), and integrated Qi wireless charging pad.",
    features: ["High CRI 95+ flicker-free illumination", "Step-less touch slider dimming", "Integrated 10W wireless charging base", "Precision counter-balanced arm articulation"],
    price: 64000,
    originalPrice: 78000,
    discountPercentage: 18,
    category: "home",
    stock: 20,
    rating: 4.8,
    reviewCount: 63,
    isFeatured: true,
    freeShipping: true,
    colors: ["Space Black", "Brushed Aluminum"],
    images: [
      { id: "img-24-1", url: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=1000&auto=format&fit=crop&q=80", altText: "Architectural modern desk lamp", isPrimary: true }
    ],
    createdAt: "2026-02-25T11:00:00Z"
  },
  {
    id: "prod-25",
    slug: "meridian-diver-sapphire-watch",
    name: "Meridian Diver 300M Sapphire Watch",
    brand: "Chronos & Co",
    description: "Professional grade marine timepiece featuring unidirectional ceramic bezel, helium escape valve, and automatic mechanical caliber with 44h reserve.",
    features: ["300m / 1000ft depth certified", "Unidirectional 120-click ceramic bezel", "Helium release valve system", "Solid link oyster bracelet with diving extension"],
    price: 285000,
    originalPrice: 340000,
    discountPercentage: 16,
    category: "watches",
    stock: 8,
    rating: 5.0,
    reviewCount: 42,
    freeShipping: true,
    colors: ["Deep Sea Black", "Ocean Blue"],
    images: [
      { id: "img-25-1", url: "https://images.unsplash.com/photo-1547996160-71dfa63096aa?w=1000&auto=format&fit=crop&q=80", altText: "Luxury diver automatic watch", isPrimary: true }
    ],
    createdAt: "2026-02-26T15:00:00Z"
  }
];
