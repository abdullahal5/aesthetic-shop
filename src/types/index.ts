export interface Review {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

export interface ProductImage {
  url: string;
  alt: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: ProductImage[];
  videoUrl?: string;
  stock: number;
  totalSold: number;
  category: string;
  tags: string[];
  features: string[];
  reviews: Review[];
  metaTitle: string;
  metaDescription: string;
  featured: boolean;
}

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  slug: string;
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
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  address: string;
  district: string;
  items: CartItem[];
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
