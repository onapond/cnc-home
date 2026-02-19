"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/", label: "홈" },
  { href: "/products", label: "제품 소개" },
  { href: "/training", label: "교육 컨설팅" },
  { href: "/catering", label: "케이터링" },
  { href: "/b2b", label: "B2B" },
  { href: "/contact", label: "문의" },
] as const;

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-[var(--shadow-md)] h-[70px]"
          : "bg-white h-[80px]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-10 flex items-center justify-between h-full">
        <Link href="/" className="flex items-center gap-1">
          <Image
            src="/images/C&C Logo_T.png"
            alt="(주) 씨앤씨테크 로고"
            width={160}
            height={60}
            className={`w-auto transition-all duration-300 ${
              scrolled ? "h-[50px]" : "h-[60px]"
            }`}
            priority
          />
        </Link>

        <nav>
          <button
            className="md:hidden text-2xl bg-transparent border-none cursor-pointer text-dark-roast p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
          >
            {mobileMenuOpen ? "\u2715" : "\u2630"}
          </button>

          {/* Mobile overlay */}
          {mobileMenuOpen && (
            <div
              className="fixed inset-0 bg-black/30 z-40 md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
          )}

          <ul
            className={`
              md:flex md:flex-row md:gap-6 md:static md:bg-transparent md:p-0 md:shadow-none md:translate-x-0 md:w-auto
              ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"}
              fixed top-0 right-0 h-full w-[280px] bg-white z-50 flex flex-col gap-0 p-0 pt-20 shadow-[-4px_0_20px_rgba(0,0,0,0.1)]
              transition-transform duration-300 ease-in-out md:transition-none
            `}
          >
            {/* Mobile close button */}
            <button
              className="absolute top-5 right-5 text-2xl text-dark-roast md:hidden bg-transparent border-none cursor-pointer"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="메뉴 닫기"
            >
              {"\u2715"}
            </button>

            {NAV_ITEMS.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <li key={item.href} className="list-none">
                  <Link
                    href={item.href}
                    className={`block px-6 py-3 md:px-0 md:py-0 text-base font-medium transition-colors duration-200 ${
                      isActive
                        ? "text-medium-roast md:border-b-2 md:border-medium-roast md:pb-1"
                        : "text-dark-roast hover:text-medium-roast"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
