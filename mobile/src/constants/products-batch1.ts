import { Product } from "@/types";

export const PRODUCTS_BATCH_1: Product[] = [
  {
    id: "prod-1",
    slug: "minimal-leather-crossbody-bag",
    name: "Minimal Leather Crossbody Bag",
    brand: "Atelier Vesper",
    description: "Handcrafted from Italian full-grain pebble leather. Features brushed brass hardware, magnetic snap flap, and micro-suede interior with dedicated phone pocket.",
    features: ["Full-grain Italian calfskin", "Solid brass magnetic closure", "Adjustable shoulder strap", "Soft microfiber interior lining"],
    price: 88500,
    originalPrice: 105000,
    discountPercentage: 15,
    category: "bags",
    stock: 18,
    rating: 4.9,
    reviewCount: 142,
    isFeatured: true,
    freeShipping: true,
    colors: ["Obsidian Black", "Cognac Tan", "Saddle Brown"],
    images: [
      { id: "img-1-1", url: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=1000&auto=format&fit=crop&q=80", altText: "Minimal Leather Crossbody Bag front view", isPrimary: true },
      { id: "img-1-2", url: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=1000&auto=format&fit=crop&q=80", altText: "Leather bag strap and texture detail", isPrimary: false }
    ],
    createdAt: "2026-01-10T10:00:00Z"
  },
  {
    id: "prod-2",
    slug: "monochrome-studio-oversized-hoodie",
    name: "Monochrome Studio Oversized Hoodie",
    brand: "Kuro Form",
    description: "Heavyweight 480GSM organic French terry cotton. Custom drop-shoulder cut, double-layered hood without drawstrings for architectural drape.",
    features: ["480 GSM 100% organic cotton", "Pre-shrunk vintage wash", "Hidden side seam pockets", "Drop shoulder relaxed fit"],
    price: 46000,
    originalPrice: 58000,
    discountPercentage: 20,
    category: "fashion",
    stock: 35,
    rating: 4.8,
    reviewCount: 98,
    isFeatured: true,
    isOffer: true,
    freeShipping: true,
    colors: ["Pitch Black", "Washed Charcoal", "Bone White"],
    sizes: ["S", "M", "L", "XL"],
    images: [
      { id: "img-2-1", url: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=1000&auto=format&fit=crop&q=80", altText: "Heavyweight oversized hoodie", isPrimary: true },
      { id: "img-2-2", url: "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=1000&auto=format&fit=crop&q=80", altText: "Hoodie drape and fabric detail", isPrimary: false }
    ],
    createdAt: "2026-01-12T12:00:00Z"
  },
  {
    id: "prod-3",
    slug: "aurora-pure-white-minimal-sneakers",
    name: "Aurora Pure White Minimal Sneakers",
    brand: "Solstice Atelier",
    description: "Supple Nappa leather low-top sneakers set on a lightweight vulcanized rubber cupsole. Ergonomic memory foam insoles provide all-day comfort.",
    features: ["Italian Nappa leather upper", "Cushioned memory foam insole", "Abrasion-resistant rubber outsole", "Waxed cotton laces"],
    price: 92000,
    originalPrice: 115000,
    discountPercentage: 20,
    category: "shoes",
    stock: 22,
    rating: 4.9,
    reviewCount: 215,
    isFeatured: true,
    freeShipping: true,
    colors: ["Pure White", "Off-White / Gum", "Triple Black"],
    sizes: ["40", "41", "42", "43", "44", "45"],
    images: [
      { id: "img-3-1", url: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=1000&auto=format&fit=crop&q=80", altText: "Aurora minimal leather sneakers", isPrimary: true },
      { id: "img-3-2", url: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=1000&auto=format&fit=crop&q=80", altText: "Sneakers sole and profile", isPrimary: false }
    ],
    createdAt: "2026-01-14T08:30:00Z"
  },
  {
    id: "prod-4",
    slug: "architectural-merino-wool-coat",
    name: "Architectural Merino Wool Coat",
    brand: "Atelier Vesper",
    description: "Double-faced 100% Australian Merino wool with relaxed drop shoulders, notched lapels, and tailored concealed horn buttons.",
    features: ["100% virgin Merino wool", "Unstructured relaxed tailoring", "Hand-stitched perimeter seams", "Deep welt hand pockets"],
    price: 185000,
    originalPrice: 220000,
    discountPercentage: 15,
    category: "fashion",
    stock: 12,
    rating: 5.0,
    reviewCount: 47,
    freeShipping: true,
    colors: ["Camel Tan", "Charcoal Gray", "Midnight Navy"],
    sizes: ["S", "M", "L"],
    images: [
      { id: "img-4-1", url: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=1000&auto=format&fit=crop&q=80", altText: "Tailored wool overcoat", isPrimary: true }
    ],
    createdAt: "2026-01-15T14:00:00Z"
  },
  {
    id: "prod-5",
    slug: "traveler-weatherproof-duffle-bag",
    name: "Traveler Weatherproof Duffle Bag",
    brand: "Vanguard",
    description: "Built from 840D ballistic nylon with matte polyurethane coating. Equipped with water-sealed YKK zippers and modular garment separators.",
    features: ["Waterproof ballistic nylon", "45L airline carry-on approved", "Ventilated shoe compartment", "Detachable ergonomic harness"],
    price: 74000,
    originalPrice: 85000,
    discountPercentage: 12,
    category: "bags",
    stock: 28,
    rating: 4.7,
    reviewCount: 89,
    freeShipping: true,
    colors: ["Matte Black", "Olive Drab", "Storm Slate"],
    images: [
      { id: "img-5-1", url: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=1000&auto=format&fit=crop&q=80", altText: "Weatherproof duffle travel bag", isPrimary: true }
    ],
    createdAt: "2026-01-18T11:20:00Z"
  }
];
