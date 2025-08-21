"use client";
import React from "react";

export default function ProductDetailSkeleton() {
  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <div className="space-y-4">
          <div className="skeleton rounded-2xl w-full h-[550px]"></div>

          <div className="flex gap-4">
            <div className="skeleton w-20 h-20 rounded-lg"></div>
            <div className="skeleton w-20 h-20 rounded-lg"></div>
            <div className="skeleton w-20 h-20 rounded-lg"></div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="skeleton h-6 w-1/3 rounded-md"></div>
          <div className="skeleton h-9 w-full rounded-md"></div>
          <div className="skeleton h-5 w-1/4 rounded-md"></div>

          <div className="grid grid-cols-2 gap-4">
            <div className="skeleton h-10 rounded-md"></div>
            <div className="skeleton h-10 rounded-md"></div>
            <div className="skeleton h-10 rounded-md col-span-2"></div>
          </div>

          <div className="flex items-center gap-4">
            <div className="skeleton h-12 w-full rounded-md"></div>
            <div className="skeleton h-12 w-16 rounded-md"></div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="skeleton h-7 w-1/4 rounded-md mb-6"></div>
        <div className="space-y-3">
          <div className="skeleton h-4 w-full rounded-md"></div>
          <div className="skeleton h-4 w-5/6 rounded-md"></div>
          <div className="skeleton h-4 w-2/3 rounded-md"></div>
        </div>
      </div>
    </div>
  );
}
