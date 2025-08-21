"use client";

import { useState, useEffect } from "react";
import Footer from "../_components/Footer";
import Link from "next/link";
import SecondaryHeader from "../_components/SecondaryHeader";
import ProductDetailSkeleton from "../_components/ProductDetailsSkeleton";

export default function Cart() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [promoCode, setPromoCode] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const loadCart = async () => {
      try {
        const authRes = await fetch("/api/auth/check-auth", {
          credentials: "include",
        });
        const authData = await authRes.json();

        if (!authData.isLoggedIn) {
          setIsLoggedIn(false);
          setLoading(false);
          return;
        }

        setIsLoggedIn(true);

        const res = await fetch("/api/cartitems", {
          credentials: "include",
        });
        if (!res.ok) {
          setItems([]);
          return;
        }
        const data = await res.json();
        setItems(data.cartItems);
      } catch (err) {
        console.error("Error loading cart:", err);
        setItems([]);
      } finally {
        setLoading(false);
      }
    };
    loadCart();
  }, []);

  const updateQuantity = async (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      return removeItem(id);
    }
    try {
      const res = await fetch("/api/cartitems", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemId: id, quantity: newQuantity }),
        credentials: "include",
      });
      if (!res.ok) return;
      const data = await res.json();
      setItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, quantity: data.cartItem.quantity } : item
        )
      );
    } catch (err) {
      console.error("Error updating quantity:", err);
    }
  };

  const removeItem = async (id: string) => {
    const res = await fetch(`/api/cartitems?id=${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (res.ok) {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  const clearCart = async () => {
    const res = await fetch(`/api/cartitems`, {
      method: "DELETE",
      credentials: "include",
    });
    if (res.ok) {
      setItems([]);
    }
  };

  const getTotalPrice = () =>
    items.reduce(
      (total, item) => total + (item.product.price || 0) * item.quantity,
      0
    );

  const formatPrice = (price: number) =>
    price.toLocaleString("fa-IR") + " تومان";

  if (loading) {
    return <ProductDetailSkeleton />;
  }

  if (isLoggedIn === false) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center">
        <p className="text-lg mb-4">
          برای مشاهده سبد خرید ابتدا وارد شوید یا ثبت‌نام کنید.
        </p>
        <Link
          href="/signup"
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg"
        >
          ورود / ثبت‌نام
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <SecondaryHeader />
        <section className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-8">
                <i className="ri-shopping-cart-line text-4xl text-gray-400"></i>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                سبد خرید شما خالی است
              </h1>
              <p className="text-gray-600 mb-8">
                محصولی به سبد خرید اضافه نکرده‌اید
              </p>
              <Link
                href="/products"
                className="inline-flex items-center px-8 py-4 bg-orange-500 text-white font-semibold rounded-xl hover:bg-orange-600 transition-colors duration-300 whitespace-nowrap"
              >
                مشاهده محصولات
                <i className="ri-arrow-left-line mr-2 text-xl"></i>
              </Link>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SecondaryHeader />

      <section className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-4 space-x-reverse mb-8">
            <h1 className="text-3xl font-bold text-gray-900">سبد خرید</h1>
            <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-medium">
              {items.length} محصول
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="space-y-6">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 sm:space-x-reverse p-4 border border-gray-200 rounded-xl"
                    >
                      <img
                        src={item.product.image}
                        alt={item.name}
                        className="w-24 h-24 sm:w-20 sm:h-20 object-cover object-top rounded-lg mx-auto sm:mx-0"
                      />

                      <div className="flex-1 mt-3 sm:mt-0">
                        <h3 className="text-base sm:text-lg font-bold text-gray-900 text-center sm:text-right">
                          {item.product.name}
                        </h3>
                        <div className="flex justify-center sm:justify-start items-center space-x-3 space-x-reverse text-xs sm:text-sm text-gray-600 mt-1">
                          <span>سایز: {item.size}</span>
                          <span>رنگ: {item.color}</span>
                        </div>
                        <p className="text-orange-500 font-bold text-base sm:text-lg mt-2 text-center sm:text-right">
                          {item.product.price}
                        </p>
                      </div>

                      <div className="flex justify-between sm:justify-end items-center mt-3 sm:mt-0 space-x-3 space-x-reverse">
                        <div className="flex items-center space-x-1 sm:space-x-2 space-x-reverse">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="w-7 h-7 sm:w-8 sm:ml-2 sm:h-8 border border-gray-300 rounded-lg flex items-center justify-center hover:border-orange-500 transition-colors duration-300"
                          >
                            <i className="ri-subtract-line text-xs sm:text-sm"></i>
                          </button>
                          <span className="w-10 h-7 sm:w-12 sm:h-8 border border-gray-300 rounded-lg flex items-center justify-center text-xs sm:text-sm">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="w-7 h-7 sm:w-8 sm:h-8 border border-gray-300 rounded-lg flex items-center justify-center hover:border-orange-500 transition-colors duration-300"
                          >
                            <i className="ri-add-line text-xs sm:text-sm"></i>
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(item.id)}
                          className="w-9 h-9 sm:w-10 sm:h-10 text-red-500 hover:bg-red-50 rounded-lg flex items-center justify-center transition-colors duration-300"
                        >
                          <i className="ri-delete-bin-line text-base sm:text-lg"></i>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
                  <Link
                    href="/products"
                    className="flex items-center text-orange-500 hover:text-orange-600 font-medium whitespace-nowrap"
                  >
                    <i className="ri-arrow-right-line ml-2"></i>
                    ادامه خرید
                  </Link>

                  <button
                    onClick={clearCart}
                    className="flex items-center text-red-500 hover:text-red-600 font-medium whitespace-nowrap"
                  >
                    <i className="ri-delete-bin-line ml-2"></i>
                    پاک کردن سبد خرید
                  </button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  خلاصه سفارش
                </h3>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">قیمت کالاها:</span>
                    <span className="font-medium">
                      {formatPrice(getTotalPrice())}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">هزینه ارسال:</span>
                    <span className="font-medium text-green-600">رایگان</span>
                  </div>
                  <hr className="border-gray-200" />
                  <div className="flex justify-between text-lg font-bold">
                    <span>مجموع:</span>
                    <span className="text-orange-500">
                      {formatPrice(getTotalPrice())}
                    </span>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    کد تخفیف
                  </label>
                  <div className="flex space-x-2 space-x-reverse">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="کد تخفیف را وارد کنید"
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm"
                    />
                    <button className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-300 text-sm whitespace-nowrap">
                      اعمال
                    </button>
                  </div>
                </div>

                <button className="w-full bg-orange-500 text-white py-4 rounded-xl font-bold hover:bg-orange-600 transition-colors duration-300 mb-4 whitespace-nowrap">
                  ادامه جهت پرداخت
                </button>

                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <i className="ri-shield-check-line text-green-500"></i>
                    <span>پرداخت 100% امن</span>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <i className="ri-truck-line text-blue-500"></i>
                    <span>ارسال رایگان بالای 500 هزار تومان</span>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <i className="ri-refresh-line text-orange-500"></i>
                    <span>7 روز ضمانت برگشت</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
