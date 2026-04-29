import React, { useState } from "react";
import ShiftingStopwatch from "@/components/ui/Countdown-stopwatch";
import ShiftingCountdown from "@/components/ui/Countdown-timer";

const Timer = () => {
  const [mode, setMode] = useState("stopwatch"); // single source of truth

  return (
    <>
      {/* Switch */}
      <div className="w-full flex justify-center items-center py-4">
        <div className="inline-flex items-center rounded-full bg-white/5 border border-white/10 p-1 backdrop-blur-sm">

          {/* Timer */}
          <button
            onClick={() => setMode("timer")}
            className={`px-4 py-3 text-xl cursor-target font-medium rounded-full transition-all
              ${mode === "timer"
                ? "bg-white text-black shadow-sm"
                : "text-white/60 hover:text-white"
              }`}
          >
            Timer
          </button>

          {/* Stopwatch */}
          <button
            onClick={() => setMode("stopwatch")}
            className={`px-4 py-3 text-xl cursor-target font-medium rounded-full transition-all
              ${mode === "stopwatch"
                ? "bg-white text-black shadow-sm"
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