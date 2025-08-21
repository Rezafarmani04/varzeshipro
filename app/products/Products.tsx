"use client";

import { useEffect, useState } from "react";
import Header from "../_components/Header";
import Footer from "../_components/Footer";
import OrangeButton from "../_components/OrangeButton";
import Link from "next/link";
import { useFavorites } from "../hooks/useFavorites";
import ProductSkeleton from "../_components/ProductSkeleton";

const categories = [
  { id: "all", name: "همه محصولات", icon: "ri-apps-line" },
  { id: "shoes", name: "کفش ورزشی", icon: "ri-walk-line" },
  { id: "clothes", name: "پوشاک ورزشی", icon: "ri-shirt-line" },
  { id: "equipment", name: "تجهیزات ورزشی", icon: "ri-fitness-line" },
  { id: "balls", name: "توپ‌های ورزشی", icon: "ri-basketball-line" },
];

export default function Products() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy, setSortBy] = useState("popular");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const { isLoggedIn, favorites, toggleFavorite } = useFavorites();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `/api/products?page=${page}&limit=8&category=${activeCategory}&sortBy=${sortBy}`
        );
        if (!res.ok) throw new Error("مشکلی در دریافت محصولات رخ داد");
        const data = await res.json();
        setProducts(data.products);
        setTotalPages(data.totalPages);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page, activeCategory, sortBy]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <section className="pt-24 pb-16 bg-gradient-to-br from-orange-500 to-red-600">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h1 className="text-5xl font-bold mb-6">محصولات ورزشی</h1>
            <p className="text-xl opacity-90">
              بهترین محصولات ورزشی با کیفیت بالا
            </p>
            <div className="flex justify-center mt-8 space-x-4 space-x-reverse">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <i className="ri-football-line text-2xl"></i>
              </div>
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <i className="ri-heart-pulse-line text-2xl"></i>
              </div>
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <i className="ri-t-shirt-line text-2xl"></i>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-4 mb-8">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  setActiveCategory(category.id);
                  setPage(1);
                }}
                className={`px-6 py-3 rounded-full flex items-center space-x-2 space-x-reverse whitespace-nowrap transition-all duration-300 ${
                  activeCategory === category.id
                    ? "bg-orange-500 text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-orange-50 border border-gray-200"
                }`}
              >
                <i className={`${category.icon} text-lg`}></i>
                <span>{category.name}</span>
              </button>
            ))}
          </div>

          <div className="flex justify-between items-center mb-8">
            <p className="text-gray-600">
              {loading
                ? "در حال دریافت محصولات..."
                : `نمایش ${products.length} محصول`}
            </p>
            <div className="flex items-center space-x-4 space-x-reverse">
              <span className="text-gray-600">مرتب‌سازی:</span>
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setPage(1);
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg bg-white pr-8"
              >
                <option value="popular">محبوب‌ترین</option>
                <option value="price-low">قیمت کم به زیاد</option>
                <option value="price-high">قیمت زیاد به کم</option>
                <option value="newest">جدیدترین</option>
              </select>
            </div>
          </div>

          {loading ? (
            <ProductSkeleton />
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.map((product: any) => (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl shadow-lg"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-64 object-cover"
                    />
                    <button
                      onClick={() => toggleFavorite(product.id)}
                      className={`absolute top-4 left-4 w-10 h-10 rounded-full flex items-center justify-center ${
                        favorites.includes(product.id)
                          ? "bg-red-500 text-white"
                          : "bg-white/80 text-red-500 hover:bg-white"
                      }`}
                    >
                      <i
                        className={
                          favorites.includes(product.id)
                            ? "ri-heart-fill text-lg"
                            : "ri-heart-line text-lg"
                        }
                      ></i>
                    </button>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold mb-2 text-gray-900">
                      {product.name}
                    </h3>
                    <div className="flex items-center space-x-1 space-x-reverse mb-2 text-yellow-400 text-sm">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <i
                          key={i}
                          className={`ri-star-${
                            product.rating >= i + 1
                              ? "fill"
                              : product.rating > i
                              ? "half-line"
                              : "line"
                          }`}
                        ></i>
                      ))}
                      <span className="text-gray-500 text-xs ml-2">
                        ({product.reviewsCount})
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse mb-4">
                      <span className="text-2xl font-bold text-orange-500">
                        {product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-gray-400 line-through">
                          {product.originalPrice}
                        </span>
                      )}
                      <span className="text-sm text-gray-600">تومان</span>
                    </div>
                    <Link href={`/products/${product.id}`}>
                      <OrangeButton className="w-full">
                        مشاهده جزئیات و خرید
                      </OrangeButton>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-center mt-12">
            <div className="flex items-center space-x-2 space-x-reverse">
              <button
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  page === 1
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-white hover:bg-orange-100 text-gray-700"
                }`}
              >
                قبلی
              </button>

              {Array.from({ length: totalPages }).map((_, i) => {
                const pageNumber = i + 1;
                return (
                  <button
                    key={pageNumber}
                    onClick={() => handlePageChange(pageNumber)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                      page === pageNumber
                        ? "bg-orange-500 text-white shadow"
                        : "bg-white hover:bg-orange-100 text-gray-700"
                    }`}
                  >
                    {pageNumber}
                  </button>
                );
              })}

              <button
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPages}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  page === totalPages
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-white hover:bg-orange-100 text-gray-700"
                }`}
              >
                بعدی
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
