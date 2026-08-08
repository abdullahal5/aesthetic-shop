import { axiosClient } from "@/lib/axios.client";
import type {
  TProductResponse,
  TProductsResponse,
  TDeleteProductResponse,
  TCreateProductRequest,
  TUpdateProductRequest,
  TProductFilters,
  TUpdateStockRequest,
  TUpdateStatusRequest,
  TCreateReviewRequest,
  TUpdateReviewRequest,
} from "@/types/product.types";

export const productService = {
  // Create product
  createProduct: async (
    payload: TCreateProductRequest,
  ): Promise<TProductResponse> => {
    const { data } = await axiosClient.post<TProductResponse>(
      "/products",
      payload,
    );
    return data;
  },

  // Get all products with filters
  getAllProducts: async (
    filters?: TProductFilters,
  ): Promise<TProductsResponse> => {
    const { data } = await axiosClient.get<TProductsResponse>(
      "/products",
      { params: filters },
    );
    return data;
  },

  // Get single product by ID or slug
  getProduct: async (identifier: string): Promise<TProductResponse> => {
    const { data } = await axiosClient.get<TProductResponse>(
      `/products/${identifier}`,
    );
    return data;
  },

  // Update product
  updateProduct: async (
    id: string,
    payload: TUpdateProductRequest,
  ): Promise<TProductResponse> => {
    const { data } = await axiosClient.patch<TProductResponse>(
      `/products/${id}`,
      payload,
    );
    return data;
  },

  // Delete product
  deleteProduct: async (id: string): Promise<TDeleteProductResponse> => {
    const { data } = await axiosClient.delete<TDeleteProductResponse>(
      `/products/${id}`,
    );
    return data;
  },

  // Update stock
  updateStock: async (
    id: string,
    payload: TUpdateStockRequest,
  ): Promise<TProductResponse> => {
    const { data } = await axiosClient.patch<TProductResponse>(
      `/products/${id}/stock`,
      payload,
    );
    return data;
  },

  // Update product status
  updateStatus: async (
    id: string,
    payload: TUpdateStatusRequest,
  ): Promise<TProductResponse> => {
    const { data } = await axiosClient.patch<TProductResponse>(
      `/products/${id}/status`,
      payload,
    );
    return data;
  },

  // Add review to product
  addReview: async (
    payload: TCreateReviewRequest,
  ): Promise<TProductResponse> => {
    const { data } = await axiosClient.post<TProductResponse>(
      `/products/${payload.productId}/reviews`,
      payload,
    );
    return data;
  },

  // Update review
  updateReview: async (
    productId: string,
    reviewId: string,
    payload: TUpdateReviewRequest,
  ): Promise<TProductResponse> => {
    const { data } = await axiosClient.patch<TProductResponse>(
      `/products/${productId}/reviews/${reviewId}`,
      payload,
    );
    return data;
  },

  // Delete review
  deleteReview: async (
    productId: string,
    reviewId: string,
  ): Promise<TDeleteProductResponse> => {
    const { data } = await axiosClient.delete<TDeleteProductResponse>(
      `/products/${productId}/reviews/${reviewId}`,
    );
    return data;
  },

  // Get featured products
  getFeaturedProducts: async (limit?: number): Promise<TProductsResponse> => {
    const { data } = await axiosClient.get<TProductsResponse>(
      "/products/featured",
      { params: { limit } },
    );
    return data;
  },

  // Get products by category
  getProductsByCategory: async (
    category: string,
  ): Promise<TProductsResponse> => {
    const { data } = await axiosClient.get<TProductsResponse>(
      `/products/category/${category}`,
    );
    return data;
  },
};
