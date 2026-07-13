"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";

const galleryImages = [
  {
    id: 1,
    src: "/img_two.png",
    alt: "Modern architectural design",
    title: "Design",
  },
  {
    id: 2,
    src: "/img_one.png",
    alt: "Architectural visualization",
    title: "Visualization",
  },
  //   {
  //   id: 3,
  //   src: "/img_two.png",
  //   alt: "Modern architectural design",
  //   title: "Design",
  // },
  // {
  //   id: 4,
  //   src: "/img_one.png",
  //   alt: "Architectural visualization",
  //   title: "Visualization",
  // },
//   {
//     id: 3,
//     src: "/managing.png",
//     alt: "Managing projects",
//     title: "Management",
//   },
//   {
//     id: 4,
//     src: "/understanding.png",
//     alt: "Understanding architecture",
//     title: "Planning",
//   },
];

export default function Gallery() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-20  border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-12 text-center md:text-left">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Our Portfolio
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl">
            Explore our latest architectural designs and visualizations.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 h-[600px] w-full">
          {galleryImages.map((image, index) => {
            const isActive = hoveredIndex === index;
            // On mobile, they stack vertically. On desktop, horizontally.
            // When none are hovered, they share space equally (flex-1).
            // When one is hovered, it expands significantly while others shrink.
            return (
              <motion.div
                key={image.id}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                animate={{
                  flex: hoveredIndex === null ? 1 : isActive ? 5 : 1,
                }}
                transition={{
                  duration: 0.5,
                  ease: [0.25, 0.1, 0.25, 1], // Smooth easing
                }}
                className={`relative overflow-hidden rounded-2xl cursor-pointer group flex-1 md:flex-auto h-full min-h-[100px]`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 80vw, 40vw"
                />
                
                {/* Overlay for inactive states to darken them slightly */}
                <motion.div 
                  animate={{
                    opacity: hoveredIndex !== null && !isActive ? 0.6 : 0.2
                  }}
                  className="absolute inset-0 bg-black transition-opacity duration-500"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <motion.div
                  animate={{
                    opacity: hoveredIndex === null ? 1 : isActive ? 1 : 0,
                    y: isActive ? 0 : 20
                  }}
                  className="absolute bottom-0 left-0 p-6 md:p-8"
                >
                  <h3 className="text-xl md:text-3xl font-bold text-white mb-2">
                    {image.title}
                  </h3>
                  {/* Subtle decorative line */}
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: isActive ? "40px" : "0px" }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="h-1 bg-white/80 rounded-full"
                  />
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
