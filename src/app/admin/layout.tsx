"use client";

import { usePathname } from "next/navigation";
import { AdminSidebar } from "@/components/features/AdminSidebar";
import { useAdminAuth } from "@/hooks/useAdminAuth";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";
  const { isAuthenticated, isLoading } = useAdminAuth();

  // Login page shows without sidebar/auth
  if (isLoginPage) {
    return <div className="min-h-screen bg-warm-bg">{children}</div>;
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-warm-bg flex items-center justify-center">
        <p className="text-gray-500">로딩 중...</p>
      </div>
    );
  }

  // Not authenticated → useAdminAuth will redirect
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-warm-bg">
      <AdminSidebar />
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
