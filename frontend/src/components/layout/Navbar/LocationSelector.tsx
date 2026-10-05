"use client";

import { useState } from "react";
import { MapPin, ChevronDown, Check } from "lucide-react";

const CITIES = [
  "Port Harcourt",
  "Lagos (Island)",
  "Lagos (Mainland)",
  "Abuja (FCT)",
  "Ibadan",
  "Enugu",
  "Asaba",
  "Kano",
];

export function LocationSelector() {
  const [selectedCity, setSelectedCity] = useState("Port Harcourt");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1A1614]/80 border border-white/10 hover:border-[#FF8A00]/40 transition-colors text-xs text-[#9E948C]"
      >
        <MapPin className="w-3.5 h-3.5 text-[#FF8A00] shrink-0" />
        <span className="whitespace-nowrap">
          Deliver to <strong className="text-[#FBF8F5] font-semibold">{selectedCity}</strong>
        </span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-stone-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute left-0 mt-2 w-56 rounded-2xl glass-panel-elevated p-2 z-50 border border-white/10 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="px-3 py-2 border-b border-white/10 mb-1">
              <p className="text-xs font-semibold text-[#FBF8F5]">Select Destination</p>
              <p className="text-[11px] text-[#9E948C]">Get accurate delivery speeds</p>
            </div>
            <ul role="listbox" className="space-y-0.5">
              {CITIES.map((city) => {
                const isSelected = city === selectedCity;
                return (
                  <li key={city}>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedCity(city);
                        setIsOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-left transition-colors ${
                        isSelected
                          ? "bg-[#FF8A00]/15 text-[#FF8A00] font-medium"
                          : "text-stone-300 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <span>{city}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-[#FF8A00]" />}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
