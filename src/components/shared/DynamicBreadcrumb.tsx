// components/shared/DynamicBreadcrumb.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

export const DynamicBreadcrumb = () => {
  const pathname = usePathname();
  const [breadcrumbs, setBreadcrumbs] = useState<
    Array<{ name: string; href: string }>
  >([]);

  // Custom path mapping for better breadcrumb names
  const getCustomPath = (path: string): string[] => {
    // Special handling for checkout - add Shop as parent
    if (path === "/checkout") {
      return ["shop", "checkout"];
    }
    return path.split("/").filter((segment) => segment !== "");
  };

  // Custom name mapping
  const getCustomName = (segment: string): string => {
    const nameMap: Record<string, string> = {
      shop: "Shop",
      checkout: "Checkout",
      cart: "Cart",
      products: "Products",
      categories: "Categories",
      account: "My Account",
      wishlist: "Wishlist",
    };
    return nameMap[segment] || segment;
  };

  useEffect(() => {
    const generateBreadcrumbs = () => {
      // Remove trailing slash if exists
      const path =
        pathname.endsWith("/") && pathname !== "/"
          ? pathname.slice(0, -1)
          : pathname;

      // Get custom path segments (adds Shop before Checkout)
      const segments = getCustomPath(path);

      // Build breadcrumb array
      const breadcrumbItems = segments.map((segment, index) => {
        let href = "/" + segments.slice(0, index + 1).join("/");

        // Fix href for checkout (should be /checkout, not /shop/checkout)
        if (segment === "checkout") {
          href = "/checkout";
        }

        // Format the segment name
        const name = getCustomName(segment);

        return { name, href };
      });

      setBreadcrumbs(breadcrumbItems);
    };

    generateBreadcrumbs();
  }, [pathname]);

  // Don't show breadcrumbs on homepage
  if (pathname === "/") return null;

  return (
    <div className="max-w-6xl mx-auto px-4 py-3 md:py-4">
      <nav
        className="flex items-center gap-1.5 text-xs overflow-x-auto"
        style={{ color: "#8B7B70" }}
      >
        {/* Home link */}
        <Link
          href="/"
          className="hover:text-stone-900 transition-colors whitespace-nowrap"
        >
          Home
        </Link>

        {/* Map through breadcrumbs */}
        {breadcrumbs.map((crumb, index) => (
          <div key={crumb.href} className="flex items-center gap-1.5">
            <ChevronRight size={12} className="shrink-0" />

            {index === breadcrumbs.length - 1 ? (
              /* Current page - not a link */
              <span
                className="font-medium truncate"
                style={{ color: "var(--brand-dark)" }}
              >
                {crumb.name}
              </span>
            ) : (
              /* Previous pages - clickable links */
              <Link
                href={crumb.href}
                className="hover:text-stone-900 transition-colors whitespace-nowrap"
              >
                {crumb.name}
              </Link>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
};
