/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Sparkles, Lock, User } from "lucide-react";
import { useLogin } from "@/hooks/auth/useAuth";
import type { TLoginRequest } from "@/types/auth.types";
import { setAuthCookies, getCookie, clearAuthCookies } from "@/utils/cookies";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  const loginMutation = useLogin();

  // Check if already logged in (using cookies instead of localStorage)
  useEffect(() => {
    const token = getCookie("accessToken");
    if (token) {
      router.replace("/admin/dashboard");
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const credentials: TLoginRequest = {
      username,
      password,
    };

    try {
      const response = await loginMutation.mutateAsync(credentials);
      console.log("Login successful:", response);

      // Store tokens in cookies
      if (response.data?.accessToken && response.data?.refreshToken) {
        setAuthCookies(response.data.accessToken, response.data.refreshToken);
        console.log("✅ Tokens stored in cookies");
      }

      // Store admin info in localStorage (for UI state, not security-critical)
      if (response.data?.admin) {
        localStorage.setItem("adminInfo", JSON.stringify(response.data.admin));
      }

      // Redirect to dashboard
      router.replace("/admin/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      // Clear any existing cookies on failed login
      clearAuthCookies();
    }
  };

  const isLoading = loginMutation.isPending;
  const errorMessage = loginMutation.isError
    ? (loginMutation.error as any)?.response?.data?.message ||
      "Invalid username or password"
    : "";

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: "var(--brand-dark)" }}
    >
      {/* Rest of your JSX remains the same */}
      <div className="relative w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 shadow-xl"
            style={{ backgroundColor: "var(--brand-amber)" }}
          >
            <Sparkles size={26} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">AuraStore</h1>
          <p className="text-sm mt-1" style={{ color: "#A89888" }}>
            Admin Dashboard
          </p>
        </div>

        <div
          className="rounded-2xl p-7 border"
          style={{
            backgroundColor: "rgba(255,255,255,0.05)",
            borderColor: "rgba(255,255,255,0.08)",
            backdropFilter: "blur(12px)",
          }}
        >
          <h2 className="text-lg font-semibold text-white mb-6">Sign In</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label
                className="text-xs font-medium"
                style={{ color: "#A89888" }}
              >
                Username
              </label>
              <div className="relative">
                <User
                  size={15}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                  style={{ color: "#A89888" }}
                />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    if (loginMutation.isError) loginMutation.reset();
                  }}
                  placeholder="admin"
                  autoComplete="username"
                  required
                  className="w-full h-11 pl-10 pr-4 rounded-xl text-sm text-white outline-none transition-all focus:ring-2"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.07)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "var(--brand-amber)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "rgba(255,255,255,0.1)";
                  }}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label
                className="text-xs font-medium"
                style={{ color: "#A89888" }}
              >
                Password
              </label>
              <div className="relative">
                <Lock
                  size={15}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                  style={{ color: "#A89888" }}
                />
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (loginMutation.isError) loginMutation.reset();
                  }}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  required
                  className="w-full h-11 pl-10 pr-11 rounded-xl text-sm text-white outline-none transition-all"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.07)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "var(--brand-amber)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "rgba(255,255,255,0.1)";
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors"
                  style={{ color: "#A89888" }}
                >
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {errorMessage && (
              <div
                className="px-4 py-2.5 rounded-xl text-xs font-medium"
                style={{
                  backgroundColor: "rgba(239,68,68,0.15)",
                  color: "#f87171",
                }}
              >
                {errorMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-60 mt-2"
              style={{ backgroundColor: "var(--brand-earth)" }}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <span
                    className="w-4 h-4 border-2 border-t-transparent rounded-full animate-spin"
                    style={{
                      borderColor: "white",
                      borderTopColor: "transparent",
                    }}
                  />
                  Signing in...
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <div
            className="mt-5 pt-5 border-t text-center"
            style={{ borderColor: "rgba(255,255,255,0.08)" }}
          >
            <p className="text-xs" style={{ color: "#6B5744" }}>
              Demo: <span style={{ color: "#A89888" }}>admin</span> /{" "}
              <span style={{ color: "#A89888" }}>aura2024</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
