'use client'

import React, { useEffect, useState } from 'react';
import { FloatingDock } from "../../components/Common/Floating-dock";
import { SmoothCursor } from '@/components/Effects/Smooth-Cursor2';
import {
    IconBrandGithub, IconBrandX, IconHome, IconClock, IconSparkles, IconTerminal2, IconClockPlay, IconHomeStats, IconDeviceLaptop, IconCircleCheck, IconTrendingUp
} from "@tabler/icons-react";
import Histogram from '@/components/Dashboard/Histogram';


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

    const [isDark, setIsDark] = useState(true);
    return (
        <>
            <SmoothCursor />

            <div className="h-screen w-screen bg-[#0a0a0a] flex flex-col relative overflow-hidden select-none">

                {/* TOP MARGIN*/}
                <div className=" h-[2rem] lg:h-[3.5rem] w-full border-b border-dashed border-neutral-700/60 flex items-center px-6">
                    <span className="text-xs font-mono text-neutral-500 tracking-widest uppercase">कΛRMΛ // System_v2</span>
                </div>

                {/* left and right vertical margins*/}
                <div className="flex-1 flex flex-row w-full">

                    {/* Left Margin Buffer */}
                    <div className="hidden md:block w-32 border-r border-dashed border-neutral-700/60 h-full" />

                    {/* MAIN WORKING AREA */}
                    <div className="flex-1 h-full p-2 overflow-y-auto custom-scrollbar">
                        <div className='h-20 flex flex-col  p-2'>
                            <span className='font-semibold text-3xl text-neutral-100'>Good Morning Himanshu</span>   {/* Animate using ReactBits */}
                            <span className='text-md text-neutral-400'>Overview of your focus and progress</span>
                        </div>


                        {/* Main Grid */}
                        <div className='grid grid-cols-5 w-full p-2 gap-3 grid-auto-rows'>
                            {/* Brief Stats Section */}
                            <div className='col-span-5 flex flex-row gap-2  h-30 justify-between'>
                                <div className='h-full w-[17%] p-1 rounded-xl bg-[#141414] flex flex-row gap-3'>
                                    {/* Icon */}
                                    <div className='h-full w-[20%] relative flex justify-center'>
                                        <div className='absolute h-14 w-14 flex justify-center items-center  rounded-xl top-2  bg-green-900/20'>
                                            <IconClock className='h-10 w-10 text-green-500' />
                                        </div>
                                    </div>
                                    {/* Data and Text */}
                                    <div className='flex-1  flex flex-col'>
                                        <span className='text-neutral-400 text-md font-semibold'>Focus Time</span>
                                        <span className='text-neutral-200 text-3xl font-semibold'>1h 12m</span>
                                        <div className='flex flex-row h-full items-center gap-1'>
                                            <IconSparkles className='h-3 w-3 text-green-400' />
                                            <span className='text-[9px] text-neutral-400'>From 6 sessions</span>
                                        </div>
                                    </div>
                                    <div className='w-[25%]  relative'>
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
                                <div className='h-full w-[17%] p-1 rounded-xl bg-[#141414] flex flex-row gap-3'>
                                    {/* Icon */}
                                    <div className='h-full w-[20%] relative flex justify-center'>
                                        <div className='absolute h-14 w-14 flex justify-center items-center  rounded-xl top-2  bg-blue-900/60'>
                                            <IconCircleCheck className='h-10 w-10 text-blue-500' />
                                        </div>
                                    </div>
                                    {/* Data and Text */}
                                    <div className='flex-1  flex flex-col'>
                                        <span className='text-neutral-400 text-md font-semibold'>Tasks Done</span>
                                        <span className='text-neutral-200 text-3xl font-semibold'>6</span>
                                        <div className='flex flex-row h-full items-center gap-1'>
                                            <IconSparkles className='h-3 w-3 text-blue-500' />
                                            <span className='text-[9px] text-neutral-400'>Total 11 tasks</span>
                                        </div>
                                    </div>
                                    <div className='w-[25%]  relative'>
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
                                <div className='h-full w-[17%] p-1 rounded-xl bg-[#141414] flex flex-row gap-3'>
                                    {/* Icon */}
                                    <div className='h-full w-[20%] relative flex justify-center'>
                                        <div className='absolute h-14 w-14 flex justify-center items-center  rounded-xl top-2  bg-yellow-900/60'>
                                            <IconTrendingUp className='h-10 w-10 text-yellow-500' />
                                        </div>
                                    </div>
                                    {/* Data and Text */}
                                    <div className='flex-1  flex flex-col'>
                                        <span className='text-neutral-400 text-md font-semibold'>Peak Session</span>
                                        <span className='text-neutral-200 text-3xl font-semibold'>1h 1m</span>
                                        <div className='flex flex-row h-full items-center gap-1'>
                                            <IconSparkles className='h-3 w-3 text-yellow-500' />
                                            <span className='text-[9px] text-neutral-400'>Average Session Duration: 17m</span>
                                        </div>
                                    </div>
                                    <div className='w-[25%]  relative'>
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
                                <div className='h-full w-[17%] p-1 rounded-xl bg-[#141414] flex flex-row gap-3'>
                                    {/* Icon */}
                                    <div className='h-full w-[20%] relative flex justify-center'>
                                        <div className='absolute h-14 w-14 flex justify-center items-center  rounded-xl top-2  bg-green-900/20'>
                                            <IconBrandGithub className='h-10 w-10 text-green-500' />
                                        </div>
                                    </div>
                                    {/* Data and Text */}
                                    <div className='flex-1  flex flex-col'>
                                        <span className='text-neutral-400 text-md font-semibold'>Focus Time</span>
                                        <span className='text-neutral-200 text-3xl font-semibold'>1h 12m</span>
                                        <div className='flex flex-row h-full items-center gap-1'>
                                            <IconSparkles className='h-3 w-3 text-green-400' />
                                            <span className='text-[9px] text-neutral-400'>From 6 sessions</span>
                                        </div>
                                    </div>
                                    <div className='w-[25%]  relative'>
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
                            <div className='col-span-1 row-span-2 text-white h-[40rem] rounded-xl bg-[#141414]'>
                                Profile and Achievements Section
                            </div>

                            {/* Histogram */}
                            <div className='col-span-2  text-white h-[23rem] rounded-xl bg-[#141414] p-4'>
                                <Histogram/>
                            </div>

                            {/* Calender */}
                            <div className='col-span-2 text-white h-[23rem] rounded-xl bg-[#141414]'>
                                <span>Activity Calender</span>
                            </div>

                            {/* Pie Chart */}
                            <div className='col-span-2  text-white h-[16.5rem] rounded-xl bg-[#141414]'>
                                <span>Time by Project (Pie Chart) </span>
                            </div>

                            {/* Weekly Heatmap */}
                            <div className='col-span-2  text-white h-[16.5rem] rounded-xl bg-[#141414]'>
                                <span>Weekly Heatmap </span>
                            </div>

                            {/* Recent Sessions */}
                            <div className='col-span-5  text-white h-[18rem] rounded-xl bg-[#141414]'>
                                <span>Recent Sessions</span>
                            </div>
                        </div>
                    </div>


                    {/* Right Margin Buffer */}
                    <div className="hidden lg:block w-32 border-l border-dashed border-neutral-700/60 h-full" />

                </div>

                {/*  BOTTOM MARGIN  */}
                <div className="h-12 w-full border-t border-dashed border-neutral-700/60 flex items-center justify-between px-6 text-[10px] font-mono text-neutral-600">
                    <span>LATENCY: 14MS</span>
                    <span>STATUS: ACTIVE</span>
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