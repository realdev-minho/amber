import { PRODUCTS } from "@/constants/products";
import { CatalogView } from "@/components/catalog/CatalogView";

export const metadata = {
  title: "Browse — Amber",
  description: "Browse our complete catalog of luxury apparel, acoustic gear, timepieces, and home goods.",
};

export default function ShopPage() {
  return (
    <CatalogView
      initialProducts={PRODUCTS}
      pageTitle="Browse"
    />
  );
}
