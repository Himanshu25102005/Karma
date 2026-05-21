'use client'

import React, { useEffect, useState } from 'react';
import { FloatingDock } from "../../components/Common/Floating-dock";
import { SmoothCursor } from '@/components/Effects/Smooth-Cursor2';
import {
    IconBrandGithub,
    IconBrandX,
    IconHome,
    IconNewSection,
    IconTerminal2,
    IconClockPlay,
    IconHomeStats,
    IconDeviceLaptop
} from "@tabler/icons-react";

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
            href: "http://localhost:3000/analytics",
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