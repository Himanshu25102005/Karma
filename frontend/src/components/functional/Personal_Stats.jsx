import React, { useEffect } from 'react'
import { useAnimation, motion } from "framer-motion";
import api from '@/services/api';
import { IconClock, IconArrowUp, IconCircleCheck, IconArrowDown, IconTrendingUp, IconFlame } from '@tabler/icons-react';



const Personal_Stats = () => {

  useEffect(() => {
    const fetchOverview = async () => {
      const res = await api.overview();
      console.log('Data from stats overview: ', res.data);
    }

    fetchOverview();
  }, [])

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
  };

  return (
    <div className='h-full w-full p-2 flex flex-col'>
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

        </motion.div>
      </div>


      <motion.div
        initial="hidden"
        animate="show"
        variants={{
          show: { transition: { staggerChildren: 0.1 } } // Elements appear one by one
        }}
        className='flex-1 p-2 flex flex-col gap-2 max-h-[280px] overflow-y-auto custom-scrollbar'
      >



        {/* Streak */}
        <motion.div
          variants={cardVariants}
          whileHover={{ scale: 1.02, backgroundColor: "rgba(23, 23, 23, 1)" }}
          whileTap={{ scale: 0.98 }}
          className='w-full h-[4.5rem] flex justify-evenly items-center py-2.5 rounded-xl bg-neutral-900/80 border border-transparent hover:border-neutral-800 transition-colors cursor-pointer'
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
            <span className='text-sm text-neutral-500'>Active focus days</span>
          </div>
          <div className='h-full w-[25%] text-end'>
            <span className='text-xl w-full text-green-300/90 font-semibold'>5 Days</span>
            <div className='w-full h-[1.5rem] flex flex-row justify-center items-center gap-1'>
              <div className='h-4 w-4 bg-green-600 rounded-sm'></div>
              <div className='h-4 w-4 bg-green-600 rounded-sm'></div>
              <div className='h-4 w-4 bg-green-600 rounded-sm'></div>
              <div className='h-4 w-4 bg-green-600 rounded-sm'></div>
              <div className='h-4 w-4 bg-green-600 rounded-sm'></div>
              <div className='h-4 w-4 rounded-sm border-1 border-neutral-500'></div>
              <div className='h-4 w-4 rounded-sm border-1 border-neutral-500'></div>
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
            <span className='text-xl w-full text-green-300/90 font-semibold'>2h 14m</span>
            <div className='flex flex-row justify-end items-center gap-1'>
              <IconArrowUp className='h-3 w-3 text-green-400' />
              <span className='text-[9px] text-neutral-400'>18% vs yesterday</span>
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
            <span className='text-sm text-neutral-500'>Milestones reached</span>
          </div>
          <div className='h-full w-[25%] text-end'>
            <span className='text-xl w-full text-green-300/90 font-semibold'>4</span>
            <div className='flex flex-row justify-end items-center gap-1'>
              <IconArrowUp className='h-3 w-3 text-green-400' />
              <span className='text-[9px] text-neutral-400'>+1 from yesterday</span>
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
            <span className='text-sm text-neutral-500'>Best individual sprint</span>
          </div>
          <div className='h-full w-[25%] text-end'>
            <span className='text-xl w-full text-green-300/90 font-semibold'>52m</span>
            <div className='flex flex-row justify-end items-center gap-1'>
              <IconArrowDown className='h-3 w-3 text-red-400' />
              <span className='text-[9px] text-neutral-400'>8m vs yesterday</span>
            </div>
          </div>
        </motion.div>

      </motion.div>
    </div>
  )
}

export default Personal_Stats