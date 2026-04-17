"use client";

import React, { useEffect, useRef, useState } from "react";

import { useAnimate } from "framer-motion";

// Configuration constants
// const COUNTDOWN_FROM = "2026-04-11T15:00:00";
const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;




export default function ShiftingCountdown() {

  const [isPause, setIsPause] = useState(false);
  const [isStart, setIsStart] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  const timerStart = () => {
    setStartTime(Date.now());
    setIsStart(true);
    setIsPause(false);
  };

  const timerPause = () => {
    let currTime = Date.now() - startTime;
    setIsPause(true);
    setIsStart(false);
    setElapsedTime((prev) => prev + currTime);
    console.log(currTime);
  };

  const handleClck = () => {
    if(isPause==true) 
    {
      timerStart()
    }
    else{
      timerPause();
    }
  }

  return (
    <section className="bg-white text-black dark:bg-black dark:text-white transition-colors duration-500 p-4  ">


      <div className="flex w-full max-w-5xl items-center mx-auto">
        <CountdownItem unit="Day" label="Days" isStart={isStart} startTime={startTime} elapsedTime={elapsedTime} />
        <CountdownItem unit="Hour" label="Hours" isStart={isStart} startTime={startTime} elapsedTime={elapsedTime} />
        <CountdownItem unit="Minute" label="Minutes" isStart={isStart} startTime={startTime} elapsedTime={elapsedTime} />
        <CountdownItem unit="Second" label="Seconds" isStart={isStart} startTime={startTime} elapsedTime={elapsedTime} />
      </div>



      <div className=" p-3 w-full max-w-5xl items-center mx-auto flex justify-center items-center gap-10">
        {isStart ? (
          <button
            className="border-2 border-solid cursor-target font-semibold border-white text-4xl p-2 px-6 rounded-2xl"
            onClick={handleClck}
          >
            {isPause ? "Resume Session" : "Pause Session"}
          </button>
        ) : (
          <button
            className="border-2 border-solid cursor-target font-semibold border-white text-4xl p-2 px-6 rounded-2xl"
            onClick={timerStart}
          >
            Start Session
          </button>
        )}
        {/* <button className="border-3 border-solid font-semibold cursor-target borde-white text-4xl p-2 rounded-2xl" onClick={timerStart}>
          Start Session
        </button> */}
        <button className="border-3 border-solid cursor-target font-semibold borde-white text-4xl p-2 rounded-2xl">
          End Session
        </button>
      </div>
    </section>
  );
}

const CountdownItem = ({ unit, label, isStart, startTime, elapsedTime }) => {
  const { ref, time } = useTimer(unit, isStart, startTime, elapsedTime); // 3. Pass to useTime

  // Pad seconds/minutes with a leading zero if they are single digits
  const display = (unit === "Second" || unit === "Minute" || unit === "Hour")
    ? String(time).padStart(2, '0')
    : time;

  return (
    <>
      <div className="flex flex-1 flex-col items-center justify-center gap-1 px-4 py-6 md:gap-2 ">
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
        <div className="h-px w-full bg-gray-200 dark:bg-gray-800 mt-2"></div>
      </div>
    </>
  );
};

const useTimer = (unit, isStart, startTime, elapsedTime) => {
  const [scope, animate] = useAnimate();
  const intervalRef = useRef(null);
  const timeRef = useRef(0);
  const [time, setTime] = useState(0);

  useEffect(() => {
    handleCountdown();
    intervalRef.current = setInterval(handleCountdown, 1000);
    return () => clearInterval(intervalRef.current);
  }, [unit, isStart, startTime, elapsedTime]); // ✅ always 3 deps, null on first render is fine

  const handleCountdown = async () => {
    /* const distance = now - end; */
    const distance = (isStart && startTime)
      ? (Date.now() - startTime + elapsedTime)
      : elapsedTime;


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