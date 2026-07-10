"use client";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";

export default function SomethingBig() {
  return (
    <section className="border-b border-white/20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 py-16 md:py-20">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative overflow-hidden rounded-[32px] bg-[#1f1f1f] px-6 py-12 md:px-16 md:py-16"
        >
          {/* Background Circle */}
          <div className="absolute -top-20 -right-20 md:-top-24 md:-right-16 h-[250px] w-[250px] md:h-[340px] md:w-[340px] rounded-full bg-[#d9d9d9] opacity-20 md:opacity-100 transition-all" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-10">
            {/* Left */}
            <div className="max-w-3xl text-center lg:text-left">
              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xs font-semibold tracking-[0.25em] uppercase text-[#8b8175] mb-4"
              >
                Coming Soon
              </motion.p>

              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-3xl md:text-5xl font-bold text-white leading-tight mb-4 md:mb-6"
              >
                Something bigger is coming.
              </motion.h2>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-base md:text-lg text-gray-400 leading-relaxed max-w-2xl mx-auto lg:mx-0"
              >
                We&apos;re building a modern platform that makes architectural
                services more accessible, transparent, and efficient. Join the
                waitlist to get early access and exclusive updates.
              </motion.p>
            </div>

            {/* Right */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5, type: "spring" }}
              className="relative w-full lg:w-72 flex items-center justify-center shrink-0 mt-4 lg:mt-0"
            >
              <button 
                onClick={() => document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" })}
                className="z-20 bg-white text-black rounded-full px-8 py-4 font-semibold flex items-center gap-2 hover:scale-105 transition-transform w-full sm:w-auto justify-center"
              >
                Join the Waitlist
                <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
