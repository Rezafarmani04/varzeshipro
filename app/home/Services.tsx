"use client";

import { services } from "../constant";
import { motion } from "framer-motion";

export default function Services() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            چرا ورزشی پرو؟
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            ما متعهد به ارائه بهترین تجربه خرید و خدمات پس از فروش هستیم
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center group border-t-4 border-orange-500"
            >
              <div
                className={`w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-orange-600 transition-colors duration-300 `}
              >
                <i className={`${service.icon} text-3xl text-white`}></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <p className="text-sm text-gray-500 leading-relaxed">
                {service.details}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
