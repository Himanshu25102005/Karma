import React, { useEffect, useState } from 'react'
import { useAnimation, motion } from "framer-motion";
import api from '@/services/api';
import { IconClock, IconCircleCheck, IconChevronRight, IconSparkles, IconTrendingUp, IconFlame } from '@tabler/icons-react';
import useRefreshStore from '@/store/useRefreshStore';


const Personal_Stats = ({ compact = false }) => {

  const refreshToggle = useRefreshStore((state) => state.refreshToggle);
  const [summary, setSummary] = useState([]);
  const [streakData, setStreakData] = useState([]);
  const [activeInsight, setActiveInsight] = useState(0);

  useEffect(() => {
    const fetchOverview = async () => {
      const res = await api.overview();
      const streak = await api.getStreak();

      console.log("Streak Data ", streak.data);
      setSummary(res.data);
      setStreakData(streak.data);
    }


    fetchOverview();
  }, [refreshToggle])



  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
  };

  const focusTimeDisplay = (() => {
    const hours = Math.floor(summary.totalFocusTime / 3600);
    const minutes = Math.floor((summary.totalFocusTime % 3600) / 60);
    return <>{hours > 0 && `${hours}h `}{minutes}m</>;
  })();

  const peakSessionDisplay = (() => {
    const seconds = summary?.summary?.[0]?.longestSession || 0;
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return <>{hours > 0 && `${hours}h `}{minutes}m</>;
  })();

  const avgSessionDisplay = (() => {
    const avgSeconds = summary?.summary?.[0]?.averageSessionDuration || 0;
    const totalMinutes = Math.round(avgSeconds / 60);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return <>Avg: {hours > 0 && `${hours}h `}{minutes}m</>;
  })();

  const streakBoxes = (() => {
    const streak = streakData?.currentStreak || 0;
    const greenBoxes = streak === 0 ? 0 : (streak % 7 === 0 ? 7 : streak % 7);
    const neutralBoxes = 7 - greenBoxes;
    return (
      <>
        {Array.from({ length: greenBoxes }).map((_, i) => (
          <div key={`green-${i}`} className='h-3.5 w-3.5 bg-pink-400/90 rounded-sm shadow-[0_0_8px_rgba(34,197,94,0.2)]' />
        ))}
        {Array.from({ length: neutralBoxes }).map((_, i) => (
          <div key={`neutral-${i}`} className='h-3.5 w-3.5 rounded-sm border border-neutral-700 bg-neutral-950/40' />
        ))}
      </>
    );
  })();

  const insightCards = [
    {
      id: 'streak',
      icon: <IconFlame className='w-7 h-7 text-pink-400/90' />,
      iconBg: 'bg-pink-900/60',
      title: 'Streak',
      subtitle: "Keep showing up. You're on a roll!",
      value: `${streakData?.currentStreak || 0} Days`,
      valueClass: 'text-pink-400/90',
      extra: streakBoxes,
    },
    {
      id: 'focus',
      icon: <IconClock className='w-7 h-7 text-green-400/90' />,
      iconBg: 'bg-green-900/60',
      title: 'Focus Time',
      subtitle: 'Total time in deep work',
      value: focusTimeDisplay,
      valueClass: 'text-green-300/90',
      extra: (
        <div className='flex flex-row justify-end items-center gap-1'>
          <IconSparkles className='h-3 w-3 text-green-400' />
          <span className='text-[9px] text-neutral-400'>From {summary?.summary?.[0]?.totalSessions} sessions</span>
        </div>
      ),
    },
    {
      id: 'tasks',
      icon: <IconCircleCheck className='w-7 h-7 text-blue-500' />,
      iconBg: 'bg-blue-900/60',
      title: 'Tasks Done',
      subtitle: 'Total Tasks',
      value: summary.totalCompletedTasks,
      valueClass: 'text-blue-500',
      extra: (
        <div className='flex flex-row justify-end items-center gap-1'>
          <IconSparkles className='h-3 w-3 text-blue-500' />
          <span className='text-[9px] text-neutral-400'>{summary.totalTasks} tasks</span>
        </div>
      ),
    },
    {
      id: 'peak',
      icon: <IconTrendingUp className='w-7 h-7 text-yellow-500' />,
      iconBg: 'bg-yellow-900/60',
      title: 'Peak Session',
      subtitle: 'Average Session Duration',
      value: peakSessionDisplay,
      valueClass: 'text-yellow-500',
      extra: (
        <div className='flex flex-row justify-end items-center gap-1'>
          <IconSparkles className='h-3 w-3 text-yellow-500' />
          <span className='text-[9px] text-neutral-400'>{avgSessionDisplay}</span>
        </div>
      ),
    },
  ];

  if (compact) {
    const card = insightCards[activeInsight];
    const goPrev = () => setActiveInsight((i) => (i - 1 + insightCards.length) % insightCards.length);
    const goNext = () => setActiveInsight((i) => (i + 1) % insightCards.length);

    return (
      <div className='w-full min-w-0 p-2 flex flex-col gap-2'>
        <div className='w-full'>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex items-center justify-between px-2 py-2"
          >
            <div className="flex flex-col">
              <span className="text-xl font-semibold tracking-tight text-white">Quick Insight</span>
              <div className="mt-1 h-[2px] w-10 bg-white/20 rounded-full" />
            </div>
          </motion.div>
        </div>

        <motion.div
          key={card.id}
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.25 }}
          className='w-full flex justify-evenly items-center py-3 px-3 rounded-xl bg-neutral-900/80 border border-neutral-800'
        >
          <div className={`w-11 h-11 flex justify-center rounded-xl ${card.iconBg} items-center shrink-0`}>
            {card.id === 'streak' ? (
              <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}>
                {card.icon}
              </motion.div>
            ) : card.icon}
          </div>
          <div className='flex-1 min-w-0 px-3 flex flex-col'>
            <span className='text-base text-neutral-100 font-semibold leading-tight'>{card.title}</span>
            <span className='text-xs text-neutral-500 truncate'>{card.subtitle}</span>
          </div>
          <div className='shrink-0 flex flex-col justify-center items-end'>
            <span className={`text-lg font-semibold ${card.valueClass}`}>{card.value}</span>
            {card.extra}
          </div>
        </motion.div>

        <div className="flex items-center justify-between gap-2 px-1">
          <button
            type="button"
            onClick={goPrev}
            className="px-3 py-1.5 rounded-lg border border-neutral-800 bg-neutral-950 text-neutral-400 hover:text-white text-xs font-mono transition-colors"
          >
            Previous
          </button>
          <span className="text-xs text-neutral-500 font-mono tabular-nums">{activeInsight + 1} / {insightCards.length}</span>
          <button
            type="button"
            onClick={goNext}
            className="px-3 py-1.5 rounded-lg border border-neutral-800 bg-neutral-950 text-neutral-400 hover:text-white text-xs font-mono transition-colors"
          >
            Next
          </button>
        </div>
      </div>
    );
  }


  return (

    <div className='w-full p-2 flex flex-col'>
      {/* Heading */}
      <div className='h-15 w-full '>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="flex items-center justify-between px-4 py-3 mb-3"
        >

          {/* LEFT: Title */}
          <div className="flex flex-col">
            <span className="text-3xl font-semibold tracking-tight text-white">
              Personal Stats
            </span>

            {/* subtle underline */}
            <div className="mt-1 h-[2px] w-10 bg-white/20 rounded-full" />
          </div>

          {/* OPTIONAL RIGHT (future use) */}
          {/* <div className="text-sm text-gray-400">Tasks</div> */}
          <motion.a
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            href="http://localhost:3000/dashboard"
            className='flex gap-2 justify-center cursor-target items-center'
          >
            <span className='text-neutral-500 hover:text-neutral-300 transition-colors'>View full history</span>
            <IconChevronRight className='h-5 w-5 text-neutral-500' />
          </motion.a>
        </motion.div>
      </div>


      <motion.div
        initial="hidden"
        animate="show"
        variants={{
          show: { transition: { staggerChildren: 0.1 } } // Elements appear one by one
        }}
        className={`p-2 flex flex-col gap-2 ${compact ? 'max-h-[280px] overflow-y-auto custom-scrollbar' : ''}`}
      >



        {/* Streak */}
        <motion.div
          variants={cardVariants}
          whileHover={{ scale: 1.02, backgroundColor: "rgba(23, 23, 23, 1)" }}
          whileTap={{ scale: 0.98 }}
          className='w-full h-18 flex justify-evenly items-center py-2.5 rounded-xl bg-neutral-900/80 border border-transparent hover:border-neutral-800 transition-colors cursor-pointer'
        >
          <div className='w-12 h-12 flex justify-center rounded-xl bg-pink-900/60 items-center'>
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              <IconFlame className='w-8 h-8 text-pink-400/90' />
            </motion.div>
          </div>
          <div className='h-full w-[50%] flex flex-col '>
            <span className='text-lg text-neutral-100 font-semibold leading-tight'>Streak</span>
            <span className='text-sm text-neutral-500'>{"Keep showing up. You're on a roll!"}</span>
          </div>
          <div className='h-full w-[25%] flex flex-col justify-center items-end'>
            <span className='text-xl w-full text-pink-400/90 font-semibold text-end'>
              {streakData?.currentStreak || 0} Days
            </span>

            <div className='w-full h-[1.5rem] flex flex-row justify-end items-center gap-1 mt-0.5'>
              {(() => {
                const streak = streakData?.currentStreak || 0;
                const greenBoxes = streak === 0 ? 0 : (streak % 7 === 0 ? 7 : streak % 7);
                const neutralBoxes = 7 - greenBoxes;

                return (
                  <>
                    {Array.from({ length: greenBoxes }).map((_, i) => (
                      <div
                        key={`green-${i}`}
                        className='h-3.5 w-3.5 bg-pink-400/90 rounded-sm shadow-[0_0_8px_rgba(34,197,94,0.2)]'
                      />
                    ))}

                    {Array.from({ length: neutralBoxes }).map((_, i) => (
                      <div
                        key={`neutral-${i}`}
                        className='h-3.5 w-3.5 rounded-sm border border-neutral-700 bg-neutral-950/40'
                      />
                    ))}
                  </>
                );
              })()}
            </div>
          </div>
        </motion.div>

        {/* Focus Time Card */}
        <motion.div
          variants={cardVariants}
          whileHover={{ scale: 1.02, backgroundColor: "rgba(23, 23, 23, 1)" }}
          whileTap={{ scale: 0.98 }}
          className='w-full h-[4.5rem] flex justify-evenly items-center py-2.5 rounded-xl bg-neutral-900/80 border border-transparent hover:border-neutral-800 transition-colors cursor-pointer'
        >
          <div className='w-12 h-12 flex justify-center rounded-xl bg-green-900/60 items-center'>
            <IconClock className='w-8 h-8 text-green-400/90' />
          </div>
          <div className='h-full w-[50%] flex flex-col '>
            <span className='text-lg text-neutral-100 font-semibold leading-tight'>Focus Time</span>
            <span className='text-sm text-neutral-500'>Total time in deep work</span>
          </div>
          <div className='h-full w-[25%] text-end'>
            <span className='text-xl w-full text-green-300/90 font-semibold'>
              {/* Calculate hours and remaining minutes */}
              {(() => {
                const hours = Math.floor(summary.totalFocusTime / 3600);
                const minutes = Math.floor((summary.totalFocusTime % 3600) / 60);

                return (
                  <>
                    {hours > 0 && `${hours}h `}
                    {minutes}m
                  </>
                );
              })()}
            </span>
            <div className='flex flex-row justify-end items-center gap-1'>
              <IconSparkles className='h-3 w-3 text-green-400' />
              <span className='text-[9px] text-neutral-400'>From {summary?.summary?.[0]?.totalSessions} sessions</span>
            </div>
          </div>
        </motion.div>

        {/* Tasks Completed Card */}
        <motion.div
          variants={cardVariants}
          whileHover={{ scale: 1.02, backgroundColor: "rgba(23, 23, 23, 1)" }}
          whileTap={{ scale: 0.98 }}
          className='w-full h-[4.5rem] flex justify-evenly items-center py-2.5 rounded-xl bg-neutral-900/80 border border-transparent hover:border-neutral-800 transition-colors cursor-pointer'
        >
          <div className='w-12 h-12 flex justify-center rounded-xl bg-blue-900/60 items-center'>
            <IconCircleCheck className='w-8 h-8 text-blue-500' />
          </div>
          <div className='h-full w-[50%] flex flex-col '>
            <span className='text-lg text-neutral-100 font-semibold leading-tight'>Tasks Done</span>
            <span className='text-sm text-neutral-500'>Total Tasks</span>
          </div>
          <div className='h-full w-[25%] text-end'>
            <span className='text-xl w-full text-blue-500 font-semibold'>{summary.totalCompletedTasks}</span>
            <div className='flex flex-row justify-end items-center gap-1'>
              <IconSparkles className='h-3 w-3 text-blue-500' />
              <span className='text-[9px] text-neutral-400'>{summary.totalTasks} tasks</span>
            </div>
          </div>
        </motion.div>

        {/* Longest Session Card */}
        <motion.div
          variants={cardVariants}
          whileHover={{ scale: 1.02, backgroundColor: "rgba(23, 23, 23, 1)" }}
          whileTap={{ scale: 0.98 }}
          className='w-full h-[4.5rem] flex justify-evenly items-center py-2.5 rounded-xl bg-neutral-900/80 border border-transparent hover:border-neutral-800 transition-colors cursor-pointer'
        >
          <div className='w-12 h-12 flex justify-center rounded-xl bg-yellow-900/60 items-center'>
            <IconTrendingUp className='w-8 h-8 text-yellow-500' />
          </div>
          <div className='h-full w-[50%] flex flex-col '>
            <span className='text-lg text-neutral-100 font-semibold leading-tight'>Peak Session</span>
            <span className='text-sm text-neutral-500'>Average Session Duration</span>
          </div>
          <div className='h-full w-[25%] text-end'>
            <span className='text-xl w-full text-yellow-500 font-semibold'>
              {(() => {
                const seconds = summary?.summary?.[0]?.longestSession || 0;

                const hours = Math.floor(seconds / 3600);
                const minutes = Math.floor((seconds % 3600) / 60);

                return (
                  <>
                    {hours > 0 && `${hours}h `}
                    {minutes}m
                  </>
                );
              })()}
            </span>
            <div className='flex flex-row justify-end items-center gap-1'>
              <IconSparkles className='h-3 w-3 text-yellow-500' />
              <span className='text-[9px] text-neutral-400'>
                {(() => {
                  const avgSeconds = summary?.summary?.[0]?.averageSessionDuration || 0;

                  const totalMinutes = Math.round(avgSeconds / 60);

                  const hours = Math.floor(totalMinutes / 60);
                  const minutes = totalMinutes % 60;

                  return (
                    <>
                      Avg: {hours > 0 && `${hours}h `}
                      {minutes}m
                    </>
                  );
                })()}
              </span>
            </div>
          </div>
        </motion.div>

      </motion.div>
    </div>
  )
}

export default Personal_Stats