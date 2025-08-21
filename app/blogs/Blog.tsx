import Image from "next/image";
import Header from "../_components/Header";
import Footer from "../_components/Footer";
import { posts } from "../constant";

export default function Blog() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />

      <section className="pt-24 pb-16 bg-gradient-to-br from-orange-500 to-red-600">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h1 className="text-5xl font-bold mb-6">مقالات ورزشی پرو</h1>
            <p className="text-xl opacity-90">
              مطالب آموزشی، راهنمای خرید و آخرین اخبار دنیای ورزش
            </p>
            <div className="flex justify-center mt-8 space-x-4 space-x-reverse">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <i className="ri-football-line text-2xl"></i>
              </div>
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <i className="ri-heart-pulse-line text-2xl"></i>
              </div>
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <i className="ri-t-shirt-line text-2xl"></i>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 sm:px-6 py-8">
        <h3 className="text-lg sm:text-xl font-bold mb-6">آخرین مقالات</h3>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
            >
              <div className="relative w-full h-48 sm:h-56 md:h-64">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
                <span className="absolute top-3 right-3 bg-orange-500 text-white px-2 py-1 rounded text-xs sm:text-sm">
                  {post.category}
                </span>
              </div>
              <div className="p-4">
                <h4 className="font-semibold text-base sm:text-lg mb-2">
                  {post.title}
                </h4>
                <div className="text-gray-500 text-xs sm:text-sm mb-2">
                  {post.author} • {post.date} • {post.readTime}
                </div>
                <div className="text-gray-500 text-xs sm:text-sm">
                  {post.views} بازدید
                </div>
                <button className="mt-3 text-orange-500 text-xs sm:text-sm font-semibold">
                  ادامه مطلب
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}
