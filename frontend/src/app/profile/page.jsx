'use client'

import React, { useEffect, useState } from 'react';
import { FloatingDock } from "../../components/Common/Floating-dock";
import { SmoothCursor } from '@/components/Effects/Smooth-Cursor2';
import { IconBrandGithub, IconBrandX, IconHome, IconEdit, IconTerminal2, IconClockPlay, IconHomeStats, IconDeviceLaptop, } from "@tabler/icons-react";
import api from '@/services/api';




const page = () => {
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



    return (
        <>
            <SmoothCursor />

            <div className="h-screen lg:h-screen w-full max-w-[100vw] bg-[#0a0a0a] flex flex-col relative overflow-x-hidden lg:overflow-hidden select-none">

                {/* TOP MARGIN*/}
                <div className=" h-8 lg:h-14 w-full border-b border-dashed border-neutral-700/60 flex items-center px-6">
                    {/* <span className="text-xs font-mono text-neutral-500 tracking-widest uppercase">कΛRMΛ // System_v2</span> */}
                </div>

                {/* left and right vertical margins*/}
                <div className="flex-1 flex flex-row w-full">

                    {/* Left Margin Buffer */}
                    <div className="hidden lg:block w-16 xl:w-24 min-[1440px]:w-32 border-r border-dashed border-neutral-700/60 h-full shrink-0" />

                    {/* MAIN WORKING AREA */}

                    <div className='border h-full w-full flex flex-col md:flex-row justify-center items-center p-7  md:p-4 gap-5'>

                        {/* Profile Section */}
                        <div className='h-[40%] md:h-full w-full md:w-1/5 rounded-xl border border-dashed border-neutral-400 p-3'>

                            {/* Profile Icon and description */}
                            <div className='h-auto md:h-[40%] w-full border-b border-red-300'>
                                <div className='w-full h-auto flex justify-between md:justify-center items-center border border-neutral-500'>

                                    {/* Profile Icon */}
                                    <div className='relative w-32 md:w-50 aspect-square rounded-full border border-dashed border-neutral-300'>
                                        <button className='h-9 w-9 flex justify-center items-center absolute bottom-0 right-0 bg-neutral-500/40 rounded-xl'>
                                            <IconEdit className='text-neutral-200 h-6 w-6' />
                                        </button>
                                    </div>
                                    <div className='md:hidden w-full h-auto border border-red-900'></div>
                                </div>
                            </div>
                        </div>

                        {/* About Section */}
                        <div className='h-full md:h-full w-full md:w-1/2 rounded-xl border border-dashed border-neutral-400'></div>
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

export default page