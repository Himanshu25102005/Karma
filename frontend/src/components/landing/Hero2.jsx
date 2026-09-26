"use client";

import React, { useState } from "react";
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

// Split the shloka into words so each one can reveal independently
const line1 = ["कर्मण्येवाधिकारस्ते", "मा"];
const line1Highlight = ["फलेषु", "कदाचन।"];
const line2 = ["मा", "कर्मफलहेतुर्भूर्मा", "ते", "सङ्गोऽस्त्वकर्मणि॥"];

const wordVariants = {
  hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.1,
    },
  },
};

const Word = ({ children, highlight = false }) => (
  <motion.span
    variants={wordVariants}
    className={`inline-block ${highlight ? "text-[#D9A928]" : "text-[#EDEAE0]"}`}
  >
    {children}
  </motion.span>
);

const Hero2 = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <section className="relative w-full overflow-hidden bg-[#0F0F0E]">
      {/* subtle ambient glow behind the text — adds depth without a hard gradient */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[500px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D9A928]/[0.04] blur-[120px]" />

      <div className="relative mx-auto flex min-h-[85dvh] w-full max-w-[1800px] flex-col items-center justify-center px-5 py-24 sm:px-8 md:px-12 lg:px-16">
        {/* ================= SANSKRIT ================= */}

        <motion.h1
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={containerVariants}
          className={`${tiro.className} max-w-[1400px] text-center text-[clamp(2.2rem,5.6vw,5.75rem)] font-normal leading-[1.35] tracking-[-0.02em]`}
        >
          <span className="block">
            {line1.map((w, i) => (
              <React.Fragment key={i}>
                <Word>{w}</Word>{" "}
              </React.Fragment>
            ))}
            {line1Highlight.map((w, i) => (
              <React.Fragment key={i}>
                <Word highlight>{w}</Word>{" "}
              </React.Fragment>
            ))}
          </span>
          <span className="mt-2 block">
            {line2.map((w, i) => (
              <React.Fragment key={i}>
                <Word>{w}</Word>{" "}
              </React.Fragment>
            ))}
          </span>
        </motion.h1>

        {/* ================= TRANSLATION ================= */}

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{
            duration: 0.7,
            delay: 0.95,
            ease: [0.22, 1, 0.36, 1],
          }}
          className={`${poppins.className} mt-12 max-w-[600px] text-center text-sm leading-6 text-white/45 sm:mt-14 sm:text-base sm:leading-7`}
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
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 0.7,
            delay: 1.1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-10 sm:mt-12"
        >
          <motion.button
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className={`${poppins.className} relative isolate flex h-14 items-center justify-center gap-3 overflow-hidden rounded-[12px] border border-white/20 px-7 text-sm font-medium`}
          >
            {/* Diagonal fill — state-driven, not CSS group-hover */}
            <motion.span
              aria-hidden
              className="pointer-events-none absolute -bottom-[75%] -left-[75%] h-[250%] w-[250%] rotate-45 bg-[#D9A928]"
              initial={{ scale: 0 }}
              animate={{ scale: hovered ? 1 : 0 }}
              transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1] }}
            />

            <motion.span
              className="relative z-10"
              animate={{ color: hovered ? "#050505" : "#ffffff" }}
              transition={{ duration: 0.3 }}
            >
              Start Tracking
            </motion.span>

            <motion.span
              className="relative z-10 text-lg"
              animate={{
                x: hovered ? 4 : 0,
                color: hovered ? "#050505" : "rgba(255,255,255,0.5)",
              }}
              transition={{ duration: 0.3 }}
            >
              →
            </motion.span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero2;