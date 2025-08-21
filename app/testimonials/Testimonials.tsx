"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  avatar: string;
  comment: string;
  rating: number;
  product: string;
  date: string;
  verified: boolean;
}

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [form, setForm] = useState({
    name: "",
    role: "",
    avatar: "",
    comment: "",
    rating: 5,
    product: "",
    verified: false,
  });

  useEffect(() => {
    fetch("/api/testimonials")
      .then((res) => res.json())
      .then((data) => setTestimonials(data));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/testimonials", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      const newTestimonial = await res.json();
      setTestimonials([newTestimonial, ...testimonials]);
      setForm({
        name: "",
        role: "",
        avatar: "",
        comment: "",
        rating: 5,
        product: "",
        verified: false,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <h1 className="text-3xl font-bold text-center text-orange-600 mb-10">
        نظرات کاربران
      </h1>

      <div className="grid gap-6 md:grid-cols-3">
        {testimonials.map((t) => (
          <div
            key={t.id}
            className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition"
          >
            <Image
              src={t.avatar}
              alt={t.name}
              width={80}
              height={80}
              className="rounded-full object-cover"
            />
            <div className="mt-3 flex items-center space-x-1 space-x-reverse">
              <h2 className="font-bold text-lg">{t.name}</h2>
              {t.verified && (
                <i className="ri-verified-badge-fill text-blue-500"></i>
              )}
            </div>
            <p className="text-sm text-gray-500">{t.role}</p>
            <div className="flex text-yellow-400 my-2">
              {[...Array(t.rating)].map((_, i) => (
                <i key={i} className="ri-star-fill"></i>
              ))}
            </div>
            <p className="text-gray-700 leading-relaxed">{t.comment}</p>
            <span className="mt-3 text-sm text-gray-400">
              {new Date(t.date).toLocaleDateString("fa-IR")}
            </span>
            <span className="mt-2 text-orange-600 font-semibold text-sm">
              خرید: {t.product}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-white rounded-2xl shadow-lg p-6 max-w-lg mx-auto">
        <h2 className="text-xl font-bold mb-4 text-orange-600">ثبت نظر جدید</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="نام"
            className="w-full p-2 border rounded-lg"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="نقش"
            className="w-full p-2 border rounded-lg"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          />
          <textarea
            placeholder="نظر شما"
            className="w-full p-2 border rounded-lg"
            value={form.comment}
            onChange={(e) => setForm({ ...form, comment: e.target.value })}
          ></textarea>
          <input
            type="text"
            placeholder="محصول خریداری شده"
            className="w-full p-2 border rounded-lg"
            value={form.product}
            onChange={(e) => setForm({ ...form, product: e.target.value })}
          />
          <select
            className="w-full p-2 border rounded-lg"
            value={form.rating}
            onChange={(e) =>
              setForm({ ...form, rating: Number(e.target.value) })
            }
          >
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num} ستاره
              </option>
            ))}
          </select>
          <label className="flex items-center space-x-2 space-x-reverse">
            <input
              type="checkbox"
              checked={form.verified}
              onChange={(e) => setForm({ ...form, verified: e.target.checked })}
            />
            <span>کاربر تایید شده</span>
          </label>
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition"
          >
            ارسال نظر
          </button>
        </form>
      </div>
    </div>
  );
}
