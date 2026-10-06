import { Product } from "@/types";

export const PRODUCTS_BATCH_3: Product[] = [
  {
    id: "prod-11",
    slug: "botanical-radiance-peptide-serum",
    name: "Botanical Radiance Peptide Serum",
    brand: "Lumiere Botanica",
    description: "Multi-molecular hyaluronic acid combined with copper tripeptide-1 and bakuchiol to stimulate cellular renewal and restore moisture barrier.",
    features: ["5% Copper Tripeptide-1 complex", "Triple-weight Hyaluronic acid", "Cold-pressed Marula botanical oil", "Dermatologist-tested, fragrance-free"],
    price: 36000,
    originalPrice: 42000,
    discountPercentage: 14,
    category: "beauty",
    stock: 60,
    rating: 4.9,
    reviewCount: 284,
    isFeatured: true,
    freeShipping: false,
    images: [
      { id: "img-11-1", url: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=1000&auto=format&fit=crop&q=80", altText: "Botanical peptide face serum dropper", isPrimary: true }
    ],
    createdAt: "2026-02-01T11:00:00Z"
  },
  {
    id: "prod-12",
    slug: "artisanal-ceramic-pour-over-kettle",
    name: "Artisanal Ceramic Pour-Over Kettle",
    brand: "Form & Function",
    description: "Hand-thrown stoneware matte black electric kettle with gooseneck spout for precise fluid dynamics, PID variable temperature control, and auto hold.",
    features: ["Precision precision gooseneck pour spout", "Variable temperature control (40-100°C)", "LCD real-time temperature screen", "1200W rapid heating element"],
    price: 78000,
    originalPrice: 95000,
    discountPercentage: 17,
    category: "home",
    stock: 20,
    rating: 4.9,
    reviewCount: 153,
    isFeatured: true,
    isOffer: true,
    freeShipping: true,
    colors: ["Matte Charcoal", "Bone Ceramic", "Amber Stone"],
    images: [
      { id: "img-12-1", url: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=1000&auto=format&fit=crop&q=80", altText: "Artisanal gooseneck pour over kettle", isPrimary: true }
    ],
    createdAt: "2026-02-03T15:20:00Z"
  },
  {
    id: "prod-13",
    slug: "apex-performance-compression-tights",
    name: "Apex Performance Compression Tights",
    brand: "Vanguard",
    description: "Engineered with four-way graduated compression elastane to support muscle stabilization and optimize circulation during high-intensity sessions.",
    features: ["Graduated 20-30 mmHg compression", "Sweat-wicking Silver-ion antimicrobial fabric", "Drop-in bonded bounce-free phone pocket", "Seamless anatomical gusset"],
    price: 32000,
    originalPrice: 38000,
    discountPercentage: 15,
    category: "sports",
    stock: 45,
    rating: 4.7,
    reviewCount: 88,
    freeShipping: false,
    colors: ["Obsidian Slate", "Carbon Gray"],
    sizes: ["S", "M", "L", "XL"],
    images: [
      { id: "img-13-1", url: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1000&auto=format&fit=crop&q=80", altText: "Athletic compression performance wear", isPrimary: true }
    ],
    createdAt: "2026-02-05T09:40:00Z"
  },
  {
    id: "prod-14",
    slug: "smoked-amber-oud-soy-candle",
    name: "Smoked Amber & Oud Soy Candle",
    brand: "Lumiere Botanica",
    description: "Poured in recycled amber glass vessels with dual crackling FSC-certified wood wicks. Top notes of wild bergamot, dark amber, and aged Moroccan cedarwood.",
    features: ["100% natural Midwest soy wax", "Crackling natural wood wick", "65-hour clean burn duration", "Phthalate and paraben-free pure fragrance"],
    price: 18500,
    originalPrice: 22000,
    discountPercentage: 15,
    category: "lifestyle",
    stock: 75,
    rating: 4.9,
    reviewCount: 220,
    freeShipping: false,
    images: [
      { id: "img-14-1", url: "https://images.unsplash.com/photo-1603006905003-be475563bc59?w=1000&auto=format&fit=crop&q=80", altText: "Smoked amber glass scented candle", isPrimary: true }
    ],
    createdAt: "2026-02-08T18:00:00Z"
  },
  {
    id: "prod-15",
    slug: "sculptural-nordic-ceramic-vase",
    name: "Sculptural Nordic Ceramic Vase",
    brand: "Form & Function",
    description: "Handcrafted terracotta vessel finished in a warm matte stone glaze. Curved organic form brings balanced negative space to modern living spaces.",
    features: ["Wheel-thrown terracotta clay", "Textured matte tactile glaze", "Water-tight interior glazing", "Protective felt pad base"],
    price: 42000,
    originalPrice: 50000,
    discountPercentage: 16,
    category: "home",
    stock: 16,
    rating: 4.8,
    reviewCount: 71,
    freeShipping: false,
    colors: ["Sand Dune", "Basalt Black", "Terracotta"],
    images: [
      { id: "img-15-1", url: "https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?w=1000&auto=format&fit=crop&q=80", altText: "Sculptural ceramic vase centerpiece", isPrimary: true }
    ],
    createdAt: "2026-02-10T12:00:00Z"
  }
];
