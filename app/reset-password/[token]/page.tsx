"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import * as React from "react";

type ResetPasswordProps = {
  params: Promise<{ token: string }>;
};

export default function ResetPasswordPage({ params }: ResetPasswordProps) {
  const router = useRouter();
  const { token } = React.use(params);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (password !== confirmPassword) {
      setError("رمز عبور و تکرار آن مطابقت ندارند.");
      return;
    }

    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    });

    const json = await res.json();

    if (res.ok) {
      setMessage("رمز عبور شما با موفقیت تغییر کرد!");
      setTimeout(() => router.push("/login"), 2000);
    } else {
      setError(json.message || "خطایی رخ داده است.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          بازنشانی رمز عبور
        </h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {message && (
          <p className="text-green-600 text-center mb-4">{message}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            placeholder="رمز عبور جدید"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-orange-400"
          />
          <input
            type="password"
            placeholder="تکرار رمز عبور جدید"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-orange-400"
          />

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition"
          >
            تغییر رمز عبور
          </button>
        </form>
      </div>
    </div>
  );
}
