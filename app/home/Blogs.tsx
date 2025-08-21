"use client";

import Link from "next/link";
import OrangeButton from "../_components/OrangeButton";
import { useEffect, useState } from "react";
import { BlogPost } from "@prisma/client";

export default function Blogs() {
  const [blogPost, setBlogPost] = useState<BlogPost[]>([]);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const res = await fetch("/api/blogpost");
        const data = await res.json();
        setBlogPost(data);
      } catch (error) {
        console.error("خطا در دریافت نظرات:", error);
      }
    };

    fetchBlogPosts();
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
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            مقالات و راهنماها
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            آخرین مطالب و راهنماهای ورزشی را مطالعه کنید
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPost.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group border"
            >
              <div className="relative overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm">
                  {post.category}
                </div>
                <div className="absolute bottom-4 left-4 bg-black/60 text-white px-3 py-1 rounded-full text-xs">
                  {post.views.toLocaleString()} بازدید
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center space-x-2 space-x-reverse text-xs text-gray-500 mb-3">
                  <span>{post.author}</span>
                  <span>•</span>
                  <span>{formatRelativeTime(post.date)}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-orange-500 cursor-pointer transition-colors duration-300">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {post.tags.slice(0, 2).map((tag, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <button className="text-orange-500 hover:text-orange-600 font-medium whitespace-nowrap text-sm">
                    مطالعه بیشتر
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href={"/blogs"}>
            <OrangeButton>مشاهده همه مقالات</OrangeButton>
          </Link>
        </div>
      </div>
    </section>
  );
}
