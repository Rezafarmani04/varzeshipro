"use client";

import { useState, useEffect, useRef } from "react";
import OrangeButton from "../_components/OrangeButton";

export default function NewsletterSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setEmail("");
      setTimeout(() => setIsSubmitted(false), 3000);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-gray-900 relative overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "url('https://readdy.ai/api/search-image?query=abstract%20athletic%20pattern%20with%20sports%20equipment%20silhouettes%20and%20geometric%20shapes%20in%20dynamic%20composition%20on%20dark%20background%20with%20orange%20accents%20for%20newsletter%20section&width=1200&height=600&seq=newsletter&orientation=landscape')",
        }}
      ></div>

      <div className="container mx-auto px-4 relative z-10">
        <div
          className={`text-center max-w-3xl mx-auto transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="mb-8">
            <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 transform hover:rotate-12 transition-transform duration-300">
              <i className="ri-mail-line text-3xl text-white"></i>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              عضویت در خبرنامه
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              از جدیدترین محصولات، تخفیف‌های ویژه و اخبار ورزشی باخبر شوید
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col md:flex-row gap-4 max-w-md mx-auto"
            >
              <div className="flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="آدرس ایمیل شما"
                  className="w-full px-6 py-4 rounded-xl border-0 bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 backdrop-blur-sm"
                  required
                />
              </div>
              <OrangeButton type="submit">عضویت</OrangeButton>
            </form>

            {isSubmitted && (
              <div className="mt-4 p-4 bg-green-500/20 border border-green-500/30 rounded-xl">
                <p className="text-green-300 font-semibold">
                  ✅ با موفقیت در خبرنامه عضو شدید!
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/20">
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <i className="ri-gift-line text-xl text-orange-400"></i>
                </div>
                <h4 className="text-white font-semibold mb-2">
                  تخفیف‌های ویژه
                </h4>
                <p className="text-gray-400 text-sm">
                  اولین نفری باشید که از تخفیف‌ها باخبر می‌شوید
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <i className="ri-star-line text-xl text-orange-400"></i>
                </div>
                <h4 className="text-white font-semibold mb-2">محصولات جدید</h4>
                <p className="text-gray-400 text-sm">
                  زودتر از همه محصولات تازه را ببینید
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <i className="ri-trophy-line text-xl text-orange-400"></i>
                </div>
                <h4 className="text-white font-semibold mb-2">مطالب ورزشی</h4>
                <p className="text-gray-400 text-sm">
                  راهنماها و نکات ورزشی مفید دریافت کنید
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-20 right-10 w-6 h-6 bg-orange-500 rounded-full opacity-20 animate-bounce"></div>
      <div
        className="absolute bottom-20 left-10 w-4 h-4 bg-orange-500 rounded-full opacity-30 animate-bounce"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute top-1/2 left-20 w-2 h-2 bg-orange-500 rounded-full opacity-40 animate-bounce"
        style={{ animationDelay: "2s" }}
      ></div>
    </section>
  );
}
