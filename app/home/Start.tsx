"use client";

import Link from "next/link";

export default function Start() {
  return (
    <section className="py-24 bg-gradient-to-r from-orange-500 to-red-600 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="container mx-auto px-4 text-center relative z-10">
        <h2 className="text-5xl font-bold mb-6">آماده شروع هستید؟</h2>
        <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
          به جمع بیش از 50 هزار مشتری راضی ما بپیوندید و بهترین تجهیزات ورزشی را
          تجربه کنید
        </p>
        <div className="flex items-center justify-center space-x-4 space-x-reverse mb-8">
          <div className="flex items-center space-x-2 space-x-reverse bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
            <i className="ri-truck-line text-white"></i>
            <span className="text-sm">ارسال رایگان</span>
          </div>
          <div className="flex items-center space-x-2 space-x-reverse bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
            <i className="ri-shield-check-line text-white"></i>
            <span className="text-sm">ضمانت اصالت</span>
          </div>
          <div className="flex items-center space-x-2 space-x-reverse bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
            <i className="ri-customer-service-line text-white"></i>
            <span className="text-sm">پشتیبانی 24/7</span>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/products"
            className="bg-white text-orange-500 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-colors duration-300 whitespace-nowrap"
          >
            مشاهده محصولات
          </Link>
          <Link
            href="/contact"
            className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-orange-500 transition-colors duration-300 whitespace-nowrap"
          >
            تماس با ما
          </Link>
        </div>
      </div>
    </section>
  );
}
