"use client";

import React, {
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import { easeInOut, motion } from "framer-motion";
import { cn } from "@/lib/utils";

const DURATION = 3.6;

const Canvas = () => {
  const stageRef = useRef(null);

  const [size, setSize] = useState({
    width: 0,
    height: 0,
  });

  // Calculate the size of the artwork while maintaining 3:2 aspect ratio
  useLayoutEffect(() => {
    const element = stageRef.current;

    if (!element) return;

    const update = () => {
      const bounds = element.getBoundingClientRect();

      // Images are 1536 × 1024 = 3:2
      const aspectRatio = 1536 / 1024;

      const maxWidth = bounds.width * 0.96;
      const maxHeight = bounds.height * 0.96;

      let width = maxWidth;
      let height = width / aspectRatio;

      // If calculated height is too large, fit based on height instead
      if (height > maxHeight) {
        height = maxHeight;
        width = height * aspectRatio;
      }

      setSize({
        width,
        height,
      });
    };

    update();

    const observer = new ResizeObserver(update);
    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  // Image layers
  const LAYERS = [
    {
      file: "1.png",
      name: "1",
      initialScale: 1.234,
      revealDelay: 0.46,
    },
    {
      file: "2.png",
      name: "2",
      initialScale: 1.318,
      revealDelay: 0.56,
    },
    {
      file: "3.png",
      name: "3",
      initialScale: 1.403,
      revealDelay: 0.65,
    },
    {
      file: "4.png",
      name: "4",
      initialScale: 1.518,
      revealDelay: 0.74,
    },
    {
      file: "5.png",
      name: "5",
      initialScale: 1.646,
      revealDelay: 0.84,
    },
    {
      file: "6.png",
      name: "6",
      initialScale: 1.797,
      revealDelay: 0.93,
    },
    {
      file: "7.png",
      name: "7",
      initialScale: 1.98,
      revealDelay: 1.02,
    },
    {
      file: "8 - Copy.png",
      name: "8",
      initialScale: 2.02,
      revealDelay: 1.37,
    },
  ];

  return (
    <div
      ref={stageRef}
      className={cn(
        "relative h-dvh w-full flex items-center justify-center overflow-hidden",
        "bg-[radial-gradient(circle_at_50%_28%,#0A0A0D,#030304_100%)]"
      )}
    >
      {size.width > 0 && (
        <motion.div
          style={{
            width: size.width,
            height: size.height,
          }}
          className="relative origin-center"
          initial={{
            scale: 1.14,
            opacity: 0,
          }}
          animate={{
            scale: 1,
            opacity: 1,
          }}
          transition={{
            duration: DURATION,
            ease: [0.33, 0, 0.2, 1],
          }}
        >
          {LAYERS.map((layer, i) => (
            <motion.img
              key={layer.file}
              src={`/Logo_Pieces/${layer.file}`}
              alt=""
              draggable={false}
              className="absolute inset-0 w-full h-full select-none will-change-transform origin-center pointer-events-none"
              style={{
                zIndex: i,
              }}
              initial={{
                opacity: 0,
                scale: layer.initialScale,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                scale: {
                  duration: DURATION,
                  ease: [0.16, 1, 0.3, 1],
                },
                opacity: {
                  duration: 0.7,
                  delay: layer.revealDelay,
                  ease: easeInOut,
                },
              }}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default Canvas;