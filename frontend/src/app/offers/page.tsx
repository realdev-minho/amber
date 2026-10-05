import { getOfferProducts } from "@/constants/products";
import { CatalogView } from "@/components/catalog/CatalogView";

export const metadata = {
  title: "Exclusive Offers & Discounts — Amber",
  description: "Save up to 30% on curated luxury goods, high-fidelity audio, and automatic horology.",
};

export default function OffersPage() {
  const offerProducts = getOfferProducts();

  return (
    <CatalogView
      initialProducts={offerProducts}
      pageTitle="Limited-Time Offers"
      pageSubtitle="Enjoy seasonal price reductions on our most celebrated pieces."
    />
  );
}
