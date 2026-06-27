'use client'

import React, { useEffect, useState } from 'react';
import { FloatingDock } from "../../components/Common/Floating-dock";
import { SmoothCursor } from '@/components/Effects/Smooth-Cursor2';
import { IconBrandGithub, IconBrandX, IconBrandLinkedin, IconUsersGroup, IconCalendarEvent, IconBrandDribbble, IconBrandHackerrank, IconBrandLeetcode, IconHome, IconEdit, IconTerminal2, IconClockPlay, IconHomeStats, IconDeviceLaptop, IconLinkFilled, IconExternalLink } from "@tabler/icons-react";
import api from '@/services/api';
import { Rowdies } from 'next/font/google';
import Image from 'next/image';
import Stats from '@/components/Profile/Stats';
import WeeklyHeatmap from '@/components/Dashboard/WeeklyHeatmap';


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

    const MobUserLinks = [
        {
            id: 1,
            title: "GitHub",
            icon: IconBrandGithub,
            color: "text-neutral-300",
            link: "https://github.com/himatwork",
        },
        {
            id: 2,
            title: "LinkedIn",
            icon: IconBrandLinkedin,
            color: "text-sky-400/70",
            link: "https://linkedin.com/in/himanshu-dusane",
        },
        {
            id: 3,
            title: "Portfolio",
            icon: IconBrandDribbble,
            color: "text-violet-400/70",
            link: "https://himanshu.dev",
        },
    ];
    const userLinks = [
        {
            id: 1,
            title: "GitHub",
            icon: IconBrandGithub,
            color: "text-neutral-300",
            link: "https://github.com/himatwork",
        },
        {
            id: 2,
            title: "LinkedIn",
            icon: IconBrandLinkedin,
            color: "text-sky-400/70",
            link: "https://linkedin.com/in/himanshu-dusane",
        },
        {
            id: 3,
            title: "Portfolio",
            icon: IconBrandDribbble,
            color: "text-violet-400/70",
            link: "https://himanshu.dev",
        },
        {
            id: 4,
            title: "X",
            icon: IconBrandX,
            color: "text-neutral-300",
            link: "https://x.com/himatwork",
        },
        {
            id: 5,
            title: "LeetCode",
            icon: IconBrandLeetcode,
            color: "text-amber-400/70",
            link: "https://leetcode.com/u/himatwork",
        },
        {
            id: 6,
            title: "HackerRank",
            icon: IconBrandHackerrank,
            color: "text-emerald-400/70",
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
                        <div className='h-[40%] md:h-full flex flex-col gap-5  w-full md:w-1/5 rounded-xl bg-neutral-900/50 p-5'>

                            {/* Profile Icon and description */}
                            <div className='h-auto md:h-auto w-full md:flex md:flex-col md:gap-7'>
                                <div className='w-full h-auto flex justify-between md:justify-center items-center '>

                                    {/* Profile Icon */}
                                    <div className="relative w-32 md:w-50 aspect-square">
                                        <div className="relative h-full w-full overflow-hidden rounded-full border border-neutral-300">
                                            <Image
                                                src="https://i.pinimg.com/originals/64/06/67/6406670622da320f2ee737b8a719d01e.jpg"
                                                alt="Profile"
                                                fill
                                                className="object-cover"
                                            />
                                        </div>

                                        <button className="absolute bottom-2 right-2 z-20 flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-black/60 backdrop-blur">
                                            <IconEdit className="h-5 w-5 text-white" />
                                        </button>
                                    </div>
                                    <div className='md:hidden w-full h-auto flex flex-col justify-center items-center '>
                                        <span className={`${rowdies.className} text-2xl font-semibold text-neutral-300 `}>Himanshu Dusane</span>
                                        <span className='text-lg text-neutral-500'>himatwork01@gmail.com</span>
                                        <span className='text-lg text-neutral-400 mt-2'>Building in public. Ship, Learn & Repeat</span>
                                    </div>
                                </div>
                                <div className="hidden sm:flex flex-col gap-7 w-full h-full">
                                    <div className='w-full '>
                                        <span className={`${rowdies.className} text-2xl  text-neutral-300 flex justify-center items-center w-full `}>Himanshu Dusane</span>
                                        <span className='text-neutral-500 text-md flex justify-center items-center w-full'>himatwork01@gmail.com</span>
                                    </div>
                                    <span className='text-neutral-400 text-md flex justify-center items-center'>Building in public. Ship, Learn & Repeat</span>
                                </div>
                            </div>

                            {/* Links */}
                            <div className='h-full w-full p-3 flex justify-center items-center flex-col gap-2'>
                                {/* Links Card */}
                                <div className='hidden md:flex flex-col md:h-[70%] w-full border-2 border-neutral-600 rounded-lg divide-y divide-neutral-200 p-2'>

                                    {/* Individual Link */}
                                    {userLinks.map((link) => {
                                        const Icon = link.icon;
                                        return (
                                            <div
                                                key={link.id}
                                                className="group flex items-center gap-4 rounded-xl border border-transparent px-3 py-3 transition-all duration-200 hover:border-neutral-700 hover:bg-white/3"
                                            >
                                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/4 group-hover:bg-white/[0.07] transition-colors">
                                                    <Icon className={`h-6 w-6 ${link.color}`} />
                                                </div>

                                                <div className="min-w-0 flex-1">
                                                    <p className="text-sm font-medium text-neutral-200 font-mono">
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
                                <div className='hidden md:flex flex-col md:flex-1 w-full border-2 border-neutral-600 rounded-lg py-3'>
                                    {/* Date Joined */}
                                    <div className='flex flex-row justify-start items-start border-b border-neutral-700 gap-3 p-3 px-5'>
                                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/4 hover:bg-white/[0.07] transition-colors">
                                            <IconCalendarEvent className="h-6 w-6 text-neutral-300" />
                                        </div>
                                        <div className='flex flex-col gap-1'>
                                            <span className='text-md text-neutral-600'>Joined</span>
                                            <span className='text-sm text-neutral-300'>23 Sept 2025</span>
                                        </div>
                                    </div>

                                    {/* Follower and Following */}
                                    <div className="flex md:flex-row sm:flex-col border-t border-neutral-800">
                                        <div className="flex-1 flex items-center gap-3 px-5 py-4 border-r border-neutral-800">
                                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/4">
                                                <IconUsersGroup className="h-6 w-6 text-neutral-300" />
                                            </div>

                                            <div>
                                                <p className="text-xs uppercase tracking-wide text-neutral-500">
                                                    Followers
                                                </p>

                                                <p className="text-xl font-semibold text-neutral-200">
                                                    148
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex-1 flex items-center gap-3 px-5 py-4">
                                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/[0.04]">
                                                <IconUsersGroup className="h-6 w-6 text-neutral-300" />
                                            </div>

                                            <div>
                                                <p className="text-xs uppercase tracking-wide text-neutral-500">
                                                    Following
                                                </p>

                                                <p className="text-xl font-semibold text-neutral-200">
                                                    72
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                {/* Mobile Links Section */}
                                <div className="md:hidden mt-5 w-full">
                                    <div className="w-full overflow-hidden rounded-xl border border-white/5 bg-white/[0.02]">
                                        {MobUserLinks.map((link, index) => {
                                            const Icon = link.icon;

                                            return (
                                                <a
                                                    key={link.id}
                                                    href={link.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className={`group flex w-full items-center gap-3 px-3 py-3 transition-colors hover:bg-white/[0.04]
                                                    ${index !== userLinks.length - 1 ? "border-b border-white/5" : ""}`}
                                                >
                                                    {/* Icon */}
                                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/[0.04]">
                                                        <Icon className={`h-5 w-5 ${link.color}`} />
                                                    </div>

                                                    {/* Platform */}
                                                    <span className="min-w-0 flex-1 text-sm font-medium text-neutral-200">
                                                        {link.title}
                                                    </span>

                                                    {/* External Link */}
                                                    <IconExternalLink className="h-4 w-4 shrink-0 text-neutral-500 transition-colors group-hover:text-neutral-200" />
                                                </a>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* About Section */}
                        <div className='h-full md:h-full w-full md:w-1/2 rounded-xl   flex flex-col justify-center items-center gap-2'>
                            <div className='w-full min-h-[15%]  md:min-h-[13%] bg-neutral-900/50 rounded-lg'>
                                <Stats />
                            </div>
                            <div className='w-full min-h-[50%] md:min-h-[65%] bg-neutral-900/50 rounded-lg'></div>
                            <div className='w-full h-auto bg-neutral-900/50 rounded-lg p-1'>
                                <WeeklyHeatmap profileRender={true}/>
                            </div>
                        </div>
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
                    mobileClassName="translate-y-20 "
                    items={links}
                />
            </div >
        </>

    )
}

export default page