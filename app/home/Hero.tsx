"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const slides = [
    {
      id: 1,
      title: "کلکسیون ورزشی جدید",
      subtitle: "بهترین تجهیزات ورزشی با بالاترین کیفیت",
      description:
        "از لباس‌های ورزشی حرفه‌ای تا تجهیزات تناسب اندام، همه چیز را در یک جا پیدا کنید",
      buttonText: "مشاهده محصولات",
      image:
        "https://res.cloudinary.com/dsvokiftm/image/upload/v1754469050/3181a9f915252be695d09baecf140620_ucczbf.jpg",
    },
    {
      id: 2,
      title: "تجهیزات ورزشی پیشرفته",
      subtitle: "برای ورزشکاران حرفه‌ای و آماتور",
      description:
        "با تجهیزات مدرن و باکیفیت، عملکرد ورزشی خود را به سطح جدیدی برسانید",
      buttonText: "خرید کنید",
      image:
        "https://res.cloudinary.com/dsvokiftm/image/upload/v1754469045/8e217190d8987d6edfd603dcab87c5f4_lvwqpf.jpg",
    },
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative h-screen overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-transform duration-1000 ease-in-out ${
            index === currentSlide ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="absolute inset-0 bg-black/30"></div>
          </div>

          <div className="relative z-10 h-full flex items-center">
            <div className="container mx-auto px-4">
              <div className="max-w-2xl">
                <div
                  className={`transform transition-all duration-1000 delay-300 ${
                    isVisible && index === currentSlide
                      ? "translate-y-0 opacity-100"
                      : "translate-y-10 opacity-0"
                  }`}
                >
                  <h2 className="text-orange-400 text-lg font-semibold mb-4 tracking-wider">
                    {slide.subtitle}
                  </h2>
                  <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                    {slide.title}
                  </h1>
                  <p className="text-xl text-gray-200 mb-8 leading-relaxed">
                    {slide.description}
                  </p>
                  <Link
                    href="/products"
                    className="inline-flex items-center px-8 py-4 bg-orange-500 text-white font-semibold rounded-full hover:bg-orange-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl whitespace-nowrap"
                  >
                    {slide.buttonText}
                    <i className="ri-arrow-left-line mr-2 text-xl"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={nextSlide}
        className="absolute right-8 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-orange-500 transition-all duration-300 z-20"
      >
        <i className="ri-arrow-right-line text-xl"></i>
      </button>

      <button
        onClick={prevSlide}
        className="absolute left-8 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-orange-500 transition-all duration-300 z-20"
      >
        <i className="ri-arrow-left-line text-xl"></i>
      </button>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-orange-500 w-8" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
