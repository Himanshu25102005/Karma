
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { IconChevronRight, IconLivePhoto, IconClock, IconFileCheck } from "@tabler/icons-react";
const LiveCoding = ({ compact = false }) => {

    const [isEmpty, setIsEmpty] = useState(false)
    return (
        <>
            <div className={`${compact ? 'min-h-[160px] max-h-[180px] mt-2' : 'min-h-[200px] max-h-[200px] mt-4'} w-full border-1 border-solid border-neutral-800 bg-white/[0.02] rounded-xl p-2 flex flex-col`}>
                {/* Heading */}
                <div className='h-8 w-full flex justify-between items-center'>
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className='flex gap-2 justify-center items-center'>
                        <div className='h-3 w-3 bg-red-900 rounded-full'></div>
                        <span className='text-lg text-neutral-200 font-semibold'>Currently in Focus</span>
                        <motion.div
                            animate={{
                                opacity: [0.4, 1, 0.4],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,      // Keep going forever
                                repeatType: "reverse", // Smoothly fade in and out
                                ease: "easeInOut"
                            }}
                            className='h-6 text-sm text-red-900 rounded-md w-13 bg-red-900/20 font-semibold flex justify-center items-center'>
                            <IconLivePhoto className='h-4 w-4' />
                            Live
                        </motion.div>
                    </motion.div>
                    <motion.button
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className='flex gap-2 justify-center cursor-target items-center'>
                        <span className='text-neutral-500'>See all</span>
                        <IconChevronRight className='h-5 w-5 ' />
                    </motion.button>
                </div>

                <div className={`flex-1 mt-4 flex flex-col gap-2 ${compact ? 'overflow-y-auto' : ''}`}>
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
                                className='h-[4rem] w-full bg-[#1A1A1A] border border-neutral-800 rounded-lg flex-shrink-0 p-1 flex gap-1'>
                                <div className='h-full w-[70%] flex gap-3  border-neutral-600'>
                                    <div
                                        className='h-full w-[17%] flex justify-center items-center rounded-full bg-cover bg-center bg-no-repeat'
                                        style={{
                                            backgroundImage: "url('https://i.pinimg.com/736x/ae/a7/a9/aea7a9551cda1f88cc5e6e7ea52709f1.jpg')",
                                        }}
                                    >
                                        {/* Content */}
                                    </div>

                                    <div className='flex-1 flex flex-col justify-center items-start leading-tight'>
                                        <span className='text-white text-sm font-medium'>Harsh</span>
                                        <span className='text-green-500 text-[10px] '>Karma</span> {/* ADD PROJECT COLOUR TO THIS TEXT */}
                                        <span className='text-neutral-400 text-[10px]'>SaaS</span>
                                    </div>
                                </div>

                                {/* Right side status block */}
                                <div className='flex-1 rounded-md flex justify-center items-center'>
                                    <div className=' h-8 w-8 flex justify-center items-center  rounded-full '>
                                        <IconClock className='text-green-500 h-5 w-5 ' />
                                    </div>

                                    <div className='flex-1 flex flex-col justify-center items-start px-2 leading-tight'>
                                        <span className=' text-lg text-green-600 font-medium'>40m</span>
                                        <span className='text-neutral-400 text-[10px]'>Elapsed</span>
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

export default LiveCoding