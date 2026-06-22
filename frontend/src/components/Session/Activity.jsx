import React from 'react'
import { motion } from "framer-motion";
import { IconActivity } from "@tabler/icons-react";
import SessionHistory from './SessionHistory';
import LiveCoding from './LiveCoding';
import QuickInsight from './QuickInsight';


const Activity = ({ fillHeight = false }) => {
  return (
    <div className={`w-full p-2 rounded-xl flex flex-col ${fillHeight ? 'h-full min-h-0 overflow-hidden' : ''}`}>
      {/* Heading */}
      <div className='shrink-0 w-full'>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="flex items-center justify-between px-4 py-3 mb-3"
        >
          <div className="flex flex-col">
            <span className="text-3xl font-semibold tracking-tight text-white">
              Activity
            </span>
            <div className="mt-1 h-[2px] w-10 bg-white/20 rounded-full" />
          </div>
          <div className="text-sm text-gray-400">
            <IconActivity />
          </div>
        </motion.div>
      </div>

      <div className={`flex flex-col ${fillHeight ? 'flex-1 min-h-0 overflow-hidden' : ''}`}>
        <div className="shrink-0">
          <LiveCoding />
        </div>
        <SessionHistory fillHeight={fillHeight} />
        <div className="shrink-0">
          <QuickInsight />
        </div>
      </div>
    </div>
  )
}

export default Activity
