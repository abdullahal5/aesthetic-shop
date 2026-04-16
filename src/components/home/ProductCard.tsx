"use client";

import Link from "next/link";
import { Star, ShoppingCart } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviewCount: number;
  slug: string;
}

export default function ProductCard({
  id,
  name,
  price,
  originalPrice,
  image,
  rating,
  reviewCount,
  slug,
}: ProductCardProps) {
  return (
    <Card className="group overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300">
      <Link href={`/products/${slug}`}>
        <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden">
          <div className="text-6xl transition-transform duration-300 group-hover:scale-110">
            {image}
          </div>

          {/* Discount Badge */}
          {originalPrice && (
            <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
              {Math.round(((originalPrice - price) / originalPrice) * 100)}% OFF
            </div>
          )}
        </div>
      </Link>

      <div className="p-4">
        {/* Rating */}
        <div className="flex items-center gap-2 mb-2">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 ${
                  i < rating
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500">({reviewCount})</span>
        </div>

        {/* Product Name */}
        <Link href={`/products/${slug}`}>
          <h3 className="font-semibold text-gray-900 mb-2 hover:text-gray-600 transition-colors line-clamp-2 min-h-[3rem]">
            {name}
          </h3>
        </Link>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-xl font-bold text-gray-900">৳{price}</span>
          {originalPrice && (
            <span className="text-sm text-gray-500 line-through">
              ৳{originalPrice}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <Button
          className="w-full bg-gray-900 hover:bg-gray-800 text-white"
          onClick={() => console.log("Add to cart:", id)}
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Add to Cart
        </Button>
      </div>
    </Card>
  );
}
