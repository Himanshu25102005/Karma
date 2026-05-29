'use client'

import { IconCircleCheckFilled, IconChevronDown } from '@tabler/icons-react'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import Calender from "react-calendar"
import 'react-calendar/dist/Calendar.css';
const months = [
    {
        no: 1,
        name: "January"
    },
    {
        no: 2,
        name: "February"
    },
    {
        no: 3,
        name: "March"
    },
    {
        no: 4,
        name: "April"
    },
    {
        no: 5,
        name: "May"
    },
    {
        no: 6,
        name: "June"
    },
    {
        no: 7,
        name: "July"
    },
    {
        no: 8,
        name: "August"
    },
    {
        no: 9,
        name: "September"
    },
    {
        no: 10,
        name: "October"
    },
    {
        no: 11,
        name: "November"
    },
    {
        no: 12,
        name: "December"
    },
]
const ActivityCalender = () => {
    const [value, onChange] = useState(new Date());
    const [dropdown, setDropdown] = useState(false)
    const [Month, setMonth] = useState(null);
    return (
        <div className='h-full w-full flex flex-col gap-2'>
            {/* Heading */}
            <div className='flex flex-row relative justify-between items-center'>
                <span className="text-xl font-semibold tracking-wide text-neutral-200 font-mono">Activity Calender</span>
                <button
                    onClick={() => setDropdown(!dropdown)}
                    className="flex items-center gap-2 px-3 py-1.5 bg-neutral-950 border border-neutral-800 hover:border-neutral-700 active:bg-neutral-900 rounded-xl transition-all duration-200 cursor-pointer text-neutral-400 hover:text-neutral-200 group shadow-sm select-none"
                >
                    <span className="text-xs font-medium font-mono tracking-tight">
                        {Month}
                    </span>

                    <IconChevronDown

                        className={`h-4 w-4 text-neutral-500 group-hover:text-neutral-300 transition-transform duration-200 ${dropdown ? "rotate-180" : "rotate-0"
                            }`}
                    />
                </button>
                {/* Dropdown */}
                <AnimatePresence>
                    {dropdown && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: -5 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -5 }}
                            transition={{ duration: 0.15, ease: 'easeOut' }}
                            className="absolute top-12 right-0 w-44 bg-neutral-950 border border-neutral-800 rounded-xl flex flex-col p-1.5 gap-1 shadow-2xl z-50 font-mono"
                        >

                            {
                                months.map((month) => (
                                    <button
                                        key={month.no}
                                        onClick={() => {
                                            setDropdown(false);
                                            setMonth(month.name)
                                        }}
                                        className={`w-full text-xs font-medium flex justify-between items-center px-2.5 py-2 rounded-lg cursor-pointer transition-all duration-200 ${month.name == Month
                                            ? 'bg-neutral-900 text-amber-500 font-semibold'
                                            : 'text-neutral-400 hover:bg-neutral-900/50 hover:text-neutral-200'
                                            }`}
                                    >
                                        <span>{month.name}</span>
                                        {month.name == Month ? (
                                            <IconCircleCheckFilled className="h-4 w-4 text-amber-500" />
                                        ) : (
                                            <div className="w-4 h-4 rounded-full border border-neutral-800" /> // Empty placeholder checkbox ring
                                        )}
                                    </button>
                                ))
                            }
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className='flex-1 border border-neutral-800 rounded-xl p-2 bg-neutral-900/10 '>
                {/* <Calender/> */} 
            </div>
        </div>
    )
}

export default ActivityCalender