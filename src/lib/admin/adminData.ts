// Admin data management - mirrors/extends the store's data layer

export interface AdminProduct {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: { url: string; alt: string }[];
  stock: number;
  totalSold: number;
  category: string;
  tags: string[];
  features: string[];
  metaTitle: string;
  metaDescription: string;
  featured: boolean;
  status: "active" | "draft" | "archived";
  createdAt: string;
}

export interface AdminOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail?: string;
  customerPhone: string;
  address: string;
  district: string;
  items: {
    productId: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
    slug: string;
  }[];
  subtotal: number;
  discount?: {
    code: string;
    amount: number;
    percentage: number;
  } | null;
  deliveryFee: number;
  total: number;
  paymentMethod: string;
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
  note?: string;
  createdAt: string;
}

export interface Discount {
  id: string;
  code: string;
  discount: number; // percentage
  description?: string;
  active: boolean;
  usageCount: number;
  createdAt: string;
}

export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  imageUrl: string;
  active: boolean;
  order: number;
  createdAt: string;
}

// ─── Orders ───────────────────────────────────────────────────────────
const ORDERS_KEY = "aura_orders";

export const getOrders = (): AdminOrder[] => {
  try {
    const stored = localStorage.getItem(ORDERS_KEY);
    const orders = stored ? JSON.parse(stored) : [];
    // Add demo orders if empty
    if (orders.length === 0) {
      const demo = getDemoOrders();
      localStorage.setItem(ORDERS_KEY, JSON.stringify(demo));
      return demo;
    }
    return orders;
  } catch {
    return [];
  }
};

export const updateOrderStatus = (
  orderNumber: string,
  status: AdminOrder["status"],
): void => {
  const orders = getOrders();
  const updated = orders.map((o) =>
    o.orderNumber === orderNumber ? { ...o, status } : o,
  );
  localStorage.setItem(ORDERS_KEY, JSON.stringify(updated));
};

export const deleteOrder = (orderNumber: string): void => {
  const orders = getOrders();
  const updated = orders.filter((o) => o.orderNumber !== orderNumber);
  localStorage.setItem(ORDERS_KEY, JSON.stringify(updated));
};

// ─── Discounts ────────────────────────────────────────────────────────
const DISCOUNTS_KEY = "aura_discounts_admin";

export const getDiscounts = (): Discount[] => {
  try {
    const stored = localStorage.getItem(DISCOUNTS_KEY);
    const discounts = stored ? JSON.parse(stored) : [];
    if (discounts.length === 0) {
      const demo = getDemoDiscounts();
      localStorage.setItem(DISCOUNTS_KEY, JSON.stringify(demo));
      return demo;
    }
    return discounts;
  } catch {
    return [];
  }
};

export const saveDiscount = (discount: Discount): void => {
  const discounts = getDiscounts();
  const idx = discounts.findIndex((d) => d.id === discount.id);
  if (idx >= 0) {
    discounts[idx] = discount;
  } else {
    discounts.unshift(discount);
  }
  localStorage.setItem(DISCOUNTS_KEY, JSON.stringify(discounts));
};

export const deleteDiscount = (id: string): void => {
  const discounts = getDiscounts().filter((d) => d.id !== id);
  localStorage.setItem(DISCOUNTS_KEY, JSON.stringify(discounts));
};

export const toggleDiscount = (id: string): void => {
  const discounts = getDiscounts().map((d) =>
    d.id === id ? { ...d, active: !d.active } : d,
  );
  localStorage.setItem(DISCOUNTS_KEY, JSON.stringify(discounts));
};

// ─── Banners ──────────────────────────────────────────────────────────
const BANNERS_KEY = "aura_banners_admin";

export const getBanners = (): Banner[] => {
  try {
    const stored = localStorage.getItem(BANNERS_KEY);
    const banners = stored ? JSON.parse(stored) : [];
    if (banners.length === 0) {
      const demo = getDemoBanners();
      localStorage.setItem(BANNERS_KEY, JSON.stringify(demo));
      return demo;
    }
    return banners;
  } catch {
    return [];
  }
};

