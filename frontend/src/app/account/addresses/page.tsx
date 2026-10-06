"use client";

import { useState } from "react";
import { AccountLayout } from "@/components/account/AccountLayout";
import { useCheckoutStore } from "@/stores/useCheckoutStore";
import { Address } from "@/types";
import { toast } from "@/stores/useToastStore";
import { MapPin, Plus, Check, Trash2, X } from "lucide-react";

export default function AddressesPage() {
  const { savedAddresses, addSavedAddress } = useCheckoutStore();
  const [addresses, setAddresses] = useState<Address[]>(savedAddresses);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [formName, setFormName] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formStreet, setFormStreet] = useState("");
  const [formCity, setFormCity] = useState("Port Harcourt");
  const [formState, setFormState] = useState("Rivers");

  const setDefault = (id: string) => {
    setAddresses((prev) =>
      prev.map((a) => ({ ...a, isDefault: a.id === id }))
    );
    toast.success("Default Address Updated");
  };

  const deleteAddress = (id: string) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
    toast.info("Address Removed");
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const newAddr: Address = {
      id: `addr-${Date.now()}`,
      fullName: formName,
      phone: formPhone,
      street: formStreet,
      city: formCity,
      state: formState,
      country: "Nigeria",
      postalCode: "500101",
      isDefault: addresses.length === 0,
    };
    setAddresses([newAddr, ...addresses]);
    addSavedAddress(newAddr);
    setIsAddModalOpen(false);
    toast.success("Address Added", "New shipping location saved to your profile.");
  };

  return (
    <AccountLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#FBF8F5]">Saved Addresses</h1>
            <p className="text-xs text-[#9E948C] mt-1">Manage delivery locations for rapid checkout</p>
          </div>
          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-[#FF8A00] hover:bg-[#F97316] text-black font-bold text-xs flex items-center gap-1.5 transition-all active:scale-95 shadow-md"
          >
            <Plus className="w-4 h-4 stroke-[3]" /> Add Address
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {addresses.map((addr) => (
            <div
              key={addr.id}
              className={`p-5 rounded-2xl bg-[#1A1614] border transition-all ${
                addr.isDefault ? "border-[#FF8A00]/50 shadow-lg shadow-[#FF8A00]/5" : "border-white/6"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#FF8A00]" />
                  <span className="text-xs font-bold text-white">{addr.fullName}</span>
                </div>
                {addr.isDefault ? (
                  <span className="px-2 py-0.5 rounded-full bg-[#FF8A00]/15 text-[#FF8A00] text-[10px] font-bold">
                    Default
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => setDefault(addr.id)}
                    className="text-[11px] text-stone-400 hover:text-white underline"
                  >
                    Set as default
                  </button>
                )}
              </div>

              <div className="text-xs text-stone-300 mt-3 space-y-1">
                <p>{addr.street} {addr.apartment && `• ${addr.apartment}`}</p>
                <p>{addr.city}, {addr.state}, {addr.country}</p>
                <p className="text-stone-400">Phone: {addr.phone}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/6 flex justify-end">
                <button
                  type="button"
                  onClick={() => deleteAddress(addr.id)}
                  aria-label="Delete this address"
                  className="p-1.5 text-stone-400 hover:text-red-400 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsAddModalOpen(false)} />
            <div className="relative w-full max-w-md rounded-3xl glass-panel-elevated p-6 border border-white/12 shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-white/8 mb-4">
                <h3 className="text-sm font-bold text-white">Add Delivery Address</h3>
                <button onClick={() => setIsAddModalOpen(false)} className="p-1 text-stone-400 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <form onSubmit={handleAdd} className="space-y-3">
                <input
                  type="text"
                  placeholder="Full Name"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#12100F] border border-white/10 text-xs text-white"
                />
                <input
                  type="tel"
                  placeholder="Phone Number (+234...)"
                  required
                  value={formPhone}
                  onChange={(e) => setFormPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#12100F] border border-white/10 text-xs text-white"
                />
                <input
                  type="text"
                  placeholder="Street Address"
                  required
                  value={formStreet}
                  onChange={(e) => setFormStreet(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#12100F] border border-white/10 text-xs text-white"
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="City"
                    required
                    value={formCity}
                    onChange={(e) => setFormCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#12100F] border border-white/10 text-xs text-white"
                  />
                  <input
                    type="text"
                    placeholder="State"
                    required
                    value={formState}
                    onChange={(e) => setFormState(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#12100F] border border-white/10 text-xs text-white"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#FF8A00] hover:bg-[#F97316] text-black font-bold text-xs mt-2"
                >
                  Save Address
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </AccountLayout>
  );
}
