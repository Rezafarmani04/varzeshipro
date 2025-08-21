"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import SearchModal from "./SearchModal";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const mainMenu = [
    { label: "خانه", href: "/" },
    { label: "برندها", href: "/brands" },
    {
      label: "محصولات",
      subMenu: [
        { label: "کفش ورزشی", href: "/products/sport-shoes" },
        { label: "پوشاک ورزشی", href: "/products/sport-clothes" },
        { label: "تجهیزات ورزشی", href: "/products/sport-equipment" },
        { label: "توپ‌های ورزشی", href: "/products/sport-balls" },
        { divider: true },
        { label: "همه محصولات", href: "/products", bold: true },
      ],
    },
    { label: "مقالات", href: "/blogs" },
    { label: "درباره ما", href: "/about" },
    { label: "تماس", href: "/contact" },
  ];

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      window.location.href = "/";
    } catch (error) {
      console.error("خطا در خروج:", error);
    }
  };

  const userMenu = [
    { label: "ورود", href: "/login" },
    { label: "ثبت‌نام", href: "/signup" },
    { label: "خروج از حساب", onClick: handleLogout },
    { label: "علاقمندی ها", href: "/favorites" },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-lg py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
            <i className="ri-fire-fill text-white text-xl"></i>
          </div>
          <span
            className={`text-xl font-pacifico transition-colors duration-300 ${
              isScrolled ? "text-gray-900" : "text-white"
            }`}
          >
            ورزشی پرو
          </span>
        </Link>

        <nav className="hidden md:flex items-center space-x-8 space-x-reverse">
          {mainMenu.map((item, index) =>
            item.subMenu ? (
              <div key={index} className="relative group">
                <button
                  onMouseEnter={() => setIsProductsOpen(true)}
                  onMouseLeave={() => setIsProductsOpen(false)}
                  className={`flex items-center space-x-1 space-x-reverse hover:text-orange-500 transition-colors duration-300 ${
                    isScrolled ? "text-gray-900" : "text-white"
                  }`}
                >
                  <span>{item.label}</span>
                  <i className="ri-arrow-down-s-line text-sm"></i>
                </button>

                <div
                  className={`absolute top-full right-0 bg-white shadow-lg rounded-lg py-2 w-48 transition-all duration-300 ${
                    isProductsOpen
                      ? "opacity-100 visible translate-y-0"
                      : "opacity-0 invisible -translate-y-2"
                  }`}
                  onMouseEnter={() => setIsProductsOpen(true)}
                  onMouseLeave={() => setIsProductsOpen(false)}
                >
                  {item.subMenu.map((sub, subIndex) =>
                    sub.divider ? (
                      <hr key={subIndex} className="my-2 border-gray-200" />
                    ) : (
                      <Link
                        key={subIndex}
                        href={sub.href!}
                        className={`block px-4 py-2 text-gray-800 hover:bg-orange-50 hover:text-orange-500 transition-colors duration-200 ${
                          sub.bold ? "font-medium" : ""
                        }`}
                      >
                        {sub.label}
                      </Link>
                    )
                  )}
                </div>
              </div>
            ) : (
              <Link
                key={index}
                href={item.href}
                className={`hover:text-orange-500 transition-colors duration-300 ${
                  isScrolled ? "text-gray-900" : "text-white"
                }`}
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        <div className="flex items-center space-x-4 space-x-reverse">
          <button
            onClick={() => setIsSearchOpen(true)}
            className={`w-10 h-10 flex items-center justify-center rounded-full hover:bg-orange-500 transition-all duration-300 ${
              isScrolled ? "text-gray-900 hover:text-white" : "text-white"
            }`}
          >
            <i className="ri-search-line text-xl"></i>
          </button>

          <button
            className={`w-10 h-10 flex items-center justify-center rounded-full hover:bg-orange-500 transition-all duration-300 relative ${
              isScrolled ? "text-gray-900 hover:text-white" : "text-white"
            }`}
          >
            <Link
              href={"/cart"}
              className="ri-shopping-cart-line text-xl"
            ></Link>
          </button>

          <div className="relative group">
            <button
              className={`w-10 h-10 flex items-center justify-center rounded-full hover:bg-orange-500 transition-all duration-300 ${
                isScrolled ? "text-gray-900 hover:text-white" : "text-white"
              }`}
            >
              <i className="ri-user-line text-xl"></i>
            </button>

            <div className="absolute left-[5px] w-32 bg-white rounded-lg shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-300 z-50">
              <ul className="flex flex-col py-2">
                {userMenu.map((u, i) => (
                  <li key={i}>
                    {u.onClick ? (
                      <button
                        onClick={u.onClick}
                        className="block w-full px-4 py-2 text-center text-sm hover:bg-orange-100 hover:text-orange-400 transition"
                      >
                        {u.label}
                      </button>
                    ) : (
                      <Link
                        href={u.href!}
                        className="block w-full px-4 py-2 text-center text-sm hover:bg-orange-100 hover:text-orange-400 transition"
                      >
                        {u.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden w-10 h-10 flex items-center justify-center rounded-full hover:bg-orange-500 transition-all duration-300 ${
              isScrolled ? "text-gray-900 hover:text-white" : "text-white"
            }`}
          >
            <i
              className={`text-xl ${
                isMenuOpen ? "ri-close-line" : "ri-menu-line"
              }`}
            ></i>
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg rounded-b-2xl overflow-hidden transform transition-all duration-300 animate-slideDown">
          <nav className="flex flex-col space-y-1 px-4 py-3">
            {mainMenu.map((item, index) =>
              item.subMenu ? (
                <div key={index} className="bg-orange-50 rounded-lg p-3">
                  <span className="text-gray-900 font-bold flex items-center gap-2 mb-2">
                    <i className="ri-grid-fill text-orange-500"></i>
                    {item.label}
                  </span>
                  <div className="space-y-2">
                    {item.subMenu
                      .filter((sub) => !sub.divider)
                      .map((sub, i) => (
                        <Link
                          key={i}
                          href={sub.href!}
                          className="block pl-6 text-gray-700 hover:text-orange-500 transition-colors duration-300"
                        >
                          {sub.label}
                        </Link>
                      ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={index}
                  href={item.href}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-orange-50 hover:text-orange-500 transition-colors duration-300"
                >
                  <i className="ri-arrow-left-s-line text-gray-400"></i>
                  <span>{item.label}</span>
                </Link>
              )
            )}
          </nav>
        </div>
      )}

      {isSearchOpen && <SearchModal onClose={() => setIsSearchOpen(false)} />}
    </header>
  );
}
