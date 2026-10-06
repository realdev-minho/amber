import { useState } from "react";
import { MobileHeader } from "@/components/layout/MobileHeader";
import { BottomTabBar, TabType } from "@/components/layout/BottomTabBar";
import { ShopScreen } from "@/screens/ShopScreen";
import { SearchScreen } from "@/screens/SearchScreen";
import { WishlistScreen } from "@/screens/WishlistScreen";
import { CartScreen } from "@/screens/CartScreen";
import { AccountScreen } from "@/screens/AccountScreen";
import { ProductDetailScreen } from "@/screens/ProductDetailScreen";

export function App() {
  const [currentTab, setCurrentTab] = useState<TabType>("shop");
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  const handleSelectProduct = (productId: string) => {
    setSelectedProductId(productId);
  };

  const handleBackToShop = () => {
    setSelectedProductId(null);
  };

  const handleTabChange = (tab: TabType) => {
    setSelectedProductId(null);
    setCurrentTab(tab);
  };

  return (
    <div className="mobile-viewport">
      {/* Native App Top Header (only when not viewing single product detail) */}
      {!selectedProductId && (
        <MobileHeader
          onOpenCart={() => handleTabChange("cart")}
          title={
            currentTab === "cart"
              ? "Shopping Bag"
              : currentTab === "wishlist"
              ? "Saved Pieces"
              : currentTab === "account"
              ? "My Account"
              : undefined
          }
        />
      )}

      {/* Main Content Area */}
      <main style={{ flex: 1 }}>
        {selectedProductId ? (
          <ProductDetailScreen
            productId={selectedProductId}
            onBack={handleBackToShop}
            onGoToCart={() => handleTabChange("cart")}
          />
        ) : currentTab === "shop" ? (
          <ShopScreen onSelectProduct={handleSelectProduct} />
        ) : currentTab === "search" ? (
          <SearchScreen onSelectProduct={handleSelectProduct} />
        ) : currentTab === "wishlist" ? (
          <WishlistScreen
            onSelectProduct={handleSelectProduct}
            onExplore={() => handleTabChange("shop")}
          />
        ) : currentTab === "cart" ? (
          <CartScreen onContinueShopping={() => handleTabChange("shop")} />
        ) : (
          <AccountScreen />
        )}
      </main>

      {/* Persistent Bottom Tab Bar */}
      <BottomTabBar
        currentTab={currentTab}
        onTabChange={handleTabChange}
      />
    </div>
  );
}

export default App;
