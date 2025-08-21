"use client";

import Header from "../_components/Header";
import Footer from "../_components/Footer";
import Link from "next/link";
import { brands } from "../constant";

export default function Brands() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <section
        className="pt-24 pb-16 relative bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://res.cloudinary.com/dsvokiftm/image/upload/v1754815644/7e5c329c751742ba10060c9a9b145f0f_ic0x9t.jpg')`,
        }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h1 className="text-5xl font-bold mb-6">برندهای معتبر</h1>
            <p className="text-xl opacity-90">
              همکاری با معتبرترین برندهای ورزشی دنیا
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {brands.map((brand) => (
              <div
                key={brand.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
              >
                <div className="relative">
                  <img
                    src={brand.image}
                    alt={brand.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 p-3 rounded-xl">
                    <img
                      src={brand.logo}
                      alt={`${brand.name} logo`}
                      className="w-12 h-12 object-contain"
                    />
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold">{brand.name}</h3>
                  </div>

                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {brand.description}
                  </p>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <i className="ri-calendar-line text-gray-500"></i>
                      <span className="text-sm text-gray-600">
                        تاسیس: {brand.founded}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">
                        محصولات:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {brand.products.map((product, index) => (
                          <span
                            key={index}
                            className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs"
                          >
                            {product}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">
                        تخصص‌ها:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {brand.specialties.map((specialty, index) => (
                          <span
                            key={index}
                            className="bg-green-100 text-green-600 px-2 py-1 rounded text-xs"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-3 space-x-reverse">
                    <Link
                      href="/products"
                      className="flex-1 bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition-colors duration-300 text-center font-medium whitespace-nowrap"
                    >
                      مشاهده محصولات
                    </Link>
                    <button className="w-12 h-12 border border-gray-300 rounded-lg hover:border-orange-500 hover:text-orange-500 transition-colors duration-300 flex items-center justify-center">
                      <i className="ri-heart-line"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              چرا با برندهای معتبر کار می‌کنیم؟
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              ما تنها با معتبرترین برندهای جهانی همکاری می‌کنیم تا بهترین کیفیت
              و تجربه را به شما ارائه دهیم
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-shield-check-line text-2xl text-white"></i>
              </div>
              <h3 className="text-lg font-bold mb-2">کیفیت تضمینی</h3>
              <p className="text-gray-600 text-sm">
                تمام محصولات دارای گارانتی اصالت
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-award-line text-2xl text-white"></i>
              </div>
              <h3 className="text-lg font-bold mb-2">برندهای برتر</h3>
              <p className="text-gray-600 text-sm">
                همکاری با معتبرترین برندهای جهان
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-price-tag-3-line text-2xl text-white"></i>
              </div>
              <h3 className="text-lg font-bold mb-2">قیمت مناسب</h3>
              <p className="text-gray-600 text-sm">بهترین قیمت‌ها در بازار</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-customer-service-2-line text-2xl text-white"></i>
              </div>
              <h3 className="text-lg font-bold mb-2">خدمات پس از فروش</h3>
              <p className="text-gray-600 text-sm">
                پشتیبانی کامل و مشاوره تخصصی
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
