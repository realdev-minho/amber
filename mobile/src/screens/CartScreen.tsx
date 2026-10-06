import React, { useState } from "react";
import { Trash2, Plus, Minus, CheckCircle2, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/stores/useCartStore";

interface CartScreenProps {
  onContinueShopping: () => void;
}

export const CartScreen: React.FC<CartScreenProps> = ({ onContinueShopping }) => {
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);

  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState<string | null>(null);

  const total = getTotalPrice();
  const shipping = total > 2000 ? 0 : 45;

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      const orderId = `AMB-${Math.floor(100000 + Math.random() * 900000)}`;
      clearCart();
      setIsCheckingOut(false);
      setOrderComplete(orderId);
    }, 1200);
  };

  if (orderComplete) {
    return (
      <div style={{ padding: "40px 20px", textAlign: "center" }}>
        <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "rgba(255, 138, 0, 0.15)", border: "1px solid #FF8A00", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
          <CheckCircle2 size={36} color="#FF8A00" />
        </div>
        <h2 style={{ fontSize: "22px", fontWeight: 800, color: "var(--text-main)", marginBottom: "8px" }}>Order Confirmed</h2>
        <p style={{ fontSize: "13px", color: "var(--text-muted)", marginBottom: "4px" }}>Order Number</p>
        <p style={{ fontSize: "16px", fontWeight: 700, color: "#FF8A00", fontFamily: "monospace", marginBottom: "24px" }}>#{orderComplete}</p>
        <p style={{ fontSize: "13px", color: "var(--text-muted)", lineHeight: 1.6, marginBottom: "30px" }}>
          Your order has been transmitted directly to our atelier dispatch. You will receive courier tracking updates.
        </p>
        <button onClick={() => { setOrderComplete(null); onContinueShopping(); }} className="btn-amber">
          Continue Shopping
        </button>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div style={{ padding: "60px 20px", textAlign: "center" }}>
        <div style={{ width: "60px", height: "60px", borderRadius: "50%", background: "var(--bg-card)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
          <ShoppingBag size={28} color="var(--text-muted)" />
        </div>
        <h3 style={{ fontSize: "18px", fontWeight: 700, color: "var(--text-main)", marginBottom: "6px" }}>Your Bag is Empty</h3>
        <p style={{ fontSize: "13px", color: "var(--text-muted)", marginBottom: "24px" }}>Discover our curated selection of luxury atelier pieces.</p>
        <button onClick={onContinueShopping} className="btn-amber">Explore Marketplace</button>
      </div>
    );
  }

  return (
    <div style={{ padding: "16px 14px", paddingBottom: "100px" }}>
      <h2 style={{ fontSize: "18px", fontWeight: 800, color: "var(--text-main)", marginBottom: "16px" }}>
        Shopping Bag ({items.length})
      </h2>

      {/* Cart Items List */}
      <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "24px" }}>
        {items.map((item) => (
          <div key={item.id} style={{ display: "flex", gap: "12px", background: "var(--bg-card)", border: "1px solid var(--border-card)", borderRadius: "14px", padding: "10px" }}>
            <img src={item.product.images?.[0]?.url} alt={item.product.name} style={{ width: "72px", height: "72px", objectFit: "cover", borderRadius: "10px" }} />
            <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <span style={{ fontSize: "10px", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 600 }}>{item.product.brand}</span>
                  <h4 style={{ fontSize: "13px", fontWeight: 700, color: "var(--text-main)", lineHeight: 1.2 }}>{item.product.name}</h4>
                </div>
                <button onClick={() => removeItem(item.id)} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", padding: "2px" }} aria-label="Remove item">
                  <Trash2 size={15} />
                </button>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "8px" }}>
                <span style={{ fontSize: "14px", fontWeight: 800, color: "#FF8A00" }}>${(item.product.price * item.quantity).toLocaleString()}</span>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", background: "rgba(255,255,255,0.06)", borderRadius: "8px", padding: "2px 6px" }}>
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)} style={{ background: "none", border: "none", color: "var(--text-main)", cursor: "pointer", display: "flex" }}>
                    <Minus size={12} />
                  </button>
                  <span style={{ fontSize: "12px", fontWeight: 700, minWidth: "16px", textAlign: "center" }}>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={{ background: "none", border: "none", color: "var(--text-main)", cursor: "pointer", display: "flex" }}>
                    <Plus size={12} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Box */}
      <div style={{ background: "var(--bg-card)", border: "1px solid var(--border-card)", borderRadius: "14px", padding: "16px", marginBottom: "20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "13px", color: "var(--text-muted)" }}>
          <span>Subtotal</span>
          <span style={{ color: "var(--text-main)", fontWeight: 600 }}>${total.toLocaleString()}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px", fontSize: "13px", color: "var(--text-muted)" }}>
          <span>Insured Courier Delivery</span>
          <span style={{ color: shipping === 0 ? "#FF8A00" : "var(--text-main)", fontWeight: 600 }}>{shipping === 0 ? "Complimentary" : `$${shipping}`}</span>
        </div>
        <div style={{ borderTop: "1px solid var(--border-subtle)", paddingTop: "12px", display: "flex", justifyContent: "space-between", fontSize: "16px", fontWeight: 800 }}>
          <span>Total</span>
          <span style={{ color: "#FF8A00" }}>${(total + shipping).toLocaleString()}</span>
        </div>
      </div>

      {/* Checkout Button */}
      <button onClick={handleCheckout} disabled={isCheckingOut} className="btn-amber">
        {isCheckingOut ? "Connecting to Secure Gateway..." : `Express Checkout • $${(total + shipping).toLocaleString()}`}
      </button>
    </div>
  );
};
