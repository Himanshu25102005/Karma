'use client'

import React, { useEffect, useState } from 'react';
import { FloatingDock } from "../../components/Common/Floating-dock";
import { SmoothCursor } from '@/components/Effects/Smooth-Cursor2';
import { IconBrandGithub, IconBrandX, IconHome, IconClock, IconSparkles, IconTerminal2, IconClockPlay, IconHomeStats, IconDeviceLaptop, IconCircleCheck, IconTrendingUp } from "@tabler/icons-react";
import Histogram from '@/components/Dashboard/Histogram';
import TimeByProject from '@/components/Dashboard/TimeByProject';
import WeeklyHeatmap from '@/components/Dashboard/WeeklyHeatmap';
import ProfileSection from '@/components/Dashboard/ProfileSection';
import useUserStore from '@/store/useUserStore';
import { easeInOut, motion } from 'framer-motion';
import api from '@/services/api';
import Saarthi from '@/components/Dashboard/Saarthi';




const AnalyticsPage = () => {
    const links = [
        {
            title: "Home",
            icon: (
                <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
            ),
            href: "#",
        },

        {
            title: "Products",
            icon: (
                <IconTerminal2 className="h-full w-full text-neutral-500 dark:text-neutral-300" />
            ),
            href: "#",
        },
        {
            title: "Projects",
            icon: (
                <IconDeviceLaptop className="h-full w-full text-neutral-500 dark:text-neutral-300" />
            ),
            href: "#",
        },
        {
            title: "Session",
            icon: (
                <IconClockPlay className='h-20 w-20 text-white' />
            ),
            href: "http://localhost:3000/session",
        },
        {
            title: "Dashboard",
            icon: (
                <IconHomeStats className="h-full w-full text-neutral-500 dark:text-neutral-300" />
            ),
            href: "http://localhost:3000/dashboard",
        },

        {
            title: "Twitter",
            icon: (
                <IconBrandX className="h-full w-full text-neutral-500 dark:text-neutral-300" />
            ),
            href: "#",
        },
        {
            title: "GitHub",
            icon: (
                <IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />
            ),
            href: "#",
        },
    ];

    

    const username = useUserStore((state) => state.username)
    return (
        <>
            <SmoothCursor />

            <div className="min-h-screen lg:h-screen w-full max-w-[100vw] bg-[#0a0a0a] flex flex-col relative overflow-x-hidden lg:overflow-hidden select-none">

                {/* TOP MARGIN*/}
                <div className=" h-8 lg:h-14 w-full border-b border-dashed border-neutral-700/60 flex items-center px-6">
                    {/* <span className="text-xs font-mono text-neutral-500 tracking-widest uppercase">कΛRMΛ // System_v2</span> */}
                </div>

                {/* left and right vertical margins*/}
                <div className="flex-1 flex flex-row w-full">

                    {/* Left Margin Buffer */}
                    <div className="hidden lg:block w-16 xl:w-24 min-[1440px]:w-32 border-r border-dashed border-neutral-700/60 h-full shrink-0" />

                    {/* MAIN WORKING AREA */}
                    <div className="flex-1 h-full min-w-0 p-2 sm:p-3 overflow-y-auto overflow-x-hidden custom-scrollbar">
                        <div className='min-h-16 sm:h-20 flex flex-col p-2'>
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: [0, 0.5, 1] }}
                                transition={{ duration: 0.8 }}
                                className='font-semibold text-2xl sm:text-3xl text-neutral-100'>Good Morning {username}
                            </motion.span>   {/* Animate using ReactBits */}
                            <span className='text-sm sm:text-md text-neutral-400'>Overview of your focus and progress</span>
                        </div>


                        {/* Main Grid */}
                        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 lg:grid-rows-[auto_23rem_16.5rem] w-full min-w-0 p-2 gap-3 lg:items-stretch'>
                            {/* Brief Stats Section */}
                            <div className='col-span-1 sm:col-span-2 lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 min-w-0'>
                                <div className='min-w-0 w-full min-h-[7.5rem] lg:min-h-[7.5rem] p-1 rounded-xl bg-[#141414] flex flex-row gap-2 sm:gap-3'>
                                    {/* Icon */}
                                    <div className='shrink-0 relative flex justify-center'>
                                        <div className='h-12 w-12 sm:h-14 sm:w-14 flex justify-center items-center rounded-xl top-2 bg-green-900/20'>
                                            <IconClock className='h-8 w-8 sm:h-10 sm:w-10 text-green-500' />
                                        </div>
                                    </div>
                                    {/* Data and Text */}
                                    <div className='flex-1 min-w-0 flex flex-col'>
                                        <span className='text-neutral-400 text-sm sm:text-md font-semibold truncate'>Focus Time</span>
                                        <span className='text-neutral-200 text-2xl sm:text-3xl font-semibold'>1h 12m</span>
                                        <div className='flex flex-row items-center gap-1'>
                                            <IconSparkles className='h-3 w-3 text-green-400 shrink-0' />
                                            <span className='text-[9px] text-neutral-400 truncate'>From 6 sessions</span>
                                        </div>
                                    </div>
                                    <div className='hidden sm:block w-[25%] min-w-[60px] max-w-[100px] relative shrink-0'>
                                        <svg
                                            viewBox="0 0 320 100"
                                            xmlns="http://www.w3.org/2000/svg"
                                            // 1. Corrected: Converted raw string style property into a nested JS object mapping
                                            style={{ width: "100%", borderRadius: "6px", display: "block" }}
                                            role="img"
                                            aria-label="Bar chart with green bars on dark background"
                                            className='absolute bottom-2'
                                        >
                                            <title>Bar chart</title>

                                            <rect x="14" y="72" width="9" height="18" rx="1" fill="#1a9e60" />
                                            <rect x="30" y="60" width="9" height="30" rx="1" fill="#1db87a" />
                                            <rect x="44" y="55" width="9" height="35" rx="1" fill="#1db87a" />
                                            <rect x="58" y="65" width="9" height="25" rx="1" fill="#1a9e60" />
                                            <rect x="72" y="70" width="9" height="20" rx="1" fill="#1a9e60" />
                                            <rect x="86" y="52" width="9" height="38" rx="1" fill="#1db87a" />
                                            <rect x="100" y="60" width="9" height="30" rx="1" fill="#1db87a" />
                                            <rect x="114" y="68" width="9" height="22" rx="1" fill="#1a9e60" />
                                            <rect x="128" y="75" width="9" height="15" rx="1" fill="#167a4a" />
                                            <rect x="142" y="62" width="9" height="28" rx="1" fill="#1db87a" />
                                            <rect x="156" y="20" width="9" height="70" rx="1" fill="#22d97e" />
                                            <rect x="170" y="50" width="9" height="40" rx="1" fill="#1db87a" />
                                            <rect x="184" y="45" width="9" height="45" rx="1" fill="#1db87a" />
                                            <rect x="198" y="55" width="9" height="35" rx="1" fill="#1db87a" />
                                            <rect x="212" y="58" width="9" height="32" rx="1" fill="#1db87a" />
                                            <rect x="226" y="40" width="9" height="50" rx="1" fill="#1db87a" />
                                            <rect x="240" y="48" width="9" height="42" rx="1" fill="#1db87a" />
                                            <rect x="254" y="35" width="9" height="55" rx="1" fill="#22d97e" />
                                            <rect x="268" y="62" width="9" height="28" rx="1" fill="#1a9e60" />
                                            <rect x="282" y="55" width="9" height="35" rx="1" fill="#1db87a" />

                                            {/* 2. Corrected: stroke-width changed to camelCase strokeWidth */}
                                            <line x1="8" y1="90" x2="300" y2="90" stroke="#1db87a" strokeWidth="0.5" opacity="0.4" />
                                        </svg>
                                    </div>
                                </div>
                                <div className='min-w-0 w-full min-h-[7.5rem] lg:min-h-[7.5rem] p-1 rounded-xl bg-[#141414] flex flex-row gap-2 sm:gap-3'>
                                    {/* Icon */}
                                    <div className='shrink-0 relative flex justify-center'>
                                        <div className='h-12 w-12 sm:h-14 sm:w-14 flex justify-center items-center rounded-xl top-2 bg-blue-900/60'>
                                            <IconCircleCheck className='h-8 w-8 sm:h-10 sm:w-10 text-blue-500' />
                                        </div>
                                    </div>
                                    {/* Data and Text */}
                                    <div className='flex-1 min-w-0 flex flex-col'>
                                        <span className='text-neutral-400 text-sm sm:text-md font-semibold truncate'>Tasks Done</span>
                                        <span className='text-neutral-200 text-2xl sm:text-3xl font-semibold'>6</span>
                                        <div className='flex flex-row items-center gap-1'>
                                            <IconSparkles className='h-3 w-3 text-blue-500 shrink-0' />
                                            <span className='text-[9px] text-neutral-400 truncate'>Total 11 tasks</span>
                                        </div>
                                    </div>
                                    <div className='hidden sm:block w-[25%] min-w-[60px] max-w-[100px] relative shrink-0'>
                                        <svg
                                            viewBox="0 0 320 100"
                                            xmlns="http://www.w3.org/2000/svg"
                                            style={{ width: "100%", borderRadius: "6px", display: "block" }}
                                            role="img"
                                            aria-label="Bar chart with blue bars on dark background"
                                            className="absolute bottom-2"
                                        >
                                            <title>Bar chart</title>

                                            {/* Varied Data Points colored with shades of Blue */}
                                            <rect x="14" y="50" width="9" height="40" rx="1" fill="#2563eb" />
                                            <rect x="30" y="35" width="9" height="55" rx="1" fill="#3b82f6" />
                                            <rect x="44" y="68" width="9" height="22" rx="1" fill="#1d4ed8" />
                                            <rect x="58" y="45" width="9" height="45" rx="1" fill="#2563eb" />
                                            <rect x="72" y="58" width="9" height="32" rx="1" fill="#2563eb" />
                                            <rect x="86" y="25" width="9" height="65" rx="1" fill="#3b82f6" />
                                            <rect x="100" y="40" width="9" height="50" rx="1" fill="#3b82f6" />
                                            <rect x="114" y="72" width="9" height="18" rx="1" fill="#1d4ed8" />
                                            <rect x="128" y="55" width="9" height="35" rx="1" fill="#2563eb" />
                                            <rect x="142" y="55" width="9" height="35" rx="1" fill="#3b82f6" />
                                            <rect x="156" y="60" width="9" height="30" rx="1" fill="#1d4ed8" />
                                            <rect x="170" y="48" width="9" height="42" rx="1" fill="#2563eb" />
                                            <rect x="184" y="65" width="9" height="25" rx="1" fill="#1d4ed8" />
                                            <rect x="198" y="38" width="9" height="52" rx="1" fill="#3b82f6" />
                                            <rect x="212" y="52" width="9" height="38" rx="1" fill="#2563eb" />
                                            <rect x="226" y="70" width="9" height="20" rx="1" fill="#1d4ed8" />
                                            <rect x="240" y="42" width="9" height="48" rx="1" fill="#2563eb" />
                                            <rect x="254" y="58" width="9" height="32" rx="1" fill="#1d4ed8" />
                                            <rect x="268" y="55" width="9" height="35" rx="1" fill="#3b82f6" />
                                            <rect x="282" y="62" width="9" height="28" rx="1" fill="#1d4ed8" />

                                            {/* Baseline matched to the blue theme color scheme */}
                                            <line x1="8" y1="90" x2="300" y2="90" stroke="#3b82f6" strokeWidth="0.5" opacity="0.3" />
                                        </svg>
                                    </div>
                                </div>
                                <div className='min-w-0 w-full min-h-[7.5rem] lg:min-h-[7.5rem] p-1 rounded-xl bg-[#141414] flex flex-row gap-2 sm:gap-3'>
                                    {/* Icon */}
                                    <div className='shrink-0 relative flex justify-center'>
                                        <div className='h-12 w-12 sm:h-14 sm:w-14 flex justify-center items-center rounded-xl top-2 bg-yellow-900/60'>
                                            <IconTrendingUp className='h-8 w-8 sm:h-10 sm:w-10 text-yellow-500' />
                                        </div>
                                    </div>
                                    {/* Data and Text */}
                                    <div className='flex-1 min-w-0 flex flex-col'>
                                        <span className='text-neutral-400 text-sm sm:text-md font-semibold truncate'>Peak Session</span>
                                        <span className='text-neutral-200 text-2xl sm:text-3xl font-semibold'>1h 1m</span>
                                        <div className='flex flex-row items-center gap-1'>
                                            <IconSparkles className='h-3 w-3 text-yellow-500 shrink-0' />
                                            <span className='text-[9px] text-neutral-400 truncate'>Average Session Duration: 17m</span>
                                        </div>
                                    </div>
                                    <div className='hidden sm:block w-[25%] min-w-[60px] max-w-[100px] relative shrink-0'>
                                        <svg
                                            viewBox="0 0 320 100"
                                            xmlns="http://www.w3.org/2000/svg"
                                            style={{ width: "100%", borderRadius: "6px", display: "block" }}
                                            role="img"
                                            aria-label="Bar chart with amber/yellow bars on dark background"
                                            className="absolute bottom-2"
                                        >
                                            <title>Bar chart</title>

                                            {/* New Varied Data Points matching the yellow/amber theme */}
                                            <rect x="14" y="40" width="9" height="50" rx="1" fill="#f59e0b" />
                                            <rect x="30" y="68" width="9" height="22" rx="1" fill="#d97706" />
                                            <rect x="44" y="25" width="9" height="65" rx="1" fill="#eab308" />
                                            <rect x="58" y="55" width="9" height="35" rx="1" fill="#f59e0b" />
                                            <rect x="72" y="48" width="9" height="42" rx="1" fill="#f59e0b" />
                                            <rect x="86" y="72" width="9" height="18" rx="1" fill="#d97706" />
                                            <rect x="100" y="30" width="9" height="59" rx="1" fill="#eab308" />
                                            <rect x="114" y="50" width="9" height="40" rx="1" fill="#f59e0b" />
                                            <rect x="128" y="62" width="9" height="28" rx="1" fill="#d97706" />
                                            <rect x="142" y="35" width="9" height="55" rx="1" fill="#eab308" />
                                            <rect x="156" y="58" width="9" height="32" rx="1" fill="#f59e0b" />
                                            <rect x="170" y="65" width="9" height="25" rx="1" fill="#d97706" />
                                            <rect x="184" y="20" width="9" height="70" rx="1" fill="#eab308" />
                                            <rect x="198" y="45" width="9" height="45" rx="1" fill="#f59e0b" />
                                            <rect x="212" y="70" width="9" height="20" rx="1" fill="#d97706" />
                                            <rect x="226" y="38" width="9" height="52" rx="1" fill="#f59e0b" />
                                            <rect x="240" y="52" width="9" height="38" rx="1" fill="#f59e0b" />
                                            <rect x="254" y="60" width="9" height="30" rx="1" fill="#d97706" />
                                            <rect x="268" y="42" width="9" height="48" rx="1" fill="#f59e0b" />
                                            <rect x="282" y="33" width="9" height="57" rx="1" fill="#eab308" />

                                            {/* Baseline updated to match amber/yellow aesthetics */}
                                            <line x1="8" y1="90" x2="300" y2="90" stroke="#f59e0b" strokeWidth="0.5" opacity="0.3" />
                                        </svg>
                                    </div>
                                </div>
                                {/* THINK OF SOME OTHER METRIC HERE */}
                                <div className='min-w-0 w-full min-h-[7.5rem] lg:min-h-[7.5rem] p-1 rounded-xl bg-[#141414] flex flex-row gap-2 sm:gap-3'>
                                    {/* Icon */}
                                    <div className='shrink-0 relative flex justify-center'>
                                        <div className='h-12 w-12 sm:h-14 sm:w-14 flex justify-center items-center rounded-xl top-2 bg-green-900/20'>
                                            <IconBrandGithub className='h-8 w-8 sm:h-10 sm:w-10 text-green-500' />
                                        </div>
                                    </div>
                                    {/* Data and Text */}
                                    <div className='flex-1 min-w-0 flex flex-col'>
                                        <span className='text-neutral-400 text-sm sm:text-md font-semibold truncate'>Focus Time</span>
                                        <span className='text-neutral-200 text-2xl sm:text-3xl font-semibold'>1h 12m</span>
                                        <div className='flex flex-row items-center gap-1'>
                                            <IconSparkles className='h-3 w-3 text-green-400 shrink-0' />
                                            <span className='text-[9px] text-neutral-400 truncate'>From 6 sessions</span>
                                        </div>
                                    </div>
                                    <div className='hidden sm:block w-[25%] min-w-[60px] max-w-[100px] relative shrink-0'>
                                        <svg
                                            viewBox="0 0 320 100"
                                            xmlns="http://www.w3.org/2000/svg"
                                            // 1. Corrected: Converted raw string style property into a nested JS object mapping
                                            style={{ width: "100%", borderRadius: "6px", display: "block" }}
                                            role="img"
                                            aria-label="Bar chart with green bars on dark background"
                                            className='absolute bottom-2'
                                        >
                                            <title>Bar chart</title>

                                            <rect x="14" y="72" width="9" height="18" rx="1" fill="#1a9e60" />
                                            <rect x="30" y="60" width="9" height="30" rx="1" fill="#1db87a" />
                                            <rect x="44" y="55" width="9" height="35" rx="1" fill="#1db87a" />
                                            <rect x="58" y="65" width="9" height="25" rx="1" fill="#1a9e60" />
                                            <rect x="72" y="70" width="9" height="20" rx="1" fill="#1a9e60" />
                                            <rect x="86" y="52" width="9" height="38" rx="1" fill="#1db87a" />
                                            <rect x="100" y="60" width="9" height="30" rx="1" fill="#1db87a" />
                                            <rect x="114" y="68" width="9" height="22" rx="1" fill="#1a9e60" />
                                            <rect x="128" y="75" width="9" height="15" rx="1" fill="#167a4a" />
                                            <rect x="142" y="62" width="9" height="28" rx="1" fill="#1db87a" />
                                            <rect x="156" y="20" width="9" height="70" rx="1" fill="#22d97e" />
                                            <rect x="170" y="50" width="9" height="40" rx="1" fill="#1db87a" />
                                            <rect x="184" y="45" width="9" height="45" rx="1" fill="#1db87a" />
                                            <rect x="198" y="55" width="9" height="35" rx="1" fill="#1db87a" />
                                            <rect x="212" y="58" width="9" height="32" rx="1" fill="#1db87a" />
                                            <rect x="226" y="40" width="9" height="50" rx="1" fill="#1db87a" />
                                            <rect x="240" y="48" width="9" height="42" rx="1" fill="#1db87a" />
                                            <rect x="254" y="35" width="9" height="55" rx="1" fill="#22d97e" />
                                            <rect x="268" y="62" width="9" height="28" rx="1" fill="#1a9e60" />
                                            <rect x="282" y="55" width="9" height="35" rx="1" fill="#1db87a" />

                                            {/* 2. Corrected: stroke-width changed to camelCase strokeWidth */}
                                            <line x1="8" y1="90" x2="300" y2="90" stroke="#1db87a" strokeWidth="0.5" opacity="0.4" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Profile and Achievments Section */} {/* REMOVE THIS HEIGHT AND DEFINE ITS HEIGHT IN THE COMPONENT ITSELF */}
                            <div className='col-span-1 sm:col-span-2 lg:col-span-1 lg:row-span-2 lg:row-start-2 text-white min-h-[32rem] lg:min-h-0 lg:h-full rounded-xl bg-[#141414] p-3 sm:p-4 min-w-0 flex flex-col'>
                                <ProfileSection />
                            </div>

                            {/* Histogram */}
                            <div className='col-span-1 sm:col-span-2 lg:col-span-2 lg:row-start-2 text-white min-h-[20rem] lg:min-h-[23rem] lg:h-[23rem] rounded-xl bg-[#141414] p-3 sm:p-4 min-w-0 flex flex-col'>
                                <Histogram />
                            </div>

                            {/* Calender */}
                            <div className='col-span-1 sm:col-span-2 lg:col-span-2 lg:row-start-2 text-white min-h-[24rem] sm:min-h-[22rem] lg:min-h-[23rem] lg:h-[23rem] rounded-xl bg-[#141414] p-3 sm:p-4 min-w-0 flex flex-col'>
                                <Saarthi />
                            </div>

                            {/* Pie Chart */}
                            <div className='col-span-1 sm:col-span-2 lg:col-span-2 lg:row-start-3 text-white min-h-[18rem] lg:min-h-[16.5rem] lg:h-[16.5rem] rounded-xl bg-[#141414] p-3 sm:p-4 min-w-0 flex flex-col'>
                                <TimeByProject />
                            </div>

                            {/* Weekly Heatmap */}
                            <div className='col-span-1 sm:col-span-2 lg:col-span-2 lg:row-start-3 text-white min-h-[18rem] lg:min-h-[16.5rem] lg:h-[16.5rem] rounded-xl bg-[#141414] p-3 sm:p-4 min-w-0 flex flex-col'>
                                <WeeklyHeatmap profileRender={false}/>
                            </div>

                            {/* Footer */}
                            <div className='col-span-1 sm:col-span-2 lg:col-span-5 min-h-[10rem] sm:min-h-[14rem] lg:h-[18rem] rounded-xl relative overflow-hidden'>
                                <motion.div
                                    initial={{
                                        opacity: 0,
                                        x: -30
                                    }}
                                    animate={{
                                        opacity: 1,
                                        x: 0
                                    }}
                                    transition={{
                                        duration: 0.6,
                                        ease: [0.16, 1, 0.3, 1]
                                    }}
                                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                                >
                                    <span className="text-[5rem] sm:text-[10rem] lg:text-[16rem] min-[1440px]:text-[20rem] font-bold tracking-tight text-white/[0.03] select-none">
                                        क Λ R M:
                                    </span>
                                </motion.div>
                            </div>
                        </div>
                    </div>


                    {/* Right Margin Buffer */}
                    <div className="hidden lg:block w-16 xl:w-24 min-[1440px]:w-32 border-l border-dashed border-neutral-700/60 h-full shrink-0" />

                </div>

                {/*  BOTTOM MARGIN  */}
                <div className="h-12 w-full border-t border-dashed border-neutral-700/60 flex items-center justify-between px-6 text-[10px] font-mono text-neutral-600">
                    {/* <span>LATENCY: 14MS</span>
                        <span>STATUS: ACTIVE</span> */}
                </div>

            </div>

            {/* Floating Dock */}
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 ">
                <FloatingDock
                    mobileClassName="translate-y-20 " // only for demo, remove for production
                    items={links}
                />
            </div>
        </>

    )
}

export default AnalyticsPage