import AdminAuthGuard from "@/components/admin/AdminGuard";
import AdminSidebar from "@/components/admin/AdminSIdebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminAuthGuard>
      <div className="flex min-h-screen" style={{ backgroundColor: "#F7F4F0" }}>
        <AdminSidebar />
        <main className="flex-1 min-w-0 overflow-x-hidden">{children}</main>
      </div>
    </AdminAuthGuard>
  );
}
