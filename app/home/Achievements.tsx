"use client";

import { motion } from "framer-motion";
import { achievements } from "../constant";

export default function Achievements() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            افتخارات و گواهینامه‌ها
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            مجوزها و گواهینامه‌هایی که اعتبار و کیفیت خدمات ما را تایید می‌کند
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center p-8 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-300 group"
            >
              <div
                className={`w-20 h-20 bg-${
                  achievement.color === "gold" ? "yellow" : achievement.color
                }-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                <i
                  className={`${achievement.icon} text-3xl text-${
                    achievement.color === "gold" ? "yellow" : achievement.color
                  }-500`}
                ></i>
              </div>
              <div className="text-lg font-bold text-orange-500 mb-2">
                {achievement.year}
              </div>
              <h3 className="font-bold mb-3 text-lg text-gray-900">
                {achievement.title}
              </h3>
              <p className="text-gray-600 text-sm">{achievement.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
