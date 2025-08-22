"use client";

import { useState, useEffect } from "react";
import Header from "../../_components/Header";
import Footer from "../../_components/Footer";
import Link from "next/link";
import { useFavorites } from "@/app/hooks/useFavorites";
import ProductPageSkeleton from "@/app/_components/ProductPageSkeleton";
import ProductSkeleton from "@/app/_components/ProductSkeleton";

type Cloth = {
  id: number;
  name: string;
  brand: string;
  price: string;
  originalPrice: string;
  sizes: string[];
  colors: string[];
  category: string;
  image: string;
};

export default function SportClothes() {
  const [clothes, setClothes] = useState<Cloth[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBrand, setSelectedBrand] = useState("همه");
  const [selectedSize, setSelectedSize] = useState("");
  const [categories, setCategories] = useState<string[]>(["همه"]);
  const [brands, setBrands] = useState<string[]>(["همه"]);

  const { isLoggedIn, favorites, toggleFavorite } = useFavorites();

  useEffect(() => {
    async function fetchClothes() {
      try {
        const res = await fetch("/api/products/clothes");
        if (!res.ok) throw new Error("خطا در دریافت داده‌ها");
        const data: Cloth[] = await res.json();
        setClothes(data);

        const uniqueCategories = Array.from(
          new Set(data.map((item) => item.category))
        );
        const uniqueBrands = Array.from(
          new Set(data.map((item) => item.brand))
        );

        setCategories(["همه", ...uniqueCategories]);
        setBrands(["همه", ...uniqueBrands]);
      } catch (error) {
        console.error("خطا در دریافت پوشاک:", error);
        setClothes([]);
        setCategories(["همه"]);
        setBrands(["همه"]);
      } finally {
        setLoading(false);
      }
    }
    fetchClothes();
  }, []);

  const filteredClothes = clothes.filter((item) => {
    const brandMatch = selectedBrand === "همه" || item.brand === selectedBrand;
    const sizeMatch = selectedSize === "" || item.sizes.includes(selectedSize);
    return brandMatch && sizeMatch;
  });

  if (loading) {
    return <ProductPageSkeleton />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <section className="pt-24 pb-16 bg-gradient-to-br from-green-600 to-teal-700">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h1 className="text-5xl font-bold mb-6">پوشاک ورزشی</h1>
            <p className="text-xl opacity-90">
              بهترین لباس‌های ورزشی برای عملکرد بهتر
            </p>
            <div className="flex justify-center mt-8 space-x-4 space-x-reverse">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <i className="ri-shirt-line text-2xl"></i>
              </div>
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <i className="ri-t-shirt-line text-2xl"></i>
              </div>
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <i className="ri-fire-line text-2xl"></i>
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
                            ? "bg-green-500 text-white"
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
                    {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
                      <button
                        key={size}
                        onClick={() =>
                          setSelectedSize(selectedSize === size ? "" : size)
                        }
                        className={`p-2 border rounded-lg transition-all duration-300 ${
                          selectedSize === size
                            ? "bg-green-500 text-white border-green-500"
                            : "border-gray-300 hover:border-green-500"
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
                  پوشاک ورزشی ({filteredClothes.length} محصول)
                </h2>
              </div>

              {loading ? (
                <ProductSkeleton />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredClothes.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
                    >
                      <div className="relative overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-64 object-cover object-top group-hover:scale-110 transition-transform duration-500"
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
                        <div className="absolute top-4 right-4 bg-green-500 text-white px-2 py-1 rounded-full text-sm">
                          {item.brand}
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-lg font-bold mb-2">{item.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {item.category}
                        </p>
                        <div className="flex items-center space-x-2 space-x-reverse mb-4">
                          <span className="text-2xl font-bold text-green-600">
                            {item.price}
                          </span>
                          <span className="text-gray-400 line-through text-sm">
                            {item.originalPrice}
                          </span>
                          <span className="text-sm text-gray-600">تومان</span>
                        </div>

                        <div className="mb-4">
                          <p className="text-sm text-gray-600 mb-2">
                            رنگ‌های موجود:
                          </p>
                          <div className="flex space-x-2 space-x-reverse">
                            {item.colors.slice(0, 3).map((color) => (
                              <span
                                key={color}
                                className="text-xs bg-gray-100 px-2 py-1 rounded"
                              >
                                {color}
                              </span>
                            ))}
                          </div>
                        </div>

                        <Link href={`/products/${item.id}`}>
                          <button className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors duration-300 font-medium whitespace-nowrap">
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
