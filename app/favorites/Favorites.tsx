"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Trash2, ShoppingCart } from "lucide-react";
import Link from "next/link";
import LoadingSpinner from "../_components/LoadingSpinner";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/check-auth", {
          credentials: "include",
        });
        const data = await res.json();
        setIsLoggedIn(data.isLoggedIn);
        if (!data.isLoggedIn) {
          setLoading(false);
          return;
        }
        const favRes = await fetch("/api/favorites", {
          credentials: "include",
        });
        if (!favRes.ok) throw new Error("مشکل در دریافت علاقه‌مندی‌ها");
        const favData = await favRes.json();
        setFavorites(favData.favorites.map((f: any) => f.product));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const removeFavorite = async (productId: number) => {
    try {
      const res = await fetch(`/api/favorites/${productId}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("مشکل در حذف علاقه‌مندی");
      setFavorites((prev) => prev.filter((p) => p.id !== productId));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <LoadingSpinner />
    );
  }

  if (isLoggedIn === false) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
        <p className="text-lg mb-4">
          برای مشاهده علاقه‌مندی‌ها ابتدا ثبت‌نام کنید یا وارد شوید.
        </p>
        <Link
          href="/signup"
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg"
        >
          ثبت‌نام / ورود
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 bg-white shadow-sm z-10 py-4 px-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-orange-500">
          علاقه‌مندی‌های من
        </h1>
        <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-medium">
          {favorites.length} محصول
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Image
              src="/empty-favorites.svg"
              alt="Empty"
              width={200}
              height={200}
            />
            <p className="text-gray-500 mt-4">
              هنوز محصولی به علاقه‌مندی‌ها اضافه نکرده‌اید.
            </p>
            <Link
              href="/products"
              className="mt-6 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg"
            >
              مشاهده محصولات
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {favorites.map((product) => (
              <div
                key={product.id}
                className="bg-white border rounded-xl shadow-sm hover:shadow-lg transition transform hover:-translate-y-1 flex flex-col"
              >
                <div className="relative">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={300}
                    height={200}
                    className="object-cover w-full h-48 rounded-t-xl"
                  />
                  {product.oldPrice && (
                    <span className="absolute top-3 right-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                      {Math.round(
                        ((product.oldPrice - product.price) /
                          product.oldPrice) *
                          100
                      )}
                      %
                    </span>
                  )}
                </div>

                <div className="p-4 flex flex-col flex-grow">
                  <h2 className="font-semibold text-lg line-clamp-1">
                    {product.name}
                  </h2>

                  <div className="mt-2">
                    {product.oldPrice && (
                      <span className="text-gray-400 line-through text-sm mr-2">
                        {product.oldPrice.toLocaleString()} تومان
                      </span>
                    )}
                    <span className="text-orange-500 font-bold">
                      {product.price.toLocaleString()} تومان
                    </span>
                  </div>

                  <div className="mt-auto flex gap-2 pt-4">
                    <button
                      onClick={() => removeFavorite(product.id)}
                      className="flex-1 flex items-center justify-center gap-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg text-sm transition"
                    >
                      <Trash2 size={16} /> حذف
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-1 bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg text-sm transition">
                      <ShoppingCart size={16} /> خرید
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
