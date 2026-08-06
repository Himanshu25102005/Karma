"use client";
import React, { useEffect, useState } from "react";
import {
  IconAlarm,
  IconSparkles,
  IconCircleCheck,
  IconFlame,
  IconSchool,
} from "@tabler/icons-react";
import api from "@/services/api";
import { easeInOut, motion } from "framer-motion";
import useRefreshStore from "@/store/useRefreshStore";

const Stats = () => {
  const [summary, setSummary] = useState([]);
  const [streakData, setStreakData] = useState([]);
  const [karmaScore, setKarmaScore] = useState(0);
  const refreshToggle = useRefreshStore((state) => state.refreshToggle);
  useEffect(() => {
    const fetchOverview = async () => {
      const res = await api.overview();
      const streak = await api.getStreak();

      console.log("Streak Data ", streak.data);
      console.log("Summary Data ", res.data);
      setSummary(res.data);
      setStreakData(streak.data);
    };

    fetchOverview();
  }, [refreshToggle]);

  useEffect(() => {
    if (!summary.summary?.length) return;

    const KarmaScoreCal = () => {
      const focusHours = summary.totalFocusTime / 3600;

      const focusScore = Math.min(focusHours / 50, 1);

      const completionScore =
        summary.totalCompletedTasks / Math.max(summary.totalTasks, 1);

      const streakScore = Math.min(streakData.longestStreak / 30, 1);

      const sessionScore = Math.min(summary.summary[0].totalSessions / 50, 1);

      const defkarmaScore = Math.round(
        (0.45 * focusScore +
          0.35 * completionScore +
          0.15 * streakScore +
          0.05 * sessionScore) *
          100,
      );
      setKarmaScore(defkarmaScore);
      console.log("Karma Score:", defkarmaScore);
    };

    KarmaScoreCal();
  }, [summary, streakData, refreshToggle]);

  return (
    <>
      <div className="h-full w-full flex flex-row justify-center items-center gap-2">
        {/* Total Focus Hour Box */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: [0.3, 0.5, 0.7, 1], y: 0 }}
          transition={{ duration: 0.3, ease: easeInOut }}
          className="w-1/4 h-full rounded-lg bg-neutral-800/70 p-2 md:p-4 flex flex-row  justify-start items-start gap-2 md:gap-3"
        >
          {/* Icon */}
          <div className="h-[50%] w-[26%] md:h-full md:w-19 relative">
            <div className="w-5 md:w-13 aspect-square rounded-full bg-[#328414]/60 absolute top-0 flex justify-center items-center">
              <IconAlarm className="h-3.5 w-3.5 md:h-9.5 md:w-9.5 text-[#51ce23]" />
            </div>
          </div>
          {/* Content */}
          <div className="h-full w-full flex flex-col justify-between">
            <div className="flex flex-col gap-1 ">
              <span className="text-[7px] md:text-[12.5px] font-semibold text-neutral-400 font-mono">
                Focus Hours
              </span>
              <span className="font-bold md:text-2xl text-neutral-200 font-mono">
                {Math.round(summary.totalFocusTime / 60)} mins
              </span>
            </div>
            <div className="flex flex-row justify-start items-center gap-1">
              <div>
                <IconSparkles className="h-3 w-3 text-green-600 md:h-4 md:w-4" />
              </div>
              <span className="text-green-400 text-[7px] md:text-[10px] ">
                {summary?.summary?.[0]?.totalSessions} Sessions
              </span>
            </div>
          </div>
        </motion.div>

        {/* Task DOne */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: [0.3, 0.5, 0.7, 1], y: 0 }}
          transition={{ duration: 0.5, ease: easeInOut }}
          className="w-1/4 h-full rounded-lg bg-neutral-800/70 p-2 md:p-4 flex flex-row  justify-start items-start gap-2 md:gap-3"
        >
          {/* Icon */}
          <div className="h-[50%] w-[26%] md:h-full md:w-19 relative">
            <div className="w-5 md:w-13 aspect-square rounded-full bg-blue-900/60 absolute top-0 flex justify-center items-center">
              <IconCircleCheck className="h-3.5 w-3.5 md:h-9.5 md:w-9.5 text-blue-500" />
            </div>
          </div>
          {/* Content */}
          <div className="h-full w-full flex flex-col justify-between">
            <div className="flex flex-col gap-1 ">
              <span className="text-[7px] md:text-[12.5px] font-semibold text-neutral-400 font-mono">
                Closed Tasks
              </span>
              <span className="font-bold md:text-2xl text-neutral-200 font-mono">
                {summary.totalCompletedTasks}
              </span>
            </div>
            <div className="flex flex-row justify-start items-center gap-1">
              <div>
                <IconSparkles className="h-3 w-3 text-blue-500 md:h-4 md:w-4" />
              </div>
              <span className="text-blue-500 text-[7px] md:text-[10px] ">
                Out of {summary.totalTasks}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Karma Score */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: [0.3, 0.5, 0.7, 1], y: 0 }}
          transition={{ duration: 0.7, ease: easeInOut }}
          className="w-1/4 h-full rounded-lg bg-neutral-800/70 p-2 md:p-4 flex flex-row  justify-start items-start gap-2 md:gap-3"
        >
          {/* Icon */}
          <div className="h-[50%] w-[26%] md:h-full md:w-19 relative">
            <div className="w-5 md:w-13 aspect-square rounded-full bg-yellow-900/60 absolute top-0 flex justify-center items-center">
              <IconSchool className="h-3.5 w-3.5 md:h-9.5 md:w-9.5 text-yellow-500" />
            </div>
          </div>
          {/* Content */}
          <div className="h-full w-full flex flex-col justify-between">
            <div className="flex flex-col gap-1 ">
              <span className="text-[7px] md:text-[12.5px] font-semibold text-neutral-400 font-mono">
                Karma Score
              </span>
              <span className="font-bold md:text-2xl text-neutral-200 font-mono">
                {karmaScore}/100
              </span>
            </div>
            <div className="flex flex-row justify-start items-center gap-1">
              <div>
                <IconSparkles className="h-3 w-3 text-yellow-500 md:h-4 md:w-4" />
              </div>
              <span className="text-yellow-500 text-[7px] md:text-[10px] ">
                Tailored Score{" "}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Streak */}
        <motion.div
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: [0.3, 0.5, 0.7, 1], y: 0 }}
          transition={{ duration: 0.9, ease: easeInOut }}
          className="w-1/4 h-full rounded-lg bg-neutral-800/70 p-2 md:p-4 flex flex-row  justify-start items-start gap-2 md:gap-3"
        >
          {/* Icon */}
          <div className="h-[50%] w-[26%] md:h-full md:w-19 relative">
            <div className="w-5 md:w-13 aspect-square rounded-full bg-pink-900/60 absolute top-0 flex justify-center items-center">
              <IconFlame className="h-3.5 w-3.5 md:h-9.5 md:w-9.5 text-pink-400/90" />
            </div>
          </div>
          {/* Content */}
          <div className="h-full w-full flex flex-col justify-between">
            <div className="flex flex-col gap-1 ">
              <span className="text-[7px] md:text-[12.5px] font-semibold text-neutral-400 font-mono">
                Streak
              </span>
              <span className="font-bold md:text-2xl text-neutral-200 font-mono">
                {streakData.currentStreak}
              </span>
            </div>
            <div className="flex flex-row justify-start items-center gap-1">
              <div>
                <IconSparkles className="h-3 w-3 text-pink-400/90 md:h-4 md:w-4" />
              </div>
              <span className="text-pink-400/90 text-[7px] md:text-[10px] ">
                Max: {streakData.longestStreak}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Stats;
