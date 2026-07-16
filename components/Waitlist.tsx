"use client";
import { Check } from "lucide-react";
import React, { useState } from "react";
import { motion } from "motion/react";

export default function Waitlist() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [help, setHelp] = useState("");
  const [country, setCountry] = useState("United Kingdom");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const nameParts = fullName.trim().split(" ");
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || "";

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email, help, country }),
      });

      if (res.ok) {
        setSubmitted(true);
        setFullName("");
        setEmail("");
        setHelp("");
        setCountry("United Kingdom");
        setTimeout(() => setSubmitted(false), 3000);
      } else {
        const data = await res.json();
        alert(data.error || "Failed to join waitlist.");
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <section id="waitlist" className="border-b border-white/20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 py-16 md:py-20 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {/* Left Column - Benefits */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-[#1F1F1F] rounded-lg p-6 md:p-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Reserve your spot.</h2>
          <p className="text-gray-400 text-lg md:text-xl mb-8">
            Tell us what you are planning to build and we&apos;ll keep you
            updated as Arcurate launches.
          </p>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center shrink-0 mt-1">
                <Check className="w-4 h-4 text-black" />
              </div>
              <p className="text-gray-300">
                Name and email only for fast signup
              </p>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center shrink-0 mt-1">
                <Check className="w-4 h-4 text-black" />
              </div>
              <p className="text-gray-300">Early access before public launch</p>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center shrink-0 mt-1">
                <Check className="w-4 h-4 text-black" />
              </div>
              <p className="text-gray-300">Exclusive architecture updates</p>
            </div>
          </div>
        </motion.div>

        {/* Right Column - Form */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="bg-[#1F1F1F] rounded-lg p-6 md:p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Full name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="John Doe"
                className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg focus:outline-none focus:border-white text-white placeholder-gray-600"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@example.com"
                className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg focus:outline-none focus:border-white text-white placeholder-gray-600"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Country</label>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full px-4 py-3 bg-black border border-white rounded-lg focus:outline-none focus:border-white text-white"
              >
                <option>United Kingdom</option>
                <option>United States</option>
                <option>Canada</option>
                <option>Australia</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                What are you planning to build?
              </label>
              <textarea
                value={help}
                onChange={(e) => setHelp(e.target.value)}
                placeholder="Tell us about your project..."
                className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg focus:outline-none focus:border-white text-white placeholder-gray-600 resize-none h-24"
                required
              />
            </div>
            <p className="text-xs text-white/50">
              By joining, you agree to receive launch updates from Arcurie. No
              spam.
            </p>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white text-black py-3 rounded-full font-medium hover:bg-gray-200 transition disabled:opacity-50"
            >
              {loading ? "Joining..." : submitted ? "Joined!" : "Join Waitlist"}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
