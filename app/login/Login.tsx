"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import SecondaryHeader from "../_components/SecondaryHeader";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";

type LoginFormData = {
  email: string;
  password: string;
};

type ForgotFormData = {
  email: string;
};

export default function Login() {
  const [isForgotMode, setIsForgotMode] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormData & ForgotFormData>();

  const onSubmitLogin = async (data: LoginFormData) => {
    setError("");
    setMessage("");

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const json = await res.json();

    if (res.ok) {
      toast.success("ورود موفق!");
      window.location.href = "/";
    } else {
      toast.error(json.message || "ایمیل یا رمز عبور اشتباه است.");
      setError(json.message || "ایمیل یا رمز عبور اشتباه است.");
    }
  };

  const onSubmitForgot = async (data: ForgotFormData) => {
    setError("");
    setMessage("");

    const res = await fetch("/api/auth/request-password-reset", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: data.email }),
    });

    const json = await res.json();

    if (res.ok) {
      toast.success("لینک بازنشانی رمز عبور به ایمیل شما ارسال شد.");
      setMessage("لینک بازنشانی رمز عبور به ایمیل شما ارسال شد.");
      reset();
    } else {
      toast.error(json.message || "خطایی رخ داده است.");
      setError(json.message || "خطایی رخ داده است.");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <SecondaryHeader />
      <Toaster position="top-center" />

      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "url('https://readdy.ai/api/search-image?query=abstract%20athletic%20pattern%20with%20sports%20equipment%20silhouettes%20and%20geometric%20shapes%20in%20dynamic%20composition%20on%20dark%20background%20with%20orange%20accents%20for%20newsletter%20section&width=1200&height=600&seq=newsletter&orientation=landscape')",
        }}
      ></div>

      <div className="relative z-10 max-w-md w-full p-8 rounded-2xl bg-white/30 backdrop-blur-xl border border-white/40 shadow-2xl">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 drop-shadow">
          {isForgotMode ? "بازیابی رمز عبور" : "ورود"}
        </h2>

        <form
          onSubmit={handleSubmit(isForgotMode ? onSubmitForgot : onSubmitLogin)}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700">
              ایمیل
            </label>
            <input
              type="email"
              {...register("email", { required: "ایمیل الزامی است" })}
              className="mt-1 w-full px-4 py-2 rounded-md bg-white/60 border border-gray-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="ایمیل شما"
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">
                {errors.email.message as string}
              </p>
            )}
          </div>

          {!isForgotMode && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                رمز عبور
              </label>
              <input
                type="password"
                {...register("password", { required: "رمز عبور الزامی است" })}
                className="mt-1 w-full px-4 py-2 rounded-md bg-white/60 border border-gray-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="******"
              />
              {errors.password && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.password.message as string}
                </p>
              )}
            </div>
          )}

          {error && <p className="text-sm text-red-500 text-center">{error}</p>}
          {message && (
            <p className="text-sm text-green-600 text-center"></p>
          )}

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition font-semibold"
          >
            {isForgotMode ? "ارسال لینک بازنشانی" : "ورود"}
          </button>
        </form>

        <div className="mt-4 text-center">
          {isForgotMode ? (
            <button
              onClick={() => {
                setIsForgotMode(false);
                reset();
              }}
              className="text-sm text-orange-600 hover:underline"
            >
              بازگشت به ورود
            </button>
          ) : (
            <>
              <button
                onClick={() => {
                  setIsForgotMode(true);
                  reset();
                }}
                className="text-sm text-orange-600 hover:underline"
              >
                رمز عبور خود را فراموش کرده‌اید؟
              </button>
              <p className="mt-2 text-sm text-gray-700">
                حساب کاربری ندارید؟{" "}
                <Link
                  href="/signup"
                  className="text-orange-600 hover:underline"
                >
                  ثبت نام کنید
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
