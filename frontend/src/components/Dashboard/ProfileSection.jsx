'use client'

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from "motion/react";
import { IconFlameFilled, IconAlarm, IconPlayerPlay, IconCirclePlus, IconCircleCheck, IconSparklesFilled } from '@tabler/icons-react';
import api from '@/services/api';



const ProfileSection = () => {
    const [streakData, setStreakData] = useState([]);
    useEffect(() => {
        const fetchOverview = async () => {
            const streak = await api.getStreak();
            setStreakData(streak.data);
        }


        fetchOverview();
    }, [])
    return (
        <>
            <div className='h-full w-full flex flex-col gap-2'>
                <div className='h-10 relative w-full flex justify-between items-center'>
                    <span className="text-xl font-semibold tracking-wide text-neutral-200 font-mono">
                        Profile and Achievements Section
                    </span>
                </div>
                <div className="w-full h-full border border-neutral-800 rounded-xl p-2 bg-neutral-900/10 divide-y divide-neutral-500 flex flex-col">

                    {/* Profile Section */}
                    <div className='w-full h-[30%] flex flex-col pb-2'>
                        {/* Profile picture and User Details */}
                        <div className='w-full h-[70%]  px-10 flex justify-center items-center gap-2'>
                            {/* PFP */}
                            <div className='w-[40%] aspect-square rounded-full overflow-hidden relative'>
                                <Image
                                    src="https://i.pinimg.com/736x/ae/a7/a9/aea7a9551cda1f88cc5e6e7ea52709f1.jpg"
                                    alt="User Profile Avatar Picture"
                                    width={160}
                                    height={160}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            {/* User Details */}
                            <div className='w-full h-full flex flex-col justify-center items-start px-5 gap-1'>
                                <span className='font-bold text-xl text-neutral-300'>Harsh</span>
                                <span className='font-semibold text-md text-neutral-400'>Building in Public</span>
                                <span className='font-semibold text-sm text-neutral-600'>harsh@gmail.com</span>
                            </div>
                        </div>

                        <div className='flex-1 flex flex-row justify-center items-center gap-5'>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                                className='flex flex-row justify-center gap-2 items-center border p-1.5 rounded-xl border-[#be3807] bg-orange-600/20'>
                                <IconFlameFilled width={17} height={17} className='text-[#f3a30e]' />
                                <span className='font-semibold text-neutral-200'>{streakData?.currentStreak || 0} Day Streak</span>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                                className='flex flex-row justify-center gap-2 items-center border p-1.5 rounded-xl border-[#6e9b07] bg-[#1b580b71]'>
                                <IconSparklesFilled width={17} height={17} className='text-[#4ff30e]' />
                                <span className='font-semibold text-neutral-200'>Best: {streakData?.longestStreak || 0} Days </span>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                                className='flex flex-row justify-center gap-2 items-center border p-1.5 rounded-xl border-[#423f3e] bg-[#111110]'>
                                <IconAlarm width={17} height={17} className='text-[#807779e8]' />
                                <span className='font-semibold text-neutral-200'>Lv. 2</span>
                            </motion.div>
                        </div>
                    </div>

                    {/* Achievements Section */}
                    <div className='w-full h-[48%] p-1 py-2'>
                        <AchievementSection />
                    </div>

                    {/* Quick Actions */}
                    <div className='flex-1  p-1 py-2 overflow-y-auto'>
                        <QuickActions />
                    </div>
                </div>
            </div>
        </>
    )
}



