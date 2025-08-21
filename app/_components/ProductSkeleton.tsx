"use client";
import React from "react";

export default function ProductSkeleton() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex justify-between items-center mb-8">
        <div className="skeleton h-8 w-40 rounded-md"></div>
        <div className="skeleton h-10 w-32 rounded-md"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            <div className="skeleton h-64 w-full"></div>
            <div className="p-6 space-y-4">
              <div className="skeleton h-5 w-2/3"></div>
              <div className="skeleton h-6 w-1/2"></div>
              <div className="flex gap-2">
                <div className="skeleton h-4 w-12 rounded"></div>
                <div className="skeleton h-4 w-12 rounded"></div>
                <div className="skeleton h-4 w-12 rounded"></div>
              </div>
              <div className="skeleton h-10 w-full rounded-md"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
