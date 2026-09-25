"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Tiro_Devanagari_Sanskrit,
  Poppins,
} from "next/font/google";

const tiro = Tiro_Devanagari_Sanskrit({
  weight: "400",
  subsets: ["devanagari", "latin"],
});

const poppins = Poppins({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
});

const Hero = () => {
  return (
    <section className="w-full px-3 pb-3 sm:px-4 md:px-5">
      <div
        className="
          relative
          mx-auto
          w-full
          max-w-[1800px]
          rounded-[20px]
          border
          border-white/15
          bg-[#090909]/40
          backdrop-blur-[2px]
        "
      >
        <div
          className="
            grid
            min-h-[calc(100dvh-8rem)]
            grid-cols-1
            gap-2
            p-2
            sm:p-3
            lg:grid-cols-[0.92fr_1.08fr]
          "
        >
          {/* =====================================================
              LEFT COLUMN
          ====================================================== */}

          <div
            className="
              flex
              min-h-[560px]
              flex-col
              rounded-[16px]
              border-white/30
              p-4
              sm:p-6
              md:p-7
              lg:p-8
              xl:p-10
            "
          >
            {/* Sanskrit */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                rounded-[14px]
                border-white/25
                px-5
                py-6
                sm:px-6
                sm:py-7
                md:px-7
                md:py-8
              "
            >
              <p
                className={`
                  ${tiro.className}
                  text-[#D9A928]
                  text-[clamp(2rem,4vw,4rem)]
                  leading-[1.35]
                  tracking-[-0.02em]
                `}
              >
                कर्मण्येवाधिकारस्ते मा
                <br />
                फलेषु कदाचन।
                <br />
                मा कर्मफलहेतुर्भूर्मा
                <br />
                ते सङ्गोऽस्त्वकर्मणि॥
              </p>
            </motion.div>

            {/* Short statement */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.65,
                delay: 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                mt-2
                max-w-[620px]
                rounded-[14px]
                border-white/25
                px-5
                py-4
                sm:px-6
              "
            >
              <p
                className={`
                  ${poppins.className}
                  text-sm
                  leading-6
                  text-white/65
                  sm:text-base
                  sm:leading-7
                `}
              >
                Your right is to the action,
                <br />
                not the outcome.
              </p>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.65,
                delay: 0.25,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                mt-2
                max-w-[720px]
                rounded-[14px]
                border-white/25
                px-5
                py-4
                sm:px-6
                sm:py-5
              "
            >
              <p
                className={`
                  ${poppins.className}
                  text-[13px]
                  leading-6
                  text-white/50
                  sm:text-sm
                  sm:leading-7
                `}
              >
                Your work leaves a trace.
                <br />
                Track focused sessions, completed tasks,
                consistency, and progress — then use the data
                to understand how you actually work.
              </p>
            </motion.div>

            {/* Push CTA toward bottom on desktop */}
            <div className="flex-1" />

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.65,
                delay: 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-8"
            >
              <motion.button
                whileHover={{
                  y: -2,
                  borderColor: "rgba(255,255,255,0.55)",
                  backgroundColor: "rgba(255,255,255,0.04)",
                }}
                whileTap={{
                  scale: 0.98,
                }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 25,
                }}
                className={`
                  ${poppins.className}
                  group
                  flex
                  h-14
                  items-center
                  justify-center
                  gap-3
                  rounded-[12px]
                  border
                  border-white/25
                  px-6
                  text-sm
                  font-medium
                  text-white
                  transition-colors
                  sm:w-auto
                `}
              >
                Start Tracking

                <span className="text-lg text-white/60 transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </motion.button>
            </motion.div>
          </div>

          {/* =====================================================
              RIGHT COLUMN — LIVE PRODUCT
          ====================================================== */}

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              flex
              min-h-[420px]
              items-center
              justify-center
              rounded-[16px]
              border-white/30
              p-3
              sm:min-h-[500px]
              sm:p-5
              md:p-6
              lg:min-h-full
              lg:p-7
              xl:p-8
            "
          >
            {/* Product preview */}
            <div
              className="
                relative
                flex
                aspect-video
                w-full
                items-center
                justify-center
                overflow-hidden
                rounded-[14px]
                border
                border-white/25
                bg-[#0d0d0f]
              "
            >
              {/* subtle inner glow */}
              <div
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  bg-[radial-gradient(circle_at_50%_45%,rgba(217,169,40,0.06),transparent_55%)]
                "
              />

              {/* Placeholder until actual product preview is added */}
              <div className="relative text-center">
                <p
                  className={`
                    ${poppins.className}
                    text-lg
                    font-medium
                    tracking-wide
                    text-white/70
                    sm:text-xl
                    md:text-2xl
                  `}
                >
                  SS of Live Product
                </p>

                <div className="mx-auto mt-4 h-px w-16 bg-[#D9A928]/40" />

                <p
                  className={`
                    ${poppins.className}
                    mt-3
                    text-[10px]
                    uppercase
                    tracking-[0.28em]
                    text-white/25
                  `}
                >
                  See your work in motion
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;