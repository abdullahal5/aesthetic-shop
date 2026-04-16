import { Metadata } from "next";
import Link from "next/link";
import { products } from "@/lib/data/products";
import ProductCard from "@/components/home/ProductCard";

export const metadata: Metadata = {
  title: "Shop Aesthetic Water Bottles | AestheticBD",
  description:
    "Browse our collection of aesthetic water bottles, perfect for students, desk setups, and gifts. Free shipping on orders above 1500 BDT.",
};

export default function ProductPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            All Products
          </h1>
          <p className="text-gray-600">
            Discover our collection of aesthetic bottles and accessories
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              originalPrice={product.originalPrice}
              image={product.images[0]}
              rating={5}
              reviewCount={product.reviews.length}
              slug={product.slug}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
