"use client";
import React from "react";
import { motion } from "motion/react";

export default function Footer() {
  return (
    <section className="bg-[#0a0a0a] py-15">
      <footer className="relative  overflow-hidden pt-20 md:pt-32 pb-10">
      {/* Background Text */}
      <motion.h2
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="
          absolute
          top-1/2 md:top-0
          left-1/2
          -translate-x-1/2
          -translate-y-1/2 md:-translate-y-0
          whitespace-nowrap
          text-[60px] sm:text-[200px] md:text-[200px] lg:text-[254px]
          font-extrabold
          uppercase
          leading-none
          text-transparent
          [-webkit-text-stroke:1px_rgba(255,255,255,0.08)]
          select-none
          pointer-events-none
        "
      >
        ARCURATE
      </motion.h2>

      {/* Footer content */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="relative z-10 max-w-7xl mx-auto px-6 mt-16 text-center text-gray-500 text-sm"
      >
       
        {/* <p>&copy; {new Date().getFullYear()} Arcurate. All rights reserved.</p> */}
      </motion.div>
    </footer>
    </section>
  );
}
