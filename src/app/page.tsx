import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Star, Truck, Shield, RotateCcw } from "lucide-react";
import Banner from "@/components/home/Banner";
import ProductCard from "@/components/home/ProductCard";

export const metadata: Metadata = {
  title: "Shop Aesthetic Water Bottles Bangladesh",
  description:
    "Aesthetic water bottles & daily products for students and gift lovers. Fast delivery in Dhaka and across Bangladesh. Free shipping on orders above 1500 BDT.",
  openGraph: {
    title: "AestheticBD — Aesthetic Water Bottles Bangladesh",
    description:
      "Shop aesthetic water bottles for students, desk setups & gifts. Fast delivery.",
    url: "https://aestheticbd.com",
    type: "website",
  },
};

// Sample products data
const products = [
  {
    id: "1",
    name: "Aurora Glass Bottle",
    price: 650,
    originalPrice: 850,
    image: "🌙",
    rating: 5,
    reviewCount: 47,
    slug: "aurora-glass-bottle",
  },
  {
    id: "2",
    name: "Minimalist Steel Bottle",
    price: 550,
    originalPrice: 750,
    image: "⚡",
    rating: 4.5,
    reviewCount: 32,
    slug: "minimalist-steel-bottle",
  },
  {
    id: "3",
    name: "Pastel Water Bottle",
    price: 450,
    originalPrice: 650,
    image: "🌸",
    rating: 4.8,
    reviewCount: 28,
    slug: "pastel-water-bottle",
  },
  {
    id: "4",
    name: "Eco-Friendly Bamboo Bottle",
    price: 750,
    originalPrice: 950,
    image: "🎋",
    rating: 5,
    reviewCount: 19,
    slug: "eco-friendly-bamboo-bottle",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Banner Section */}
      <Banner />

      {/* Featured Products Section */}
      <section className="max-w-7xl mx-auto px-4 py-16 md:py-24">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Featured Products
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our most loved aesthetic bottles that customers can't stop
            talking about
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/products">
            <Button
              variant="outline"
              size="lg"
              className="border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white"
            >
              View All Products
            </Button>
          </Link>
        </div>
      </section>

      {/* Trust Section */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Card className="p-6 border-gray-200">
              <Truck className="w-8 h-8 text-gray-900 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">
                Fast Delivery
              </h3>
              <p className="text-sm text-gray-600">
                Order confirmed within 24 hours. Delivered in 3-5 days across
                Dhaka.
              </p>
            </Card>
            <Card className="p-6 border-gray-200">
              <Shield className="w-8 h-8 text-gray-900 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">
                100% Authentic
              </h3>
              <p className="text-sm text-gray-600">
                Real photos, real customers, real reviews. No fake inventory.
              </p>
            </Card>
            <Card className="p-6 border-gray-200">
              <RotateCcw className="w-8 h-8 text-gray-900 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Easy Returns</h3>
              <p className="text-sm text-gray-600">
                Not happy? Return within 7 days. No questions asked.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Hero Product Section */}
      <section className="max-w-7xl mx-auto px-4 py-16 md:py-24">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Our Hero Product
          </h2>
          <p className="text-gray-600">The bottle that started it all</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image Placeholder */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg aspect-square flex items-center justify-center">
            <div className="text-center">
              <div className="text-8xl mb-4">🌙</div>
              <p className="text-gray-600 font-medium">Aurora Glass Bottle</p>
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">
              Aurora Glass Bottle
            </h3>
            <p className="text-xl text-gray-600 mb-6">
              The bottle that actually fits your desk aesthetic.
            </p>

            <div className="space-y-4 mb-8">
              <p className="text-gray-700">
                Designed for students and creatives who care how their space
                looks. The Aurora bottle combines soft frosted glass with a
                minimalist silicone sleeve — hydration that matches your vibe,
                not fights it.
              </p>

              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-gray-900">৳650</span>
                <span className="text-lg text-gray-500 line-through">৳850</span>
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-8">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">5.0 (47 reviews)</span>
            </div>

            {/* CTA */}
            <Link href="/products/aurora-glass-bottle" className="block">
              <Button
                size="lg"
                className="w-full bg-gray-900 hover:bg-gray-800 text-white mb-3"
              >
                View Details & Buy
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="w-full">
              Call to Order
            </Button>
          </div>
        </div>
      </section>

      {/* Reviews Preview */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              What Customers Say
            </h2>
            <p className="text-gray-600">Real feedback from real people</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                name: "Tanvir Ahmed",
                review:
                  "Absolutely love this bottle. My whole desk setup looks better now.",
                rating: 5,
              },
              {
                name: "Sadia Islam",
                review:
                  "Got it as a gift and honestly it's the prettiest thing on my table.",
                rating: 5,
              },
            ].map((review, i) => (
              <Card key={i} className="p-6 border-gray-200">
                <div className="flex gap-1 mb-3">
                  {[...Array(review.rating)].map((_, j) => (
                    <Star
                      key={j}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">{review.review}</p>
                <p className="font-semibold text-gray-900">— {review.name}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-7xl mx-auto px-4 py-16 md:py-24">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Frequently Asked
          </h2>
          <p className="text-gray-600">Everything you need to know</p>
        </div>

        <div className="space-y-4 max-w-3xl mx-auto">
          {[
            {
              q: "How long does delivery take?",
              a: "Orders are confirmed within 24 hours and delivered within 3-5 business days in Dhaka. We call you before delivery to confirm.",
            },
            {
              q: "What if I want to return?",
              a: "You have 7 days to return any product if you're not satisfied. We'll arrange pickup from your location.",
            },
            {
              q: "Is it cash on delivery?",
              a: "Yes! We support COD for all orders. Pay when the bottle arrives at your doorstep.",
            },
            {
              q: "Where do you deliver?",
              a: "Currently delivering in Dhaka city. Expansion to other cities coming soon.",
            },
          ].map((item, i) => (
            <details
              key={i}
              className="group border border-gray-200 rounded-lg p-4 cursor-pointer hover:bg-gray-50"
            >
              <summary className="font-semibold text-gray-900 flex items-center justify-between">
                {item.q}
                <span className="text-gray-600 group-open:rotate-180">▼</span>
              </summary>
              <p className="text-gray-600 mt-3">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Yours?
          </h2>
          <p className="text-gray-300 mb-8 text-lg max-w-2xl mx-auto">
            Limited stock available. Order now and get your Aurora Glass Bottle
            delivered within 5 days.
          </p>
          <Link href="/products/aurora-glass-bottle">
            <Button
              size="lg"
              className="bg-white text-gray-900 hover:bg-gray-100"
            >
              Shop Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
