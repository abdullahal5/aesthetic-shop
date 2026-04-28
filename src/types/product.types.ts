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
  status: "active" | "draft" | "archived";
  inStock: boolean;
  onSale: boolean;
  discountPercentage: number;
  createdAt: string;
  updatedAt: string;
}

// Request Types
export type TCreateProductRequest = {
  slug: string;
  name: string;
  tagline?: string;
  description?: string;
  price: number;
  originalPrice?: number;
  images: ProductImage[];
  videoUrl?: string;
  stock?: number;
  totalSold?: number;
  category: string;
  tags?: string[];
  features?: string[];
  reviews?: Review[];
  metaTitle?: string;
  metaDescription?: string;
  featured?: boolean;
  status?: "active" | "draft" | "archived";
};

export type TUpdateProductRequest = Partial<TCreateProductRequest>;

export type TProductFilters = {
  category?: string;
  status?: string;
  featured?: boolean;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  tags?: string[];
};

// Stock Update Types
export type TUpdateStockRequest = {
  quantity: number;
  operation: "increase" | "decrease";
};

export type TUpdateStatusRequest = {
  status: "active" | "draft" | "archived";
};

// Review Types
export type TCreateReviewRequest = {
  productId: string;
  name: string;
  rating: number;
  comment: string;
  email?: string;
};

export type TUpdateReviewRequest = Partial<{
  name: string;
  rating: number;
  comment: string;
  verified: boolean;
}>;

// API Response Wrappers (matching your backend's sendResponse)
export type TApiResponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string;
  data: T;
};

// Product specific response types
export type TProductResponse = TApiResponse<Product>;
export type TProductsResponse = TApiResponse<Product[]>;
export type TDeleteProductResponse = TApiResponse<null>;
