"use client";

import { useState } from "react";
import Header from "../_components/Header";
import Footer from "../_components/Footer";
import { teamMembers } from "../constant";
import { timeline } from "../constant";
import { companyStats } from "../constant";
import { values } from "../constant";

const achievements = [
  {
    icon: "ri-trophy-line",
    title: "بیش از ۵۰ هزار مشتری راضی",
    desc: "در سراسر کشور",
    number: "50K+",
    color: "orange",
  },
  {
    icon: "ri-star-line",
    title: "رتبه یک فروش آنلاین",
    desc: "در حوزه ورزش",
    number: "#1",
    color: "blue",
  },
  {
    icon: "ri-award-line",
    title: "برترین فروشگاه سال ۱۴۰۲",
    desc: "از انجمن کسب و کار",
    number: "2023",
    color: "green",
  },
  {
    icon: "ri-shield-check-line",
    title: "ضمانت اصالت کالا",
    desc: "۱۰۰ درصد اورجینال",
    number: "100%",
    color: "purple",
  },
];

const services = [
  {
    icon: "ri-truck-line",
    title: "ارسال سریع",
    desc: "ارسال در کمتر از ۲۴ ساعت",
    details: "شبکه لجستیک پیشرفته با 10 انبار در سراسر کشور",
    color: "blue",
  },
  {
    icon: "ri-shield-check-line",
    title: "ضمانت اصالت",
    desc: "۱۰۰٪ اورجینال بودن کالا",
    details: "همکاری مستقیم با نمایندگی‌های رسمی برندها",
    color: "green",
  },
  {
    icon: "ri-customer-service-line",
    title: "پشتیبانی ۲۴/۷",
    desc: "آماده پاسخگویی در تمام ساعات",
    details: "تیم 50 نفره پشتیبانی با میانگین پاسخ کمتر از 2 دقیقه",
    color: "orange",
  },
  {
    icon: "ri-refresh-line",
    title: "تعویض آسان",
    desc: "امکان تعویض تا ۷ روز",
    details: "بدون هیچ شرط و قید و بازگشت 100% وجه",
    color: "purple",
  },
];

