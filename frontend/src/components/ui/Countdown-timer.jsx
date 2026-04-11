"use client";

import React, { useEffect, useRef, useState } from "react";
import { useAnimate } from "framer-motion";
import { IconBell } from "@tabler/icons-react";
import { Preahvihear } from "next/font/google";

// Configuration constants
// const COUNTDOWN_FROM = "2026-04-11T15:00:00";
const COUNTDOWN_FROM = Date.now();
const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;


export default function ShiftingCountdown() {
  const [isStart, setIsStart] = useState(false);
  return (
    <section className="bg-white text-black dark:bg-black dark:text-white transition-colors duration-500 p-4  border-2 border-dashed">
      <div className="flex w-full max-w-5xl items-center mx-auto">
        <CountdownItem unit="Day" label="Days" />
        <CountdownItem unit="Hour" label="Hours" />
        <CountdownItem unit="Minute" label="Minutes" />
        <CountdownItem unit="Second" label="Seconds" />
      </div>

      <div className="border-2 border-dashed border-white p-4 w-full max-w-5xl items-center mx-auto flex justify-center items-center gap-4">
        <button className={`border-2 border-solid border-gray-400 text-4xl p-2 rounded-xl ${isStart ? 'cursor-pointer' : 'cursor-not-allowed'
          }`} onClick={setIsStart(prev => !prev)}  >
          Start Session
        </button>
        <button className="cursor-pointer border-2 border-solid border-gray-400 text-4xl p-2 rounded-xl  ">
          End Session
        </button>
      </div>
    </section>
  );
}

const CountdownItem = ({ unit, label }) => {
  const { ref, time } = useTimer(unit);

  // Pad seconds/minutes with a leading zero if they are single digits
  const display = (unit === "Second" || unit === "Minute" || unit === "Hour")
    ? String(time).padStart(2, '0')
    : time;

  return (
    <>
      <div className="flex flex-1 flex-col items-center justify-center gap-1 px-4 py-6 md:gap-2 border-2 border-solid border-white">
        <div className="relative w-full overflow-hidden text-center">
          <span
            ref={ref}
            className="block text-3xl font-mono font-semibold md:text-5xl lg:text-7xl"
          >
            {display}
          </span>
        </div>
        <span className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 md:text-sm">
          {label}
        </span>
        <div className="h-px w-full bg-gray-200 dark:bg-gray-800 mt-2"></div>
      </div>
    </>
  );
};

const useTimer = (unit) => {
  const [scope, animate] = useAnimate();
  const intervalRef = useRef(null);
  const timeRef = useRef(0);
  const [time, setTime] = useState(0);

  useEffect(() => {
    // Initial check
    handleCountdown();

    // Set up the interval to update every second
    intervalRef.current = setInterval(handleCountdown, 1000);

    // Clean up when the component unmounts
    return () => clearInterval(intervalRef.current);
  }, [unit]);

  const handleCountdown = async () => {
    const end = new Date(COUNTDOWN_FROM);
    const now = new Date();
    const distance = now - end;

    let newTime = 0;
    // Calculate the time based on the unit type
    if (unit === "Day") newTime = Math.max(0, Math.floor(distance / DAY));
    else if (unit === "Hour") newTime = Math.max(0, Math.floor((distance % DAY) / HOUR));
    else if (unit === "Minute") newTime = Math.max(0, Math.floor((distance % HOUR) / MINUTE));
    else newTime = Math.max(0, Math.floor((distance % MINUTE) / SECOND));

    // Only animate if the number actually changed
    if (newTime !== timeRef.current) {
      // Exit Animation (Slide up and fade out)
      await animate(
        scope.current,
        { y: ["0%", "-50%"], opacity: [1, 0] },
        { duration: 0.3 }
      );

      timeRef.current = newTime;
      setTime(newTime);

      // Entry Animation (Slide in from bottom and fade in)
      await animate(
        scope.current,
        { y: ["50%", "0%"], opacity: [0, 1] },
        { duration: 0.3 }
      );
    }
  };

  return { ref: scope, time };
};