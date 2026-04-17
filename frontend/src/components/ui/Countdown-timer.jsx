"use client";

import React, { useEffect, useRef, useState } from "react";
import { IconRestore } from "@tabler/icons-react";
import { useAnimate } from "framer-motion";

// Configuration constants
/* const COUNTDOWN_FROM = "2026-10-01T00:00:00"; */
const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

export default function ShiftingCountdown() {

  const [isStart, setIsStart] = useState(false);
  const [isPause, setIsPause] = useState(false);
  const [savedTime, setSavedTime] = useState(0);
  const [COUNTDOWN_FROM, setCOUNTDOWN_FROM] = useState();

  const setPause = () => {
    setIsPause(true);
    setSavedTime(COUNTDOWN_FROM - Date.now());
    setIsStart(false);
  }
  const setReset = () => {
    setSavedTime(0);
    setIsPause(false);
    setIsStart(false);
  }
  const setDuration = (val) => {
    setSavedTime(val * 60 * 1000)
  }

  const setStart = () => {
    setCOUNTDOWN_FROM(Date.now() + savedTime);
    setIsStart(true);
  }

  return (
    <section className="bg-white text-black dark:bg-black dark:text-white transition-colors duration-500 p-4">
      <div className="flex w-full max-w-5xl items-center mx-auto">
        <CountdownItem unit="Day" label="Days" COUNTDOWN_FROM={COUNTDOWN_FROM} isStart={isStart} savedTime={savedTime} isPause={setPause} />
        <CountdownItem unit="Hour" label="Hours" COUNTDOWN_FROM={COUNTDOWN_FROM} isStart={isStart} savedTime={savedTime} isPause={setPause} />
        <CountdownItem unit="Minute" label="Minutes" COUNTDOWN_FROM={COUNTDOWN_FROM} isStart={isStart} savedTime={savedTime} isPause={setPause} />
        <CountdownItem unit="Second" label="Seconds" COUNTDOWN_FROM={COUNTDOWN_FROM} isStart={isStart} savedTime={savedTime} isPause={setPause} />
      </div>

      <div className=" p-5 w-full max-w-5xl items-center mx-auto flex justify-evenly items-center gap-10">
        <button className="border-2 border-solid cursor-target borde-white text-3xl px-2 py-1 rounded-xl" onClick={() => setDuration(25)} >
          25 Mins
        </button>
        <button className="border-2 border-solid cursor-target borde-white text-3xl px-2 py-1 rounded-xl" onClick={() => setDuration(45)}>
          45 Mins
        </button>
        <button className="border-2 border-solid cursor-target borde-white text-3xl px-2 py-1 rounded-xl" onClick={() => setDuration(60)}>
          60 Mins
        </button>
        <button className="border-2 border-solid cursor-target borde-white text-3xl px-2 py-1 rounded-xl" onClick={() => setDuration(720)}>
          Custom
        </button>
      </div>

      <div className=" p-3 w-full max-w-5xl items-center mx-auto flex justify-center items-center gap-10">
        {isStart ?
          <button className="border-2 border-solid cursor-target borde-white text-4xl p-2 rounded-2xl" onClick={setPause}>
            Pause Session
          </button>
          :
          <button className="border-2 border-solid cursor-target borde-white text-4xl p-2 rounded-2xl" onClick={setStart}>
            Start Session
          </button>}
        <button className="border-2 border-solid cursor-target borde-white text-4xl p-2 rounded-2xl" onClick={setReset}>
          <IconRestore color="#DFDFDF" size={32} />
        </button>
        <button className="border-2 border-solid cursor-target borde-white text-4xl p-2 rounded-2xl">
          End Session
        </button>
      </div>
    </section>
  );
}

const CountdownItem = ({ unit, label, COUNTDOWN_FROM, isStart, savedTime, setPause }) => {
  const { ref, time } = useTimers(unit, COUNTDOWN_FROM, isStart, savedTime, setPause);

  // Pad numbers with leading zeros for a cleaner look
  const display = (unit === "Second" || unit === "Minute" || unit === "Hour")
    ? String(time).padStart(2, '0')
    : time;

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-1 px-4 py-6 md:gap-2">
      <div className="relative w-full overflow-hidden text-center">
        <span
          ref={ref}
          className="block text-3xl font-mono font-semibold md:text-5xl lg:text-[9rem]"
        >
          {display}
        </span>
      </div>
      <span className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 md:text-sm">
        {label}
      </span>
      <div className="h-px w-full bg-gray-200 dark:bg-gray-800 mt-4 transition-colors duration-500"></div>
    </div>
  );
};

const useTimers = (unit, COUNTDOWN_FROM, isStart, savedTime, setPause) => {
  const [scope, animate] = useAnimate();
  const intervalRef = useRef(null);
  const timeRef = useRef(0);
  const [time, setTime] = useState(0);

  useEffect(() => {
    handleCountdown();
    intervalRef.current = setInterval(handleCountdown, 1000);

    return () => clearInterval(intervalRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unit, COUNTDOWN_FROM, isStart, savedTime, setPause]);

  const handleCountdown = async () => {
    const end = new Date(COUNTDOWN_FROM);
    const now = new Date();
    const distance = isStart ? end - now : savedTime;

    let newTime = 0;
    switch (unit) {
      case "Day":
        newTime = Math.max(0, Math.floor(distance / DAY));
        break;
      case "Hour":
        newTime = Math.max(0, Math.floor((distance % DAY) / HOUR));
        break;
      case "Minute":
        newTime = Math.max(0, Math.floor((distance % HOUR) / MINUTE));
        break;
      default:
        newTime = Math.max(0, Math.floor((distance % MINUTE) / SECOND));
    }

    if (newTime !== timeRef.current) {
      // Exit animation: move up and fade out
      await animate(
        scope.current,
        { y: ["0%", "-50%"], opacity: [1, 0] },
        { duration: 0.35 }
      );

      timeRef.current = newTime;
      setTime(newTime);

      // Entry animation: slide in from bottom and fade in
      await animate(
        scope.current,
        { y: ["50%", "0%"], opacity: [0, 1] },
        { duration: 0.35 }
      );
    }
  };

  return { ref: scope, time };
};