'use client'

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from "motion/react";
import { IconFlameFilled, IconAlarm, IconPlayerPlay, IconCirclePlus, IconCircleCheck, IconSparklesFilled } from '@tabler/icons-react';
import api from '@/services/api';
import useUserStore from '@/store/useUserStore';



const ProfileSection = () => {
    const [streakData, setStreakData] = useState([]);
    const [badgeData, setBadgeData] = useState([]);
    const setCurrentUser = useUserStore((state) => state.setCurrentUser)
    const username = useUserStore((state) => state.username)
    const email = useUserStore((state) => state.email)
    const profilePicture = useUserStore((state) => state.profilePicture)
    useEffect(() => {
        const fetchOverview = async () => {
            const streak = await api.getStreak();
            const badges = await api.getMyBadges();
            console.log("Data from the badge route ", badges.data.badges);
            setBadgeData(badges.data.badges);
            setStreakData(streak.data);

            await setCurrentUser();
        }

        fetchOverview();
    }, [])

    useEffect(() => {
        console.log("badge data: ", badgeData)
    }, [badgeData])

    return (
        <>
            <div className='h-full w-full min-w-0 flex flex-col gap-2'>
                <div className='min-h-10 relative w-full flex justify-between items-center'>
                    <span className="text-base sm:text-xl font-semibold tracking-wide text-neutral-200 font-mono">
                        Profile and Achievements Section
                    </span>
                </div>
                <div className="w-full flex-1 min-h-0 h-full border border-neutral-800 rounded-xl p-2 bg-neutral-900/10 divide-y divide-neutral-500 flex flex-col">

                    {/* Profile Section */}
                    <div className='w-full shrink-0 flex flex-col pb-2 gap-2'>
                        {/* Profile picture and User Details */}
                        <div className='w-full flex flex-col sm:flex-row px-4 sm:px-10 justify-center items-center gap-3 sm:gap-2'>
                            {/* PFP */}
                            <div className='w-24 sm:w-[40%] max-w-[160px] aspect-square rounded-full overflow-hidden relative shrink-0'>
                                <Image
                                    src={profilePicture || "https://i.pinimg.com/736x/b2/ea/a0/b2eaa0d4918d54021f9c7aa3fc3d3cf3.jpg"}
                                    alt="User Profile Avatar Picture"
                                    width={160}
                                    height={160}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            {/* User Details */}
                            <div className='w-full min-w-0 flex flex-col justify-center items-center sm:items-start px-2 sm:px-5 gap-1 text-center sm:text-left'>
                                <span className='font-bold text-lg sm:text-xl text-neutral-300 truncate max-w-full'>{username}</span>
                                <span className='font-semibold text-sm sm:text-md text-neutral-400'>Building in Public</span>
                                <span className='font-semibold text-xs sm:text-sm text-neutral-600 truncate max-w-full'>{email}</span>
                            </div>
                        </div>

                        <div className='flex flex-wrap flex-row justify-center items-center gap-2 sm:gap-5 px-2'>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                                whileHover={{ scale: 1.01 }}
                                className='flex flex-row justify-center gap-2 items-center border p-1.5 rounded-xl border-[#be3807] bg-orange-600/20 shrink-0'>
                                <IconFlameFilled width={17} height={17} className='text-[#f3a30e]' />
                                <span className='font-semibold text-neutral-200 text-sm sm:text-base whitespace-nowrap'>{streakData?.currentStreak || 0} Day Streak</span>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                                whileHover={{ scale: 1.01 }}
                                className='flex flex-row justify-center gap-2 items-center border p-1.5 rounded-xl border-[#6e9b07] bg-[#1b580b71] shrink-0'>
                                <IconSparklesFilled width={17} height={17} className='text-[#4ff30e]' />
                                <span className='font-semibold text-neutral-200 text-sm sm:text-base whitespace-nowrap'>Best: {streakData?.longestStreak || 0} Days </span>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                                whileHover={{ scale: 1.02 }}
                                className='flex flex-row justify-center gap-2 items-center border p-1.5 rounded-xl border-[#423f3e] bg-[#111110] shrink-0'>
                                <IconAlarm width={17} height={17} className='text-[#807779e8]' />
                                <span className='font-semibold text-neutral-200 text-sm sm:text-base whitespace-nowrap'>Lv. 2</span>
                            </motion.div>
                        </div>
                    </div>

                    {/* Achievements Section */}
                    <div className='w-full flex-1 min-h-0 p-1 py-2 overflow-hidden'>
                        <AchievementSection badgeData={badgeData} />
                    </div>

                    {/* Quick Actions */}
                    <div className='shrink-0 p-1 py-2'>
                        <QuickActions />
                    </div>
                </div>
            </div>
        </>
    )
}



