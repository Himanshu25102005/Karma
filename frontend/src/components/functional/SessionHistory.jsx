import React, { useState } from 'react'
import { IconClockCode, IconChevronRight, IconFileCheck, IconFile } from "@tabler/icons-react";
import { motion } from 'framer-motion';

const SessionHistory = () => {
    const [myActivity, setMyActivity] = useState(true);
    const [isEmpty, setIsEmpty] = useState(false)
    return (
        <>
            <div className='min-h-[320px] max-h-[340px] w-full border-1 border-solid border-neutral-500 rounded-xl p-2 mt-4 flex flex-col'>
                {/* Heading */}
                <div className='h-8 w-full  flex justify-between items-center'>
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className='flex gap-2 justify-center items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-history text-[#5D3FD3]">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M12 8l0 4l2 2" />
                            <path d="M3.05 11a9 9 0 1 1 .5 4m-.5 5v-5h5" />
                        </svg>
                        <span className='text-lg text-neutral-200 font-semibold'>Session History</span>
                    </motion.div>
                    <motion.button
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className='flex gap-2 justify-center cursor-target items-center'>
                        <span className='text-neutral-500'>View full history</span>
                        <IconChevronRight className='h-5 w-5 ' />

                    </motion.button>
                </div>

                {/* Toggle (Me<->Friends) */}
                <div className="relative h-12 w-60 bg-neutral-900 border border-neutral-800 rounded-xl mt-4 flex p-1 p-1">
                    {/* The Animated "Pill" */}
                    <motion.div
                        className="absolute top-1 bottom-1 left-1 w-[calc(50%-4px)] bg-indigo-600/40 rounded-lg shadow-lg"
                        animate={{ x: myActivity ? 0 : "100%" }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />

                    <button
                        className={`relative z-10 h-full w-1/2 flex justify-center cursor-target items-center text-xs font-medium transition-colors duration-300 ${myActivity ? "text-white" : "text-neutral-500"
                            }`}
                        onClick={() => setMyActivity(true)}
                    >
                        Me
                    </button>

                    <button
                        className={`relative z-10 h-full w-1/2 flex justify-center cursor-target items-center text-xs font-medium transition-colors duration-300 ${!myActivity ? "text-white" : "text-neutral-500"
                            }`}
                        onClick={() => setMyActivity(false)}
                    >
                        Friends
                    </button>
                </div>

                {/* History */}
                <div className=' flex-1 mt-4 flex flex-col gap-2 overflow-y-auto  '>
                    {isEmpty ? (
                        <div className="flex-1 text-neutral-500 italic flex justify-center items-center p-4 ">
                            No history found. Start working to see sessions!
                        </div>
                    ) : (
                        <>
                            {/* Individual Sessions */}
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                className='h-[3.2rem] w-full bg-[#1A1A1A] border border-neutral-800 rounded-lg flex-shrink-0 p-1 flex gap-1'>
                                <div className='h-full w-[58%] flex gap-3 border-r-2 border-neutral-600'>
                                    <div className='h-full w-[20%] flex justify-center items-center bg-green-600/20 rounded-xl border border-green-500/30'>
                                        <IconClockCode className='text-green-500 h-8 w-8' />
                                    </div>

                                    <div className='flex-1 flex flex-col justify-center items-start leading-tight'>
                                        <span className='text-white text-sm font-medium'>Karma</span>
                                        <span className='text-neutral-400 text-[10px]'>Saas</span>
                                    </div>
                                </div>

                                {/* Right side status block */}
                                <div className='flex-1 rounded-md flex'>
                                    <div className='h-full w-[80%] flex flex-col justify-center items-start px-2 leading-tight'>
                                        <span className='text-white text-sm font-medium'>1h 20m</span>
                                        <span className='text-neutral-400 text-[10px]'>07/05/26, 23:33</span>
                                    </div>

                                    <div className='flex-1 flex justify-center items-center'>
                                        <IconFileCheck className='text-green-500 h-6 w-6' />
                                    </div>
                                </div>
                            </motion.div>
                        </>
                    )}
                </div>
            </div>


        </>
    )
}

export default SessionHistory