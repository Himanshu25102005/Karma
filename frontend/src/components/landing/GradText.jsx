"use client";

import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

const text = [
  { word: "You" },
  { word: "don't" },
  { word: "need" },
  { word: "more" },
  { word: "tools." },
  { word: "You" },
  { word: "need" },
  { word: "to" },
  { word: "see", highlight: true },
  { word: "the", highlight: true },
  { word: "work.", highlight: true },
  { word: "कARMA" },
  { word: "turns" },
  { word: "your" },
  { word: "work" },
  { word: "into" },
  { word: "a" },
  { word: "trace.", highlight: true },
];

const Word = ({
  word,
  index,
  total,
  progress,
  highlight,
}) => {
  /*
   * Give the words slightly more room at the beginning
   * and make sure the FINAL word reaches 100%.
   */
  const start = index / total;
  const end = Math.min((index + 1.15) / total, 1);

  const opacity = useTransform(
    progress,
    [start, end],
    [0.18, 1]
  );

  const y = useTransform(
    progress,
    [start, end],
    [8, 0]
  );

  const color = useTransform(
    progress,
    [start, end],
    highlight
      ? ["rgba(230, 244, 144, 0.18)", "#E6F490"]
      : ["rgba(230, 227, 218, 0.18)", "#E6E3DA"]
  );

  return (
    <motion.span
      style={{
        opacity,
        y,
        color,
      }}
      className="inline-block mr-[0.28em]"
    >
      {word}
    </motion.span>
  );
};

const GradText = () => {
  const sectionRef = useRef(null);

  /*
   * Track ONLY this section's scroll progress.
   *
   * start start:
   * section reaches the top of viewport → progress = 0
   *
   * end end:
   * bottom of section reaches bottom of viewport → progress = 1
   */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  /*
   * Smooth the animation so the words don't snap.
   */
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 22,
    mass: 0.25,
  });

  return (
    <section
      ref={sectionRef}
      className="
        relative
        h-[200vh]
        w-full
      "
    >
      <div
        className="
          sticky
          top-0
          flex
          h-dvh
          w-full
          items-center
          justify-center
          px-5
          sm:px-8
          lg:px-16
        "
      >
        <div
          className={`
            ${poppins.className}
            w-full
            max-w-[1050px]
            text-center
            text-[clamp(2rem,5vw,5rem)]
            font-medium
            leading-[1.08]
            tracking-[-0.045em]
          `}
        >
          {text.map((item, index) => (
            <Word
              key={`${item.word}-${index}`}
              word={item.word}
              index={index}
              total={text.length}
              progress={smoothProgress}
              highlight={item.highlight}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default GradText;