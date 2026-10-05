import { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { Star, ShieldCheck, Truck, RotateCcw, CheckCircle2 } from "lucide-react";

export function ProductInfo({ product }: { product: Product }) {
  return (
    <div className="space-y-6">
      {/* Brand & Title */}
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-[#FF8A00]">
          {product.brand}
        </span>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#FBF8F5] tracking-tight mt-1">
          {product.name}
        </h1>

        {/* Rating and review counter */}
        <div className="flex items-center gap-3 mt-3">
          <div className="flex items-center gap-1 text-amber-400">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating)
                    ? "fill-amber-400 text-amber-400"
                    : "text-stone-700"
                }`}
              />
            ))}
            <span className="text-xs font-bold text-white ml-1.5">{product.rating.toFixed(1)}</span>
          </div>
          <span className="text-xs text-[#9E948C] font-medium">({product.reviewCount} customer reviews)</span>
          <span className="text-stone-600">•</span>
          <span className="text-xs text-emerald-400 font-medium flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> In Stock ({product.stock} units)
          </span>
        </div>
      </div>

      {/* Pricing block */}
      <div className="flex items-baseline gap-3 p-4 rounded-2xl glass-panel border border-white/8">
        <span className="text-2xl sm:text-3xl font-extrabold text-[#FBF8F5]">
          {formatPrice(product.price)}
        </span>
        {product.originalPrice && (
          <span className="text-base text-stone-500 line-through">
            {formatPrice(product.originalPrice)}
          </span>
        )}
        {product.discountPercentage && product.discountPercentage > 0 && (
          <span className="px-2.5 py-1 rounded-full bg-[#FF8A00] text-black text-xs font-bold">
            Save {product.discountPercentage}%
          </span>
        )}
      </div>

      {/* Description */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#9E948C] mb-2">Description</h3>
        <p className="text-sm text-stone-300 leading-relaxed">{product.description}</p>
      </div>

      {/* Highlights / Features */}
      {product.features && product.features.length > 0 && (
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#9E948C] mb-3">Key Highlights</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-300">
            {product.features.map((feat, i) => (
              <li key={i} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF8A00] shrink-0" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Trust & Delivery perks */}
      <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/8 text-center">
        <div className="p-3 rounded-xl bg-white/3 border border-white/6 flex flex-col items-center gap-1">
          <Truck className="w-4 h-4 text-[#FF8A00]" />
          <span className="text-[11px] font-semibold text-[#FBF8F5]">Fast Delivery</span>
          <span className="text-[10px] text-[#9E948C]">2-3 Business Days</span>
        </div>
        <div className="p-3 rounded-xl bg-white/3 border border-white/6 flex flex-col items-center gap-1">
          <ShieldCheck className="w-4 h-4 text-[#FF8A00]" />
          <span className="text-[11px] font-semibold text-[#FBF8F5]">100% Genuine</span>
          <span className="text-[10px] text-[#9E948C]">Direct Guarantee</span>
        </div>
        <div className="p-3 rounded-xl bg-white/3 border border-white/6 flex flex-col items-center gap-1">
          <RotateCcw className="w-4 h-4 text-[#FF8A00]" />
          <span className="text-[11px] font-semibold text-[#FBF8F5]">Free Returns</span>
          <span className="text-[10px] text-[#9E948C]">Within 7 Days</span>
        </div>
      </div>
    </div>
  );
}
