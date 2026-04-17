import { DynamicBreadcrumb } from "@/components/shared/DynamicBreadcrumb";
import Footer from "@/components/shared/footer";
import Navbar from "@/components/shared/navbar";
import { ScrollToTop } from "@/components/shared/ScrollToTop";

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <DynamicBreadcrumb />
      <main>{children}</main>
      <Footer />
    </>
  );
}
