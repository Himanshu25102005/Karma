"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
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
    0 → image is just entering
    1 → image has travelled through the section
  */

  const y = useTransform(
    scrollYProgress,
    [0, 0.35, 0.75, 1],
    ["18vh", "5vh", "0vh", "-5vh"],
  );

  const scale = useTransform(scrollYProgress, [0, 0.4, 0.8], [0.82, 0.94, 1]);

  const width = useTransform(
    scrollYProgress,
    [0, 0.45, 0.8],
    ["68%", "82%", "94%"],
  );

  const opacity = useTransform(scrollYProgress, [0, 0.08, 0.2], [0.65, 0.9, 1]);

  return (
    <section
      ref={sectionRef}
      className="
        relative
        -mt-20
        h-[180vh]
        w-full
        sm:-mt-28
        md:-mt-36
        lg:h-[200vh]
      "
    >
      {/* Sticky viewport */}
      <div
        className="
          sticky
          top-0
          flex
          h-dvh
          w-full
          items-center
          justify-center
        "
      >
        {/* Product image */}
       <motion.div
  style={{
    y,
    scale,
    width,
    opacity,
  }}
  className="
    relative
    overflow-hidden
    rounded-[14px]
    border
    border-white/15
    bg-[#0F0F0E]
    shadow-[0_30px_100px_rgba(0,0,0,0.5)]
  "
>
  <Image
    src="/images/image.png"
    alt="कARMA product interface"
    width={1600}
    height={820}
    priority
    sizes="94vw"
    className="block h-auto w-full"
  />

  <div
    className="
      pointer-events-none
      absolute
      inset-0
      bg-[linear-gradient(to_bottom,rgba(255,255,255,0.025),transparent_20%,transparent_80%,rgba(0,0,0,0.12))]
    "
  />
</motion.div>
      </div>
    </section>
  );
};

export default Demo;
