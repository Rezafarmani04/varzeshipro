"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function FeaturedProducts() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [products, setProducts] = useState<any[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  const filters = [
    { id: "all", name: "همه محصولات" },
    { id: "shoes", name: "کفش" },
    { id: "clothing", name: "پوشاک" },
    { id: "equipment", name: "تجهیزات" },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/specialproducts");
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("خطا در دریافت محصولات:", err);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts =
    activeFilter === "all"
      ? products
      : products.filter((product) => product.category === activeFilter);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div
          className={`text-center mb-12 transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            محصولات ویژه
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            بهترین و محبوب‌ترین محصولات ورزشی با کیفیت عالی
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 whitespace-nowrap ${
                  activeFilter === filter.id
                    ? "bg-orange-500 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {filter.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              className={`group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 1}ms` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover object-top group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4">
                  <span
                    className={`px-3 py-1 text-sm font-semibold rounded-full text-white ${
                      product.badge === "جدید"
                        ? "bg-green-500"
                        : product.badge === "تخفیف ویژه"
                        ? "bg-red-500"
                        : product.badge === "پرفروش"
                        ? "bg-orange-500"
                        : product.badge === "محبوب"
                        ? "bg-purple-500"
                        : "bg-blue-500"
                    }`}
                  >
                    {product.badge}
                  </span>
                </div>
                <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-600 hover:text-orange-500 hover:bg-orange-50 transition-all duration-300">
                    <i className="ri-heart-line text-lg"></i>
                  </button>
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
              </div>

              <div className="p-6">
                <div className="flex items-center mb-2">
                  <div className="flex text-yellow-400 text-sm">
                    {[...Array(5)].map((_, i) => (
                      <i
                        key={i}
                        className={`ri-star-${
                          i < Math.floor(product.rating) ? "fill" : "line"
                        }`}
                      ></i>
                    ))}
                  </div>
                  <span className="text-gray-500 text-sm mr-2">
                    ({product.reviews} نظر)
                  </span>
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-orange-500 transition-colors duration-300">
                  {product.name}
                </h3>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <span className="text-xl font-bold text-orange-500">
                      {product.price} تومان
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        {product.originalPrice}
                      </span>
                    )}
                  </div>
                </div>

                <Link
                  href={`/products/${product.id}`}
                  className="w-full bg-gray-900 text-white py-3 rounded-xl font-semibold hover:bg-orange-500 transition-all duration-300 flex items-center justify-center group-hover:shadow-lg whitespace-nowrap"
                >
                  مشاهده جزئیات
                  <i className="ri-arrow-left-line mr-2 text-lg"></i>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/products"
            className="inline-flex items-center px-8 py-4 bg-orange-500 text-white font-semibold rounded-full hover:bg-orange-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl whitespace-nowrap"
          >
            مشاهده همه محصولات
            <i className="ri-arrow-left-line mr-2 text-xl"></i>
          </Link>
        </div>
      </div>
    </section>
  );
}
