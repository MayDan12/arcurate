"use client";
import React from "react";
import { motion, type Variants } from "motion/react";

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const item: Variants = {
  hidden: { opacity: 0, x: 20 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export default function SolutionSections() {
  return (
    <section className="border-b border-white/20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 py-16 md:py-20 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-[#1F1F1F] rounded-lg p-8 md:p-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
            Design from
            <br />
            concept to
            <br />
            construction
          </h2>
          <p className="text-gray-400 text-lg">
            Accurate simplifies the architectural process so clients can move
            from vision to documentation with confidence.
          </p>
        </motion.div>
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="space-y-4"
        >
          <motion.div variants={item} className="bg-white rounded-lg p-6 text-black">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center shrink-0 text-white font-bold">
                ●
              </div>
              <div>
                <h3 className="font-bold mb-1">Architectural Drawings</h3>
                <p className="text-gray-600 text-sm">
                  Floor plans, elevations, sections, and technical drawing
                  support.
                </p>
              </div>
            </div>
          </motion.div>
          <motion.div variants={item} className="bg-white rounded-lg p-6 text-black">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center shrink-0 text-white font-bold">
                ●
              </div>
              <div>
                <h3 className="font-bold mb-1">Planning & Permit Support</h3>
                <p className="text-gray-600 text-sm">
                  Guidance to help you prepare for approvals and documentation.
                </p>
              </div>
            </div>
          </motion.div>
          <motion.div variants={item} className="bg-white rounded-lg p-6 text-black">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center shrink-0 text-white font-bold">
                ●
              </div>
              <div>
                <h3 className="font-bold mb-1">3D Visualisations</h3>
                <p className="text-gray-600 text-sm">
                  See your project clearly before construction begins.
                </p>
              </div>
            </div>
          </motion.div>
          <motion.div variants={item} className="bg-white rounded-lg p-6 text-black">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center shrink-0 text-white font-bold">
                ●
              </div>
              <div>
                <h3 className="font-bold mb-1">Project Guidance</h3>
                <p className="text-gray-600 text-sm">
                  Expert advisory throughout the early building journey.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