export const saveBanner = (banner: Banner): void => {
  const banners = getBanners();
  const idx = banners.findIndex((b) => b.id === banner.id);
  if (idx >= 0) {
    banners[idx] = banner;
  } else {
    banners.push(banner);
  }
  localStorage.setItem(BANNERS_KEY, JSON.stringify(banners));
};

export const deleteBanner = (id: string): void => {
  const banners = getBanners().filter((b) => b.id !== id);
  localStorage.setItem(BANNERS_KEY, JSON.stringify(banners));
};

export const toggleBanner = (id: string): void => {
  const banners = getBanners().map((b) =>
    b.id === id ? { ...b, active: !b.active } : b,
  );
  localStorage.setItem(BANNERS_KEY, JSON.stringify(banners));
};

// ─── Products (local overrides on top of static data) ────────────────
const PRODUCTS_KEY = "aura_products_admin";

export const getAdminProducts = (): AdminProduct[] => {
  try {
    const stored = localStorage.getItem(PRODUCTS_KEY);
    const products = stored ? JSON.parse(stored) : [];
    if (products.length === 0) {
      const demo = getDemoProducts();
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(demo));
      return demo;
    }
    return products;
  } catch {
    return [];
  }
};

export const saveProduct = (product: AdminProduct): void => {
  const products = getAdminProducts();
  const idx = products.findIndex((p) => p.id === product.id);
  if (idx >= 0) {
    products[idx] = product;
  } else {
    products.unshift(product);
  }
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
};

export const deleteProduct = (id: string): void => {
  const products = getAdminProducts().filter((p) => p.id !== id);
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
};

// ─── Demo Data ────────────────────────────────────────────────────────
function getDemoOrders(): AdminOrder[] {
  return [
    {
      id: "ord-1",
      orderNumber: "ORD-12345001-001",
      customerName: "Tanvir Ahmed",
      customerEmail: "tanvir@example.com",
      customerPhone: "8801712345678",
      address: "House 12, Road 5, Dhanmondi",
      district: "Dhaka",
      items: [
        {
          productId: "1",
          name: "Aurora Frosted Glass Bottle",
          price: 650,
          quantity: 2,
          image:
            "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=900&q=85",
          slug: "aurora-frosted-glass-bottle",
        },
      ],
      subtotal: 1300,
      discount: { code: "WELCOME10", amount: 130, percentage: 10 },
      deliveryFee: 70,
      total: 1240,
      paymentMethod: "cod",
      status: "confirmed",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    },
    {
      id: "ord-2",
      orderNumber: "ORD-12345002-002",
      customerName: "Sadia Islam",
      customerPhone: "8801812345679",
      address: "Flat 3B, Mirpur-10",
      district: "Dhaka",
      items: [
        {
          productId: "5",
          name: "Sakura Gift Set",
          price: 1200,
          quantity: 1,
          image:
            "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=900&q=85",
          slug: "sakura-glass-set",
        },
      ],
      subtotal: 1200,
      discount: null,
      deliveryFee: 70,
      total: 1270,
      paymentMethod: "cod",
      status: "pending",
      createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    },
    {
      id: "ord-3",
      orderNumber: "ORD-12345003-003",
      customerName: "Rahim Chowdhury",
      customerPhone: "8801912345680",
      address: "Sector 7, Uttara",
      district: "Dhaka",
      items: [
        {
          productId: "2",
          name: "Mist Ceramic Bottle",
          price: 750,
          quantity: 1,
          image:
            "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=900&q=85",
          slug: "mist-ceramic-bottle",
        },
        {
          productId: "3",
          name: "Cloud Glass Tumbler",
          price: 550,
          quantity: 1,
          image:
            "https://images.unsplash.com/photo-1544441893-675973e31985?w=900&q=85",
          slug: "cloud-glass-tumbler",
        },
      ],
      subtotal: 1300,
      discount: null,
      deliveryFee: 130,
      total: 1430,
      paymentMethod: "cod",
      status: "shipped",
      note: "Please pack carefully",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    },
    {
      id: "ord-4",
      orderNumber: "ORD-12345004-004",
      customerName: "Nusrat Jahan",
      customerPhone: "8801612345681",
      address: "GEC Circle, Khulshi",
      district: "Chattogram",
      items: [
        {
          productId: "4",
          name: "Pebble Insulated Bottle",
          price: 850,
          quantity: 1,
          image:
            "https://images.unsplash.com/photo-1596952954288-16862d37405b?w=900&q=85",
          slug: "pebble-insulated-bottle",
        },
      ],
      subtotal: 850,
      discount: null,
      deliveryFee: 130,
      total: 980,
      paymentMethod: "cod",
      status: "delivered",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    },
    {
      id: "ord-5",
      orderNumber: "ORD-12345005-005",
      customerName: "Arif Hassan",
      customerPhone: "8801712345682",
      address: "Zindabazar, Sylhet",
      district: "Sylhet",
      items: [
        {
          productId: "6",
          name: "Bamboo Cap Glass Bottle",
          price: 600,
          quantity: 3,
          image:
            "https://images.unsplash.com/photo-1532635241-17e820acc59f?w=900&q=85",
          slug: "bamboo-cap-glass-bottle",
        },
      ],
      subtotal: 1800,
      discount: { code: "SAVE20", amount: 360, percentage: 20 },
      deliveryFee: 130,
      total: 1570,
      paymentMethod: "cod",
      status: "cancelled",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
    },
  ];
}

