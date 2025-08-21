"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export function useFavorites() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/check-auth", {
          credentials: "include",
        });
        if (!res.ok) throw new Error("مشکل در بررسی وضعیت کاربر");
        const data = await res.json();
        setIsLoggedIn(data.isLoggedIn || false);
      } catch (err) {
        console.error(err);
        setIsLoggedIn(false);
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    if (!isLoggedIn) return;

    const fetchFavorites = async () => {
      try {
        const res = await fetch("/api/favorites", { credentials: "include" });
        if (!res.ok) throw new Error("مشکل در دریافت علاقه‌مندی‌ها");
        const data = await res.json();

        const favIds = data.favorites.map(
          (item: any) => item.productId ?? item.id
        );
        setFavorites(favIds);
      } catch (err) {
        console.error(err);
        toast.error("خطا در دریافت لیست علاقه‌مندی‌ها");
      }
    };

    fetchFavorites();
  }, [isLoggedIn]);

  const toggleFavorite = async (productId: number) => {
    if (!isLoggedIn) {
      toast.error("برای افزودن به علاقه‌مندی‌ها ابتدا باید وارد شوید.");
      return;
    }

    try {
      const res = await fetch("/api/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
        credentials: "include",
      });
      if (!res.ok) throw new Error("مشکل در ثبت علاقه‌مندی");

      setFavorites((prev) =>
        prev.includes(productId)
          ? prev.filter((id) => id !== productId)
          : [...prev, productId]
      );

      toast.success(
        favorites.includes(productId)
          ? "از علاقه‌مندی‌ها حذف شد."
          : "به علاقه‌مندی‌ها اضافه شد."
      );
    } catch (err) {
      console.error(err);
      toast.error("خطا در تغییر علاقه‌مندی");
    }
  };

  return { isLoggedIn, favorites, toggleFavorite };
}
