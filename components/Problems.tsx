"use client";
import Image from "next/image";
import React from "react";
import { motion, type Variants } from "motion/react";

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

export default function Problems() {
  return (
    <section className="border-b border-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 py-16 md:py-20">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl md:text-6xl font-bold mb-4 md:mb-6"
        >
          Building projects can feel confusing.
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-gray-400 text-lg md:text-xl mb-12 max-w-2xl"
        >
          Many people start construction without clear drawings, trusted
          guidance, or a proper understanding of what comes next.
        </motion.p>
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <motion.div variants={item} className="bg-white rounded-lg p-6 md:p-8 text-black">
            <div className="w-16 h-16 rounded-lg mb-6 flex items-center justify-center">
              <Image
                src="/trusted.png"
                alt="Architects icon"
                width={64}
                height={64}
                className="w-full h-full object-contain"
              />
            </div>
            <h3 className="text-xl font-bold mb-3">
              Finding trusted architects
            </h3>
            <p className="text-gray-600">
              It can be difficult to know who to trust with your design and
              documentation.
            </p>
          </motion.div>
          <motion.div variants={item} className="bg-white rounded-lg p-6 md:p-8 text-black">
            <div className="w-16 h-16 rounded-lg mb-6 flex items-center justify-center">
              <Image
                src="/understanding.png"
                alt="Drawings icon"
                width={64}
                height={64}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-bold mb-3">Understanding drawings</h3>
            <p className="text-gray-600">
              Floor plans, elevations, and technical documents often feel
              overwhelming.
            </p>
          </motion.div>
          <motion.div variants={item} className="bg-white rounded-lg p-6 md:p-8 text-black">
            <div className="w-16 h-16 rounded-lg mb-6 flex items-center justify-center">
              <Image
                src="/managing.png"
                alt="Expectations icon"
                width={64}
                height={64}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-bold mb-3">Managing expectations</h3>
            <p className="text-gray-600">
              Without clear guidance, cost, scope, and construction outcomes can
              become unclear.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
