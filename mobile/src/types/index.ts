export interface ProductVariant {
  id: string;
  name: string;
  sku: string;
  color?: string;
  size?: string;
  priceModifier: number;
  stock: number;
}

export interface ProductImage {
  id: string;
  url: string;
  altText: string;
  isPrimary: boolean;
  photographerName?: string;
  photographerUrl?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  description: string;
  features: string[];
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  category: string;
  stock: number;
  rating: number;
  reviewCount: number;
  isFeatured?: boolean;
  isOffer?: boolean;
  freeShipping?: boolean;
  images: ProductImage[];
  variants?: ProductVariant[];
  colors?: string[];
  sizes?: string[];
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  productCount: number;
}

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  variantId?: string;
  variant?: ProductVariant;
  selectedColor?: string;
  selectedSize?: string;
  quantity: number;
  price?: number;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  title: string;
  body: string;
  verifiedPurchase: boolean;
  helpfulCount: number;
  createdAt: string;
}

export interface Address {
  id: string;
  fullName: string;
  phone: string;
  street: string;
  apartment?: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  isDefault: boolean;
}

export type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled";

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  variantDetails?: string;
  price: number;
  quantity: number;
  subtotal: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  status: OrderStatus;
  deliveryMethod: "standard" | "express";
  shippingAddress: Address;
  paymentMethod: string;
  paymentStatus: "paid" | "pending" | "failed";
  createdAt: string;
  estimatedDelivery: string;
}

export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role?: string;
}
