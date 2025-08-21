"use client";
import React from "react";

export default function ProductPageSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b shadow-sm bg-white">
        <div className="container mx-auto px-4 h-16 flex items-center">
          <div className="skeleton h-8 w-32"></div>
        </div>
      </div>

      <section className="pt-24 pb-16 bg-gradient-to-br from-gray-600 to-gray-700">
        <div className="container mx-auto px-4 text-center text-white">
          <div className="skeleton h-10 w-1/3 mx-auto mb-4"></div>
          <div className="skeleton h-6 w-1/2 mx-auto"></div>
          <div className="flex justify-center mt-8 gap-6">
            <div className="skeleton w-16 h-16 rounded-full"></div>
            <div className="skeleton w-16 h-16 rounded-full"></div>
            <div className="skeleton w-16 h-16 rounded-full"></div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 shadow-lg space-y-6">
                <div>
                  <div className="skeleton h-5 w-24 mb-3"></div>
                  <div className="space-y-2">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div
                        key={i}
                        className="skeleton h-8 w-full rounded-md"
                      ></div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="skeleton h-5 w-20 mb-3"></div>
                  <div className="grid grid-cols-3 gap-2">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div
                        key={i}
                        className="skeleton h-8 w-full rounded-md"
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="flex justify-between items-center mb-8">
                <div className="skeleton h-7 w-40"></div>
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
          </div>
        </div>
      </section>

      <div className="border-t bg-white mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="skeleton h-6 w-1/3 mx-auto"></div>
        </div>
      </div>
    </div>
  );
}
