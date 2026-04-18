"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { isAdminLoggedIn } from "@/lib/admin/adminAuth";

export default function AdminAuthGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const loggedIn = isAdminLoggedIn();
    if (!loggedIn && pathname !== "/admin/login") {
      router.replace("/admin/login");
    } else if (loggedIn && pathname === "/admin/login") {
      router.replace("/admin/dashboard");
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setChecking(false);
    }
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
