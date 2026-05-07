import React from 'react'
import { useAnimation, motion } from "framer-motion";
import { IconActivity } from "@tabler/icons-react";
import SessionHistory from './SessionHistory';
import LiveCoding from './LiveCoding';


const Activity = () => {
  return (
    <div className='h-full w-full  p-2  rounded-xl'>
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
              Activity
            </span>

            {/* subtle underline */}
            <div className="mt-1 h-[2px] w-10 bg-white/20 rounded-full" />
          </div>

          {/* OPTIONAL RIGHT (future use) */}
          <div className="text-sm text-gray-400">
            <IconActivity />
          </div>

        </motion.div>
      </div>

      {/* Whose coding rn */}
      <LiveCoding />  
      {/* Session History */}
      <SessionHistory />


    </div>
  )
}

export default Activity