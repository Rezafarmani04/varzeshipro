"use client";

import { useEffect, useState } from "react";
import Header from "../../_components/Header";
import Footer from "../../_components/Footer";
import { useFavorites } from "@/app/hooks/useFavorites";
import Link from "next/link";
import ProductPageSkeleton from "@/app/_components/ProductPageSkeleton";
import ProductSkeleton from "@/app/_components/ProductSkeleton";

type BallItem = {
  id: number;
  name: string;
  brand: string;
  price: string;
  originalPrice: string;
  sport: string;
  image: string;
  features: string[];
};

export default function SportBalls() {
  const [balls, setBalls] = useState<BallItem[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [selectedBrand, setSelectedBrand] = useState("همه");
  const [loading, setLoading] = useState(true);

  const { isLoggedIn, favorites, toggleFavorite } = useFavorites();

  useEffect(() => {
    async function fetchBalls() {
      setLoading(true);
      try {
        const res = await fetch("/api/products/balls");
        const data: BallItem[] = await res.json();

        setBalls(data);

        const uniqueBrands = Array.from(
          new Set(data.map((item) => item.brand))
        );
        setBrands(["همه", ...uniqueBrands]);
      } catch (error) {
        console.error("Failed to fetch balls:", error);
      }
      setLoading(false);
    }

    fetchBalls();
  }, []);

  const filteredBalls = balls.filter((ball) => {
    const brandMatch = selectedBrand === "همه" || ball.brand === selectedBrand;
    return brandMatch;
  });

  if (loading) {
    return <ProductPageSkeleton />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <section className="pt-24 pb-16 bg-gradient-to-br from-purple-600 to-pink-700">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h1 className="text-5xl font-bold mb-6">توپ‌های ورزشی</h1>
            <p className="text-xl opacity-90">
              بهترین توپ‌های ورزشی برای همه رشته‌ها
            </p>
            <div className="flex justify-center mt-8 space-x-4 space-x-reverse">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <i className="ri-football-line text-2xl"></i>
              </div>
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <i className="ri-basketball-line text-2xl"></i>
              </div>
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <i className="ri-ping-pong-line text-2xl"></i>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-lg font-bold mb-4">فیلتر محصولات</h3>

                <div className="mb-6">
                  <h4 className="font-medium mb-3">برند</h4>
                  <div className="space-y-2">
                    {brands.map((brand) => (
                      <button
                        key={brand}
                        onClick={() => setSelectedBrand(brand)}
                        className={`w-full text-right p-2 rounded-lg transition-all duration-300 ${
                          selectedBrand === brand
                            ? "bg-purple-500 text-white"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        {brand}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold">
                  توپ‌های ورزشی ({filteredBalls.length} محصول)
                </h2>
              </div>

              {loading ? (
                <ProductSkeleton />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredBalls.map((ball) => (
                    <div
                      key={ball.id}
                      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
                    >
                      <div className="relative overflow-hidden">
                        <img
                          src={ball.image}
                          alt={ball.name}
                          className="w-full h-64 object-cover object-top group-hover:scale-110 transition-transform duration-500"
                        />
                        <button
                          onClick={() => toggleFavorite(ball.id)}
                          className={`absolute top-4 left-4 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                            favorites.includes(ball.id)
                              ? "bg-red-500 text-white"
                              : "bg-white/80 text-red-500 hover:bg-white"
                          }`}
                        >
                          <i
                            className={
                              favorites.includes(ball.id)
                                ? "ri-heart-fill text-lg"
                                : "ri-heart-line text-lg"
                            }
                          ></i>
                        </button>
                        <div className="absolute top-4 right-4 bg-purple-500 text-white px-2 py-1 rounded-full text-sm">
                          {ball.brand}
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-lg font-bold mb-2">{ball.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {ball.sport}
                        </p>
                        <div className="flex items-center space-x-2 space-x-reverse mb-4">
                          <span className="text-2xl font-bold text-purple-600">
                            {ball.price}
                          </span>
                          <span className="text-gray-400 line-through text-sm">
                            {ball.originalPrice}
                          </span>
                          <span className="text-sm text-gray-600">تومان</span>
                        </div>

                        <div className="mb-4 space-y-2">
                          {ball.features &&
                            ball.features.slice(0, 3).map((feature, index) => (
                              <div
                                key={index}
                                className="flex items-center justify-between"
                              >
                                <span className="text-sm font-medium flex items-center space-x-1 space-x-reverse text-gray-700">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 text-green-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={3}
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M5 13l4 4L19 7"
                                    />
                                  </svg>
                                  <span>{feature}</span>
                                </span>
                              </div>
                            ))}
                        </div>

                        <Link href={`/products/${ball.id}`}>
                          <button className="w-full bg-purple-500 text-white py-3 rounded-lg hover:bg-purple-600 transition-colors duration-300 font-medium whitespace-nowrap">
                            مشاهده جزئیات و خرید
                          </button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
