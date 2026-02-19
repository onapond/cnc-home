"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/stores/auth-store";

const NAV_ITEMS = [
  { href: "/admin", label: "대시보드", icon: "grid" },
  { href: "/admin/inquiries", label: "문의 관리", icon: "inbox" },
];

const ICONS: Record<string, React.ReactNode> = {
  grid: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
    </svg>
  ),
  inbox: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
      <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
    </svg>
  ),
};

export function AdminSidebar() {
  const pathname = usePathname();
  const { logout } = useAuthStore();

  return (
    <aside className="w-[240px] bg-dark-roast min-h-screen flex flex-col shrink-0">
      <div className="p-5 border-b border-medium-roast/30">
        <h1 className="text-cream text-lg font-bold">C&C Admin</h1>
        <p className="text-cream/50 text-xs mt-1">관리자 패널</p>
      </div>

      <nav className="flex-1 py-4">
        {NAV_ITEMS.map((item) => {
          const isActive =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-5 py-3 text-sm transition-colors duration-200 ${
                isActive
                  ? "bg-medium-roast/30 text-cream border-r-3 border-light-roast"
                  : "text-cream/70 hover:bg-medium-roast/20 hover:text-cream"
              }`}
            >
              {ICONS[item.icon]}
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-5 border-t border-medium-roast/30">
        <button
          onClick={() => {
            logout();
            window.location.href = "/admin/login";
          }}
          className="flex items-center gap-3 text-cream/60 hover:text-cream text-sm transition-colors cursor-pointer bg-transparent border-none w-full"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          로그아웃
        </button>
      </div>
    </aside>
  );
}
