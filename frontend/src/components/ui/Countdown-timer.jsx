"use client";
import React, { useEffect, useRef, useState } from "react";
import { IconRestore, IconPlus } from "@tabler/icons-react";
import { useAnimate } from "framer-motion";
import useProjectStore from "@/store/useProjectStore";
import { useUserStore } from "@/store/useUserStore";
import { motion } from "framer-motion";
import api from "@/services/api";

// Configuration constants
/* const COUNTDOWN_FROM = "2026-10-01T00:00:00"; */
const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

export default function ShiftingCountdown() {

  const currentProjectId = useProjectStore((state) => state.currentProjectId);
  const userId = useUserStore((state) => state.userId);
  const [isStart, setIsStart] = useState(false);
  const [isPause, setIsPause] = useState(false);
  const [savedTime, setSavedTime] = useState(0);
  const [COUNTDOWN_FROM, setCOUNTDOWN_FROM] = useState();
  const [val, setVal] = useState(null)

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

  const [form, setForm] = useState({ minutes: "" });

  const handleChange = (e) => {
    const value = e.target.value;
    setForm({ minutes: value });
  };

  // submit → APPLY the change
  const handleSubmit = (e) => {
    e.preventDefault();

    const parsed = parseInt(form.minutes);

    if (!isNaN(parsed) && parsed > 0) {
      setSavedTime(parsed * MINUTE);
      setDuration(parsed);
      setForm({ minutes: "" });
    }
  };

  const setStart = async () => {
    setCOUNTDOWN_FROM(Date.now() + savedTime);
    setIsStart(true);
    const currprojectDetails = await api.getCurrentProjectInfo(currentProjectId);
    const currentProjectType = currprojectDetails.data.data.type;
    await api.startSession(currentProjectId, currentProjectType);
  }

  const endSession = async () => {
    const res = await api.endSession(userId);
    console.log(res.data);
    setReset();
  }
  return (
    <section className="bg-white text-black dark:bg-black dark:text-white transition-colors duration-500 p-4">
      <div className="flex w-full max-w-5xl items-center mx-auto">
        {/* <CountdownItem unit="Day" label="Days" COUNTDOWN_FROM={COUNTDOWN_FROM} isStart={isStart} savedTime={savedTime} isPause={setPause} /> */}
        <CountdownItem unit="Hour"  COUNTDOWN_FROM={COUNTDOWN_FROM} isStart={isStart} savedTime={savedTime} isPause={setPause} />
        <CountdownItem unit="Minute" COUNTDOWN_FROM={COUNTDOWN_FROM} isStart={isStart} savedTime={savedTime} isPause={setPause} />
        <CountdownItem unit="Second" COUNTDOWN_FROM={COUNTDOWN_FROM} isStart={isStart} savedTime={savedTime} isPause={setPause} />
      </div>

      <div className="p-5 w-full max-w-5xl mx-auto flex justify-evenly items-center gap-6 flex-wrap">

        {[25, 45, 60].map((min) => (
          <motion.button
            key={min}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => setDuration(min)}
            className="px-4 py-2 text-lg cursor-target rounded-xl border border-white/20 bg-white/[0.04] 
      hover:bg-white/[0.08] hover:border-white/30 transition-all duration-200 backdrop-blur-sm"
          >
            {min} Mins
          </motion.button>
        ))}

        {/* Custom Input */}
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2 border border-white/20 rounded-xl px-3 py-2 bg-white/[0.03] backdrop-blur-sm"
        >
          <input
            type="number"
            name="minutes"
            value={form.minutes || ""}
            onChange={handleChange}
            placeholder="Custom (in minutes)"
            className="bg-transparent outline-none text-white placeholder-gray-400 w-40 text-sm"
          />

          <motion.button
            whileTap={{ scale: 0.9 }}
            type="submit"
            className="px-3 py-1 cursor-target rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 transition"
          >
            Set
          </motion.button>
        </form>
      </div>


      {/* SESSION CONTROLS */}
      <div className="p-3 w-full max-w-5xl mx-auto flex justify-center items-center gap-6 flex-wrap">

        {/* Start / Pause */}
        {isStart ? (
          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.04 }}
            onClick={setPause}
            className="px-6 py-3 text-2xl cursor-target rounded-2xl border border-yellow-400/30 bg-yellow-400/10 hover:bg-yellow-400/20 transition-all duration-200"
          >
            Pause Session
          </motion.button>
        ) : (
          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.04 }}
            onClick={setStart}
            className="px-6 py-3 text-2xl cursor-target rounded-2xl border border-green-400/30 bg-green-400/10 hover:bg-green-400/20 transition-all duration-200"
          >
            Start Session
          </motion.button>
        )}

        {/* Reset */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.05 }}
          onClick={setReset}
          className="p-3 rounded-xl cursor-target border border-white/20 bg-white/[0.04] hover:bg-white/[0.1] transition-all duration-200"
        >
          <IconRestore color="#DFDFDF" size={28} />
        </motion.button>

        {/* End Session */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.04 }}
          onClick={endSession}
          className="px-6 py-3 text-2xl cursor-target rounded-2xl border border-red-400/30 bg-red-400/10 hover:bg-red-400/20 transition-all duration-200"
        >
          End Session
        </motion.button>

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