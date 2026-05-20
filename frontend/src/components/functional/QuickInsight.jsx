import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { IconBrandGithub } from "@tabler/icons-react";
import api from '@/services/api';

const QuickInsight = () => {

  const [activeProject, setActiveProject] = useState(null);

  useEffect(() => {
    const fetchMostActiveProject = async () => {
      try {
        const res = await api.mostActiveProject();
        console.log("Active Project ", res.data)
        setActiveProject(res.data.ActiveProject);
      } catch (err) {
        console.error("Error fetching most active project:", err);
      }
    };

    fetchMostActiveProject();
  }, []);

  return (
    <>
      <div className='h-[15rem] w-full  mt-2 border-1 border-solid border-neutral-800 bg-white/[0.02] rounded-xl p-2 flex flex-col'>
        {/* Heading */}
        <div className='h-[2.5rem] w-full flex justify-between items-center'>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className='flex gap-2 justify-center items-center'>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-briefcase text-[#0096FF]">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M3 9a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2l0 -9" />
              <path d="M8 7v-2a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v2" />
              <path d="M12 12l0 .01" />
              <path d="M3 13a20 20 0 0 0 18 0" />
            </svg>
            <span className='text-lg text-neutral-200 font-semibold'>Most Active Project</span>
          </motion.div>
        </div>

        <div className=' flex-1  p-2 flex gap-1'>
          {/* Icon Div */}
          <div className='h-full w-[20%]  relative'>
            <div className='absolute h-17 w-17 flex justify-center items-center  rounded-xl top-2  bg-green-900/20'>
              <IconBrandGithub className='h-13 w-13 text-green-500' />
            </div>
          </div>

          {/* Text Div */}
          <div className='h-full w-[80%] flex flex-col px-2 py-2'>
            {/* 1. Added optional chaining (?.) and a fallback placeholder */}
            <span className='text-xl text-neutral-100 font-semibold '>
              {activeProject?.name || "Loading Project..."}
            </span>

            <span className='text-2xl text-green-700 font-semibold mt-1'>
              {(() => {
                const totalMinutes = Math.round(activeProject?.totalMinutes || 0);
                const hours = Math.floor(totalMinutes / 60);
                const minutes = totalMinutes % 60;

                return (
                  <>
                    {hours > 0 && `${hours}h `}
                    {minutes}m
                  </>
                );
              })()}
            </span>

            <div className='w-[60%] bg-neutral-600 h-px mt-1'></div>
            <span className='text-[11px] text-neutral-500 pt-1'>Description:</span>

            {/* 2. Added optional chaining (?.) here as well */}
            <span className='text-[13px] text-neutral-200'>
              {activeProject?.description || "No description provided."}
            </span>
          </div>
        </div>
      </div>
    </>
  )
}

export default QuickInsight