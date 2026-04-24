/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { setCookie, deleteCookie, getCookie } from "@/utils/cookies";

// For Client Components
export const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

// Client-side request interceptor
axiosClient.interceptors.request.use(
  async (config) => {
    // Get token from cookie
    const token = getCookie("accessToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Client-side response interceptor with token refresh
let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve();
    }
  });
  failedQueue = [];
};

axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Prevent infinite loops
    if (originalRequest.url?.includes("/auth/refresh-token")) {
      // Refresh token failed, redirect to login
      deleteCookie("accessToken");
      deleteCookie("refreshToken");
      localStorage.removeItem("adminInfo");
      window.location.href = "/admin/login";
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => axiosClient(originalRequest))
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = getCookie("refreshToken");

        if (!refreshToken) {
          throw new Error("No refresh token available");
        }

        // Call refresh token endpoint
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api"}/auth/refresh-token`,
          { refreshToken },
          { withCredentials: true },
        );

        if (response.data.success && response.data.data?.accessToken) {
          // ✅ Store the new access token in cookie
          const newAccessToken = response.data.data.accessToken;
          setCookie("accessToken", newAccessToken, 1);

          console.log("Token refreshed successfully");

          // Update the authorization header
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

          processQueue();
          return axiosClient(originalRequest);
        } else {
          throw new Error("Refresh failed");
        }
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        processQueue(refreshError);

        // Clear all auth data
        deleteCookie("accessToken");
        deleteCookie("refreshToken");
        localStorage.removeItem("adminInfo");

        // Redirect to login
        window.location.href = "/admin/login?error=session_expired";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export default axiosClient;
