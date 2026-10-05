import React, { useState } from "react";
import { User, Package, MapPin, ShieldCheck, LogOut, ChevronRight } from "lucide-react";
import { useAuthStore } from "@/stores/useAuthStore";

export const AccountScreen: React.FC = () => {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const logout = useAuthStore((state) => state.logout);

  const [emailInput, setEmailInput] = useState("");
  const [nameInput, setNameInput] = useState("");

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) return;
    setUser({
      id: "usr-" + Date.now(),
      email: emailInput,
      firstName: nameInput || "Client",
    });
  };

  const MOCK_ORDERS = [
    { id: "AMB-9481", date: "Oct 5, 2026", status: "Delivered", items: 2, total: "$3,450" },
    { id: "AMB-8120", date: "Sep 28, 2026", status: "In Transit", items: 1, total: "$1,890" },
  ];

  return (
    <div style={{ padding: "16px 14px", paddingBottom: "100px" }}>
      {/* User Header */}
      <div style={{ background: "var(--bg-card)", border: "1px solid var(--border-card)", borderRadius: "16px", padding: "18px", marginBottom: "20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "rgba(255, 138, 0, 0.15)", border: "1px solid #FF8A00", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <User size={22} color="#FF8A00" />
          </div>
          <div>
            <h3 style={{ fontSize: "16px", fontWeight: 800, color: "var(--text-main)" }}>
              {user ? (user.firstName || user.email) : "Amber Atelier Client"}
            </h3>
            <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>
              {user ? user.email : "Sign in to manage orders & express dispatch"}
            </p>
          </div>
        </div>

        {!user && (
          <form onSubmit={handleSignIn} style={{ marginTop: "16px", display: "flex", flexDirection: "column", gap: "8px" }}>
            <input
              type="text"
              placeholder="Your Name (Optional)"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              style={{ background: "var(--bg-input)", border: "1px solid var(--border-subtle)", borderRadius: "10px", padding: "10px 12px", color: "var(--text-main)", fontSize: "13px", outline: "none" }}
            />
            <input
              type="email"
              placeholder="Your Email"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              required
              style={{ background: "var(--bg-input)", border: "1px solid var(--border-subtle)", borderRadius: "10px", padding: "10px 12px", color: "var(--text-main)", fontSize: "13px", outline: "none" }}
            />
            <button type="submit" className="btn-amber" style={{ padding: "10px 14px", fontSize: "13px", marginTop: "4px" }}>
              Quick Sign In
            </button>
          </form>
        )}
      </div>

      {/* Orders Section */}
      <div style={{ marginBottom: "24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "12px" }}>
          <Package size={16} color="#FF8A00" />
          <h3 style={{ fontSize: "14px", fontWeight: 700, color: "var(--text-main)" }}>Recent Orders</h3>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {MOCK_ORDERS.map((ord) => (
            <div key={ord.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "var(--bg-card)", border: "1px solid var(--border-card)", borderRadius: "12px", padding: "12px" }}>
              <div>
                <span style={{ fontSize: "13px", fontWeight: 800, color: "var(--text-main)", fontFamily: "monospace" }}>#{ord.id}</span>
                <span style={{ fontSize: "11px", color: "var(--text-muted)", display: "block", marginTop: "2px" }}>{ord.date} • {ord.items} {ord.items === 1 ? "item" : "items"}</span>
              </div>
              <div style={{ textAlign: "right" }}>
                <span style={{ fontSize: "11px", fontWeight: 700, color: ord.status === "Delivered" ? "#4ADE80" : "#FF8A00", background: "rgba(255,255,255,0.05)", padding: "3px 8px", borderRadius: "6px" }}>
                  {ord.status}
                </span>
                <span style={{ fontSize: "13px", fontWeight: 800, color: "var(--text-main)", display: "block", marginTop: "4px" }}>{ord.total}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Settings */}
      <div style={{ background: "var(--bg-card)", border: "1px solid var(--border-card)", borderRadius: "14px", overflow: "hidden" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px", borderBottom: "1px solid var(--border-card)", cursor: "pointer" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <MapPin size={17} color="#9E948C" />
            <span style={{ fontSize: "13px", fontWeight: 600 }}>Delivery Addresses</span>
          </div>
          <ChevronRight size={16} color="#6B635B" />
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px", borderBottom: "1px solid var(--border-card)", cursor: "pointer" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <ShieldCheck size={17} color="#9E948C" />
            <span style={{ fontSize: "13px", fontWeight: 600 }}>Security & Verified Passkey</span>
          </div>
          <ChevronRight size={16} color="#6B635B" />
        </div>
        {user && (
          <div onClick={logout} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px", cursor: "pointer" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <LogOut size={17} color="#EF4444" />
              <span style={{ fontSize: "13px", fontWeight: 600, color: "#EF4444" }}>Log Out</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
