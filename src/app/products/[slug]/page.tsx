import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Star, ShoppingCart, Phone } from "lucide-react";
import { getProductBySlug, products } from "@/lib/data/products";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

// Fix: Await params in generateMetadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {};
  }

  return {
    title: product.metaTitle,
    description: product.metaDescription,
    openGraph: {
      title: product.metaTitle,
      description: product.metaDescription,
      type: "website",
      images: [
        {
          url: product.images[0],
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: product.metaTitle,
      description: product.metaDescription,
      images: [product.images[0]],
    },
  };
}

// Fix: Await params in ProductPage component
export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto px-4 py-4 text-sm text-gray-600">
        <Link href="/" className="hover:text-gray-900">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span>{product.name}</span>
      </div>

      {/* Product Section */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images */}
          <ProductImages images={product.images} name={product.name} />

          {/* Product Info */}
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              {product.name}
            </h1>
            <p className="text-lg text-gray-600 mb-6">{product.tagline}</p>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                5.0 ({product.reviews.length} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-8">
              <span className="text-4xl font-bold text-gray-900">
                ৳{product.price}
              </span>
              {product.originalPrice && (
                <span className="text-xl text-gray-500 line-through">
                  ৳{product.originalPrice}
                </span>
              )}
            </div>

            {/* Full Description */}
            {/* {product.fullDescription && (
              <div className="text-gray-700 mb-8 space-y-4 whitespace-pre-line">
                {product.fullDescription}
              </div>
            )} */}

            {/* Stock Status */}
            <div
              className={`mb-8 p-4 rounded-lg ${product.stock > 0 ? "bg-green-50" : "bg-red-50"}`}
            >
              <p
                className={`font-semibold ${product.stock > 0 ? "text-green-800" : "text-red-800"}`}
              >
                {product.stock > 0
                  ? `✓ In Stock (Only ${product.stock} left)`
                  : "✗ Out of Stock"}
              </p>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <Button
                size="lg"
                className="w-full bg-gray-900 hover:bg-gray-800 text-white"
                disabled={product.stock === 0}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>
              <Button size="lg" variant="outline" className="w-full">
                <Phone className="w-5 h-5 mr-2" />
                Order by Call: +880 1234 567890
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="mt-8 space-y-3 text-sm text-gray-600">
              <p>✓ Fast delivery within 3-5 days</p>
              <p>✓ Cash on Delivery (COD)</p>
              <p>✓ 7-day easy returns</p>
              <p>✓ 100% authentic product</p>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Customer Reviews
          </h2>

          <div className="space-y-4">
            {product.reviews.map((review) => (
              <Card key={review.id} className="p-6 border-gray-200">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {review.name}
                    </h4>
                    <p className="text-xs text-gray-500">{review.date}</p>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Related Products / CTA */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Interested?</h2>
          <p className="text-gray-600 mb-8 text-lg">
            Join hundreds of satisfied customers. Order your Aurora Glass Bottle
            today.
          </p>
          <Button
            size="lg"
            className="bg-gray-900 hover:bg-gray-800 text-white"
          >
            Complete Your Order
          </Button>
        </div>
      </section>
    </div>
  );
}

// Product Images Component
function ProductImages({ images, name }: { images: string[]; name: string }) {
  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="bg-gray-100 rounded-lg aspect-square flex items-center justify-center overflow-hidden">
        <div className="text-center">
          <div className="text-8xl mb-4">💧</div>
          <p className="text-gray-600">{name}</p>
        </div>
      </div>

      {/* Thumbnail Images */}
      <div className="grid grid-cols-3 gap-4">
        {images.slice(0, 3).map((image, i) => (
          <div
            key={i}
            className="bg-gray-100 rounded-lg aspect-square flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors"
          >
            <div className="text-4xl">📦</div>
          </div>
        ))}
      </div>
    </div>
  );
}
