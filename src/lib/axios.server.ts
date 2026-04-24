import axios from "axios";
import { cookies } from "next/headers";

// For Server Components only - DO NOT import this in client components
export const createServerAxios = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api",
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  return axiosInstance;
};

// For Server-side API calls in Route Handlers
export const serverAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});
