import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Truck,
  ShieldCheck,
  Phone,
  Star,
  RotateCcw,
} from "lucide-react";
import { getFeaturedProducts } from "@/lib/data/products";
import { Button } from "@/components/ui/button";
import HeroBanner from "@/components/home/Banner";
import ProductCard from "@/components/home/ProductCard";

export const metadata: Metadata = {
  title: "AuraStore — Aesthetic Water Bottles Bangladesh",
  description:
    "Aesthetic water bottles and daily products for students, desk setups, and gifts. Fast delivery across Bangladesh. COD available.",
};

const trustPoints = [
  {
    icon: Truck,
    title: "Fast Delivery",
    desc: "Dhaka: 1–2 days\nOutside Dhaka: 3–5 days",
  },
  {
    icon: Phone,
    title: "Call Confirmation",
    desc: "We call before\nevery dispatch",
  },
  {
    icon: ShieldCheck,
    title: "COD Available",
    desc: "Pay when the\norder arrives",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    desc: "7-day return for\ndefective products",
  },
];

const reviews = [
  {
    name: "Tanvir Ahmed",
    city: "Dhaka",
    rating: 5,
    text: "The Aurora bottle made my entire desk look more intentional. I get compliments every day in class.",
  },
  {
    name: "Sadia Islam",
    city: "Chattogram",
    rating: 5,
    text: "Ordered the gift set for my sister's birthday. She absolutely loved it. Packaging was perfect.",
  },
  {
    name: "Nusrat Jahan",
    city: "Sylhet",
    rating: 5,
    text: "Fast delivery, great quality. The mist ceramic bottle is even prettier in person. 10/10.",
  },
];

export default function HomePage() {
  const featured = getFeaturedProducts();

  return (
    <>
        <HeroBanner />
        {/* Trust Strip */}
        <section
          className="border-b border-stone-100"
          style={{ backgroundColor: "var(--brand-sand)" }}
        >
          <div className="max-w-6xl mx-auto px-4 py-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {trustPoints.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex items-start gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                    style={{ backgroundColor: "var(--brand-cream)" }}
                  >
                    <Icon size={15} style={{ color: "var(--brand-earth)" }} />
                  </div>
                  <div>
                    <p
                      className="text-xs font-semibold"
                      style={{ color: "var(--brand-dark)" }}
                    >
                      {title}
                    </p>
                    <p
                      className="text-xs whitespace-pre-line leading-relaxed"
                      style={{ color: "#8B7B70" }}
                    >
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* Featured Products */}
        <section className="max-w-6xl mx-auto px-4 py-16">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-2"
                style={{ color: "var(--brand-sage)" }}
              >
                Our Collection
              </p>
              <h2
                className="text-3xl md:text-4xl font-bold tracking-tight"
                style={{ color: "var(--brand-dark)" }}
              >
                Featured Products
              </h2>
            </div>
            <Link href="/shop">
              <Button
                variant="outline"
                size="sm"
                className="rounded-full hidden md:flex items-center gap-1.5 border-stone-200 hover:bg-stone-50"
              >
                View All <ArrowRight size={14} />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-10 md:hidden">
            <Link href="/shop">
              <Button
                variant="outline"
                className="rounded-full px-8 border-stone-200"
              >
                View All Products <ArrowRight size={15} className="ml-2" />
              </Button>
            </Link>
          </div>
        </section>
        {/* Brand Story */}
        <section
          className="py-16"
          style={{ backgroundColor: "var(--brand-sand)" }}
        >
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-5">
                <p
                  className="text-xs font-semibold uppercase tracking-widest"
                  style={{ color: "var(--brand-sage)" }}
                >
                  Our Story
                </p>
                <h2
                  className="text-3xl md:text-4xl font-bold leading-tight"
                  style={{ color: "var(--brand-dark)" }}
                >
                  Designed for people who care how their space looks
                </h2>
                <p
                  className="text-base leading-relaxed"
                  style={{ color: "#6B5744" }}
                >
                  We started AuraStore because we couldn&apos;t find products in
                  Bangladesh that were both useful and genuinely beautiful.
                  Everything was either cheap and ugly, or imported and
                  overpriced.
                </p>
                <p
                  className="text-base leading-relaxed"
                  style={{ color: "#6B5744" }}
                >
                  We wanted something different — aesthetic, affordable, and
                  made for students and young people here. Every product we
                  carry is chosen for its design, quality, and ability to make
                  your daily space feel more intentional.
                </p>
                <Link href="/shop">
                  <Button
                    className="rounded-full px-8 mt-2 transition-transform hover:scale-105"
                    style={{
                      backgroundColor: "var(--brand-earth)",
                      color: "white",
                      border: "none",
                    }}
                  >
                    Shop the Collection{" "}
                    <ArrowRight size={15} className="ml-2" />
                  </Button>
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: "500+", label: "Happy Customers" },
                  { value: "5.0", label: "Average Rating" },
                  { value: "48hr", label: "Avg Delivery Time" },
                  { value: "0%", label: "Fake Products" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-white rounded-2xl p-6 text-center border border-stone-100"
                  >
                    <p
                      className="text-3xl font-bold mb-1"
                      style={{ color: "var(--brand-earth)" }}
                    >
                      {stat.value}
                    </p>
                    <p className="text-xs text-stone-500">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        {/* Reviews */}
        <section className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center mb-10">
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-2"
              style={{ color: "var(--brand-sage)" }}
            >
              Real Customers
            </p>
            <h2
              className="text-3xl font-bold"
              style={{ color: "var(--brand-dark)" }}
            >
              What People Say
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((r) => (
              <div
                key={r.name}
                className="bg-white rounded-2xl p-6 border border-stone-100 space-y-3"
              >
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      size={14}
                      className="fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "#6B5744" }}
                >
                  &ldquo;{r.text}&rdquo;
                </p>
                <div className="flex items-center gap-2 pt-1">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                    style={{ backgroundColor: "var(--brand-earth)" }}
                  >
                    {r.name.charAt(0)}
                  </div>
                  <div>
                    <p
                      className="text-xs font-semibold"
                      style={{ color: "var(--brand-dark)" }}
                    >
                      {r.name}
                    </p>
                    <p className="text-xs text-stone-400">{r.city}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
        {/* CTA Banner */}
        <section
          className="py-16"
          style={{ backgroundColor: "var(--brand-dark)" }}
        >
          <div className="max-w-3xl mx-auto px-4 text-center">
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-3"
              style={{ color: "var(--brand-amber)" }}
            >
              Limited Stock
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to upgrade your space?
            </h2>
            <p className="text-base mb-8" style={{ color: "#A89888" }}>
              Fast delivery across Bangladesh. Pay on delivery. No commitment.
            </p>
            <Link href="/shop">
              <Button
                size="lg"
                className="rounded-full px-10 h-12 text-sm font-semibold transition-transform hover:scale-105"
                style={{
                  backgroundColor: "var(--brand-amber)",
                  color: "white",
                  border: "none",
                }}
              >
                Shop Now <ArrowRight size={16} className="ml-2" />
              </Button>
            </Link>
          </div>
        </section>
    </>
  );
}
