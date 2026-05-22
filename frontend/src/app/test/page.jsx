'use client'
import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import Card from '@/components/Common/Card';
import { GeistSans } from 'geist/font/sans';
import { cn } from '@/lib/utils';
import AreaChartComponent from '@/components/Test/AreaChartComponent';
import BarChartComponent from '@/components/Test/BarChartComponent';
import LineChartComponent from '@/components/Test/LineChartComponent';
LineChartComponent




const Testpage = () => {

    return (
        <>
            <div className='h-screen w-screen flex justify-center items-center bg-neutral-900'>
                <div className='grid grid-col-1 lg:grid-cols-3 gap-10'>
                    <motion.div
                        initial={{
                            scale: 1
                        }}
                        whileHover={{
                            scale: 1.1
                        }}
                        transition={{
                            duration: 0.5
                        }}
                        className='h-100 w-100 bg-neutral-300 rounded-xl flex flex-col gap-3'>
                        <h1 className='font-semibold text-3xl text-center'>AreaChart</h1>
                        <AreaChartComponent />
                    </motion.div>
                    <motion.div
                        initial={{
                            scale: 1
                        }}
                        whileHover={{
                            scale: 1.1
                        }}
                        transition={{
                            duration: 0.5
                        }}
                        className='h-100 w-100 bg-neutral-300 rounded-xl flex flex-col gap-3'>
                        <h1 className='font-semibold text-3xl text-center'>BarChart</h1>
                        <BarChartComponent />
                    </motion.div>
                    <motion.div
                        initial={{
                            scale: 1
                        }}
                        whileHover={{
                            scale: 1.1
                        }}
                        transition={{
                            duration: 0.5
                        }}
                        className='h-100 w-100 bg-neutral-300 rounded-xl flex flex-col gap-3'>
                        <h1 className='font-semibold text-3xl text-center'>LineChart</h1>
                        <LineChartComponent />
                    </motion.div>
                </div>
            </div>
        </>
    )
}

export default Testpage