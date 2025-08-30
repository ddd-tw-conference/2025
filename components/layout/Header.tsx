"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { Menu, X } from "lucide-react";
import { getImagePath } from "@/lib/paths";

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // 檢查是否為首頁的邏輯
  const isHomePage = pathname === "/";

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const navLinks = [
    { href: "/tickets", label: "購票" },
    { href: "/agenda", label: "議程資訊" },
    { href: "/speakers", label: "講者資訊" },
    { href: "/transportation", label: "交通資訊" },
    { href: "/rules", label: "大會守則" },
    { href: "/about", label: "關於我們" },
  ];

  return (
    <header className="bg-blue-900/80 backdrop-blur-sm border-blue-700/50 relative z-50" role="banner">
      {/* Skip to main content link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-white text-blue-900 px-4 py-2 rounded-md z-[60]"
      >
        跳至主要內容
      </a>
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between" role="navigation" aria-label="主要導航">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg overflow-hidden relative">
              <Image
                src={getImagePath("/DDDTW-logo.png")}
                alt="DDD Taiwan Logo"
                className="object-cover"
                fill
                sizes="32px"
              />
            </div>
            <span
              className={clsx(
                "font-semibold text-lg",
                isHomePage ? "text-white" : "text-gray-300"
              )}
            >
              DDDesign TW
            </span>
          </Link>
          <div className="hidden md:flex items-center space-x-8 text-base">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  "hover:text-white transition-colors",
                  pathname === link.href ? "text-white" : "text-gray-300"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-white hover:text-gray-300 transition-colors"
            aria-label="切換導航選單"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
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
