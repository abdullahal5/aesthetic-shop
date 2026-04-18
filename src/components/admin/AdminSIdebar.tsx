"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Tag,
  Image,
  LogOut,
  Sparkles,
  Menu,
  X,
} from "lucide-react";
import { useState, useEffect } from "react";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/dashboard/products", label: "Products", icon: Package },
  { href: "/admin/dashboard/orders", label: "Orders", icon: ShoppingBag },
  { href: "/admin/dashboard/discounts", label: "Discounts", icon: Tag },
  { href: "/admin/dashboard/banners", label: "Banners", icon: Image },
];

// Move SidebarContent outside of the main component
function SidebarContent({ onItemClick }: { onItemClick?: () => void }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const { logoutAdmin } = await import("@/lib/admin/adminAuth");
      await logoutAdmin();
      router.push("/admin/login");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div
        className="flex items-center gap-2.5 px-5 py-5 border-b"
        style={{ borderColor: "rgba(255,255,255,0.08)" }}
      >
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
          style={{ backgroundColor: "var(--brand-amber)" }}
        >
          <Sparkles size={15} className="text-white" />
        </div>
        <div>
          <Link href="/admin/dashboard" onClick={onItemClick}>
            <span className="text-white font-bold text-base leading-none">
              AuraStore
            </span>
          </Link>
          <p className="text-xs mt-0.5" style={{ color: "#A89888" }}>
            Admin Panel
          </p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive =
            pathname === href || pathname?.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              onClick={onItemClick}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "text-white"
                  : "text-stone-400 hover:text-white hover:bg-white/5"
              }`}
              style={isActive ? { backgroundColor: "var(--brand-earth)" } : {}}
            >
              <Icon size={17} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div
        className="px-3 pb-5 border-t pt-4"
        style={{ borderColor: "rgba(255,255,255,0.08)" }}
      >
        <button
          onClick={() => {
            handleLogout();
            onItemClick?.();
          }}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-stone-400 hover:text-red-400 hover:bg-red-400/10 transition-all duration-200"
        >
          <LogOut size={17} />
          Sign Out
        </button>
      </div>
    </div>
  );
}

// Mobile Drawer Component
function MobileDrawer({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen) return null;

  return (
    <div className="lg:hidden fixed inset-0 z-40">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className="absolute top-0 left-0 w-64 h-full shadow-xl animate-in slide-in-from-left duration-300"
        style={{ backgroundColor: "var(--brand-dark)" }}
      >
        <SidebarContent onItemClick={onClose} />
      </div>
    </div>
  );
}

export default function AdminSidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close mobile menu when route changes
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMobileOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileOpen]);

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className="hidden lg:flex flex-col w-64 shrink-0 h-screen sticky top-0"
        style={{ backgroundColor: "var(--brand-dark)" }}
      >
        <SidebarContent />
      </aside>

      {/* Mobile Header */}
      <div
        className="lg:hidden fixed top-0 left-0 right-0 flex items-center justify-between px-4 py-3 border-b z-50"
        style={{
          backgroundColor: "var(--brand-dark)",
          borderColor: "rgba(255,255,255,0.08)",
        }}
      >
        <Link href="/admin/dashboard" className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: "var(--brand-amber)" }}
          >
            <Sparkles size={13} className="text-white" />
          </div>
          <span className="text-white font-bold text-sm">AuraStore Admin</span>
        </Link>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-stone-400 hover:text-white p-2 rounded-lg hover:bg-white/5 transition-all"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <MobileDrawer isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

      {/* Spacer for mobile header */}
      <div className="lg:hidden h-[57px]" />
    </>
  );
}
