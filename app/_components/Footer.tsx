"use client";

import Link from "next/link";

export default function Footer() {
  const productCategories = [
    { href: "/products/sport-shoes", label: "کفش ورزشی" },
    { href: "/products/sport-clothes", label: "لباس ورزشی" },
    { href: "/products/sport-equipment", label: "تجهیزات بدنسازی" },
    { href: "/products/sport-equipment", label: "ورزش‌های آبی" },
    { href: "/products/sport-balls", label: "ورزش‌های توپی" },
    { href: "/products/sport-equipment", label: "تجهیزات کوهنوردی" },
  ];

  const customerServices = [
    { href: "/about", label: "درباره ما" },
    { href: "/contact", label: "تماس با ما" },
    { href: "/contact", label: "روش‌های ارسال" },
    { href: "/contact", label: "ضمانت بازگشت" },
    { href: "/contact", label: "گارانتی محصولات" },
    { href: "/contact", label: "سوالات متداول" },
  ];

  const socialLinks = [
    { icon: "ri-instagram-line", href: "#" },
    { icon: "ri-telegram-line", href: "#" },
    { icon: "ri-whatsapp-line", href: "#" },
    { icon: "ri-youtube-line", href: "#" },
  ];

  const bottomLinks = [
    { href: "/privacy", label: "حریم خصوصی" },
    { href: "/terms", label: "قوانین و مقررات" },
    { href: "/sitemap", label: "نقشه سایت" },
  ];

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="space-y-6">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                <i className="ri-fire-fill text-white text-xl"></i>
              </div>
              <span className="text-2xl font-pacifico">ورزشی پرو</span>
            </Link>
            <p className="text-gray-400 leading-relaxed">
              بزرگترین فروشگاه آنلاین تجهیزات ورزشی با بیش از ۱۰ سال تجربه در
              ارائه بهترین محصولات ورزشی
            </p>
            <div className="flex space-x-4 space-x-reverse">
              {socialLinks.map(({ icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors duration-300"
                >
                  <i className={`${icon} text-lg`}></i>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6 text-orange-400">
              دسته‌بندی محصولات
            </h3>
            <ul className="space-y-3">
              {productCategories.map(({ href, label }, i) => (
                <li key={i}>
                  <Link
                    href={href}
                    className="text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-300 block"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6 text-orange-400">
              خدمات مشتریان
            </h3>
            <ul className="space-y-3">
              {customerServices.map(({ href, label }, i) => (
                <li key={i}>
                  <Link
                    href={href}
                    className="text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-300 block"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6 text-orange-400">
              اطلاعات تماس
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 space-x-reverse">
                <i className="ri-map-pin-line text-orange-400 text-xl mt-1"></i>
                <p className="text-gray-400">
                  تهران، میدان ولیعصر، خیابان کریمخان زند، پلاک ۱۲۳
                </p>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse">
                <i className="ri-phone-line text-orange-400 text-xl"></i>
                <p className="text-gray-400" dir="ltr">
                  021-88776655
                </p>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse">
                <i className="ri-mail-line text-orange-400 text-xl"></i>
                <p className="text-gray-400">varzeshipro@gmail.com</p>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse">
                <i className="ri-time-line text-orange-400 text-xl"></i>
                <div>
                  <p className="text-gray-400">
                    شنبه تا چهارشنبه: ۹:۰۰ - ۱۸:۰۰
                  </p>
                  <p className="text-gray-400">پنج‌شنبه: ۹:۰۰ - ۱۳:۰۰</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © ۱۴۰۳ ورزشی پرو. تمامی حقوق محفوظ است.
            </div>
            <div className="flex items-center space-x-6 space-x-reverse text-sm">
              {bottomLinks.map(({ href, label }, i) => (
                <Link
                  key={i}
                  href={href}
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
