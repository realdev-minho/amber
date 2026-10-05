"use client";

import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import { Package, ArrowRight, ExternalLink } from "lucide-react";

export const MOCK_ORDERS = [
  {
    id: "AMB-849201",
    date: "March 28, 2026",
    total: 233500,
    status: "In Transit",
    items: [
      {
        id: "item-1",
        name: "Minimal Leather Crossbody Bag",
        brand: "Atelier Vesper",
        image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&auto=format&fit=crop&q=80",
        quantity: 1,
        price: 88500,
      },
      {
        id: "item-2",
        name: "AirPulse Wireless Studio Headphones",
        brand: "Aura Acoustic",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&auto=format&fit=crop&q=80",
        quantity: 1,
        price: 145000,
      },
    ],
  },
  {
    id: "AMB-721094",
    date: "February 14, 2026",
    total: 92000,
    status: "Delivered",
    items: [
      {
        id: "item-3",
        name: "Aurora Pure White Minimal Sneakers",
        brand: "Solstice Atelier",
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&auto=format&fit=crop&q=80",
        quantity: 1,
        price: 92000,
      },
    ],
  },
];

export default function OrdersPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="pb-8 border-b border-white/8 mb-8">
        <h1 className="text-3xl font-extrabold text-[#FBF8F5] tracking-tight">Order History</h1>
        <p className="text-xs text-[#9E948C] mt-1">Track, review, and manage your recent purchases</p>
      </div>

      <div className="space-y-6">
        {MOCK_ORDERS.map((order) => {
          const isDelivered = order.status === "Delivered";

          return (
            <div
              key={order.id}
              className="p-6 rounded-3xl bg-[#1A1614] border border-white/6 hover:border-[#FF8A00]/30 transition-all space-y-6"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/6">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white">Order #{order.id}</span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        isDelivered
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : "bg-[#FF8A00]/15 text-[#FF8A00] border border-[#FF8A00]/30"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <p className="text-xs text-[#9E948C] mt-0.5">Placed on {order.date}</p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className="text-xs text-[#9E948C] block">Total</span>
                    <span className="text-sm font-bold text-white">{formatPrice(order.total)}</span>
                  </div>
                  <Link
                    href={`/orders/${order.id}`}
                    className="px-4 py-2 rounded-xl bg-white/6 hover:bg-white/12 text-xs font-semibold text-white flex items-center gap-1.5 transition-colors"
                  >
                    View Details <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Items row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="relative w-14 h-16 rounded-xl overflow-hidden bg-black shrink-0 border border-white/10">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-white truncate">{item.name}</p>
                      <p className="text-[11px] text-[#9E948C]">{item.brand}</p>
                      <p className="text-xs font-bold text-[#FF8A00] mt-0.5">
                        {formatPrice(item.price)} × {item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
