import React, { useState } from 'react'
import ShiftingStopwatch from "@/components/ui/Countdown-stopwatch";
import ShiftingCountdown from "@/components/ui/Countdown-timer";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Dropdown";

const Timer = () => {
  const [mode, setMode] = useState("stopwatch");

  return (
    <>
      <div className=" p-4 w-full max-w-5xl items-center  mx-auto flex justify-start items-center gap-4">
        <Select value={mode} onValueChange={(value) => setMode(value)}>
          <SelectTrigger className="w-[200px] bg-black border-white text-white">
            <SelectValue placeholder="Choose a Clock Mode" />
          </SelectTrigger>
          <SelectContent className="bg-black border-white">
            <SelectGroup>
              <SelectItem value="timer" className={`cursor-target`}>Timer</SelectItem>
              <SelectItem value="stopwatch" className={`cursor-target`}>Stopwatch</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div>
        {mode === "stopwatch" ? (
          <ShiftingStopwatch />
        ) : (
          <ShiftingCountdown />
        )}
      </div>
    </>
  )
}

export default Timer