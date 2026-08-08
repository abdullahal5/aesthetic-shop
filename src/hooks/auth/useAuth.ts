/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

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

// -------------------------
// GET ADMIN INFO
// -------------------------
export const useAdminInfo = () => {

  const isBrowser = typeof window !== "undefined";
  const token = isBrowser ? getCookie("accessToken") : null;

  return useQuery({
    queryKey: authKeys.adminInfo(),
    queryFn: authService.getAdminInfo,
    staleTime: 1000 * 60 * 10,
    enabled: isBrowser && !!token,
    retry: 1,
  });
};

// -------------------------
// LOGIN
// -------------------------
export const useLogin = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (payload: TLoginRequest) => authService.login(payload),

    onSuccess: (data) => {
      if (!data.success || !data.data) return;

      const { accessToken, refreshToken, admin } = data.data;

      // ✅ Secure tokens in cookies
      if (accessToken) setCookie("accessToken", accessToken, 1);
      if (refreshToken) setCookie("refreshToken", refreshToken, 7);

      // ✅ UI-only data in localStorage
      if (typeof window !== "undefined" && admin) {
        localStorage.setItem("adminInfo", JSON.stringify(admin));
      }

      showToast.success(authToasts.loginSuccess(admin?.username).title, {
        description: authToasts.loginSuccess(admin?.username).description,
        duration: 3000,
        icon: "🎉",
      });

      queryClient.invalidateQueries({
        queryKey: authKeys.adminInfo(),
      });

      setTimeout(() => {
        router.replace("/admin/dashboard");
      }, 400);
    },

    onError: (error: any) => {
      console.error("Login failed:", error);

      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Invalid credentials";

      showToast.error(authToasts.loginError(message).title, {
        description: authToasts.loginError(message).description,
        duration: 4000,
      });

      // Cleanup
      deleteCookie("accessToken");
      deleteCookie("refreshToken");

      if (typeof window !== "undefined") {
        localStorage.removeItem("adminInfo");
      }
    },
  });
};

// -------------------------
// LOGOUT
// -------------------------
export const useLogout = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: authService.logout,

    onSuccess: () => {
      // Clear auth state
      deleteCookie("accessToken");
      deleteCookie("refreshToken");

      if (typeof window !== "undefined") {
        localStorage.removeItem("adminInfo");
      }

      queryClient.removeQueries({ queryKey: authKeys.all });
      queryClient.clear();

      showToast.success(authToasts.logoutSuccess.title, {
        description: authToasts.logoutSuccess.description,
        duration: 3000,
      });

      setTimeout(() => {
        router.replace("/admin/login");
      }, 400);
    },

    onError: (error: any) => {
      console.error("Logout failed:", error);

      // Still force cleanup (important)
      deleteCookie("accessToken");
      deleteCookie("refreshToken");

      if (typeof window !== "undefined") {
        localStorage.removeItem("adminInfo");
      }

      queryClient.removeQueries({ queryKey: authKeys.all });
      queryClient.clear();

      showToast.error(authToasts.logoutError.title, {
        description:
          error?.response?.data?.message || authToasts.logoutError.description,
        duration: 4000,
      });

      setTimeout(() => {
        router.replace("/admin/login");
      }, 400);
    },
  });
};