function getDemoDiscounts(): Discount[] {
  return [
    {
      id: "d1",
      code: "WELCOME10",
      discount: 10,
      description: "Welcome discount for new customers",
      active: true,
      usageCount: 45,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(),
    },
    {
      id: "d2",
      code: "SAVE20",
      discount: 20,
      description: "20% off special promotion",
      active: true,
      usageCount: 23,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15).toISOString(),
    },
    {
      id: "d3",
      code: "SPECIAL15",
      discount: 15,
      description: "Special 15% discount",
      active: true,
      usageCount: 18,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
    },
    {
      id: "d4",
      code: "FREESHIP",
      discount: 5,
      description: "Free shipping equivalent discount",
      active: false,
      usageCount: 12,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
    },
  ];
}

function getDemoBanners(): Banner[] {
  return [
    {
      id: "b1",
      title: "Hydrate with intention.",
      subtitle: "New Collection",
      description:
        "Aesthetic bottles designed for students, creators, and people who care how their space looks.",
      ctaText: "Shop Now",
      ctaLink: "/shop",
      imageUrl:
        "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=1400&q=90",
      active: true,
      order: 1,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(),
    },
    {
      id: "b2",
      title: "The gift they'll use every day.",
      subtitle: "Gift Collection",
      description:
        "Beautiful gift sets for birthdays, anniversaries, and anyone who deserves something special.",
      ctaText: "Shop Gifts",
      ctaLink: "/shop",
      imageUrl:
        "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=1400&q=90",
      active: true,
      order: 2,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 20).toISOString(),
    },
    {
      id: "b3",
      title: "Your desk. Your aesthetic.",
      subtitle: "Desk Setup Edit",
      description:
        "Bottles that look as good on your desk as they feel in your hand.",
      ctaText: "Explore",
      ctaLink: "/shop",
      imageUrl:
        "https://images.unsplash.com/photo-1523362628745-0c100150b504?w=1400&q=90",
      active: true,
      order: 3,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(),
    },
  ];
}

