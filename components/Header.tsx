"use client";
import Image from "next/image";
import { motion } from "motion/react";

export default function Header() {
  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="border-b border-white/20"
    >
      <div className="max-w-7xl mx-auto px-4 py-4 md:py-6 flex items-center justify-between">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="text-xl font-bold cursor-pointer"
        >
          <span className="flex flex-col items-center">
            <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center">
              <Image
                src="/arcurate.png"
                alt="Arcurate"
                width={250}
                height={250}
                className="w-full h-full object-contain"
              />
            </div>
            <h1 className="text-xs tracking-wider">ARCURATE</h1>
          </span>
        </motion.div>
        <motion.button 
          onClick={() => document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" })}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white text-black px-4 py-2 md:px-6 md:py-2 text-sm md:text-base rounded-full font-medium hover:bg-gray-200 transition"
        >
          Join Waitlist
        </motion.button>
      </div>
    </motion.header>
  );
}
