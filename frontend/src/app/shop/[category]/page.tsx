import { PRODUCTS } from "@/constants/products";
import { CATEGORIES } from "@/constants/categories";
import { CatalogView } from "@/components/catalog/CatalogView";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { category } = await params;
  const cat = CATEGORIES.find((c) => c.slug.toLowerCase() === category.toLowerCase());
  return {
    title: cat ? `${cat.name} Collection — Amber` : "Category — Amber",
    description: cat?.description || "Browse items in this category.",
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;
  const matchedCategory = CATEGORIES.find(
    (c) => c.slug.toLowerCase() === category.toLowerCase()
  );

  if (!matchedCategory) {
    notFound();
  }

  const categoryProducts = PRODUCTS.filter(
    (p) => p.category.toLowerCase() === category.toLowerCase()
  );

  return (
    <CatalogView
      initialProducts={categoryProducts}
      initialCategory={category}
      pageTitle={`${matchedCategory.name} Collection`}
      pageSubtitle={matchedCategory.description}
    />
  );
}
