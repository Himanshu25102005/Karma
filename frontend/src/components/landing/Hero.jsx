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
                Track focused sessions, completed tasks, consistency, and
                progress, then use the data to understand how you actually work.
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
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className={`
                ${poppins.className}
                group relative isolate overflow-hidden
                flex h-14 items-center justify-center gap-3
                rounded-[12px] border border-white/25
                px-6 md:ml-5 text-sm font-medium
                sm:w-auto
                 `}
              >
                {/* diagonal fill layer */}
                <span
                  aria-hidden
                  className="
                pointer-events-none absolute -bottom-[75%] -left-[75%]
                h-[250%] w-[250%] rotate-45 scale-0
            bg-white
                transition-transform duration-500
                ease-[cubic-bezier(0.65,0,0.35,1)]
                group-hover:scale-100
                "
                />

                <span className="relative z-10 text-white transition-colors duration-300 group-hover:text-black">
                  Start Tracking
                </span>
                <span className="relative z-10 text-lg text-white/60 transition-all duration-300 group-hover:translate-x-1 group-hover:text-black/70">
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
    p-3
    sm:min-h-[500px]
    sm:p-5
    md:p-6
    lg:min-h-full
    lg:p-7
    xl:p-8
  "
          >
            {/* MAC / APP WINDOW */}
            <div
              className="
      relative
      flex
      w-full
      overflow-hidden
      rounded-[14px]
      border
      border-white/15
      bg-[#0c0c0f]
      shadow-[0_25px_80px_rgba(0,0,0,0.45)]
    "
            >
              {/* ================= WINDOW HEADER ================= */}
              <div className="absolute inset-x-0 top-0 z-20 h-11 border-b border-white/10 bg-[#111114]/95 backdrop-blur-md sm:h-12">
                <div className="flex h-full items-center px-3 sm:px-4">
                  {/* Traffic lights */}
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57] sm:h-3 sm:w-3" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e] sm:h-3 sm:w-3" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#28c840] sm:h-3 sm:w-3" />
                  </div>

                  {/* Address / title */}
                  {/* <div className="absolute left-1/2 -translate-x-1/2">
                    <div
                      className={`${poppins.className} flex items-center gap-2 text-[9px] tracking-wide text-white/35 sm:text-[10px]`}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-[#D9A928]" />
                      karma.app
                    </div>
                  </div> */}

                  {/* Demo badge */}
                  <div
                    className={`${poppins.className} ml-auto rounded-md border border-[#D9A928]/20 bg-[#D9A928]/10 px-2 py-1 text-[8px] font-medium tracking-[0.12em] text-[#D9A928] sm:px-2.5 sm:text-[9px]`}
                  >
                    DEMO
                  </div>
                </div>
              </div>

              {/* ================= PRODUCT VIEWPORT ================= */}
              <div className="relative aspect-video w-full overflow-hidden bg-[#08080b] pt-11 sm:pt-12">
                {/* subtle ambient glow */}
                <div className="  pointer-events-none  absolute  inset-0  z-10  bg-[radial-gradient(circle_at_50%_45%,rgba(217,169,40,0.045),transparent_60%)] " />

                {/* =================================================
          YOUR SCREEN RECORDING GOES HERE
          ================================================= */}

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p
                      className={`
                    ${poppins.className}
                    text-base
                    font-medium
                    tracking-wide
                     text-white/60
                    sm:text-lg
                    md:text-xl
                    `}
                    >
                      SS of Live Product
                    </p>

                    <div className="mx-auto mt-3 h-px w-12 bg-[#D9A928]/40 sm:mt-4 sm:w-16" />

                    <p
                      className={`
                    ${poppins.className}
                    mt-2
                    text-[8px]
                    uppercase
                    tracking-[0.25em]
                     text-white/20
                    sm:text-[9px]
                    `}
                    >
                      See your work in motion
                    </p>
                  </div>
                </div>

                {/* =================================================
          WHEN YOU ADD YOUR VIDEO:

          <video
            src="/your-demo.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          />

          ================================================= */}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
