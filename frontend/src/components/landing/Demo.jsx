"use client";

import React, { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
});

const Demo = () => {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  /*
  ============================================================
  PRODUCT ENTRY
  ============================================================

  The product doesn't suddenly appear.

  It starts:
    - slightly smaller
    - slightly lower
    - slightly transparent

  Then expands into the main visual.
  */

  const y = useTransform(
    scrollYProgress,
    [0, 0.18, 0.42, 0.72, 1],
    ["18vh", "9vh", "2vh", "0vh", "-5vh"]
  );

  const scale = useTransform(
    scrollYProgress,
    [0, 0.18, 0.42, 0.72],
    [0.82, 0.89, 0.96, 1]
  );

  const width = useTransform(
    scrollYProgress,
    [0, 0.22, 0.48, 0.72],
    ["68%", "75%", "86%", "94%"]
  );

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.08, 0.2, 0.4],
    [0.45, 0.72, 0.92, 1]
  );

  /*
  ============================================================
  PRODUCT DEPTH
  ============================================================

  A very subtle shadow change as the product becomes
  more prominent.
  */

  const shadowOpacity = useTransform(
    scrollYProgress,
    [0.1, 0.45, 0.8],
    [0.25, 0.45, 0.55]
  );

  /*
  ============================================================
  EDGE LIGHT
  ============================================================

  Gives the product a very subtle "surface" feeling
  without adding another obvious gradient.
  */

  const edgeOpacity = useTransform(
    scrollYProgress,
    [0.1, 0.35, 0.7],
    [0, 0.5, 0.8]
  );

  return (
    <section
      ref={sectionRef}
      className="
        relative
        -mt-20
        h-[190vh]
        w-full
        sm:-mt-28
        md:-mt-36
        lg:h-[210vh]
      "
    >
      {/* ======================================================
          STICKY PRODUCT VIEWPORT
      ======================================================= */}

      <div
        className="
          sticky
          top-0
          flex
          h-dvh
          w-full
          items-center
          justify-center
          overflow-hidden
        "
      >
        {/* ====================================================
            PRODUCT IMAGE
        ===================================================== */}

        <motion.div
          style={{
            y,
            scale,
            width,
            opacity,
            boxShadow: useTransform(
              shadowOpacity,
              (value) =>
                `0 30px 100px rgba(0,0,0,${value})`
            ),
          }}
          className="
            relative
            overflow-hidden
            rounded-[14px]
            border
            border-white/15
            bg-[#0F0F0E]
          "
        >
          <Image
            src="/images/image.png"
            alt="कARMA product interface"
            width={1600}
            height={820}
            priority
            sizes="94vw"
            className="
              block
              h-auto
              w-full
            "
          />

          {/* ==================================================
              VERY SUBTLE SURFACE LIGHT
          =================================================== */}

          <motion.div
            style={{
              opacity: edgeOpacity,
            }}
            className="
              pointer-events-none
              absolute
              inset-0
              bg-[linear-gradient(to_bottom,rgba(255,255,255,0.025),transparent_20%,transparent_80%,rgba(0,0,0,0.12))]
            "
          />

          {/* ==================================================
              TOP EDGE
          =================================================== */}

          <motion.div
            style={{
              opacity: edgeOpacity,
            }}
            className="
              pointer-events-none
              absolute
              inset-x-0
              top-0
              h-px
              bg-white/15
            "
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Demo;