function getDemoProducts(): AdminProduct[] {
  return [
    {
      id: "1",
      slug: "aurora-frosted-glass-bottle",
      name: "Aurora Frosted Glass Bottle",
      tagline: "The bottle that actually fits your aesthetic.",
      description:
        "The Aurora Frosted Glass Bottle is crafted for students, creators, and anyone who believes their daily essentials should look as good as they feel.",
      price: 650,
      originalPrice: 850,
      images: [
        {
          url: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=900&q=85",
          alt: "Aurora frosted glass bottle front view",
        },
      ],
      stock: 8,
      totalSold: 247,
      category: "Water Bottles",
      tags: ["aesthetic", "glass", "desk setup"],
      features: ["500ml borosilicate glass", "Anti-slip silicone sleeve"],
      metaTitle: "Aurora Frosted Glass Bottle",
      metaDescription: "Premium frosted glass water bottle",
      featured: true,
      status: "active",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 60).toISOString(),
    },
    {
      id: "2",
      slug: "mist-ceramic-bottle",
      name: "Mist Ceramic Bottle",
      tagline: "Warm mornings. Cool water. Beautiful desk.",
      description: "The Mist Ceramic Bottle is for the intentional ones.",
      price: 750,
      originalPrice: 950,
      images: [
        {
          url: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=900&q=85",
          alt: "Mist ceramic bottle sage green",
        },
      ],
      stock: 5,
      totalSold: 189,
      category: "Water Bottles",
      tags: ["ceramic", "sage", "aesthetic"],
      features: ["400ml double-wall insulated", "Matte ceramic coating"],
      metaTitle: "Mist Ceramic Bottle",
      metaDescription: "Matte ceramic bottle in soft sage green",
      featured: true,
      status: "active",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 50).toISOString(),
    },
    {
      id: "3",
      slug: "cloud-glass-tumbler",
      name: "Cloud Glass Tumbler",
      tagline: "Sip cloud nine. Every single day.",
      description: "The Cloud Glass Tumbler brings a touch of whimsy.",
      price: 550,
      originalPrice: 700,
      images: [
        {
          url: "https://images.unsplash.com/photo-1544441893-675973e31985?w=900&q=85",
          alt: "Cloud glass tumbler with straw",
        },
      ],
      stock: 12,
      totalSold: 312,
      category: "Tumblers",
      tags: ["glass", "tumbler", "iced coffee"],
      features: ["450ml borosilicate glass", "Pastel silicone lid"],
      metaTitle: "Cloud Glass Tumbler",
      metaDescription: "Aesthetic glass tumbler for iced coffee",
      featured: true,
      status: "active",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 45).toISOString(),
    },
    {
      id: "4",
      slug: "pebble-insulated-bottle",
      name: "Pebble Insulated Bottle",
      tagline: "Smooth. Quiet. Yours.",
      description:
        "The Pebble Insulated Bottle is designed for the minimalist.",
      price: 850,
      originalPrice: 1100,
      images: [
        {
          url: "https://images.unsplash.com/photo-1596952954288-16862d37405b?w=900&q=85",
          alt: "Pebble insulated bottle desert sand",
        },
      ],
      stock: 6,
      totalSold: 145,
      category: "Water Bottles",
      tags: ["insulated", "stainless", "gym"],
      features: ["600ml vacuum insulated", "Powder-coated stainless steel"],
      metaTitle: "Pebble Insulated Bottle",
      metaDescription: "Premium stainless bottle",
      featured: false,
      status: "active",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 40).toISOString(),
    },
    {
      id: "5",
      slug: "sakura-glass-set",
      name: "Sakura Gift Set",
      tagline: "The gift they'll actually use.",
      description: "The Sakura Gift Set is the perfect present.",
      price: 1200,
      originalPrice: 1600,
      images: [
        {
          url: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=900&q=85",
          alt: "Sakura gift set blush pink bottles",
        },
      ],
      stock: 4,
      totalSold: 98,
      category: "Gift Sets",
      tags: ["gift", "set", "pink"],
      features: ["2x 400ml borosilicate bottles", "Premium gift box included"],
      metaTitle: "Sakura Gift Set",
      metaDescription: "Aesthetic bottle gift set",
      featured: true,
      status: "active",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 35).toISOString(),
    },
    {
      id: "6",
      slug: "bamboo-cap-glass-bottle",
      name: "Bamboo Cap Glass Bottle",
      tagline: "Natural. Clean. Intentional.",
      description: "The Bamboo Cap Glass Bottle celebrates natural materials.",
      price: 600,
      originalPrice: 800,
      images: [
        {
          url: "https://images.unsplash.com/photo-1532635241-17e820acc59f?w=900&q=85",
          alt: "Bamboo cap glass bottle natural",
        },
      ],
      stock: 15,
      totalSold: 203,
      category: "Water Bottles",
      tags: ["bamboo", "natural", "eco"],
      features: ["500ml borosilicate glass", "Natural bamboo lid"],
      metaTitle: "Bamboo Cap Glass Bottle",
      metaDescription: "Eco aesthetic bottle",
      featured: false,
      status: "draft",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 25).toISOString(),
    },
  ];
}
