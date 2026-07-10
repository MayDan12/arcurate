"use client";

import { useState } from "react";
import Image from "next/image";
import { Check, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Waitlist from "@/components/Waitlist";
import Problems from "@/components/Problems";
import SolutionSections from "@/components/SolutionSections";
import Gallery from "@/components/Gallery";
import SomethingBig from "@/components/Somethingbig";
import Footer from "@/components/Footer";


export default function Home() {
  return (
    <main className="bg-[#0a0a0a] text-white overflow-hidden">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <Hero />

           {/* Gallery Section */}
      <Gallery />

      {/* Waitlist Section */}
      <Waitlist />

      {/* Problems Section */}
      <Problems />

      {/* Solutions Section */}
      <SolutionSections />

 

      {/* CTA Section */}
     <SomethingBig />

      {/* Footer */}
      <Footer/>
    </main>
  );
}
