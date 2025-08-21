"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";

interface Brand {
  id: number;
  name: string;
  logo: string;
  description: string;
}

export default function BrandSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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

  useEffect(() => {
    async function fetchBrands() {
      try {
        const res = await fetch("/api/brands");
        if (!res.ok) throw new Error("خطا در دریافت داده‌ها");
        const data: Brand[] = await res.json();
        setBrands(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("خطای ناشناخته");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchBrands();
  }, []);

  if (loading) return <p className="text-center py-20">در حال بارگذاری...</p>;
  if (error) return <p className="text-center py-20 text-red-500">{error}</p>;

  return (
    <section ref={sectionRef} className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div
          className={`text-center mb-16 transform transition-all duration-1000`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            برندهای معتبر
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            همکاری با بهترین برندهای ورزشی دنیا برای ارائه بالاترین کیفیت
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {brands.map((brand, index) => (
            <div
              key={brand.id}
              className={`group bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 opacity-100 translate-y-0`}
              style={{ transitionDelay: `${index * 1}ms` }}
            >
              <div className="text-center">
                <div className="mb-4 overflow-hidden rounded-lg">
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="w-full h-16 object-contain mx-auto group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <h3 className="font-bold text-gray-900 mb-2 group-hover:text-orange-500 transition-colors duration-300">
                  {brand.name}
                </h3>
                <p className="text-sm text-gray-600">{brand.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div
          className={`mt-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl p-8 md:p-12 transform transition-all duration-1000 delay-500`}
        >
          <div className="text-center text-white">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              تخفیف ویژه برندها
            </h3>
            <p className="text-xl mb-8 opacity-90">
              تا ۵۰٪ تخفیف روی محصولات برندهای معتبر
            </p>
            <Link href={"/products"}>
              <button className="bg-white text-orange-500 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg whitespace-nowrap">
                مشاهده محصولات
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
