"use client";


import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useEffect, useState } from "react";

export default function Hero() {
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: videoContainerRef,
    offset: ["start end", "center center"],
  });

  // Smoother animations with more refined values
  const width = useTransform(scrollYProgress, [0, 0.8, 1], ["60%", "75%", "95%"]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [200, 50, 0]);
  const borderRadius = useTransform(scrollYProgress, [0, 0.6, 1], ["50px", "40px", "20px"]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7], [0, 0.8, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 0.95, 1]);



  useEffect(() => {
    // Enhanced intersection observer with better options
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && videoRef.current && isVideoLoaded) {
            videoRef.current.play().catch(() => {
              // Ignore play errors
            });
          } else if (videoRef.current) {
            videoRef.current.pause();
          }
        });
      },
      { 
        threshold: 0.2,
        rootMargin: "0px 0px -50px 0px" // Start playing slightly before entering viewport
      }
    );

    if (videoContainerRef.current) {
      observer.observe(videoContainerRef.current);
    }

    return () => observer.disconnect();
  }, [isVideoLoaded]);

  return (
    <section className="border-b border-white/20 overflow-hidden flex flex-col items-center ">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 pt-16 flex flex-col items-center justify-center">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center flex flex-col items-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-block px-4 py-1.5 mb-6 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm"
          >
            <span className="text-xs sm:text-sm font-medium text-gray-300 tracking-wider uppercase">
              Professional Architecture
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-[1.1] tracking-tight"
          >
            Architecture {""}
            {/* <br /> */}
            <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
               Made Clear.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-gray-400 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed max-w-xl mx-auto"
          >
            Get professional architectural drawings, planning support, 3D
            visualisations, and project guidance for your next building project.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button className="px-8 py-4 bg-white text-black font-medium rounded-full hover:bg-gray-200 transition-all duration-300 hover:scale-105 active:scale-95">
              Get Started
            </button>
            <button className="px-8 py-4 border border-white/20 text-white font-medium rounded-full hover:bg-white/10 transition-all duration-300 hover:scale-105 active:scale-95">
              Learn More
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Video Reveal Section - Enhanced */}
      <div className="w-full flex justify-center mt-5 mb-16 h-[400px] sm:h-[500px] md:h-[70vh] lg:h-[85vh] px-4">
        <motion.div
          ref={videoContainerRef}
          style={{
            width,
            y,
            borderRadius,
            opacity,
            scale,
          }}
          className="relative overflow-hidden shadow-2xl shadow-black/50 will-change-transform"
        >
          {/* Video loading placeholder */}
          {!isVideoLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
              <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin" />
            </div>
          )}
          
          <video
            ref={videoRef}
            src="/arcurate_vid.mp4"
            muted
            loop
            playsInline
            onLoadedData={() => setIsVideoLoaded(true)}
            className="w-full h-full object-cover opacity-95"
          />

          {/* Gradient overlay on video */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
          
          {/* Video play indicator */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute bottom-8 left-8 flex items-center gap-3 text-white/60 text-sm"
          >
            <span className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-sm">
              ▶
            </span>
            <span>Watch our work in action</span>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 0.5 }}
            className="absolute bottom-8 right-8 text-white/40 text-xs tracking-wider uppercase hidden md:block"
          >
            Scroll to explore
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}