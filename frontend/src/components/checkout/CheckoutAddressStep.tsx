"use client";

import { useState } from "react";
import { useCheckoutStore } from "@/stores/useCheckoutStore";
import { Address } from "@/types";
import { MapPin, Plus, Check, ArrowRight } from "lucide-react";

interface CheckoutAddressStepProps {
  onContinue: () => void;
}

export function CheckoutAddressStep({ onContinue }: CheckoutAddressStepProps) {
  const { savedAddresses, shippingAddress, setShippingAddress, addSavedAddress } = useCheckoutStore();
  const [isAddingNew, setIsAddingNew] = useState(false);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [apartment, setApartment] = useState("");
  const [city, setCity] = useState("Port Harcourt");
  const [state, setState] = useState("Rivers");
  const [postalCode, setPostalCode] = useState("500101");

  const handleAddNew = (e: React.FormEvent) => {
    e.preventDefault();
    const newAddr: Address = {
      id: `addr-${Date.now()}`,
      fullName,
      phone,
      street,
      apartment,
      city,
      state,
      country: "Nigeria",
      postalCode,
      isDefault: false,
    };
    addSavedAddress(newAddr);
    setShippingAddress(newAddr);
    setIsAddingNew(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-[#FBF8F5]">Shipping Destination</h2>
        <p className="text-xs text-[#9E948C] mt-1">Select an existing destination or provide a new delivery address.</p>
      </div>

      {/* Saved addresses cards */}
      <div className="space-y-3">
        {savedAddresses.map((addr) => {
          const isSelected = shippingAddress?.id === addr.id;
          return (
            <div
              key={addr.id}
              onClick={() => setShippingAddress(addr)}
              className={`p-4 rounded-2xl cursor-pointer border transition-all flex items-start justify-between ${
                isSelected
                  ? "bg-[#FF8A00]/10 border-[#FF8A00] shadow-md shadow-[#FF8A00]/10"
                  : "bg-[#1A1614] border-white/6 hover:border-white/20"
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center border mt-0.5 ${
                    isSelected ? "border-[#FF8A00] bg-[#FF8A00] text-black" : "border-stone-600"
                  }`}
                >
                  {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
                <div className="text-xs text-stone-300 space-y-0.5">
                  <p className="font-bold text-white flex items-center gap-1.5">
                    {addr.fullName} {addr.isDefault && <span className="text-[10px] text-[#FF8A00]">(Default)</span>}
                  </p>
                  <p>{addr.street} {addr.apartment && `• ${addr.apartment}`}</p>
                  <p>{addr.city}, {addr.state}, Nigeria • {addr.postalCode}</p>
                  <p className="text-stone-400">Phone: {addr.phone}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {!isAddingNew ? (
        <button
          type="button"
          onClick={() => setIsAddingNew(true)}
          className="w-full py-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-stone-300 hover:text-white flex items-center justify-center gap-2 transition-colors"
        >
          <Plus className="w-4 h-4" /> Add New Address
        </button>
      ) : (
        <form onSubmit={handleAddNew} className="p-5 rounded-2xl bg-[#1A1614] border border-white/10 space-y-3">
          <h4 className="text-xs font-bold text-white mb-2">New Address Details</h4>
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Full Name"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#12100F] border border-white/10 text-xs text-white"
            />
            <input
              type="tel"
              placeholder="Phone Number (+234...)"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#12100F] border border-white/10 text-xs text-white"
            />
          </div>
          <input
            type="text"
            placeholder="Street Address"
            required
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-[#12100F] border border-white/10 text-xs text-white"
          />
          <input
            type="text"
            placeholder="Apartment, suite, unit (optional)"
            value={apartment}
            onChange={(e) => setApartment(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-[#12100F] border border-white/10 text-xs text-white"
          />
          <div className="grid grid-cols-3 gap-3">
            <input
              type="text"
              placeholder="City"
              required
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#12100F] border border-white/10 text-xs text-white"
            />
            <input
              type="text"
              placeholder="State"
              required
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#12100F] border border-white/10 text-xs text-white"
            />
            <input
              type="text"
              placeholder="Postal Code"
              required
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#12100F] border border-white/10 text-xs text-white"
            />
          </div>
          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsAddingNew(false)}
              className="px-4 py-2 rounded-xl bg-white/5 text-xs text-stone-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#FF8A00] text-black font-bold text-xs"
            >
              Save & Use Address
            </button>
          </div>
        </form>
      )}

      <button
        type="button"
        onClick={onContinue}
        disabled={!shippingAddress}
        className="w-full py-3.5 rounded-2xl bg-[#FF8A00] hover:bg-[#F97316] text-black font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#FF8A00]/25 transition-all active:scale-95 disabled:opacity-40"
      >
        Continue to Delivery Method <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}
