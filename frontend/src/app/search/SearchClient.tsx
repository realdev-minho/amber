"use client";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { PRODUCTS, searchProducts } from "@/constants/products";
import { CatalogView } from "@/components/catalog/CatalogView";

export function SearchClient() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const results = useMemo(() => {
    if (!query) return PRODUCTS;
    return searchProducts(query);
  }, [query]);

  return (
    <CatalogView
      initialProducts={results}
      pageTitle={query ? `Search: "${query}"` : "Search Catalog"}
      pageSubtitle={
        query
          ? `Found ${results.length} item${results.length === 1 ? "" : "s"} matching your inquiry.`
          : "Explore our full marketplace directory."
      }
    />
  );
}
