'use client'
import { IconChevronDown, IconCircleCheckFilled } from '@tabler/icons-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import React, { useEffect, useState } from 'react'
import api from '@/services/api'
import { AnimatePresence, motion } from 'framer-motion'

import useUserStore from "@/store/useUserStore";



const Histogram = () => {
    const [weekdata, setWeekData] = useState(null);
    const [monthdata, setMonthData] = useState(null);
    const [weekMode, setWeekMode] = useState(true)
    const [dropdown, setDropdown] = useState(false)
    const [barSize, setBarSize] = useState(30)
    const [chartMargin, setChartMargin] = useState({ top: 10, right: 10, left: 15, bottom: 30 })
    const username = useUserStore((state) => state.username)
    const setCurrentUser = useUserStore((state) => state.setCurrentUser);
    useEffect(() => {
        setCurrentUser();
        console.log("Current User's Username:", username);
    }, []);

    useEffect(() => {
        const updateBarSize = () => {
            const isLargeScreen = window.innerWidth >= 1024;
            setBarSize(isLargeScreen ? 30 : 20);
            setChartMargin({ top: 10, right: 10, left: isLargeScreen ? 15 : 5, bottom: 30 });
        };
        updateBarSize();
        window.addEventListener('resize', updateBarSize);
        return () => window.removeEventListener('resize', updateBarSize);
    }, []);

    useEffect(() => {
        let fetchUserData = async () => {
            const res = await api.getPublicProfile(username);
            console.log("Data from the new Profile route ", res.data)
        }

        fetchUserData();
    }, [username])



    useEffect(() => {
        const fetchData = async () => {
            const res = await api.weeklySessionHistogramData();
            // console.log("Histogram Data Weekly ", res.data);
            setWeekData(res.data);

            const resp = await api.monthlySessionHistogramData();
            // console.log("Monthly Histogram Data ", resp.data)
            setMonthData(resp.data)
        }


        fetchData();
    }, [])


    return (
        <div className='h-full w-full min-w-0 flex flex-col gap-2'>
            {/* heading */}
            <div className='shrink-0 min-h-10 relative w-full flex flex-wrap justify-between items-center gap-2'>

                <span className="text-lg sm:text-xl font-semibold tracking-wide text-neutral-200 font-mono">
                    Focus Time Over Time
                </span>


                <button
                    onClick={() => setDropdown(!dropdown)}
                    className="flex items-center gap-2 px-3 py-1.5 bg-neutral-950 border border-neutral-800 hover:border-neutral-700 active:bg-neutral-900 rounded-xl transition-all duration-200 cursor-pointer text-neutral-400 hover:text-neutral-200 group shadow-sm select-none"
                >
                    <span className="text-xs font-medium font-mono tracking-tight">
                        {weekMode ? "Last 7 Days" : "Monthly View"}
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

                            <button
                                onClick={() => {
                                    setWeekMode(true);
                                    setDropdown(false);
                                }}
                                className={`w-full text-xs font-medium flex justify-between items-center px-2.5 py-2 rounded-lg cursor-pointer transition-all duration-200 ${weekMode
                                    ? 'bg-neutral-900 text-amber-500 font-semibold'
                                    : 'text-neutral-400 hover:bg-neutral-900/50 hover:text-neutral-200'
                                    }`}
                            >
                                <span>Last 7 Days</span>
                                {weekMode ? (
                                    <IconCircleCheckFilled className="h-4 w-4 text-amber-500" />
                                ) : (
                                    <div className="w-4 h-4 rounded-full border border-neutral-800" /> // Empty placeholder checkbox ring
                                )}
                            </button>

                            <button
                                onClick={() => {
                                    setWeekMode(false);
                                    setDropdown(false);
                                }}
                                className={`w-full text-xs font-medium flex justify-between items-center px-2.5 py-2 rounded-lg cursor-pointer transition-all duration-200 ${!weekMode
                                    ? 'bg-neutral-900 text-amber-500 font-semibold'
                                    : 'text-neutral-400 hover:bg-neutral-900/50 hover:text-neutral-200'
                                    }`}
                            >
                                <span>Monthly View</span>
                                {!weekMode ? (
                                    <IconCircleCheckFilled className="h-4 w-4 text-amber-500" />
                                ) : (
                                    <div className="w-4 h-4 rounded-full border border-neutral-800" />
                                )}
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Graph Section */}
            <div className="w-full min-w-0 flex-1 min-h-[200px] border border-neutral-800 rounded-xl p-2 bg-neutral-900/10 overflow-visible">
                {
                    (!weekdata)
                        ?
                        <div className='h-full w-full flex justify-center items-center text-2xl text-neutral-600 font-semibold shadow-2xl'>
                            <span>Data Loading..</span>
                        </div>
                        :
                        (weekMode == true)
                            ?
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={weekdata} margin={chartMargin}>
                                    <CartesianGrid strokeDasharray="5 5" stroke="#262626" vertical={false} />
                                    <Tooltip />
                                    <XAxis
                                        dataKey="day"
                                        stroke="#525252"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                        dy={8} // Subtle downward push for the timeline days
                                        label={{
                                            value: 'Days',
                                            position: 'bottom',
                                            offset: 15,
                                            style: {
                                                textAnchor: 'middle',
                                                fill: '#737373',
                                                fontFamily: 'monospace',
                                                fontSize: '11px',
                                                letterSpacing: '0.05em'
                                            }
                                        }}
                                    />

                                    <YAxis
                                        stroke="#525252"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                        label={{
                                            value: 'Minutes',
                                            angle: -90,
                                            position: 'insideLeft',
                                            offset: -8,
                                            style: {
                                                textAnchor: 'middle',
                                                fill: '#737373',
                                                fontFamily: 'monospace',
                                                fontSize: '11px',
                                                letterSpacing: '0.05em'
                                            }
                                        }}
                                    />

                                    <Bar dataKey="duration" fill="#F28C28" radius={[4, 4, 4, 4]} barSize={barSize} />
                                </BarChart>
                            </ResponsiveContainer>
                            :
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={monthdata} margin={chartMargin}>
                                    <CartesianGrid strokeDasharray="5 5" stroke="#262626" vertical={false} />
                                    <Tooltip />
                                    <XAxis
                                        dataKey="month"
                                        stroke="#525252"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                        dy={8} // Subtle downward push for the timeline days
                                        label={{
                                            value: 'Months',
                                            position: 'bottom',
                                            offset: 15,
                                            style: {
                                                textAnchor: 'middle',
                                                fill: '#737373',
                                                fontFamily: 'monospace',
                                                fontSize: '11px',
                                                letterSpacing: '0.05em'
                                            }
                                        }}
                                    />

                                    <YAxis
                                        stroke="#525252"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                        label={{
                                            value: 'Minutes',
                                            angle: -90,
                                            position: 'insideLeft',
                                            offset: -8,
                                            style: {
                                                textAnchor: 'middle',
                                                fill: '#737373',
                                                fontFamily: 'monospace',
                                                fontSize: '11px',
                                                letterSpacing: '0.05em'
                                            }
                                        }}
                                    />

                                    <Bar dataKey="duration" fill="#F28C28" radius={[4, 4, 4, 4]} barSize={barSize} />
                                </BarChart>
                            </ResponsiveContainer>
                }
            </div>
        </div>
    )
}

export default Histogram


/* */