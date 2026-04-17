import { Product } from "@/types";

export const products: Product[] = [
  {
    id: "1",
    slug: "aurora-frosted-glass-bottle",
    name: "Aurora Frosted Glass Bottle",
    tagline: "The bottle that actually fits your aesthetic.",
    description: `The Aurora Frosted Glass Bottle is crafted for students, creators, and anyone who believes their daily essentials should look as good as they feel.

Made from premium borosilicate glass with a hand-feel silicone sleeve, this 500ml bottle keeps your water cool and your desk looking intentional. The frosted finish diffuses light beautifully — it photographs well and looks even better in person.

Leakproof bamboo lid, wide mouth for easy cleaning, and a minimalist design that works on your study desk, gym bag, or as a thoughtful gift.`,
    price: 650,
    originalPrice: 850,
    videoUrl:
      "https://file-examples.com/storage/fe72b8723a69e1ee99cdb63/2017/04/file_example_MP4_480_1_5MG.mp4",
    images: [
      {
        url: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=900&q=85",
        alt: "Aurora frosted glass bottle front view",
      },
      {
        url: "https://images.unsplash.com/photo-1523362628745-0c100150b504?w=900&q=85",
        alt: "Aurora bottle on desk setup",
      },
      {
        url: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900&q=85",
        alt: "Aurora bottle lifestyle shot",
      },
      {
        url: "https://images.unsplash.com/photo-1544441893-675973e31985?w=900&q=85",
        alt: "Aurora bottle close up texture",
      },
    ],
    stock: 8,
    totalSold: 247,
    category: "Water Bottles",
    tags: ["aesthetic", "glass", "desk setup", "gift", "student"],
    features: [
      "500ml borosilicate glass",
      "Anti-slip silicone sleeve",
      "Leakproof bamboo lid",
      "Wide mouth — easy to clean",
      "BPA-free, food safe",
      "Works with hot & cold liquids",
    ],
    reviews: [
      {
        id: "r1",
        name: "Tanvir Ahmed",
        avatar: "T",
        rating: 5,
        comment:
          "Honestly the best purchase I've made this year. My entire desk looks more put together now. Got compliments from all my classmates. The frosted glass is even prettier in person.",
        date: "2025-01-15",
        verified: true,
      },
      {
        id: "r2",
        name: "Sadia Islam",
        avatar: "S",
        rating: 5,
        comment:
          "Bought as a gift for my sister and she absolutely loves it. The packaging was so cute and gift-ready. Delivery was fast and the bottle was perfectly packed.",
        date: "2025-01-20",
        verified: true,
      },
      {
        id: "r3",
        name: "Rahim Chowdhury",
        avatar: "R",
        rating: 4,
        comment:
          "Really good quality. The glass feels premium and the silicone grip is comfortable. Only wish it came in more colors. Will definitely buy again.",
        date: "2025-02-01",
        verified: true,
      },
      {
        id: "r4",
        name: "Nusrat Jahan",
        avatar: "N",
        rating: 5,
        comment:
          "Perfect for my study sessions. Keeps water cold for hours and the aesthetic is exactly what I wanted for my room setup. 10/10 would recommend.",
        date: "2025-02-10",
        verified: true,
      },
    ],
    metaTitle:
      "Aurora Frosted Glass Bottle — Aesthetic Water Bottle Bangladesh | AuraStore",
    metaDescription:
      "Premium frosted glass water bottle for students and desk setups. Borosilicate glass, bamboo lid, anti-slip sleeve. Fast delivery across Bangladesh. COD available.",
    featured: true,
  },
  {
    id: "2",
    slug: "mist-ceramic-bottle",
    name: "Mist Ceramic Bottle",
    tagline: "Warm mornings. Cool water. Beautiful desk.",
    description: `The Mist Ceramic Bottle is for the intentional ones. Those who take their morning routine seriously and believe every object they own should spark a little joy.

Matte ceramic coating in soft sage green, 400ml capacity, paired with a natural bamboo lid that adds warmth to any setup. The insulated double wall keeps cold drinks cold for 12 hours and hot drinks warm for 8.

Perfect for your study desk, gym bag, or as a meaningful gift for someone special.`,
    price: 750,
    originalPrice: 950,
    images: [
      {
        url: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=900&q=85",
        alt: "Mist ceramic bottle sage green",
      },
      {
        url: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=900&q=85",
        alt: "Mist bottle on wooden surface",
      },
      {
        url: "https://images.unsplash.com/photo-1596952954288-16862d37405b?w=900&q=85",
        alt: "Mist bottle close up matte finish",
      },
    ],
    stock: 5,
    totalSold: 189,
    category: "Water Bottles",
    tags: ["ceramic", "sage", "aesthetic", "gift", "insulated"],
    features: [
      "400ml double-wall insulated",
      "Matte ceramic coating",
      "Natural bamboo lid",
      "Cold 12hrs / Hot 8hrs",
      "BPA-free stainless steel core",
      "Non-slip base",
    ],
    reviews: [
      {
        id: "r5",
        name: "Arif Hassan",
        avatar: "A",
        rating: 5,
        comment:
          "Bought for my girlfriend and she uses it every single day. The sage color is so pretty and the matte finish feels so premium. She says it keeps her coffee warm for hours.",
        date: "2025-01-25",
        verified: true,
      },
      {
        id: "r6",
        name: "Mehzabin Hossain",
        avatar: "M",
        rating: 5,
        comment:
          "This is genuinely the most aesthetic thing in my room right now. The color, the texture, everything is perfect. Fast delivery and great packaging too.",
        date: "2025-02-05",
        verified: true,
      },
      {
        id: "r7",
        name: "Zahir Uddin",
        avatar: "Z",
        rating: 4,
        comment:
          "Good quality ceramic bottle. The insulation works really well. Minor complaint is the bamboo lid could fit a bit tighter. Overall happy with the purchase.",
        date: "2025-02-12",
        verified: true,
      },
    ],
    metaTitle:
      "Mist Ceramic Bottle — Sage Green Aesthetic Bottle Bangladesh | AuraStore",
    metaDescription:
      "Matte ceramic bottle in soft sage green with bamboo lid. Double-wall insulated, 400ml. Perfect for students and gifts. Fast delivery in Bangladesh. COD available.",
    featured: true,
  },
  {
    id: "3",
    slug: "cloud-glass-tumbler",
    name: "Cloud Glass Tumbler",
    tagline: "Sip cloud nine. Every single day.",
    description: `The Cloud Glass Tumbler brings a touch of whimsy to your daily hydration. A wide-mouth, clear borosilicate glass tumbler with a pastel silicone lid and straw — designed for iced coffees, smoothies, and aesthetic desk setups.

The clear glass lets you see the beautiful colors of whatever you're drinking. The cloud-white silicone lid with built-in straw hole is clean, minimal, and spill-resistant.

Light, beautiful, and completely dishwasher-safe.`,
    price: 550,
    originalPrice: 700,
    images: [
      {
        url: "https://images.unsplash.com/photo-1544441893-675973e31985?w=900&q=85",
        alt: "Cloud glass tumbler with straw",
      },
      {
        url: "https://images.unsplash.com/photo-1547592180-85f173990554?w=900&q=85",
        alt: "Cloud tumbler iced coffee",
      },
      {
        url: "https://images.unsplash.com/photo-1589984662646-e7b2e4962f18?w=900&q=85",
        alt: "Cloud tumbler flat lay",
      },
    ],
    stock: 12,
    totalSold: 312,
    category: "Tumblers",
    tags: ["glass", "tumbler", "iced coffee", "aesthetic", "straw"],
    features: [
      "450ml borosilicate glass",
      "Pastel silicone lid",
      "Reusable stainless straw",
      "Dishwasher safe",
      "Wide mouth design",
      "Heat resistant",
    ],
    reviews: [
      {
        id: "r8",
        name: "Fariha Sultana",
        avatar: "F",
        rating: 5,
        comment:
          "Perfect for my iced matcha every morning! The glass is thick and sturdy, the lid fits perfectly. I've dropped it twice and it's still fine. Love it.",
        date: "2025-01-10",
        verified: true,
      },
      {
        id: "r9",
        name: "Akash Roy",
        avatar: "A",
        rating: 5,
        comment:
          "Great tumbler! I use it for iced coffee and it looks amazing on my desk. Several people have asked me where I got it. Fast delivery too.",
        date: "2025-01-30",
        verified: true,
      },
    ],
    metaTitle:
      "Cloud Glass Tumbler — Aesthetic Tumbler for Iced Coffee Bangladesh | AuraStore",
    metaDescription:
      "Clear borosilicate glass tumbler with pastel lid and reusable straw. Perfect for iced coffee and aesthetic setups. Fast delivery Bangladesh. COD available.",
    featured: true,
  },
  {
    id: "4",
    slug: "pebble-insulated-bottle",
    name: "Pebble Insulated Bottle",
    tagline: "Smooth. Quiet. Yours.",
    description: `The Pebble Insulated Bottle is designed for the minimalist who wants nothing extra. A smooth-finish, powder-coated stainless steel bottle in a warm desert sand color that works with everything.

600ml capacity, double-wall vacuum insulated, with a simple press-and-sip lid that's leak-proof when closed. The rounded pebble-like shape fits your hand perfectly.

This is the bottle you carry everywhere without thinking twice.`,
    price: 850,
    originalPrice: 1100,
    images: [
      {
        url: "https://images.unsplash.com/photo-1596952954288-16862d37405b?w=900&q=85",
        alt: "Pebble insulated bottle desert sand",
      },
      {
        url: "https://images.unsplash.com/photo-1589984662646-e7b2e4962f18?w=900&q=85",
        alt: "Pebble bottle outdoor",
      },
      {
        url: "https://images.unsplash.com/photo-1532635241-17e820acc59f?w=900&q=85",
        alt: "Pebble bottle lifestyle",
      },
    ],
    stock: 6,
    totalSold: 145,
    category: "Water Bottles",
    tags: ["insulated", "stainless", "gym", "outdoor", "minimalist"],
    features: [
      "600ml vacuum insulated",
      "Powder-coated stainless steel",
      "Press-and-sip leakproof lid",
      "Cold 24hrs / Hot 12hrs",
      "Fits standard cup holders",
      "Sweat-free exterior",
    ],
    reviews: [
      {
        id: "r10",
        name: "Imran Khan",
        avatar: "I",
        rating: 5,
        comment:
          "Best gym bottle I've ever had. Keeps water cold for my entire 2-hour workout. The color is so clean and minimal. Worth every taka.",
        date: "2025-02-08",
        verified: true,
      },
      {
        id: "r11",
        name: "Nasreen Begum",
        avatar: "N",
        rating: 4,
        comment:
          "Love the design and color. Very sturdy and keeps drinks cold. The lid mechanism is satisfying to use. Only slight issue is it's a bit heavy when full.",
        date: "2025-02-15",
        verified: true,
      },
    ],
    metaTitle:
      "Pebble Insulated Bottle — Premium Stainless Bottle Bangladesh | AuraStore",
    metaDescription:
      "600ml vacuum insulated stainless steel bottle. Keeps cold 24hrs, hot 12hrs. Perfect for gym and travel. Fast delivery Bangladesh. COD available.",
    featured: false,
  },
  {
    id: "5",
    slug: "sakura-glass-set",
    name: "Sakura Gift Set",
    tagline: "The gift they'll actually use.",
    description: `The Sakura Gift Set is the perfect present for birthdays, anniversaries, or just because. Includes two matching frosted glass bottles in blush pink and white, gift-wrapped in premium tissue paper with a handwritten card option.

Each bottle is 400ml, made from borosilicate glass with a matching silicone sleeve. The set comes in an elegant black gift box with ribbon — ready to gift the moment it arrives.

Because some people deserve something beautiful.`,
    price: 1200,
    originalPrice: 1600,
    images: [
      {
        url: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=900&q=85",
        alt: "Sakura gift set blush pink bottles",
      },
      {
        url: "https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=900&q=85",
        alt: "Sakura set gift box",
      },
    ],
    stock: 4,
    totalSold: 98,
    category: "Gift Sets",
    tags: ["gift", "set", "pink", "birthday", "anniversary"],
    features: [
      "2x 400ml borosilicate bottles",
      "Blush pink & white color set",
      "Premium gift box included",
      "Ribbon and tissue paper",
      "Handwritten card option",
      "BPA-free, food safe",
    ],
    reviews: [
      {
        id: "r12",
        name: "Tania Akter",
        avatar: "T",
        rating: 5,
        comment:
          "Ordered this for my best friend's birthday. She literally cried when she opened it. The packaging is so thoughtful and the bottles are gorgeous. Will order again for sure.",
        date: "2025-01-22",
        verified: true,
      },
      {
        id: "r13",
        name: "Shaon Mia",
        avatar: "S",
        rating: 5,
        comment:
          "Got this for my wife. She was so happy with the presentation. The box was beautifully wrapped and the bottles are high quality. AuraStore really delivers.",
        date: "2025-02-03",
        verified: true,
      },
    ],
    metaTitle:
      "Sakura Gift Set — Aesthetic Bottle Gift Set Bangladesh | AuraStore",
    metaDescription:
      "Premium gift set with 2 matching frosted glass bottles. Beautiful gift box included. Perfect for birthdays and anniversaries. Fast delivery Bangladesh.",
    featured: true,
  },
  {
    id: "6",
    slug: "bamboo-cap-glass-bottle",
    name: "Bamboo Cap Glass Bottle",
    tagline: "Natural. Clean. Intentional.",
    description: `The Bamboo Cap Glass Bottle celebrates natural materials and clean design. Clear borosilicate glass with a warm bamboo lid and a minimalist rope handle — simple, sustainable, beautiful.

500ml capacity with a wide mouth for easy cleaning and filling with ice. The bamboo lid is sealed with food-grade silicone for a leakproof close. The rope handle makes it easy to carry without a bag.

For those who want their hydration to be as natural as their lifestyle.`,
    price: 600,
    originalPrice: 800,
    images: [
      {
        url: "https://images.unsplash.com/photo-1532635241-17e820acc59f?w=900&q=85",
        alt: "Bamboo cap glass bottle natural",
      },
      {
        url: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=900&q=85",
        alt: "Bamboo bottle clear glass",
      },
      {
        url: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900&q=85",
        alt: "Bamboo bottle rope handle",
      },
    ],
    stock: 15,
    totalSold: 203,
    category: "Water Bottles",
    tags: ["bamboo", "natural", "eco", "clear glass", "sustainable"],
    features: [
      "500ml borosilicate glass",
      "Natural bamboo lid",
      "Woven rope handle",
      "Wide mouth design",
      "Food-grade silicone seal",
      "Eco-friendly materials",
    ],
    reviews: [
      {
        id: "r14",
        name: "Priya Das",
        avatar: "P",
        rating: 5,
        comment:
          "Such a beautiful bottle. The bamboo lid and rope handle are so charming. I use it at my desk every day and it always gets compliments. Very happy!",
        date: "2025-01-28",
        verified: true,
      },
      {
        id: "r15",
        name: "Karim Uddin",
        avatar: "K",
        rating: 4,
        comment:
          "Nice quality glass and the bamboo lid feels premium. The rope handle is a nice touch. Only minus is the glass could be slightly thicker. Good overall value.",
        date: "2025-02-14",
        verified: true,
      },
    ],
    metaTitle:
      "Bamboo Cap Glass Bottle — Eco Aesthetic Bottle Bangladesh | AuraStore",
    metaDescription:
      "Clear glass bottle with natural bamboo lid and rope handle. 500ml, eco-friendly design. Perfect for desk setups. Fast delivery Bangladesh. COD available.",
    featured: false,
  },
];

export const banners = [
  {
    id: "1",
    title: "Hydrate with intention.",
    subtitle: "New Collection",
    description:
      "Aesthetic bottles designed for students, creators, and people who care how their space looks.",
    ctaText: "Shop Now",
    ctaLink: "/shop",
    imageUrl:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=1400&q=90",
    active: true,
  },
  {
    id: "2",
    title: "The gift they'll use every day.",
    subtitle: "Gift Collection",
    description:
      "Beautiful gift sets for birthdays, anniversaries, and anyone who deserves something special.",
    ctaText: "Shop Gifts",
    ctaLink: "/shop",
    imageUrl:
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=1400&q=90",
    active: true,
  },
  {
    id: "3",
    title: "Your desk. Your aesthetic.",
    subtitle: "Desk Setup Edit",
    description:
      "Bottles that look as good on your desk as they feel in your hand.",
    ctaText: "Explore",
    ctaLink: "/shop",
    imageUrl:
      "https://images.unsplash.com/photo-1523362628745-0c100150b504?w=1400&q=90",
    active: true,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}
