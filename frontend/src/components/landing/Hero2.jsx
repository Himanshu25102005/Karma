"use client";

import React from "react";
import { motion } from "framer-motion";
import { Tiro_Devanagari_Sanskrit, Poppins } from "next/font/google";

const tiro = Tiro_Devanagari_Sanskrit({
  weight: "400",
  subsets: ["devanagari", "latin"],
});

const poppins = Poppins({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
});

const Hero2 = () => {
  return (
    <section className="relative w-full overflow-hidden bg-[#0F0F0E]">
      <div className=" mx-auto flex min-h-[80dvh] w-full max-w-[1800px] flex-col items-center justify-center px-5 py-24 sm:px-8 md:px-12 lg:px-16 xl:px">
        {/* ================= SANSKRIT ================= */}

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className={` ${tiro.className} max-w-[1500px] text-center text-[clamp(2.5rem,7vw,7.5rem)] font-normal leading-[1.15] tracking-[-0.035em] text-[#E6E3DA]`}
        >
          कर्मण्येवाधिकारस्ते मा{" "}
          <span className="text-[#D9A928]">फलेषु कदाचन।</span>
          <br />
          मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥
        </motion.h1>

        {/* ================= TRANSLATION ================= */}

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{
            duration: 0.7,
            delay: 0.18,
            ease: [0.22, 1, 0.36, 1],
          }}
          className={` ${poppins.className} mt-10 max-w-[620px] text-center text-sm leading-6 text-white/45 sm:mt-12 sm:text-base sm:leading-7`}
        >
          Your right is to the action, not the outcome.
          <br />
          <span className="text-white/55">
            कARMA tracks your sessions, tasks, and consistency, and shows you
            how you actually work. Track your effort, not your results.
          </span>
        </motion.p>
        {/* ================= CTA ================= */}

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 0.7,
            delay: 0.3,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-9 sm:mt-10"
        >
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 25,
            }}
            className={`${poppins.className} group relative isolate flex h-14 items-center justify-center gap-3 overflow-hidden rounded-[12px] border border-white/20 px-7 text-sm font-medium text-white`}
          >
            {/* Diagonal fill */}
            <span
              aria-hidden
              className="pointer-events-none absolute -bottom-[75%] -left-[75%] h-[250%] w-[250%] rotate-45 scale-0 bg-[#D9A928] transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:scale-100"
            />

            <span className="relative z-10 transition-colors duration-300 group-hover:text-[#050505]">
              Start Tracking
            </span>

            <span className="relative z-10 text-lg text-white/50 transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#050505]">
              →
            </span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero2;