export default function About() {
  const [activeTab, setActiveTab] = useState("story");

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <section
        className="pt-24 pb-20 relative bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://res.cloudinary.com/dsvokiftm/image/upload/v1754817918/4fdcde40064166b7a620036cc966fafe_e03fid.jpg')`,
        }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-6xl font-bold mb-6">درباره ورزشی پرو</h1>
            <p className="text-2xl opacity-90 mb-8">
              بیش از ۲۰ سال تجربه در ارائه بهترین محصولات ورزشی
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
              {companyStats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-4"
                >
                  <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <i className={`${stat.icon} text-white text-xl`}></i>
                  </div>
                  <div className="text-3xl font-bold text-orange-400">
                    {stat.value}
                  </div>
                  <div className="text-sm opacity-80">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-center mb-16">
            <div className="bg-white rounded-xl p-2 shadow-lg w-full sm:w-auto">
              <div className="flex overflow-x-auto sm:overflow-visible space-x-2 space-x-reverse scrollbar-hide">
                {[
                  { id: "story", label: "داستان ما", icon: "ri-book-line" },
                  {
                    id: "mission",
                    label: "ماموریت و چشم‌انداز",
                    icon: "ri-eye-line",
                  },
                  { id: "values", label: "ارزش‌های ما", icon: "ri-heart-line" },
                  {
                    id: "timeline",
                    label: "سیر تحول",
                    icon: "ri-timeline-view",
                  },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-shrink-0 px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-all duration-300 whitespace-nowrap flex items-center space-x-1 sm:space-x-2 space-x-reverse text-sm sm:text-base ${
                      activeTab === tab.id
                        ? "bg-orange-500 text-white shadow-lg"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <i className={`${tab.icon} text-base sm:text-lg`}></i>
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="max-w-6xl mx-auto">
            {activeTab === "story" && (
              <div className="bg-white rounded-2xl p-12 shadow-lg">
                <h2 className="text-4xl font-bold mb-8 text-center">
                  داستان ورزشی پرو
                </h2>
                <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
                  <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
                    <p>
                      ورزشی پرو در سال ۱۳۸۳ با هدف ارائه بهترین محصولات ورزشی به
                      علاقه‌مندان ورزش تاسیس شد. آنچه به عنوان یک فروشگاه کوچک
                      در تهران با سرمایه اولیه 50 میلیون تومان آغاز شد، امروز به
                      یکی از بزرگ‌ترین زنجیره‌های فروش محصولات ورزشی در کشور با
                      گردش مالی بیش از 100 میلیارد تومان در سال تبدیل شده است.
                    </p>
                    <p>
                      طی این سال‌ها، ما همواره تلاش کرده‌ایم تا با ارائه محصولات
                      باکیفیت و خدمات مطلوب، اعتماد مشتریان را جلب کنیم. امروز
                      بیش از ۵۰ هزار مشتری راضی در سراسر کشور داریم و این
                      بزرگ‌ترین افتخار ما محسوب می‌شود. همچنین با بیش از 200
                      کارمند متخصص، 4 شعبه فعال و همکاری با 50+ برند معتبر
                      جهانی، رهبری بازار ورزش آنلاین ایران را در دست داریم.
                    </p>
                  </div>
                  <div className="relative">
                    <img
                      src="https://res.cloudinary.com/dsvokiftm/image/upload/v1754817876/3d4feffc6d3f3fb0825913009db39ebe_odgbam.jpg"
                      alt="محصولات ورزشی"
                      className="w-full h-80 object-cover object-top rounded-2xl shadow-lg"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                  <div className="text-center p-6 bg-orange-500 rounded-xl">
                    <div className="text-3xl font-bold text-white mb-2">
                      1383
                    </div>
                    <div className="font-medium mb-1 text-white">
                      تاسیس شرکت
                    </div>
                    <div className="text-sm text-orange-100">
                      آغاز یک رویای بزرگ
                    </div>
                  </div>
                  <div className="text-center p-6 bg-orange-500 rounded-xl">
                    <div className="text-3xl font-bold text-white mb-2">
                      1395
                    </div>
                    <div className="font-medium mb-1 text-white">
                      شروع فروش آنلاین
                    </div>
                    <div className="text-sm text-orange-100">
                      ورود به عصر دیجیتال
                    </div>
                  </div>
                  <div className="text-center p-6 bg-orange-500 rounded-xl">
                    <div className="text-3xl font-bold text-white mb-2">
                      1402
                    </div>
                    <div className="font-medium mb-1 text-white">
                      رهبری بازار
                    </div>
                    <div className="text-sm text-orange-100">
                      شماره یک ایران
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "mission" && (
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white rounded-2xl p-10 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center mb-8 mx-auto">
                    <i className="ri-fire-line text-3xl text-white"></i>
                  </div>
                  <h3 className="text-3xl font-bold mb-6 text-center">
                    ماموریت ما
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-lg text-center">
                    ماموریت ما ارائه بهترین محصولات ورزشی با کیفیت بالا و قیمت
                    مناسب به همه علاقه‌مندان ورزش است. ما می‌خواهیم فرهنگ ورزش
                    را در جامعه گسترش دهیم و به مردم کمک کنیم تا زندگی سالم‌تری
                    داشته باشند.
                  </p>
                </div>
                <div className="bg-white rounded-2xl p-10 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center mb-8 mx-auto">
                    <i className="ri-eye-line text-3xl text-white"></i>
                  </div>
                  <h3 className="text-3xl font-bold mb-6 text-center">
                    چشم‌انداز ما
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-lg text-center">
                    چشم‌انداز ما تبدیل شدن به برترین برند فروش محصولات ورزشی در
                    منطقه خاورمیانه است. ما می‌خواهیم در آینده نزدیک، نام ورزشی
                    پرو مترادف با کیفیت، اعتماد و نوآوری در ذهن همه ورزشکاران
                    باشد.
                  </p>
                </div>
              </div>
            )}

            {activeTab === "values" && (
              <div className="bg-white rounded-2xl p-12 shadow-lg">
                <h2 className="text-4xl font-bold mb-12 text-center">
                  ارزش‌های ما
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {values.map((value, index) => (
                    <div
                      key={index}
                      className="text-center p-6 rounded-2xl bg-gray-50 hover:bg-orange-50 transition-all duration-300 group"
                    >
                      <div
                        className={`w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-${value.color}-200 transition-colors duration-300 `}
                      >
                        <i className={`${value.icon} text-2xl text-white`}></i>
                      </div>
                      <h4 className="font-bold mb-2 text-lg">{value.title}</h4>
                      <p className="text-gray-600">{value.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "timeline" && (
              <div className="bg-white rounded-2xl p-12 shadow-lg">
                <h2 className="text-4xl font-bold mb-12 text-center">
                  سیر تحول ورزشی پرو
                </h2>
                <div className="relative">
                  <div className="absolute right-8 top-0 bottom-0 w-1 bg-orange-200"></div>
                  <div className="space-y-8">
                    {timeline.map((item, index) => (
                      <div key={index} className="relative flex items-start">
                        <div className="absolute right-4 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center z-10">
                          <div className="w-3 h-3 bg-white rounded-full"></div>
                        </div>
                        <div className="mr-20 bg-gray-50 p-8 rounded-xl flex-1 hover:bg-orange-50 transition-colors duration-300 border border-gray-100">
                          <div className="flex items-center space-x-4 space-x-reverse mb-4">
                            <span className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                              {item.year}
                            </span>
                            <h3 className="text-2xl font-bold">{item.title}</h3>
                          </div>
                          <p className="text-gray-700 mb-3 text-lg">
                            {item.desc}
                          </p>
                          <p className="text-sm text-gray-600 bg-white p-3 rounded-lg border-r-4 border-orange-200">
                            {item.details}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">
            چرا ورزشی پرو؟
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="text-center p-8 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-300 group border-2 border-transparent hover:border-orange-200"
              >
                <div
                  className={`w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-orange-600 transition-all duration-300`}
                >
                  <i className={`${service.icon} text-3xl text-white`}></i>
                </div>
                <h3 className="font-bold mb-3 text-xl">{service.title}</h3>
                <p className="text-gray-600 mb-2">{service.desc}</p>
                <p className="text-sm text-gray-500">{service.details}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">
            افتخارات و دستاوردها
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="text-center p-8 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 group border-t-4 border-orange-500"
              >
                <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-orange-200 transition-colors duration-300 group-hover:scale-110">
                  <i
                    className={`${achievement.icon} text-3xl text-orange-500`}
                  ></i>
                </div>
                <div className="text-3xl font-bold text-orange-500 mb-2">
                  {achievement.number}
                </div>
                <h3 className="font-bold mb-2 text-lg">{achievement.title}</h3>
                <p className="text-gray-600">{achievement.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">تیم مدیریت</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              افرادی متخصص و باتجربه که پیشرفت و موفقیت ورزشی پرو را رقم می‌زنند
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer border"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover object-top group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-4 left-4 right-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <div className="flex space-x-2 space-x-reverse">
                      <a
                        href={member.social.linkedin}
                        className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center text-blue-600 hover:bg-white transition-colors"
                      >
                        <i className="ri-linkedin-fill text-sm"></i>
                      </a>
                      <a
                        href={member.social.email}
                        className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center text-red-600 hover:bg-white transition-colors"
                      >
                        <i className="ri-mail-fill text-sm"></i>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                  <p className="text-orange-500 font-medium mb-2">
                    {member.position}
                  </p>
                  <p className="text-gray-600 text-sm mb-3">
                    {member.experience}
                  </p>
                  <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                    {member.bio}
                  </p>

                  <div className="border-t pt-4 space-y-2">
                    <div className="text-xs text-gray-600">
                      <strong>تحصیلات:</strong> {member.education}
                    </div>
                    <div className="text-xs text-gray-600">
                      <strong>دستاوردها:</strong>
                      <ul className="mt-1 space-y-1">
                        {member.achievements.map((achievement, idx) => (
                          <li
                            key={idx}
                            className="flex items-center space-x-2 space-x-reverse"
                          >
                            <i className="ri-award-line text-orange-500 text-xs"></i>
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
