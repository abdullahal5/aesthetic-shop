/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { authService } from "@/services/auth.service";
import type { TLoginRequest } from "@/types/auth.types";
import { showToast, authToasts } from "@/utils/toast";
import { getCookie, setCookie, deleteCookie } from "@/utils/cookies";

// Query keys
export const authKeys = {
  all: ["auth"] as const,
  adminInfo: () => [...authKeys.all, "admin-info"] as const,
};

// Query: Get admin info - Check cookie instead of localStorage
export const useAdminInfo = () => {
  const isBrowser = typeof window !== "undefined";
  const token = isBrowser ? getCookie("accessToken") : null;

  return useQuery({
    queryKey: authKeys.adminInfo(),
    queryFn: authService.getAdminInfo,
    staleTime: 1000 * 60 * 10,
    // Only enable on client-side when token exists in cookie
    enabled: isBrowser && !!token,
    retry: 1,
  });
};

// Mutation: Login - Store ONLY in cookies
export const useLogin = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (payload: TLoginRequest) => authService.login(payload),
    onSuccess: (data) => {
      if (data.success && data.data) {
        // ✅ Store ONLY in cookies (not localStorage)
        if (data.data.accessToken && data.data.refreshToken) {
          setCookie("accessToken", data.data.accessToken, 1);
          setCookie("refreshToken", data.data.refreshToken, 7);
        }

        // ✅ Store admin info in localStorage (non-sensitive, for UI)
        if (data.data.admin) {
          localStorage.setItem("adminInfo", JSON.stringify(data.data.admin));
        }

        // Show success toast
        showToast.success(
          authToasts.loginSuccess(data.data.admin?.username).title,
          {
            description: authToasts.loginSuccess(data.data.admin?.username)
              .description,
            duration: 3000,
            icon: "🎉",
          },
        );

        queryClient.invalidateQueries({ queryKey: authKeys.adminInfo() });

        setTimeout(() => {
          router.replace("/admin/dashboard");
        }, 500);
      }
    },
    onError: (error: any) => {
      console.error("Login failed:", error);

      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Invalid username or password";

      showToast.error(authToasts.loginError(errorMessage).title, {
        description: authToasts.loginError(errorMessage).description,
        duration: 4000,
      });

      // Clear cookies on error
      deleteCookie("accessToken");
      deleteCookie("refreshToken");
      localStorage.removeItem("adminInfo");
    },
  });
};

// Mutation: Logout - Clear cookies
export const useLogout = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      // ✅ Clear cookies
      deleteCookie("accessToken");
      deleteCookie("refreshToken");
      localStorage.removeItem("adminInfo");

      showToast.success(authToasts.logoutSuccess.title, {
        description: authToasts.logoutSuccess.description,
        duration: 3000,
      });

      queryClient.removeQueries({ queryKey: authKeys.all });
      queryClient.clear();

      setTimeout(() => {
        router.replace("/admin/login");
      }, 500);
    },
    onError: (error: any) => {
      console.error("Logout failed:", error);

      showToast.error(authToasts.logoutError.title, {
        description:
          error?.response?.data?.message || authToasts.logoutError.description,
        duration: 4000,
      });

      // Still clear cookies even if API call fails
      deleteCookie("accessToken");
      deleteCookie("refreshToken");
      localStorage.removeItem("adminInfo");
      queryClient.removeQueries({ queryKey: authKeys.all });

      setTimeout(() => {
        router.replace("/admin/login");
      }, 500);
    },
  });
};
