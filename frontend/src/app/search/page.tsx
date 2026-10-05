import { Suspense } from "react";
import { SearchClient } from "./SearchClient";

export const metadata = {
  title: "Search Results — Amber",
  description: "Search across thousands of curated products on Amber Marketplace.",
};

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <div className="inline-block w-8 h-8 border-2 border-[#FF8A00] border-t-transparent rounded-full animate-spin" />
          <p className="mt-4 text-xs text-[#9E948C]">Loading search results...</p>
        </div>
      }
    >
      <SearchClient />
    </Suspense>
  );
}
