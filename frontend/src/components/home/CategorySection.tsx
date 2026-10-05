"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CATEGORIES } from "@/constants/categories";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { useAuthStore } from "@/stores/useAuthStore";

export function CategorySection() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();

  const handleNav = (e: React.MouseEvent, path: string) => {
    if (!isAuthenticated) {
      e.preventDefault();
      router.push(`/auth/callback/google?redirect=${encodeURIComponent(path)}`);
    }
  };

  return (
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-end justify-between mb-8">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#FF8A00]">
            Curated Collections
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#FBF8F5] mt-1">
            Browse By Category
          </h2>
        </div>
        <Link
          href="/shop"
          onClick={(e) => handleNav(e, "/shop")}
          className="text-xs font-medium text-stone-300 hover:text-[#FF8A00] flex items-center gap-1 transition-colors"
        >
          View All <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Desktop structured grid & Mobile horizontal scroll rail */}
      <div className="flex overflow-x-auto pb-4 pt-1 sm:grid sm:grid-cols-3 md:grid-cols-5 gap-3.5 sm:gap-4 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
        {CATEGORIES.map((category, idx) => {
          const targetPath = `/shop/${category.slug}`;
          return (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.04 }}
              className="shrink-0 w-36 sm:w-auto"
            >
              <Link
                href={targetPath}
                onClick={(e) => handleNav(e, targetPath)}
                className="group relative flex flex-col items-center p-3.5 rounded-2xl bg-[#1A1614] border border-white/6 hover:border-[#FF8A00]/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#FF8A00]/5 text-center"
              >
                {/* Category circle image with hover zoom */}
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden mb-3 border border-white/10 group-hover:border-[#FF8A00]/50 transition-colors">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    sizes="(max-width: 640px) 80px, 96px"
                    className="object-cover transition-transform duration-500 group-hover:scale-115"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-20 transition-opacity" />
                </div>

                <h3 className="text-xs sm:text-sm font-semibold text-[#FBF8F5] group-hover:text-[#FF8A00] transition-colors line-clamp-1">
                  {category.name}
                </h3>
                <p className="text-[10px] text-[#9E948C] mt-0.5 font-medium">
                  {category.productCount}+ items
                </p>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
