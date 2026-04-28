import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { productService } from "@/services/product.service";
import ProductDetailClient from "@/components/productDetailsPage/ProductDetailClient";
import { Suspense } from "react";

// Generate static params for better SEO (optional)
export async function generateStaticParams() {
  try {
    const response = await productService.getAllProducts({ status: "active" });
    const products = response.data || [];
    return products.map((product) => ({ slug: product.slug }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  try {
    const response = await productService.getProduct(slug);
    const product = response.data;

    if (!product) return {};

    return {
      title: product.metaTitle || product.name,
      description: product.metaDescription || product.tagline,
      openGraph: {
        title: product.metaTitle || product.name,
        description: product.metaDescription || product.tagline,
        url: `/shop/${product.slug}`,
        siteName: "AuraStore",
        images: product.images?.[0]?.url
          ? [
              {
                url: product.images[0].url,
                width: 900,
                height: 900,
                alt: product.images[0].alt || product.name,
              },
            ]
          : [],
        type: "website",
        locale: "en_US",
      },
      twitter: {
        card: "summary_large_image",
        title: product.metaTitle || product.name,
        description: product.metaDescription || product.tagline,
        images: product.images?.[0]?.url ? [product.images[0].url] : [],
      },
      alternates: {
        canonical: `/shop/${product.slug}`,
      },
    };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return {};
  }
}

async function getProduct(slug: string) {
  try {
    const response = await productService.getProduct(slug);
    return response.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  return (
    <Suspense fallback={<ProductSkeleton />}>
      <ProductDetailClient product={product} />
    </Suspense>
  );
}

// Loading skeleton component
function ProductSkeleton() {
  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--brand-cream)" }}
    >
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image skeleton */}
          <div className="space-y-3">
            <div className="aspect-square bg-stone-200 rounded-2xl animate-pulse" />
            <div className="flex gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-20 h-20 bg-stone-200 rounded-xl animate-pulse"
                />
              ))}
            </div>
          </div>

          {/* Content skeleton */}
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="h-6 w-24 bg-stone-200 rounded-full animate-pulse" />
              <div className="h-8 w-3/4 bg-stone-200 rounded animate-pulse" />
              <div className="h-4 w-1/2 bg-stone-200 rounded animate-pulse" />
            </div>
            <div className="h-10 w-32 bg-stone-200 rounded animate-pulse" />
            <div className="space-y-2">
              <div className="h-4 w-full bg-stone-200 rounded animate-pulse" />
              <div className="h-4 w-full bg-stone-200 rounded animate-pulse" />
              <div className="h-4 w-2/3 bg-stone-200 rounded animate-pulse" />
            </div>
            <div className="h-24 bg-stone-200 rounded animate-pulse" />
            <div className="h-12 bg-stone-200 rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
