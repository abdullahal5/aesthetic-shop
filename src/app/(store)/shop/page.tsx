import type { Metadata } from "next";
import { Sparkles, Truck, ShieldCheck } from "lucide-react";
import { Suspense } from "react";
import ShopSkeleton from "@/components/shop/ShopSkeleton";
import ShopContent from "@/components/shop/ShopContent";
import { productService } from "@/services/product.service";

export const metadata: Metadata = {
  title: "Shop Aesthetic Water Bottles — AuraStore Bangladesh",
  description:
    "Browse all aesthetic water bottles, tumblers, and gift sets. Fast delivery across Bangladesh. COD available.",
};

// Fetch initial products on the server for SEO
async function getInitialProducts() {
  try {
    const response = await productService.getAllProducts({
      status: "active",
    });
    return response.data || [];
  } catch (error) {
    console.error("Error fetching initial products:", error);
    return [];
  }
}

export default async function ShopPage() {
  const initialProducts = await getInitialProducts();

  return (
    <>
      {/* Header */}
      <div
        className="border-b border-stone-100"
        style={{ backgroundColor: "var(--brand-sand)" }}
      >
        <div className="max-w-6xl mx-auto px-4 py-12">
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-2"
            style={{ color: "var(--brand-sage)" }}
          >
            Our Collection
          </p>
          <h1
            className="text-3xl md:text-4xl font-bold mb-3"
            style={{ color: "var(--brand-dark)" }}
          >
            All Products
          </h1>
          <p className="text-sm max-w-lg" style={{ color: "#8B7B70" }}>
            Each piece is chosen for its design, quality, and ability to make
            your everyday space better.
          </p>

          {/* Trust row */}
          <div className="flex flex-wrap gap-4 mt-6">
            {[
              { icon: Truck, text: "Fast delivery BD-wide" },
              { icon: ShieldCheck, text: "COD available" },
              { icon: Sparkles, text: "100% authentic" },
            ].map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="flex items-center gap-1.5 text-xs"
                style={{ color: "#8B7B70" }}
              >
                <Icon size={13} style={{ color: "var(--brand-earth)" }} />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10">
        <Suspense fallback={<ShopSkeleton />}>
          <ShopContent />
        </Suspense>

        {/* Bottom trust */}
        <div className="mt-16 p-8 rounded-2xl text-center border border-stone-100 bg-white">
          <h3
            className="text-lg font-semibold mb-2"
            style={{ color: "var(--brand-dark)" }}
          >
            Not sure what to get?
          </h3>
          <p className="text-sm mb-4" style={{ color: "#8B7B70" }}>
            WhatsApp or call us — we&apos;ll help you pick the perfect bottle.
          </p>
          <a
            href="https://wa.me/8801700000000?text=Hi%2C%20I%20need%20help%20picking%20a%20product%20from%20AuraStore"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold text-white transition-transform hover:scale-105"
            style={{ backgroundColor: "#25D366" }}
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp Us
          </a>
        </div>
      </div>
    </>
  );
}
