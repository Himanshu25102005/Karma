import React, { useState } from "react";
import ShiftingStopwatch from "@/components/Session/Countdown-stopwatch";
import ShiftingCountdown from "@/components/Session/Countdown-timer";
import { motion } from "framer-motion";

const Timer = ({ mobileLayout = false, projectSelector = null }) => {
  const [mode, setMode] = useState("stopwatch");
  const CountdownView = mode === "stopwatch" ? ShiftingStopwatch : ShiftingCountdown;

  const toggle = (
    <div className={`w-full flex justify-center items-center ${mobileLayout ? "py-2" : "py-2 sm:py-4 lg:py-4"}`}>
      <div className={`relative inline-flex items-center rounded-full bg-white/5 border border-white/10 backdrop-blur-sm ${mobileLayout ? "p-1.5 scale-90" : "p-3"}`}>
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="absolute top-1 bottom-1 w-1/2 rounded-full bg-white shadow-sm"
          style={{
            left: mode === "timer" ? "4px" : "calc(50% + 0px)",
          }}
        />
        <button
          onClick={() => setMode("timer")}
          className={`relative z-10 cursor-target font-medium rounded-full transition-colors
            ${mobileLayout ? "px-5 py-1.5 text-sm" : "px-7 py-2 text-lg"}
            ${mode === "timer" ? "text-black" : "text-white/60 hover:text-white"}`}
        >
          Timer
        </button>
        <button
          onClick={() => setMode("stopwatch")}
          className={`relative z-10 cursor-target font-medium rounded-full transition-colors
            ${mobileLayout ? "px-5 py-1.5 text-sm" : "px-7 py-2 text-lg"}
            ${mode === "stopwatch" ? "text-black" : "text-white/60 hover:text-white"}`}
        >
          Stopwatch
        </button>
      </div>
    </div>
  );

  if (mobileLayout) {
    return (
      <div className="flex flex-col w-full min-w-0">
        <CountdownView part="display" />
        {projectSelector && (
          <div className="w-full py-2">{projectSelector}</div>
        )}
        {toggle}
        <CountdownView part="controls" />
      </div>
    );
  }

  return (
    <>
      {toggle}
      <div>
        <CountdownView part="full" />
      </div>
    </>
  );
};

export default Timer;
