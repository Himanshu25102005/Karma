"use client";
import React, { useEffect, useRef, useState } from "react";
import { IconRestore } from "@tabler/icons-react";
import { useAnimate } from "framer-motion";
import useProjectStore from "@/store/useProjectStore";
import { useUserStore } from "@/store/useUserStore";
import { motion } from "framer-motion";
import api from "@/services/api";
import useRefreshStore from "@/store/useRefreshStore";

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

export default function ShiftingCountdown({ part = "full" }) {
  const triggerRefresh = useRefreshStore((state) => state.triggerRefresh);
  const currentProjectId = useProjectStore((state) => state.currentProjectId);
  const userId = useUserStore((state) => state.userId);
  const [isStart, setIsStart] = useState(false);
  const [isPause, setIsPause] = useState(false);
  const [savedTime, setSavedTime] = useState(0);
  const [COUNTDOWN_FROM, setCOUNTDOWN_FROM] = useState();

  const setPause = () => {
    setIsPause(true);
    setSavedTime(COUNTDOWN_FROM - Date.now());
    setIsStart(false);
  };

  const setReset = () => {
    setSavedTime(0);
    setIsPause(false);
    setIsStart(false);
  };

  const setDuration = (val) => {
    setSavedTime(val * 60 * 1000);
  };

  const [form, setForm] = useState({ minutes: "" });

  const handleChange = (e) => {
    const value = e.target.value;
    setForm({ minutes: value });
  };

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
  };

  const endSession = async () => {
    const res = await api.endSession(userId);
    console.log(res.data);
    setReset();
    triggerRefresh();
  };

  const display = (
    <div className="flex w-full max-w-5xl items-stretch mx-auto">
      <CountdownItem unit="Hour" COUNTDOWN_FROM={COUNTDOWN_FROM} isStart={isStart} savedTime={savedTime} setPause={setPause} />
      <CountdownItem unit="Minute" COUNTDOWN_FROM={COUNTDOWN_FROM} isStart={isStart} savedTime={savedTime} setPause={setPause} />
      <CountdownItem unit="Second" COUNTDOWN_FROM={COUNTDOWN_FROM} isStart={isStart} savedTime={savedTime} setPause={setPause} />
    </div>
  );

  const durationPresets = (
    <div className="p-2 sm:p-5 w-full max-w-5xl mx-auto flex justify-center sm:justify-evenly items-center gap-2 sm:gap-6 flex-wrap">
      {[25, 45, 60].map((min) => (
        <motion.button
          key={min}
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          onClick={() => setDuration(min)}
          className="px-3 py-1.5 text-sm sm:px-4 sm:py-2 sm:text-lg cursor-target rounded-xl border border-white/20 bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/30 transition-all duration-200 backdrop-blur-sm"
        >
          {min} Mins
        </motion.button>
      ))}

      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 border border-white/20 rounded-xl px-2 sm:px-3 py-1.5 sm:py-2 bg-white/[0.03] backdrop-blur-sm"
      >
        <input
          type="number"
          name="minutes"
          value={form.minutes || ""}
          onChange={handleChange}
          placeholder="Custom (in minutes)"
          className="bg-transparent outline-none text-white placeholder-gray-400 w-28 sm:w-40 text-xs sm:text-sm"
        />
        <motion.button
          whileTap={{ scale: 0.9 }}
          type="submit"
          className="px-2.5 py-1 sm:px-3 cursor-target rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 transition text-xs sm:text-sm"
        >
          Set
        </motion.button>
      </form>
    </div>
  );

  const controls = (
    <div className="p-2 sm:p-3 lg:p-3 w-full max-w-5xl mx-auto flex justify-center items-center gap-3 sm:gap-6 flex-wrap">
      {isStart ? (
        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.04 }}
          onClick={setPause}
          className="px-4 py-2 text-sm lg:px-6 lg:py-3 lg:text-2xl lg:font-semibold cursor-target font-medium rounded-xl lg:rounded-2xl border border-yellow-400/25 bg-yellow-400/8 hover:bg-yellow-400/15 transition-all duration-200"
        >
          Pause Session
        </motion.button>
      ) : (
        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.04 }}
          onClick={setStart}
          className="px-4 py-2 text-sm lg:px-6 lg:py-3 lg:text-2xl lg:font-semibold cursor-target font-medium rounded-xl lg:rounded-2xl border border-green-400/25 bg-green-400/8 hover:bg-green-400/15 transition-all duration-200"
        >
          Start Session
        </motion.button>
      )}

      <motion.button
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.05 }}
        onClick={setReset}
        className="p-2 lg:p-3 rounded-lg lg:rounded-xl cursor-target border border-white/15 bg-white/[0.03] hover:bg-white/[0.08] transition-all duration-200"
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
        {durationPresets}
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
      {durationPresets}
      {controls}
    </section>
  );
}

const CountdownItem = ({ unit, label, COUNTDOWN_FROM, isStart, savedTime, setPause }) => {
  const { ref, time } = useTimers(unit, COUNTDOWN_FROM, isStart, savedTime, setPause);

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
      <div className="h-px w-full bg-gray-200 dark:bg-gray-800 mt-1 sm:mt-2 lg:mt-4 transition-colors duration-500"></div>
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
      await animate(
        scope.current,
        { y: ["0%", "-50%"], opacity: [1, 0] },
        { duration: 0.35 }
      );

      timeRef.current = newTime;
      setTime(newTime);

      await animate(
        scope.current,
        { y: ["50%", "0%"], opacity: [0, 1] },
        { duration: 0.35 }
      );
    }
  };

  return { ref: scope, time };
};
