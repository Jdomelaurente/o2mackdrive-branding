import { Suspense } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default function DeskLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-[#f7f5f2]">
      <AdminSidebar />
      <div className="px-5 py-8 sm:px-8 sm:py-10 lg:ml-60 lg:px-12 lg:py-12">
        <Suspense fallback={null}>
          <main className="mx-auto max-w-6xl">{children}</main>
        </Suspense>
      </div>
    </div>
  );
}