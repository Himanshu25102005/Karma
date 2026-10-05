"use client";

import React, { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  Tiro_Devanagari_Sanskrit,
  Poppins,
} from "next/font/google";
import Link from "next/link";
const tiro = Tiro_Devanagari_Sanskrit({
  weight: "400",
  subsets: ["devanagari", "latin"],
});

const poppins = Poppins({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
});

// ==============================
// SANSKRIT CONTENT
// ==============================

const line1 = ["कर्मण्येवाधिकारस्ते", "मा"];
const line1Highlight = ["फलेषु", "कदाचन।"];

const line2 = [
  "मा",
  "कर्मफलहेतुर्भूर्मा",
  "ते",
  "सङ्गोऽस्त्वकर्मणि॥",
];

// ==============================
// WORD ANIMATION
// ==============================

const wordVariants = {
  hidden: {
    opacity: 0,
    y: 40,
    filter: "blur(8px)",
  },

  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
    },
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

// ==============================
// WORD COMPONENT
// ==============================

const Word = ({ children, highlight = false }) => (
  <motion.span
    variants={wordVariants}
    className={`inline-block ${
      highlight ? "text-[#D9A928]" : "text-[#EDEAE0]"
    }`}
  >
    {children}
  </motion.span>
);

// ==============================
// HERO
// ==============================

const Hero2 = () => {
  const [hovered, setHovered] = useState(false);

  const heroRef = useRef(null);

  // Scroll progress for this section only.
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  /*
    HERO EXIT CHOREOGRAPHY

    The hero remains almost completely stable at first.
    Only after the user has actually started leaving the section
    does the content begin to yield.
  */

  const contentY = useTransform(
    scrollYProgress,
    [0, 0.45, 1],
    [0, -8, -45]
  );

  const contentScale = useTransform(
    scrollYProgress,
    [0, 0.45, 1],
    [1, 0.995, 0.97]
  );

  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.45, 0.85, 1],
    [1, 1, 0.72, 0]
  );

  return (
    <section
      ref={heroRef}
      className="relative w-full overflow-hidden"
    >
      {/* =========================================
          AMBIENT GOLD GLOW
      ========================================== */}

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/3
          h-[500px]
          w-[900px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-[#D9A928]/[0.04]
          blur-[120px]
        "
      />

      {/* =========================================
          HERO CONTENT

          This wrapper is what participates in the
          scroll choreography.
      ========================================== */}

      <motion.div
        style={{
          y: contentY,
          scale: contentScale,
          opacity: contentOpacity,
        }}
        className="
          relative
          mx-auto
          flex
          min-h-[85dvh]
          w-full
          max-w-[1800px]
          flex-col
          items-center
          justify-center
          px-5
          py-24
          sm:px-8
          md:px-12
          lg:px-16
        "
      >
        {/* =========================================
            SANSKRIT
        ========================================== */}

        <motion.h1
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.4,
          }}
          variants={containerVariants}
          className={`
            ${tiro.className}
            max-w-[1400px]
            text-center
            text-[clamp(2.2rem,5.6vw,5.75rem)]
            font-normal
            leading-[1.35]
            tracking-[-0.02em]
          `}
        >
          {/* LINE 1 */}

          <span className="block">
            {line1.map((word, index) => (
              <React.Fragment key={`line1-${index}`}>
                <Word>{word}</Word>{" "}
              </React.Fragment>
            ))}

            {line1Highlight.map((word, index) => (
              <React.Fragment key={`highlight-${index}`}>
                <Word highlight>{word}</Word>{" "}
              </React.Fragment>
            ))}
          </span>

          {/* LINE 2 */}

          <span className="mt-2 block">
            {line2.map((word, index) => (
              <React.Fragment key={`line2-${index}`}>
                <Word>{word}</Word>{" "}
              </React.Fragment>
            ))}
          </span>
        </motion.h1>

        {/* =========================================
            TRANSLATION
        ========================================== */}

        <motion.p
          initial={{
            opacity: 0,
            y: 16,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.5,
          }}
          transition={{
            duration: 0.7,
            delay: 0.95,
            ease: [0.22, 1, 0.36, 1],
          }}
          className={`
            ${poppins.className}
            mt-12
            max-w-[600px]
            text-center
            text-sm
            leading-6
            text-white/50
            sm:mt-14
            sm:text-base
            sm:leading-7
          `}
        >
          Your right is to the action, not the outcome.

          <br />

          <span className="text-white/60">
            कARMA tracks your sessions, tasks, and consistency, and shows you
            how you actually work. Track your effort, not your results.
          </span>
        </motion.p>

        {/* =========================================
            CTA
        ========================================== */}

        <motion.div
        initial={{
          opacity: 0,
          y: 16,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
          amount: 0.2,
        }}
        transition={{
          duration: 0.7,
          delay: 1.1,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="mt-10 sm:mt-12"
        >
  <Link href="/login">
    <motion.button
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 25,
      }}
      className={`
        ${poppins.className}
        relative isolate
        flex h-14 items-center justify-center gap-3
        overflow-hidden rounded-[12px]
        border border-white/20
        px-7 text-sm font-medium
      `}
    >
      <motion.span
        aria-hidden
        className="
          pointer-events-none
          absolute
          -bottom-[75%]
          -left-[75%]
          h-[250%]
          w-[250%]
          rotate-45
          bg-[#D9A928]
        "
        initial={{ scale: 0 }}
        animate={{
          scale: hovered ? 1 : 0,
        }}
        transition={{
          duration: 0.5,
          ease: [0.65, 0, 0.35, 1],
        }}
      />

      <motion.span
        className="relative z-10"
        animate={{
          color: hovered ? "#050505" : "#ffffff",
        }}
        transition={{
          duration: 0.3,
        }}
      >
        Start Tracking
      </motion.span>

      <motion.span
        className="relative z-10 text-lg"
        animate={{
          x: hovered ? 4 : 0,
          color: hovered
            ? "#050505"
            : "rgba(255,255,255,0.5)",
        }}
        transition={{
          duration: 0.3,
        }}
      >
        →
      </motion.span>
    </motion.button>
  </Link>
</motion.div>
      </motion.div>

      {/* =========================================
          SUBTLE SCROLL CUE
      ========================================== */}

      
    </section>
  );
};

export default Hero2;