const AchievementSection = ({ badgeData }) => {
    return (
        <>
            <div className='h-full w-full min-w-0 flex flex-col gap-1'>
                <div className='w-full'>
                    <span className="text-base sm:text-lg font-semibold tracking-wide text-neutral-300 font-mono">
                        Achievements
                    </span>
                </div>

                <div className='flex-1 min-h-0 p-1 flex flex-col items-center gap-1 overflow-y-auto
                    [&::-webkit-scrollbar]:w-1.5
                    [&::-webkit-scrollbar-track]:bg-transparent
                    [&::-webkit-scrollbar-thumb]:bg-neutral-800
                    [&::-webkit-scrollbar-thumb]:rounded-full
                    hover:[&::-webkit-scrollbar-thumb]:bg-neutral-700'
                >

                    {/* Individual Achievement */}

                    {badgeData.map((badge) => (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8 }}
                            whileHover={{ scale: 1.02 }}
                            key={badge.badge?._id || badge.earnedAt}
                            className='w-full min-w-0 rounded-lg py-2 px-1 flex flex-row justify-center items-center gap-2 bg-[#171717] border border-neutral-700 
                     '>
                            {/* Icon */}
                            <div className='w-10 sm:w-[15%] min-w-[2.5rem] aspect-square rounded-full overflow-hidden border border-[#04f30c] flex justify-center items-center shrink-0'
                                style={{
                                    '--badge-theme-color': badge.badge?.color || '#525252',
                                    backgroundColor: 'color-mix(in srgb, var(--badge-theme-color) 30%, transparent)',
                                    borderColor: badge.badge?.color || '#525252'
                                }}
                            >
                                {/* <IconSparklesFilled className='text-[#04f30c]' /> */}
                                {badge.badge?.icon}
                            </div>
                            {/* Content */}
                            <div className='flex-1 min-w-0 h-full flex flex-col justify-center items-start shrink'>
                                <span className='text-sm sm:text-md text-neutral-200 font-semibold truncate w-full'>{badge.badge.name}</span>
                                <span className='text-xs sm:text-sm text-neutral-400 line-clamp-2'>{badge.badge.description}</span>
                                <div className='text-md flex flex-row px-1 justify-center items-center border rounded-md bg-neutral-900 text-green-600'>
                                    <IconCircleCheck width={11} height={11} />
                                    <span className='text-[10px]'> Completed</span>

                                </div>
                            </div>
                            {/* Information */}
                            <div className='w-16 sm:w-[25%] shrink-0 h-[80%] rounded-xl overflow-hidden border border-neutral-700 flex flex-col justify-center items-center bg-neutral-800/40 gap-2 px-1'>
                                <span className='text-md  font-semibold '
                                    style={{
                                        color: badge.badge?.color || '#ffffff'
                                    }}
                                >{badge.badge.rarity}</span>
                                <span className='text-[7px] text-neutral-400'>{new Date(badge.earnedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                            </div>
                        </motion.div>
                    ))}


                </div>
            </div>
        </>
    )
}

const QuickActions = () => {
    return (
        <>
            <div className='h-full w-full min-w-0 flex flex-col gap-1'>
                <div className='w-full flex flex-col'>
                    <span className="text-base sm:text-lg font-semibold tracking-wide text-neutral-300 font-mono">
                        Quick Actions
                    </span>
                    <span className='font-thin text-xs sm:text-sm text-neutral-500/90'>Instant triggers to spin up sessions or map out tasks.</span>
                </div>
                <div className='flex flex-col sm:flex-row justify-center sm:justify-between items-stretch sm:items-center gap-2 px-2 sm:px-6' >
                    <motion.a
                        href='/session'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        whileHover={{ scale: 1.05 }}
                        className='flex flex-row justify-center gap-2 items-center border cursor-pointer p-1.5 px-2 rounded-xl border-[#143609] bg-[#0c08253b]/30 w-full sm:w-auto'>
                        <IconPlayerPlay width={20} height={20} className='text-[#36c20b]' stroke={2.3} />
                        <span className='font-semibold text-neutral-300 text-base sm:text-lg'>Start Session</span>
                    </motion.a>
                    <motion.a
                        href='/session'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        whileHover={{ scale: 1.05 }}
                        className='cursor-pointer flex flex-row justify-center gap-2 items-center border p-1.5 px-2 rounded-xl border-[#5e410c] bg-[#0c08253b]/30 w-full sm:w-auto'>
                        <IconCirclePlus width={20} height={20} className='text-[#e9a018]' stroke={2.1} />
                        <span className='font-semibold text-neutral-300 text-base sm:text-lg'>Add Task</span>
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