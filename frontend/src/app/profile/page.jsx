'use client'

import React, { useEffect, useState } from 'react';
import { FloatingDock } from "../../components/Common/Floating-dock";
import { SmoothCursor } from '@/components/Effects/Smooth-Cursor2';
import { IconBrandGithub, IconBrandX, IconBrandLinkedin, IconBrandDribbble, IconBrandHackerrank, IconBrandLeetcode, IconHome, IconEdit, IconTerminal2, IconClockPlay, IconHomeStats, IconDeviceLaptop, IconLinkFilled } from "@tabler/icons-react";
import api from '@/services/api';
import { Rowdies } from 'next/font/google';


const rowdies = Rowdies({
    subsets: ["latin"],
    weight: ["300", "400", "700"],
});

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

    const userLinks = [
        {
            id: 1,
            title: "GitHub",
            icon: IconBrandGithub,
            link: "https://github.com/himatwork",
        },
        {
            id: 2,
            title: "LinkedIn",
            icon: IconBrandLinkedin,
            link: "https://linkedin.com/in/himanshu-dusane",
        },
        {
            id: 3,
            title: "Portfolio",
            icon: IconBrandDribbble,
            link: "https://himanshu.dev",
        },
        {
            id: 4,
            title: "X (Twitter)",
            icon: IconBrandX,
            link: "https://x.com/himatwork",
        },
        {
            id: 5,
            title: "LeetCode",
            icon: IconBrandLeetcode,
            link: "https://leetcode.com/u/himatwork",
        },
        {
            id: 6,
            title: "HackerRank",
            icon: IconBrandHackerrank,
            link: "https://www.hackerrank.com/profile/himatwork",
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
                        <div className='h-[40%] md:h-full flex flex-col gap-5  w-full md:w-1/5 rounded-xl border border-dashed border-neutral-400 p-7'>

                            {/* Profile Icon and description */}
                            <div className='h-auto md:h-auto w-full md:flex md:flex-col md:gap-7'>
                                <div className='w-full h-auto flex justify-between md:justify-center items-center '>

                                    {/* Profile Icon */}
                                    <div className='relative w-32 md:w-50 aspect-square rounded-full border border-dashed border-neutral-300'>
                                        <button className='h-9 w-9 flex justify-center items-center absolute bottom-0 right-0 bg-neutral-500/40 rounded-xl'>
                                            <IconEdit className='text-neutral-200 h-6 w-6' />
                                        </button>
                                    </div>
                                    <div className='md:hidden w-full h-auto flex flex-col justify-center items-center'>
                                        <span className={`${rowdies.className} text-2xl font-semibold text-neutral-300 `}>Himanshu Dusane</span>
                                        <span className='text-lg text-neutral-500'>himatwork01@gmail.com</span>
                                    </div>
                                </div>
                                <div className="hidden sm:flex flex-col gap-7 w-full h-full">
                                    <div className='w-full '>
                                        <span className={`${rowdies.className} text-2xl font-semibold text-neutral-300 flex justify-center items-center w-full `}>Himanshu Dusane</span>
                                        <span className='text-neutral-500 text-lg flex justify-center items-center w-full'>himatwork01@gmail.com</span>
                                    </div>
                                    <span className='text-neutral-500 text-md flex justify-center items-center'>Building in public. Ship, Learn & Repeat</span>
                                </div>
                            </div>

                            {/* Links */}
                            <div className='h-full w-full p-3 flex justify-center items-center flex-col gap-1'>
                                {/* Card */}
                                <div className='md:h-[70%] w-full border-2 border-neutral-600 rounded-lg divide-y divide-neutral-200 p-2'>

                                    {/* Individual Link */}
                                    {userLinks.map((link) => {
                                        const Icon = link.icon;

                                        return (
                                            <div
                                                key={link.id}
                                                className="group flex items-center gap-4 rounded-xl border border-transparent px-3 py-3 transition-all duration-200 hover:border-neutral-700 hover:bg-white/3"
                                            >
                                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/4 group-hover:bg-white/[0.07] transition-colors">
                                                    <Icon className="h-6 w-6 text-neutral-200" />
                                                </div>

                                                <div className="min-w-0 flex-1">
                                                    <p className="text-sm font-medium text-neutral-200">
                                                        {link.title}
                                                    </p>

                                                    <p className="truncate text-xs text-neutral-500">
                                                        {link.link}
                                                    </p>
                                                </div>

                                                <button className="rounded-lg p-2 text-neutral-500 transition-all duration-200 hover:bg-white/5 hover:text-white">
                                                    <IconLinkFilled className="h-5 w-5" />
                                                </button>
                                            </div>
                                        );
                                    })}


                                </div>
                                <div className='md:flex-1 w-full border boprder-neutral-400 rounded-lg'>

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
                </div>

            </div >

            {/* Floating Dock */}
            < div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 " >
                <FloatingDock
                    mobileClassName="translate-y-20 " // only for demo, remove for production
                    items={links}
                />
            </div >
        </>

    )
}

export default page