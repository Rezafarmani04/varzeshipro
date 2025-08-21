"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import SecondaryHeader from "../_components/SecondaryHeader";
import Link from "next/link";

type RegisterFormData = {
  name: string;
  email: string;
  password: string;
};

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const [userId, setUserId] = useState<string | null>(null);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const onSubmit = async (data: RegisterFormData) => {
    setError("");
    const res = await fetch("/api/auth/request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const json = await res.json();
    if (res.ok) {
      setUserId(json.email);
    } else {
      setError(json.message || "خطا در ثبت‌نام");
    }
  };

  const handleVerify = async () => {
    setError("");
    if (!userId) {
      setError("ایمیل کاربر مشخص نیست.");
      return;
    }

    const res = await fetch("/api/auth/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: userId, code }),
    });

    const json = await res.json();
    if (res.ok) {
      alert("✅ حساب شما تأیید شد!");
      window.location.href = "/";
    } else {
      setError(json.message || "کد نامعتبر است");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <SecondaryHeader />
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "url('https://readdy.ai/api/search-image?query=abstract%20athletic%20pattern%20with%20sports%20equipment%20silhouettes%20and%20geometric%20shapes%20in%20dynamic%20composition%20on%20dark%20background%20with%20orange%20accents%20for%20newsletter%20section&width=1200&height=600&seq=newsletter&orientation=landscape')",
        }}
      ></div>
      <div
        className="relative z-10 max-w-md w-full p-6 rounded-2xl shadow-xl
          bg-white/40 backdrop-blur-xl border border-white/60 text-gray-800"
      >
        <h2 className="text-2xl font-bold mb-6 text-center drop-shadow-sm">
          {userId ? "تأیید حساب" : "ثبت‌نام"}
        </h2>

        {!userId ? (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">نام</label>
              <input
                type="text"
                {...register("name", { required: "نام الزامی است" })}
                className="mt-1 w-full px-4 py-2 rounded-md bg-white/60 border border-gray-300 
                           text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="نام شما"
              />
              {errors.name && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium">ایمیل</label>
              <input
                type="email"
                {...register("email", { required: "ایمیل الزامی است" })}
                className="mt-1 w-full px-4 py-2 rounded-md bg-white/60 border border-gray-300 
                           text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="ایمیل شما"
              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium">رمز عبور</label>
              <input
                type="password"
                {...register("password", {
                  required: "رمز عبور الزامی است",
                  minLength: { value: 6, message: "حداقل ۶ کاراکتر" },
                })}
                className="mt-1 w-full px-4 py-2 rounded-md bg-white/60 border border-gray-300 
                           text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="******"
              />
              {errors.password && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-2 rounded-md 
                         hover:bg-orange-600 transition font-semibold"
            >
              ثبت‌نام
            </button>
          </form>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-gray-700 text-center">
              کد تأیید ۶ رقمی به ایمیل شما ارسال شد.
            </p>

            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="کد تأیید"
              className="w-full px-4 py-2 rounded-md bg-white/60 border border-gray-300 
                         text-gray-800 text-center placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400"
            />

            {error && (
              <p className="text-sm text-red-500 text-center">{error}</p>
            )}

            <button
              onClick={handleVerify}
              className="w-full bg-green-600 text-white py-2 rounded-md 
                         hover:bg-green-700 transition font-semibold"
            >
              تأیید کد
            </button>
          </div>
        )}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-700">
            حساب کاربری دارید؟{" "}
            <Link href="/login" className="text-orange-600 hover:underline">
              وارد شوید
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
