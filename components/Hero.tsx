"use client";

import Image from "next/image";
import { motion } from "motion/react";

export default function Hero() {
  return (
    <section className="border-b border-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 py-16 md:py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center md:text-left order-1 md:order-1"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
          >
            Architecture
            <br />
            Made Clear.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="text-gray-400 text-lg md:text-2xl leading-relaxed"
          >
            Get professional architectural drawings, planning support, 3D
            visualisations, and project guidance for your next building project.
          </motion.p>
        </motion.div>

        {/* Images */}
        <div className="relative h-[450px] sm:h-[500px] md:h-[600px] w-full order-2 md:order-2 mt-8 md:mt-0">
          {/* Top Image */}
          <motion.div
            initial={{ opacity: 0, x: 20, y: -20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="absolute top-0 left-0 w-[75%] md:w-[70%] lg:w-[440px] h-[280px] md:h-[340px] lg:h-[380px] rounded-2xl overflow-hidden z-20 shadow-2xl"
          >
            <Image
              src="/hero_one.png"
              alt="Architecture"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 75vw, (max-width: 1200px) 50vw, 40vw"
            />
          </motion.div>

          {/* Bottom Image */}
          <motion.div
            initial={{ opacity: 0, x: -20, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
            className="absolute top-36 sm:top-48 md:top-56 right-0 w-[75%] md:w-[80%] lg:w-[480px] h-[260px] md:h-[320px] lg:h-[360px] rounded-2xl overflow-hidden z-10 shadow-xl"
          >
            <Image
              src="/hero_two.png"
              alt="Architecture"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 75vw, (max-width: 1200px) 50vw, 40vw"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
