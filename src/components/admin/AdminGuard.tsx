"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getCookie } from "@/utils/cookies";

export default function AdminAuthGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [checking, setChecking] = useState(true);
  const hasRedirected = useRef(false);

  useEffect(() => {
    let isMounted = true;

    const checkAuth = async () => {
      // Check if we're on login page or if there's an error param
      const hasError = new URLSearchParams(window.location.search).has("error");

      // Only check token existence, don't verify
      const token = getCookie("accessToken");
      const adminInfo = localStorage.getItem("adminInfo");
      let isValidAdmin = false;

      if (token && adminInfo) {
        try {
          const user = JSON.parse(adminInfo);
          isValidAdmin = user.role === "admin" || user.role === "super-admin";
        } catch (e) {
          console.error("Error parsing admin info:", e);
        }
      }

      // Don't redirect if there's an error parameter or already redirected
      if (hasError || hasRedirected.current) {
        if (isMounted) {
          setChecking(false);
        }
        return;
      }

      // Only handle login page redirects, let middleware handle others
      if (pathname === "/admin/login") {
        if (isValidAdmin && !hasRedirected.current) {
          hasRedirected.current = true;
          router.replace("/admin/dashboard");
        } else if (isMounted) {
          setChecking(false);
        }
      } else {
        // For other admin routes, let middleware handle protection
        if (isMounted) {
          setChecking(false);
        }
      }
    };

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, [pathname, router]);

  if (checking) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "var(--brand-cream)" }}
      >
        <div className="flex flex-col items-center gap-3">
          <div
            className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
            style={{
              borderColor: "var(--brand-earth)",
              borderTopColor: "transparent",
            }}
          />
          <p className="text-sm text-stone-400">Loading...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
