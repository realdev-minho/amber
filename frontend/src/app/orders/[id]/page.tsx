import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import { ChevronRight, CheckCircle2, Clock, Truck, MapPin, CreditCard } from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  return {
    title: `Order #${id} — Amber`,
    description: `Track shipment and view order summary for #${id}`,
  };
}

export default async function OrderDetailPage({ params }: PageProps) {
  const { id } = await params;

  const trackingSteps = [
    { label: "Order Confirmed", date: "March 28, 10:30 AM", completed: true },
    { label: "Processing & Quality Check", date: "March 28, 02:15 PM", completed: true },
    { label: "Dispatched with Courier", date: "March 29, 09:00 AM", completed: true },
    { label: "Out for Delivery", date: "Estimated Today, 4:00 PM", completed: false },
    { label: "Delivered", date: "Pending", completed: false },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#9E948C] mb-8">
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5 text-stone-600" />
        <Link href="/orders" className="hover:text-white transition-colors">Orders</Link>
        <ChevronRight className="w-3.5 h-3.5 text-stone-600" />
        <span className="text-stone-300 font-medium">#{id}</span>
      </nav>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-white/8 mb-8">
        <div>
          <span className="text-xs font-semibold text-[#FF8A00] uppercase tracking-wider">
            Order Status
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#FBF8F5] tracking-tight mt-1">
            Order #{id}
          </h1>
          <p className="text-xs text-[#9E948C] mt-1">Placed on March 28, 2026 • Standard Delivery</p>
        </div>
        <span className="px-3 py-1 rounded-full bg-[#FF8A00]/15 border border-[#FF8A00]/30 text-[#FF8A00] text-xs font-bold self-start">
          In Transit
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Tracking Timeline */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 rounded-3xl glass-panel border border-white/8 space-y-6">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#FF8A00]" /> Shipment Timeline
            </h3>

            <div className="relative pl-6 space-y-6 border-l-2 border-white/10">
              {trackingSteps.map((step, i) => (
                <div key={i} className="relative">
                  <div
                    className={`absolute -left-[31px] top-0 w-4 h-4 rounded-full border-2 ${
                      step.completed
                        ? "bg-[#FF8A00] border-[#0D0B0A]"
                        : "bg-[#1A1614] border-stone-600"
                    }`}
                  />
                  <p className={`text-xs font-bold ${step.completed ? "text-white" : "text-stone-500"}`}>
                    {step.label}
                  </p>
                  <p className="text-[11px] text-[#9E948C] mt-0.5">{step.date}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Address & Payment */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-[#1A1614] border border-white/6 text-xs text-stone-300 space-y-1">
              <h4 className="font-bold text-white mb-2 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#FF8A00]" /> Shipping Address
              </h4>
              <p className="font-semibold text-stone-200">Customer Delivery Address</p>
              <p>14 Trans-Amadi Industrial Layout, Penthouse 4B</p>
              <p>Port Harcourt, Rivers State, Nigeria</p>
              <p className="text-stone-400">Phone: +2348012345678</p>
            </div>

            <div className="p-5 rounded-2xl bg-[#1A1614] border border-white/6 text-xs text-stone-300 space-y-1">
              <h4 className="font-bold text-white mb-2 flex items-center gap-1.5">
                <CreditCard className="w-3.5 h-3.5 text-[#FF8A00]" /> Payment Receipt
              </h4>
              <p>Method: Debit / Credit Card (Paystack Encrypted)</p>
              <p>Status: <span className="text-emerald-400 font-bold">Paid</span></p>
              <p>Reference: <span className="font-mono text-[10px] text-stone-400">PSTK-REF-99204128</span></p>
            </div>
          </div>
        </div>

        {/* Order Items & Totals */}
        <div className="lg:col-span-5 p-6 rounded-3xl glass-panel border border-white/8 space-y-6">
          <h3 className="text-sm font-bold text-white">Order Summary</h3>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-14 h-16 rounded-xl overflow-hidden bg-black shrink-0 border border-white/10">
                <Image
                  src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&auto=format&fit=crop&q=80"
                  alt="Minimal Leather Crossbody Bag"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-white truncate">Minimal Leather Crossbody Bag</p>
                <p className="text-[11px] text-stone-400">Atelier Vesper • Qty: 1</p>
                <p className="text-xs font-bold text-white mt-0.5">{formatPrice(88500)}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative w-14 h-16 rounded-xl overflow-hidden bg-black shrink-0 border border-white/10">
                <Image
                  src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&auto=format&fit=crop&q=80"
                  alt="AirPulse Wireless Studio Headphones"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-white truncate">AirPulse Wireless Studio Headphones</p>
                <p className="text-[11px] text-stone-400">Aura Acoustic • Qty: 1</p>
                <p className="text-xs font-bold text-white mt-0.5">{formatPrice(145000)}</p>
              </div>
            </div>
          </div>

          <div className="space-y-2 text-xs text-stone-300 pt-4 border-t border-white/8">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold text-white">{formatPrice(233500)}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span className="font-semibold text-emerald-400">Free</span>
            </div>
            <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-white/8">
              <span>Total Paid</span>
              <span className="text-[#FF8A00]">{formatPrice(233500)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
