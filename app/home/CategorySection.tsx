"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { categories } from "../constant";

export default function CategorySection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div
          className={`text-center mb-16 transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            دسته‌بندی محصولات
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            انواع تجهیزات ورزشی را در دسته‌بندی‌های مختلف کشف کنید
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              href={category.href}
              className={`group block transform transition-all duration-700 hover:scale-105 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute top-4 right-4 w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white transform group-hover:rotate-12 transition-transform duration-300">
                    <i className={`${category.icon} text-xl`}></i>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-500 transition-colors duration-300">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 mb-4">{category.count}</p>
                  <div className="flex items-center text-orange-500 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                    <span className="whitespace-nowrap">مشاهده همه</span>
                    <i className="ri-arrow-left-line mr-2 text-lg"></i>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
