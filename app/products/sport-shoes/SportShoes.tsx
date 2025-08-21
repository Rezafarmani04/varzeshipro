"use client";

import { useState, useEffect } from "react";
import Header from "../../_components/Header";
import Footer from "../../_components/Footer";
import Link from "next/link";
import { useFavorites } from "@/app/hooks/useFavorites";
import ProductSkeleton from "@/app/_components/ProductSkeleton";
import ProductPageSkeleton from "@/app/_components/ProductPageSkeleton";

type Shoe = {
  id: number;
  brand: string;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  colors?: string[];
};

export default function SportShoes() {
  const [selectedBrand, setSelectedBrand] = useState("همه");
  const [selectedSize, setSelectedSize] = useState("");
  const [shoes, setShoes] = useState<Shoe[]>([]);
  const [loading, setLoading] = useState(true);
  const [brands, setBrands] = useState<string[]>(["همه"]);

  const { isLoggedIn, favorites, toggleFavorite } = useFavorites();

  useEffect(() => {
    const fetchShoes = async () => {
      try {
        const res = await fetch("/api/products/shoes");
        if (!res.ok) throw new Error("خطا در دریافت محصولات");
        const data: Shoe[] = await res.json();

        setShoes(data);

        const uniqueBrands = Array.from(
          new Set(data.map((shoe) => shoe.brand))
        );
        setBrands(["همه", ...uniqueBrands]);
      } catch (err) {
        console.error("خطا در دریافت کفش‌ها:", err);
        setShoes([]);
        setBrands(["همه"]);
      } finally {
        setLoading(false);
      }
    };

    fetchShoes();
  }, []);

  const filteredShoes = shoes.filter(
    (shoe) => selectedBrand === "همه" || shoe.brand === selectedBrand
  );

  if (loading) {
    return <ProductPageSkeleton />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <section className="pt-24 pb-16 bg-gradient-to-br from-blue-600 to-purple-700">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h1 className="text-5xl font-bold mb-6">کفش‌های ورزشی</h1>
            <p className="text-xl opacity-90">
              بهترین کفش‌های ورزشی برای همه رشته‌ها
            </p>
            <div className="flex justify-center mt-8 space-x-4 space-x-reverse">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <i className="ri-run-line text-2xl"></i>
              </div>
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <i className="ri-basketball-line text-2xl"></i>
              </div>
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <i className="ri-football-line text-2xl"></i>
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
                            ? "bg-blue-500 text-white"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        {brand}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-medium mb-3">سایز</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {["39", "40", "41", "42", "43", "44"].map((size) => (
                      <button
                        key={size}
                        onClick={() =>
                          setSelectedSize(selectedSize === size ? "" : size)
                        }
                        className={`p-2 border rounded-lg transition-all duration-300 ${
                          selectedSize === size
                            ? "bg-blue-500 text-white border-blue-500"
                            : "border-gray-300 hover:border-blue-500"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold">
                  کفش‌های ورزشی ({filteredShoes.length} محصول)
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredShoes.map((shoe) => (
                    <div
                      key={shoe.id}
                      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
                    >
                      <div className="relative overflow-hidden">
                        <img
                          src={shoe.image}
                          alt={shoe.name}
                          className="w-full h-64 object-cover object-top group-hover:scale-110 transition-transform duration-500"
                        />
                        <button
                          onClick={() => toggleFavorite(shoe.id)}
                          className={`absolute top-4 left-4 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                            favorites.includes(shoe.id)
                              ? "bg-red-500 text-white"
                              : "bg-white/80 text-red-500 hover:bg-white"
                          }`}
                        >
                          <i
                            className={
                              favorites.includes(shoe.id)
                                ? "ri-heart-fill text-lg"
                                : "ri-heart-line text-lg"
                            }
                          ></i>
                        </button>
                        <div className="absolute top-4 right-4 bg-blue-500 text-white px-2 py-1 rounded-full text-sm">
                          {shoe.brand}
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-lg font-bold mb-2">{shoe.name}</h3>
                        <div className="flex items-center space-x-2 space-x-reverse mb-4">
                          <span className="text-2xl font-bold text-blue-600">
                            {shoe.price}
                          </span>
                          {shoe.originalPrice && (
                            <span className="text-gray-400 line-through text-sm">
                              {shoe.originalPrice}
                            </span>
                          )}
                          <span className="text-sm text-gray-600">تومان</span>
                        </div>

                        {shoe.colors && (
                          <div className="mb-4">
                            <p className="text-sm text-gray-600 mb-2">
                              رنگ‌های موجود:
                            </p>
                            <div className="flex space-x-2 space-x-reverse">
                              {shoe.colors.slice(0, 3).map((color: string) => (
                                <span
                                  key={color}
                                  className="text-xs bg-gray-100 px-2 py-1 rounded"
                                >
                                  {color}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        <Link href={`/products/${shoe.id}`}>
                          <button className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors duration-300 font-medium whitespace-nowrap">
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
