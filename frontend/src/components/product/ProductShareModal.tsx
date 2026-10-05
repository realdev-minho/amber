"use client";

import { useState } from "react";
import { Product } from "@/types";
import { toast } from "@/stores/useToastStore";
import { X, Copy, Check, Share2, Send, MessageCircle } from "lucide-react";

interface ProductShareModalProps {
  product: Product;
  onClose: () => void;
}

export function ProductShareModal({ product, onClose }: ProductShareModalProps) {
  const [copied, setCopied] = useState(false);
  const shareUrl = typeof window !== "undefined" ? window.location.href : `https://amber.shop/product/${product.slug}`;
  const shareText = `Discover ${product.name} on Amber Shop`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast.success("Product link copied.", "Share link ready to paste");
      setTimeout(() => setCopied(false), 2500);
    } catch {
      toast.error("Failed to copy link");
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: shareText,
          url: shareUrl,
        });
      } catch {
        // User dismissed native share
      }
    } else {
      copyToClipboard();
    }
  };

  const shareOptions = [
    {
      name: "WhatsApp",
      icon: MessageCircle,
      href: `https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`,
      color: "hover:bg-emerald-600/20 hover:text-emerald-400",
    },
    {
      name: "X (Twitter)",
      icon: Send,
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      color: "hover:bg-sky-500/20 hover:text-sky-400",
    },
    {
      name: "Telegram",
      icon: Send,
      href: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
      color: "hover:bg-blue-500/20 hover:text-blue-400",
    },
    {
      name: "LinkedIn",
      icon: Share2,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      color: "hover:bg-indigo-600/20 hover:text-indigo-400",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-3xl glass-panel-elevated p-6 border border-white/12 shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-4 border-b border-white/8">
          <div className="flex items-center gap-2">
            <Share2 className="w-4 h-4 text-[#FF8A00]" />
            <h3 className="text-sm font-bold text-[#FBF8F5]">Share Product</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close share modal"
            className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-white/5"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Copy Link Row */}
        <div className="mt-5">
          <label className="text-xs font-semibold text-[#9E948C] block mb-2">Product URL</label>
          <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-[#12100F] border border-white/10">
            <input
              type="text"
              readOnly
              value={shareUrl}
              className="bg-transparent text-xs text-stone-300 px-3 flex-1 focus:outline-none truncate"
            />
            <button
              type="button"
              onClick={copyToClipboard}
              className="px-4 py-2 rounded-xl bg-[#FF8A00] hover:bg-[#F97316] text-black text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95 shrink-0"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>

        {/* Social channels */}
        <div className="mt-6">
          <label className="text-xs font-semibold text-[#9E948C] block mb-3">Share directly</label>
          <div className="grid grid-cols-2 gap-2.5">
            {shareOptions.map((opt) => {
              const Icon = opt.icon;
              return (
                <a
                  key={opt.name}
                  href={opt.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2.5 p-3 rounded-2xl bg-[#1A1614] border border-white/8 text-xs font-medium text-stone-200 transition-all ${opt.color}`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{opt.name}</span>
                </a>
              );
            })}
          </div>
        </div>

        {/* Native share button if supported */}
        <div className="mt-4 pt-4 border-t border-white/8">
          <button
            type="button"
            onClick={handleNativeShare}
            className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-stone-300 hover:text-white transition-colors"
          >
            Open Device Share Dialog
          </button>
        </div>
      </div>
    </div>
  );
}
