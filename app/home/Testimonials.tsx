"use client";

import { Testimonial } from "@prisma/client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch("/api/testimonials");
        const data = await res.json();
        setTestimonials(data);
      } catch (error) {
        console.error("خطا در دریافت نظرات:", error);
      }
    };

    fetchTestimonials();
  }, []);

  function formatRelativeTime(dateInput: string | Date): string {
    const now = new Date();
    const date = new Date(dateInput);
    const diff = now.getTime() - date.getTime();

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(days / 7);

    const rtf = new Intl.RelativeTimeFormat("fa", { numeric: "auto" });

    if (seconds < 60) return rtf.format(-seconds, "second");
    if (minutes < 60) return rtf.format(-minutes, "minute");
    if (hours < 24) return rtf.format(-hours, "hour");
    if (days < 7) return rtf.format(-days, "day");
    return rtf.format(-weeks, "week");
  }
  return (
    <section className="py-24 bg-gradient-to-br from-orange-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            نظرات مشتریان
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            آنچه مشتریان عزیز ما درباره خدمات و محصولات ما می‌گویند
          </p>
          <div className="flex items-center justify-center space-x-6 space-x-reverse mt-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-500">4.9</div>
              <div className="flex text-yellow-400 justify-center mb-1">
                {[...Array(5)].map((_, i) => (
                  <i key={i} className="ri-star-fill"></i>
                ))}
              </div>
              <div className="text-sm text-gray-600">امتیاز کلی</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-2xl p-8 hover:shadow-xl transition-all duration-300 border"
            >
              <div className="flex items-center space-x-4 space-x-reverse mb-6">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <h4 className="font-bold text-gray-900">
                      {testimonial.name}
                    </h4>
                    {testimonial.verified && (
                      <i
                        className="ri-verified-badge-fill text-blue-500"
                        title="خریدار تایید شده"
                      ></i>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                  <div className="flex text-yellow-400 text-sm mt-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <i key={i} className="ri-star-fill"></i>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                {testimonial.comment}
              </p>
              <div className="flex items-center justify-between">
                <div className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm inline-block">
                  خرید: {testimonial.product}
                </div>
                <span className="text-xs text-gray-500">
                  {formatRelativeTime(testimonial.date)}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/testimonials"
            className="inline-flex items-center px-6 py-3 text-orange-500 border border-orange-500 rounded-lg hover:bg-orange-500 hover:text-white transition-colors duration-300 whitespace-nowrap"
          >
            مشاهده همه نظرات
            <i className="ri-arrow-left-line mr-2"></i>
          </Link>
        </div>
      </div>
    </section>
  );
}
