'use client'
import { IconClock, IconTrophy, IconAlertTriangle, IconBulb, IconSparkles } from '@tabler/icons-react'
import React, { useEffect, useState } from 'react'
import api from '@/services/api'
import { motion } from 'framer-motion'

const Saarthi = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchIntell = async () => {
            try {
                const intell = await api.getIntell();
                console.log(intell.data.data);
                setData(intell.data.data.insights);
            } catch (e) {
                console.log("intelligence can not be fetched: ", e)
            }
        }

        fetchIntell()
    }, [])

    useEffect(() => {
        console.log("API DATA: ", data);
    }, [data])


    return (
        <>
            <div className='h-full w-full '>
                <div className='h-10 relative w-full flex gap-2  items-center flex-row'>
                    <div className="text-transparent bg-gradient-to-r from-[#7C3AED] via-[#A855F7] to-[#F59E0B] bg-clip-text">
                        <IconSparkles height={20} width={20} className="text-[#A855F7]" stroke={1.5} />
                    </div>
                    <span className="text-xl font-semibold tracking-wide text-neutral-200 font-mono">
                        कSaarthi:
                    </span>
                </div>
                <div className="w-full h-[89%] border border-neutral-800 rounded-xl p-2.5  bg-neutral-900/10 flex flex-row justify-center items-center  gap-2">
                    {/* Best Focus Window */}
 <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="w-1/4 h-full border-r-2 border-neutral-800 px-4 py-1.5 flex flex-col justify-between rounded-xl bg-gradient-to-b from-[#7a5eec]/10 via-transparent to-transparent"
                    >
                        {/* Header */}
                        <div className="flex items-center gap-3 flex-col items-start">
                            <div className="h-10 w-10 rounded-xl  flex items-center justify-center">
                                <IconClock
                                    height={30}
                                    width={30}
                                    className="text-[#8f73ff]"
                                />
                            </div>

                            <div className="flex flex-col">
                                <span className="text-[11px] uppercase tracking-wider text-neutral-500 font-medium">
                                    Best Focus Window
                                </span>
                            </div>
                        </div>

                        {/* Main Metric */}
                        <div className="mt-4 flex flex-col gap-1">
                            <span className="text-[14.5px] font-bold text-white leading-none">
                                {data?.bestFocusWindow?.timeRange?.trim()}
                            </span>

                            <span className="text-xs text-neutral-500">
                                Peak concentration period
                            </span>
                        </div>

                        {/* Insight */}
                        <div className="mt-3">
                            <p className="text-sm/5  text-neutral-300">
                                {data.bestFocusWindow?.insight}
                            </p>
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between mt-1 border w-fit p-0.5 px-1 rounded-md bg-gradient-to-b from-[#7a5eec]/10 via-transparent to-transparent border-[#8b7bcc]">
                            <span className="text-xs text-[#816cd3]">
                                {data.bestFocusWindow?.confidence}% confidence
                            </span>
                        </div>
                    </motion.div>

                    {/* Most Productive Project */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="w-1/4 h-full border-r-2 border-neutral-800 px-4 py-1.5 flex flex-col justify-between rounded-xl bg-gradient-to-b from-[#5CE65C]/10 via-transparent to-transparent"
                    >
                        {/* Header */}
                        <div className="flex items-center gap-3 flex-col items-start">
                            <div className="h-10 w-10 rounded-xl flex items-center justify-center">
                                <IconTrophy
                                    height={30}
                                    width={30}
                                    className="text-[#5CE65C]"
                                />
                            </div>

                            <div className="flex flex-col">
                                <span className="text-[11px] uppercase tracking-wider text-neutral-500 font-medium">
                                    Most Viable Project
                                </span>
                            </div>
                        </div>

                        {/* Main Metric */}
                        <div className="mt-4 flex flex-col gap-1">
                            <span className="text-[15px] font-bold text-white leading-none">
                                {data.mostProductiveProject?.project}
                            </span>

                            <span className="text-xs text-neutral-500">
                                {data.mostProductiveProject?.metric}
                            </span>
                        </div>

                        {/* Insight */}
                        <div className="mt-3">
                            <p className="text-sm/5  text-neutral-300">
                                {data.mostProductiveProject?.insight}
                            </p>
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between mt-1 border w-fit p-0.5 px-1 rounded-md bg-gradient-to-b from-[#5CE65C]/10 via-transparent to-transparent border-[#5CE65C]">
                            <span className="text-xs text-[#5CE65C]">
                                Leading
                            </span>
                        </div>
                    </motion.div>

                    {/* Focus Leak */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="w-1/4 h-full border-r-2 border-neutral-800 px-4 py-1.5 flex flex-col justify-between rounded-xl bg-gradient-to-b from-[#d61512]/10 via-transparent to-transparent"
                    >
                        {/* Header */}
                        <div className="flex items-center gap-3 flex-col items-start">
                            <div className="h-10 w-10 rounded-xl flex items-center justify-center">
                                <IconAlertTriangle
                                    height={30}
                                    width={30}
                                    className="text-[#d61512]"
                                />
                            </div>

                            <div className="flex flex-col">
                                <span className="text-[11px] uppercase tracking-wider text-neutral-500 font-medium">
                                    Focus Leak
                                </span>
                            </div>
                        </div>

                        {/* Main Metric */}
                        <div className="mt-4 flex flex-col gap-1">
                            <span className="text-[15px] font-bold text-white leading-none">
                                {data.focusLeak?.title}
                            </span>

                            <span className="text-xs text-neutral-500">
                                Try More Distraction Free Blocks
                            </span>
                        </div>

                        {/* Insight */}
                        <div className="mt-3">
                            <p className="text-sm/5  text-neutral-300">
                                {data.focusLeak?.insight}
                            </p>
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between mt-1 border w-fit p-0.5 px-1 rounded-md bg-gradient-to-b from-[#d61512]/10 via-transparent to-transparent border-[#d61512]">
                            <span className="text-xs text-[#d61512]">
                                Needs Attention
                            </span>
                        </div>
                    </motion.div>


                    {/* Recommendation */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="w-1/4 h-full border-r-2 border-neutral-800 px-4 py-1.5 flex flex-col justify-between rounded-xl bg-gradient-to-b from-[#305CDE]/10 via-transparent to-transparent"
                    >
                        {/* Header */}
                        <div className="flex items-center gap-3 flex-col items-start">
                            <div className="h-10 w-10 rounded-xl flex items-center justify-center">
                                <IconBulb
                                    height={30}
                                    width={30}
                                    className="text-[#305CDE]"
                                />
                            </div>

                            <div className="flex flex-col">
                                <span className="text-[11px] uppercase tracking-wider text-neutral-500 font-medium">
                                    Recommendation
                                </span>
                            </div>
                        </div>

                        {/* Main Metric */}
                        <div className="mt-4 flex flex-col gap-1">
                            <span className="text-[15px] font-bold text-white leading-none">
                                {data.recommendation?.title}
                            </span>

                            {/* <span className="text-xs text-neutral-500">
                                Try More Distraction Free Blocks
                            </span> */}
                        </div>

                        {/* Insight */}
                        <div className="mt-3">
                            <p className="text-sm/5  text-neutral-300">
                                {data.recommendation?.insight}
                            </p>
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between mt-1 border w-fit p-0.5 px-1 rounded-md bg-linear-to-b from-[#305CDE]/10 via-transparent to-transparent border-[#305CDE]">
                            <span className="text-xs text-[#305CDE]">
                                Saarthi&apos;s Suggestion
                            </span>
                        </div>
                    </motion.div>

                </div>
            </div>
        </>
    )
}

export default Saarthi