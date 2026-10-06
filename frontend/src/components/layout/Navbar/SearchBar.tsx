"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, SlidersHorizontal, Clock, ArrowRight, X } from "lucide-react";

const SUGGESTIONS = [
  "White minimal sneakers",
  "Wireless studio headphones",
  "Luxury leather crossbody bag",
  "Merino wool coat",
  "Botanical face serum",
  "Ceramic pour-over kettle",
];

export function SearchBar() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (searchTerm: string) => {
    if (!searchTerm.trim()) return;
    setIsOpen(false);
    router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-xl">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch(query);
        }}
        className="relative flex items-center"
      >
        <div className="absolute left-4 text-stone-400 pointer-events-none">
          <Search className="w-4 h-4" />
        </div>
        <input
          type="text"
          value={query}
          onFocus={() => setIsOpen(true)}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search luxury fashion, electronics, home..."
          aria-label="Search products"
          className="w-full pl-11 pr-12 py-2.5 rounded-full bg-[#1A1614]/90 border border-white/10 text-sm text-[#FBF8F5] placeholder:text-[#9E948C]/70 focus:outline-none focus:border-[#FF8A00]/50 focus:ring-1 focus:ring-[#FF8A00]/40 transition-all shadow-inner"
        />
        {query ? (
          <button
            type="button"
            onClick={() => setQuery("")}
            aria-label="Clear search query"
            className="absolute right-4 text-stone-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        ) : (
          <button
            type="button"
            onClick={() => router.push("/shop")}
            aria-label="Open filter options"
            className="absolute right-4 text-stone-400 hover:text-[#FF8A00] transition-colors"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        )}
      </form>

      {isOpen && (
        <div className="absolute left-0 right-0 mt-2 rounded-2xl glass-panel-elevated p-3 z-50 border border-white/10 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-center justify-between px-3 py-1.5 text-xs text-[#9E948C] font-medium">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" /> Popular Searches
            </span>
          </div>
          <div className="mt-1 space-y-0.5">
            {SUGGESTIONS.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => {
                  setQuery(item);
                  handleSearch(item);
                }}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-stone-300 hover:text-white hover:bg-white/5 transition-colors text-left group"
              >
                <span>{item}</span>
                <ArrowRight className="w-3.5 h-3.5 text-stone-500 group-hover:text-[#FF8A00] transition-colors" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
