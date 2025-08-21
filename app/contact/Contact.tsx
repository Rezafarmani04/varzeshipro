"use client";

import { useState } from "react";
import Header from "../_components/Header";
import Footer from "../_components/Footer";
import { branches, contactMethods, faqs } from "../constant";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = "نام الزامی است";
    }

    if (!formData.email.trim()) {
      newErrors.email = "ایمیل الزامی است";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "ایمیل معتبر نیست";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "شماره تماس الزامی است";
    } else if (!/^[\d\-\+\s\(\)]+$/.test(formData.phone)) {
      newErrors.phone = "شماره تماس معتبر نیست";
    }

    if (!formData.subject) {
      newErrors.subject = "موضوع الزامی است";
    }

    if (!formData.message.trim()) {
      newErrors.message = "پیام الزامی است";
    } else if (formData.message.length > 500) {
      newErrors.message = "پیام نمی‌تواند بیش از ۵۰۰ کاراکتر باشد";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    setSubmitted(true);
    setIsSubmitting(false);

    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <section
        className="pt-24 pb-20 relative bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://res.cloudinary.com/dsvokiftm/image/upload/v1754823153/92a90c0b2fd6c7ee5164f5a0f1c85c92_j6ef5y.jpg')`,
        }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-6xl font-bold mb-6">تماس با ما</h1>
            <p className="text-xl opacity-90 mb-8">
              ما همیشه آماده پاسخگویی به سوالات شما هستیم
            </p>
            <div className="flex justify-center space-x-4 space-x-reverse">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
                <span className="text-sm">پاسخگویی ۲۴ ساعته</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
                <span className="text-sm">مشاوره رایگان</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
                <span className="text-sm">خدمات پس از فروش</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {contactMethods.map((method, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center group border-t-4 border-orange-500"
              >
                <div
                  className={`w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-${method.color}-600 transition-colors duration-300 `}
                >
                  <i className={`${method.icon} text-3xl text-white`}></i>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">
                  {method.title}
                </h3>
                <p className="font-semibold text-gray-900 mb-2 text-lg">
                  {method.info}
                </p>
                <p className="text-gray-600">{method.desc}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div>
              <div className="mb-8">
                <h2 className="text-4xl font-bold mb-4">فرم تماس</h2>
                <p className="text-gray-600">
                  سوال یا پیشنهادی دارید؟ ما اینجا هستیم تا کمک کنیم
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                className="space-y-6"
                id="contact-form"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      نام و نام خانوادگی *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200 ${
                        errors.name ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="نام خود را وارد کنید"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ایمیل *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200 ${
                        errors.email ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="ایمیل خود را وارد کنید"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      شماره تماس *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200 ${
                        errors.phone ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="شماره تماس خود را وارد کنید"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      موضوع *
                    </label>
                    <select
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200 pr-8 ${
                        errors.subject ? "border-red-500" : "border-gray-300"
                      }`}
                    >
                      <option value="">موضوع را انتخاب کنید</option>
                      <option value="product-inquiry">استعلام محصول</option>
                      <option value="order-status">وضعیت سفارش</option>
                      <option value="complaint">شکایت</option>
                      <option value="suggestion">پیشنهاد</option>
                      <option value="warranty">ضمانت و گارانتی</option>
                      <option value="partnership">همکاری</option>
                      <option value="other">سایر</option>
                    </select>
                    {errors.subject && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.subject}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    پیام *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={6}
                    maxLength={500}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200 ${
                      errors.message ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="پیام خود را اینجا بنویسید..."
                  ></textarea>
                  <div className="flex justify-between mt-1">
                    {errors.message && (
                      <p className="text-red-500 text-xs">{errors.message}</p>
                    )}
                    <p
                      className={`text-xs ${
                        formData.message.length > 450
                          ? "text-red-500"
                          : "text-gray-500"
                      }`}
                    >
                      {formData.message.length}/500 کاراکتر
                    </p>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || formData.message.length > 500}
                  className="w-full bg-orange-500 text-white py-4 rounded-lg hover:bg-orange-600 disabled:bg-gray-400 transition-colors duration-300 font-medium whitespace-nowrap flex items-center justify-center space-x-2 space-x-reverse"
                >
                  {isSubmitting && (
                    <i className="ri-loader-4-line animate-spin"></i>
                  )}
                  <span>
                    {isSubmitting
                      ? "در حال ارسال..."
                      : submitted
                      ? "پیام ارسال شد!"
                      : "ارسال پیام"}
                  </span>
                </button>

                {submitted && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-green-800 animate-fadeIn">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <i className="ri-check-circle-line text-green-500 text-xl"></i>
                      <span>
                        پیام شما با موفقیت ارسال شد. به زودی با شما تماس خواهیم
                        گرفت.
                      </span>
                    </div>
                  </div>
                )}
              </form>
            </div>

            <div>
              <div className="mb-8">
                <h2 className="text-4xl font-bold mb-4">شعب ما</h2>
                <p className="text-gray-600">در سراسر کشور در خدمت شما هستیم</p>
              </div>

              <div className="space-y-6">
                {branches.map((branch, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-r-4 border-orange-500"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-2xl font-bold text-orange-500">
                        {branch.city}
                      </h3>
                      <div className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm">
                        {branch.area}
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3 space-x-reverse">
                        <i className="ri-map-pin-line text-gray-500 mt-1 text-lg"></i>
                        <p className="text-gray-600 flex-1">{branch.address}</p>
                      </div>
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <i className="ri-phone-line text-gray-500 text-lg"></i>
                        <p className="text-gray-600">{branch.phone}</p>
                      </div>
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <i className="ri-user-line text-gray-500 text-lg"></i>
                        <p className="text-gray-600">
                          مدیر شعبه: {branch.manager}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">سوالات متداول</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              پاسخ سوالات رایج شما را در اینجا بیابید
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {faqs.map((faq, index) => (
              <div key={index} className="mb-4">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full bg-gray-50 hover:bg-gray-100 p-6 rounded-lg text-right flex justify-between items-center transition-colors duration-200"
                >
                  <span className="font-medium text-gray-900">
                    {faq.question}
                  </span>
                  <i
                    className={`ri-arrow-${
                      openFaq === index ? "up" : "down"
                    }-s-line text-orange-500 text-xl transition-transform duration-200`}
                  ></i>
                </button>
                {openFaq === index && (
                  <div className="bg-white p-6 border-r-4 border-orange-500 animate-fadeIn">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-8">
            موقعیت مکانی شعبه مرکزی
          </h2>
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
              <div className="h-96">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.6419616988047!2d51.4220!3d35.7219!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzXCsDQzJzE4LjgiTiA1McKwMjUnMTkuMiJF!5e0!3m2!1sen!2s!4v1234567890123"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
              <div className="p-6 bg-gradient-to-r from-orange-500 to-red-500 text-white">
                <div className="flex items-center space-x-4 space-x-reverse">
                  <i className="ri-map-pin-fill text-2xl"></i>
                  <div>
                    <h3 className="font-bold text-lg">شعبه مرکزی تهران</h3>
                    <p className="opacity-90">خیابان ولیعصر، پلاک ۱۲۳</p>
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
