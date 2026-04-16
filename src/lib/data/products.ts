import { Product } from "@/types";

export const products: Product[] = [
  {
    id: "1",
    slug: "aurora-glass-bottle",
    name: "Aurora Glass Bottle",
    tagline: "The bottle that actually fits your desk aesthetic.",
    description:
      "Designed for students and creatives who care how their space looks. The Aurora bottle combines soft frosted glass with a minimalist silicone sleeve — hydration that matches your vibe, not fights it.",
    price: 650,
    originalPrice: 850,
    images: [
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800",
      "https://images.unsplash.com/photo-1523362628745-0c100150b504?w=800",
      "https://images.unsplash.com/photo-1610824352934-c10d87b700cc?w=800",
    ],
    stock: 2,
    reviews: [
      {
        id: "r1",
        name: "Tanvir Ahmed",
        rating: 5,
        comment:
          "Absolutely love this bottle. My whole desk setup looks better now.",
        date: "2024-12-10",
      },
      {
        id: "r2",
        name: "Sadia Islam",
        rating: 5,
        comment:
          "Got it as a gift and honestly it's the prettiest thing on my table.",
        date: "2024-12-18",
      },
    ],
    metaTitle:
      "Aurora Glass Bottle — Aesthetic Water Bottle Bangladesh | YourBrand",
    metaDescription:
      "A frosted glass water bottle designed for students and desk setups. Soft aesthetic, durable build. Free delivery in Dhaka. Order now.",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
