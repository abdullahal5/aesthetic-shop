/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type {
  TCreateProductRequest,
  TUpdateProductRequest,
  TProductFilters,
  TUpdateStockRequest,
  TUpdateStatusRequest,
  TCreateReviewRequest,
  TUpdateReviewRequest,
  Product,
} from "@/types/product.types";
import { showToast } from "@/utils/toast";
import { productService } from "@/services/product.service";

// Query keys
export const productKeys = {
  all: ["products"] as const,
  lists: () => [...productKeys.all, "list"] as const,
  list: (filters?: TProductFilters) =>
    [...productKeys.lists(), { filters }] as const,
  details: () => [...productKeys.all, "detail"] as const,
  detail: (identifier: string) =>
    [...productKeys.details(), identifier] as const,
  featured: () => [...productKeys.all, "featured"] as const,
  category: (category: string) =>
    [...productKeys.all, "category", category] as const,
};

// Query: Get all products
export const useProducts = (
  filters?: TProductFilters,
  initialData?: Product[],
) => {
  return useQuery({
    queryKey: productKeys.list(filters),
    queryFn: () => productService.getAllProducts(filters),
    select: (response) => response.data,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnMount: !initialData, // Don't refetch if we have initial data
    initialData: initialData
      ? {
          statusCode: 200,
          success: true,
          data: initialData,
        }
      : undefined,
    placeholderData: initialData
      ? {
          statusCode: 200,
          success: true,
          data: initialData,
        }
      : undefined,
  });
};

// Query: Get single product
export const useProduct = (identifier: string) => {
  return useQuery({
    queryKey: productKeys.detail(identifier),
    queryFn: () => productService.getProduct(identifier),
    select: (response) => response.data,
    enabled: !!identifier,
    staleTime: 1000 * 60 * 5,
  });
};

// Query: Get featured products
export const useFeaturedProducts = (limit?: number) => {
  return useQuery({
    queryKey: productKeys.featured(),
    queryFn: () => productService.getFeaturedProducts(limit),
    select: (response) => response.data,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};

// Query: Get products by category
export const useProductsByCategory = (category: string) => {
  return useQuery({
    queryKey: productKeys.category(category),
    queryFn: () => productService.getProductsByCategory(category),
    select: (response) => response.data,
    enabled: !!category,
    staleTime: 1000 * 60 * 5,
  });
};

// Mutation: Create product
export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: TCreateProductRequest) =>
      productService.createProduct(payload),
    onSuccess: (response) => {
      if (response.success && response.data) {
        showToast.success(
          `Product "${response.data.name}" created successfully!`,
          {
            duration: 3000,
            icon: "✅",
          },
        );

        queryClient.invalidateQueries({ queryKey: productKeys.lists() });
      }
    },
    onError: (error: any) => {
      console.error("Create product failed:", error);

      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to create product";

      showToast.error(errorMessage, {
        duration: 4000,
      });
    },
  });
};

// Mutation: Update product
export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: TUpdateProductRequest;
    }) => productService.updateProduct(id, payload),
    onSuccess: (response, variables) => {
      if (response.success && response.data) {
        showToast.success(
          `Product "${response.data.name}" updated successfully!`,
          {
            duration: 3000,
            icon: "✏️",
          },
        );

        queryClient.invalidateQueries({ queryKey: productKeys.lists() });
        queryClient.invalidateQueries({
          queryKey: productKeys.detail(variables.id),
        });
      }
    },
    onError: (error: any) => {
      console.error("Update product failed:", error);

      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to update product";

      showToast.error(errorMessage, {
        duration: 4000,
      });
    },
  });
};

// Mutation: Delete product
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => productService.deleteProduct(id),
    onSuccess: (response, id) => {
      if (response.success) {
        showToast.success("Product deleted successfully!", {
          duration: 3000,
          icon: "🗑️",
        });

        queryClient.invalidateQueries({ queryKey: productKeys.lists() });
        queryClient.removeQueries({ queryKey: productKeys.detail(id) });
      }
    },
    onError: (error: any) => {
      console.error("Delete product failed:", error);

      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to delete product";

      showToast.error(errorMessage, {
        duration: 4000,
      });
    },
  });
};

// Mutation: Update stock
export const useUpdateStock = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: TUpdateStockRequest;
    }) => productService.updateStock(id, payload),
    onSuccess: (response, variables) => {
      if (response.success && response.data) {
        showToast.success(
          `Stock updated successfully! New stock: ${response.data.stock}`,
          {
            duration: 3000,
            icon: "📦",
          },
        );

        queryClient.invalidateQueries({ queryKey: productKeys.lists() });
        queryClient.invalidateQueries({
          queryKey: productKeys.detail(variables.id),
        });
      }
    },
    onError: (error: any) => {
      console.error("Update stock failed:", error);

      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to update stock";

      showToast.error(errorMessage, {
        duration: 4000,
      });
    },
  });
};

// Mutation: Update product status
export const useUpdateProductStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: TUpdateStatusRequest;
    }) => productService.updateStatus(id, payload),
    onSuccess: (response, variables) => {
      if (response.success && response.data) {
        const statusText = response.data.status;
        showToast.success(`Product status changed to ${statusText}!`, {
          duration: 3000,
          icon: "🔄",
        });

        queryClient.invalidateQueries({ queryKey: productKeys.lists() });
        queryClient.invalidateQueries({
          queryKey: productKeys.detail(variables.id),
        });
      }
    },
    onError: (error: any) => {
      console.error("Update status failed:", error);

      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to update product status";

      showToast.error(errorMessage, {
        duration: 4000,
      });
    },
  });
};

// Mutation: Add review
export const useAddReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: TCreateReviewRequest) =>
      productService.addReview(payload),
    onSuccess: (response, variables) => {
      if (response.success && response.data) {
        showToast.success(
          "Review added successfully! Thank you for your feedback.",
          {
            duration: 3000,
            icon: "⭐",
          },
        );

        queryClient.invalidateQueries({
          queryKey: productKeys.detail(variables.productId),
        });
      }
    },
    onError: (error: any) => {
      console.error("Add review failed:", error);

      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to add review";

      showToast.error(errorMessage, {
        duration: 4000,
      });
    },
  });
};

// Mutation: Update review
export const useUpdateReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      productId,
      reviewId,
      payload,
    }: {
      productId: string;
      reviewId: string;
      payload: TUpdateReviewRequest;
    }) => productService.updateReview(productId, reviewId, payload),
    onSuccess: (response, variables) => {
      if (response.success && response.data) {
        showToast.success("Review updated successfully!", {
          duration: 3000,
          icon: "✏️",
        });

        queryClient.invalidateQueries({
          queryKey: productKeys.detail(variables.productId),
        });
      }
    },
    onError: (error: any) => {
      console.error("Update review failed:", error);

      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to update review";

      showToast.error(errorMessage, {
        duration: 4000,
      });
    },
  });
};

// Mutation: Delete review
export const useDeleteReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      productId,
      reviewId,
    }: {
      productId: string;
      reviewId: string;
    }) => productService.deleteReview(productId, reviewId),
    onSuccess: (response, variables) => {
      if (response.success) {
        showToast.success("Review deleted successfully!", {
          duration: 3000,
          icon: "🗑️",
        });

        queryClient.invalidateQueries({
          queryKey: productKeys.detail(variables.productId),
        });
      }
    },
    onError: (error: any) => {
      console.error("Delete review failed:", error);

      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to delete review";

      showToast.error(errorMessage, {
        duration: 4000,
      });
    },
  });
};
