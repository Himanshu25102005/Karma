"use client";
import React, { useEffect, useRef, useState } from "react";
import { IconRestore } from "@tabler/icons-react";
import { useAnimate, motion } from "framer-motion";
import useProjectStore from "@/store/useProjectStore";
import { useUserStore } from "@/store/useUserStore";
import api from "@/services/api";
import useRefreshStore from "@/store/useRefreshStore";

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

export default function ShiftingStopwatch({ part = "full" }) {
  const triggerRefresh = useRefreshStore((state) => state.triggerRefresh);
  const currentProjectId = useProjectStore((state) => state.currentProjectId);
  const userId = useUserStore((state) => state.userId);
  const [isPause, setIsPause] = useState(false);
  const [isStart, setIsStart] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  const timerStart = async () => {
    setStartTime(Date.now());
    setIsStart(true);
    setIsPause(false);
    const currprojectDetails = await api.getCurrentProjectInfo(currentProjectId);
    const currentProjectType = currprojectDetails.data.data.type;
    await api.startSession(currentProjectId, currentProjectType);
  };

  const endSession = async () => {
    const res = await api.endSession(userId);
    console.log("Response from the end session API: ", res.data);
    setReset();
    triggerRefresh();
  };

  const setReset = () => {
    setElapsedTime(0);
    setIsPause(false);
    setIsStart(false);
  };

  const timerPause = () => {
    let currTime = Date.now() - startTime;
    setIsPause(true);
    setIsStart(false);
    setElapsedTime((prev) => prev + currTime);
    console.log(currTime);
  };

  const handleClck = async () => {
    if (isPause == true) {
      timerStart();
    } else {
      timerPause();
    }
  };

  const display = (
    <div className="flex w-full max-w-5xl items-stretch mx-auto">
      <CountdownItem unit="Hour" isStart={isStart} startTime={startTime} elapsedTime={elapsedTime} />
      <CountdownItem unit="Minute" isStart={isStart} startTime={startTime} elapsedTime={elapsedTime} />
      <CountdownItem unit="Second" isStart={isStart} startTime={startTime} elapsedTime={elapsedTime} />
    </div>
  );

  const controls = (
    <div className="p-2 sm:p-3 lg:p-3 w-full max-w-5xl mx-auto flex justify-center items-center gap-3 sm:gap-6 flex-wrap">
      {isStart ? (
        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.04 }}
          onClick={handleClck}
          className={`cursor-target font-medium rounded-xl lg:rounded-2xl transition-all duration-200
            px-4 py-2 text-sm lg:px-6 lg:py-3 lg:text-2xl lg:font-semibold
            ${isPause
              ? "border border-green-400/30 bg-green-400/10 hover:bg-green-400/20"
              : "border border-yellow-400/30 bg-yellow-400/10 hover:bg-yellow-400/20"}
            `}
        >
          {isPause ? "Resume Session" : "Pause Session"}
        </motion.button>
      ) : (
        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.04 }}
          onClick={timerStart}
          className="px-4 py-2 text-sm lg:px-6 lg:py-3 lg:text-2xl lg:font-semibold cursor-target font-medium rounded-xl lg:rounded-2xl border border-green-400/25 bg-green-400/8 hover:bg-green-400/15 transition-all duration-200"
        >
          Start Session
        </motion.button>
      )}

      <motion.button
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.05 }}
        onClick={setReset}
        className="p-2 lg:p-3 rounded-lg lg:rounded-xl border cursor-target border-white/15 bg-white/[0.03] hover:bg-white/[0.08] transition-all duration-200"
      >
        <IconRestore color="#DFDFDF" size={22} className="lg:w-7 lg:h-7" />
      </motion.button>

      <motion.button
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.04 }}
        onClick={endSession}
        className="px-4 py-2 text-sm lg:px-6 lg:py-3 lg:text-2xl lg:font-semibold cursor-target font-medium rounded-xl lg:rounded-2xl border border-red-400/25 bg-red-400/8 hover:bg-red-400/15 transition-all duration-200"
      >
        End Session
      </motion.button>
    </div>
  );

  if (part === "display") {
    return (
      <section className="bg-white text-black dark:bg-black dark:text-white transition-colors duration-500 px-1 py-4 sm:py-6 lg:p-4">
        {display}
      </section>
    );
  }

  if (part === "controls") {
    return (
      <section className="bg-white text-black dark:bg-black dark:text-white transition-colors duration-500 px-1 pt-2 pb-1 lg:p-4">
        {controls}
      </section>
    );
  }

  return (
    <section className="bg-white text-black dark:bg-black dark:text-white transition-colors duration-500 p-2 sm:p-4 lg:p-4">
      {display}
      {controls}
    </section>
  );
}

const CountdownItem = ({ unit, label, isStart, startTime, elapsedTime }) => {
  const { ref, time } = useTimer(unit, isStart, startTime, elapsedTime);

  const display = (unit === "Second" || unit === "Minute" || unit === "Hour")
    ? String(time).padStart(2, '0')
    : time;

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-1 px-1 sm:px-4 py-4 sm:py-6 lg:py-6 md:gap-2">
      <div className="relative w-full overflow-hidden text-center">
        <span
          ref={ref}
          className="block text-[4.25rem] leading-none sm:text-6xl font-mono font-semibold md:text-5xl lg:text-[10.5rem]"
        >
          {display}
        </span>
      </div>
      <span className="text-[10px] sm:text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 md:text-sm">
        {label}
      </span>
      <div className="h-px w-full bg-gray-200 dark:bg-gray-800 mt-1 sm:mt-2 lg:mt-2"></div>
    </div>
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
  }, [unit, isStart, startTime, elapsedTime]);

  const handleCountdown = async () => {
    const distance = (isStart && startTime)
      ? (Date.now() - startTime + elapsedTime)
      : elapsedTime;

    let newTime = 0;
    if (unit === "Day") newTime = Math.max(0, Math.floor(distance / DAY));
    else if (unit === "Hour") newTime = Math.max(0, Math.floor((distance % DAY) / HOUR));
    else if (unit === "Minute") newTime = Math.max(0, Math.floor((distance % HOUR) / MINUTE));
    else newTime = Math.max(0, Math.floor((distance % MINUTE) / SECOND));

    if (newTime !== timeRef.current) {
      await animate(
        scope.current,
        { y: ["0%", "-50%"], opacity: [1, 0] },
        { duration: 0.3 }
      );

      timeRef.current = newTime;
      setTime(newTime);

      await animate(
        scope.current,
        { y: ["50%", "0%"], opacity: [0, 1] },
        { duration: 0.3 }
      );
    }
  };

  return { ref: scope, time };
};
