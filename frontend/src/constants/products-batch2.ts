import { Product } from "@/types";

export const PRODUCTS_BATCH_2: Product[] = [
  {
    id: "prod-6",
    slug: "airpulse-wireless-studio-headphones",
    name: "AirPulse Wireless Studio Headphones",
    brand: "Aura Acoustic",
    description: "Equipped with custom 45mm neodymium beryllium drivers, hybrid active noise cancellation, and ultra-plush perforated lambskin ear cushions.",
    features: ["45mm custom beryllium drivers", "Hybrid ANC with transparency mode", "42-hour battery endurance", "Lossless USB-C & Bluetooth 5.4 support"],
    price: 145000,
    originalPrice: 175000,
    discountPercentage: 17,
    category: "electronics",
    stock: 25,
    rating: 4.9,
    reviewCount: 312,
    isFeatured: true,
    isOffer: true,
    freeShipping: true,
    colors: ["Space Black", "Anodized Silver", "Cognac Leather"],
    images: [
      { id: "img-6-1", url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1000&auto=format&fit=crop&q=80", altText: "AirPulse Studio Headphones studio view", isPrimary: true },
      { id: "img-6-2", url: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=1000&auto=format&fit=crop&q=80", altText: "Headphones cushion and acoustic grille", isPrimary: false }
    ],
    createdAt: "2026-01-20T09:15:00Z"
  },
  {
    id: "prod-7",
    slug: "classic-chronograph-automatic-watch",
    name: "Classic Chronograph Automatic Watch",
    brand: "Chronos & Co",
    description: "Exquisitely engineered with a 28-jewel Swiss automatic movement, anti-reflective domed sapphire crystal, and an interchangeable Horween leather strap.",
    features: ["Swiss automatic 28,800 bph movement", "Double-domed sapphire crystal", "100m water resistance", "Luminescent Super-LumiNova markers"],
    price: 320000,
    originalPrice: 380000,
    discountPercentage: 15,
    category: "watches",
    stock: 9,
    rating: 5.0,
    reviewCount: 64,
    isFeatured: true,
    freeShipping: true,
    colors: ["Sunburst Silver", "Midnight Obsidian", "Rose Gold"],
    images: [
      { id: "img-7-1", url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1000&auto=format&fit=crop&q=80", altText: "Chronos automatic watch front dial", isPrimary: true },
      { id: "img-7-2", url: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1000&auto=format&fit=crop&q=80", altText: "Watch bezel and leather strap craftsmanship", isPrimary: false }
    ],
    createdAt: "2026-01-22T16:45:00Z"
  },
  {
    id: "prod-8",
    slug: "solaris-polarized-acetate-sunglasses",
    name: "Solaris Polarized Acetate Sunglasses",
    brand: "Kuro Form",
    description: "Cured Italian Mazzucchelli acetate frames fitted with polarized scratch-resistant CR-39 lenses delivering 100% UVA/UVB optical protection.",
    features: ["Mazzucchelli bio-acetate frames", "Japanese five-barrel hinges", "Category 3 polarized lenses", "Includes structured leather travel case"],
    price: 52000,
    originalPrice: 65000,
    discountPercentage: 20,
    category: "accessories",
    stock: 40,
    rating: 4.8,
    reviewCount: 118,
    freeShipping: true,
    colors: ["Gloss Tortoiseshell", "Obsidian Black", "Translucent Amber"],
    images: [
      { id: "img-8-1", url: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=1000&auto=format&fit=crop&q=80", altText: "Solaris polarized sunglasses", isPrimary: true }
    ],
    createdAt: "2026-01-24T13:10:00Z"
  },
  {
    id: "prod-9",
    slug: "lumen-magnetic-wireless-powerbank",
    name: "Lumen Magnetic Wireless Powerbank",
    brand: "Aura Acoustic",
    description: "CNC-machined aerospace aluminum chassis housing 10,000mAh high-density silicon-carbon cells with 15W Qi2 wireless snap-on charging.",
    features: ["10,000mAh high-density cell", "15W Qi2 fast wireless output", "30W bi-directional USB-C PD", "Integrated fold-out zinc alloy kickstand"],
    price: 38000,
    originalPrice: 45000,
    discountPercentage: 15,
    category: "electronics",
    stock: 50,
    rating: 4.7,
    reviewCount: 175,
    freeShipping: false,
    colors: ["Space Gray", "Silver Frost", "Burnt Amber"],
    images: [
      { id: "img-9-1", url: "https://images.unsplash.com/photo-1622445262464-84b14e3295b3?w=1000&auto=format&fit=crop&q=80", altText: "Magnetic wireless powerbank charging", isPrimary: true }
    ],
    createdAt: "2026-01-26T10:00:00Z"
  },
  {
    id: "prod-10",
    slug: "aeroflex-smart-titanium-ring",
    name: "AeroFlex Smart Titanium Ring",
    brand: "Chronos & Co",
    description: "Surgical-grade Grade 5 titanium housing micro-sensors for continuous HRV, sleep architecture, skin temperature, and active recovery metrics.",
    features: ["Grade 5 brushed titanium", "7-day battery endurance", "Medical-grade PPG infrared sensors", "Waterproof up to 100 meters (10 ATM)"],
    price: 168000,
    originalPrice: 195000,
    discountPercentage: 13,
    category: "watches",
    stock: 15,
    rating: 4.8,
    reviewCount: 92,
    freeShipping: true,
    colors: ["Stealth Black", "Polished Silver", "Brushed Gold"],
    sizes: ["8", "9", "10", "11", "12"],
    images: [
      { id: "img-10-1", url: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1000&auto=format&fit=crop&q=80", altText: "Titanium smart health tracking ring", isPrimary: true }
    ],
    createdAt: "2026-01-28T14:30:00Z"
  }
];
