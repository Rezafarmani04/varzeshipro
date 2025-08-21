"use client";

import { useEffect, useState } from "react";
import Header from "../../_components/Header";
import Footer from "../../_components/Footer";
import Link from "next/link";
import { useFavorites } from "@/app/hooks/useFavorites";
import ProductPageSkeleton from "@/app/_components/ProductPageSkeleton";
import ProductSkeleton from "@/app/_components/ProductSkeleton";

type EquipmentItem = {
  id: number;
  name: string;
  brand: string;
  price: string;
  originalPrice: string;
  image: string;
  features: string[];
};

export default function SportEquipment() {
  const [equipment, setEquipment] = useState<EquipmentItem[]>([]);
  const [selectedBrand, setSelectedBrand] = useState("همه");
  const [brands, setBrands] = useState<string[]>([]);

  const [loading, setLoading] = useState(true);

  const { isLoggedIn, favorites, toggleFavorite } = useFavorites();

  useEffect(() => {
    async function fetchEquipment() {
      setLoading(true);
      try {
        const res = await fetch("/api/products/equipment");
        let data: EquipmentItem[] = await res.json();

        setEquipment(data);

        const uniqueBrands = Array.from(
          new Set(data.map((item) => item.brand))
        );
        setBrands(["همه", ...uniqueBrands]);
      } catch (error) {
        console.error("Failed to fetch equipment:", error);
      }
      setLoading(false);
    }

    fetchEquipment();
  }, []);

  const filteredEquipment = equipment.filter((item) => {
    const brandMatch = selectedBrand === "همه" || item.brand === selectedBrand;
    return brandMatch;
  });

  if (loading) {
    return <ProductPageSkeleton />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <section className="pt-24 pb-16 bg-gradient-to-br from-red-600 to-orange-700">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h1 className="text-5xl font-bold mb-6">تجهیزات ورزشی</h1>
            <p className="text-xl opacity-90">
              بهترین تجهیزات ورزشی برای خانه و باشگاه
            </p>
            <div className="flex justify-center mt-8 space-x-4 space-x-reverse">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <i className="ri-fire-line text-2xl"></i>
              </div>
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <i className="ri-scales-3-line text-2xl"></i>
              </div>
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <i className="ri-heart-pulse-line text-2xl"></i>
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
                            ? "bg-red-500 text-white"
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
                  تجهیزات ورزشی ({filteredEquipment.length} محصول)
                </h2>
                <select className="px-4 py-2 border border-gray-300 rounded-lg bg-white pr-8">
                  <option>محبوب‌ترین</option>
                  <option>قیمت کم به زیاد</option>
                  <option>قیمت زیاد به کم</option>
                  <option>جدیدترین</option>
                </select>
              </div>

              {loading ? (
                <ProductSkeleton />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                  {filteredEquipment.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
                    >
                      <div className="relative overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-72 object-cover object-top group-hover:scale-110 transition-transform duration-500"
                        />
                        <button
                          onClick={() => toggleFavorite(item.id)}
                          className={`absolute top-4 left-4 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                            favorites.includes(item.id)
                              ? "bg-red-500 text-white"
                              : "bg-white/80 text-red-500 hover:bg-white"
                          }`}
                        >
                          <i
                            className={
                              favorites.includes(item.id)
                                ? "ri-heart-fill text-lg"
                                : "ri-heart-line text-lg"
                            }
                          ></i>
                        </button>
                        <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded-full text-sm">
                          {item.brand}
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-lg font-bold mb-2">{item.name}</h3>
                        <p className="text-sm text-gray-600 mb-2"></p>
                        <div className="mb-4">
                          <p className="text-sm text-gray-600 mb-2">مشخصات:</p>
                          <div className="space-y-1">
                            {Array.isArray(item.features)
                              ? item.features
                                  .slice(0, 3)
                                  .map((feature, index) => (
                                    <div
                                      key={index}
                                      className="flex items-center space-x-2 space-x-reverse"
                                    >
                                      <i className="ri-check-line text-green-500 text-sm"></i>
                                      <span className="text-xs text-gray-600">
                                        {feature}
                                      </span>
                                    </div>
                                  ))
                              : null}
                          </div>
                        </div>

                        <Link href={`/products/${item.id}`}>
                          <button className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition-colors duration-300 font-medium whitespace-nowrap">
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
