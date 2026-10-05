import { notFound } from "next/navigation";
import { getProductBySlug, PRODUCTS } from "@/constants/products";
import { getProductReviews } from "@/constants/reviews";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductInfo } from "@/components/product/ProductInfo";
import { ProductActions } from "@/components/product/ProductActions";
import { ProductReviews } from "@/components/product/ProductReviews";
import { ProductCard } from "@/components/catalog/ProductCard";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product Not Found — Amber" };

  return {
    title: `${product.name} — Amber`,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const reviews = getProductReviews(product.id);
  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 5);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#9E948C] mb-8">
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5 text-stone-600" />
        <Link href="/shop" className="hover:text-white transition-colors">Shop</Link>
        <ChevronRight className="w-3.5 h-3.5 text-stone-600" />
        <Link href={`/shop/${product.category}`} className="hover:text-white capitalize transition-colors">
          {product.category}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-stone-600" />
        <span className="text-stone-300 font-medium truncate max-w-[200px]">{product.name}</span>
      </nav>

      {/* Main product showcase: Gallery on Left, Info & Actions on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        <div className="lg:col-span-7">
          <ProductGallery images={product.images} productName={product.name} />
        </div>

        <div className="lg:col-span-5 space-y-6">
          <ProductInfo product={product} />
          <ProductActions product={product} />
        </div>
      </div>

      {/* Verified Reviews Section */}
      <ProductReviews
        productId={product.id}
        initialReviews={reviews}
        rating={product.rating}
        reviewCount={product.reviewCount}
      />

      {/* Similar curated pieces */}
      {relatedProducts.length > 0 && (
        <section className="mt-20 pt-12 border-t border-white/8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-extrabold text-[#FBF8F5]">Complete The Ensemble</h2>
            <Link href={`/shop/${product.category}`} className="text-xs text-[#FF8A00] font-semibold hover:underline">
              See more in {product.category}
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
