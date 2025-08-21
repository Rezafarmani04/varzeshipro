"use client";

import { useEffect, useState } from "react";
import Footer from "../../_components/Footer";
import Link from "next/link";
import SecondaryHeader from "@/app/_components/SecondaryHeader";
import toast from "react-hot-toast";
import ProductDetailSkeleton from "@/app/_components/ProductDetailsSkeleton";

interface Product {
  id: number;
  name: string;
  brand: string;
  price: string;
  originalPrice: string;
  discount: string;
  rating: number;
  reviews: number;
  category: string;
  stock: number;
  description: string;
  features: string[];
  comments: string[];
  specifications: Record<string, string>;
  colors: string[];
  image: string;
}

const shoeSizes = ["39", "40", "41", "42", "43", "44"];
const clothingSizes = ["S", "L", "XL", "2XL", "3XL", "4XL"];

export default function ProductDetail({ productId }: { productId: string }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${productId}`);
        if (!res.ok) throw new Error("محصول پیدا نشد");
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <ProductDetailSkeleton />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            محصول یافت نشد
          </h1>
          <Link href="/products" className="text-orange-500 hover:underline">
            بازگشت به صفحه محصولات
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = async () => {
    try {
      const authRes = await fetch("/api/auth/check-auth");
      const authData = await authRes.json();

      if (!authData.isLoggedIn) {
        toast.error(
          "برای افزودن محصول به سبد خرید ابتدا باید وارد شوید یا ثبت‌نام کنید"
        );
        return;
      }

      if (
        (product.category === "کفش" || product.category === "لباس") &&
        !selectedSize
      ) {
        toast.error("لطفا سایز محصول را انتخاب کنید");
        return;
      }
      if (!selectedColor) {
        toast.error("لطفا رنگ محصول را انتخاب کنید");
        return;
      }

      const res = await fetch("/api/addproduct", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product.id,
          quantity,
          size: selectedSize || null,
          color: selectedColor,
        }),
        credentials: "include",
      });

      if (!res.ok) throw new Error("خطا در افزودن به سبد خرید");

      const data = await res.json();
      toast.success(`محصول "${product.name}" به سبد خرید اضافه شد ✅`);
      console.log(data);
    } catch (err) {
      console.error(err);
      toast.error("مشکلی پیش آمد ❌");
    }
  };

  const getSizesForCategory = () => {
    if (product.category === "shoes") return shoeSizes;
    if (product.category === "clothes") return clothingSizes;
    return [];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SecondaryHeader />

      <section className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <nav className="flex items-center space-x-2 space-x-reverse text-sm text-gray-600 mb-8">
            <Link href="/" className="hover:text-orange-500">
              خانه
            </Link>
            <i className="ri-arrow-left-s-line"></i>
            <Link href="/products" className="hover:text-orange-500">
              محصولات
            </Link>
            <i className="ri-arrow-left-s-line"></i>
            <span className="text-gray-900">{product.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div className="space-y-4">
              <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-[550px] object-cover object-top"
                />
                <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full font-bold">
                  {product.discount}
                </div>
              </div>

              <div className="flex space-x-4 space-x-reverse">
                <button
                  onClick={() => setSelectedImage(0)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                    selectedImage === 0
                      ? "border-orange-500"
                      : "border-gray-200"
                  }`}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-top"
                  />
                </button>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <span className="text-orange-500 font-medium">
                  {product.brand}
                </span>
                <h1 className="text-3xl font-bold text-gray-900 mt-2">
                  {product.name}
                </h1>
                <div className="flex items-center space-x-4 space-x-reverse mt-4">
                  <div className="flex items-center space-x-1 space-x-reverse">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <i
                          key={i}
                          className={`ri-star-${
                            i < Math.floor(product.rating) ? "fill" : "line"
                          }`}
                        ></i>
                      ))}
                    </div>
                    <span className="text-gray-600">
                      ({product.reviews} نظر)
                    </span>
                  </div>
                  <span className="text-green-600 font-medium">
                    {product.stock} عدد موجود
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-4 space-x-reverse">
                <span className="text-3xl font-bold text-orange-500">
                  {product.price}
                </span>
                <span className="text-xl text-gray-400 line-through">
                  {product.originalPrice}
                </span>
                <span className="text-gray-600">تومان</span>
              </div>

              <div className="space-y-4">
                {getSizesForCategory().length > 0 && (
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">سایز:</h3>
                    <div className="flex space-x-2 space-x-reverse flex-wrap gap-2">
                      {getSizesForCategory().map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`px-4 py-2 border rounded-lg transition-all duration-300 ${
                            selectedSize === size
                              ? "border-orange-500 bg-orange-500 text-white"
                              : "border-gray-300 hover:border-orange-500"
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h3 className="font-medium text-gray-900 mb-2">رنگ:</h3>
                  <div className="flex space-x-2 space-x-reverse flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-4 py-2 border rounded-lg transition-all duration-300 ${
                          selectedColor === color
                            ? "border-orange-500 bg-orange-500 text-white"
                            : "border-gray-300 hover:border-orange-500"
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-2">تعداد:</h3>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:border-orange-500 transition-colors duration-300"
                    >
                      <i className="ri-subtract-line"></i>
                    </button>
                    <span className="w-16 h-10 border border-gray-300 rounded-lg flex items-center justify-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() =>
                        setQuantity(Math.min(product.stock, quantity + 1))
                      }
                      className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:border-orange-500 transition-colors duration-300"
                    >
                      <i className="ri-add-line"></i>
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4 space-x-reverse">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-orange-500 text-white py-4 rounded-xl font-bold hover:bg-orange-600 transition-colors duration-300 flex items-center justify-center space-x-2 space-x-reverse whitespace-nowrap"
                >
                  <i className="ri-shopping-cart-line text-xl"></i>
                  <span>افزودن به سبد خرید</span>
                </button>
                <button className="w-16 h-16 border border-gray-300 rounded-xl flex items-center justify-center hover:border-orange-500 hover:text-orange-500 transition-all duration-300">
                  <i className="ri-heart-line text-xl"></i>
                </button>
              </div>

              <div className="flex items-center space-x-6 space-x-reverse text-sm text-gray-600">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <i className="ri-truck-line"></i>
                  <span>ارسال رایگان</span>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <i className="ri-refresh-line"></i>
                  <span>7 روز ضمانت برگشت</span>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <i className="ri-secure-payment-line"></i>
                  <span>پرداخت امن</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 md:p-8">
            <div className="flex flex-wrap md:flex-nowrap border-b border-gray-200 mb-6 md:mb-8">
              {[
                {
                  id: "description",
                  name: "توضیحات",
                  icon: "ri-file-text-line",
                },
                { id: "features", name: "ویژگی‌ها", icon: "ri-list-check" },
                {
                  id: "specifications",
                  name: "مشخصات",
                  icon: "ri-settings-3-line",
                },
                { id: "reviews", name: "نظرات", icon: "ri-star-line" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 md:flex-none px-3 sm:px-4 md:px-6 py-3 md:py-4 text-sm sm:text-base md:text-lg font-medium border-b-2 transition-all duration-300 flex items-center justify-center md:justify-start space-x-1 sm:space-x-2 space-x-reverse ${
                    activeTab === tab.id
                      ? "border-orange-500 text-orange-500"
                      : "border-transparent text-gray-600 hover:text-orange-500"
                  }`}
                >
                  <i className={`${tab.icon} text-base sm:text-lg`}></i>
                  <span>{tab.name}</span>
                </button>
              ))}
            </div>

            <div className="min-h-[180px] sm:min-h-[200px]">
              {activeTab === "description" && (
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base md:text-lg">
                  {product.description}
                </p>
              )}

              {activeTab === "features" && (
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">
                    ویژگی‌های محصول
                  </h3>
                  <ul className="space-y-2 sm:space-y-3">
                    {product.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-center space-x-2 sm:space-x-3 space-x-reverse"
                      >
                        <i className="ri-check-line text-green-500 text-base sm:text-lg"></i>
                        <span className="text-gray-700 text-sm sm:text-base">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === "specifications" && (
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">
                    مشخصات فنی
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {Object.entries(product.specifications).map(
                      ([key, value]) => (
                        <div
                          key={key}
                          className="flex justify-between items-center py-2 sm:py-3 border-b border-gray-200"
                        >
                          <span className="font-medium text-gray-900 text-sm sm:text-base">
                            {key}:
                          </span>
                          <span className="text-gray-700 text-sm sm:text-base">
                            {value}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}

              {activeTab === "reviews" && (
                <div className="space-y-4 sm:space-y-6">
                  {product.comments.map((comment, index) => (
                    <div
                      key={index}
                      className="border border-orange-100 bg-orange-50 rounded-xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow duration-300"
                    >
                      <div className="flex items-center space-x-3 sm:space-x-4 space-x-reverse mb-2 sm:mb-3">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 rounded-full flex items-center justify-center">
                          <i className="ri-user-fill text-orange-500 text-lg sm:text-xl"></i>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 text-sm sm:text-base">
                            کاربر {index + 1}
                          </h4>
                          <div className="flex text-yellow-400 text-xs sm:text-sm">
                            {[...Array(5)].map((_, i) => (
                              <i key={i} className="ri-star-fill"></i>
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                        {comment}
                      </p>
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
