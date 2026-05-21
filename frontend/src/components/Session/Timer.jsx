import React, { useState } from "react";
import ShiftingStopwatch from "@/components/Session/Countdown-stopwatch";
import ShiftingCountdown from "@/components/Session/Countdown-timer";
import { motion } from "framer-motion";

const Timer = () => {
  const [mode, setMode] = useState("stopwatch"); 

  return (
    <>
      {/* Switch */}
      <div className="w-full flex justify-center items-center py-4">
        <div className="relative inline-flex items-center rounded-full bg-white/5 border border-white/10 p-3 backdrop-blur-sm">

          {/* Sliding Indicator */}
          <motion.div
            layout
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="absolute top-1 bottom-1 w-1/2 rounded-full bg-white shadow-sm"
            style={{
              left: mode === "timer" ? "4px" : "calc(50% + 0px)",
            }}
          />

          {/* Timer */}
          <button
            onClick={() => setMode("timer")}
            className={`relative z-10 px-7 py-2 cursor-target text-lg text-center font-medium rounded-full transition-colors
              ${mode === "timer"
                ? "text-black"
                : "text-white/60 hover:text-white"
              }`}
          >
            Timer
          </button>

          {/* Stopwatch */}
          <button
            onClick={() => setMode("stopwatch")}
            className={`relative z-10 px-7 py-2 cursor-target text-lg font-medium rounded-full transition-colors
              ${mode === "stopwatch"
                ? "text-black"
                : "text-white/60 hover:text-white"
              }`}
          >
            Stopwatch
          </button>

        </div>
      </div>

      {/* Content */}
      <div>
        {mode === "stopwatch" ? (
          <ShiftingStopwatch />
        ) : (
          <ShiftingCountdown />
        )}
      </div>
    </>
  );
};

export default Timer;