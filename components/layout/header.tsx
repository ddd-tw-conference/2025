"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { Menu, X } from "lucide-react";
import { getOptimizedImagePath } from "@/lib/image-optimization";
import { useI18n } from "@/contexts/i18n-context";
import { LanguageSelector } from "@/components/language-selector";

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useI18n();
  
  // 檢查是否為首頁的邏輯
  const isHomePage = pathname === "/";

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const navLinks = [
    { href: "/tickets", label: t("nav.tickets") },
    { href: "/agenda", label: t("nav.agenda") },
    { href: "/speakers", label: t("nav.speakers") },
    { href: "/transportation", label: t("nav.transportation") },
    { href: "/rules", label: t("nav.rules") },
    { href: "/about", label: t("nav.about") },
  ];

  return (
    <header className="bg-blue-900/80 backdrop-blur-sm border-blue-700/50 relative z-50 md:fixed md:top-0 md:left-0 md:right-0" role="banner">
      {/* Skip to main content link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-white text-blue-900 px-4 py-2 rounded-md z-[60]"
      >
        {t("nav.skipToMain")}
      </a>
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between" role="navigation" aria-label={t("nav.mainNavigation")}>
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg overflow-hidden relative">
              <Image
                src={getOptimizedImagePath("/images/logos/dddtw-logo.webp")}
                alt="DDD Taiwan Logo"
                className="object-cover"
                fill
                sizes="32px"
              />
            </div>
            <span
              className={clsx(
                "font-semibold text-base lg:text-lg",
                isHomePage ? "text-white" : "text-gray-300"
              )}
            >
              {t("footer.brand")}
            </span>
          </Link>
          <div className="hidden md:flex items-center space-x-4 lg:space-x-8 text-sm lg:text-base">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  "hover:text-white transition-colors whitespace-nowrap",
                  pathname === link.href ? "text-white" : "text-gray-300"
                )}
              >
                {link.label}
              </Link>
            ))}
            <LanguageSelector />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <LanguageSelector />
            <button
              onClick={toggleMenu}
              className="text-white hover:text-gray-300 transition-colors"
              aria-label={t("nav.mobileMenu")}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-blue-900/95 backdrop-blur-sm border-t border-blue-700/50 z-50">
            <nav className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className={clsx(
                    "block py-2 text-base hover:text-white transition-colors",
                    pathname === link.href ? "text-white" : "text-gray-300"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