const AchievementSection = () => {
    return (
        <>
            <div className='h-full w-full flex flex-col gap-1'>
                <div className='w-full'>
                    <span className="text-lg font-semibold tracking-wide text-neutral-300 font-mono">
                        Achievements
                    </span>
                </div>

                <div className='flex-1  p-1 flex flex-col items-center gap-1 overflow-y-auto
                    [&::-webkit-scrollbar]:w-1.5
                    [&::-webkit-scrollbar-track]:bg-transparent
                    [&::-webkit-scrollbar-thumb]:bg-neutral-800
                    [&::-webkit-scrollbar-thumb]:rounded-full
                    hover:[&::-webkit-scrollbar-thumb]:bg-neutral-700'
                >

                    {/* Individual Achievement */}
                    <div className='w-full rounded-lg py-2 px-1 flex flex-row justify-center items-center gap-2 bg-[#171717] border border-neutral-700 
                     '>
                        {/* Icon */}
                        <div className='w-[15%] aspect-square rounded-full overflow-hidden border border-[#04f30c] flex justify-center items-center  bg-[#04f30c]/30'>
                            <IconSparklesFilled className='text-[#04f30c]' />
                        </div>
                        {/* Content */}
                        <div className='w-[53%] h-full flex flex-col justify-center items-start  shrink'>
                            <span className='text-md text-neutral-200 font-semibold'>First Steps</span>
                            <span className='text-sm text-neutral-400'>Complete your first session</span>
                            <div className='text-md flex flex-row px-1 justify-center items-center border rounded-md bg-neutral-900 text-green-600'>
                                <IconCircleCheck width={11} height={11} />
                                <span className='text-[10px]'> Completed</span>
                            </div>
                        </div>
                        {/* Information */}
                        <div className='w-[25%] h-[80%] rounded-xl overflow-hidden border border-neutral-700 flex flex-col justify-center items-center  bg-neutral-800/40 gap-2 px-1'>
                            <span className='text-md text-[#04f30c] font-semibold '>Rare</span>
                            <span className='text-[7px] text-neutral-400'>May 29, 2025</span>
                        </div>
                    </div>
                    <div className='w-full rounded-lg py-2 px-1 flex flex-row justify-center items-center gap-2 bg-[#171717] border border-neutral-700 
                     '>
                        {/* Icon */}
                        <div className='w-[15%] aspect-square rounded-full overflow-hidden border border-[#f3ab04] flex justify-center items-center  bg-[#f3ab04]/30'>
                            <IconFlameFilled className='text-[#f3ab04]' />
                        </div>
                        {/* Content */}
                        <div className='w-[53%] h-full flex flex-col justify-center items-start  shrink'>
                            <span className='text-md text-neutral-200 font-semibold'>Consistency King</span>
                            <span className='text-sm text-neutral-400'>Maintain a 3 day Streak</span>
                            <div className='text-md flex flex-row px-1 justify-center items-center border rounded-md bg-neutral-900 text-green-600'>
                                <IconCircleCheck width={11} height={11} />
                                <span className='text-[10px]'> Completed</span>
                            </div>
                        </div>
                        {/* Information */}
                        <div className='w-[25%] h-[80%] rounded-xl overflow-hidden border border-neutral-700 flex flex-col justify-center items-center  bg-neutral-800/40 gap-2 px-1'>
                            <span className='text-md text-[#f3ab04] font-semibold '>Epic</span>
                            <span className='text-[7px] text-neutral-400'>May 29, 2025</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const QuickActions = () => {
    return (
        <>
            <div className='h-full w-full flex flex-col gap-1'>
                <div className='w-full flex flex-col'>
                    <span className="text-lg font-semibold tracking-wide text-neutral-300 font-mono">
                        Quick Actions
                    </span>
                    <span className='font-thin text-sm text-neutral-500/90'>Instant triggers to spin up sessions or map out tasks.</span>
                </div>
                <div className='flex-1 flex flex-row justify-between items-center gap-2 px-6' >
                    <motion.a
                        href='/session'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className='flex flex-row justify-center gap-2 items-center border cursor-pointer p-1.5 px-2 rounded-xl border-[#143609] bg-[#0c08253b]/30'>
                        <IconPlayerPlay width={20} height={20} className='text-[#36c20b]' stroke={2.3} />
                        <span className='font-semibold text-neutral-300 text-lg'>Start Session</span>
                    </motion.a>
                    <motion.a
                        href='/session'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className='cursor-pointer flex flex-row justify-center gap-2 items-center border p-1.5 px-2 rounded-xl border-[#5e410c] bg-[#0c08253b]/30'>
                        <IconCirclePlus width={20} height={20} className='text-[#e9a018]' stroke={2.1} />
                        <span className='font-semibold text-neutral-300 text-lg'>Add Task</span>
                    </motion.a>
                </div>
            </div>
        </>
    )
}
export default ProfileSection




/* 
<span className="text-lg font-semibold tracking-wide text-neutral-300 font-mono">
                Quick Actions
            </span><br />
            <span className='font-thin text-neutral-500/90'>Instant triggers to spin up sessions or map out tasks.</span>
            <div className='w-full flex flex-row justify-between items-center gap-5  pt-4'>
                <motion.a
                    href='/session'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className='flex flex-row justify-center gap-2 items-center border cursor-pointer p-1.5 px-2 rounded-xl border-[#143609] bg-[#0c08253b]/30'>
                    <IconPlayerPlay width={25} height={25} className='text-[#36c20b]' stroke={2.3} />
                    <span className='font-semibold text-neutral-300 text-lg'>Start Session</span>
                </motion.a>
                <motion.a
                    href='/session'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className='cursor-pointer flex flex-row justify-center gap-2 items-center border p-1.5 px-2 rounded-xl border-[#5e410c] bg-[#0c08253b]/30'>
                    <IconCirclePlus width={25} height={25} className='text-[#e9a018]' stroke={2.1} />
                    <span className='font-semibold text-neutral-300 text-lg'>Add Task</span>
                </motion.a>

            </div>
*/