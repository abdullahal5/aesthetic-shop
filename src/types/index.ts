export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  videoUrl?: string;
  stock: number;
  reviews: Review[];
  metaTitle: string;
  metaDescription: string;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  avatar?: string;
}

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface OrderForm {
  name: string;
  phone: string;
  address: string;
  district: string;
  note?: string;
  paymentMethod: "cod" | "bkash";
}
